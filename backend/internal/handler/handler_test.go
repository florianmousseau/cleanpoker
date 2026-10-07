package handler_test

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/handler"
	"github.com/florianmousseau/cleanpoker/internal/health"
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
	srv, _ := newTestServerWithStore(t)
	return srv
}

// newTestServerWithStore serves the real handler with the real probe walking
// the server itself, the way production walks its own listener.
func newTestServerWithStore(t *testing.T) (*httptest.Server, *store.Store) {
	t.Helper()
	s := store.New()
	checker := &health.Checker{
		Head: func(context.Context) (health.Head, error) {
			return health.Head{SHA: "abcdef0123", Date: time.Now()}, nil
		},
		Commit: "abcdef0123",
		Since:  s.Usage().Since,
		Now:    time.Now,
	}
	srv := httptest.NewServer(handler.New(s, []string{"http://test"}, checker.Report))
	t.Cleanup(srv.Close)
	checker.Walk = health.RoomWalk(srv.URL, "http://test", srv.Client(), s.Remove)
	return srv, s
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

type healthBody struct {
	Status        string           `json:"status"`
	UptimeSeconds *int64           `json:"uptimeSeconds"`
	Alerte        string           `json:"alerte"`
	Constats      []health.Constat `json:"constats"`
	Echecs        []string         `json:"echecs_des_sondes"`
	Deploye       health.Deploye   `json:"deploye"`
}

func getHealth(t *testing.T, url string) healthBody {
	t.Helper()
	resp, err := http.Get(url + "/health")
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = resp.Body.Close() }()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	if got := resp.Header.Get("Content-Type"); got != "application/json" {
		t.Fatalf("expected a JSON content type, got %q", got)
	}
	if got := resp.Header.Get("Cache-Control"); got != "no-store" {
		t.Fatalf("a probe must never be cached, got %q", got)
	}
	var body healthBody
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatalf("decode health: %v", err)
	}
	return body
}

func TestHealth(t *testing.T) {
	srv, s := newTestServerWithStore(t)
	body := getHealth(t, srv.URL)
	if body.Status != "ok" || body.UptimeSeconds == nil {
		t.Fatalf("expected status ok and an uptime, got %+v", body)
	}
	if body.Alerte != health.OK || len(body.Echecs) != 0 {
		t.Fatalf("expected a green probe on a healthy server, got %+v", body)
	}
	if body.Constats[0].Nom != "salle" || body.Constats[0].Niveau != health.OK {
		t.Fatalf("expected the room walk to pass, got %+v", body.Constats)
	}
	if body.Deploye.Juge != "a jour" {
		t.Fatalf("expected the build to be judged up to date, got %+v", body.Deploye)
	}
	// The walk is not a session: it must leave no room and no arrival behind.
	if u := s.Usage(); u.RoomsCreated != 0 || u.ParticipantsJoined != 0 || u.ActiveRooms != 0 {
		t.Fatalf("the probe left a trace in the usage counters: %+v", u)
	}
}

// The real defect behind this one: a Fly secret ALLOWED_ORIGIN that forgets
// the site. The server answers 200 to everything and every browser is refused.
func TestHealth_RedWhenTheSiteOriginIsRefused(t *testing.T) {
	s := store.New()
	checker := &health.Checker{
		Head: func(context.Context) (health.Head, error) {
			return health.Head{SHA: "abcdef0123", Date: time.Now()}, nil
		},
		Commit: "abcdef0123",
		Since:  s.Usage().Since,
		Now:    time.Now,
	}
	srv := httptest.NewServer(handler.New(s, []string{"http://localhost:5173"}, checker.Report))
	t.Cleanup(srv.Close)
	checker.Walk = health.RoomWalk(srv.URL, "https://cleanpoker.dev", srv.Client(), s.Remove)

	body := getHealth(t, srv.URL)
	if body.Alerte != health.Rouge {
		t.Fatalf("expected red when the site origin is refused, got %+v", body)
	}
	if len(body.Echecs) != 1 || !strings.Contains(body.Echecs[0], "CORS") {
		t.Fatalf("expected the CORS reason to travel, got %v", body.Echecs)
	}
}

// A server whose WebSocket route is gone still creates rooms: the home page
// works and every room is empty. Only the join can see it.
func TestHealth_RedWhenTheRoomCannotBeJoined(t *testing.T) {
	s := store.New()
	checker := &health.Checker{
		Head: func(context.Context) (health.Head, error) {
			return health.Head{SHA: "abcdef0123", Date: time.Now()}, nil
		},
		Commit: "abcdef0123",
		Since:  s.Usage().Since,
		Now:    time.Now,
	}
	healthy := handler.New(s, []string{"http://test"}, checker.Report)
	broken := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/ws") {
			http.Error(w, "gone", http.StatusBadGateway)
			return
		}
		healthy.ServeHTTP(w, r)
	})
	srv := httptest.NewServer(broken)
	t.Cleanup(srv.Close)
	checker.Walk = health.RoomWalk(srv.URL, "http://test", srv.Client(), s.Remove)

	body := getHealth(t, srv.URL)
	if body.Alerte != health.Rouge || len(body.Echecs) != 1 || !strings.Contains(body.Echecs[0], "WebSocket") {
		t.Fatalf("expected red with the WebSocket reason, got %+v", body)
	}
	if u := s.Usage(); u.ActiveRooms != 0 {
		t.Fatalf("a failed walk must still close its room, got %+v", u)
	}
}

// --- Usage counters ---

func getStats(t *testing.T, srv *httptest.Server) store.Usage {
	t.Helper()
	resp, err := http.Get(srv.URL + "/stats")
	if err != nil {
		t.Fatalf("GET /stats: %v", err)
	}
	defer func() { _ = resp.Body.Close() }()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var usage store.Usage
	if err := json.NewDecoder(resp.Body).Decode(&usage); err != nil {
		t.Fatalf("decode stats: %v", err)
	}
	return usage
}

func TestStats_EmptyServerCountsNothing(t *testing.T) {
	srv := newTestServer(t)
	usage := getStats(t, srv)
	if usage.RoomsCreated != 0 || usage.ParticipantsJoined != 0 || usage.ActiveRooms != 0 {
		t.Fatalf("expected an idle server to count nothing, got %+v", usage)
	}
	if usage.Since.IsZero() {
		t.Fatal("expected the counters to say from when they count")
	}
}

// The ratio this endpoint exists for: how many people one created room brings in.
func TestStats_CountsRoomsAndEveryArrival(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	for _, name := range []string{"amandine", "bruno", "chloe"} {
		conn := wsConnect(t, srv, id, name)
		recv(t, conn) // welcome
		recv(t, conn) // state, sent after the arrival is counted
	}

	usage := getStats(t, srv)
	if usage.RoomsCreated != 1 {
		t.Fatalf("expected 1 room created, got %d", usage.RoomsCreated)
	}
	if usage.ParticipantsJoined != 3 {
		t.Fatalf("expected 3 arrivals, got %d", usage.ParticipantsJoined)
	}
	if usage.ActiveRooms != 1 {
		t.Fatalf("expected 1 active room, got %d", usage.ActiveRooms)
	}
}

func TestStats_ObserversCountAsArrivals(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	u := "ws" + strings.TrimPrefix(srv.URL, "http") + "/rooms/" + id + "/ws?name=po&observer=true"
	conn, err := websocket.Dial(u, "", "http://test")
	if err != nil {
		t.Fatalf("websocket dial: %v", err)
	}
	defer func() { _ = conn.Close() }()
	recv(t, conn)
	recv(t, conn)

	if got := getStats(t, srv).ParticipantsJoined; got != 1 {
		t.Fatalf("expected the observer to count as an arrival, got %d", got)
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

// A plain GET is refused by the websocket handshake whatever the name, so these
// dial a real socket: only the name can make it fail.
func dialFails(t *testing.T, srv *httptest.Server, roomID, name string) bool {
	t.Helper()
	u := "ws" + strings.TrimPrefix(srv.URL, "http") + "/rooms/" + roomID + "/ws?name=" + url.QueryEscape(name)
	conn, err := websocket.Dial(u, "", "http://test")
	if err == nil {
		_ = conn.Close()
	}
	return err != nil
}

func TestWebSocket_NameLongerThanTheFormAllowsIsRefused(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	if !dialFails(t, srv, id, strings.Repeat("N", handler.MaxNameLength+1)) {
		t.Fatalf("a %d-character name was seated", handler.MaxNameLength+1)
	}
	if dialFails(t, srv, id, strings.Repeat("N", handler.MaxNameLength)) {
		t.Fatalf("a %d-character name was refused", handler.MaxNameLength)
	}
}

func TestWebSocket_NameCountsCharactersNotBytes(t *testing.T) {
	// "é" is two bytes: counting bytes would refuse a name the form accepts.
	srv := newTestServer(t)
	id := createRoom(t, srv)
	if dialFails(t, srv, id, strings.Repeat("é", handler.MaxNameLength)) {
		t.Fatalf("a %d-character accented name was refused", handler.MaxNameLength)
	}
}

func TestWebSocket_BlankNameIsRefused(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	if !dialFails(t, srv, id, "   ") {
		t.Fatal("a blank name was seated")
	}
}

// --- Happy path: full vote -> show -> clear cycle ---

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

// One arrival, one state. This is what made TestHappyPath_VoteShowClear
// intermittent on CI: the client used to get a directly sent snapshot AND,
// depending on which queued message the room loop picked first, the broadcast
// of its own arrival. Every later read was then one message behind, and the
// vote assertion read the pre-vote snapshot. A duplicate here is silent in the
// browser, which is why it survived until a test read the messages in order.
func TestWebSocket_ArrivalSendsExactlyOneState(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	conn := wsConnect(t, srv, id, "Alice")

	if got := recv(t, conn).Type; got != "welcome" {
		t.Fatalf("expected welcome, got %q", got)
	}
	if got := recv(t, conn).Type; got != "state" {
		t.Fatalf("expected state, got %q", got)
	}

	if err := conn.SetReadDeadline(time.Now().Add(200 * time.Millisecond)); err != nil {
		t.Fatalf("set read deadline: %v", err)
	}
	var extra wsMsg
	switch err := websocket.JSON.Receive(conn, &extra); {
	case err == nil:
		t.Fatalf("expected nothing more after the initial state, got a %q", extra.Type)
	case !errors.Is(err, os.ErrDeadlineExceeded):
		t.Fatalf("expected the read to time out on an idle connection, got %v", err)
	}
}

// --- A reload keeps the seat (QA-105) ---

type welcomePayload struct {
	ID    string `json:"id"`
	Token string `json:"token"`
	Vote  string `json:"vote"`
}

func dial(t *testing.T, srv *httptest.Server, roomID, query string) *websocket.Conn {
	t.Helper()
	u := "ws" + strings.TrimPrefix(srv.URL, "http") + "/rooms/" + roomID + "/ws?" + query
	conn, err := websocket.Dial(u, "", "http://test")
	if err != nil {
		t.Fatalf("websocket dial: %v", err)
	}
	t.Cleanup(func() { _ = conn.Close() })
	return conn
}

func decodeWelcome(t *testing.T, msg wsMsg) welcomePayload {
	t.Helper()
	if msg.Type != "welcome" {
		t.Fatalf("expected welcome, got %q", msg.Type)
	}
	var w welcomePayload
	if err := json.Unmarshal(msg.Payload, &w); err != nil {
		t.Fatalf("decode welcome: %v", err)
	}
	return w
}

func activityHas(snap room.Snapshot, message string) bool {
	for _, a := range snap.Activity {
		if a.Message == message {
			return true
		}
	}
	return false
}

func TestWebSocket_ReloadTakesTheSameSeatBack(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)

	bob := wsConnect(t, srv, id, "Bob")
	recv(t, bob) // welcome
	recv(t, bob) // Bob arrives

	alice := wsConnect(t, srv, id, "Alice")
	first := decodeWelcome(t, recv(t, alice))
	if first.Token == "" {
		t.Fatal("expected a token to come back with")
	}
	recv(t, alice) // Alice arrives
	recv(t, bob)
	send(t, alice, "vote", "5")
	recv(t, alice)
	recv(t, bob)

	_ = alice.Close()
	again := dial(t, srv, id, "name=Alice&token="+first.Token)
	back := decodeWelcome(t, recv(t, again))
	if back.ID != first.ID {
		t.Fatalf("expected the same seat %s, got %s", first.ID, back.ID)
	}
	if back.Vote != "5" {
		t.Fatalf("expected the vote to survive the reload, got %q", back.Vote)
	}

	snap := decodeSnap(t, recv(t, again))
	if len(snap.Players) != 2 {
		t.Fatalf("expected Alice and Bob, not a second Alice, got %d players", len(snap.Players))
	}
	if activityHas(snap, "left") {
		t.Fatal("the team must not read that Alice left: she reloaded")
	}
	if got := getStats(t, srv).ParticipantsJoined; got != 2 {
		t.Fatalf("expected a seat taken back not to count as an arrival, got %d", got)
	}
}

func TestWebSocket_UnknownTokenGetsANewSeat(t *testing.T) {
	srv := newTestServer(t)
	id := createRoom(t, srv)
	conn := dial(t, srv, id, "name=Alice&token=nothing-here")

	w := decodeWelcome(t, recv(t, conn))
	if w.Token == "" || w.Token == "nothing-here" {
		t.Fatalf("expected a fresh token for a fresh seat, got %q", w.Token)
	}
	snap := decodeSnap(t, recv(t, conn))
	if len(snap.Players) != 1 || !activityHas(snap, "joined") {
		t.Fatalf("expected Alice to arrive as a new player, got %+v", snap.Players)
	}
}
