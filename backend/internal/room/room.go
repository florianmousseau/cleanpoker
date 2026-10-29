package room

import (
	"crypto/subtle"
	"slices"
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
	everJoined   bool
	grace        time.Duration
	// connections counts the live sockets of each seated player; a seat only
	// starts its grace once the last one is gone.
	connections map[string]int
	departures  map[string]*departure

	// broadcast carries every outgoing message, private ones included: one
	// channel keeps them in the order the room produced them.
	broadcast   chan directMessage
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

// directMessage is one outgoing message; an empty playerID sends it to all.
// last closes the player's connections once msg is queued on them.
type directMessage struct {
	playerID string
	msg      Message
	last     bool
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
		broadcast:    make(chan directMessage, 32),
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

// EverJoined reports whether anybody ever took a seat in the room.
func (r *Room) EverJoined() bool {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.everJoined
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

// seated reports whether playerID still holds a seat. A kicked client keeps its
// socket until its browser closes it, so every command checks the seat rather
// than trusting the connection. Callers hold r.mu.
func (r *Room) seated(playerID string) bool {
	_, ok := r.players[playerID]
	return ok
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

// mutate applies fn and publishes the state it produced, both under the lock:
// published after unlocking, two concurrent commands could reach the loop in
// the reverse order and leave every screen on the older state. The loop never
// takes r.mu, so publishing under it cannot deadlock.
func (r *Room) mutate(fn func()) {
	r.mu.Lock()
	defer r.mu.Unlock()
	fn()
	r.lastActivity = time.Now()
	r.publish(Message{Type: "state", Payload: r.snapshot()})
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
		r.everJoined = true
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
	r.mutate(func() {
		// Nothing to change: the broadcast of the unchanged state is the point.
	})
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

// AnyRound is the round of a command that names none: what a client older
// than the round check sends, and what the room still accepts from it.
const AnyRound = 0

// current reports whether a command meant for round belongs to the round the
// room is in. A vote cast just before a new round, or the second click of a
// double-clicked "new round", arrives naming the round that has already gone.
// Callers hold r.mu.
func (r *Room) current(round int) bool {
	return round == AnyRound || round == r.round
}

// CastVote records a vote, then tells its voter which vote the room holds:
// snapshots mask it, so without this a vote refused (cast after the reveal, or
// from a seat turned observer) stayed on the voter's screen as if counted.
// round is the round the voter saw; a vote meant for an earlier one is refused.
func (r *Room) CastVote(playerID, vote string, round int) {
	r.mutate(func() {
		p, ok := r.players[playerID]
		if !ok {
			return
		}
		defer func() {
			// Queued under the lock, before the state: a later new round
			// can never reach the voter ahead of this answer.
			r.publishTo(playerID, Message{Type: "vote", Payload: p.Vote})
		}()
		if r.state != StateVoting || p.Observer || !r.current(round) {
			return
		}
		// A vote is a card of this room's deck or nothing: any other string
		// from a scripted client would land in everyone's results.
		if vote != "" && !slices.Contains(r.cards, vote) {
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
		// A second reveal of the same round would recompute the results on
		// whoever is seated now, after departures and role changes.
		if !r.seated(initiatorID) || r.state == StateRevealed {
			return
		}
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

// Clear starts a new round. round is the round the initiator saw: two clicks
// on "new round" for the same round start one, not two.
func (r *Room) Clear(initiatorID string, round int) {
	r.mutate(func() {
		if !r.seated(initiatorID) || !r.current(round) {
			return
		}
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
		if !ok || !r.seated(initiatorID) {
			return
		}
		r.logActivity(r.nameOf(initiatorID), "kicked", target.Name)
		delete(r.players, targetID)
		r.cancelDeparture(targetID)
		kicked = true
	})
	if kicked {
		r.dismiss(targetID, Message{Type: "kicked"})
	}
}

// dismiss sends msg to the connections of one player, then closes them. A
// kicked client that ignored its "kicked" message kept its subscription and
// went on receiving every later state, names and revealed votes included,
// without a seat to show for it.
func (r *Room) dismiss(playerID string, msg Message) {
	select {
	case r.broadcast <- directMessage{playerID: playerID, msg: msg, last: true}:
	case <-r.quit:
	}
}

// tell sends msg to the connections of one player only.
func (r *Room) tell(playerID string, msg Message) {
	r.publishTo(playerID, msg)
}

func (r *Room) ToggleObserver(initiatorID, targetID string) {
	r.mutate(func() {
		target, ok := r.players[targetID]
		if !ok || !r.seated(initiatorID) {
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
	select {
	case r.unsubscribe <- connID:
	case <-r.quit:
	}
}

// publish hands msg to the room loop, or drops it once the room is stopped: the
// loop no longer reads, and a command from a client still connected to an
// expired room would otherwise block its connection for good.
func (r *Room) publish(msg Message) {
	r.publishTo("", msg)
}

// publishTo is publish for the connections of one player; "" means everyone.
func (r *Room) publishTo(playerID string, msg Message) {
	select {
	case r.broadcast <- directMessage{playerID: playerID, msg: msg}:
	case <-r.quit:
	}
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
			closeSubscription(subs, connID)
		case d := <-r.broadcast:
			for id, s := range subs {
				if d.playerID == "" || s.playerID == d.playerID {
					deliverOrDrop(subs, id, d.msg)
				}
				if d.last && s.playerID == d.playerID {
					closeSubscription(subs, id)
				}
			}
		}
	}
}

// deliverOrDrop queues msg for one subscriber. A subscriber whose queue is full
// is cut off rather than skipped: a skipped reveal or kick left its screen on a
// false state for good, while a closed channel closes its socket and the client
// reconnects to the current one.
func deliverOrDrop(subs map[string]subscription, id string, msg Message) {
	s := subs[id]
	select {
	case s.ch <- msg:
	default:
		closeSubscription(subs, id)
	}
}

// closeSubscription forgets one connection and closes its channel, once.
func closeSubscription(subs map[string]subscription, id string) {
	if s, ok := subs[id]; ok {
		delete(subs, id)
		close(s.ch)
	}
}
