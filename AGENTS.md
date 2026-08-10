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

- Aucun suivi comportemental, aucun cookie publicitaire, un compteur de pages vues sans cookie
- Bundle JS < 50 Ko (brotli), mesuré par `npm run size` sur le JS partagé
- Lighthouse Performance et Accessibilité : 100/100
- WCAG 2.1 AA
- Hébergement sur énergie renouvelable

## La mesure d'audience, et ce qu'elle a coûté

Depuis le 2026-08-11, sur décision de Florian pour tout le portefeuille, le site
compte ses pages vues avec Cloudflare Web Analytics : un compteur dédié, aucun
cookie, aucun identifiant de visiteur, aucune IP conservée, donc aucune bannière
de consentement à ajouter.

Ce produit vendait « zéro trackers » plus fort que les autres : un badge public
`trackers-0` dans le README, une ligne `Trackers / analytics : 0` dans le
tableau d'éco-conception des cinq langues, et une page qui reproche aux autres
outils de charger un fournisseur d'analytics. Rien n'a été adouci : les phrases
devenues fausses ont été retirées, et remplacées par des phrases plus étroites
et vraies (« aucun suivi comportemental », « un seul script tiers »).

**Ne réécris jamais « zéro trackers », « no third-party scripts », « sin
rastreadores », « sem rastreadores » ni « keine Tracker »**, dans aucune des
cinq langues, nulle part : page, meta, JSON-LD, mots-clés, `llms.txt`, README ou
commentaire. `npm run mesure` balaie TOUS les fichiers livrés et refuse ces
tournures tant que la balise est servie. Il ne lit pas une liste de fichiers
mais l'arbre entier, précisément pour attraper la page que quelqu'un écrira le
mois prochain avec le vieux vocabulaire.

Ce qui reste vrai et se vend toujours : aucun cookie publicitaire, aucun compte,
pas de tracking comportemental, moins de 50 Ko de JS, et le contenu des sessions
qui vit en mémoire et ne quitte pas Paris.

## Invariants à ne pas casser

- **La balise du compteur est dans DEUX politiques** : `frontend/_headers` pour
  les fichiers statiques et `frontend/src/hooks.server.ts` pour les pages du
  worker. Une balise autorisée dans l'une et pas l'autre donne une page qui ne
  compte rien en silence. `npm run mesure` tient les deux égales.
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
