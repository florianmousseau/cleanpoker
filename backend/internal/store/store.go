package store

import (
	"sync"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/google/uuid"
)

type Store struct {
	mu    sync.RWMutex
	rooms map[string]*room.Room
}

func New() *Store {
	return &Store{
		rooms: make(map[string]*room.Room),
	}
}

func (s *Store) Create(cards []string) string {
	if len(cards) == 0 {
		cards = room.DefaultCards
	}
	id := uuid.New().String()[:8]
	s.mu.Lock()
	s.rooms[id] = room.New(id, cards)
	s.mu.Unlock()
	return id
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
				r.Stop()
				delete(s.rooms, id)
			}
		}
		s.mu.Unlock()
	}
}
