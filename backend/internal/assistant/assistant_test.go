package assistant

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/florianmousseau/pokeragile/internal/room"
	"github.com/florianmousseau/pokeragile/internal/store"
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
	if len(out.Result.Tools) != 7 {
		t.Fatalf("expected 7 tools, got %+v", out.Result.Tools)
	}
}

func TestVote_CarriesAReasonAndTheStoryOnTheTableIsReadable(t *testing.T) {
	s := store.New()
	rm, _ := s.GetOrCreate("team42", nil)
	rm.Join("p1", "Alice", false)
	rm.AddStories("p1", "CSV export\nLogin")
	cs := connect(t, s)

	var joined joinOut
	call(t, cs, "join_room", map[string]any{"room": "team42", "name": "Claude"}, &joined)
	if joined.State.Current != 0 || joined.State.Stories[0].Title != "CSV export" {
		t.Fatalf("the assistant cannot read the story on the table: %+v", joined.State.Stories)
	}
	call(t, cs, "vote", map[string]any{"room": "team42", "seat": joined.Seat, "card": "8", "reason": "No test plan."}, nil)
	rm.Show("p1")
	var read stateOut
	call(t, cs, "get_room", map[string]any{"room": "team42"}, &read)
	for _, p := range read.State.Players {
		if p.AI && p.Reason != "No test plan." {
			t.Fatalf("expected the reason after the reveal, got %q", p.Reason)
		}
	}
}

// errorText is what the assistant reads when a tool call fails.
func errorText(res *mcp.CallToolResult) string {
	if !res.IsError || len(res.Content) == 0 {
		return ""
	}
	text, _ := res.Content[0].(*mcp.TextContent)
	if text == nil {
		return ""
	}
	return text.Text
}

func TestVote_ACardOutsideTheDeckIsAnError(t *testing.T) {
	s := store.New()
	rm, _ := s.GetOrCreate("team42", nil)
	cs := connect(t, s)
	var joined joinOut
	call(t, cs, "join_room", map[string]any{"room": "team42", "name": "Claude"}, &joined)

	res := call(t, cs, "vote", map[string]any{"room": "team42", "seat": joined.Seat, "card": "4"}, nil)
	if got := errorText(res); !strings.Contains(got, "not in the room deck") {
		t.Fatalf("expected a tool error naming the deck, got %q", got)
	}
	if rm.Snapshot().Players[0].Vote != "" {
		t.Fatal("the refused card was recorded")
	}
}

func TestVote_AfterTheRevealIsAnError(t *testing.T) {
	s := store.New()
	rm, _ := s.GetOrCreate("team42", nil)
	rm.Join("p1", "Alice", false)
	cs := connect(t, s)
	var joined joinOut
	call(t, cs, "join_room", map[string]any{"room": "team42", "name": "Claude"}, &joined)
	rm.CastVote("p1", "5", room.AnyRound)
	rm.Show("p1")

	res := call(t, cs, "vote", map[string]any{"room": "team42", "seat": joined.Seat, "card": "8"}, nil)
	if got := errorText(res); !strings.Contains(got, "already revealed") {
		t.Fatalf("expected a tool error naming the reveal, got %q", got)
	}
	if got := rm.Snapshot().Results.Avg; got != "5" {
		t.Fatalf("the late vote changed the results: avg %q", got)
	}
}

func seatIn42(t *testing.T) (*room.Room, *mcp.ClientSession, string) {
	t.Helper()
	s := store.New()
	rm, err := s.GetOrCreate("team42", nil)
	if err != nil {
		t.Fatal(err)
	}
	rm.Join("p1", "Alice", false)
	cs := connect(t, s)
	var joined joinOut
	call(t, cs, "join_room", map[string]any{"room": "team42", "name": "Claude"}, &joined)
	return rm, cs, joined.Seat
}

func TestAddStories_AppendsTrimmedTitlesAndNamesTheOneOnTheTable(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	var out addOut
	call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat,
		"stories": []string{"  CSV export ", "", "Login\nwith SSO"}}, &out)
	if out.Added != 2 || out.Refused != 1 || out.Why != "1 blank" {
		t.Fatalf("got added %d, refused %d, why %q", out.Added, out.Refused, out.Why)
	}
	if out.Story != "CSV export" || out.State.Current != 0 {
		t.Fatalf("expected the first story on the table, got %q at %d", out.Story, out.State.Current)
	}
	got := rm.Snapshot().Stories
	if len(got) != 2 || got[0].Title != "CSV export" || got[1].Title != "Login with SSO" {
		t.Fatalf("unexpected list: %+v", got)
	}
	if rm.Snapshot().Host != "p1" {
		t.Fatal("adding stories changed the host")
	}
}

func TestAddStories_CutsLongTitlesAndStopsAtTheListLimit(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	titles := make([]string, room.MaxStories+2)
	for i := range titles {
		titles[i] = "story"
	}
	titles[0] = strings.Repeat("é", room.MaxStoryLength+5)
	var out addOut
	call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat, "stories": titles}, &out)
	if out.Added != room.MaxStories || out.Refused != 2 {
		t.Fatalf("got added %d, refused %d", out.Added, out.Refused)
	}
	if !strings.Contains(out.Why, "2 refused, the list holds 100") || !strings.Contains(out.Why, "1 added but shortened to 200") {
		t.Fatalf("unexpected why: %q", out.Why)
	}
	got := rm.Snapshot().Stories
	if len(got) != room.MaxStories || len([]rune(got[0].Title)) != room.MaxStoryLength {
		t.Fatalf("expected %d stories and a cut title, got %d and %d runes", room.MaxStories, len(got), len([]rune(got[0].Title)))
	}
}

func TestAddStories_TooManyInOneCallIsAnError(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	res := call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat,
		"stories": make([]string, maxTitlesPerCall+1)}, nil)
	if got := errorText(res); !strings.Contains(got, "too many stories") {
		t.Fatalf("expected a tool error, got %q", got)
	}
	if len(rm.Snapshot().Stories) != 0 {
		t.Fatal("the refused call added stories")
	}
}

func TestAddStories_ALockedRoomIsAnError(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	rm.SetLocked("p1", true)
	res := call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat, "stories": []string{"Login"}}, nil)
	if got := errorText(res); !strings.Contains(got, "the host locked the room: ask the host to add the stories or unlock") {
		t.Fatalf("expected a tool error naming the lock, got %q", got)
	}
	if len(rm.Snapshot().Stories) != 0 {
		t.Fatal("the locked room took the stories")
	}
	rm.SetLocked("p1", false)
	var out addOut
	call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat, "stories": []string{"Login"}}, &out)
	if out.Added != 1 {
		t.Fatalf("expected the unlocked room to take the story, got %+v", out)
	}
}

func TestAddStories_NeedsASeat(t *testing.T) {
	rm, cs, _ := seatIn42(t)
	for _, seat := range []any{"", "nope", "p1"} {
		res := call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat, "stories": []string{"Login"}}, nil)
		if got := errorText(res); !strings.Contains(got, "join it first") {
			t.Fatalf("seat %q: expected a tool error, got %q", seat, got)
		}
	}
	if len(rm.Snapshot().Stories) != 0 {
		t.Fatal("a call without a seat added stories")
	}
}

func TestGetEstimates_ListsKeptEstimatesAndAMarkdownTable(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	call(t, cs, "add_stories", map[string]any{"room": "team42", "seat": seat,
		"stories": []string{"CSV export", "Login | SSO", "Search"}}, nil)
	rm.CastVote("p1", "5", room.AnyRound)
	rm.Show("p1")
	rm.Estimate("p1", "5")
	rm.SelectStory("p1", 1)

	var out estimatesOut
	call(t, cs, "get_estimates", map[string]any{"room": "https://pokeragile.com/team42"}, &out)
	want := []estimate{{Title: "CSV export", Estimate: "5"}, {Title: "Login | SSO", OnTable: true}, {Title: "Search"}}
	if len(out.Stories) != len(want) {
		t.Fatalf("expected %d stories, got %+v", len(want), out.Stories)
	}
	for i, w := range want {
		if out.Stories[i] != w {
			t.Errorf("story %d: got %+v, want %+v", i, out.Stories[i], w)
		}
	}
	table := "| # | Story | Estimate |\n| --- | --- | --- |\n| 1 | CSV export | 5 |\n| 2 | Login \\| SSO |  |\n| 3 | Search |  |\n"
	if out.Markdown != table {
		t.Fatalf("unexpected table:\n%s", out.Markdown)
	}
}

func TestGetEstimates_AnEmptyListAndAnUnopenedRoom(t *testing.T) {
	_, cs, _ := seatIn42(t)
	var out estimatesOut
	call(t, cs, "get_estimates", map[string]any{"room": "team42"}, &out)
	if len(out.Stories) != 0 || !strings.HasPrefix(out.Markdown, "| # | Story | Estimate |") {
		t.Fatalf("unexpected empty answer: %+v", out)
	}
	if res := call(t, cs, "get_estimates", map[string]any{"room": "typo1234"}, nil); !res.IsError {
		t.Fatal("expected an error for a room nobody opened")
	}
}

func TestGetRoom_NamesTheStoryOnTheTableAndTheDeck(t *testing.T) {
	rm, cs, _ := seatIn42(t)
	rm.AddStories("p1", "CSV export\nLogin")
	rm.SelectStory("p1", 1)
	var read stateOut
	call(t, cs, "get_room", map[string]any{"room": "team42"}, &read)
	if read.Story != "Login" || len(read.State.Cards) == 0 {
		t.Fatalf("expected the story and the deck, got %q and %v", read.Story, read.State.Cards)
	}
}

// The assistant has no tool for what a person decides.
func TestServer_OffersNoHostTool(t *testing.T) {
	cs := connect(t, store.New())
	res, err := cs.ListTools(context.Background(), nil)
	if err != nil {
		t.Fatal(err)
	}
	want := map[string]bool{"join_room": true, "get_room": true, "add_stories": true, "get_estimates": true, "vote": true, "report_actual": true, "leave_room": true}
	for _, tool := range res.Tools {
		if !want[tool.Name] {
			t.Errorf("unexpected tool %q", tool.Name)
		}
		delete(want, tool.Name)
	}
	if len(want) != 0 {
		t.Errorf("missing tools: %v", want)
	}
}

// keep puts each title on the table in turn and keeps card as its estimate.
func keep(t *testing.T, rm *room.Room, estimates ...string) {
	t.Helper()
	for i, card := range estimates {
		rm.SelectStory("p1", i)
		rm.CastVote("p1", card, room.AnyRound)
		rm.Show("p1")
		rm.Estimate("p1", card)
	}
}

func TestReportActual_RecordsTheMeasureAndGetEstimatesReturnsIt(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	rm.AddStories("p1", "CSV export\nLogin")
	keep(t, rm, "3")

	var out estimatesOut
	res := call(t, cs, "report_actual", map[string]any{"room": "team42", "seat": seat,
		"story": 1, "files": 4, "added": 120, "removed": 30, "tests": 6, "minutes": 45}, &out)
	if res.IsError {
		t.Fatalf("unexpected refusal: %+v", res.Content)
	}
	want := room.Actual{Files: 4, Added: 120, Removed: 30, Tests: 6, Minutes: 45}
	if got := out.Stories[0].Actual; got == nil || *got != want {
		t.Fatalf("expected %+v, got %+v", want, got)
	}
	if out.Stories[1].Actual != nil {
		t.Fatal("the other story was measured too")
	}
	var read estimatesOut
	call(t, cs, "get_estimates", map[string]any{"room": "team42"}, &read)
	if got := read.Stories[0].Actual; got == nil || *got != want {
		t.Fatalf("get_estimates lost the measure: %+v", got)
	}
}

func TestReportActual_Refusals(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	rm.AddStories("p1", "CSV export\nLogin")
	keep(t, rm, "3")
	ok := map[string]any{"room": "team42", "seat": seat, "story": 1, "files": 1, "added": 10, "removed": 0}
	with := func(key string, value any) map[string]any {
		args := map[string]any{}
		for k, v := range ok {
			args[k] = v
		}
		args[key] = value
		return args
	}
	cases := map[string]map[string]any{
		"no kept estimate":   with("story", 2),
		"no such story":      with("story", 3),
		"position zero":      with("story", 0),
		"unknown seat":       with("seat", "nope"),
		"negative number":    with("files", -1),
		"number too large":   with("added", room.MaxActual+1),
		"no line changed":    with("added", 0),
		"a file name":        with("path", "internal/room/room.go"),
		"a repository":       with("repository", "https://example.com/team/app"),
		"text for a number":  with("files", "four"),
		"a fractional count": with("added", 1.5),
	}
	for name, args := range cases {
		res, err := cs.CallTool(context.Background(), &mcp.CallToolParams{Name: "report_actual", Arguments: args})
		if err == nil && !res.IsError {
			t.Errorf("%s: expected a refusal", name)
		}
	}
	for _, st := range rm.Snapshot().Stories {
		if st.Actual != nil {
			t.Fatalf("a refused report was recorded: %+v", st)
		}
	}
}

func TestReportActual_ALockedRoomIsAnError(t *testing.T) {
	rm, cs, seat := seatIn42(t)
	rm.AddStories("p1", "CSV export")
	keep(t, rm, "3")
	rm.SetLocked("p1", true)
	res := call(t, cs, "report_actual", map[string]any{"room": "team42", "seat": seat, "story": 1, "files": 1, "added": 10, "removed": 0}, nil)
	if !res.IsError {
		t.Fatal("expected a refusal in a locked room")
	}
}

// The tool takes numbers and nothing else: no field could carry code, a file
// name or a repository address.
func TestReportActual_TakesOnlyNumbers(t *testing.T) {
	cs := connect(t, store.New())
	res, err := cs.ListTools(context.Background(), nil)
	if err != nil {
		t.Fatal(err)
	}
	for _, tool := range res.Tools {
		if tool.Name != "report_actual" {
			continue
		}
		raw, _ := json.Marshal(tool.InputSchema)
		var schema struct {
			Properties           map[string]struct{ Type string } `json:"properties"`
			AdditionalProperties any                              `json:"additionalProperties"`
		}
		if err := json.Unmarshal(raw, &schema); err != nil {
			t.Fatal(err)
		}
		if schema.AdditionalProperties != false {
			t.Errorf("the schema accepts unknown fields: %s", raw)
		}
		for name, p := range schema.Properties {
			if name != "room" && name != "seat" && p.Type != "integer" {
				t.Errorf("field %q is %q, not an integer", name, p.Type)
			}
		}
		return
	}
	t.Fatal("report_actual is not offered")
}

// An assistant with no reference must not invent a point.
func TestInstructions_TellTheAssistantToCalibrate(t *testing.T) {
	for _, want := range []string{"read get_estimates", `vote "?"`, "what you took as\none point", "report_actual", "Numbers only"} {
		if !strings.Contains(instructions, want) {
			t.Errorf("the instructions no longer say %q", want)
		}
	}
}
