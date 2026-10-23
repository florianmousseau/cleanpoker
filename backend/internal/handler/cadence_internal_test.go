package handler

import (
	"testing"
	"time"
)

func TestCadence_AllowsABurstThenRefusesAFlood(t *testing.T) {
	now := time.Unix(0, 0)
	c := newCadence(now)
	for i := range commandBurst {
		if !c.allow(now) {
			t.Fatalf("command %d of the burst refused", i)
		}
	}
	if c.allow(now) {
		t.Fatal("a command past the burst was allowed")
	}
}

func TestCadence_RefillsAtItsRate(t *testing.T) {
	now := time.Unix(0, 0)
	c := newCadence(now)
	for range commandBurst {
		c.allow(now)
	}
	now = now.Add(time.Second)
	for i := range commandsPerSecond {
		if !c.allow(now) {
			t.Fatalf("command %d after one second refused", i)
		}
	}
	if c.allow(now) {
		t.Fatal("the bucket refilled past its rate")
	}
}
