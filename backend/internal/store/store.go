package store

import (
	"sync"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/room"
)

type Store struct {
	mu    sync.RWMutex
	rooms map[string]*room.Room
}

func New() *Store {
	return &Store{rooms: make(map[string]*room.Room)}
}

func (s *Store) GetOrCreate(id string, cards []string) *room.Room {
	s.mu.Lock()
	defer s.mu.Unlock()
	if r, ok := s.rooms[id]; ok {
		return r
	}
	r := room.New(id, cards)
	s.rooms[id] = r
	return r
}

func (s *Store) RunCleanup(ttl time.Duration) {
	ticker := time.NewTicker(time.Hour)
	defer ticker.Stop()
	for range ticker.C {
		s.mu.Lock()
		for id, r := range s.rooms {
			if time.Since(r.LastActivity()) > ttl {
				delete(s.rooms, id)
			}
		}
		s.mu.Unlock()
	}
}
