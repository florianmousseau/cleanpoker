package room

import (
	"testing"
)

// newTestRoom creates a room and drains its broadcast so tests don't block.
func newTestRoom(cards []string) *Room {
	r := New("test", cards)
	go func() {
		for range r.broadcast {
		}
	}()
	return r
}

func snap(r *Room) Snapshot {
	return r.Snapshot()
}

func playerVote(r *Room, playerID string) string {
	s := r.Snapshot()
	for _, p := range s.Players {
		if p.ID == playerID {
			return p.Vote
		}
	}
	return ""
}

// --- State machine ---

func TestNewRoom_InitialState(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	s := snap(r)
	if s.State != StateVoting {
		t.Fatalf("expected voting, got %s", s.State)
	}
	if s.Round != 1 {
		t.Fatalf("expected round 1, got %d", s.Round)
	}
	if len(s.Players) != 0 {
		t.Fatal("expected no players")
	}
}

func TestShow_TransitionsToRevealed(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "5")
	r.Show("p1")
	s := snap(r)
	if s.State != StateRevealed {
		t.Fatalf("expected revealed, got %s", s.State)
	}
	if s.Results == nil {
		t.Fatal("expected results after show")
	}
}

func TestClear_ResetsToVoting(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "5")
	r.Show("p1")
	r.Clear("p1")
	s := snap(r)
	if s.State != StateVoting {
		t.Fatalf("expected voting, got %s", s.State)
	}
	if s.Round != 2 {
		t.Fatalf("expected round 2, got %d", s.Round)
	}
	if s.Results != nil {
		t.Fatal("expected no results after clear")
	}
}

func TestClear_ClearsVotes(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "8")
	r.Show("p1")
	r.Clear("p1")
	if v := playerVote(r, "p1"); v != "" {
		t.Fatalf("expected empty vote after clear, got %q", v)
	}
}

// --- Player management ---

func TestJoin_AddsPlayer(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	s := snap(r)
	if len(s.Players) != 1 {
		t.Fatalf("expected 1 player, got %d", len(s.Players))
	}
	if s.Players[0].Name != "Alice" {
		t.Fatalf("expected Alice, got %s", s.Players[0].Name)
	}
	if s.Players[0].Observer {
		t.Fatal("expected non-observer")
	}
}

func TestJoin_Observer(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("obs", "Bob", true)
	s := snap(r)
	if !s.Players[0].Observer {
		t.Fatal("expected observer flag")
	}
	if len(s.Activity) == 0 || s.Activity[0].Message != "joined_observer" {
		t.Fatal("expected joined_observer activity")
	}
}

func TestLeave_RemovesPlayer(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Leave("p1")
	if len(snap(r).Players) != 0 {
		t.Fatal("expected no players after leave")
	}
}

func TestKick_RemovesPlayer(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("host", "Host", false)
	r.Join("p1", "Alice", false)
	r.Kick("host", "p1")
	s := snap(r)
	for _, p := range s.Players {
		if p.ID == "p1" {
			t.Fatal("kicked player still present")
		}
	}
}

func TestKick_LogsActivityWithTarget(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("host", "Host", false)
	r.Join("p1", "Alice", false)
	r.Kick("host", "p1")
	s := snap(r)
	for _, a := range s.Activity {
		if a.Message == "kicked" && a.Target == "Alice" {
			return
		}
	}
	t.Fatal("expected kicked activity with target Alice")
}

// --- Vote logic ---

func TestCastVote_RecordsVote(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "5")
	// Raw vote visible only after reveal; check via show
	r.Show("p1")
	s := snap(r)
	for _, p := range s.Players {
		if p.ID == "p1" && p.Vote != "5" {
			t.Fatalf("expected vote 5, got %q", p.Vote)
		}
	}
}

func TestCastVote_ObserverCannotVote(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("obs", "Bob", true)
	r.CastVote("obs", "3")
	r.Show("obs")
	if v := playerVote(r, "obs"); v != "" {
		t.Fatalf("observer should not have a vote, got %q", v)
	}
}

func TestCastVote_BlockedAfterReveal(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Show("p1")
	r.CastVote("p1", "8")
	s := snap(r)
	for _, p := range s.Players {
		if p.ID == "p1" && p.Vote != "" {
			t.Fatal("vote should be blocked in revealed state")
		}
	}
}

func TestSnapshot_VotesHiddenDuringVoting(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "8")
	s := snap(r) // masked snapshot
	for _, p := range s.Players {
		if p.ID == "p1" && p.Vote != hiddenVote {
			t.Fatalf("expected hidden vote during voting, got %q", p.Vote)
		}
	}
}

func TestSnapshot_VotesVisibleAfterReveal(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "8")
	r.Show("p1")
	s := snap(r)
	for _, p := range s.Players {
		if p.ID == "p1" && p.Vote != "8" {
			t.Fatalf("expected vote visible after reveal, got %q", p.Vote)
		}
	}
}

// --- ToggleObserver ---

func TestToggleObserver_ParticipantBecomesObserver(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("host", "Host", false)
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "5")
	r.ToggleObserver("host", "p1")
	s := snap(r)
	for _, p := range s.Players {
		if p.ID == "p1" {
			if !p.Observer {
				t.Fatal("expected observer after toggle")
			}
			if p.Vote != "" {
				t.Fatal("vote should be cleared when becoming observer")
			}
		}
	}
}

func TestToggleObserver_ObserverBecomesParticipant(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("host", "Host", false)
	r.Join("obs", "Bob", true)
	r.ToggleObserver("host", "obs")
	s := snap(r)
	for _, p := range s.Players {
		if p.ID == "obs" && p.Observer {
			t.Fatal("expected participant after toggle")
		}
	}
}

// --- Activity log cap ---

func TestActivityLog_CappedAt20(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	// Generate 25 votes to produce 25 activity entries (+ 1 join = 26 total)
	for i := 0; i < 25; i++ {
		r.CastVote("p1", "3")
	}
	s := snap(r)
	if len(s.Activity) > maxActivityEntries {
		t.Fatalf("activity log should be capped at %d, got %d", maxActivityEntries, len(s.Activity))
	}
}

// --- Results calculation ---

func TestComputeResults_NumericVotes(t *testing.T) {
	votes := map[string]string{"Alice": "2", "Bob": "4", "Carol": "6"}
	cards := []string{"1", "2", "3", "4", "5", "6", "8", "13"}
	res := computeResults(votes, cards)
	if res.Avg != "4" {
		t.Fatalf("expected avg 4, got %s", res.Avg)
	}
	if res.Min != "2" {
		t.Fatalf("expected min 2, got %s", res.Min)
	}
	if res.Max != "6" {
		t.Fatalf("expected max 6, got %s", res.Max)
	}
}

func TestComputeResults_DecimalAvg(t *testing.T) {
	votes := map[string]string{"Alice": "1", "Bob": "2"}
	res := computeResults(votes, []string{"1", "2"})
	if res.Avg != "1.5" {
		t.Fatalf("expected avg 1.5, got %s", res.Avg)
	}
}

func TestComputeResults_NonNumericExcludedFromStats(t *testing.T) {
	votes := map[string]string{"Alice": "?", "Bob": "3"}
	cards := []string{"1", "2", "3", "?"}
	res := computeResults(votes, cards)
	if res.Avg != "3" {
		t.Fatalf("expected avg 3 (ignoring ?), got %s", res.Avg)
	}
	if res.Dist["?"] != 1 {
		t.Fatal("? should appear in distribution")
	}
}

func TestComputeResults_AllNonNumeric(t *testing.T) {
	votes := map[string]string{"Alice": "?", "Bob": "XS"}
	res := computeResults(votes, []string{"XS", "S", "M", "?"})
	if res.Avg != "—" || res.Min != "—" || res.Max != "—" {
		t.Fatalf("expected — for all stats with non-numeric votes, got avg=%s min=%s max=%s", res.Avg, res.Min, res.Max)
	}
}

func TestComputeResults_ModeFollowsCardOrder(t *testing.T) {
	// 2 votes for "3", 2 votes for "5" — "3" comes first in card order
	votes := map[string]string{"Alice": "3", "Bob": "3", "Carol": "5", "Dave": "5"}
	cards := []string{"1", "2", "3", "5", "8"}
	res := computeResults(votes, cards)
	if res.Mode != "3" {
		t.Fatalf("expected mode 3 (card order priority), got %s", res.Mode)
	}
}

func TestComputeResults_EmptyVotes(t *testing.T) {
	res := computeResults(map[string]string{}, []string{"1", "2", "3"})
	if res.Avg != "—" {
		t.Fatalf("expected — for empty votes, got %s", res.Avg)
	}
}
