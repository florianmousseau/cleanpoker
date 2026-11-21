package room

import (
	"errors"
	"math"
	"slices"
)

// Actual is what a delivered story cost. Numbers only: the room holds no code,
// no file name and no repository address.
type Actual struct {
	Files   int `json:"files" jsonschema:"files touched"`
	Added   int `json:"added" jsonschema:"lines added"`
	Removed int `json:"removed" jsonschema:"lines removed"`
	Tests   int `json:"tests" jsonschema:"tests added"`
	Minutes int `json:"minutes" jsonschema:"working time in minutes, 0 when unknown"`
}

// Reference is the measured story that stands for a card of the deck.
type Reference struct {
	Card  string `json:"card"`
	Title string `json:"title"`
}

const (
	// MaxActual bounds each number of a measure.
	MaxActual = 1_000_000
	// GapFrom is how many other measured stories a story is compared with
	// before the room says which card it looks like.
	GapFrom = 3
	// ReferencesFrom is how many measured stories a room holds before each
	// card shows one of them as its reference.
	ReferencesFrom = 10
)

var (
	ErrNoStory      = errors.New("no story at this position: get_estimates numbers the list from 1")
	ErrNotEstimated = errors.New("the team kept no estimate for this story yet: a measure is compared with an estimate")
	ErrActual       = errors.New("a measure is whole numbers from 0 to 1000000, with at least one line added or removed")
)

func (a Actual) valid() bool {
	for _, n := range []int{a.Files, a.Added, a.Removed, a.Tests, a.Minutes} {
		if n < 0 || n > MaxActual {
			return false
		}
	}
	return a.size() > 0
}

// size is what two measures are compared on: the lines that changed.
func (a Actual) size() int { return a.Added + a.Removed }

// ReportActual records what the story at index cost once delivered. A second
// report replaces the first.
func (r *Room) ReportActual(initiatorID string, index int, a Actual) error {
	err := errRoomIsClosed
	r.mutate(func() {
		if err = r.mayMeasure(initiatorID, index, a); err != nil {
			return
		}
		r.stories[index].Actual = &a
		r.logActivity(r.nameOf(initiatorID), "measured", r.stories[index].Title)
	})
	return err
}

// mayMeasure is allowed with its reason. Callers hold r.mu.
func (r *Room) mayMeasure(initiatorID string, index int, a Actual) error {
	if err := r.mayAdd(initiatorID); err != nil {
		return err
	}
	switch {
	case index < 0 || index >= len(r.stories):
		return ErrNoStory
	case r.stories[index].Estimate == "":
		return ErrNotEstimated
	case !a.valid():
		return ErrActual
	}
	return nil
}

func measured(s Story) bool { return s.Actual != nil && s.Estimate != "" }

// sizesByCard gathers the sizes of the measured stories under the card the
// team kept for each, leaving out the story at skip.
func sizesByCard(stories []Story, skip int) map[string][]int {
	out := map[string][]int{}
	for i, s := range stories {
		if i != skip && measured(s) {
			out[s.Estimate] = append(out[s.Estimate], s.Actual.size())
		}
	}
	return out
}

func medianSize(sizes []int) int {
	sorted := slices.Sorted(slices.Values(sizes))
	return sorted[(len(sorted)-1)/2]
}

// looksLike names the card whose measured stories are closest in size to the
// story at index, or nothing while the room has too few to compare with. The
// distance is a ratio: 40 lines are as far from 20 as from 80.
func looksLike(stories []Story, cards []string, index int) string {
	if !measured(stories[index]) {
		return ""
	}
	byCard := sizesByCard(stories, index)
	others := 0
	for _, sizes := range byCard {
		others += len(sizes)
	}
	if others < GapFrom || len(byCard) < 2 {
		return ""
	}
	want := math.Log1p(float64(stories[index].Actual.size()))
	best, bestGap := "", math.Inf(1)
	for _, card := range cards {
		sizes, ok := byCard[card]
		if !ok {
			continue
		}
		if gap := math.Abs(math.Log1p(float64(medianSize(sizes))) - want); gap < bestGap {
			best, bestGap = card, gap
		}
	}
	return best
}

// references gives each card its measured story of median size, in deck
// order, once the room holds ReferencesFrom measured stories.
func references(stories []Story, cards []string) []Reference {
	byCard := sizesByCard(stories, -1)
	total := 0
	for _, sizes := range byCard {
		total += len(sizes)
	}
	if total < ReferencesFrom {
		return nil
	}
	var out []Reference
	for _, card := range cards {
		sizes, ok := byCard[card]
		if !ok {
			continue
		}
		median := medianSize(sizes)
		i := slices.IndexFunc(stories, func(s Story) bool {
			return measured(s) && s.Estimate == card && s.Actual.size() == median
		})
		out = append(out, Reference{Card: card, Title: stories[i].Title})
	}
	return out
}

// measuredStories copies the list with the card each measured story looks like.
func measuredStories(stories []Story, cards []string) []Story {
	out := slices.Clone(stories)
	for i := range out {
		out[i].LooksLike = looksLike(stories, cards, i)
	}
	return out
}
