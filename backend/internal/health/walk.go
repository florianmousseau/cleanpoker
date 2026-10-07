package health

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"golang.org/x/net/websocket"
)

// ProbeHeader marks the requests of the walk so the usage counters skip them.
// Without it a probe read every hour would be most of the sessions counted on
// a site this size. It grants nothing else: a room opened with it is a room.
const ProbeHeader = "X-Cleanpoker-Sonde"

// ProbeName is the seat the walk takes.
const ProbeName = "sonde"

const walkTimeout = 5 * time.Second

// RoomWalk returns the walk a visitor makes: create a room the way the home
// page does, from the site's origin, then join it over the WebSocket and see
// one's own seat in the state. Base is where the server listens; origin is
// the site the browser runs on. Forget removes the room once read.
func RoomWalk(base, origin string, client *http.Client, forget func(id string)) func(ctx context.Context) error {
	return func(ctx context.Context) error {
		ctx, cancel := context.WithTimeout(ctx, walkTimeout)
		defer cancel()
		id, err := createRoom(ctx, base, origin, client)
		if err != nil {
			return err
		}
		defer forget(id)
		return joinRoom(ctx, base, origin, id)
	}
}

func createRoom(ctx context.Context, base, origin string, client *http.Client) (string, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, base+"/rooms",
		strings.NewReader(`{"cards":["1","2","3"]}`))
	if err != nil {
		return "", fmt.Errorf("creation de salle : %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Origin", origin)
	req.Header.Set(ProbeHeader, "1")
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("creation de salle : %w", err)
	}
	defer func() { _ = resp.Body.Close() }()
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("creation de salle : HTTP %d", resp.StatusCode)
	}
	if got := resp.Header.Get("Access-Control-Allow-Origin"); got != origin {
		return "", fmt.Errorf("creation de salle : le navigateur de %s serait refuse (CORS %q)", origin, got)
	}
	var body struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		return "", fmt.Errorf("creation de salle : reponse illisible : %w", err)
	}
	if body.ID == "" {
		return "", errors.New("creation de salle : aucun identifiant rendu")
	}
	return body.ID, nil
}

func joinRoom(ctx context.Context, base, origin, id string) error {
	cfg, err := websocket.NewConfig("ws"+strings.TrimPrefix(base, "http")+"/rooms/"+id+"/ws?name="+ProbeName, origin)
	if err != nil {
		return fmt.Errorf("salle %s : %w", id, err)
	}
	cfg.Header = http.Header{ProbeHeader: []string{"1"}}
	conn, err := cfg.DialContext(ctx)
	if err != nil {
		return fmt.Errorf("salle %s : connexion WebSocket refusee : %w", id, err)
	}
	defer func() { _ = conn.Close() }()
	if deadline, ok := ctx.Deadline(); ok {
		_ = conn.SetDeadline(deadline) // a socket that cannot take a deadline fails on the read below
	}
	seat, err := readWelcome(conn)
	if err != nil {
		return fmt.Errorf("salle %s : %w", id, err)
	}
	if err := readOwnSeat(conn, seat); err != nil {
		return fmt.Errorf("salle %s : %w", id, err)
	}
	return nil
}

type message struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

func readWelcome(conn *websocket.Conn) (string, error) {
	var msg message
	if err := websocket.JSON.Receive(conn, &msg); err != nil {
		return "", fmt.Errorf("aucun accueil : %w", err)
	}
	var welcome struct {
		ID string `json:"id"`
	}
	if msg.Type != "welcome" || json.Unmarshal(msg.Payload, &welcome) != nil || welcome.ID == "" {
		return "", fmt.Errorf("premier message %q au lieu de l'accueil", msg.Type)
	}
	return welcome.ID, nil
}

func readOwnSeat(conn *websocket.Conn, seat string) error {
	var msg message
	if err := websocket.JSON.Receive(conn, &msg); err != nil {
		return fmt.Errorf("aucun etat apres l'accueil : %w", err)
	}
	var state struct {
		Players []struct {
			ID string `json:"id"`
		} `json:"players"`
	}
	if msg.Type != "state" || json.Unmarshal(msg.Payload, &state) != nil {
		return fmt.Errorf("message %q au lieu de l'etat", msg.Type)
	}
	for _, p := range state.Players {
		if p.ID == seat {
			return nil
		}
	}
	return errors.New("la sonde ne se voit pas assise dans l'etat de la salle")
}
