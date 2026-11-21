package handler

import (
	"testing"

	"github.com/florianmousseau/pokeragile/internal/room"
)

func estimatedRoom(t *testing.T) *room.Room {
	t.Helper()
	rm := room.New("team42", nil)
	t.Cleanup(rm.Stop)
	rm.Join("p1", "Alice", false)
	rm.AddStories("p1", "CSV export")
	rm.CastVote("p1", "3", room.AnyRound)
	rm.Show("p1")
	rm.Estimate("p1", "3")
	return rm
}

func TestMeasure_RecordsWhatTheStoryCost(t *testing.T) {
	rm := estimatedRoom(t)
	commands["measure"](rm, "p1", "0,4,120,30,0,0", room.AnyRound)
	got := rm.Snapshot().Stories[0].Actual
	if got == nil || *got != (room.Actual{Files: 4, Added: 120, Removed: 30}) {
		t.Fatalf("unexpected measure: %+v", got)
	}
}

func TestMeasure_DropsAMalformedPayload(t *testing.T) {
	rm := estimatedRoom(t)
	for _, payload := range []string{"", "0,4,120", "0,4,120,30,0,0,9", "0,four,120,30,0,0", "0,4,1.5,30,0,0", "1,4,120,30,0,0"} {
		commands["measure"](rm, "p1", payload, room.AnyRound)
	}
	if got := rm.Snapshot().Stories[0].Actual; got != nil {
		t.Fatalf("a malformed payload was recorded: %+v", got)
	}
}
