package handler

import "time"

// Bounds on how fast one connection may send commands. Every command rebuilds
// and broadcasts the whole room, so one scripted client in a full room could
// make the server send hundreds of thousands of messages a second. A person
// clicks a few times a second at most and the page pings every 25 seconds.
const (
	commandBurst      = 40
	commandsPerSecond = 10
)

// cadence is a token bucket for one connection. It is read by the connection's
// own read loop only, so it needs no lock.
type cadence struct {
	tokens float64
	last   time.Time
}

func newCadence(now time.Time) *cadence {
	return &cadence{tokens: commandBurst, last: now}
}

// allow spends one token, refilled at commandsPerSecond up to commandBurst. It
// reports false once the client sends faster than any person can.
func (c *cadence) allow(now time.Time) bool {
	c.tokens = min(commandBurst, c.tokens+now.Sub(c.last).Seconds()*commandsPerSecond)
	c.last = now
	if c.tokens < 1 {
		return false
	}
	c.tokens--
	return true
}
