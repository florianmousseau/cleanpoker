# CleanPoker - règles pour les agents

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
- Bundle JS < 50 Ko (brotli), mesuré par `npm run size` sur le JS partagé
- Lighthouse Performance et Accessibilité : 100/100
- WCAG 2.1 AA
- Hébergement sur énergie renouvelable

## Invariants à ne pas casser

- **En-têtes de sécurité** : ils sont posés dans `frontend/src/hooks.server.ts`.
  Cloudflare Pages n'applique `frontend/_headers` qu'aux fichiers statiques,
  jamais aux réponses du worker SvelteKit, donc les pages HTML n'en reçoivent
  aucun si on les retire des hooks. Les deux fichiers doivent rester
  synchronisés. Depuis `adapter-cloudflare` 7, ce fichier vit à la racine du
  projet et non plus dans `static/` : le build échoue s'il y retourne.
- **Version de Go** : `backend/go.mod` fait foi. La CI la lit avec
  `go-version-file` et le `Dockerfile` doit être épinglé sur la même version
  patch. Ne pas revenir à un tag flottant : la CI testerait autre chose que ce
  qui part en production.
- **Route `/[id]`** : elle capte toute URL inconnue à la racine, ce qui est
  voulu (les salons vivent là). Elle est en `noindex`, ne pas l'enlever sous
  peine d'exposer une infinité d'URLs indexables.
