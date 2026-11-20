package room

import (
	"errors"
	"strings"
	"testing"
)

func TestAddStories_OneStoryPerLineAndTheFirstOnTheTable(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.AddStories("p1", "Login page\n\n  CSV export  \n")
	s := snap(r)
	if len(s.Stories) != 2 || s.Stories[1].Title != "CSV export" || s.Current != 0 {
		t.Fatalf("unexpected stories %+v current %d", s.Stories, s.Current)
	}
	r.AddStories("p1", "Search")
	if s := snap(r); len(s.Stories) != 3 || s.Current != 0 {
		t.Fatalf("appending moved the table: %+v current %d", s.Stories, s.Current)
	}
}

func TestAddStories_BoundsTheListAndTheTitles(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.AddStories("p1", strings.Repeat("é", MaxStoryLength+20)+"\n"+strings.Repeat("x\n", MaxStories+5))
	s := snap(r)
	if len(s.Stories) != MaxStories {
		t.Fatalf("expected %d stories, got %d", MaxStories, len(s.Stories))
	}
	if n := len([]rune(s.Stories[0].Title)); n != MaxStoryLength {
		t.Fatalf("expected a title cut to %d runes, got %d", MaxStoryLength, n)
	}
}

func TestSelectStory_StartsAFreshRound(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.AddStories("p1", "A\nB")
	r.CastVote("p1", "5", AnyRound)
	r.Show("p1")
	round := snap(r).Round
	r.SelectStory("p1", 1)
	s := snap(r)
	if s.Current != 1 || s.State != StateVoting || s.Round != round+1 || s.Results != nil {
		t.Fatalf("expected a fresh round on story 1, got %+v", s)
	}
	r.SelectStory("p1", 7)
	if snap(r).Current != 1 {
		t.Fatal("an index out of the list moved the table")
	}
}

func TestEstimate_KeepsACardOnlyAfterTheReveal(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.AddStories("p1", "A")
	r.Estimate("p1", "5")
	if snap(r).Stories[0].Estimate != "" {
		t.Fatal("an estimate was kept before the reveal")
	}
	r.CastVote("p1", "5", AnyRound)
	r.Show("p1")
	r.Estimate("p1", "XL")
	if snap(r).Stories[0].Estimate != "" {
		t.Fatal("a card outside the deck was kept")
	}
	r.Estimate("p1", "8")
	if got := snap(r).Stories[0].Estimate; got != "8" {
		t.Fatalf("expected 8, got %q", got)
	}
}

func TestStories_LockedRoomKeepsThemToTheHost(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.SetLocked("p1", true)
	r.AddStories("p2", "A")
	if len(snap(r).Stories) != 0 {
		t.Fatal("a guest added stories to a locked room")
	}
	r.AddStories("p1", "A")
	r.ClearStories("p2")
	if len(snap(r).Stories) != 1 {
		t.Fatal("a guest cleared the list of a locked room")
	}
	r.ClearStories("p1")
	if s := snap(r); len(s.Stories) != 0 || s.Current != -1 {
		t.Fatalf("expected an empty list, got %+v", s)
	}
}

func TestAutoReveal_RevealsOnTheLastVote(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	r.Join("o1", "Olga", true)
	r.SetAutoReveal("p1", true)
	r.CastVote("p1", "3", AnyRound)
	if snap(r).State != StateVoting {
		t.Fatal("revealed before everyone voted")
	}
	r.CastVote("p2", "5", AnyRound)
	if s := snap(r); s.State != StateRevealed || s.Results == nil {
		t.Fatal("the last vote did not reveal")
	}
}

func TestAutoReveal_TurnedOnWhenAllHaveVotedRevealsAtOnce(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.CastVote("p1", "3", AnyRound)
	r.SetAutoReveal("p1", true)
	if snap(r).State != StateRevealed {
		t.Fatal("expected an immediate reveal")
	}
}

func TestCastVoteWithReason_HiddenUntilTheRevealThenClearedByANewRound(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.JoinSeat(Player{ID: "bot", Name: "Claude", AI: true}, "")
	r.Join("p1", "Alice", false)
	if err := r.CastVoteWithReason("bot", "8", "  Migration and tests are missing.  ", AnyRound); err != nil {
		t.Fatal(err)
	}
	reasonOf := func() string {
		for _, p := range snap(r).Players {
			if p.ID == "bot" {
				return p.Reason
			}
		}
		return ""
	}
	if reasonOf() != "" {
		t.Fatal("the reason showed before the reveal")
	}
	r.Show("p1")
	if got := reasonOf(); got != "Migration and tests are missing." {
		t.Fatalf("unexpected reason after the reveal: %q", got)
	}
	r.Clear("p1", AnyRound)
	r.Show("p1")
	if reasonOf() != "" {
		t.Fatal("a new round kept the reason")
	}
}

func TestAddStoryTitles_CountsWhatBecameOfEachTitle(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	got, err := r.AddStoryTitles("p1", []string{" a ", "  ", strings.Repeat("x", MaxStoryLength+1)})
	if err != nil || got != (StoriesAdded{Added: 2, Cut: 1, Blank: 1}) {
		t.Fatalf("got %+v, %v", got, err)
	}
}

func TestAddStoryTitles_SaysWhyASeatMayNot(t *testing.T) {
	r := newTestRoom(nil)
	defer r.Stop()
	r.Join("p1", "Alice", false)
	r.Join("p2", "Bob", false)
	if _, err := r.AddStoryTitles("ghost", []string{"a"}); !errors.Is(err, ErrNoSeat) {
		t.Fatalf("expected ErrNoSeat, got %v", err)
	}
	r.SetLocked("p1", true)
	if _, err := r.AddStoryTitles("p2", []string{"a"}); !errors.Is(err, ErrLocked) {
		t.Fatalf("expected ErrLocked, got %v", err)
	}
	if got, err := r.AddStoryTitles("p1", []string{"a"}); err != nil || got.Added != 1 {
		t.Fatalf("the host of a locked room could not add: %+v, %v", got, err)
	}
}
