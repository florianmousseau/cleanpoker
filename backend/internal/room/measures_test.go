package room

import (
	"errors"
	"fmt"
	"strings"
	"testing"
)

// measuredRoom holds one story per estimate, each kept and then measured with
// the size of the same rank.
func measuredRoom(t *testing.T, estimates []string, sizes []int) *Room {
	t.Helper()
	r := New("team42", nil)
	t.Cleanup(r.Stop)
	r.Join("p1", "Alice", false)
	titles := make([]string, len(estimates))
	for i := range estimates {
		titles[i] = fmt.Sprintf("story %d", i+1)
	}
	r.AddStories("p1", strings.Join(titles, "\n"))
	for i, card := range estimates {
		r.SelectStory("p1", i)
		r.CastVote("p1", card, AnyRound)
		r.Show("p1")
		r.Estimate("p1", card)
		if sizes[i] == 0 {
			continue
		}
		if err := r.ReportActual("p1", i, Actual{Files: 1, Added: sizes[i]}); err != nil {
			t.Fatalf("story %d: %v", i+1, err)
		}
	}
	return r
}

func TestReportActual_RefusesWhatCannotBeCompared(t *testing.T) {
	r := measuredRoom(t, []string{"3"}, []int{0})
	r.AddStories("p1", "not estimated")
	cases := []struct {
		name  string
		seat  string
		index int
		a     Actual
		want  error
	}{
		{"no seat", "ghost", 0, Actual{Added: 1}, ErrNoSeat},
		{"no story", "p1", 2, Actual{Added: 1}, ErrNoStory},
		{"negative position", "p1", -1, Actual{Added: 1}, ErrNoStory},
		{"no estimate", "p1", 1, Actual{Added: 1}, ErrNotEstimated},
		{"nothing changed", "p1", 0, Actual{Files: 3}, ErrActual},
		{"negative", "p1", 0, Actual{Added: 5, Tests: -1}, ErrActual},
		{"too large", "p1", 0, Actual{Added: MaxActual + 1}, ErrActual},
	}
	for _, c := range cases {
		if err := r.ReportActual(c.seat, c.index, c.a); !errors.Is(err, c.want) {
			t.Errorf("%s: got %v, want %v", c.name, err, c.want)
		}
	}
	if r.Snapshot().Stories[0].Actual != nil {
		t.Fatal("a refused measure was recorded")
	}
}

func TestReportActual_ASecondReportReplacesTheFirst(t *testing.T) {
	r := measuredRoom(t, []string{"3"}, []int{40})
	if err := r.ReportActual("p1", 0, Actual{Files: 2, Added: 10, Removed: 5}); err != nil {
		t.Fatal(err)
	}
	if got := *r.Snapshot().Stories[0].Actual; got != (Actual{Files: 2, Added: 10, Removed: 5}) {
		t.Fatalf("unexpected measure: %+v", got)
	}
}

func TestLooksLike_NamesTheCardOfTheClosestMeasuredStories(t *testing.T) {
	// Estimated 3, delivered at the size of the 8s.
	r := measuredRoom(t, []string{"3", "3", "8", "8", "3"}, []int{40, 50, 400, 500, 450})
	stories := r.Snapshot().Stories
	if got := stories[4].LooksLike; got != "8" {
		t.Fatalf("expected the last story to look like an 8, got %q", got)
	}
	if got := stories[0].LooksLike; got != "3" {
		t.Fatalf("expected the first story to look like a 3, got %q", got)
	}
}

func TestLooksLike_SaysNothingWithTooFewStoriesToCompareWith(t *testing.T) {
	few := measuredRoom(t, []string{"3", "8", "3"}, []int{40, 400, 450})
	oneCard := measuredRoom(t, []string{"3", "3", "3", "3"}, []int{40, 50, 60, 450})
	unmeasured := measuredRoom(t, []string{"3", "3", "8", "8", "3"}, []int{40, 50, 400, 500, 0})
	for name, r := range map[string]*Room{"few": few, "one card": oneCard, "unmeasured": unmeasured} {
		stories := r.Snapshot().Stories
		if got := stories[len(stories)-1].LooksLike; got != "" {
			t.Errorf("%s: expected no card, got %q", name, got)
		}
	}
}

func TestLooksLike_AnEstimateWithdrawnLeavesTheComparison(t *testing.T) {
	r := measuredRoom(t, []string{"3", "3", "8", "8", "3"}, []int{40, 50, 400, 500, 450})
	r.Estimate("p1", "")
	if got := r.Snapshot().Stories[4].LooksLike; got != "" {
		t.Fatalf("a story with no estimate still looks like %q", got)
	}
}

func TestReferences_OneMeasuredStoryPerCardFromTenMeasures(t *testing.T) {
	estimates := []string{"1", "1", "1", "3", "3", "3", "8", "8", "8", "8"}
	sizes := []int{10, 30, 20, 100, 80, 90, 400, 300, 500, 600}
	nine := measuredRoom(t, estimates[:9], sizes[:9])
	if got := nine.Snapshot().References; got != nil {
		t.Fatalf("nine measures already gave references: %+v", got)
	}
	ten := measuredRoom(t, estimates, sizes)
	want := []Reference{{"1", "story 3"}, {"3", "story 6"}, {"8", "story 7"}}
	got := ten.Snapshot().References
	if len(got) != len(want) {
		t.Fatalf("expected %+v, got %+v", want, got)
	}
	for i, w := range want {
		if got[i] != w {
			t.Errorf("reference %d: got %+v, want %+v", i, got[i], w)
		}
	}
}
