package handler

import (
	"bufio"
	"context"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/health"
	"github.com/florianmousseau/cleanpoker/internal/store"
)

func TestCreateRoom_RefusesABodyThatNeverArrives(t *testing.T) {
	previous := createBodyTimeout
	createBodyTimeout = 200 * time.Millisecond
	t.Cleanup(func() { createBodyTimeout = previous })

	report := func(context.Context) health.Report { return health.Report{} }
	srv := httptest.NewServer(New(store.New(), []string{"http://test"}, report))
	t.Cleanup(srv.Close)

	conn, err := net.Dial("tcp", strings.TrimPrefix(srv.URL, "http://"))
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = conn.Close() }) // the test is over either way
	// Headers announce a body that is never sent.
	if _, err := conn.Write([]byte("POST /rooms HTTP/1.1\r\nHost: test\r\nContent-Type: application/json\r\nContent-Length: 100\r\n\r\n{")); err != nil {
		t.Fatal(err)
	}
	if err := conn.SetReadDeadline(time.Now().Add(3 * time.Second)); err != nil {
		t.Fatal(err)
	}
	res, err := http.ReadResponse(bufio.NewReader(conn), nil)
	if err != nil {
		t.Fatalf("no answer before the client gave up: %v", err)
	}
	defer func() { _ = res.Body.Close() }() // a refused body has nothing left to read
	if res.StatusCode != http.StatusRequestTimeout {
		t.Fatalf("status %d, want 408", res.StatusCode)
	}
}

func TestNewServer_BoundsHeadersAndIdleConnections(t *testing.T) {
	s := NewServer(":0", http.NewServeMux())
	if s.ReadHeaderTimeout <= 0 || s.IdleTimeout <= 0 {
		t.Fatalf("unbounded server: %+v", s)
	}
	if s.ReadTimeout != 0 {
		t.Fatal("a ReadTimeout would cut the WebSocket connections")
	}
}
