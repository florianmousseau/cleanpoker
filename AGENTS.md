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

## Un deux-points ne commence jamais une ligne francaise

En francais, une ponctuation double se soude au mot qui la precede par une espace
insecable. Avec une espace ordinaire, le retour a la ligne l'envoie seule en tete
de la ligne suivante, et c'est ce qu'on lit sur un telephone. Meme geste pour
`?`, `!`, `;` et les deux chevrons - l'ouvrant reste sinon seul en fin de ligne.

`frontend/src/typographie.test.ts` le refuse et tourne dans `npm test`, donc dans
la CI. Il prouve d'abord son propre detecteur : en JavaScript `\s` matche
l'insecable, donc un controle ecrit avec `\s` passerait au vert en ne mesurant
rien.

**Le perimetre est le francais et lui seul.** Le site sert cinq langues, et dans
les quatre autres l'espace devant un deux-points n'existe pas. Sont lus
`src/routes/fr`, le bloc `FR` de `src/lib/i18n.ts` et `src/routes/+error.svelte`,
seul ecran francais qu'aucun dictionnaire ne traduit.

**L'insecable ne s'ecrit jamais en clair dans une source** : posee litteralement,
elle est indiscernable d'une espace ordinaire a la relecture. La forme depend de
l'endroit, et chaque ligne du tableau a ete mesuree sur le build :

| Endroit                             | Forme                            |
| ----------------------------------- | -------------------------------- |
| texte d'un `.svelte`                | `Texte&nbsp;: suite`             |
| PROP d'un composant                 | `h1Main="Texte&nbsp;:"`          |
| chaine JavaScript ou TypeScript     | `'Texte\u00A0: suite'`      |
| JSON-LD d'un `{@html}`              | rien, espace ordinaire           |

La deuxieme ligne est celle qui surprend : **Svelte decode l'entite dans la prop
d'un composant**, contrairement a Astro qui sert `&amp;nbsp;` en clair. Mesure
sur `.svelte-kit/output/server` le 2026-08-20, pas deduite.

La quatrieme est un refus motive. Chaque page francaise construit son graphe dans
un `{@html `...`}` du `<svelte:head>` : une chaine JavaScript passee a
`JSON.stringify`, puis injectee dans un `<script type="application/ld+json">`.
Un navigateur ne decode aucune entite a l'interieur d'un `script`, donc `&nbsp;`
y serait servi en clair au robot qui lit le graphe. Et souder ces chaines ne
repare rien : le JSON-LD est une donnee servie a une machine, pas du texte qui se
coupe a la largeur d'un ecran. La copie visible des memes phrases, elle, est
soudee, et c'est celle que la regle vise.

## Rien ne pousse une page au-dela d'un ecran de 320 px

Mesure du 2026-08-23, en production, sur 16 pages servies x 3 regimes - 360 px,
320 px, et 320 px avec la taille de texte du navigateur doublee. Onze pages sur
seize debordaient dans le dernier regime, jusqu'a 432 px, et `body` portait
`overflow-x: hidden`, qui CLIPPE le debordement au lieu de le reparer : le texte
est coupe au bord droit sans qu'aucun defilement ne permette d'y aller.

`frontend/scripts/check-reflow.mjs` tient les sept causes, lit `app.css` **et**
les 48 blocs `<style>` des composants, et prouve chacune de ses regles sur un
echantillon avant de s'autoriser a passer. Il pose aussi un plancher - moins de
40 feuilles ou moins de 650 regles le rendent ROUGE au lieu de le rendre muet.

Il est cable **aux deux endroits** : `npm run check:reflow` et une etape du job
`Code Quality` de `deploy.yml`. Ce depot n'a pas de script `gate` unique, sa CI
rejoue les commandes une par une ; branche a un seul endroit, le controle ne
tournerait jamais.

Ce qu'il refuse, et ce qui l'a mis la :

- une piste `1fr` nue, qui vaut `minmax(auto, 1fr)` - cet `auto` est la
  min-content de la cellule ;
- une grille sans `grid-template-columns`, qui recoit la meme piste implicite ;
- un minimum de `minmax()` ecrit en longueur (`minmax(18rem, 1fr)`) ;
- un padding horizontal en `rem`, qui DOUBLE quand le lecteur agrandit le texte.
  Il y en avait 87 ; les plafonner en `min(Xrem, Ypx)` ne change rien a taille
  normale, ou 1rem vaut deja 16px ;
- `white-space: nowrap` hors d'un `@media (min-width: <px>)`, d'un texte
  visuellement cache, ou d'une boite qui defile horizontalement ;
- une rangee flex `space-between` qui ne dit pas si elle peut se replier ;
- le plancher d'un `clamp()` en `rem` sur ce qui mange de la largeur.

**Un tableau est la seule boite que `overflow-wrap: break-word` ne peut pas
aider** : sa largeur minimale est la SOMME des min-content de ses colonnes, et
`break-word` ne descend jamais une min-content - c'est meme ce qui le rend sans
danger sur un ecran large. `th, td { overflow-wrap: anywhere }` a ete essaye
d'abord, sur les pages en ligne : il ramene les six pages fautives a zero et
CASSE une soudure au passage, Chrome coupant la ligne sur l'insecable de
« XXL, ? ». **Reparer un debordement en cassant une soudure ne compte pas.**
Chaque `<table>` vit donc dans un `<div class="table-wrap">` qui defile, et le
controle verifie les deux moities : que la classe existe dans `app.css`, et
qu'aucun `<table>` n'est en dehors.

**Ce que la gate ne peut pas voir, et il faut le savoir en la lisant** : le
plancher d'un `clamp()` sur un TITRE. Qu'un titre tienne dans sa colonne depend
des MOTS qu'il contient, pas du CSS. Ici les titres sont revenus a zero une fois
`overflow-wrap: break-word` pose sur le corps, mais c'est un constat sur ce
texte-la, pas une garantie. Seul un balayage au navigateur le verrait revenir.

Le releve se refait en une commande depuis le cockpit :

```
node cockpit/pistes/mesures/mesurer-ecran-etroit.mjs <fichier-d-urls> > releve.json
```

## Le pourcent est une ponctuation double

`frontend/src/typographie.test.ts` refuse desormais l'espace ordinaire devant
`%` comme devant `:` `;` `?` `!` `»`. Trois `100 %` et un `200 %` vivaient sous
une garde verte, parce qu'elle ne connaissait que la ponctuation. Le signe se
detache exactement pareil et suit toujours un chiffre.

L'anglais colle son pourcent (`72.45%`) : cette forme n'a pas d'espace du tout et
ne peut donc pas rougir, ce que le detecteur prouve.

Il refuse aussi **un signe qui OUVRE une ligne de source** : le retour a la ligne
d'une source HTML est rendu comme une espace ordinaire, donc un signe pose seul
en tete de ligne s'affiche colle a l'espace de la ligne d'avant.
