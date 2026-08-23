<svelte:head>
  <title>Comparatif des outils de poker planning&nbsp;: 7 critères qui comptent | CleanPoker</title>
  <meta name="description" content="Comment choisir un outil de poker planning en ligne&nbsp;: les 7 critères à vérifier soi-même, ce que CleanPoker fait, ce qu'il ne fait pas, et quand un autre outil est le bon choix." />
  <link rel="canonical" href="https://cleanpoker.dev/fr/comparatif-outils" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/comparatif-outils" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker-tools" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker-tools" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Comparatif des outils de poker planning : les 7 critères qui comptent',
    url: 'https://cleanpoker.dev/fr/comparatif-outils',
    description: 'Les sept critères pour choisir un outil de poker planning en ligne, vérifiables soi-même, et le périmètre exact de CleanPoker, y compris ce qu\'il ne sait pas faire.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel outil de poker planning gratuit choisir ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Presque tous les outils de poker planning en ligne annoncent la gratuité et l\'absence d\'inscription : ce n\'est donc pas un critère de tri. Ce qui différencie réellement : le moment où le mur de paiement apparaît, ce que devient le contenu des sessions, la présence de scripts tiers, l\'accessibilité au clavier et aux lecteurs d\'écran, et le fait que le code soit vérifiable ou non.' },
      },
      {
        '@type': 'Question',
        name: 'Que ne sait pas faire CleanPoker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'CleanPoker n\'a pas d\'intégration Jira, Azure DevOps ou Linear, pas d\'import de backlog, pas d\'historique des sessions passées, pas d\'export CSV, pas de minuteur de vote et pas d\'équipes permanentes. Si l\'une de ces fonctions est indispensable, un outil intégré au gestionnaire de tickets est le bon choix.' },
      },
      {
        '@type': 'Question',
        name: 'Comment vérifier qu\'un outil de poker planning ne piste pas ses utilisateurs ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ouvrez les outils de développement du navigateur, onglet Réseau, et rechargez la page : chaque domaine autre que celui du site est un tiers. L\'onglet Application montre les cookies et le stockage local. Cette vérification prend deux minutes et vaut mieux que n\'importe quelle promesse affichée sur une page d\'accueil.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">← Guide du poker planning</a>

    <h1>Comparatif des outils de poker planning&nbsp;: les 7 critères qui comptent</h1>

    <p class="lead">
      Tous les outils de poker planning en ligne annoncent la même chose&nbsp;: gratuit, sans
      inscription, en temps réel. Ces trois promesses ne trient rien. Voici les sept critères qui
      séparent réellement les outils, tous vérifiables en quelques minutes, sans nous croire sur
      parole.
    </p>

    <h2>1. À quel moment apparaît le mur de paiement</h2>
    <p>
      C'est le premier grief dans les avis négatifs des outils agiles en général&nbsp;: le prix arrive
      une fois le travail saisi. Un outil peut être «&nbsp;gratuit&nbsp;» et bloquer au sixième participant,
      à la troisième session du mois, ou au moment d'exporter. <strong>À vérifier</strong>&nbsp;: cherchez
      une page tarifs. Si elle existe, lisez la colonne gratuite en entier&nbsp;; si elle n'existe pas,
      la question est de savoir de quoi vit le service.
    </p>

    <h2>2. Ce que deviennent les sessions après la réunion</h2>
    <p>
      Un titre de user story nomme régulièrement un client. Selon l'outil, ce texte disparaît à la
      fermeture, vit quelques heures, ou reste indéfiniment dans un historique consultable.
      <strong>À vérifier</strong>&nbsp;: fermez la session, rouvrez son URL le lendemain. Si le contenu
      est toujours là, il est stocké, et la durée de conservation doit figurer quelque part.
    </p>

    <h2>3. Les scripts tiers chargés par la page</h2>
    <p>
      Une régie publicitaire, un outil d'analyse ou une police distante voient chaque visite, et
      pour un employeur européen, chacun est un transfert à documenter.
      <strong>À vérifier</strong>&nbsp;: outils de développement du navigateur, onglet Réseau, rechargez.
      Chaque domaine qui n'est pas celui du site est un tiers. Faites-le ici et vous en trouverez un&nbsp;: le compteur de pages vues nommé sur la page d'éco-conception, qui ne pose aucun cookie et ne fabrique aucun identifiant.
    </p>

    <h2>4. L'accessibilité réelle, pas la mention</h2>
    <p>
      Une réunion d'estimation à laquelle un membre de l'équipe ne peut pas participer est un
      problème d'équipe avant d'être un problème de conformité. Depuis juin 2025, la directive
      européenne sur l'accessibilité élargit par ailleurs l'obligation à de nombreux services
      numériques privés, et le secteur public français y est soumis depuis longtemps.
      <strong>À vérifier</strong>&nbsp;: rangez la souris, faites un tour complet au clavier avec
      <kbd>Tab</kbd> et <kbd>Entrée</kbd>. Si vous ne pouvez pas voter sans souris, la réponse est
      donnée.
    </p>

    <h2>5. Le poids de la page</h2>
    <p>
      Un outil dont la seule fonction est d'afficher des cartes n'a besoin ni de plusieurs
      mégaoctets de JavaScript, ni de trois secondes de démarrage. Le poids se paie en connexion
      mobile, en salle de réunion saturée, et en émissions.
      <strong>À vérifier</strong>&nbsp;: onglet Réseau, colonne des tailles transférées, en bas de la
      fenêtre.
    </p>

    <h2>6. Ce qui se passe quand quelqu'un perd sa connexion</h2>
    <p>
      C'est le défaut le plus courant et le moins visible sur une page d'accueil&nbsp;: un participant
      dont le wifi saute doit-il rejoindre la session à la main, et son vote survit-il&nbsp;?
      <strong>À vérifier</strong>&nbsp;: coupez le réseau vingt secondes en pleine session, rebranchez.
    </p>

    <h2>7. Le code est-il vérifiable</h2>
    <p>
      Un dépôt public ne garantit pas que le code publié est celui qui tourne, mais son absence
      rend toute affirmation invérifiable. C'est la différence entre une promesse et un fait
      contrôlable.
      <strong>À vérifier</strong>&nbsp;: cherchez un lien vers le dépôt, et regardez la date du dernier
      commit.
    </p>

    <h2>Le périmètre exact de CleanPoker</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Critère</th><th>CleanPoker</th></tr>
        </thead>
        <tbody>
          <tr><td>Mur de paiement</td><td>Aucun. Pas de version payante, pas de limite de participants, pas de quota de sessions.</td></tr>
          <tr><td>Sessions après la réunion</td><td>En mémoire vive, jamais écrites sur disque, supprimées 24 h après la dernière activité.</td></tr>
          <tr><td>Scripts tiers</td><td>Un seul, le compteur de pages vues. Deux cookies techniques&nbsp;: langue et thème.</td></tr>
          <tr><td>Accessibilité</td><td>WCAG 2.1 AA, navigation clavier complète, NVDA et VoiceOver, Lighthouse accessibilité 100.</td></tr>
          <tr><td>Poids</td><td>Moins de 50 Ko de JavaScript partagé, compression brotli, mesuré à chaque intégration continue.</td></tr>
          <tr><td>Perte de connexion</td><td>Reconnexion automatique du WebSocket, avec temporisation exponentielle.</td></tr>
          <tr><td>Code</td><td>Public, licence MIT.</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Ce que CleanPoker ne sait pas faire</h2>
    <p>
      La liste est courte et volontaire, mais elle est disqualifiante pour certaines équipes. Autant
      le savoir avant d'ouvrir l'outil qu'après&nbsp;:
    </p>
    <ul>
      <li><strong>Aucune intégration</strong> Jira, Azure DevOps, Linear ou GitHub&nbsp;: les stories se présentent à la voix.</li>
      <li><strong>Aucun import de backlog</strong>, et donc aucun export CSV des résultats.</li>
      <li><strong>Aucun historique</strong> des sessions passées, aucun suivi de vélocité dans le temps. C'est la contrepartie directe du point 2.</li>
      <li><strong>Aucun minuteur</strong> de vote, aucune équipe permanente, aucun compte.</li>
    </ul>
    <p>
      Si l'estimation doit atterrir automatiquement dans le champ «&nbsp;story points&nbsp;» d'un ticket, un
      outil intégré au gestionnaire de tickets fait le travail et CleanPoker non. Si la réunion a
      seulement besoin que les votes restent cachés jusqu'au dévoilement, l'intégration coûte plus
      cher qu'elle ne rapporte.
    </p>

    <h2>Les outils que l'on nous cite le plus souvent</h2>
    <p>
      Pour comparer par vous-même, les alternatives les plus courantes sont Planning Poker Online,
      PlanITpoker, Scrum Poker Online, Kollabe, TeamRetro et Planning Poker Live. Plusieurs sont
      d'excellents produits, mieux dotés que celui-ci sur les intégrations. Appliquez-leur les sept
      vérifications ci-dessus plutôt que nos affirmations ou les leurs&nbsp;: elles se font en dix
      minutes et elles tranchent.
    </p>

    <div class="cta">
      <a href="/fr" class="btn">Essayer CleanPoker →</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/poker-planning-rgpd">poker planning et RGPD</a>,
      <a href="/fr/alternatives">les alternatives à la technique elle-même</a>.
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

  .lead { font-size: 1.05rem; color: var(--color-text-muted); }

  ul {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

  kbd {
    font-family: var(--font-mono);
    font-size: 0.85em;
    padding: 0.1rem 0.35rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
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
