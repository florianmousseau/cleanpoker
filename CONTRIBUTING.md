# Contributing

Bug reports, fixes and translation corrections are welcome. For a larger change, open an issue first so the approach can be agreed before you write the code.

## Setup

```bash
./dev.sh
```

See [Run it locally](README.md#run-it-locally) for the requirements and the Windows variant.

## Branches

- Branch from `develop` and open your pull request against `develop`.
- `main` is production. It only receives release branches (`release/vX.Y.Z`), cut from `develop` by the [`promote`](.github/workflows/promote.yml) workflow. A push to `main` deploys the site.
- Commit messages and pull request titles follow [Conventional Commits](https://www.conventionalcommits.org/), in English: `fix(room): ...`, `feat(home): ...`, `docs: ...`. The changelog is built from them at release time.

## Before opening a pull request

Run the checks the CI runs. They are listed in the [README](README.md#checks). The short version:

```bash
cd backend && go vet ./... && go test ./...
cd frontend && npm run lint && npm run check && npm test \
  && npm run check:seo && npm run check:reflow && npm run mesure \
  && npm run build && npm run size
```

A change in behaviour comes with a test that fails without it. When a check turns red, fix the cause rather than loosening the check.

## Rules the checks enforce

These come from real regressions. [AGENTS.md](AGENTS.md) has the full reasoning, in French.

- **No third-party scripts, trackers or advertising cookies.** The shared JS budget is 50 kB brotli.
- **Security headers live in two files**, `frontend/_headers` and `frontend/src/hooks.server.ts`, and must stay identical.
- **Nothing may push a page past a 320 px screen**, including with the browser text size doubled. `npm run check:reflow` lists the CSS patterns it refuses. Wrap every `<table>` in a `<div class="table-wrap">`.
- **French text uses a no-break space** before `:` `;` `?` `!` `%` and `»`. Write it `&nbsp;` in Svelte markup and ` ` in a JavaScript string, never as a literal character. `npm test` checks it.
- **User-facing text ships in five languages** (EN, FR, ES, DE, PT). A new string goes into every dictionary of `frontend/src/lib/i18n.ts`.
- **The `/[id]` room route stays `noindex`.**

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
