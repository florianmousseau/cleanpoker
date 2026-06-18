package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/florianmousseau/cleanpoker/internal/handler"
	"github.com/florianmousseau/cleanpoker/internal/store"
)

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

	mux := handler.New(roomStore, allowedOrigins)

	log.Printf("CleanPoker backend listening on :%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal(err)
	}
}
