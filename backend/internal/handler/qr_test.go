package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestQRRows_EncodesARoomOfTheSite(t *testing.T) {
	allowed := map[string]bool{"https://cleanpoker.dev": true}
	rows, ok := qrRows(allowed, "https://cleanpoker.dev/ab12cd34")
	if !ok || len(rows) < 21 || len(rows[0]) != len(rows) {
		t.Fatalf("expected a square QR of at least 21 modules, got %d rows", len(rows))
	}
}

func TestQRRows_RefusesAnyOtherAddress(t *testing.T) {
	allowed := map[string]bool{"https://cleanpoker.dev": true}
	for _, u := range []string{"", "https://evil.example/ab12cd34", "https://cleanpoker.dev", "https://cleanpoker.dev/a/b", "https://cleanpoker.dev/x?y=1", "javascript:alert(1)"} {
		if _, ok := qrRows(allowed, u); ok {
			t.Errorf("%q was encoded", u)
		}
	}
}

func TestQRHandler(t *testing.T) {
	h := qrHandler(map[string]bool{"https://cleanpoker.dev": true})
	rec := httptest.NewRecorder()
	h(rec, httptest.NewRequest(http.MethodGet, "/qr?url=https://cleanpoker.dev/ab12cd34", nil))
	var body struct{ Rows []string }
	if rec.Code != http.StatusOK || json.NewDecoder(rec.Body).Decode(&body) != nil || len(body.Rows) == 0 {
		t.Fatalf("status %d", rec.Code)
	}
	rec = httptest.NewRecorder()
	h(rec, httptest.NewRequest(http.MethodGet, "/qr?url=https://evil.example/x", nil))
	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestLinkDeck(t *testing.T) {
	if got := linkDeck("XS, S ,M"); len(got) != 3 || got[1] != "S" {
		t.Fatalf("unexpected deck %v", got)
	}
	for _, raw := range []string{"", "5", "1,1", "1,,2"} {
		if linkDeck(raw) != nil {
			t.Errorf("%q gave a deck", raw)
		}
	}
}
