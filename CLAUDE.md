# CleanPoker — règles pour Claude Code

## Auteur des commits

- Le seul auteur de commit est **Florian MOUSSEAU** (`florian.mousseau@gmail.com`)
- Ne jamais ajouter de ligne `Co-Authored-By: Claude` dans les messages de commit
- Ne jamais ajouter de ligne `Claude-Session:` dans les messages de commit
- Ne jamais modifier `user.name` ou `user.email` au-delà de cette correction initiale

## Caractères à ne jamais utiliser

- Ne jamais utiliser le caractère `·` (point médian, U+00B7) dans du contenu écrit (titres, descriptions, textes)
- Ne jamais utiliser `—` (tiret cadratin) comme séparateur dans les titres de pages ou balises meta
- Pour séparer des éléments dans un titre ou une description : utiliser la virgule `,` ou le tiret simple `-`

## Stack

- Frontend : SvelteKit 5 (runes), TypeScript, CSS vanilla
- Backend : Go + WebSocket natif
- Hébergement : Cloudflare Pages (frontend) + Fly.io CDG Paris (backend)
- Branche de prod : `main` (jamais de commit direct, toujours via PR depuis `develop`)

## Philosophie du projet

- Zéro trackers, zéro cookies publicitaires, zéro scripts tiers
- Bundle JS < 50 Ko (brotli)
- Lighthouse Performance et Accessibilité : 100/100
- WCAG 2.1 AA
- Hébergement sur énergie renouvelable
