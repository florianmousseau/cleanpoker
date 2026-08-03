# Référencement de CleanPoker

Objectif suivi : être trouvé par les équipes agiles francophones qui cherchent
un outil de **poker planning**, et par les équipes anglophones qui cherchent
**planning poker** sans inscription.

## Mesure de départ, relevée le 3 août 2026

Source : Google Search Console, propriété `sc-domain:cleanpoker.dev`.

| Indicateur | Valeur |
| --- | --- |
| Période couverte | 16 juin au 1er août 2026 |
| Impressions, toutes requêtes | 35 |
| Clics | 10 |
| Position moyenne | 12,6 |
| Pages indexées | 20 sur 45 soumises |
| Dernière lecture du sitemap par Google | 21 juin 2026 |
| Requêtes avec au moins une impression | 4 |
| Impressions sur « poker planning » ou « planning poker » | 0 |

Les quatre requêtes : `estimating team velocity agile` (3 impressions),
`agile story points` (1), `estimation agile` (1), `planning poke` (1).

C'est le point de comparaison. Tout jugement sur l'effet des corrections
ci-dessous se fait contre ces chiffres, pas contre une impression.

## Ce qui bloquait, et qui est corrigé

Quatre défauts mesurés dans le code, qui expliquent une partie de l'écart entre
45 pages soumises et 20 indexées.

1. **Une balise `title` en double sur chaque page.** `app.html` en posait une,
   `CleanPoker`, avant le bloc `%sveltekit.head%`. La première gagne : les
   moteurs voyaient donc `CleanPoker` comme titre de toutes les pages, ce que
   l'index de Bing confirmait encore début août. La balise de `app.html` est
   retirée ; chaque route pose déjà la sienne.
2. **Quatre pages françaises se déclaraient canoniques vers leur version
   anglaise** (`/fr/planning-poker`, `/fr/accessibilite`, `/fr/green`,
   `/fr/mentions-legales`). Elles demandaient donc explicitement à ne pas être
   indexées, dont le guide, la page la plus importante en français.
3. **L'arbre `/en/*` couvrait mal ses redirections.** Six routes existaient
   uniquement pour renvoyer en 301 vers la racine, chacune sous la forme d'un
   `+page.server.ts` posé à côté d'un `+page.svelte` que rien n'atteignait.
   Trois chemins manquaient à l'appel : `/en/alternatives`, `/en/fibonacci` et
   `/en/estimation-agile` tombaient sur `/[id]`, qui prend un segment inconnu
   pour un identifiant de salon. Une règle unique dans `hooks.server.ts`
   remplace les douze fichiers et couvre tout le préfixe. Les redirections
   existantes sont conservées à l'identique, cible par cible.
4. **Aucune page ne portait « poker planning »**, l'ordre des mots employé en
   France, alors que l'autocomplétion de Google le confirme comme la forme
   tapée (`poker planning en ligne`, `gratuit`, `jira`, `scrum`, `agile`).
5. **Les cinq pages de mentions légales étaient en `noindex` et dans le
   sitemap.** On demandait donc leur exploration puis leur non-indexation, ce
   qui correspond aux « 4 pages non indexées » signalées par Search Console.
   Elles sortent du sitemap et gardent leur `noindex`. Le choix inverse se
   défend aussi : une politique de confidentialité indexable est ce qu'un DPO
   cherche, et elle sert la position de l'outil. Le trancher demande une
   décision éditoriale, pas une correction.

Aucun de ces quatre défauts n'est rattrapable à la relecture : ils vivent dans
des balises que personne ne regarde et qu'aucun compilateur ne vérifie. D'où le
contrôle décrit en fin de document, qui les refuse désormais en intégration
continue.

## Ce qui reste à Florian

Rien de tout cela ne peut partir d'une session agent : ce sont des comptes à son
nom, et publier sous son identité lui appartient.

### 1. Redemander l'exploration dans Search Console

Le sitemap n'a pas été relu depuis le 21 juin. Après la mise en production :

- Search Console, section **Sitemaps**, renvoyer `https://cleanpoker.dev/sitemap.xml`.
- Section **Inspection de l'URL**, demander l'indexation de `https://cleanpoker.dev/fr/planning-poker`
  et de `https://cleanpoker.dev/fr/comparatif-outils`. Deux URL suffisent à
  déclencher un passage, il est inutile de les soumettre toutes.

### 2. Les annuaires, par ordre de rendement

Textes prêts à coller, à ajuster s'il préfère sa propre voix.

**AlternativeTo** (`alternativeto.net`) — s'inscrire, puis proposer CleanPoker
comme alternative à Planning Poker Online, PlanITpoker et Kollabe. Champ
description, 300 caractères environ :

> Free and open source planning poker for agile teams. Create a session, share
> the URL, estimate together. No account, no ads, no third-party script, no paid
> tier. Sessions live in memory and are deleted after 24 hours. WCAG 2.1 AA
> accessible, under 50 KB of JavaScript, MIT licence.

**European Alternatives** (`european-alternatives.eu`) — formulaire de
proposition. L'argument décisif y est l'hébergement, à mettre en avant :

> CleanPoker is a free planning poker tool for agile teams, hosted in Paris,
> France. No account, no advertising cookie, no analytics and no third-party
> script: nothing leaves the European Union. Sessions are held in memory and
> deleted 24 hours after the last activity. Interface in French, English,
> Spanish, German and Portuguese. Open source, MIT licence.

**Listes GitHub `awesome-*`** — ouvrir une pull request sur `awesome-scrum`,
`awesome-agile` et `awesome-selfhosted`. Une ligne, au format de la liste :

> - [CleanPoker](https://cleanpoker.dev) - Planning poker with no account, no
>   tracker and no paid tier. Sessions are ephemeral, WCAG 2.1 AA, MIT licence.
>   ([Source Code](https://github.com/florianmousseau/cleanpoker)) `MIT` `Go/JS`

**Sujets du dépôt GitHub** — les dépôts remontent bien dans les résultats, et
les sujets pilotent la découverte interne à GitHub. Une commande :

```bash
gh repo edit florianmousseau/cleanpoker --add-topic planning-poker --add-topic poker-planning --add-topic scrum --add-topic agile --add-topic estimation --add-topic story-points --add-topic sveltekit --add-topic privacy-friendly --add-topic accessibility --add-topic wcag
```

### 3. Là où le public se plaint déjà

C'est le canal au meilleur rendement et le plus lent : il demande de contribuer
avant de se présenter, et d'annoncer franchement qu'on est l'auteur. Les fils à
suivre sont ceux où quelqu'un cherche un outil sans inscription, ou se plaint
d'un mur de paiement arrivé après la saisie. Ne jamais poster le lien seul.

## Ce qui n'a pas été fait, et pourquoi

- **Les pages RGPD et comparatif n'existent qu'en français et en anglais.** Les
  versions espagnole, allemande et portugaise demandent une traduction de fond,
  pas une recopie. Le `hreflang` de ces quatre pages ne déclare donc que `fr` et
  `en`, ce qui est valide.
- **Le guide n'a été densifié qu'en français et en anglais**, pour la même
  raison. Les trois autres langues restent à leur version courte, complète et
  cohérente en elle-même.
- **Aucun lien externe n'a été acquis.** C'est le seul levier qui déplace une
  requête de tête, et il ne s'automatise pas.

## Ce qu'il est raisonnable d'attendre

Le domaine a six semaines et aucun lien entrant. La longue traîne
(`poker planning sans inscription`, `poker planning RGPD`,
`planning poker no signup`) est atteignable en quelques semaines une fois les
pages explorées. La requête `poker planning` seule est occupée par des sites
installés depuis des années : la viser comme objectif à court terme mène à un
constat d'échec sur un travail qui a pourtant produit ses effets ailleurs.

Le prochain relevé se fait dans Search Console, contre le tableau du haut.

## Le contrôle qui empêche la rechute

`frontend/scripts/check-seo.mjs`, lancé par `npm run check:seo` et par le job
Code Quality, refuse trois régressions :

- une balise `title` réintroduite dans `app.html` ;
- une route qui n'en pose aucune ;
- un `rel="canonical"` qui ne désigne pas le chemin de la page.

Les trois sont exactement ce qui a coûté l'indexation. Une règle que rien ne
mesure n'est qu'un souhait, et celle-ci était écrite nulle part.

`sonar-project.properties` neutralise `Web:PageWithoutTitleCheck` sur le seul
`app.html` : un analyseur HTML statique ne voit pas l'injection au moment du
rendu, et remettre la balise reproduirait le défaut. Le contrôle ci-dessus prend
le relais.
