package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

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
		writeJSON(w, healthOf(s))
	})

	mux.HandleFunc("GET /stats", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, s.Usage())
	})

	mux.HandleFunc("POST /rooms", func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			Cards []string `json:"cards"`
		}
		_ = json.NewDecoder(r.Body).Decode(&body)
		writeJSON(w, map[string]string{"id": s.Create(body.Cards)})
	})

	mux.HandleFunc("GET /rooms/{id}/ws", func(w http.ResponseWriter, r *http.Request) {
		roomID := r.PathValue("id")
		playerName := r.URL.Query().Get("name")
		observer := r.URL.Query().Get("observer") == "true"
		token := r.URL.Query().Get("token")
		if playerName == "" {
			http.Error(w, "name required", http.StatusBadRequest)
			return
		}
		rm := s.GetOrCreate(roomID, nil)
		websocket.Handler(func(conn *websocket.Conn) {
			handleWS(conn, rm, s.RecordJoin, arrival{name: playerName, observer: observer, token: token})
		}).ServeHTTP(w, r)
	})

	return cors(allowed, mux)
}

// health is what a monitor reads. The status code alone already says the
// process answers, so the body carries what a code cannot: uptime. A machine
// that auto-stops when idle answers every probe with an uptime of zero, which
// looks identical to a healthy service until you read that number.
type health struct {
	Status        string `json:"status"`
	UptimeSeconds int64  `json:"uptimeSeconds"`
}

func healthOf(s *store.Store) health {
	return health{
		Status:        "ok",
		UptimeSeconds: int64(time.Since(s.Usage().Since).Seconds()),
	}
}

// writeJSON answers with a JSON body. An empty 200 reads as no answer at all
// to a probe that parses what it gets, which is how the health route went
// unnoticed as broken while returning 200.
func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("warn: encode response: %v", err)
	}
}

// arrival is what a connecting client asks for: a new seat under a name, or
// the seat its token opens if the room still holds it.
type arrival struct {
	name     string
	observer bool
	token    string
}

// welcome gives the client what it needs to come back: its seat, the token
// that opens it, and the vote it holds, which every snapshot masks.
type welcome struct {
	ID    string `json:"id"`
	Token string `json:"token"`
	Vote  string `json:"vote"`
}

func handleWS(conn *websocket.Conn, rm *room.Room, recordJoin func(), a arrival) {
	seat, resumed := rm.Rejoin(a.token)
	token := a.token
	if !resumed {
		seat = room.Player{ID: uuid.New().String(), Name: a.name, Observer: a.observer}
		token = uuid.New().String()
	}
	// The seat outlives this connection: closing it starts the grace, it
	// does not log a departure.
	defer rm.Disconnect(seat.ID)

	// Subscribe first, join second, and let the join broadcast be the initial
	// state. The client is registered before the room produces the message
	// that concerns it, so it gets that message once - not twice, and never
	// zero times. Sending a snapshot here on top of it would put the duplicate
	// back, deterministically this time.
	connID := uuid.New().String()
	ch := rm.Subscribe(connID, seat.ID)
	defer rm.Unsubscribe(connID)

	if err := websocket.JSON.Send(conn, room.Message{Type: "welcome", Payload: welcome{ID: seat.ID, Token: token, Vote: seat.Vote}}); err != nil {
		return
	}

	if resumed {
		rm.Refresh()
	} else {
		// Counted before the arrival is broadcast, so a client holding the
		// state that shows it in the room can read /stats and find itself
		// counted. A seat taken back is not a new arrival.
		recordJoin()
		rm.JoinWithToken(seat.ID, token, a.name, a.observer)
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
			rm.CastVote(seat.ID, action.Payload)
		case "show":
			rm.Show(seat.ID)
		case "clear":
			rm.Clear(seat.ID)
		case "kick":
			rm.Kick(seat.ID, action.Payload)
		case "toggleObserver":
			rm.ToggleObserver(seat.ID, action.Payload)
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
