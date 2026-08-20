<svelte:head>
  <title>Poker planning&nbsp;: règles, Fibonacci et guide pratique | CleanPoker</title>
  <meta name="description" content="Qu'est-ce que le poker planning&nbsp;? Règles en 5 étapes, suite de Fibonacci, durée d'une session, à distance et en asynchrone, erreurs qui faussent les estimations. Guide complet et gratuit." />
  <link rel="canonical" href="https://cleanpoker.dev/fr/planning-poker" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/planning-poker" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/planning-poker" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/planning-poker" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Poker planning : règles, Fibonacci et guide pratique',
    url: 'https://cleanpoker.dev/fr/planning-poker',
    description: 'Guide complet du poker planning : définition, règles, pourquoi Fibonacci, durée d\'une session, à distance et en asynchrone, comment l\'utiliser avec CleanPoker.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le poker planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le poker planning est une technique d\'estimation agile utilisée en Scrum. Chaque membre de l\'équipe choisit secrètement une carte représentant son estimation d\'une user story, puis tous révèlent simultanément. Les divergences provoquent une discussion qui affine l\'estimation collective.' },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi utiliser la suite de Fibonacci en poker planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La suite de Fibonacci (1, 2, 3, 5, 8, 13, 21) reflète l\'incertitude croissante : plus une tâche est grande, moins on peut l\'estimer précisément. L\'écart entre les valeurs augmente, ce qui force l\'équipe à se positionner clairement sans sur-précision artificielle.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre points de story et jours ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les points de story mesurent l\'effort relatif, pas le temps : le volume de travail, l\'incertitude et la complexité pris ensemble. L\'échelle est relative, donc un 5 est nettement plus gros qu\'un 2 sans prétendre à un rapport exact. Cette abstraction permet de comparer des tâches sans se bloquer sur les durées individuelles.' },
      },
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le T-shirt sizing ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le T-shirt sizing (XS, S, M, L, XL, XXL) est une alternative à Fibonacci, utile pour des estimations grossières en début de projet ou pour des équipes non techniques. Moins précis que Fibonacci, il est plus rapide pour trier un backlog.' },
      },
      {
        '@type': 'Question',
        name: 'Comment gérer les divergences dans le poker planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quand les estimations divergent (ex. : un 2 et un 13 dans la même main), demandez aux extrêmes d\'expliquer leur vote. La discussion révèle souvent des hypothèses différentes ou des risques non identifiés. Revotez ensuite jusqu\'à convergence.' },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps dure une session de poker planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Comptez 2 à 5 minutes par user story : une minute de présentation, un tour de vote, et la discussion seulement en cas de divergence. Une séance d\'affinage d\'une heure couvre donc 12 à 20 stories. Au-delà de 90 minutes, la qualité des estimations chute et il vaut mieux couper en deux séances.' },
      },
      {
        '@type': 'Question',
        name: 'Dit-on poker planning ou planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les deux désignent la même technique. « Planning poker » est la forme d\'origine, employée par James Grenning en 2002 puis popularisée par Mike Cohn. « Poker planning » est l\'inversion passée dans l\'usage courant en France, au point d\'être la forme la plus tapée dans les moteurs de recherche par les équipes francophones. Aucune des deux n\'est fautive.' },
      },
      {
        '@type': 'Question',
        name: 'Peut-on faire du poker planning en asynchrone ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, mais on y perd l\'essentiel. Le vote asynchrone donne un chiffre, alors que la valeur de la technique tient dans la discussion déclenchée par les écarts. Un compromis courant : vote asynchrone sur les stories consensuelles, séance synchrone courte réservée aux seules stories où les estimations divergent.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/a-propos" class="back-link">← À propos</a>

    <h1>Poker planning&nbsp;: le guide complet</h1>

    <p>
      Le <strong>poker planning</strong> est la technique d'estimation la plus utilisée en
      <strong>Scrum</strong> et en agilité. En 5 minutes, voici tout ce qu'il faut savoir.
    </p>

    <h2>Qu'est-ce que le poker planning&nbsp;?</h2>
    <p>
      Le poker planning (aussi écrit <em>planning poker</em>, ou <em>Scrum poker</em>) est une
      technique d'estimation collaborative où chaque membre de l'équipe choisit
      <strong>secrètement</strong> une carte représentant sa propre estimation d'une user story
      ou d'une tâche. Tous révèlent leurs cartes <strong>simultanément</strong>. Les divergences
      déclenchent une discussion courte, puis l'équipe revote jusqu'à convergence.
    </p>
    <p>
      La technique est décrite par James Grenning en 2002, puis popularisée par Mike Cohn.
      L'ordre des deux mots n'a aucune importance&nbsp;: <em>planning poker</em> est la forme
      d'origine, <em>poker planning</em> l'inversion passée dans l'usage courant des équipes
      francophones. Elles désignent exactement la même chose.
    </p>
    <p>
      L'objectif n'est pas la précision mais la <strong>discussion</strong>&nbsp;: révéler les
      hypothèses cachées, les risques non identifiés et les points de désaccord technique.
    </p>

    <h2>Les règles en 5 étapes</h2>
    <ol>
      <li>Le Product Owner présente une user story ou une tâche.</li>
      <li>L'équipe pose des questions de clarification.</li>
      <li>Chaque membre choisit secrètement une carte (sans influencer les autres).</li>
      <li>Tous révèlent simultanément.</li>
      <li>Si les estimations convergent&nbsp;: on retient la valeur. Sinon&nbsp;: discussion des extrêmes, puis nouveau vote.</li>
    </ol>

    <h2>Combien de temps dure une session&nbsp;?</h2>
    <p>
      Comptez <strong>2 à 5 minutes par user story</strong>&nbsp;: une minute de présentation, un tour
      de vote, et de la discussion seulement quand les cartes divergent. Une séance d'affinage
      d'une heure couvre donc 12 à 20 stories, ce qui suffit largement à alimenter un sprint de
      deux semaines.
    </p>
    <p>
      Au-delà de <strong>90 minutes</strong>, la qualité des estimations chute&nbsp;: la fatigue pousse
      l'équipe à voter comme le voisin pour en finir. Mieux vaut deux séances de 45 minutes qu'une
      de deux heures. Si une seule story consomme plus de dix minutes, ce n'est plus un problème
      d'estimation mais de cadrage&nbsp;: elle retourne au backlog pour être découpée.
    </p>

    <h2>Pourquoi la suite de Fibonacci&nbsp;?</h2>
    <p>
      La suite <strong>1, 2, 3, 5, 8, 13, 21,&nbsp;?</strong> est la plus répandue car elle modélise
      l'incertitude croissante&nbsp;: plus une tâche est grande, moins on peut l'estimer finement.
      L'écart entre les valeurs grandit avec la taille, ce qui <strong>force l'équipe à se
      positionner clairement</strong> sans prétendre à une précision illusoire.
    </p>
    <p>
      La carte <strong>?</strong> signifie "je ne sais pas estimer cette tâche", signal utile
      pour détecter un manque de clarté dans la spécification.
    </p>

    <h2>Comparaison des séquences de cartes</h2>
    <table>
      <thead>
        <tr><th>Séquence</th><th>Valeurs</th><th>Idéale pour</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21,&nbsp;?</td>
          <td>Équipes Scrum expérimentées, estimation en points de story</td>
        </tr>
        <tr>
          <td><strong>T-shirt</strong></td>
          <td>XS, S, M, L, XL, XXL,&nbsp;?</td>
          <td>Estimations grossières, équipes non techniques, tri de backlog</td>
        </tr>
        <tr>
          <td><strong>Puissances de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64,&nbsp;?</td>
          <td>Tâches techniques avec doublement de complexité prévisible</td>
        </tr>
      </tbody>
    </table>

    <h2>Le poker planning à distance</h2>
    <p>
      En présentiel, le secret du vote tient au geste&nbsp;: chacun pose sa carte face cachée. À
      distance, il faut un outil qui garde les votes invisibles jusqu'à la révélation, sinon le
      premier chiffre annoncé sur le canal vocal ancre toute l'équipe. C'est le seul rôle
      indispensable d'un outil de poker planning en ligne, et il ne demande ni compte, ni
      installation, ni intégration.
    </p>
    <p>
      Trois points à vérifier avant d'en choisir un&nbsp;: les votes restent-ils masqués jusqu'au
      dévoilement, un participant qui perd sa connexion retrouve-t-il la session, et que devient
      le contenu des sessions une fois la réunion finie. Sur ce dernier point, la seule réponse
      qui n'engage à rien, c'est qu'il n'y ait rien à conserver.
    </p>

    <h2>Le poker planning en asynchrone</h2>
    <p>
      Faire voter l'équipe chacun de son côté, sur deux jours, est tentant quand les fuseaux
      horaires ne se recouvrent pas. Le résultat est un chiffre, mais on perd ce qui fait la
      valeur de la technique&nbsp;: <strong>la discussion déclenchée par les écarts</strong>. Une
      estimation sur laquelle personne n'a débattu n'a fait émerger aucun risque.
    </p>
    <p>
      Le compromis qui fonctionne&nbsp;: un tour asynchrone pour trier, puis une séance synchrone
      courte réservée aux seules stories où les cartes divergent. En pratique, c'est un tiers du
      backlog, et la réunion tombe à vingt minutes.
    </p>

    <h2>Quatre erreurs qui faussent les estimations</h2>
    <ol>
      <li>
        <strong>Le plus gradé vote en premier.</strong> Dès qu'un chiffre est prononcé à voix
        haute avant le dévoilement, les autres s'y alignent. Le vote simultané n'est pas un
        détail de mise en scène, c'est tout le dispositif.
      </li>
      <li>
        <strong>Convertir les points en jours.</strong> «&nbsp;Un point égale une demi-journée&nbsp;»
        annule le bénéfice de l'échelle relative et transforme l'estimation en engagement de
        délai. Les points servent à comparer des stories entre elles, pas à remplir un planning.
      </li>
      <li>
        <strong>Chercher le consensus à tout prix.</strong> Un désaccord persistant est une
        information&nbsp;: il signale une story mal comprise ou mal découpée. La forcer vers une
        moyenne fait disparaître le signal sans régler le problème.
      </li>
      <li>
        <strong>Estimer sans la personne qui fera le travail.</strong> Une estimation produite
        par un sous-groupe engage ceux qui n'y étaient pas. C'est la raison la plus fréquente
        d'un écart entre la vélocité prévue et la vélocité constatée.
      </li>
    </ol>

    <h2>Questions fréquentes</h2>

    <details>
      <summary>Quelle est la différence entre points de story et jours&nbsp;?</summary>
      <p>
        Les points de story mesurent l'<strong>effort relatif</strong>, pas le temps&nbsp;: le
        volume de travail, l'incertitude et la complexité pris ensemble. L'échelle est
        relative - un 5 est nettement plus gros qu'un 2, sans prétendre à un rapport exact.
        Cette abstraction permet de comparer des tâches sans se bloquer sur les durées
        individuelles, qui varient selon la personne et le contexte.
      </p>
    </details>

    <details>
      <summary>Comment gérer les divergences d'estimation&nbsp;?</summary>
      <p>
        Quand les estimations divergent (par exemple un 2 et un 13 dans la même main),
        demandez aux personnes ayant voté aux extrêmes d'expliquer leur choix.
        La discussion révèle souvent des hypothèses différentes ou des risques non identifiés.
        Revotez ensuite jusqu'à convergence, sans forcer le consensus.
      </p>
    </details>

    <details>
      <summary>Le poker planning fonctionne-t-il pour les équipes distantes&nbsp;?</summary>
      <p>
        Oui, c'est précisément pour ça que CleanPoker existe. Créez une session, partagez l'URL,
        chaque participant vote sur son propre appareil. Les résultats se révèlent en temps réel
        via WebSocket, sans aucune configuration ni compte à créer.
      </p>
    </details>

    <details>
      <summary>Combien de participants maximum&nbsp;?</summary>
      <p>
        CleanPoker ne pose aucune limite technique. En pratique, au-delà de 10 participants,
        les discussions deviennent difficiles à gérer. Pour les grandes équipes, préférez
        plusieurs sessions parallèles ou une estimation en sous-groupes.
      </p>
    </details>

    <div class="cta">
      <a href="/fr" class="btn">Créer une session gratuite →</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/comparatif-outils">comment choisir un outil de poker planning</a>,
      <a href="/fr/poker-planning-rgpd">poker planning et RGPD</a>,
      <a href="/fr/fibonacci">la suite de Fibonacci en détail</a>,
      <a href="/fr/alternatives">les alternatives à la technique</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/fr/a-propos">À propos</a>
      | <a href="/fr/mentions-legales">Mentions légales</a>
      | <a href="/fr/mentions-legales#confidentialite">Confidentialité</a>
    </p>
  </footer>
</div>

<style>
  .page {
    padding-top: 2rem;
    padding-bottom: 4rem;
    max-width: 48rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }

  p, li { line-height: 1.7; }

  ol {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  th, td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background: var(--color-surface);
  }

  details {
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
  }

  details[open] { background: var(--color-surface); }

  summary {
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
  }

  details p {
    margin: 0.75rem 0 0;
    font-size: 0.9rem;
  }

  .cta {
    margin-top: 2.5rem;
    text-align: center;
  }

  .btn {
    display: inline-block;
    padding: 0.875rem 2rem;
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: opacity 0.15s;
  }

  .btn:hover { opacity: 0.85; }

  .related {
    margin-top: 2.5rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
