package store

import (
	"sync"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/google/uuid"
)

// Usage is the aggregate picture of how the service is used. It answers one
// question: how many people does an average session bring in. Nothing here
// identifies a room or a person, and nothing is written to disk, so the
// counters restart from zero with the process. Since says from when they count.
type Usage struct {
	Since              time.Time `json:"since"`
	RoomsCreated       int64     `json:"roomsCreated"`
	ParticipantsJoined int64     `json:"participantsJoined"`
	ActiveRooms        int       `json:"activeRooms"`
}

type Store struct {
	mu                 sync.RWMutex
	rooms              map[string]*room.Room
	since              time.Time
	roomsCreated       int64
	participantsJoined int64
}

func New() *Store {
	return &Store{
		rooms: make(map[string]*room.Room),
		since: time.Now().UTC(),
	}
}

func (s *Store) Create(cards []string) string {
	if len(cards) == 0 {
		cards = room.DefaultCards
	}
	id := uuid.New().String()[:8]
	s.mu.Lock()
	s.rooms[id] = room.New(id, cards)
	s.roomsCreated++
	s.mu.Unlock()
	return id
}

// RecordJoin counts one person arriving in a session, observers included.
func (s *Store) RecordJoin() {
	s.mu.Lock()
	s.participantsJoined++
	s.mu.Unlock()
}

func (s *Store) Usage() Usage {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return Usage{
		Since:              s.since,
		RoomsCreated:       s.roomsCreated,
		ParticipantsJoined: s.participantsJoined,
		ActiveRooms:        len(s.rooms),
	}
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
