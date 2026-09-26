#!/usr/bin/env sh
# Runs the backend and the frontend together for local development.
# Needs Go (the version in backend/go.mod) and Node 22. Ctrl+C stops both.
set -eu
cd "$(dirname "$0")"

[ -f frontend/.env ] || cp frontend/.env.example frontend/.env
[ -d frontend/node_modules ] || npm --prefix frontend ci

bin="$(mktemp -d)/cleanpoker-server"
(cd backend && go build -o "$bin" ./cmd/server)
"$bin" &
backend=$!
trap 'kill "$backend" 2>/dev/null' EXIT INT TERM

npm --prefix frontend run dev
