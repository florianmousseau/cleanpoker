<div align="center">

![CleanPoker](frontend/static/og-image.png)

# CleanPoker ♠️

**Free planning poker for agile teams. No account, no tracking, no bullshit.**

**[→ Try it at cleanpoker.dev](https://cleanpoker.dev)**

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Accessibility](https://img.shields.io/badge/Lighthouse%20accessibility-100-brightgreen)](https://cleanpoker.dev)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://cleanpoker.dev/accessibilite)
[![Trackers](https://img.shields.io/badge/trackers-0-brightgreen)](https://cleanpoker.dev)
[![Green hosting](https://img.shields.io/badge/hosting-green%20energy-brightgreen)](https://www.thegreenwebfoundation.org/)
[![Languages](https://img.shields.io/badge/languages-FR%20%7C%20EN%20%7C%20ES%20%7C%20DE%20%7C%20PT-blue)](https://cleanpoker.dev)

</div>

---

## Why CleanPoker?

Most planning poker tools show ads, track users, and weigh megabytes. CleanPoker does the opposite.

| What others do | CleanPoker |
|---|---|
| Ads / freemium upsells | Zero ads, zero monetization |
| Google Analytics, cookies | Zero trackers, zero cookies |
| Require account creation | No account, just a link |
| Heavy JS bundles | < 50 KB page weight |
| Accessibility as an afterthought | Lighthouse accessibility **100** |

## Features

- **Instant room**: create a session, share the URL, done
- **Custom card decks**: Fibonacci, T-shirt, 2n, or any values you want
- **Real-time votes**: WebSocket, no polling
- **Reveal & new round**: smooth flow for sprint planning
- **Observers**: product owners and stakeholders can watch without voting
- **Kick / role switch**: host controls for unruly participants
- **Full keyboard nav**: tab through everything
- **Screen reader support**: NVDA, VoiceOver, `aria-live` for real-time updates
- **5 languages**: FR, EN, ES, DE, PT with browser auto-detection
- **Rooms auto-deleted**: after 24h inactivity, nothing stored

## Goals

| Metric | Target |
|---|---|
| CO2 / visit | < 0.1g |
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Page weight | < 50 KB |
| Third-party cookies | 0 |
| Trackers | 0 |

## Stack

| Layer | Tech | Why |
|---|---|---|
| Backend | Go + `golang.org/x/net/websocket` | ~15 MB RAM, native binary, no runtime |
| Frontend | SvelteKit 5 (runes) | SSR, zero virtual DOM, minimal bundle |
| Frontend hosting | Cloudflare Pages | Global CDN, renewable energy |
| Backend hosting | Fly.io `cdg` Paris | Renewable energy, EU data residency |
| Database | None | Ephemeral rooms in memory |

## Green IT

- **Go binary**: Docker image `FROM scratch`, ~10 MB image
- **Zero JS frameworks at runtime**: SvelteKit compiles to vanilla JS
- **Zero tracking**: no Google Analytics, no third-party scripts
- **System fonts**: no Google Fonts download
- **Vanilla CSS**: no CSS framework (Tailwind, Bootstrap, etc.)
- **No database**: no persistent storage, no ORM overhead
- **Green hosting**: Cloudflare Pages + Fly.io both run on renewable energy

## Accessibility (WCAG 2.1 AA)

- Native HTML semantics (`<button>`, `<main>`, `<section>`, `<table>`)
- Skip link at the top of the page
- `aria-live="polite"` for real-time vote updates
- `aria-label` on all interactive elements
- Contrast ratio >= 4.5:1 throughout
- `prefers-reduced-motion` respected
- `rem` units (browser zoom works correctly)
- No `user-scalable=no`

## Run locally

```bash
# Backend
cd backend
go mod tidy
go run ./cmd/server

# Frontend (separate terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Deploy

CI/CD via GitHub Actions, auto-deploys on push to `main`.

```
Frontend -> Cloudflare Pages
Backend  -> Fly.io (Paris, cdg region)
```

Required GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `FLY_API_TOKEN`

## License

MIT, see [LICENSE](LICENSE).

---

<div align="center">

Made by [Florian Mousseau](https://github.com/florianmousseau) · [cleanpoker.dev](https://cleanpoker.dev)

</div>
