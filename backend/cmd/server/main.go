package main

import (
	"github.com/florianmousseau/cleanpoker/internal/assistant"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/handler"
	"github.com/florianmousseau/cleanpoker/internal/health"
	"github.com/florianmousseau/cleanpoker/internal/store"
)

// commit is the build being served, set by the Dockerfile from the
// COMMIT build argument that the deploy workflow passes.
var commit = "inconnu"

// siteOrigin is where the browser runs: the walk creates its room from there,
// so a CORS list that forgot the site is a red, not a quiet 200.
func siteOrigin() string {
	if o := os.Getenv("SITE_ORIGIN"); o != "" {
		return o
	}
	return "https://pokeragile.com"
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	rawOrigins := os.Getenv("ALLOWED_ORIGIN")
	if rawOrigins == "" {
		rawOrigins = "http://localhost:5173"
	}
	allowedOrigins := strings.Split(rawOrigins, ",")

	roomStore := store.New()
	go roomStore.RunCleanup(24 * time.Hour)

	checker := &health.Checker{
		Walk:   health.RoomWalk("http://127.0.0.1:"+port, siteOrigin(), http.DefaultClient, roomStore.Remove),
		Head:   health.FeedHead(health.MainFeed, http.DefaultClient),
		Commit: commit,
		Since:  roomStore.Usage().Since,
		Now:    time.Now,
	}
	mux := http.NewServeMux()
	mux.Handle("/", handler.New(roomStore, allowedOrigins, checker.Report))
	mux.Handle("/mcp", assistant.Handler(roomStore, commit))

	log.Printf("PokerAgile backend listening on :%s", port)
	if err := handler.NewServer(":"+port, mux).ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
