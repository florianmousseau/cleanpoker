<svelte:head>
  <title>T-shirt sizing&nbsp;: tailles, story points, déroulé | PokerAgile</title>
  <meta name="description" content="T-shirt sizing en agile&nbsp;: les six tailles de XS à XXL, quand elles remplacent les chiffres, le déroulé d'une séance et un exemple de conversion en points." />
  <link rel="canonical" href="https://pokeragile.com/fr/t-shirt-sizing" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/t-shirt-sizing" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/t-shirt-sizing" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/t-shirt-sizing" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fr/t-shirt-sizing" />
  <meta property="og:title" content="T-shirt sizing&nbsp;: tailles, story points, déroulé" />
  <meta property="og:description" content="T-shirt sizing en agile&nbsp;: les six tailles de XS à XXL, quand elles remplacent les chiffres, le déroulé d'une séance et un exemple de conversion en points." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'T-shirt sizing : estimer en XS, S, M, L, XL et XXL',
    url: 'https://pokeragile.com/fr/t-shirt-sizing',
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
        name: 'Quelles sont les tailles de T-shirt en estimation agile ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Six tailles : XS, S, M, L, XL et XXL. Elles classent les éléments du backlog par taille relative. Chaque équipe les définit avec un élément de référence par taille, et aucune taille ne vaut un nombre fixe de jours.' },
      },
      {
        '@type': 'Question',
        name: 'Comment convertir des tailles de T-shirt en story points ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Il n\'existe pas de conversion standard. Une équipe peut adopter sa propre table, par exemple XS = 1, S = 2, M = 3, L = 5, XL = 8 et XXL = 13, et l\'appliquer quand un élément entre dans un sprint. Un élément en XXL est découpé avant d\'être converti.' },
      },
      {
        '@type': 'Question',
        name: 'Peut-on mesurer la vélocité avec des tailles de T-shirt ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. La vélocité est la somme des points terminés par sprint, et les tailles ne s\'additionnent pas. Une équipe qui a besoin de la vélocité convertit ses tailles en points, ou estime directement en points les stories de ses sprints.' },
      },
      {
        '@type': 'Question',
        name: 'Le T-shirt sizing est-il la même chose que le planning poker ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Le T-shirt sizing est une échelle, et le planning poker est une façon de voter. Une équipe qui vote ses tailles en secret et les révèle ensemble joue au planning poker avec un jeu T-shirt. C\'est ce que fait le jeu « T-shirt » de PokerAgile.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>T-shirt sizing&nbsp;: estimer en XS, S, M, L, XL et XXL</h1>

    <p class="lead">
    Le T-shirt sizing est une technique d'estimation relative&nbsp;: l'équipe range les éléments du backlog dans six tailles, XS, S, M, L, XL et XXL, au lieu de leur donner un chiffre. Une taille dit si un élément est plus gros ou plus petit que les autres. Elle ne dit pas combien de jours il prendra.
    </p>

    <h2>Le sens d'une taille</h2>
    <p>Les six tailles sont ordonnées&nbsp;: un L est plus gros qu'un M. Elles ne sont pas proportionnelles&nbsp;: rien dans l'échelle ne dit qu'un L vaut deux M, et deux tailles ne s'additionnent pas. Chaque équipe donne leur sens aux tailles en choisissant un élément de référence par taille. Le M d'une équipe peut donc être le L d'une autre.</p>

    <h2>Quand les tailles de T-shirt marchent mieux que les chiffres</h2>
    <ul>
    <li><strong>Une feuille de route ou un plan trimestriel.</strong> Un élément décrit en une phrase peut être dit petit, moyen ou gros. Choisir entre un 5 et un 8 demande des détails que personne n'a encore écrits.</li>
    <li><strong>Les epics.</strong> Un epic reçoit une taille avant d'être découpé. Ses stories reçoivent des story points après le découpage.</li>
    <li><strong>Une équipe nouvelle.</strong> Elle n'a pas encore de vélocité, donc les points ne permettent aucune prévision. Les tailles suffisent pour ordonner son premier backlog.</li>
    <li><strong>Des parties prenantes non techniques.</strong> Un responsable commercial ou marketing peut voter S ou L sans apprendre ce qu'est un story point.</li>
    </ul>

    <h2>Quand il faut des chiffres</h2>
    <ul>
    <li><strong>La vélocité.</strong> La vélocité est la somme des points terminés pendant un sprint. Deux M et un L n'ont pas de somme.</li>
    <li><strong>La capacité d'un sprint.</strong> Une équipe qui termine 23 points par sprint peut vérifier que son plan de sprint totalise environ 23. Les tailles ne donnent rien à additionner.</li>
    <li><strong>Une date.</strong> 140 points à 23 points par sprint font environ 6 sprints. Le même backlog en tailles ne donne aucune date tant que les tailles ne sont pas converties.</li>
    </ul>
    <p>La <a href="/fr/story-points">page sur les story points</a> détaille la vélocité et la prévision.</p>

    <h2>Mener une séance de T-shirt sizing avec PokerAgile</h2>
    <ol>
    <li>Ouvrez la <a href="/fr?cards=XS,S,M,L,XL,XXL,?">page d'accueil de PokerAgile</a> et cliquez sur le jeu «&nbsp;T-shirt&nbsp;». Les cartes sont XS, S, M, L, XL, XXL et «&nbsp;?&nbsp;».</li>
    <li>Créez la salle et envoyez son lien à l'équipe. Un nom suffit pour la rejoindre.</li>
    <li>Avant le premier vote, choisissez ensemble un élément que tout le monde connaît et appelez-le M.</li>
    <li>Lisez l'élément à estimer et répondez aux questions.</li>
    <li>Chacun choisit une taille en secret. La carte «&nbsp;?&nbsp;» veut dire «&nbsp;je ne sais pas&nbsp;».</li>
    <li>Révélez les cartes. La salle affiche l'accord, c'est-à-dire la part des votes sur la taille la plus choisie, et une barre par taille avec son nombre de votes. Elle n'affiche pas de moyenne, car les tailles ne sont pas des nombres.</li>
    <li>Si les tailles diffèrent, la personne qui a voté la plus petite et celle qui a voté la plus grande expliquent leur choix, puis l'équipe revote.</li>
    <li>Retenez une taille. Si vous avez collé une liste d'éléments dans la salle, la taille retenue reste à côté de chaque élément. La liste se télécharge en CSV ou se copie en Markdown.</li>
    </ol>

    <h2>Exemple&nbsp;: cinq éléments de feuille de route estimés par cinq personnes</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Élément</th><th>Votes au premier tour</th><th>Accord</th><th>Taille retenue</th></tr></thead>
    <tbody>
    <tr><td>Renommer la page de facturation</td><td>XS, XS, XS, XS, S</td><td>80&nbsp;%</td><td>XS</td></tr>
    <tr><td>Mode sombre</td><td>S, S, M, M, M</td><td>60&nbsp;%</td><td>M</td></tr>
    <tr><td>Export des factures en CSV</td><td>M, M, M, M, M</td><td>100&nbsp;%</td><td>M</td></tr>
    <tr><td>Connexion unique (SSO) pour les comptes d'entreprise</td><td>L, XL, XL, XL, XXL</td><td>60&nbsp;%</td><td>XL</td></tr>
    <tr><td>Application mobile</td><td>XL, XXL, XXL, XXL, XXL</td><td>80&nbsp;%</td><td>XXL</td></tr>
    </tbody>
    </table>
    </div>
    <p>Sur le mode sombre, les deux personnes qui ont voté S n'avaient pas compté les 40 écrans à vérifier un par un. Au second tour, les cinq cartes affichent M. Sur la connexion unique, les personnes qui ont voté L et XXL expliquent leur carte. Le second tour donne quatre XL et un XXL. L'application mobile reste en XXL et retourne chez le product owner pour être découpée avant tout sprint.</p>

    <h2>Convertir les tailles de T-shirt en story points&nbsp;: un exemple</h2>
    <p>Il n'existe pas de conversion standard. La table ci-dessous est le choix d'une équipe, construit sur les cartes de Fibonacci. Une autre équipe peut retenir d'autres valeurs.</p>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Taille</th><th>Story points</th><th>Élément de référence de cette équipe</th></tr></thead>
    <tbody>
    <tr><td>XS</td><td>1</td><td>Corriger le libellé d'un bouton</td></tr>
    <tr><td>S</td><td>2</td><td>Ajouter un champ facultatif à un formulaire</td></tr>
    <tr><td>M</td><td>3</td><td>Ajouter un champ téléphone au formulaire de profil, avec sa validation</td></tr>
    <tr><td>L</td><td>5</td><td>Exporter les commandes en CSV</td></tr>
    <tr><td>XL</td><td>8</td><td>Ajouter une recherche et des filtres à la liste des commandes</td></tr>
    <tr><td>XXL</td><td>13</td><td>Payer par carte chez un nouveau prestataire</td></tr>
    </tbody>
    </table>
    </div>
    <p>Une équipe qui adopte une table de ce genre convertit une seule fois, quand un élément entre dans un sprint. Un epic en XXL est d'abord découpé, puis chacune de ses stories est estimée en points. Le 13 de la table est abandonné à ce moment-là.</p>

    <h2>Les erreurs fréquentes avec les tailles de T-shirt</h2>
    <ul>
    <li><strong>Lire une taille comme une durée.</strong> «&nbsp;M = une semaine&nbsp;» change une taille relative en échéance.</li>
    <li><strong>Additionner des tailles.</strong> «&nbsp;Trois S font un L&nbsp;» est un calcul que l'échelle ne contient pas.</li>
    <li><strong>Ajouter XXS et XXXL.</strong> Avec huit tailles, l'équipe recommence à hésiter entre deux cartes voisines, ce que six tailles évitent.</li>
    <li><strong>Laisser un XXL entrer dans un sprint.</strong> La plus grande taille veut dire «&nbsp;découpez cet élément&nbsp;», comme un 21 dans un jeu Fibonacci.</li>
    <li><strong>Comparer deux équipes.</strong> Chaque équipe a ses éléments de référence, donc son propre M.</li>
    <li><strong>Garder les deux échelles sur un même élément.</strong> Un élément qui porte un M et un 5 a deux estimations à tenir à jour.</li>
    </ul>

    <h2>Tailles de T-shirt ou story points Fibonacci</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Critère</th><th>Tailles de T-shirt</th><th>Story points Fibonacci</th></tr></thead>
    <tbody>
    <tr><td>Cartes dans PokerAgile</td><td>XS, S, M, L, XL, XXL,&nbsp;?</td><td>1, 2, 3, 5, 8, 13, 21,&nbsp;?</td></tr>
    <tr><td>Les valeurs s'additionnent</td><td>Non</td><td>Oui</td></tr>
    <tr><td>Vélocité</td><td>Impossible à calculer</td><td>Somme des points terminés par sprint</td></tr>
    <tr><td>Objet habituel</td><td>Epics, éléments de feuille de route</td><td>User stories d'un sprint</td></tr>
    <tr><td>Affiché à la révélation dans PokerAgile</td><td>Accord, votes par taille</td><td>Moyenne, médiane, minimum, maximum, accord, votes par carte</td></tr>
    <tr><td>Prévoir une date</td><td>Après conversion en points</td><td>Points du backlog divisés par la vélocité</td></tr>
    </tbody>
    </table>
    </div>

    <h2>Questions fréquentes</h2>
    <h3>Quelles sont les tailles de T-shirt en estimation agile&nbsp;?</h3>
    <p>Six tailles&nbsp;: XS, S, M, L, XL et XXL. Elles classent les éléments du backlog par taille relative. Chaque équipe les définit avec un élément de référence par taille, et aucune taille ne vaut un nombre fixe de jours.</p>
    <h3>Comment convertir des tailles de T-shirt en story points&nbsp;?</h3>
    <p>Il n'existe pas de conversion standard. Une équipe peut adopter sa propre table, par exemple XS = 1, S = 2, M = 3, L = 5, XL = 8 et XXL = 13, et l'appliquer quand un élément entre dans un sprint. Un élément en XXL est découpé avant d'être converti.</p>
    <h3>Peut-on mesurer la vélocité avec des tailles de T-shirt&nbsp;?</h3>
    <p>Non. La vélocité est la somme des points terminés par sprint, et les tailles ne s'additionnent pas. Une équipe qui a besoin de la vélocité convertit ses tailles en points, ou estime directement en points les stories de ses sprints.</p>
    <h3>Le T-shirt sizing est-il la même chose que le planning poker&nbsp;?</h3>
    <p>Non. Le T-shirt sizing est une échelle, et le planning poker est une façon de voter. Une équipe qui vote ses tailles en secret et les révèle ensemble joue au planning poker avec un jeu T-shirt. C'est ce que fait le jeu «&nbsp;T-shirt&nbsp;» de PokerAgile.</p>

    <div class="cta">
      <a href="/fr?cards=XS,S,M,L,XL,XXL,?" class="btn">Créer une salle avec le jeu T-shirt</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/story-points">les story points</a>,
      <a href="/fr/fibonacci">la suite de Fibonacci</a>,
      <a href="/fr/alternatives">les alternatives au poker planning</a>,
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/scrum-poker">le scrum poker en ligne</a>.
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
