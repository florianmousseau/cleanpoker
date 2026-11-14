package handler

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/health"
	"github.com/florianmousseau/cleanpoker/internal/store"
)

func TestABurstFromOneSourceLeavesTheCapacityToOthers(t *testing.T) {
	s := store.NewWithLimit(100)
	h := New(s, []string{"http://test"}, func(_ context.Context) health.Report { return health.Report{} })
	post := func(ip string) int {
		req := httptest.NewRequest(http.MethodPost, "/rooms", strings.NewReader("{}"))
		req.Header.Set("CF-Connecting-IP", ip)
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, req)
		return rec.Code
	}
	refused := 0
	for range 2 * createsPerSource {
		if post("203.0.113.7") == http.StatusTooManyRequests {
			refused++
		}
	}
	if refused != createsPerSource {
		t.Fatalf("refused %d of a burst of %d, want %d", refused, 2*createsPerSource, createsPerSource)
	}
	if got := post("198.51.100.1"); got != http.StatusOK {
		t.Fatalf("another visitor got %d after the burst, want 200", got)
	}
}

func TestAWindowReopensAndTheTableStaysBounded(t *testing.T) {
	now := time.Date(2026, 11, 14, 0, 0, 0, 0, time.UTC)
	a := newAdmission(func() time.Time { return now })
	for range createsPerSource {
		a.allow("x")
	}
	if a.allow("x") {
		t.Fatal("a source past its quota was admitted")
	}
	now = now.Add(createWindow)
	if !a.allow("x") {
		t.Fatal("the window did not reopen")
	}
	for i := range maxSources {
		a.allow(fmt.Sprint(i))
	}
	if a.allow("new") {
		t.Fatal("a full table took a new source")
	}
	if len(a.sources) > maxSources {
		t.Fatalf("table grew to %d", len(a.sources))
	}
	now = now.Add(createWindow)
	if !a.allow("new") {
		t.Fatal("expired sources were not forgotten")
	}
}

func TestTheSourceIsTheTunnelHeaderOrTheRemoteHost(t *testing.T) {
	r := httptest.NewRequest(http.MethodPost, "/rooms", nil)
	r.RemoteAddr = "127.0.0.1:5555"
	if got := sourceOf(r); got != "127.0.0.1" {
		t.Fatalf("got %q", got)
	}
	r.Header.Set("CF-Connecting-IP", "2001:db8::1")
	if got := sourceOf(r); got != "2001:db8::1" {
		t.Fatalf("got %q", got)
	}
	r.Header.Del("CF-Connecting-IP")
	r.RemoteAddr = "pipe"
	if got := sourceOf(r); got != "pipe" {
		t.Fatalf("got %q", got)
	}
}
