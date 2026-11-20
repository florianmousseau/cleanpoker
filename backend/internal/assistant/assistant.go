// Package assistant serves the rooms to AI assistants over the Model Context
// Protocol: an assistant joins a room as a marked participant, reads it, and
// votes like anyone. It may add stories where a participant may, and reads
// the estimates the team kept. It never reveals, starts a round, keeps an
// estimate or removes anybody.
package assistant

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"regexp"
	"strings"

	"github.com/florianmousseau/pokeragile/internal/room"
	"github.com/florianmousseau/pokeragile/internal/store"
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

// maxTitlesPerCall bounds the work of one add_stories call.
const maxTitlesPerCall = 2 * room.MaxStories

var roomID = regexp.MustCompile(`^[A-Za-z0-9_-]{1,64}$`)

var (
	errRoom    = errors.New("room must be a PokerAgile room address or its id, e.g. https://pokeragile.com/1a2b3c4d")
	errSeat    = errors.New("no seat matches this token in this room: join it first")
	errName    = errors.New("name must be 1 to 30 characters")
	errTooMany = errors.New("too many stories in one call: a room holds 100 at most")
	errGone    = errors.New("no open room at this address: check it, or ask a person to open it in a browser first")
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
	Room   string `json:"room" jsonschema:"the room address or id"`
	Seat   string `json:"seat" jsonschema:"the token join_room returned"`
	Card   string `json:"card" jsonschema:"one card of the room deck, or empty to withdraw the vote"`
	Reason string `json:"reason,omitempty" jsonschema:"why this card, in one or two sentences; shown to the team at the reveal"`
}

type seatIn struct {
	Room string `json:"room" jsonschema:"the room address or id"`
	Seat string `json:"seat" jsonschema:"the token join_room returned"`
}

type stateOut struct {
	Story string        `json:"story" jsonschema:"the title of the story on the table, empty when the room has no list"`
	State room.Snapshot `json:"state"`
}

func stateOf(rm *room.Room) stateOut {
	snap := rm.Snapshot()
	out := stateOut{State: snap}
	if snap.Current >= 0 && snap.Current < len(snap.Stories) {
		out.Story = snap.Stories[snap.Current].Title
	}
	return out
}

type addIn struct {
	Room    string   `json:"room" jsonschema:"the room address or id"`
	Seat    string   `json:"seat" jsonschema:"the token join_room returned"`
	Stories []string `json:"stories" jsonschema:"story titles in the order to estimate them, one per item, 200 characters at most each"`
}

type addOut struct {
	Added   int           `json:"added" jsonschema:"how many stories joined the list"`
	Refused int           `json:"refused" jsonschema:"how many did not"`
	Why     string        `json:"why" jsonschema:"why some were refused or shortened, empty when none was"`
	Story   string        `json:"story" jsonschema:"the title of the story on the table"`
	State   room.Snapshot `json:"state"`
}

type estimate struct {
	Title    string `json:"title"`
	Estimate string `json:"estimate" jsonschema:"the card the team kept, empty when none yet"`
	OnTable  bool   `json:"onTable" jsonschema:"true for the story being estimated now"`
}

type estimatesOut struct {
	Stories  []estimate `json:"stories"`
	Markdown string     `json:"markdown" jsonschema:"the same list as a Markdown table"`
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
	return nil, stateOf(rm), nil
}

func (s service) add(_ context.Context, _ *mcp.CallToolRequest, in addIn) (*mcp.CallToolResult, addOut, error) {
	rm, id, err := s.seat(in.Room, in.Seat)
	if err != nil {
		return nil, addOut{}, err
	}
	if len(in.Stories) > maxTitlesPerCall {
		return nil, addOut{}, errTooMany
	}
	titles := make([]string, len(in.Stories))
	for i, t := range in.Stories {
		// One story per item: a line break inside a title is a space.
		titles[i] = strings.Join(strings.Fields(t), " ")
	}
	done, err := rm.AddStoryTitles(id, titles)
	if err != nil {
		return nil, addOut{}, err
	}
	now := stateOf(rm)
	return nil, addOut{Added: done.Added, Refused: done.Blank + done.Full, Why: why(done), Story: now.Story, State: now.State}, nil
}

func why(done room.StoriesAdded) string {
	var parts []string
	if done.Blank > 0 {
		parts = append(parts, fmt.Sprintf("%d blank", done.Blank))
	}
	if done.Full > 0 {
		parts = append(parts, fmt.Sprintf("%d refused, the list holds %d stories at most", done.Full, room.MaxStories))
	}
	if done.Cut > 0 {
		parts = append(parts, fmt.Sprintf("%d added but shortened to %d characters", done.Cut, room.MaxStoryLength))
	}
	return strings.Join(parts, "; ")
}

func (s service) estimates(_ context.Context, _ *mcp.CallToolRequest, in roomIn) (*mcp.CallToolResult, estimatesOut, error) {
	rm, err := s.open(in.Room)
	if err != nil {
		return nil, estimatesOut{}, err
	}
	snap := rm.Snapshot()
	out := estimatesOut{Stories: make([]estimate, len(snap.Stories))}
	for i, st := range snap.Stories {
		out.Stories[i] = estimate{Title: st.Title, Estimate: st.Estimate, OnTable: i == snap.Current}
	}
	out.Markdown = markdown(out.Stories)
	return nil, out, nil
}

var cell = strings.NewReplacer("|", `\|`, "\n", " ", "\r", " ")

func markdown(stories []estimate) string {
	var b strings.Builder
	b.WriteString("| # | Story | Estimate |\n| --- | --- | --- |\n")
	for i, st := range stories {
		fmt.Fprintf(&b, "| %d | %s | %s |\n", i+1, cell.Replace(st.Title), cell.Replace(st.Estimate))
	}
	return b.String()
}

func (s service) vote(_ context.Context, _ *mcp.CallToolRequest, in voteIn) (*mcp.CallToolResult, stateOut, error) {
	rm, id, err := s.seat(in.Room, in.Seat)
	if err != nil {
		return nil, stateOut{}, err
	}
	// Returned as an error, the refusal reaches the assistant as a tool
	// error: it used to read a success and tell its user it had voted.
	if err := rm.CastVoteWithReason(id, in.Card, in.Reason, room.AnyRound); err != nil {
		return nil, stateOut{}, err
	}
	return nil, stateOf(rm), nil
}

func (s service) leave(_ context.Context, _ *mcp.CallToolRequest, in seatIn) (*mcp.CallToolResult, stateOut, error) {
	rm, id, err := s.seat(in.Room, in.Seat)
	if err != nil {
		return nil, stateOut{}, err
	}
	rm.Leave(id)
	return nil, stateOf(rm), nil
}

const instructions = `PokerAgile is planning poker for agile teams. A person shares a room address;
join it with join_room. If your user asks you to bring stories from their
tracker, read them with your own access to it and add their titles with
add_stories. When the room holds a list of stories, "story" in get_room is the
one on the table: estimate it. Otherwise your user gives you the story. Vote
one card of the room deck ("cards") with vote, with a one or two sentence
reason: votes and reasons stay hidden until a person reveals them, and get_room
shows the results after the reveal. People choose the story on the table,
reveal, and keep the estimate of each story; get_estimates returns the kept
estimates, for you to write back to the tracker yourself. PokerAgile connects
to no tracker. Leave with leave_room when done.`

// NewServer builds the MCP server over rooms.
func NewServer(rooms Rooms, version string) *mcp.Server {
	srv := mcp.NewServer(&mcp.Implementation{Name: "pokeragile", Title: "PokerAgile", Version: version},
		&mcp.ServerOptions{Instructions: instructions})
	s := service{rooms: rooms}
	mcp.AddTool(srv, &mcp.Tool{Name: "join_room", Description: "Join a planning poker room as a participant marked as an AI. Returns the seat token and the room state."}, s.join)
	mcp.AddTool(srv, &mcp.Tool{Name: "get_room", Description: "Read a room: the deck (cards), the round, the title of the story on the table (story), the story list, who voted, and the results once a person has revealed the votes.", Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true}}, s.get)
	mcp.AddTool(srv, &mcp.Tool{Name: "add_stories", Description: "Append story titles to the room's list, for instance the sprint's stories read from your user's tracker. Returns how many were added, how many were refused and why, and the room state; refused when the host locked the room."}, s.add)
	mcp.AddTool(srv, &mcp.Tool{Name: "get_estimates", Description: "Read the story list with the estimate the team kept for each, as data and as a Markdown table. Call it when the session is over, to write the estimates back to the tracker.", Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true}}, s.estimates)
	mcp.AddTool(srv, &mcp.Tool{Name: "vote", Description: "Vote one card of the room deck with a short reason, both hidden from the team until the reveal. An empty card withdraws the vote."}, s.vote)
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
