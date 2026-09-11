package room

import (
	"crypto/subtle"
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

// DepartureGrace is how long a seat outlives the connection that held it. A
// reload, a phone restoring a tab, or a look at another page of the site all
// drop the socket; within this window the player takes the same seat back,
// vote included, and the room never reads a departure that did not happen.
const DepartureGrace = 30 * time.Second

type Player struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Vote     string `json:"vote"`
	Observer bool   `json:"observer"`
	// token is what a returning client presents to take this seat back. It
	// is unexported so no snapshot ever carries it to the other players.
	token string
}

// departure is one pending removal. The room compares pointers, so a timer
// that fires after its seat was taken back finds a stale entry and does nothing.
type departure struct {
	timer *time.Timer
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
	grace        time.Duration
	// connections counts the live sockets of each seated player; a seat only
	// starts its grace once the last one is gone.
	connections map[string]int
	departures  map[string]*departure

	broadcast   chan Message
	direct      chan directMessage
	subscribe   chan subscription
	unsubscribe chan string
	quit        chan struct{}
}

type subscription struct {
	connID   string
	playerID string
	ch       chan Message
	// ready is closed by the loop once the subscription is in hand.
	ready chan struct{}
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
		grace:        DepartureGrace,
		connections:  make(map[string]int),
		departures:   make(map[string]*departure),
		broadcast:    make(chan Message, 32),
		direct:       make(chan directMessage, 8),
		subscribe:    make(chan subscription, 8),
		unsubscribe:  make(chan string, 8),
		quit:         make(chan struct{}),
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

func (r *Room) buildSnapshot(masked bool) Snapshot {
	players := make([]*Player, 0, len(r.players))
	for _, p := range r.players {
		cp := *p
		cp.token = ""
		if masked && r.state == StateVoting && !cp.Observer && cp.Vote != "" {
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

func (r *Room) snapshot() Snapshot { return r.buildSnapshot(true) }

func (r *Room) Stop() {
	close(r.quit)
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
	r.mu.Unlock()
	r.broadcast <- Message{Type: "state", Payload: snap}
}

// Join seats a player that no client can take back.
func (r *Room) Join(playerID, name string, observer bool) {
	r.JoinWithToken(playerID, "", name, observer)
}

// JoinWithToken seats a player on its first connection. token is the secret
// Rejoin will ask for; an empty one makes the seat impossible to take back.
func (r *Room) JoinWithToken(playerID, token, name string, observer bool) {
	r.mutate(func() {
		r.players[playerID] = &Player{ID: playerID, Name: name, Observer: observer, token: token}
		r.connections[playerID]++
		if observer {
			r.logActivity(name, "joined_observer")
		} else {
			r.logActivity(name, "joined")
		}
	})
}

// Rejoin hands a returning client the seat its token opens, with the vote it
// holds, and counts one more connection on it. It does not broadcast, so the
// caller can subscribe first and then Refresh. It reports false when no seat
// matches: the player was kicked, or its grace ran out.
func (r *Room) Rejoin(token string) (Player, bool) {
	if token == "" {
		return Player{}, false
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	for _, p := range r.players {
		if subtle.ConstantTimeCompare([]byte(p.token), []byte(token)) != 1 {
			continue
		}
		r.cancelDeparture(p.ID)
		r.connections[p.ID]++
		r.lastActivity = time.Now()
		seat := *p
		seat.token = ""
		return seat, true
	}
	return Player{}, false
}

// Refresh broadcasts the current state without changing it: what a client
// that took its seat back needs, and what the others lose nothing receiving.
func (r *Room) Refresh() {
	r.mutate(func() {})
}

// Disconnect records that one of a player's connections closed. Once none is
// left the seat waits out its grace before the departure is logged.
func (r *Room) Disconnect(playerID string) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.connections[playerID]--
	if r.connections[playerID] > 0 {
		return
	}
	delete(r.connections, playerID)
	if _, seated := r.players[playerID]; !seated {
		return
	}
	d := &departure{}
	r.departures[playerID] = d
	d.timer = time.AfterFunc(r.grace, func() { r.expire(playerID, d) })
}

func (r *Room) expire(playerID string, d *departure) {
	select {
	case <-r.quit:
		return
	default:
	}
	r.mutate(func() {
		if r.departures[playerID] != d {
			return
		}
		delete(r.departures, playerID)
		r.removePlayer(playerID)
	})
}

// cancelDeparture must be called with r.mu held.
func (r *Room) cancelDeparture(playerID string) {
	if d, ok := r.departures[playerID]; ok {
		d.timer.Stop()
		delete(r.departures, playerID)
	}
}

func (r *Room) Leave(playerID string) {
	r.mutate(func() {
		r.cancelDeparture(playerID)
		r.removePlayer(playerID)
	})
}

// removePlayer must be called with r.mu held.
func (r *Room) removePlayer(playerID string) {
	if p, ok := r.players[playerID]; ok {
		r.logActivity(p.Name, "left")
		delete(r.players, playerID)
	}
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
		votes := make([]string, 0, len(r.players))
		for _, p := range r.players {
			if !p.Observer && p.Vote != "" {
				votes = append(votes, p.Vote)
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
		r.cancelDeparture(targetID)
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

// Subscribe registers a client and returns only once the room loop holds the
// subscription. The wait is the whole point.
//
// Queuing the subscription and returning left the caller with a channel the
// loop did not know about yet, and both messages - the subscription and the
// broadcast a Join right after it produces - then sat in their buffers waiting
// for the same select. Which one it picked was a coin toss, and the arriving
// client either received its own arrival twice or lost the next broadcast
// entirely. Measured on 2026-08-29: 105 duplicates out of 200 arrivals once
// the loop was slow to reach its select, which is what a loaded CI runner does
// to a goroutine that has just been started. That is the intermittent failure
// of TestHappyPath_VoteShowClear, on both of its faces.
//
// Ordering, not timing, is what closes this: a subscriber that exists before
// Join cannot miss the broadcast Join makes, and cannot be handed it twice.
//
// A subscription belongs to one connection, not to a player: a seat taken back
// by a second tab has two, and closing either must not cut the other off.
func (r *Room) Subscribe(connID, playerID string) chan Message {
	ch := make(chan Message, 16)
	ready := make(chan struct{})
	select {
	case r.subscribe <- subscription{connID: connID, playerID: playerID, ch: ch, ready: ready}:
	case <-r.quit:
		close(ch)
		return ch
	}
	select {
	case <-ready:
	case <-r.quit:
	}
	return ch
}

func (r *Room) Unsubscribe(connID string) {
	r.unsubscribe <- connID
}

func (r *Room) run() {
	subs := make(map[string]subscription)
	for {
		select {
		case <-r.quit:
			for _, s := range subs {
				close(s.ch)
			}
			return
		case s := <-r.subscribe:
			subs[s.connID] = s
			close(s.ready)
		case connID := <-r.unsubscribe:
			if s, ok := subs[connID]; ok {
				delete(subs, connID)
				close(s.ch)
			}
		case d := <-r.direct:
			for _, s := range subs {
				if s.playerID == d.playerID {
					trySend(s.ch, d.msg)
				}
			}
		case msg := <-r.broadcast:
			for _, s := range subs {
				trySend(s.ch, msg)
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
