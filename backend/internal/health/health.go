// Package health builds what /health answers: not "the process is up", which
// the status code already says, but whether a visitor can still do what they
// came for, and whether the build serving them is the one on main.
package health

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// The three levels every probe of the fleet speaks. A red stays rare to stay
// read: it means a visitor sees something broken right now.
const (
	OK        = "ok"
	Attention = "attention"
	Rouge     = "rouge"
)

// WalkMemo bounds how often the room walk really runs. A probe called in a
// loop must not open a room per call, and five minutes is the longest a walk
// may be reused before it measures the past.
const WalkMemo = 30 * time.Second

// HeadMemo bounds how often the head of main is asked for. It is not a walk:
// the commit on main moves a few times a week.
const HeadMemo = 10 * time.Minute

// LagTolerance is how long main may run ahead of the served build before it
// is a finding: a release deploys within minutes, a day means it did not.
const LagTolerance = 24 * time.Hour

// Constat is one finding, judged on its own.
type Constat struct {
	Nom    string `json:"nom"`
	Niveau string `json:"niveau"`
	Detail string `json:"detail"`
}

// Deploye says which build answers and how it compares to main.
type Deploye struct {
	Commit string  `json:"commit"`
	Juge   string  `json:"juge"`
	Main   string  `json:"main,omitempty"`
	Retard *Retard `json:"retard,omitempty"`
}

// Retard is the lag behind main, measured from the date main last moved.
type Retard struct {
	Mesure bool    `json:"mesure"`
	Heures float64 `json:"heures"`
}

// Report is the body of /health. It answers 200 in every case: the status
// code says the process serves, Alerte says whether a visitor is served.
type Report struct {
	Status        string    `json:"status"`
	UptimeSeconds int64     `json:"uptimeSeconds"`
	Alerte        string    `json:"alerte"`
	Constats      []Constat `json:"constats"`
	Echecs        []string  `json:"echecs_des_sondes"`
	Deploye       Deploye   `json:"deploye"`
}

// Head is the newest commit of the production branch.
type Head struct {
	SHA  string
	Date time.Time
}

// Checker runs the walk and judges the build. Every field is a dependency so
// a test can break each one the way production breaks it.
type Checker struct {
	Walk   func(ctx context.Context) error
	Head   func(ctx context.Context) (Head, error)
	Commit string
	Since  time.Time
	Now    func() time.Time

	mu       sync.Mutex
	walkAt   time.Time
	walkErr  error
	walkTook time.Duration
	headAt   time.Time
	head     Head
	headErr  error
}

// Report runs what is due and judges everything.
func (c *Checker) Report(ctx context.Context) Report {
	now := c.Now()
	walk := c.walkConstat(ctx, now)
	deploy, deployed := c.deployConstat(ctx, now)
	constats := []Constat{walk, deploy}
	r := Report{
		Status:        OK,
		UptimeSeconds: int64(now.Sub(c.Since).Seconds()),
		Alerte:        worst(constats),
		Constats:      constats,
		Echecs:        []string{},
		Deploye:       deployed,
	}
	if walk.Niveau != OK {
		r.Echecs = append(r.Echecs, walk.Detail)
	}
	if deployed.Juge == "non juge" {
		r.Echecs = append(r.Echecs, deploy.Detail)
	}
	return r
}

func (c *Checker) walkConstat(ctx context.Context, now time.Time) Constat {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.walkAt.IsZero() || now.Sub(c.walkAt) >= WalkMemo {
		start := time.Now()
		c.walkErr = c.Walk(ctx)
		c.walkTook = time.Since(start)
		c.walkAt = now
	}
	if c.walkErr != nil {
		return Constat{Nom: "salle", Niveau: Rouge, Detail: c.walkErr.Error()}
	}
	return Constat{
		Nom:    "salle",
		Niveau: OK,
		Detail: fmt.Sprintf("salle creee puis rejointe en %d ms", c.walkTook.Milliseconds()),
	}
}

func (c *Checker) currentHead(ctx context.Context, now time.Time) (Head, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.headAt.IsZero() || now.Sub(c.headAt) >= HeadMemo {
		c.head, c.headErr = c.Head(ctx)
		c.headAt = now
	}
	return c.head, c.headErr
}

func (c *Checker) deployConstat(ctx context.Context, now time.Time) (Constat, Deploye) {
	d := Deploye{Commit: c.Commit, Juge: "non juge"}
	if c.Commit == "" || c.Commit == "inconnu" {
		return Constat{Nom: "deploiement", Niveau: Attention,
			Detail: "commit servi inconnu : image construite sans --build-arg COMMIT"}, d
	}
	head, err := c.currentHead(ctx, now)
	if err != nil {
		return Constat{Nom: "deploiement", Niveau: Attention,
			Detail: "tete de main illisible : " + err.Error()}, d
	}
	d.Main = head.SHA
	if sameCommit(head.SHA, c.Commit) {
		d.Juge = "a jour"
		d.Retard = &Retard{Mesure: true}
		return Constat{Nom: "deploiement", Niveau: OK, Detail: "sert la tete de main"}, d
	}
	lag := now.Sub(head.Date)
	d.Juge = "en retard"
	d.Retard = &Retard{Mesure: true, Heures: float64(int(lag.Hours()*10)) / 10}
	detail := fmt.Sprintf("sert %s, main est %s depuis %.1f h", short(c.Commit), short(head.SHA), lag.Hours())
	if lag > LagTolerance {
		return Constat{Nom: "deploiement", Niveau: Attention, Detail: detail}, d
	}
	return Constat{Nom: "deploiement", Niveau: OK, Detail: detail + ", deploiement attendu"}, d
}

func sameCommit(a, b string) bool {
	n := min(len(a), len(b))
	return n >= 7 && a[:n] == b[:n]
}

func short(sha string) string {
	if len(sha) > 7 {
		return sha[:7]
	}
	return sha
}

func worst(constats []Constat) string {
	rank := map[string]int{OK: 0, Attention: 1, Rouge: 2}
	level := OK
	for _, c := range constats {
		if rank[c.Niveau] > rank[level] {
			level = c.Niveau
		}
	}
	return level
}
