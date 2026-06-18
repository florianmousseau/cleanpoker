package room

import (
	"sync"
	"time"
)

type State string

const (
	StateVoting   State = "voting"
	StateRevealed State = "revealed"
)

var DefaultCards = []string{"1", "2", "3", "5", "8", "13", "21", "?"}

const (
	maxActivityEntries = 20
	hiddenVote         = "hidden"
)

type Player struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Vote     string `json:"vote"`
	Observer bool   `json:"observer"`
}

type ActivityEntry struct {
	Timestamp string `json:"timestamp"`
	Initiator string `json:"initiator"`
	Message   string `json:"message"`
	Target    string `json:"target,omitempty"`
}

type Results struct {
	Avg  string         `json:"avg"`
	Mode string         `json:"mode"`
	Min  string         `json:"min"`
	Max  string         `json:"max"`
	Dist map[string]int `json:"dist"`
}

type Message struct {
	Type    string `json:"type"`
	Payload any    `json:"payload"`
}

type Snapshot struct {
	ID       string          `json:"id"`
	Cards    []string        `json:"cards"`
	State    State           `json:"state"`
	Round    int             `json:"round"`
	Results  *Results        `json:"results"`
	Players  []*Player       `json:"players"`
	Activity []ActivityEntry `json:"activity"`
}

type Room struct {
	mu           sync.RWMutex
	id           string
	cards        []string
	players      map[string]*Player
	state        State
	round        int
	results      *Results
	activity     []ActivityEntry
	lastActivity time.Time

	broadcast   chan Message
	direct      chan directMessage
	subscribe   chan subscription
	unsubscribe chan string

	onPersist func(Snapshot)
}

type subscription struct {
	playerID string
	ch       chan Message
}

type directMessage struct {
	playerID string
	msg      Message
}

func New(id string, cards []string) *Room {
	if len(cards) == 0 {
		cards = DefaultCards
	}
	r := &Room{
		id:           id,
		cards:        cards,
		players:      make(map[string]*Player),
		state:        StateVoting,
		round:        1,
		activity:     []ActivityEntry{},
		lastActivity: time.Now(),
		broadcast:    make(chan Message, 32),
		direct:       make(chan directMessage, 8),
		subscribe:    make(chan subscription, 8),
		unsubscribe:  make(chan string, 8),
	}
	go r.run()
	return r
}

func (r *Room) LastActivity() time.Time {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.lastActivity
}

func (r *Room) Snapshot() Snapshot {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.snapshot()
}

func (r *Room) snapshot() Snapshot {
	players := make([]*Player, 0, len(r.players))
	for _, p := range r.players {
		cp := *p
		if r.state == StateVoting && !cp.Observer && cp.Vote != "" {
			cp.Vote = hiddenVote
		}
		players = append(players, &cp)
	}
	activity := make([]ActivityEntry, len(r.activity))
	copy(activity, r.activity)
	var results *Results
	if r.results != nil {
		cp := *r.results
		results = &cp
	}
	return Snapshot{
		ID:       r.id,
		Cards:    r.cards,
		State:    r.state,
		Round:    r.round,
		Results:  results,
		Players:  players,
		Activity: activity,
	}
}

// rawSnapshot returns a snapshot with actual votes (not masked), for persistence only.
func (r *Room) rawSnapshot() Snapshot {
	players := make([]*Player, 0, len(r.players))
	for _, p := range r.players {
		cp := *p
		players = append(players, &cp)
	}
	activity := make([]ActivityEntry, len(r.activity))
	copy(activity, r.activity)
	var results *Results
	if r.results != nil {
		cp := *r.results
		results = &cp
	}
	return Snapshot{
		ID:       r.id,
		Cards:    r.cards,
		State:    r.state,
		Round:    r.round,
		Results:  results,
		Players:  players,
		Activity: activity,
	}
}

// Restore creates a Room from a persisted snapshot. Players are not restored
// (they were all disconnected); they will rejoin via WebSocket.
func Restore(snap Snapshot) *Room {
	r := &Room{
		id:           snap.ID,
		cards:        snap.Cards,
		players:      make(map[string]*Player),
		state:        snap.State,
		round:        snap.Round,
		activity:     snap.Activity,
		lastActivity: time.Now(),
		broadcast:    make(chan Message, 32),
		direct:       make(chan directMessage, 8),
		subscribe:    make(chan subscription, 8),
		unsubscribe:  make(chan string, 8),
	}
	if snap.Results != nil {
		cp := *snap.Results
		r.results = &cp
	}
	go r.run()
	return r
}

func (r *Room) SetPersistHook(fn func(Snapshot)) {
	r.onPersist = fn
}

func (r *Room) nameOf(playerID string) string {
	if p, ok := r.players[playerID]; ok {
		return p.Name
	}
	return "Unknown"
}

func (r *Room) logActivity(initiator, message string, target ...string) {
	entry := ActivityEntry{
		Timestamp: time.Now().Format("15:04:05"),
		Initiator: initiator,
		Message:   message,
	}
	if len(target) > 0 {
		entry.Target = target[0]
	}
	r.activity = append(r.activity, entry)
	if len(r.activity) > maxActivityEntries {
		r.activity = r.activity[len(r.activity)-maxActivityEntries:]
	}
}

func (r *Room) mutate(fn func()) {
	r.mu.Lock()
	fn()
	r.lastActivity = time.Now()
	snap := r.snapshot()
	var raw Snapshot
	if r.onPersist != nil {
		raw = r.rawSnapshot()
	}
	r.mu.Unlock()
	r.broadcast <- Message{Type: "state", Payload: snap}
	if r.onPersist != nil {
		r.onPersist(raw)
	}
}

func (r *Room) Join(playerID, name string, observer bool) {
	r.mutate(func() {
		r.players[playerID] = &Player{ID: playerID, Name: name, Observer: observer}
		if observer {
			r.logActivity(name, "joined_observer")
		} else {
			r.logActivity(name, "joined")
		}
	})
}

func (r *Room) Leave(playerID string) {
	r.mutate(func() {
		if p, ok := r.players[playerID]; ok {
			r.logActivity(p.Name, "left")
			delete(r.players, playerID)
		}
	})
}

func (r *Room) CastVote(playerID, vote string) {
	r.mutate(func() {
		p, ok := r.players[playerID]
		if !ok || r.state != StateVoting || p.Observer {
			return
		}
		p.Vote = vote
		if vote == "" {
			r.logActivity(p.Name, "unvoted")
		} else {
			r.logActivity(p.Name, "voted")
		}
	})
}

func (r *Room) Show(initiatorID string) {
	r.mutate(func() {
		r.state = StateRevealed
		votes := map[string]string{}
		for _, p := range r.players {
			if !p.Observer && p.Vote != "" {
				votes[p.Name] = p.Vote
			}
		}
		res := computeResults(votes, r.cards)
		r.results = &res
		r.logActivity(r.nameOf(initiatorID), "revealed")
	})
}

func (r *Room) Clear(initiatorID string) {
	r.mutate(func() {
		for _, p := range r.players {
			p.Vote = ""
		}
		r.state = StateVoting
		r.results = nil
		r.round++
		r.logActivity(r.nameOf(initiatorID), "new_round")
	})
}

func (r *Room) Kick(initiatorID, targetID string) {
	var kicked bool
	r.mutate(func() {
		target, ok := r.players[targetID]
		if !ok {
			return
		}
		r.logActivity(r.nameOf(initiatorID), "kicked", target.Name)
		delete(r.players, targetID)
		kicked = true
	})
	if kicked {
		r.direct <- directMessage{playerID: targetID, msg: Message{Type: "kicked"}}
	}
}

func (r *Room) ToggleObserver(initiatorID, targetID string) {
	r.mutate(func() {
		target, ok := r.players[targetID]
		if !ok {
			return
		}
		target.Observer = !target.Observer
		if target.Observer {
			target.Vote = ""
			r.logActivity(r.nameOf(initiatorID), "to_observer", target.Name)
		} else {
			r.logActivity(r.nameOf(initiatorID), "to_participant", target.Name)
		}
	})
}

func (r *Room) Subscribe(playerID string) chan Message {
	ch := make(chan Message, 16)
	r.subscribe <- subscription{playerID: playerID, ch: ch}
	return ch
}

func (r *Room) Unsubscribe(playerID string) {
	r.unsubscribe <- playerID
}

func (r *Room) run() {
	subs := make(map[string]chan Message)
	for {
		select {
		case s := <-r.subscribe:
			subs[s.playerID] = s.ch
		case pid := <-r.unsubscribe:
			if ch, ok := subs[pid]; ok {
				delete(subs, pid)
				close(ch)
			}
		case d := <-r.direct:
			if ch, ok := subs[d.playerID]; ok {
				trySend(ch, d.msg)
			}
		case msg := <-r.broadcast:
			for _, ch := range subs {
				trySend(ch, msg)
			}
		}
	}
}

func trySend(ch chan Message, msg Message) {
	select {
	case ch <- msg:
	default:
	}
}
