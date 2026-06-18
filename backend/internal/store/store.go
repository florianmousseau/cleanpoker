package store

import (
	"log"
	"sync"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/db"
	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/google/uuid"
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

func (s *Store) Load() {
	records, err := s.db.LoadAll()
	if err != nil {
		log.Printf("warn: failed to load rooms from db: %v", err)
		return
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, rec := range records {
		snap := fromRecord(rec)
		r := room.Restore(snap)
		r.SetPersistHook(s.save)
		s.rooms[snap.ID] = r
	}
	log.Printf("restored %d rooms from db", len(records))
}

func (s *Store) save(snap room.Snapshot) {
	if err := s.db.Save(toRecord(snap)); err != nil {
		log.Printf("warn: failed to persist room %s: %v", snap.ID, err)
	}
}

func (s *Store) Create(cards []string) string {
	if len(cards) == 0 {
		cards = room.DefaultCards
	}
	id := uuid.New().String()[:8]
	s.mu.Lock()
	r := room.New(id, cards)
	r.SetPersistHook(s.save)
	s.rooms[id] = r
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
	r.SetPersistHook(s.save)
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
		if err := s.db.Cleanup(ttl); err != nil {
			log.Printf("warn: failed to cleanup db: %v", err)
		}
	}
}

func toRecord(snap room.Snapshot) db.RoomRecord {
	rec := db.RoomRecord{
		ID:    snap.ID,
		Cards: snap.Cards,
		State: string(snap.State),
		Round: snap.Round,
	}
	if snap.Results != nil {
		rec.Results = &db.RecordResults{
			Avg:  snap.Results.Avg,
			Mode: snap.Results.Mode,
			Min:  snap.Results.Min,
			Max:  snap.Results.Max,
			Dist: snap.Results.Dist,
		}
	}
	rec.Activity = make([]db.RecordActivity, len(snap.Activity))
	for i, a := range snap.Activity {
		rec.Activity[i] = db.RecordActivity{
			Timestamp: a.Timestamp,
			Initiator: a.Initiator,
			Message:   a.Message,
			Target:    a.Target,
		}
	}
	return rec
}

func fromRecord(rec db.RoomRecord) room.Snapshot {
	snap := room.Snapshot{
		ID:    rec.ID,
		Cards: rec.Cards,
		State: room.State(rec.State),
		Round: rec.Round,
	}
	if rec.Results != nil {
		snap.Results = &room.Results{
			Avg:  rec.Results.Avg,
			Mode: rec.Results.Mode,
			Min:  rec.Results.Min,
			Max:  rec.Results.Max,
			Dist: rec.Results.Dist,
		}
	}
	snap.Activity = make([]room.ActivityEntry, len(rec.Activity))
	for i, a := range rec.Activity {
		snap.Activity[i] = room.ActivityEntry{
			Timestamp: a.Timestamp,
			Initiator: a.Initiator,
			Message:   a.Message,
			Target:    a.Target,
		}
	}
	if snap.Activity == nil {
		snap.Activity = []room.ActivityEntry{}
	}
	return snap
}
