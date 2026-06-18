package db

import (
	"database/sql"
	"encoding/json"
	"os"
	"path/filepath"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/room"
	_ "modernc.org/sqlite" // registers the SQLite driver with database/sql
)

type DB struct {
	sql *sql.DB
}

func Open(path string) (*DB, error) {
	if dir := filepath.Dir(path); dir != "." {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, err
		}
	}
	sqlDB, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, err
	}
	d := &DB{sql: sqlDB}
	return d, d.init()
}

func (d *DB) init() error {
	_, err := d.sql.Exec(`
		CREATE TABLE IF NOT EXISTS rooms (
			id            TEXT    PRIMARY KEY,
			cards         TEXT    NOT NULL,
			state         TEXT    NOT NULL,
			round         INTEGER NOT NULL,
			results       TEXT,
			activity      TEXT    NOT NULL,
			last_activity INTEGER NOT NULL
		)
	`)
	return err
}

func (d *DB) Save(snap room.Snapshot) error {
	cards, err := json.Marshal(snap.Cards)
	if err != nil {
		return err
	}
	activity, err := json.Marshal(snap.Activity)
	if err != nil {
		return err
	}
	var results interface{}
	if snap.Results != nil {
		b, err := json.Marshal(snap.Results)
		if err != nil {
			return err
		}
		results = string(b)
	}
	_, err = d.sql.Exec(
		`INSERT OR REPLACE INTO rooms (id, cards, state, round, results, activity, last_activity)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		snap.ID, string(cards), string(snap.State), snap.Round,
		results, string(activity), time.Now().Unix(),
	)
	return err
}

func (d *DB) LoadAll() ([]room.Snapshot, error) {
	rows, err := d.sql.Query(
		`SELECT id, cards, state, round, results, activity FROM rooms`,
	)
	if err != nil {
		return nil, err
	}
	defer func() { _ = rows.Close() }()

	var snaps []room.Snapshot
	for rows.Next() {
		var snap room.Snapshot
		var cardsJSON, activityJSON, stateStr string
		var resultsJSON sql.NullString
		if err := rows.Scan(&snap.ID, &cardsJSON, &stateStr, &snap.Round, &resultsJSON, &activityJSON); err != nil {
			return nil, err
		}
		snap.State = room.State(stateStr)
		if err := json.Unmarshal([]byte(cardsJSON), &snap.Cards); err != nil {
			return nil, err
		}
		if err := json.Unmarshal([]byte(activityJSON), &snap.Activity); err != nil {
			return nil, err
		}
		if snap.Activity == nil {
			snap.Activity = []room.ActivityEntry{}
		}
		if resultsJSON.Valid {
			snap.Results = &room.Results{}
			if err := json.Unmarshal([]byte(resultsJSON.String), snap.Results); err != nil {
				return nil, err
			}
		}
		snaps = append(snaps, snap)
	}
	return snaps, rows.Err()
}

func (d *DB) Delete(id string) error {
	_, err := d.sql.Exec(`DELETE FROM rooms WHERE id = ?`, id)
	return err
}

func (d *DB) Cleanup(maxAge time.Duration) error {
	cutoff := time.Now().Add(-maxAge).Unix()
	_, err := d.sql.Exec(`DELETE FROM rooms WHERE last_activity < ?`, cutoff)
	return err
}
