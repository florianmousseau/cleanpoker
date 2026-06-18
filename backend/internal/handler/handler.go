package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/florianmousseau/cleanpoker/internal/room"
	"github.com/florianmousseau/cleanpoker/internal/store"
	"github.com/google/uuid"
	"golang.org/x/net/websocket"
)

func New(s *store.Store, allowedOrigins []string) http.Handler {
	allowed := make(map[string]bool, len(allowedOrigins))
	for _, o := range allowedOrigins {
		allowed[o] = true
	}
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	mux.HandleFunc("POST /rooms", func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			Cards []string `json:"cards"`
		}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			body.Cards = room.DefaultCards
		}
		if len(body.Cards) == 0 {
			body.Cards = room.DefaultCards
		}
		id := uuid.New().String()[:8]
		s.GetOrCreate(id, body.Cards)
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(map[string]string{"id": id}); err != nil {
			log.Printf("warn: encode response: %v", err)
		}
	})

	mux.HandleFunc("GET /rooms/{id}/ws", func(w http.ResponseWriter, r *http.Request) {
		roomID := r.PathValue("id")
		playerName := r.URL.Query().Get("name")
		observer := r.URL.Query().Get("observer") == "true"
		if playerName == "" {
			http.Error(w, "name required", http.StatusBadRequest)
			return
		}
		rm := s.GetOrCreate(roomID, nil)
		websocket.Handler(func(conn *websocket.Conn) {
			handleWS(conn, rm, playerName, observer)
		}).ServeHTTP(w, r)
	})

	return cors(allowed, mux)
}

func handleWS(conn *websocket.Conn, rm *room.Room, playerName string, observer bool) {
	playerID := uuid.New().String()

	if err := websocket.JSON.Send(conn, room.Message{Type: "welcome", Payload: map[string]string{"id": playerID}}); err != nil {
		return
	}

	rm.Join(playerID, playerName, observer)
	defer rm.Leave(playerID)

	ch := rm.Subscribe(playerID)
	defer rm.Unsubscribe(playerID)

	if err := websocket.JSON.Send(conn, room.Message{Type: "state", Payload: rm.Snapshot()}); err != nil {
		return
	}

	go func() {
		for msg := range ch {
			if err := websocket.JSON.Send(conn, msg); err != nil {
				_ = conn.Close()
				return
			}
		}
	}()

	for {
		var action struct {
			Type    string `json:"type"`
			Payload string `json:"payload"`
		}
		if err := websocket.JSON.Receive(conn, &action); err != nil {
			return
		}
		switch action.Type {
		case "vote":
			rm.CastVote(playerID, action.Payload)
		case "show":
			rm.Show(playerID)
		case "clear":
			rm.Clear(playerID)
		case "kick":
			rm.Kick(playerID, action.Payload)
		case "toggleObserver":
			rm.ToggleObserver(playerID, action.Payload)
		default:
			log.Printf("unknown action: %s", action.Type)
		}
	}
}

func cors(allowed map[string]bool, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); allowed[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
