package store

import (
	"log"
	"sync"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/db"
	"github.com/florianmousseau/cleanpoker/internal/room"
)

type Store struct {
	mu    sync.RWMutex
	rooms map[string]*room.Room
	db    *db.DB
}

func New(database *db.DB) *Store {
	return &Store{
		rooms: make(map[string]*room.Room),
		db:    database,
	}
}

// Load restores all rooms from the database at startup.
func (s *Store) Load() {
	snaps, err := s.db.LoadAll()
	if err != nil {
		log.Printf("warn: failed to load rooms from db: %v", err)
		return
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, snap := range snaps {
		r := room.Restore(snap)
		r.SetPersistHook(s.save)
		s.rooms[snap.ID] = r
	}
	log.Printf("restored %d rooms from db", len(snaps))
}

func (s *Store) save(snap room.Snapshot) {
	if err := s.db.Save(snap); err != nil {
		log.Printf("warn: failed to persist room %s: %v", snap.ID, err)
	}
}

func (s *Store) GetOrCreate(id string, cards []string) *room.Room {
	s.mu.Lock()
	defer s.mu.Unlock()
	if r, ok := s.rooms[id]; ok {
		return r
	}
	r := room.New(id, cards)
	r.SetPersistHook(s.save)
	s.rooms[id] = r
	return r
}

func (s *Store) RunCleanup(ttl time.Duration) {
	ticker := time.NewTicker(time.Hour)
	defer ticker.Stop()
	for range ticker.C {
		var toDelete []string
		s.mu.Lock()
		for id, r := range s.rooms {
			if time.Since(r.LastActivity()) > ttl {
				delete(s.rooms, id)
				toDelete = append(toDelete, id)
			}
		}
		s.mu.Unlock()
		for _, id := range toDelete {
			s.db.Delete(id)
		}
	}
}
