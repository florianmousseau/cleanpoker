package handler

import (
	"net"
	"net/http"
	"sync"
	"time"
)

// Room creation is admitted per source before anything is allocated: the
// store holds 2 000 rooms and an unused one lives ten minutes, so 2 000 empty
// POSTs from one caller used to shut every visitor out for as long as it kept
// going. A team opens a handful of rooms; a burst from one address is refused
// with 429 and leaves the rest of the capacity to everybody else.
const (
	createsPerSource = 30
	createWindow     = 10 * time.Minute
	// maxSources bounds the table itself: a caller inventing addresses fills
	// it, and a full table refuses new sources rather than growing.
	maxSources = 10_000
)

type window struct {
	start time.Time
	count int
}

type admission struct {
	mu      sync.Mutex
	now     func() time.Time
	sources map[string]*window
}

func newAdmission(now func() time.Time) *admission {
	return &admission{now: now, sources: make(map[string]*window)}
}

// allow counts one creation for source and says whether it may proceed.
func (a *admission) allow(source string) bool {
	a.mu.Lock()
	defer a.mu.Unlock()
	now := a.now()
	w, ok := a.sources[source]
	if ok && now.Sub(w.start) >= createWindow {
		w.start, w.count = now, 0
	}
	if !ok {
		if len(a.sources) >= maxSources {
			a.forgetExpired(now)
		}
		if len(a.sources) >= maxSources {
			return false
		}
		w = &window{start: now}
		a.sources[source] = w
	}
	if w.count >= createsPerSource {
		return false
	}
	w.count++
	return true
}

func (a *admission) forgetExpired(now time.Time) {
	for k, w := range a.sources {
		if now.Sub(w.start) >= createWindow {
			delete(a.sources, k)
		}
	}
}

// sourceOf names the caller. The server listens on loopback behind the
// Cloudflare tunnel, which sets CF-Connecting-IP on every request it carries
// and overwrites one a client sends; a request without it comes from this
// machine, the health walk included.
func sourceOf(r *http.Request) string {
	if ip := r.Header.Get("CF-Connecting-IP"); ip != "" {
		return ip
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
