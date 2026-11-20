# CleanPoker

Planning poker for agile teams, in the browser. Create a room, share its link, vote, reveal. No account, no install.

Live at **[cleanpoker.dev](https://cleanpoker.dev)**, in English, French, Spanish, German and Portuguese.

[![Deploy](https://github.com/florianmousseau/cleanpoker/actions/workflows/deploy.yml/badge.svg?branch=develop)](https://github.com/florianmousseau/cleanpoker/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/florianmousseau/cleanpoker/actions/workflows/codeql.yml/badge.svg)](https://github.com/florianmousseau/cleanpoker/actions/workflows/codeql.yml)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=florianmousseau_cleanpoker&metric=alert_status)](https://sonarcloud.io/project/overview?id=florianmousseau_cleanpoker)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Trackers](https://img.shields.io/badge/trackers-0-brightgreen)](https://cleanpoker.dev/green)

![A room after the reveal: four participants, their votes, the average, min, max and distribution](docs/screenshot.png)

## What it does

- **Rooms by link**: the home page creates a room, and anyone with the URL can join by typing a name.
- **Card decks**: Fibonacci, T-shirt and powers of two presets, or any comma-separated list.
- **Real-time votes** over a WebSocket. Votes stay hidden until someone reveals them. The results then show the average, median, min, max and distribution.
- **Observers** can follow a room without voting. Anyone in the room can switch a participant to observer or remove them. Removing someone asks for confirmation first.
- **Host and lock**: the first person in a room is its host and can lock it, so that only they reveal, start a new round or remove people. Off by default.
- **Voting timer**: 30 s, 1, 2 or 5 minutes, shown to everyone.
- **AI participants**: an assistant joins a room over MCP and votes like anyone, marked as an AI. See below.
- **Reconnection**: a dropped connection retries with exponential backoff. A reload within 30 seconds takes the same seat back, vote included.
- **Ephemeral**: rooms live in the server's memory and are deleted after 24 hours without activity. There is no database.
- **Accessibility**: semantic HTML, full keyboard use, and live regions that announce votes and results. The site respects `prefers-reduced-motion`. It targets WCAG 2.1 AA; the [accessibility statement](https://cleanpoker.dev/accessibilite) currently reads "partially conformant".

## Let an AI assistant vote

The room server speaks the [Model Context Protocol](https://modelcontextprotocol.io). Add this address as a remote MCP server (a custom connector in Claude, an MCP server in ChatGPT, Cursor or VS Code):

```
https://salles.cleanpoker.dev/mcp
```

Then ask the assistant to join the room the team shares and estimate the story. Its tools:

| Tool | What it does |
| --- | --- |
| `join_room` | Takes a seat marked as an AI and returns a seat token. An AI never holds the host role. |
| `get_room` | Reads the deck, the round, who voted, and the results once a person reveals them. |
| `vote` | Votes one card of the deck, hidden until the reveal. |
| `leave_room` | Gives the seat up. |

An assistant cannot reveal, start a round or remove anyone, and it sees nobody's vote before the reveal. Nothing changes in a room nobody connects an assistant to. No account and no key: the endpoint is public, like the rooms. CleanPoker sends nothing to any AI; the assistant reads the room because its user connected it.

## Privacy

No analytics script, no advertising cookie, no visitor identifier, nothing loaded from a third party. Like any website, the host that serves the pages counts the requests it answers. The site also counts its own readers, server-side: a daily fingerprint derived from the IP address, which is never kept. Both counts are server-side and never touch the reader's device. `npm run mesure` checks that the pages keep saying both halves of this.

## Run it locally

Requires Go (the version in [`backend/go.mod`](backend/go.mod)) and Node 22.

```bash
./dev.sh
```

Then open http://localhost:5173. The script creates `frontend/.env` from `.env.example` and installs the frontend dependencies on the first run. It then starts the backend on `:8080` and the Vite dev server on `:5173`. Ctrl+C stops both.

On Windows without a POSIX shell, run the two halves in separate terminals:

```bash
cd backend && go run ./cmd/server
cd frontend && npm ci && cp .env.example .env && npm run dev
```

## Architecture

| Part | Runs on | Talks to the browser over |
|---|---|---|
| SvelteKit 5 frontend: pages, SSR, security headers | Cloudflare Pages | HTTP |
| Go backend: rooms in memory, one goroutine per room | OVHcloud VPS, Gravelines (France), built from `main` by the server itself | WebSocket, plus `POST /rooms` |

- **`backend/`** is Go with the standard library HTTP server and `golang.org/x/net/websocket`. `internal/store` holds the rooms in a map. `internal/room` owns each room's state behind one event loop, which broadcasts a snapshot on every change and masks the votes until they are revealed. `internal/handler` exposes `POST /rooms`, `GET /rooms/{id}/ws`, `/health` and `/stats`.
- **`frontend/`** is SvelteKit 5 with runes, TypeScript and plain CSS, deployed with `adapter-cloudflare`. `src/lib/useRoom.svelte.ts` holds the WebSocket client and `src/routes/[id]` the room page. The translations for the five languages live in `src/lib/i18n.ts`.
- Security headers are set in two places that must stay in sync. `frontend/src/hooks.server.ts` covers pages rendered by the worker and `frontend/_headers` covers static files.

## Checks

Every pull request runs the same steps as the `Code Quality` and `Bundle Size` jobs of [`deploy.yml`](.github/workflows/deploy.yml):

| Command | What it checks |
|---|---|
| `golangci-lint run` (in `backend/`) | errcheck, govet, staticcheck, ineffassign, unused, bodyclose |
| `go test ./...` | backend unit and WebSocket tests |
| `npm run lint` | ESLint on TypeScript and Svelte |
| `npm run check` | svelte-check types |
| `npm test` | Vitest, including French typography rules |
| `npm run check:seo` | titles, descriptions and alternates of every page |
| `npm run check:reflow` | CSS that could push a page past a 320 px screen |
| `npm run mesure` | no measurement script, and the privacy wording above in five languages |
| `npm run build && npm run size` | shared JS stays under 50 kB brotli |

CodeQL scans Go and TypeScript, and SonarCloud analyses the code on each run. After each production deploy, Lighthouse CI audits the live site.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
