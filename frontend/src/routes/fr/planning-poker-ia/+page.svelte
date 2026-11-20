<svelte:head>
  <title>Planning poker IA&nbsp;: faire voter Claude ou ChatGPT | CleanPoker</title>
  <meta name="description" content="Faites voter Claude, ChatGPT ou Cursor dans une salle de planning poker&nbsp;: une adresse MCP à coller, rien à installer. Ce que l'IA estime bien, et mal." />
  <link rel="canonical" href="https://cleanpoker.dev/fr/planning-poker-ia" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker-ia" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker-ai" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker-ai" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Planning poker avec une IA : faire voter Claude ou ChatGPT dans la salle',
    url: 'https://cleanpoker.dev/fr/planning-poker-ia',
    inLanguage: 'fr',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Peut-on faire voter une IA au planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui. Sur CleanPoker, un assistant compatible MCP (Claude, ChatGPT, Cursor, VS Code) rejoint la salle par l\'adresse https://salles.cleanpoker.dev/mcp, reçoit la story dans sa conversation et choisit une carte en secret, comme les autres participants. Il apparaît marqué IA et ne peut ni révéler les votes ni lancer un tour.' },
      },
      {
        '@type': 'Question',
        name: 'Une IA estime-t-elle mieux qu\'une équipe ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Elle ne connaît ni la vélocité de l\'équipe, ni l\'état réel du code, ni qui dépend de qui. Elle est utile pour repérer ce que la story oublie : tests, migration de données, cas limites. Son vote sert à ouvrir la discussion quand il s\'écarte de celui de l\'équipe.' },
      },
      {
        '@type': 'Question',
        name: 'Le texte de la story est-il envoyé à une IA ?',
        acceptedAnswer: { '@type': 'Answer', text: 'CleanPoker n\'envoie rien à aucune IA et ne reçoit pas le texte de la story, qui reste dans la conversation de la personne qui a connecté l\'assistant. L\'assistant reçoit l\'état de la salle : les noms des participants, puis les votes une fois révélés.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Planning poker avec une IA&nbsp;: faire voter Claude ou ChatGPT dans la salle</h1>

    <p class="lead">
      Depuis le 20 novembre 2026, un assistant IA peut rejoindre une salle CleanPoker de poker planning et voter comme un membre de l'équipe. Il choisit sa carte en secret, elle se révèle avec les autres, et il apparaît dans la liste avec la mention <strong>(IA)</strong>.
    </p>

    <h2>Ce que l'IA peut faire dans la salle</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Action</th><th>Une personne</th><th>Une IA</th></tr></thead>
      <tbody>
        <tr><td>Choisir une carte en secret</td><td>oui</td><td>oui</td></tr>
        <tr><td>Voir les votes des autres avant la révélation</td><td>non</td><td>non</td></tr>
        <tr><td>Révéler les votes, lancer un tour, retirer quelqu'un</td><td>oui (l'hôte seul si la salle est verrouillée)</td><td>non</td></tr>
        <tr><td>Verrouiller la salle</td><td>l'hôte</td><td>non</td></tr>
        <tr><td>Être hôte de la salle</td><td>oui</td><td>non</td></tr>
      </tbody>
    </table>
    </div>
    <p>
      Son vote compte dans la moyenne et la médiane. Tout participant peut retirer une IA&nbsp;; dans une salle verrouillée, seul l'hôte le peut. L'IA n'agit que quand on le lui demande&nbsp;: un message par tour, et sa place reste occupée tant qu'elle n'a pas quitté la salle.
    </p>

    <h2>Connecter son assistant par MCP</h2>
    <p>L'adresse est la même partout&nbsp;:</p>
    <pre><code>https://salles.cleanpoker.dev/mcp</code></pre>
    <ul>
      <li><strong>Claude</strong>&nbsp;: Paramètres, Connecteurs, Ajouter un connecteur personnalisé, puis coller l'adresse. Dans une offre Team ou Enterprise, un propriétaire de l'espace l'ajoute d'abord.</li>
      <li><strong>Claude Code</strong>&nbsp;: <code>claude mcp add --transport http cleanpoker https://salles.cleanpoker.dev/mcp</code></li>
      <li><strong>ChatGPT</strong>&nbsp;: Paramètres, Applications et connecteurs, Paramètres avancés, activer le mode développeur, puis Créer avec l'adresse. Le mode développeur est réservé aux offres payantes de ChatGPT.</li>
      <li><strong>Cursor</strong>&nbsp;: dans <code>~/.cursor/mcp.json</code>, ajouter <code>&#123;"mcpServers": &#123; "cleanpoker": &#123; "url": "https://salles.cleanpoker.dev/mcp" &#125; &#125; &#125;</code>.</li>
      <li><strong>VS Code</strong>&nbsp;: avec Copilot en mode agent, dans <code>.vscode/mcp.json</code>, ajouter <code>&#123;"servers": &#123; "cleanpoker": &#123; "type": "http", "url": "https://salles.cleanpoker.dev/mcp" &#125; &#125; &#125;</code>.</li>
    </ul>
    <p>CleanPoker ne demande ni compte ni clé d'API, et il n'y a rien à installer&nbsp;: l'adresse est celle d'un serveur MCP distant, avec quatre outils, <code>join_room</code>, <code>get_room</code>, <code>vote</code> et <code>leave_room</code>. La salle doit déjà être ouverte par une personne dans son navigateur. Puis, dans la conversation&nbsp;:</p>
    <pre><code>Rejoins la salle https://cleanpoker.dev/ab12cd34 sous le nom Claude.
La story à estimer est l'export CSV des factures du mois, filtré par client.
Estime-la en story points et vote, sans me dire ta carte.
Après la révélation, je te demanderai ton raisonnement. Quitte la salle quand je te le dis.</code></pre>

    <h2>Ce qu'une IA estime bien</h2>
    <ul>
      <li><strong>Ce que la story oublie</strong>&nbsp;: tests, migration de données, droits d'accès, cas limites, traduction.</li>
      <li><strong>La taille relative</strong> d'une story bien écrite, comparée à une autre que vous lui donnez en référence.</li>
      <li><strong>Une explication écrite</strong> de son vote, à lui demander après la révélation quand l'écart est grand.</li>
    </ul>

    <h2>Ce qu'elle estime mal</h2>
    <ul>
      <li><strong>Votre code</strong>, sauf si l'assistant y a accès (Cursor ou VS Code ouverts sur le dépôt).</li>
      <li><strong>La vélocité de l'équipe</strong>&nbsp;: un 5 n'a de sens que pour l'équipe qui l'a calibré.</li>
      <li><strong>Les dépendances humaines</strong>&nbsp;: la personne absente, l'équipe voisine qui doit livrer avant.</li>
      <li><strong>Le contexte de la salle</strong>&nbsp;: elle ne voit ni la story ni la discussion, seulement ce que vous lui écrivez.</li>
    </ul>

    <h2>Règles pour qu'elle serve</h2>
    <ul>
      <li><strong>Elle vote avant la discussion</strong>, en même temps que tout le monde. Si elle annonce sa carte dans votre conversation avant la révélation, votez d'abord.</li>
      <li><strong>Un écart se discute.</strong> L'IA dit 13 et l'équipe dit 3&nbsp;: demandez-lui ce qu'elle a vu.</li>
      <li><strong>La personne qui fera le travail tranche.</strong> Elle seule connaît le code qu'elle devra toucher.</li>
    </ul>

    <h2>Où va le texte de la story</h2>
    <p>
      CleanPoker n'appelle aucune IA et ne reçoit jamais le texte de la story&nbsp;: il reste dans la conversation de la personne qui a connecté l'assistant, avec son abonnement et les règles de son entreprise sur l'IA. L'assistant, lui, reçoit l'état de la salle&nbsp;: les noms des participants, qui a voté, puis les votes une fois révélés. La salle vit en mémoire sur le serveur de Gravelines et disparaît 24 heures après la dernière activité.
    </p>

    <h2>Questions fréquentes</h2>
    <h3>Peut-on faire voter une IA au planning poker&nbsp;?</h3>
    <p>Oui. Sur CleanPoker, un assistant compatible MCP (Claude, ChatGPT, Cursor, VS Code) rejoint la salle par l'adresse https://salles.cleanpoker.dev/mcp, reçoit la story dans sa conversation et choisit une carte en secret, comme les autres participants. Il apparaît marqué IA et ne peut ni révéler les votes ni lancer un tour.</p>
    <h3>Une IA estime-t-elle mieux qu'une équipe&nbsp;?</h3>
    <p>Non. Elle ne connaît ni la vélocité de l'équipe, ni l'état réel du code, ni qui dépend de qui. Elle est utile pour repérer ce que la story oublie&nbsp;: tests, migration de données, cas limites. Son vote sert à ouvrir la discussion quand il s'écarte de celui de l'équipe.</p>
    <h3>Le texte de la story est-il envoyé à une IA&nbsp;?</h3>
    <p>CleanPoker n'envoie rien à aucune IA et ne reçoit pas le texte de la story, qui reste dans la conversation de la personne qui a connecté l'assistant. L'assistant reçoit l'état de la salle&nbsp;: les noms des participants, puis les votes une fois révélés.</p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une salle</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/comparatif-outils">comment choisir un outil de poker planning</a>,
      <a href="/fr/estimation-agile">l'estimation agile</a>.
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
  h3 { margin-top: 1.25rem; margin-bottom: 0.25rem; font-size: 1rem; }

  p, li { line-height: 1.7; }

  .lead { font-size: 1.05rem; color: var(--color-text-muted); }

  ul {
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

  pre {
    overflow-x: auto;
    padding: 0.75rem min(1rem, 16px);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-size: 0.85rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
