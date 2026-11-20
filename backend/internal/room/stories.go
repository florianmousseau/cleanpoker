package room

import (
	"slices"
	"strings"
	"unicode/utf8"
)

// Story is one item the team estimates; Estimate is the card kept for it.
type Story struct {
	Title    string `json:"title"`
	Estimate string `json:"estimate"`
}

// Bounds on the list a room holds in memory.
const (
	MaxStories     = 100
	MaxStoryLength = 200
)

// AddStories appends one story per non-blank line of text, up to MaxStories,
// each cut to MaxStoryLength characters. The first story added to an empty
// list goes on the table.
func (r *Room) AddStories(initiatorID, text string) {
	r.mutate(func() {
		if !r.allowed(initiatorID) {
			return
		}
		added := 0
		for _, line := range strings.Split(text, "\n") {
			title := cut(strings.TrimSpace(line), MaxStoryLength)
			if title == "" || len(r.stories) >= MaxStories {
				continue
			}
			r.stories = append(r.stories, Story{Title: title})
			added++
		}
		if added == 0 {
			return
		}
		if r.currentStory < 0 {
			r.currentStory = 0
		}
		r.logActivity(r.nameOf(initiatorID), "stories_added")
	})
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
