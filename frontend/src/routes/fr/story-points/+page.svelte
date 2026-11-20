<svelte:head>
  <title>Story points&nbsp;: définition, Fibonacci et estimation | PokerAgile</title>
  <meta name="description" content="Story points&nbsp;: définition, échelle de Fibonacci, calibrage, estimation en poker planning, vélocité et conversion en heures, avec un exemple chiffré." />
  <link rel="canonical" href="https://pokeragile.com/fr/story-points" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/story-points" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/story-points" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/story-points" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Story points : définition, échelle de Fibonacci et estimation',
    url: 'https://pokeragile.com/fr/story-points',
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
        name: 'Un story point correspond à combien d\'heures ?',
        acceptedAnswer: { '@type': 'Answer', text: 'À aucun nombre fixe. Un story point compare la taille d\'une story à celle d\'une story de référence de la même équipe. La durée se lit dans la vélocité : une équipe qui termine 23 points par sprint de deux semaines livrera un lot de 46 points en deux sprints environ, soit quatre semaines.' },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi les story points suivent-ils la suite de Fibonacci ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Parce que l\'écart entre deux cartes grandit avec la taille : 1 point entre 2 et 3, 8 points entre 13 et 21. Plus une story est grosse, moins son estimation est précise, et l\'échelle retire les valeurs intermédiaires qu\'une équipe ne sait pas distinguer.' },
      },
      {
        '@type': 'Question',
        name: 'Comment calculer les story points d\'une user story ?',
        acceptedAnswer: { '@type': 'Answer', text: 'On ne les calcule pas, on les compare. L\'équipe choisit une story de référence, par exemple à 3 points, puis chacun vote en secret pour dire si la nouvelle story est plus petite, équivalente ou plus grosse. La carte retenue après discussion est l\'estimation.' },
      },
      {
        '@type': 'Question',
        name: 'Peut-on comparer la vélocité de deux équipes ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Chaque équipe a sa propre story de référence, donc son propre point. Une équipe à 60 points par sprint ne livre pas forcément plus qu\'une équipe à 30. La vélocité sert à prévoir les prochains sprints de l\'équipe qui l\'a mesurée.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Story points&nbsp;: définition, échelle de Fibonacci et estimation</h1>

    <p class="lead">
      Un story point est une unité de taille relative&nbsp;: il compare une user story à une autre story de la même équipe, sans passer par les heures. Les cartes les plus courantes valent 1, 2, 3, 5, 8, 13 et 21.
    </p>

    <h2>Qu'est-ce qu'un story point&nbsp;?</h2>
    <p>Un story point mesure la taille d'une user story par rapport aux autres stories du backlog. Trois éléments entrent dans le chiffre&nbsp;:</p>
    <ul>
      <li><strong>L'effort</strong>&nbsp;: la quantité de travail à fournir, tests et revue de code compris. Quand un agent IA écrit une partie du code, la relecture et la vérification du résultat restent dans la carte.</li>
      <li><strong>La complexité</strong>&nbsp;: le nombre de cas à traiter et de composants à modifier.</li>
      <li><strong>L'incertitude</strong>&nbsp;: ce que l'équipe ne sait pas encore, par exemple une API qu'elle n'a jamais appelée.</li>
    </ul>
    <p>Une story à 2 points est jugée deux fois plus grosse qu'une story à 1 point. Le chiffre ne dit pas qu'elle prendra deux jours.</p>
    <p>L'unité vient de l'Extreme Programming, à la fin des années 1990. Ron Jeffries, l'un des fondateurs de la méthode, a <a href="https://ronjeffries.com/articles/019-01ff/story-points/Index.html" rel="noopener noreferrer">écrit en 2019</a> qu'il en était peut-être l'inventeur. Le <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">Guide Scrum de 2020</a> ne cite ni les story points ni la vélocité&nbsp;: ce sont des pratiques d'équipe, pas des règles de Scrum.</p>

    <h2>Pourquoi les story points suivent la suite de Fibonacci</h2>
    <p>Dans la suite de Fibonacci, chaque valeur est la somme des deux précédentes&nbsp;: 1, 2, 3, 5, 8, 13, 21. À partir de 5, chaque carte vaut environ 60&nbsp;% de plus que la précédente (13 divisé par 8 donne 1,625). L'écart grandit donc avec la taille&nbsp;: 1 point entre 2 et 3, 8 points entre 13 et 21.</p>
    <p>Une équipe distingue une story à 2 d'une story à 3. Elle ne distingue pas une story à 18 d'une story à 19. Comme ces deux cartes n'existent pas, elle choisit entre 13 et 21, et la discussion porte sur l'ordre de grandeur. Une story estimée à 21 est en général découpée en stories plus petites avant d'entrer dans un sprint.</p>
    <p>Certains jeux de cartes utilisent une variante arrondie&nbsp;: 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. Par défaut, PokerAgile propose 1, 2, 3, 5, 8, 13, 21 et une carte «&nbsp;?&nbsp;» pour dire «&nbsp;je ne sais pas&nbsp;».</p>

    <h2>Comment une équipe calibre ses story points</h2>
    <ol>
      <li>Choisir une story déjà livrée, que toute l'équipe connaît, de taille moyenne.</li>
      <li>Lui donner 3 ou 5 points. Le chiffre est arbitraire&nbsp;: il laisse des cartes en dessous et au-dessus.</li>
      <li>Comparer chaque nouvelle story à cette référence&nbsp;: plus petite, équivalente ou plus grosse, et de combien.</li>
      <li>Garder deux ou trois stories de référence, par exemple une à 2, une à 5 et une à 13, et les relire au début de chaque séance.</li>
    </ol>

    <h2>Estimer en story points au poker planning, étape par étape</h2>
    <p>Le planning poker a été décrit par James Grenning en 2002, puis repris par Mike Cohn dans son livre «&nbsp;Agile Estimating and Planning&nbsp;» en 2005. Une séance suit six étapes&nbsp;:</p>
    <ol>
      <li>Une personne <a href="/fr">crée une salle PokerAgile</a> et envoie le lien à l'équipe. Aucun compte n'est demandé pour la rejoindre.</li>
      <li>Le product owner lit la story et répond aux questions.</li>
      <li>Chacun choisit une carte en secret.</li>
      <li>Les cartes sont révélées en même temps. Le premier chiffre annoncé n'influence donc pas les autres votes.</li>
      <li>Si les cartes diffèrent, la personne qui a voté le plus bas et celle qui a voté le plus haut expliquent leur choix.</li>
      <li>L'équipe revote. Si, après deux tours, les votes restent partagés entre deux cartes voisines, elle retient la plus haute.</li>
    </ol>
    <p>À la révélation, PokerAgile affiche la moyenne, la médiane, le minimum et le maximum des votes. La liste de stories garde la carte retenue pour chacune et se télécharge en CSV ou se copie en Markdown.</p>

    <h2>Convertir des story points en heures ou en jours</h2>
    <p>La conversion la plus répandue, «&nbsp;1 point = 1 jour&nbsp;», pose trois problèmes.</p>
    <ul>
      <li><strong>Un point contient de l'incertitude.</strong> Deux stories à 5 points peuvent prendre l'une 2 jours, l'autre 6.</li>
      <li><strong>La durée dépend de la personne.</strong> Une tâche de 4 heures pour quelqu'un qui connaît le module peut en demander 12 à quelqu'un qui le découvre.</li>
      <li><strong>L'échelle relative disparaît.</strong> Une fois la conversion affichée, l'équipe estime en jours puis traduit en points.</li>
    </ul>
    <p>Pour donner une date, passez par la vélocité&nbsp;: 46 points à 23 points par sprint de deux semaines font 2 sprints, soit 4 semaines. Le résultat vaut pour un lot de stories, pas pour une story seule.</p>

    <h2>Vélocité&nbsp;: prévoir avec les story points</h2>
    <p>La vélocité est le total des points des stories terminées pendant un sprint. Une story commencée mais non terminée compte pour zéro. Une équipe qui a terminé 21, 26 et 23 points sur ses trois derniers sprints a une vélocité moyenne d'environ 23 points. Avec un backlog de 140 points, il lui reste 6 sprints à son meilleur rythme (140 divisé par 26 donne 5,4) et 7 à son rythme le plus lent (140 divisé par 21 donne 6,7).</p>

    <h2>Les erreurs fréquentes avec les story points</h2>
    <ul>
      <li><strong>Comparer deux équipes.</strong> Chacune a sa story de référence. 30 points par sprint chez l'une et 60 chez l'autre ne disent pas laquelle livre le plus.</li>
      <li><strong>Faire des points un objectif de performance.</strong> Quand on demande à une équipe d'augmenter sa vélocité, un 3 devient un 5 à travail égal, et le chiffre ne sert plus à prévoir.</li>
      <li><strong>Réestimer après coup.</strong> Une story estimée à 3 qui a pris le double de temps reste à 3. La corriger après livraison efface l'écart que la vélocité moyenne absorbe déjà. On réestime seulement si le périmètre change avant le début du travail.</li>
      <li><strong>Faire voter ceux qui ne réalisent pas la story.</strong> Les cartes sont posées par les personnes qui développent et testent. Le product owner répond aux questions et ne vote pas.</li>
    </ul>

    <h2>Exemple&nbsp;: trois stories et leurs cartes</h2>
    <p>Une équipe de quatre personnes a pour référence la story «&nbsp;ajouter un champ téléphone au formulaire de profil&nbsp;», à 3 points.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Story</th><th>Votes au premier tour</th><th>Carte retenue</th></tr></thead>
      <tbody>
        <tr><td>Corriger le libellé d'un bouton</td><td>1, 1, 1, 2</td><td>1</td></tr>
        <tr><td>Exporter les commandes en CSV</td><td>3, 5, 5, 5</td><td>5</td></tr>
        <tr><td>Payer par carte chez un nouveau prestataire</td><td>5, 8, 13, 13</td><td>13</td></tr>
      </tbody>
    </table>
    </div>
    <p>Sur la première, la personne qui a voté 2 se range au 1 après une phrase d'explication, sans second tour. Sur la deuxième, la personne qui a voté 3 n'avait pas compté les tests de l'export&nbsp;; au second tour, les quatre cartes affichent 5. Sur la troisième, l'écart va de 5 à 13&nbsp;: les deux 13 viennent de personnes qui savent que l'équipe n'a jamais appelé l'API de ce prestataire. L'équipe retient 13. Le lot vaut 19 points, soit moins d'un sprint pour une équipe dont la vélocité est de 23.</p>

    <h2>Questions fréquentes</h2>
    <h3>Un story point correspond à combien d'heures&nbsp;?</h3>
    <p>À aucun nombre fixe. Un story point compare la taille d'une story à celle d'une story de référence de la même équipe. La durée se lit dans la vélocité&nbsp;: une équipe qui termine 23 points par sprint de deux semaines livrera un lot de 46 points en deux sprints environ, soit quatre semaines.</p>
    <h3>Pourquoi les story points suivent-ils la suite de Fibonacci&nbsp;?</h3>
    <p>Parce que l'écart entre deux cartes grandit avec la taille&nbsp;: 1 point entre 2 et 3, 8 points entre 13 et 21. Plus une story est grosse, moins son estimation est précise, et l'échelle retire les valeurs intermédiaires qu'une équipe ne sait pas distinguer.</p>
    <h3>Comment calculer les story points d'une user story&nbsp;?</h3>
    <p>On ne les calcule pas, on les compare. L'équipe choisit une story de référence, par exemple à 3 points, puis chacun vote en secret pour dire si la nouvelle story est plus petite, équivalente ou plus grosse. La carte retenue après discussion est l'estimation.</p>
    <h3>Peut-on comparer la vélocité de deux équipes&nbsp;?</h3>
    <p>Non. Chaque équipe a sa propre story de référence, donc son propre point. Une équipe à 60 points par sprint ne livre pas forcément plus qu'une équipe à 30. La vélocité sert à prévoir les prochains sprints de l'équipe qui l'a mesurée.</p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une salle</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/fibonacci">la suite de Fibonacci</a>,
      <a href="/fr/estimation-agile">l'estimation agile</a>,
      <a href="/fr/alternatives">les alternatives au poker planning</a>,
      <a href="/fr/planning-poker-ia">le planning poker avec une IA</a>.
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
