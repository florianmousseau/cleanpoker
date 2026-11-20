<svelte:head>
  <title>Scrum poker en ligne&nbsp;: salle gratuite en un lien | PokerAgile</title>
  <meta name="description" content="Scrum poker en ligne&nbsp;: créez une salle, envoyez le lien, votez en secret et révélez les cartes ensemble. Jeux Fibonacci, T-shirt ou personnalisé." />
  <link rel="canonical" href="https://pokeragile.com/fr/scrum-poker" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/scrum-poker" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/scrum-poker" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/scrum-poker" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/scrum-poker" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/scrum-poker" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/scrum-poker" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fr/scrum-poker" />
  <meta property="og:title" content="Scrum poker en ligne&nbsp;: salle gratuite en un lien" />
  <meta property="og:description" content="Scrum poker en ligne&nbsp;: créez une salle, envoyez le lien, votez en secret et révélez les cartes ensemble. Jeux Fibonacci, T-shirt ou personnalisé." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Scrum poker en ligne',
    url: 'https://pokeragile.com/fr/scrum-poker',
    inLanguage: 'fr',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Le scrum poker est-il la même chose que le planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui. Les deux noms désignent la même technique : choisir une carte en secret, révéler toutes les cartes en même temps, puis discuter des écarts. « Planning poker » est le nom employé par James Grenning en 2002. « Pointing poker » est un troisième nom.' },
      },
      {
        '@type': 'Question',
        name: 'Le scrum poker fait-il partie de Scrum ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Le Guide Scrum de 2020 ne cite ni le scrum poker, ni le planning poker, ni les story points. Les équipes utilisent la technique pendant l\'affinage du backlog ou le sprint planning.' },
      },
      {
        '@type': 'Question',
        name: 'Quelles cartes utilise-t-on au scrum poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le plus souvent 1, 2, 3, 5, 8, 13 et 21, tirées de la suite de Fibonacci. Certains jeux utilisent la variante arrondie 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. L\'écart entre deux cartes grandit avec la taille : 1 point entre 2 et 3, 8 points entre 13 et 21.' },
      },
      {
        '@type': 'Question',
        name: 'Que faire quand les cartes diffèrent à la révélation ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La personne qui a voté le plus bas et celle qui a voté le plus haut expliquent leur choix, puis l\'équipe revote. Si les votes restent partagés entre deux cartes voisines après deux tours, l\'équipe peut retenir la plus haute.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Scrum poker en ligne</h1>

    <p class="lead">
    Sur PokerAgile, une personne crée une salle de scrum poker et envoie le lien. Chaque membre de l'équipe choisit une carte en secret, puis toutes les cartes sont révélées en même temps. Scrum poker, planning poker et pointing poker sont trois noms de cette même technique d'estimation.
    </p>

    <div class="cta">
    <a href="/fr" class="btn">Créer une salle de scrum poker</a>
    </div>

    <h2>Comment se déroule un tour de scrum poker</h2>
    <ol>
    <li>Une personne <a href="/fr">crée une salle sur PokerAgile</a>, choisit le jeu de cartes et envoie le lien à l'équipe.</li>
    <li>Chacun ouvre le lien et saisit un prénom ou un pseudo. Une personne qui regarde sans voter rejoint la salle en observateur.</li>
    <li>Le product owner lit la user story et répond aux questions.</li>
    <li>Chaque participant choisit une carte. La salle montre qui a voté. La carte choisie reste cachée.</li>
    <li>Quand tout le monde a voté, le bouton «&nbsp;Révéler&nbsp;» retourne toutes les cartes en même temps. Une option les révèle automatiquement à l'arrivée du dernier vote.</li>
    <li>La personne qui a voté le plus bas et celle qui a voté le plus haut expliquent leur carte. L'équipe lance ensuite un nouveau tour ou retient une carte pour la story.</li>
    </ol>

    <h2>Les jeux de cartes</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Jeu</th><th>Cartes</th></tr></thead>
    <tbody>
    <tr><td>Fibonacci</td><td>1, 2, 3, 5, 8, 13, 21,&nbsp;?</td></tr>
    <tr><td>T-shirt</td><td>XS, S, M, L, XL, XXL,&nbsp;?</td></tr>
    <tr><td>Puissances de deux (2ⁿ)</td><td>1, 2, 4, 8, 16, 32, 64,&nbsp;?</td></tr>
    <tr><td>Personnalisé</td><td>Une liste séparée par des virgules, de 2 à 64 cartes, 16 caractères au plus par carte</td></tr>
    </tbody>
    </table>
    </div>
    <p>À l'ouverture de la page, le jeu Fibonacci est sélectionné. La carte «&nbsp;?&nbsp;» veut dire «&nbsp;je ne sais pas&nbsp;» et n'entre pas dans la moyenne.</p>

    <h2>Les résultats affichés à la révélation</h2>
    <ul>
    <li>La moyenne, la médiane, le minimum et le maximum des votes chiffrés.</li>
    <li>L'accord&nbsp;: la part des votes qui va à la carte la plus choisie, en pourcentage.</li>
    <li>Une barre par carte, avec son nombre de votes.</li>
    </ul>
    <p>Exemple&nbsp;: cinq personnes votent 3, 5, 5, 5 et 8. La salle affiche une moyenne de 5,2, une médiane de 5, un minimum de 3, un maximum de 8 et un accord de 60&nbsp;%. Avec le jeu T-shirt, il n'y a pas de nombres&nbsp;: la salle affiche seulement l'accord et les barres. Si l'équipe a collé une liste de stories, la carte retenue reste à côté de chaque story. La liste se télécharge en CSV ou se copie en Markdown.</p>

    <h2>PokerAgile en bref</h2>
    <ul>
    <li><strong>Prix</strong>&nbsp;: gratuit. Il n'existe pas d'offre payante ni de limite de participants par salle.</li>
    <li><strong>Compte</strong>&nbsp;: aucun. Un nom suffit pour rejoindre une salle.</li>
    <li><strong>Code source</strong>&nbsp;: publié sur <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">GitHub</a> sous licence MIT.</li>
    <li><strong>Données</strong>&nbsp;: les salles vivent en mémoire sur un serveur à Gravelines, en France, et sont supprimées 24 heures après la dernière activité.</li>
    <li><strong>IA</strong>&nbsp;: un assistant comme Claude, ChatGPT ou Cursor peut <a href="/fr/planning-poker-ia">rejoindre la salle et voter par MCP</a>.</li>
    <li><strong>Langues</strong>&nbsp;: français, anglais, allemand, espagnol et portugais.</li>
    </ul>

    <h2>D'où vient le nom</h2>
    <p>James Grenning a décrit la technique en 2002 sous le nom de planning poker. Mike Cohn l'a fait connaître en 2005 avec son livre «&nbsp;Agile Estimating and Planning&nbsp;». «&nbsp;Planning Poker&nbsp;» est une marque déposée de Mountain Goat Software, la société de Mike Cohn, et beaucoup d'outils emploient «&nbsp;scrum poker&nbsp;» ou «&nbsp;pointing poker&nbsp;».</p>

    <h2>Questions fréquentes</h2>
    <h3>Le scrum poker est-il la même chose que le planning poker&nbsp;?</h3>
    <p>Oui. Les deux noms désignent la même technique&nbsp;: choisir une carte en secret, révéler toutes les cartes en même temps, puis discuter des écarts. «&nbsp;Planning poker&nbsp;» est le nom employé par James Grenning en 2002. «&nbsp;Pointing poker&nbsp;» est un troisième nom.</p>
    <h3>Le scrum poker fait-il partie de Scrum&nbsp;?</h3>
    <p>Non. Le Guide Scrum de 2020 ne cite ni le scrum poker, ni le planning poker, ni les story points. Les équipes utilisent la technique pendant l'affinage du backlog ou le sprint planning.</p>
    <h3>Quelles cartes utilise-t-on au scrum poker&nbsp;?</h3>
    <p>Le plus souvent 1, 2, 3, 5, 8, 13 et 21, tirées de la suite de Fibonacci. Certains jeux utilisent la variante arrondie 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. L'écart entre deux cartes grandit avec la taille&nbsp;: 1 point entre 2 et 3, 8 points entre 13 et 21.</p>
    <h3>Que faire quand les cartes diffèrent à la révélation&nbsp;?</h3>
    <p>La personne qui a voté le plus bas et celle qui a voté le plus haut expliquent leur choix, puis l'équipe revote. Si les votes restent partagés entre deux cartes voisines après deux tours, l'équipe peut retenir la plus haute.</p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une salle de scrum poker</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/fibonacci">la suite de Fibonacci</a>,
      <a href="/fr/story-points">les story points</a>,
      <a href="/fr/t-shirt-sizing">le T-shirt sizing</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
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
  h3 { margin-top: 1.25rem; margin-bottom: 0.25rem; font-size: 1rem; }

  p, li { line-height: 1.7; }

  .lead { font-size: 1.05rem; color: var(--color-text-muted); }

  ul, ol {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .table-wrap { overflow-x: auto; }

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


  .cta {
    margin-top: 2.5rem;
    text-align: center;
  }

  .btn {
    display: inline-block;
    padding: 0.875rem min(2rem, 32px);
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
