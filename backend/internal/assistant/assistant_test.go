package assistant

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/florianmousseau/cleanpoker/internal/store"
	"github.com/modelcontextprotocol/go-sdk/mcp"
)

func TestRoomID(t *testing.T) {
	ok := map[string]string{
		"https://cleanpoker.dev/1a2b3c4d":        "1a2b3c4d",
		"https://cleanpoker.dev/1a2b3c4d/?x=1#y": "1a2b3c4d",
		" 1a2b3c4d ":                             "1a2b3c4d",
	}
	for in, want := range ok {
		got, err := RoomID(in)
		if err != nil || got != want {
			t.Errorf("%q: got %q, %v; want %q", in, got, err, want)
		}
	}
	for _, in := range []string{"", "https://cleanpoker.dev", "cleanpoker.dev/abc", "a/b", "../x", strings.Repeat("a", 65)} {
		if _, err := RoomID(in); err == nil {
			t.Errorf("%q: expected an error", in)
		}
	}
}

func connect(t *testing.T, s *store.Store) *mcp.ClientSession {
	t.Helper()
	ct, st := mcp.NewInMemoryTransports()
	ctx := context.Background()
	if _, err := NewServer(s, "test").Connect(ctx, st, nil); err != nil {
		t.Fatalf("server connect: %v", err)
	}
	cs, err := mcp.NewClient(&mcp.Implementation{Name: "test"}, nil).Connect(ctx, ct, nil)
	if err != nil {
		t.Fatalf("client connect: %v", err)
	}
	t.Cleanup(func() { _ = cs.Close() })
	return cs
}

func call(t *testing.T, cs *mcp.ClientSession, name string, args map[string]any, out any) *mcp.CallToolResult {
	t.Helper()
	res, err := cs.CallTool(context.Background(), &mcp.CallToolParams{Name: name, Arguments: args})
	if err != nil {
		t.Fatalf("%s: %v", name, err)
	}
	if out != nil && !res.IsError {
		raw, _ := json.Marshal(res.StructuredContent)
		if err := json.Unmarshal(raw, out); err != nil {
			t.Fatalf("%s: decode: %v", name, err)
		}
	}
	return res
}

func TestJoinVoteLeave(t *testing.T) {
	s := store.New()
	if _, err := s.GetOrCreate("team42", nil); err != nil {
		t.Fatal(err)
	}
	cs := connect(t, s)

	var joined joinOut
	call(t, cs, "join_room", map[string]any{"room": "https://cleanpoker.dev/team42", "name": "Claude"}, &joined)
	if joined.Seat == "" || len(joined.State.Players) != 1 || !joined.State.Players[0].AI {
		t.Fatalf("expected one AI seat, got %+v", joined)
	}
	if joined.State.Host != "" {
		t.Fatal("the AI became host")
	}

	var voted stateOut
	call(t, cs, "vote", map[string]any{"room": "team42", "seat": joined.Seat, "card": "5"}, &voted)
	if voted.State.Players[0].Vote != "hidden" {
		t.Fatalf("expected a hidden vote, got %q", voted.State.Players[0].Vote)
	}

	rm, _ := s.GetOrCreate("team42", nil)
	rm.Join("p1", "Alice", false)
	rm.Show("p1")
	var read stateOut
	call(t, cs, "get_room", map[string]any{"room": "team42"}, &read)
	if read.State.State != room.StateRevealed || read.State.Results == nil || read.State.Results.Avg != "5" {
		t.Fatalf("expected the AI vote in the revealed results, got %+v", read.State.Results)
	}

	var left stateOut
	call(t, cs, "leave_room", map[string]any{"room": "team42", "seat": joined.Seat}, &left)
	if len(left.State.Players) != 1 {
		t.Fatalf("expected the AI gone, got %d players", len(left.State.Players))
	}
}

func TestJoin_AnUnopenedRoomIsAnError(t *testing.T) {
	s := store.New()
	cs := connect(t, s)
	if res := call(t, cs, "join_room", map[string]any{"room": "typo1234", "name": "Claude"}, nil); !res.IsError {
		t.Fatal("expected an error for a room nobody opened")
	}
	if _, ok := s.Get("typo1234"); ok {
		t.Fatal("joining opened the room")
	}
}

func TestVote_UnknownSeatIsAnError(t *testing.T) {
	s := store.New()
	if _, err := s.GetOrCreate("team42", nil); err != nil {
		t.Fatal(err)
	}
	cs := connect(t, s)
	res := call(t, cs, "vote", map[string]any{"room": "team42", "seat": "nope", "card": "5"}, nil)
	if !res.IsError {
		t.Fatal("expected an error for an unknown seat")
	}
}

func TestJoin_RefusesABadNameOrRoom(t *testing.T) {
	s := store.New()
	if _, err := s.GetOrCreate("team42", nil); err != nil {
		t.Fatal(err)
	}
	cs := connect(t, s)
	if res := call(t, cs, "join_room", map[string]any{"room": "team42", "name": " "}, nil); !res.IsError {
		t.Fatal("expected an error for a blank name")
	}
	if res := call(t, cs, "join_room", map[string]any{"room": "a/b", "name": "Claude"}, nil); !res.IsError {
		t.Fatal("expected an error for a bad room")
	}
}

// The tunnel reaches the server on loopback with the public host in Host.
func TestHandler_AnswersAPublicHostOnLoopback(t *testing.T) {
	srv := httptest.NewServer(Handler(store.New(), "test"))
	defer srv.Close()
	body := `{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}`
	req, _ := http.NewRequest(http.MethodPost, srv.URL+"/mcp", strings.NewReader(body))
	req.Host = "salles.cleanpoker.dev"
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json, text/event-stream")
	req.Header.Set("Mcp-Protocol-Version", "2025-06-18")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("post: %v", err)
	}
	defer func() { _ = resp.Body.Close() }()
	var out struct {
		Result struct {
			Tools []struct{ Name string } `json:"tools"`
		} `json:"result"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		t.Fatalf("status %d, decode: %v", resp.StatusCode, err)
	}
	if len(out.Result.Tools) != 4 {
		t.Fatalf("expected 4 tools, got %+v", out.Result.Tools)
	}
}
