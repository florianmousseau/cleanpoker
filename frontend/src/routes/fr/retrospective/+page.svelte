<svelte:head>
  <title>Rétrospective agile&nbsp;: 11 formats et idées de jeux | PokerAgile</title>
  <meta name="description" content="Rétrospective agile&nbsp;: 11 formats et idées de jeux pour la rétrospective de sprint, avec les étapes, la durée, les cinq phases et les erreurs fréquentes." />
  <link rel="canonical" href="https://pokeragile.com/fr/retrospective" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/retrospective" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/retrospective" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/retrospective" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Rétrospective agile : 11 formats et idées de jeux',
    url: 'https://pokeragile.com/fr/retrospective',
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
        name: 'Quelles sont les 5 étapes d\'une rétrospective ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Poser le cadre, collecter les données, faire émerger les causes, décider des actions, clore la rétrospective. Esther Derby et Diana Larsen ont décrit ces cinq phases dans « Agile Retrospectives: Making Good Teams Great », paru en 2006.' },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps dure une rétrospective de sprint ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le Guide Scrum de 2020 fixe un maximum de trois heures pour un sprint d\'un mois et précise que l\'événement est en général plus court pour un sprint plus court. À titre d\'exemple, une équipe en sprints de deux semaines peut réserver 60 à 90 minutes ; le guide ne donne pas de chiffre pour cette durée de sprint.' },
      },
      {
        '@type': 'Question',
        name: 'Qui participe à la rétrospective de sprint ?',
        acceptedAnswer: { '@type': 'Answer', text: 'L\'équipe Scrum : les développeurs, le product owner et le scrum master. Le Guide Scrum ne cite aucun autre participant. Un manager ou une partie prenante vient seulement si l\'équipe l\'invite.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre la revue de sprint et la rétrospective ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La revue de sprint inspecte le produit : l\'équipe Scrum montre le résultat du sprint aux parties prenantes, pendant quatre heures au maximum pour un sprint d\'un mois. La rétrospective vient après et inspecte la façon de travailler de l\'équipe, pendant trois heures au maximum.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Rétrospective agile&nbsp;: 11 formats et idées de jeux</h1>

    <p class="lead">
      La rétrospective de sprint est la réunion où une équipe Scrum regarde comment s'est passé le sprint qui se termine et choisit ce qu'elle change au suivant. Cette page décrit 11 formats de rétrospective, avec les étapes et la durée de chacun.
    </p>

    <h2>Les 11 formats de rétrospective en un tableau</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Format</th><th>Quand l'utiliser</th><th>Durée indicative</th></tr></thead>
      <tbody>
        <tr><td>ESVP</td><td>En ouverture, pour savoir qui a envie d'être là</td><td>10 min</td></tr>
        <tr><td>Start, Stop, Continue</td><td>Une première rétrospective, ou une équipe pressée</td><td>45 min</td></tr>
        <tr><td>Mad, Sad, Glad</td><td>Un sprint qui a laissé de la frustration ou de la fatigue</td><td>45 à 60 min</td></tr>
        <tr><td>4L</td><td>La fin d'une release ou d'un projet</td><td>60 min</td></tr>
        <tr><td>Voilier (Speedboat)</td><td>Une équipe qui a un objectif et des risques devant elle</td><td>60 min</td></tr>
        <tr><td>Étoile de mer (Starfish)</td><td>Une équipe lassée du Start, Stop, Continue</td><td>60 min</td></tr>
        <tr><td>Frise chronologique (Timeline)</td><td>Un sprint long, une release ou un incident</td><td>60 à 90 min</td></tr>
        <tr><td>5 pourquoi</td><td>Un seul problème, qui revient</td><td>20 à 30 min</td></tr>
        <tr><td>Lean Coffee</td><td>Des sujets variés que personne n'a triés</td><td>60 min</td></tr>
        <tr><td>Vote par gommettes (dot voting)</td><td>Choisir les sujets qui deviennent des actions</td><td>5 min</td></tr>
        <tr><td>ROTI</td><td>En clôture, pour noter la réunion elle-même</td><td>5 min</td></tr>
      </tbody>
    </table>
    </div>
    <p>Les durées sont des exemples pour une équipe de 5 à 8 personnes, pas des règles. L'ESVP, le vote par gommettes et le ROTI sont des activités courtes&nbsp;: elles ouvrent, trient ou ferment une rétrospective construite sur l'un des huit autres formats.</p>

    <h2>Qu'est-ce qu'une rétrospective de sprint&nbsp;?</h2>
    <p>Le <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">Guide Scrum de 2020</a> donne un seul but à la rétrospective de sprint&nbsp;: planifier des moyens d'améliorer la qualité et l'efficacité. C'est le dernier événement du sprint, après la revue de sprint.</p>
    <ul>
      <li><strong>Qui participe</strong>&nbsp;: l'équipe Scrum, c'est-à-dire les développeurs, le product owner et le scrum master.</li>
      <li><strong>Ce qu'on inspecte</strong>&nbsp;: les individus, les interactions, les processus, les outils et la Definition of Done.</li>
      <li><strong>Combien de temps</strong>&nbsp;: trois heures au maximum pour un sprint d'un mois, et en général moins pour un sprint plus court. À titre d'exemple, une équipe en sprints de deux semaines peut réserver 60 à 90 minutes&nbsp;; le guide ne donne pas de chiffre pour cette durée de sprint.</li>
      <li><strong>Ce qui en sort</strong>&nbsp;: les changements les plus utiles que l'équipe a trouvés. Le guide dit qu'ils sont traités dès que possible et qu'ils peuvent entrer dans le Sprint Backlog du sprint suivant.</li>
    </ul>

    <h2>Les cinq phases d'une rétrospective</h2>
    <p>Esther Derby et Diana Larsen ont décrit cette structure dans «&nbsp;Agile Retrospectives: Making Good Teams Great&nbsp;», paru en 2006.</p>
    <ol>
      <li><strong>Poser le cadre</strong> (set the stage)&nbsp;: annoncer le but et la durée, et faire parler chaque personne une fois. L'ESVP se place ici.</li>
      <li><strong>Collecter les données</strong> (gather data)&nbsp;: rassembler ce qui s'est passé pendant le sprint, les faits comme les ressentis. Start, Stop, Continue, Mad, Sad, Glad, les 4L, le voilier, l'étoile de mer et la frise se placent ici.</li>
      <li><strong>Faire émerger les causes</strong> (generate insights)&nbsp;: chercher ce qui explique les données. Les 5 pourquoi se placent ici.</li>
      <li><strong>Décider des actions</strong> (decide what to do)&nbsp;: retenir une ou deux actions, chacune avec un responsable. Le vote par gommettes se place ici.</li>
      <li><strong>Clore la rétrospective</strong> (close the retrospective)&nbsp;: noter les actions et évaluer la réunion. Le ROTI se place ici.</li>
    </ol>
    <p>Le Lean Coffee remplace les phases 2 et 3&nbsp;: l'équipe construit son ordre du jour et le traite dans la même réunion.</p>

    <h2>Les 11 formats, étape par étape</h2>

    <h3>ESVP, pour ouvrir la séance</h3>
    <p>À utiliser en ouverture, quand on ne sait pas si les participants ont envie d'être là. Prévoir environ 10 minutes. Derby et Larsen décrivent cette activité dans leur livre comme un sondage anonyme.</p>
    <ol>
      <li>Écrire les quatre rôles au tableau. L'Explorateur (Explorer) veut découvrir de nouvelles idées. Le Client (Shopper) sera content de repartir avec une idée utile. Le Vacancier (Vacationer) est content d'échapper au travail courant. Le Prisonnier (Prisoner) se sent obligé d'être là.</li>
      <li>Chacun écrit une lettre, E, S, V ou P, sur un papier plié, sans son nom.</li>
      <li>Compter les papiers et dessiner les quatre totaux en barres au tableau.</li>
      <li>Déchirer les papiers devant le groupe, pour que personne ne rapproche une écriture d'un vote.</li>
      <li>Demander au groupe ce que ces totaux changent pour l'heure qui vient.</li>
    </ol>

    <h3>Start, Stop, Continue</h3>
    <p>À utiliser pour une première rétrospective, ou quand l'équipe dispose de 45 minutes.</p>
    <ol>
      <li>Tracer trois colonnes&nbsp;: Start (ce que l'équipe ne fait pas encore), Stop (ce qui coûte plus qu'il ne rapporte) et Continue (ce qui marche).</li>
      <li>Chacun écrit ses notes en silence pendant 5 minutes, une idée par note.</li>
      <li>Chaque personne lit ses notes à voix haute et les pose dans une colonne.</li>
      <li>Regrouper les notes qui disent la même chose.</li>
      <li>Voter par gommettes, puis transformer en actions le premier ou les deux premiers groupes.</li>
    </ol>

    <h3>Mad, Sad, Glad</h3>
    <p>À utiliser après un sprint marqué par un objectif manqué, un incident ou un conflit, quand l'équipe doit dire ce qu'elle ressent avant de parler du processus. Prévoir 45 à 60 minutes. L'activité est décrite dans le livre de Derby et Larsen.</p>
    <ol>
      <li>Tracer trois colonnes&nbsp;: Mad (ce qui m'a mis en colère), Sad (ce qui m'a déçu) et Glad (ce qui m'a fait plaisir).</li>
      <li>Chacun écrit ses notes en silence pendant 5 à 10 minutes.</li>
      <li>Poser les notes, les regrouper par sujet et donner un nom à chaque groupe.</li>
      <li>Discuter les plus gros groupes, en commençant par la colonne Mad.</li>
      <li>Retenir une action pour le groupe qui a reçu le plus de notes.</li>
    </ol>

    <h3>Les 4L&nbsp;: Liked, Learned, Lacked, Longed for</h3>
    <p>À utiliser à la fin d'une release ou d'un projet, quand l'équipe veut savoir ce qu'elle a appris autant que ce qui a mal tourné. Prévoir 60 minutes. Mary Gorman et Ellen Gottesdiener ont décrit le format en juin 2010.</p>
    <ol>
      <li>Tracer quatre zones&nbsp;: Liked (aimé), Learned (appris), Lacked (ce qui a manqué) et Longed for (ce qu'on aurait voulu avoir).</li>
      <li>Chacun écrit ses notes en silence pendant 10 minutes. Un environnement de test absent va dans Lacked. Une revue de conception avant de coder va dans Longed for.</li>
      <li>Former quatre sous-groupes, un par zone. Chaque sous-groupe rassemble les notes de sa zone et présente les thèmes qu'il a trouvés.</li>
      <li>L'équipe entière choisit les actions parmi les thèmes de Lacked et de Longed for.</li>
    </ol>

    <h3>Le voilier (Speedboat)</h3>
    <p>À utiliser quand l'équipe a un objectif précis, par exemple une date de mise en production, et veut lister ce qui l'aide et ce qui le menace. Prévoir 60 minutes. Le format porte aussi le nom de Speedboat, un jeu que Luke Hohmann a publié dans «&nbsp;Innovation Games&nbsp;» en 2006&nbsp;: des clients y désignent ce qui les gêne le plus dans un produit.</p>
    <ol>
      <li>Dessiner un bateau, une île, le vent, une ancre et des rochers.</li>
      <li>Écrire l'objectif sur l'île.</li>
      <li>Chacun écrit ses notes pendant 10 minutes&nbsp;: le vent pour ce qui fait avancer l'équipe, l'ancre pour ce qui la ralentit, les rochers pour les risques à venir.</li>
      <li>Poser les notes sur le dessin et les regrouper.</li>
      <li>Voter sur les ancres et les rochers.</li>
      <li>Écrire une action pour l'ancre la plus lourde et une pour le rocher le plus proche.</li>
    </ol>

    <h3>L'étoile de mer (Starfish)</h3>
    <p>À utiliser quand le Start, Stop, Continue est devenu une routine&nbsp;: deux branches de plus permettent de demander plus ou moins d'une pratique sans la supprimer. Prévoir 60 minutes. Patrick Kua a décrit l'étoile de mer sur son blog en mars 2006.</p>
    <ol>
      <li>Tracer cinq branches à partir d'un point&nbsp;: Keep doing (continuer), Less of (moins de), More of (plus de), Stop doing (arrêter), Start doing (commencer).</li>
      <li>Chacun écrit ses notes en silence pendant 10 minutes.</li>
      <li>Parcourir les branches une par une et poser les notes.</li>
      <li>Voter par gommettes sur tout le tableau.</li>
      <li>Transformer les deux notes les mieux classées en actions, chacune avec un responsable.</li>
    </ol>

    <h3>La frise chronologique (Timeline)</h3>
    <p>À utiliser après un sprint long, une release ou un incident, quand chacun se souvient d'un morceau différent de l'histoire. Prévoir 60 à 90 minutes. L'activité est décrite dans le livre de Derby et Larsen.</p>
    <ol>
      <li>Tracer une ligne horizontale du premier au dernier jour de la période.</li>
      <li>Chacun écrit les événements dont il se souvient, un par note&nbsp;: un déploiement, une panne, une arrivée dans l'équipe, un changement de périmètre.</li>
      <li>Poser les notes sur la ligne, dans l'ordre.</li>
      <li>Chaque personne colle une gommette verte sur les événements qu'elle a bien vécus et une rouge sur ceux qu'elle a mal vécus.</li>
      <li>Lire la frise de gauche à droite et s'arrêter là où les gommettes rouges se concentrent.</li>
      <li>Choisir les actions à partir de ces points.</li>
    </ol>

    <h3>Les 5 pourquoi</h3>
    <p>À utiliser sur un problème revenu dans plusieurs sprints. Prévoir 20 à 30 minutes, une fois les données collectées. Taiichi Ohno décrit la technique dans «&nbsp;Toyota Production System&nbsp;», traduit en anglais en 1988.</p>
    <ol>
      <li>Écrire le problème comme un fait&nbsp;: «&nbsp;La release est partie avec deux jours de retard.&nbsp;»</li>
      <li>Demander pourquoi et écrire la réponse&nbsp;: «&nbsp;Les tests de non-régression ont échoué jeudi.&nbsp;»</li>
      <li>Demander pourquoi à propos de cette réponse&nbsp;: «&nbsp;Une migration de base a été fusionnée mercredi soir sans les lancer.&nbsp;»</li>
      <li>Recommencer jusqu'à une réponse que l'équipe peut changer. Cinq est un repère&nbsp;: certaines chaînes s'arrêtent à trois, d'autres à sept.</li>
      <li>Écrire l'action en face de la dernière réponse, ici «&nbsp;le pipeline bloque une fusion tant que les tests de non-régression n'ont pas tourné&nbsp;».</li>
    </ol>

    <h3>Lean Coffee</h3>
    <p>À utiliser quand les participants arrivent avec des sujets sans lien entre eux. Prévoir 60 minutes. Jim Benson et Jeremy Lightsmith ont lancé le Lean Coffee à Seattle en 2009.</p>
    <ol>
      <li>Tracer trois colonnes&nbsp;: À discuter, En discussion, Discuté.</li>
      <li>Chacun écrit ses sujets pendant 5 minutes, un par note, et présente chacun en une phrase.</li>
      <li>Chaque personne dispose de deux votes. Classer la colonne À discuter par nombre de votes.</li>
      <li>Passer le premier sujet dans En discussion et lancer un minuteur, par exemple de 7 minutes.</li>
      <li>Quand le minuteur sonne, chacun montre son pouce&nbsp;: vers le haut pour ajouter du temps, par exemple 3 minutes, vers le bas pour passer au sujet suivant.</li>
      <li>Noter l'action éventuelle avant de passer le sujet dans Discuté.</li>
      <li>S'arrêter 5 minutes avant la fin et relire les actions à voix haute.</li>
    </ol>

    <h3>Le vote par gommettes (dot voting)</h3>
    <p>À utiliser quand le tableau porte plus de sujets que l'équipe ne peut en discuter. Prévoir environ 5 minutes.</p>
    <ol>
      <li>Donner à chaque personne le même nombre de gommettes, par exemple trois.</li>
      <li>Chacun colle ses gommettes sur les notes ou les groupes qu'il veut traiter. Deux gommettes sur la même note sont permises.</li>
      <li>Compter les gommettes et garder le premier ou les deux premiers sujets.</li>
    </ol>
    <p>Sur un mur, les derniers votants voient les premières gommettes. Certains tableaux blancs en ligne ont un mode vote qui masque les votes jusqu'au décompte.</p>

    <h3>ROTI, pour clore la séance</h3>
    <p>ROTI signifie «&nbsp;return on time invested&nbsp;», le retour sur le temps investi. À utiliser dans les 5 dernières minutes pour noter la rétrospective elle-même. Derby et Larsen décrivent l'activité dans leur livre, avec une échelle de 0 à 4.</p>
    <ol>
      <li>Expliquer l'échelle&nbsp;: 0 veut dire «&nbsp;aucun bénéfice pour le temps investi&nbsp;», 2 «&nbsp;un bénéfice égal au temps investi&nbsp;», 4 «&nbsp;un bénéfice supérieur au temps investi&nbsp;».</li>
      <li>Chacun montre un nombre de doigts au même moment, du poing fermé pour 0 à quatre doigts.</li>
      <li>Demander à ceux qui ont montré 0 ou 1 ce qu'ils attendaient et n'ont pas obtenu.</li>
      <li>Noter la moyenne à côté de la date et la comparer à celle des rétrospectives précédentes.</li>
    </ol>

    <h2>Idées de rétrospective pour une équipe à distance</h2>
    <ul>
      <li>Utiliser un tableau blanc en ligne avec une colonne par catégorie, préparé avant la réunion.</li>
      <li>Faire écrire tout le monde pendant 5 minutes, notes masquées, puis tout révéler d'un coup&nbsp;: la première note lue n'oriente pas les autres.</li>
      <li>Tenir la réunion en 60 minutes, et ajouter une pause de 5 minutes si elle dépasse 90.</li>
      <li>Nommer un animateur qui n'est pas la personne qui prend les notes.</li>
      <li>Pour une équipe répartie sur plusieurs fuseaux horaires, ouvrir le tableau 24 heures avant pour l'écriture et garder l'appel pour regrouper, voter et décider.</li>
      <li>Remplacer les doigts du ROTI par un chiffre tapé dans le chat et envoyé au signal.</li>
    </ul>

    <h2>Les erreurs fréquentes en rétrospective</h2>
    <ul>
      <li><strong>Repartir sans action.</strong> Une rétrospective qui se termine sur une liste de plaintes ne change rien au sprint suivant. Chaque action a un responsable et une date.</li>
      <li><strong>Reprendre le même format à chaque sprint.</strong> Quand les mêmes notes reviennent d'un sprint à l'autre, changer de format&nbsp;: un autre pose d'autres questions à l'équipe.</li>
      <li><strong>Inviter un manager dont la présence fait taire l'équipe.</strong> Le Guide Scrum cite l'équipe Scrum comme participants. Quand la personne qui mène les entretiens annuels est dans la salle, les problèmes ne se disent pas.</li>
      <li><strong>Prendre trop d'actions.</strong> Une équipe qui repart avec huit actions les termine rarement. En garder une ou deux, et ouvrir la rétrospective suivante en les vérifiant.</li>
    </ul>
    <p>Une action qui demande du développement passe au sprint planning suivant, où l'équipe peut l'estimer en <a href="/fr/planning-poker">poker planning</a>.</p>

    <h2>FAQ</h2>
    <h3>Quelles sont les 5 étapes d'une rétrospective&nbsp;?</h3>
    <p>Poser le cadre, collecter les données, faire émerger les causes, décider des actions, clore la rétrospective. Esther Derby et Diana Larsen ont décrit ces cinq phases dans «&nbsp;Agile Retrospectives: Making Good Teams Great&nbsp;», paru en 2006.</p>
    <h3>Combien de temps dure une rétrospective de sprint&nbsp;?</h3>
    <p>Le Guide Scrum de 2020 fixe un maximum de trois heures pour un sprint d'un mois et précise que l'événement est en général plus court pour un sprint plus court. À titre d'exemple, une équipe en sprints de deux semaines peut réserver 60 à 90 minutes&nbsp;; le guide ne donne pas de chiffre pour cette durée de sprint.</p>
    <h3>Qui participe à la rétrospective de sprint&nbsp;?</h3>
    <p>L'équipe Scrum&nbsp;: les développeurs, le product owner et le scrum master. Le Guide Scrum ne cite aucun autre participant. Un manager ou une partie prenante vient seulement si l'équipe l'invite.</p>
    <h3>Quelle est la différence entre la revue de sprint et la rétrospective&nbsp;?</h3>
    <p>La revue de sprint inspecte le produit&nbsp;: l'équipe Scrum montre le résultat du sprint aux parties prenantes, pendant quatre heures au maximum pour un sprint d'un mois. La rétrospective vient après et inspecte la façon de travailler de l'équipe, pendant trois heures au maximum.</p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une salle de poker planning</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/story-points">les story points</a>,
      <a href="/fr/estimation-agile">l'estimation agile</a>.
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
