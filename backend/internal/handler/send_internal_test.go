package handler

import (
	"bufio"
	"crypto/sha1"
	"encoding/base64"
	"net"
	"net/http"
	"testing"
	"time"

	"golang.org/x/net/websocket"
)

// acceptHandshake answers one WebSocket opening handshake on conn and then
// never reads again: the peer of a client that stopped reading.
func acceptHandshake(t *testing.T, conn net.Conn) {
	t.Helper()
	req, err := http.ReadRequest(bufio.NewReader(conn))
	if err != nil {
		t.Errorf("read handshake: %v", err)
		return
	}
	sum := sha1.Sum([]byte(req.Header.Get("Sec-WebSocket-Key") + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))
	answer := "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n" +
		"Sec-WebSocket-Accept: " + base64.StdEncoding.EncodeToString(sum[:]) + "\r\n\r\n"
	if _, err := conn.Write([]byte(answer)); err != nil {
		t.Errorf("write handshake: %v", err)
	}
}

func TestSendBounded_GivesUpOnAPeerThatStoppedReading(t *testing.T) {
	previous := writeTimeout
	writeTimeout = 50 * time.Millisecond
	t.Cleanup(func() { writeTimeout = previous })

	local, peer := net.Pipe()
	t.Cleanup(func() { _ = local.Close(); _ = peer.Close() })
	go acceptHandshake(t, peer)
	config, err := websocket.NewConfig("ws://cleanpoker.test/rooms/x/ws", "http://cleanpoker.test")
	if err != nil {
		t.Fatal(err)
	}
	conn, err := websocket.NewClient(config, local)
	if err != nil {
		t.Fatalf("handshake: %v", err)
	}

	done := make(chan error, 1)
	go func() { done <- sendBounded(conn, map[string]string{"type": "state"}) }()
	select {
	case err := <-done:
		if err == nil {
			t.Fatal("a write nobody reads reported success")
		}
	case <-time.After(2 * time.Second):
		t.Fatal("a write to a peer that stopped reading is still blocked")
	}
}
