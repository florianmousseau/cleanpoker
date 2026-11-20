// Package assistant serves the rooms to AI assistants over the Model Context
// Protocol: an assistant joins a room as a marked participant, reads it, and
// votes like anyone. It never reveals, starts a round or removes anybody.
package assistant

import (
	"context"
	"errors"
	"net/http"
	"regexp"
	"strings"

	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/florianmousseau/cleanpoker/internal/store"
	"github.com/google/uuid"
	"github.com/modelcontextprotocol/go-sdk/mcp"
)

// Rooms is what the assistant needs from the store.
type Rooms interface {
	Get(id string) (*room.Room, bool)
	RecordJoin()
}

var _ Rooms = (*store.Store)(nil)

// MaxNameLength matches the join form.
const MaxNameLength = 30

var roomID = regexp.MustCompile(`^[A-Za-z0-9_-]{1,64}$`)

var (
	errRoom = errors.New("room must be a CleanPoker room address or its id, e.g. https://cleanpoker.dev/1a2b3c4d")
	errSeat = errors.New("no seat matches this token in this room: join it first")
	errName = errors.New("name must be 1 to 30 characters")
	errGone = errors.New("no open room at this address: check it, or ask a person to open it in a browser first")
)

// RoomID reads a room address or a bare id.
func RoomID(s string) (string, error) {
	s = strings.TrimSpace(s)
	if i := strings.Index(s, "://"); i >= 0 {
		s = s[i+3:]
		if j := strings.IndexByte(s, '/'); j >= 0 {
			s = s[j+1:]
		} else {
			s = ""
		}
	}
	s = strings.Trim(strings.SplitN(strings.SplitN(s, "?", 2)[0], "#", 2)[0], "/")
	if !roomID.MatchString(s) {
		return "", errRoom
	}
	return s, nil
}

type joinIn struct {
	Room string `json:"room" jsonschema:"the room address shared by the team, or its id"`
	Name string `json:"name" jsonschema:"the name shown to the team, e.g. Claude"`
}

type joinOut struct {
	Seat  string        `json:"seat" jsonschema:"the token to pass to vote, get_room and leave_room"`
	State room.Snapshot `json:"state"`
}

type roomIn struct {
	Room string `json:"room" jsonschema:"the room address or id"`
}

type voteIn struct {
	Room string `json:"room" jsonschema:"the room address or id"`
	Seat string `json:"seat" jsonschema:"the token join_room returned"`
	Card string `json:"card" jsonschema:"one card of the room deck, or empty to withdraw the vote"`
}

type seatIn struct {
	Room string `json:"room" jsonschema:"the room address or id"`
	Seat string `json:"seat" jsonschema:"the token join_room returned"`
}

type stateOut struct {
	State room.Snapshot `json:"state"`
}

type service struct{ rooms Rooms }

func (s service) open(raw string) (*room.Room, error) {
	id, err := RoomID(raw)
	if err != nil {
		return nil, err
	}
	// Never opened here: a mistyped address would seat the assistant alone in
	// an empty room, and it would report success to its user.
	rm, ok := s.rooms.Get(id)
	if !ok {
		return nil, errGone
	}
	return rm, nil
}

func (s service) seat(raw, token string) (*room.Room, string, error) {
	rm, err := s.open(raw)
	if err != nil {
		return nil, "", err
	}
	id, ok := rm.SeatOf(token)
	if !ok {
		return nil, "", errSeat
	}
	return rm, id, nil
}

func (s service) join(_ context.Context, _ *mcp.CallToolRequest, in joinIn) (*mcp.CallToolResult, joinOut, error) {
	name := strings.TrimSpace(in.Name)
	if name == "" || len([]rune(name)) > MaxNameLength {
		return nil, joinOut{}, errName
	}
	rm, err := s.open(in.Room)
	if err != nil {
		return nil, joinOut{}, err
	}
	token := uuid.New().String()
	s.rooms.RecordJoin()
	rm.JoinSeat(room.Player{ID: uuid.New().String(), Name: name, AI: true}, token)
	return nil, joinOut{Seat: token, State: rm.Snapshot()}, nil
}

func (s service) get(_ context.Context, _ *mcp.CallToolRequest, in roomIn) (*mcp.CallToolResult, stateOut, error) {
	rm, err := s.open(in.Room)
	if err != nil {
		return nil, stateOut{}, err
	}
	return nil, stateOut{State: rm.Snapshot()}, nil
}

func (s service) vote(_ context.Context, _ *mcp.CallToolRequest, in voteIn) (*mcp.CallToolResult, stateOut, error) {
	rm, id, err := s.seat(in.Room, in.Seat)
	if err != nil {
		return nil, stateOut{}, err
	}
	rm.CastVote(id, in.Card, room.AnyRound)
	return nil, stateOut{State: rm.Snapshot()}, nil
}

func (s service) leave(_ context.Context, _ *mcp.CallToolRequest, in seatIn) (*mcp.CallToolResult, stateOut, error) {
	rm, id, err := s.seat(in.Room, in.Seat)
	if err != nil {
		return nil, stateOut{}, err
	}
	rm.Leave(id)
	return nil, stateOut{State: rm.Snapshot()}, nil
}

const instructions = `CleanPoker is planning poker for agile teams. A person shares a room address;
join it with join_room, estimate the story your user gives you (the room does
not hold it), then vote one card of the room deck with vote. Votes stay hidden until a person reveals them, and
get_room shows the results after the reveal. Leave with leave_room when done.`

// NewServer builds the MCP server over rooms.
func NewServer(rooms Rooms, version string) *mcp.Server {
	srv := mcp.NewServer(&mcp.Implementation{Name: "cleanpoker", Title: "CleanPoker", Version: version},
		&mcp.ServerOptions{Instructions: instructions})
	s := service{rooms: rooms}
	mcp.AddTool(srv, &mcp.Tool{Name: "join_room", Description: "Join a planning poker room as a participant marked as an AI. Returns the seat token and the room state."}, s.join)
	mcp.AddTool(srv, &mcp.Tool{Name: "get_room", Description: "Read a room: deck, round, who voted, and the results once a person has revealed the votes."}, s.get)
	mcp.AddTool(srv, &mcp.Tool{Name: "vote", Description: "Vote one card of the room deck, hidden from the team until the reveal. An empty card withdraws the vote."}, s.vote)
	mcp.AddTool(srv, &mcp.Tool{Name: "leave_room", Description: "Leave the room and give up the seat."}, s.leave)
	return srv
}

// Handler serves the MCP endpoint. Each request stands alone: the seat token
// carries the identity, so no session is kept between calls.
func Handler(rooms Rooms, version string) http.Handler {
	srv := NewServer(rooms, version)
	return mcp.NewStreamableHTTPHandler(func(*http.Request) *mcp.Server { return srv }, &mcp.StreamableHTTPOptions{
		Stateless:    true,
		JSONResponse: true,
		// The server listens on loopback behind the tunnel, with the public
		// host in Host: the rebinding guard meant for local servers would
		// refuse every request. It holds no private data to protect.
		DisableLocalhostProtection: true,
	})
}
