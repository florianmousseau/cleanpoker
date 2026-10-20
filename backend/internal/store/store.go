package store

import (
	"errors"
	"sync"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/google/uuid"
)

// MaxRooms bounds how many rooms the server holds at once. Every room keeps a
// goroutine and its state in memory, and the machine has 256 MB: without a
// ceiling, a script opening rooms in a loop took every session down with it.
const MaxRooms = 2000

// UnjoinedTTL is how long a room nobody ever entered is kept. The page that
// creates a room joins it within a second; a room still empty after this was
// never meant to be used.
const UnjoinedTTL = 10 * time.Minute

// ErrFull is returned when the server already holds MaxRooms rooms.
var ErrFull = errors.New("too many rooms")

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
	limit              int
	since              time.Time
	roomsCreated       int64
	participantsJoined int64
}

func New() *Store {
	return NewWithLimit(MaxRooms)
}

// NewWithLimit is New with another ceiling on the number of rooms.
func NewWithLimit(limit int) *Store {
	return &Store{
		rooms: make(map[string]*room.Room),
		limit: limit,
		since: time.Now().UTC(),
	}
}

func (s *Store) Create(cards []string) (string, error) {
	id, err := s.CreateUncounted(cards)
	if err != nil {
		return "", err
	}
	s.mu.Lock()
	s.roomsCreated++
	s.mu.Unlock()
	return id, nil
}

// CreateUncounted opens a room the usage counters do not see: the one the
// health probe walks through, which is not a session anybody held.
func (s *Store) CreateUncounted(cards []string) (string, error) {
	if len(cards) == 0 {
		cards = room.DefaultCards
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if len(s.rooms) >= s.limit {
		return "", ErrFull
	}
	// Eight hex characters are 32 bits: a draw that lands on a live room
	// would hand its participants to strangers, so it is drawn again.
	id := newID()
	for s.rooms[id] != nil {
		id = newID()
	}
	s.rooms[id] = room.New(id, cards)
	return id, nil
}

var newID = func() string { return uuid.New().String()[:8] }

// Remove closes a room at once instead of leaving it to the daily cleanup.
func (s *Store) Remove(id string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if r, ok := s.rooms[id]; ok {
		r.Stop()
		delete(s.rooms, id)
	}
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

// CanHold reports whether a connection to id would find its room: it exists,
// or there is room left to open it. It allocates nothing.
func (s *Store) CanHold(id string) bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	_, ok := s.rooms[id]
	return ok || len(s.rooms) < s.limit
}

// GetOrCreate returns the room id, opening it if needed. It returns ErrFull
// when the room does not exist and the server holds MaxRooms already.
func (s *Store) GetOrCreate(id string, cards []string) (*room.Room, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if r, ok := s.rooms[id]; ok {
		return r, nil
	}
	if len(s.rooms) >= s.limit {
		return nil, ErrFull
	}
	r := room.New(id, cards)
	s.rooms[id] = r
	return r, nil
}

// RunCleanup closes, every minute, the rooms idle for longer than ttl and
// those nobody entered within UnjoinedTTL.
func (s *Store) RunCleanup(ttl time.Duration) {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()
	for range ticker.C {
		s.Sweep(ttl, UnjoinedTTL)
	}
}

// Sweep is one pass of RunCleanup.
func (s *Store) Sweep(ttl, unjoinedTTL time.Duration) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for id, r := range s.rooms {
		idle := time.Since(r.LastActivity())
		if idle > ttl || (!r.EverJoined() && idle > unjoinedTTL) {
			r.Stop()
			delete(s.rooms, id)
		}
	}
}
