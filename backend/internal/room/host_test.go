package room

import (
	"testing"
	"time"
)

func TestJoin_FirstSeatIsHost(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	if got := snap(r).Host; got != "p1" {
		t.Fatalf("expected p1 as host, got %q", got)
	}
}

func TestLeave_HostPassesToTheEarliestSeatLeft(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.Join("p3", "Carol", false)
	r.Leave("p1")
	if got := snap(r).Host; got != "p2" {
		t.Fatalf("expected p2 as host, got %q", got)
	}
}

func TestKick_KickedHostPassesTheRoleOn(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.Kick("p2", "p1")
	if got := snap(r).Host; got != "p2" {
		t.Fatalf("expected p2 as host, got %q", got)
	}
}

func TestLeave_LastSeatGoneUnlocksTheRoom(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.SetLocked("p1", true)
	r.Leave("p1")
	s := snap(r)
	if s.Locked || s.Host != "" {
		t.Fatalf("expected an open room with no host, got locked=%v host=%q", s.Locked, s.Host)
	}
}

func TestSetLocked_OnlyTheHostCanLock(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.SetLocked("p2", true)
	if snap(r).Locked {
		t.Fatal("a guest locked the room")
	}
	r.SetLocked("p1", true)
	if !snap(r).Locked {
		t.Fatal("the host could not lock the room")
	}
}

func TestLocked_GuestsCannotRunTheRound(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.SetLocked("p1", true)
	r.CastVote("p2", "5", AnyRound)
	r.Show("p2")
	r.Kick("p2", "p1")
	r.ToggleObserver("p2", "p1")
	s := snap(r)
	if s.State != StateVoting {
		t.Fatal("a guest revealed a locked room")
	}
	if len(s.Players) != 2 {
		t.Fatal("a guest kicked in a locked room")
	}
	for _, p := range s.Players {
		if p.ID == "p1" && p.Observer {
			t.Fatal("a guest moved the host to observer")
		}
	}
	r.Show("p1")
	if snap(r).State != StateRevealed {
		t.Fatal("the host could not reveal")
	}
}

func TestLocked_AGuestStillChangesTheirOwnRole(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.SetLocked("p1", true)
	r.ToggleObserver("p2", "p2")
	for _, p := range snap(r).Players {
		if p.ID == "p2" && !p.Observer {
			t.Fatal("a guest could not become observer in a locked room")
		}
	}
}

func TestStartTimer_SetsADeadlineThatARevealClears(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	before := time.Now()
	r.StartTimer("p1", 60)
	end := time.UnixMilli(snap(r).TimerEnd)
	if end.Before(before.Add(59*time.Second)) || end.After(before.Add(61*time.Second)) {
		t.Fatalf("unexpected deadline %v", end)
	}
	r.Show("p1")
	if snap(r).TimerEnd != 0 {
		t.Fatal("the reveal left the timer running")
	}
}

func TestStartTimer_RefusesAnUnknownDuration(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.StartTimer("p1", 7)
	if snap(r).TimerEnd != 0 {
		t.Fatal("a 7 second timer was accepted")
	}
}

func TestStartTimer_ZeroStopsIt(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.StartTimer("p1", 30)
	r.StartTimer("p1", 0)
	if snap(r).TimerEnd != 0 {
		t.Fatal("the timer did not stop")
	}
}

func TestClear_StopsTheTimer(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.StartTimer("p1", 30)
	r.Clear("p1", AnyRound)
	if snap(r).TimerEnd != 0 {
		t.Fatal("the new round left the timer running")
	}
}

func TestStartTimer_LockedRoomKeepsItToTheHost(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.SetLocked("p1", true)
	r.StartTimer("p2", 30)
	if snap(r).TimerEnd != 0 {
		t.Fatal("a guest started a timer in a locked room")
	}
}

func TestComputeResults_Median(t *testing.T) {
	cases := []struct {
		votes []string
		want  string
	}{
		{[]string{"1", "3", "8"}, "3"},
		{[]string{"1", "2", "3", "5"}, "2.5"},
		{[]string{"13", "1", "8", "?"}, "8"},
		{[]string{"0.5", "1"}, "0.8"},
	}
	for _, c := range cases {
		if got := computeResults(c.votes, DefaultCards).Median; got != c.want {
			t.Errorf("median of %v: got %q, want %q", c.votes, got, c.want)
		}
	}
	if got := computeResults([]string{"?"}, DefaultCards).Median; got != "N/A" {
		t.Errorf("median of labels only: got %q", got)
	}
}
