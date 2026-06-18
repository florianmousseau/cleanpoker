package db

import (
	"database/sql"
	"encoding/json"
	"os"
	"path/filepath"
	"time"

	_ "modernc.org/sqlite" // registers the SQLite driver with database/sql
)

type DB struct {
	sql *sql.DB
}

type RoomRecord struct {
	ID       string
	Cards    []string
	State    string
	Round    int
	Results  *RecordResults
	Activity []RecordActivity
}

type RecordResults struct {
	Avg  string         `json:"avg"`
	Mode string         `json:"mode"`
	Min  string         `json:"min"`
	Max  string         `json:"max"`
	Dist map[string]int `json:"dist"`
}

type RecordActivity struct {
	Timestamp string `json:"timestamp"`
	Initiator string `json:"initiator"`
	Message   string `json:"message"`
	Target    string `json:"target,omitempty"`
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

func (d *DB) Save(rec RoomRecord) error {
	cards, err := json.Marshal(rec.Cards)
	if err != nil {
		return err
	}
	activity, err := json.Marshal(rec.Activity)
	if err != nil {
		return err
	}
	var results interface{}
	if rec.Results != nil {
		b, err := json.Marshal(rec.Results)
		if err != nil {
			return err
		}
		results = string(b)
	}
	_, err = d.sql.Exec(
		`INSERT OR REPLACE INTO rooms (id, cards, state, round, results, activity, last_activity)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		rec.ID, string(cards), rec.State, rec.Round,
		results, string(activity), time.Now().Unix(),
	)
	return err
}

func (d *DB) LoadAll() ([]RoomRecord, error) {
	rows, err := d.sql.Query(
		`SELECT id, cards, state, round, results, activity FROM rooms`,
	)
	if err != nil {
		return nil, err
	}
	defer func() { _ = rows.Close() }()

	var records []RoomRecord
	for rows.Next() {
		var rec RoomRecord
		var cardsJSON, activityJSON, stateStr string
		var resultsJSON sql.NullString
		if err := rows.Scan(&rec.ID, &cardsJSON, &stateStr, &rec.Round, &resultsJSON, &activityJSON); err != nil {
			return nil, err
		}
		rec.State = stateStr
		if err := json.Unmarshal([]byte(cardsJSON), &rec.Cards); err != nil {
			return nil, err
		}
		if err := json.Unmarshal([]byte(activityJSON), &rec.Activity); err != nil {
			return nil, err
		}
		if rec.Activity == nil {
			rec.Activity = []RecordActivity{}
		}
		if resultsJSON.Valid {
			rec.Results = &RecordResults{}
			if err := json.Unmarshal([]byte(resultsJSON.String), rec.Results); err != nil {
				return nil, err
			}
		}
		records = append(records, rec)
	}
	return records, rows.Err()
}

func (d *DB) Cleanup(maxAge time.Duration) error {
	cutoff := time.Now().Add(-maxAge).Unix()
	_, err := d.sql.Exec(`DELETE FROM rooms WHERE last_activity < ?`, cutoff)
	return err
}
