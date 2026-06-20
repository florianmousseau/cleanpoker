<svelte:head>
  <title>Planning poker : règles, Fibonacci et guide pratique | CleanPoker</title>
  <meta name="description" content="Qu'est-ce que le planning poker ? Règles, suite de Fibonacci, T-shirt sizing, conseils pour estimer les user stories en équipe agile. Guide complet gratuit." />
  <link rel="canonical" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/planning-poker" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/planning-poker" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/planning-poker" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Planning poker : règles, Fibonacci et guide pratique',
    url: 'https://cleanpoker.dev/fr/planning-poker',
    description: 'Guide complet du planning poker : définition, règles, pourquoi Fibonacci, comment l\'utiliser avec CleanPoker.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le planning poker est une technique d\'estimation agile utilisée en Scrum. Chaque membre de l\'équipe choisit secrètement une carte représentant son estimation d\'une user story, puis tous révèlent simultanément. Les divergences provoquent une discussion qui affine l\'estimation collective.' },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi utiliser la suite de Fibonacci en planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La suite de Fibonacci (1, 2, 3, 5, 8, 13, 21) reflète l\'incertitude croissante : plus une tâche est grande, moins on peut l\'estimer précisément. L\'écart entre les valeurs augmente, ce qui force l\'équipe à se positionner clairement sans sur-précision artificielle.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre points de story et jours ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les points de story mesurent la complexité relative, pas le temps. Un 5 est environ 2,5 fois plus complexe qu\'un 2, quelle que soit la durée réelle. Cette abstraction permet de comparer des tâches sans se bloquer sur les durées individuelles.' },
      },
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le T-shirt sizing ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le T-shirt sizing (XS, S, M, L, XL, XXL) est une alternative à Fibonacci, utile pour des estimations grossières en début de projet ou pour des équipes non techniques. Moins précis que Fibonacci, il est plus rapide pour trier un backlog.' },
      },
      {
        '@type': 'Question',
        name: 'Comment gérer les divergences dans le planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quand les estimations divergent (ex. : un 2 et un 13 dans la même main), demandez aux extrêmes d\'expliquer leur vote. La discussion révèle souvent des hypothèses différentes ou des risques non identifiés. Revotez ensuite jusqu\'à convergence.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/a-propos" class="back-link">← À propos</a>

    <h1>Planning poker : guide complet</h1>

    <p>
      Le <strong>planning poker</strong> est la technique d'estimation la plus utilisée en
      <strong>Scrum</strong> et en agilité. En 5 minutes, voici tout ce qu'il faut savoir.
    </p>

    <h2>Qu'est-ce que le planning poker ?</h2>
    <p>
      Le planning poker (aussi appelé <em>Scrum poker</em>) est une technique d'estimation
      collaborative où chaque membre de l'équipe choisit <strong>secrètement</strong> une carte
      représentant sa propre estimation d'une user story ou d'une tâche. Tous révèlent leurs
      cartes <strong>simultanément</strong>. Les divergences déclenchent une discussion courte,
      puis l'équipe revote jusqu'à convergence.
    </p>
    <p>
      L'objectif n'est pas la précision mais la <strong>discussion</strong> : révéler les
      hypothèses cachées, les risques non identifiés et les points de désaccord technique.
    </p>

    <h2>Les règles en 5 étapes</h2>
    <ol>
      <li>Le Product Owner présente une user story ou une tâche.</li>
      <li>L'équipe pose des questions de clarification.</li>
      <li>Chaque membre choisit secrètement une carte (sans influencer les autres).</li>
      <li>Tous révèlent simultanément.</li>
      <li>Si les estimations convergent : on retient la valeur. Sinon : discussion des extrêmes, puis nouveau vote.</li>
    </ol>

    <h2>Pourquoi la suite de Fibonacci ?</h2>
    <p>
      La suite <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> est la plus répandue car elle modélise
      l'incertitude croissante : plus une tâche est grande, moins on peut l'estimer finement.
      L'écart entre les valeurs grandit avec la taille, ce qui <strong>force l'équipe à se
      positionner clairement</strong> sans prétendre à une précision illusoire.
    </p>
    <p>
      La carte <strong>?</strong> signifie "je ne sais pas estimer cette tâche" — signal utile
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
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Équipes Scrum expérimentées, estimation en points de story</td>
        </tr>
        <tr>
          <td><strong>T-shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Estimations grossières, équipes non techniques, tri de backlog</td>
        </tr>
        <tr>
          <td><strong>Puissances de 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Tâches techniques avec doublement de complexité prévisible</td>
        </tr>
      </tbody>
    </table>

    <h2>Questions fréquentes</h2>

    <details>
      <summary>Quelle est la différence entre points de story et jours ?</summary>
      <p>
        Les points de story mesurent la <strong>complexité relative</strong>, pas le temps.
        Un 5 est environ 2,5 fois plus complexe qu'un 2, quelle que soit la durée réelle.
        Cette abstraction permet de comparer des tâches sans se bloquer sur les durées individuelles,
        qui varient selon la personne et le contexte.
      </p>
    </details>

    <details>
      <summary>Comment gérer les divergences d'estimation ?</summary>
      <p>
        Quand les estimations divergent (par exemple un 2 et un 13 dans la même main),
        demandez aux personnes ayant voté aux extrêmes d'expliquer leur choix.
        La discussion révèle souvent des hypothèses différentes ou des risques non identifiés.
        Revotez ensuite jusqu'à convergence, sans forcer le consensus.
      </p>
    </details>

    <details>
      <summary>Le planning poker fonctionne-t-il pour les équipes distantes ?</summary>
      <p>
        Oui, c'est précisément pour ça que CleanPoker existe. Créez une session, partagez l'URL,
        chaque participant vote sur son propre appareil. Les résultats se révèlent en temps réel
        via WebSocket, sans aucune configuration ni compte à créer.
      </p>
    </details>

    <details>
      <summary>Combien de participants maximum ?</summary>
      <p>
        CleanPoker ne pose aucune limite technique. En pratique, au-delà de 10 participants,
        les discussions deviennent difficiles à gérer. Pour les grandes équipes, préférez
        plusieurs sessions parallèles ou une estimation en sous-groupes.
      </p>
    </details>

    <div class="cta">
      <a href="/" class="btn">Créer une session gratuite →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/fr/a-propos">À propos</a>
      | <a href="/fr/mentions-legales">Mentions légales</a>
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

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
