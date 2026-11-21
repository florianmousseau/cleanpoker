package room

import (
	"errors"
	"slices"
	"strings"
	"unicode/utf8"
)

// Story is one item the team estimates; Estimate is the card kept for it.
// Actual is what it cost once delivered, and LooksLike the card its measure
// is closest to among the other measured stories of the room.
type Story struct {
	Title     string  `json:"title"`
	Estimate  string  `json:"estimate"`
	Actual    *Actual `json:"actual,omitempty"`
	LooksLike string  `json:"looksLike,omitempty"`
}

// Bounds on the list a room holds in memory.
const (
	MaxStories     = 100
	MaxStoryLength = 200
)

// StoriesAdded counts what one call did with the titles it was given: Added
// joined the list, Cut of them were shortened to MaxStoryLength, Blank were
// empty and Full found the list at MaxStories.
type StoriesAdded struct {
	Added int `json:"added"`
	Cut   int `json:"cut"`
	Blank int `json:"blank"`
	Full  int `json:"full"`
}

// ErrLocked refuses a round command from anyone but the host of a locked room.
var ErrLocked = errors.New("the host locked the room: ask the host to add the stories or unlock")

// AddStories appends one story per non-blank line of text, up to MaxStories,
// each cut to MaxStoryLength characters. The first story added to an empty
// list goes on the table.
func (r *Room) AddStories(initiatorID, text string) {
	_, _ = r.AddStoryTitles(initiatorID, strings.Split(text, "\n"))
}

// AddStoryTitles is AddStories for titles already split, and says what became
// of them or why the seat may not add any.
func (r *Room) AddStoryTitles(initiatorID string, titles []string) (StoriesAdded, error) {
	var out StoriesAdded
	err := errRoomIsClosed
	r.mutate(func() {
		if err = r.mayAdd(initiatorID); err != nil {
			return
		}
		for _, title := range titles {
			r.appendStory(title, &out)
		}
		if out.Added == 0 {
			return
		}
		if r.currentStory < 0 {
			r.currentStory = 0
		}
		r.logActivity(r.nameOf(initiatorID), "stories_added")
	})
	return out, err
}

// mayAdd is allowed with its reason. Callers hold r.mu.
func (r *Room) mayAdd(initiatorID string) error {
	switch {
	case !r.seated(initiatorID):
		return ErrNoSeat
	case !r.allowed(initiatorID):
		return ErrLocked
	}
	return nil
}

// appendStory adds one title, or counts why it did not. Callers hold r.mu.
func (r *Room) appendStory(raw string, out *StoriesAdded) {
	trimmed := strings.TrimSpace(raw)
	title := cut(trimmed, MaxStoryLength)
	switch {
	case title == "":
		out.Blank++
	case len(r.stories) >= MaxStories:
		out.Full++
	default:
		r.stories = append(r.stories, Story{Title: title})
		out.Added++
		if title != trimmed {
			out.Cut++
		}
	}
}

// ClearStories empties the list.
func (r *Room) ClearStories(initiatorID string) {
	r.mutate(func() {
		if !r.allowed(initiatorID) || len(r.stories) == 0 {
			return
		}
		r.stories = nil
		r.currentStory = -1
		r.logActivity(r.nameOf(initiatorID), "stories_cleared")
	})
}

// SelectStory puts a story on the table and starts a fresh round for it.
func (r *Room) SelectStory(initiatorID string, index int) {
	r.mutate(func() {
		if !r.allowed(initiatorID) || index < 0 || index >= len(r.stories) || index == r.currentStory {
			return
		}
		r.currentStory = index
		r.newRound()
		r.logActivity(r.nameOf(initiatorID), "story_selected", r.stories[index].Title)
	})
}

// Estimate keeps a card of the deck, or nothing, as the estimate of the story
// on the table. Only once the votes are revealed: the team decides on them.
func (r *Room) Estimate(initiatorID, card string) {
	r.mutate(func() {
		if !r.allowed(initiatorID) || r.currentStory < 0 || r.state != StateRevealed {
			return
		}
		if card != "" && !slices.Contains(r.cards, card) {
			return
		}
		r.stories[r.currentStory].Estimate = card
		r.logActivity(r.nameOf(initiatorID), "estimated", r.stories[r.currentStory].Title)
	})
}

// SetAutoReveal turns on or off the reveal that follows the last vote.
func (r *Room) SetAutoReveal(initiatorID string, on bool) {
	r.mutate(func() {
		if !r.allowed(initiatorID) || r.autoReveal == on {
			return
		}
		r.autoReveal = on
		if on && r.state == StateVoting && r.everyoneVoted() {
			r.reveal(r.nameOf(initiatorID))
		}
	})
}

func cut(s string, n int) string {
	if utf8.RuneCountInString(s) <= n {
		return s
	}
	return string([]rune(s)[:n])
}
