package handler_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/florianmousseau/cleanpoker/internal/handler"
	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/florianmousseau/cleanpoker/internal/store"
	"golang.org/x/net/websocket"
)

// wsMsg mirrors the on-wire message format so tests don't need to import room internals.
type wsMsg struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

func newTestServer(t *testing.T) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(handler.New(store.New(), []string{"http://test"}))
	t.Cleanup(srv.Close)
	return srv
}

func createRoom(t *testing.T, srv *httptest.Server) string {
	t.Helper()
	resp, err := http.Post(srv.URL+"/rooms", "application/json", strings.NewReader("{}"))
	if err != nil {
		t.Fatalf("POST /rooms: %v", err)
	}
	defer func() { _ = resp.Body.Close() }()
	var body struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("decode room: %v", err)
	}
	if body.ID == "" {
		t.Fatal("empty room ID")
	}
	return body.ID
}

func wsConnect(t *testing.T, srv *httptest.Server, roomID, name string) *websocket.Conn {
	t.Helper()
	u := "ws" + strings.TrimPrefix(srv.URL, "http") + "/rooms/" + roomID + "/ws?name=" + name
	conn, err := websocket.Dial(u, "", "http://test")
	if err != nil {
		t.Fatalf("websocket dial: %v", err)
	}
	t.Cleanup(func() { _ = conn.Close() })
	return conn
}

func recv(t *testing.T, conn *websocket.Conn) wsMsg {
	t.Helper()
	var msg wsMsg
	if err := websocket.JSON.Receive(conn, &msg); err != nil {
		t.Fatalf("websocket receive: %v", err)
	}
	return msg
}

func send(t *testing.T, conn *websocket.Conn, typ, payload string) {
	t.Helper()
	if err := websocket.JSON.Send(conn, map[string]string{"type": typ, "payload": payload}); err != nil {
		t.Fatalf("websocket send: %v", err)
	}
}

func decodeSnap(t *testing.T, msg wsMsg) room.Snapshot {
	t.Helper()
	var snap room.Snapshot
	if err := json.Unmarshal(msg.Payload, &snap); err != nil {
		t.Fatalf("decode snapshot: %v", err)
	}
	return snap
}

// --- Health ---

func TestHealth(t *testing.T) {
	srv := newTestServer(t)
	resp, err := http.Get(srv.URL + "/health")
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = resp.Body.Close() }()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- Room creation ---

func TestCreateRoom_ReturnsID(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	if len(id) == 0 {
		t.Fatal("expected non-empty room ID")
	}
}

func TestCreateRoom_CustomCards(t *testing.T) {
	srv := newTestServer(t)
	resp, err := http.Post(srv.URL+"/rooms", "application/json",
		strings.NewReader(`{"cards":["XS","S","M","L"]}`))
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = resp.Body.Close() }()
	var body struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("decode custom cards room: %v", err)
	}
	if body.ID == "" {
		t.Fatal("expected room ID with custom cards")
	}
}

// --- WebSocket validation ---

func TestWebSocket_NameRequired(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	resp, err := http.Get(srv.URL + "/rooms/" + id + "/ws")
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = resp.Body.Close() }()
	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

// --- Happy path: full vote → show → clear cycle ---

func TestHappyPath_VoteShowClear(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	conn := wsConnect(t, srv, id, "Alice")

	// welcome message carries the player ID
	welcome := recv(t, conn)
	if welcome.Type != "welcome" {
		t.Fatalf("expected welcome, got %q", welcome.Type)
	}

	// initial state: voting, round 1, Alice present
	snap := decodeSnap(t, recv(t, conn))
	if snap.State != room.StateVoting {
		t.Fatalf("expected voting, got %s", snap.State)
	}
	if snap.Round != 1 {
		t.Fatalf("expected round 1, got %d", snap.Round)
	}
	if len(snap.Players) != 1 || snap.Players[0].Name != "Alice" {
		t.Fatalf("expected Alice in room, got %v", snap.Players)
	}

	// vote: "5"
	send(t, conn, "vote", "5")
	snap = decodeSnap(t, recv(t, conn))
	if snap.State != room.StateVoting {
		t.Fatalf("expected still voting after vote, got %s", snap.State)
	}
	if snap.Players[0].Vote != "hidden" {
		t.Fatalf("expected hidden vote during voting, got %q", snap.Players[0].Vote)
	}

	// show: votes revealed
	send(t, conn, "show", "")
	snap = decodeSnap(t, recv(t, conn))
	if snap.State != room.StateRevealed {
		t.Fatalf("expected revealed, got %s", snap.State)
	}
	if snap.Results == nil {
		t.Fatal("expected results after show")
	}
	if snap.Players[0].Vote != "5" {
		t.Fatalf("expected vote 5 after reveal, got %q", snap.Players[0].Vote)
	}
	if snap.Results.Avg != "5" {
		t.Fatalf("expected avg 5, got %s", snap.Results.Avg)
	}

	// clear: new round
	send(t, conn, "clear", "")
	snap = decodeSnap(t, recv(t, conn))
	if snap.State != room.StateVoting {
		t.Fatalf("expected voting after clear, got %s", snap.State)
	}
	if snap.Round != 2 {
		t.Fatalf("expected round 2, got %d", snap.Round)
	}
	if snap.Results != nil {
		t.Fatal("expected no results after clear")
	}
	if snap.Players[0].Vote != "" {
		t.Fatalf("expected empty vote after clear, got %q", snap.Players[0].Vote)
	}
}
