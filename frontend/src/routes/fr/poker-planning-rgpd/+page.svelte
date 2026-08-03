<svelte:head>
  <title>Poker planning et RGPD : où vont les données de vos sessions | CleanPoker</title>
  <meta name="description" content="Un outil de poker planning traite-t-il des données personnelles ? Ce qu'un DPO regarde, comment vérifier vous-même en deux minutes, et pourquoi CleanPoker n'a ni compte, ni cookie, ni base de données de sessions." />
  <link rel="canonical" href="https://cleanpoker.dev/fr/poker-planning-rgpd" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/poker-planning-rgpd" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker-gdpr" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker-gdpr" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Poker planning et RGPD : où vont les données de vos sessions',
    url: 'https://cleanpoker.dev/fr/poker-planning-rgpd',
    description: 'Ce qu\'un outil de poker planning en ligne traite comme données personnelles, comment le vérifier soi-même, et la position de CleanPoker : aucun compte, aucun cookie, aucune session conservée.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Un outil de poker planning traite-t-il des données personnelles ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Presque toujours oui, même sans le vouloir. Le pseudo saisi par un participant est souvent son prénom et son nom, le titre de la story peut nommer un client, et l\'adresse IP est une donnée personnelle au sens du RGPD. La vraie question n\'est donc pas si l\'outil traite des données, mais combien de temps il les conserve et qui d\'autre y accède.' },
      },
      {
        '@type': 'Question',
        name: 'Faut-il un accord de sous-traitance pour un outil de poker planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Dès qu\'un prestataire traite des données personnelles pour le compte de l\'entreprise, l\'article 28 du RGPD impose un contrat de sous-traitance. Beaucoup d\'équipes utilisent un outil gratuit sans en signer aucun, ce qui est précisément le point que relève un DPO lors d\'un audit. Un outil qui ne conserve rien réduit la question sans la supprimer.' },
      },
      {
        '@type': 'Question',
        name: 'Comment vérifier soi-même ce qu\'un outil envoie ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ouvrez les outils de développement du navigateur, onglet Réseau, et rechargez la page : chaque domaine autre que celui du site est un tiers. Onglet Application, section Cookies et stockage local : ce qui y est écrit survit à la session. Ces deux vérifications prennent deux minutes et ne demandent aucune compétence particulière.' },
      },
      {
        '@type': 'Question',
        name: 'Où sont hébergées les sessions CleanPoker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le serveur temps réel tourne exclusivement à Paris. Les sessions vivent en mémoire vive, ne sont jamais écrites sur disque, et sont supprimées 24 heures après la dernière activité. Il n\'y a ni compte, ni adresse e-mail collectée, ni cookie publicitaire, ni script tiers : les deux seuls cookies retiennent la langue et le thème choisis, et restent sur l\'appareil.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">← Guide du poker planning</a>

    <h1>Poker planning et RGPD : où vont les données de vos sessions</h1>

    <p class="lead">
      La question arrive rarement de l'équipe agile. Elle arrive du DPO, six mois plus tard, au
      moment d'un audit ou d'un renouvellement d'assurance. Voici ce qui se joue réellement, et
      comment le vérifier sans attendre qu'on vous le demande.
    </p>

    <h2>Ce qu'un outil de poker planning traite, même quand il dit ne rien collecter</h2>
    <p>
      Une session d'estimation paraît anodine. Elle produit pourtant, sans qu'on y pense, plusieurs
      catégories de données que le RGPD qualifie de personnelles :
    </p>
    <ul>
      <li>
        <strong>Le pseudo des participants.</strong> Dans la pratique, les gens saisissent leur
        prénom, souvent leur nom complet. C'est une donnée d'identification directe.
      </li>
      <li>
        <strong>Le titre des user stories.</strong> Il nomme régulièrement un client, un
        partenaire ou un projet sous accord de confidentialité.
      </li>
      <li>
        <strong>L'adresse IP.</strong> Elle est traitée par tout serveur, et la jurisprudence
        européenne la considère comme une donnée personnelle dès lors qu'un recoupement est
        possible.
      </li>
      <li>
        <strong>Les votes eux-mêmes.</strong> Reliés à un pseudo et conservés, ils constituent une
        appréciation individuelle. Un historique d'estimations nominatif est de l'évaluation de
        salarié, avec ce que cela implique en information préalable.
      </li>
    </ul>
    <p>
      La bonne question n'est donc pas « cet outil collecte-t-il des données ». C'est
      <strong>combien de temps il les garde, où, et qui d'autre les voit</strong>.
    </p>

    <h2>Les trois points que relève un DPO</h2>
    <ol>
      <li>
        <strong>L'absence d'accord de sous-traitance.</strong> L'article 28 du RGPD impose un
        contrat dès qu'un prestataire traite des données pour le compte de l'entreprise. Un outil
        gratuit adopté par une équipe sans passer par les achats n'en a généralement aucun.
      </li>
      <li>
        <strong>Les transferts hors Union européenne.</strong> Un outil hébergé aux États-Unis, ou
        qui charge des scripts d'analyse américains, déclenche la question des garanties de
        transfert. Elle n'est pas insoluble, elle est simplement rarement documentée.
      </li>
      <li>
        <strong>Les durées de conservation.</strong> « Nous conservons vos données le temps
        nécessaire » n'est pas une durée. Un registre de traitement demande un chiffre.
      </li>
    </ol>

    <h2>Vérifier soi-même, en deux minutes</h2>
    <p>
      Aucune de ces vérifications ne demande de compétence particulière, et elles valent pour
      n'importe quel outil, y compris celui-ci.
    </p>
    <ol>
      <li>
        Ouvrez les outils de développement du navigateur (touche <kbd>F12</kbd>), onglet
        <strong>Réseau</strong>, puis rechargez la page. Chaque domaine listé qui n'est pas celui
        du site est un tiers qui voit votre visite.
      </li>
      <li>
        Onglet <strong>Application</strong>, section Cookies puis Stockage local. Ce qui y est
        écrit survit à la fermeture de l'onglet.
      </li>
      <li>
        Fermez la session, rouvrez son URL le lendemain. Si le contenu est toujours là, il est
        stocké quelque part, et cette durée doit figurer dans une politique de confidentialité.
      </li>
    </ol>

    <h2>La position de CleanPoker</h2>
    <table>
      <thead>
        <tr><th>Question</th><th>Réponse</th></tr>
      </thead>
      <tbody>
        <tr><td>Compte utilisateur</td><td>Aucun. Ni e-mail, ni mot de passe, ni profil.</td></tr>
        <tr><td>Cookies</td><td>Deux, techniques : la langue et le thème. Aucun cookie publicitaire, aucun cookie de mesure.</td></tr>
        <tr><td>Scripts tiers</td><td>Aucun. Pas d'analytique, pas de police distante, pas de CDN externe.</td></tr>
        <tr><td>Conservation des sessions</td><td>En mémoire vive uniquement, jamais écrites sur disque. Supprimées 24 heures après la dernière activité.</td></tr>
        <tr><td>Hébergement</td><td>Serveur temps réel exclusivement en France (Paris), pages servies par un réseau de diffusion sur énergie renouvelable.</td></tr>
        <tr><td>Mesure d'audience</td><td>Aucune, ni côté navigateur, ni par page vue. Le serveur tient trois compteurs agrégés (sessions créées, participants, sessions actives) qui n'identifient ni une salle ni une personne et repartent de zéro à chaque redémarrage.</td></tr>
        <tr><td>Vérifiable</td><td>Le code est public et sous licence MIT. Les trois vérifications ci-dessus s'appliquent aussi à cette page.</td></tr>
      </tbody>
    </table>
    <p>
      Cela ne fait pas disparaître le RGPD : un pseudo saisi reste une donnée, et un serveur voit
      une adresse IP. Cela réduit la surface à ce qui est strictement nécessaire pour que le vote
      fonctionne, et rend la réponse au DPO courte et vérifiable. Le détail figure dans les
      <a href="/fr/mentions-legales#confidentialite">mentions légales</a>.
    </p>

    <h2>Ce que la vie privée ne remplace pas</h2>
    <p>
      Un outil qui ne collecte rien mais qui rate son travail ne sert à rien. Le rôle d'un outil de
      poker planning tient en une ligne : garder les votes invisibles jusqu'à la révélation, pour
      que le premier chiffre annoncé n'ancre pas toute l'équipe. Le reste, y compris cette page,
      est une conséquence.
    </p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une session gratuite →</a>
    </div>

    <p class="related">
      À lire aussi :
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/comparatif-outils">comment choisir un outil</a>,
      <a href="/fr/accessibilite">la déclaration d'accessibilité</a>.
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

  ol, ul {
    padding-left: 1.5rem;
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
