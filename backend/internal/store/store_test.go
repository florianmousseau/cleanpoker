package store

import (
	"errors"
	"testing"
	"time"
)

func TestCreate_RefusedPastTheLimit(t *testing.T) {
	s := NewWithLimit(2)
	for range 2 {
		if _, err := s.Create(nil); err != nil {
			t.Fatal(err)
		}
	}
	if _, err := s.Create(nil); !errors.Is(err, ErrFull) {
		t.Fatalf("expected ErrFull, got %v", err)
	}
	if _, err := s.GetOrCreate("other", nil); !errors.Is(err, ErrFull) {
		t.Fatalf("expected ErrFull from GetOrCreate, got %v", err)
	}
}

// Eight hex characters collide; a collision used to replace a live room.
func TestCreate_DrawsAgainOnACollision(t *testing.T) {
	draws := []string{"aaaaaaaa", "aaaaaaaa", "bbbbbbbb"}
	saved := newID
	t.Cleanup(func() { newID = saved })
	newID = func() string { id := draws[0]; draws = draws[1:]; return id }

	s := New()
	first, _ := s.Create(nil)
	held, _ := s.GetOrCreate(first, nil)
	second, _ := s.Create(nil)
	if second == first {
		t.Fatal("a second room took the id of a live one")
	}
	if again, _ := s.GetOrCreate(first, nil); again != held {
		t.Fatal("the first room was replaced")
	}
}

func TestSweep_ClosesRoomsNobodyEntered(t *testing.T) {
	s := New()
	empty, _ := s.Create(nil)
	used, _ := s.Create(nil)
	r, _ := s.GetOrCreate(used, nil)
	r.Join("p1", "Alice", false)

	s.Sweep(time.Hour, -time.Nanosecond) // every room nobody entered is past it

	s.mu.RLock()
	defer s.mu.RUnlock()
	if s.rooms[empty] != nil {
		t.Fatal("a room nobody entered survived the sweep")
	}
	if s.rooms[used] == nil {
		t.Fatal("a room in use was closed")
	}
}
