<script lang="ts">
  import type { Matrix } from '#lib/raci.ts';
  import { matrixOf, shown } from '#lib/raci.ts';
  import RaciGenerator from '#lib/RaciGenerator.svelte';

  const SITE = matrixOf('Mise en ligne d\'un site vitrine', ['Chef de projet', 'Designer', 'Développeur', 'Client'], [
    ['Rédiger le cahier des charges', 'R C C A'],
    ['Créer les maquettes', 'A R C I'],
    ['Développer les pages', 'A C R I'],
    ['Mettre le site en ligne', 'A I R I'],
  ]);

  const LOGICIEL = matrixOf('Projet logiciel', ['Product manager', 'Tech lead', 'Développeurs', 'Testeur'], [
    ['Rédiger la spécification', 'AR C C I'],
    ['Développer la fonctionnalité', 'I A R I'],
    ['Relire le code', '- A R -'],
    ['Tester avant livraison', 'I I C AR'],
    ['Mettre en production', 'I A R C'],
  ]);

  const SCRUM = matrixOf('Sprint Scrum', ['Product Owner', 'Scrum Master', 'Developers', 'Parties prenantes'], [
    ['Ordonner le Product Backlog', 'AR - C C'],
    ['Sprint Planning', 'R R AR C'],
    ['Estimer les éléments du backlog', 'C - AR -'],
    ['Daily Scrum', '- - AR -'],
    ['Sprint Review', 'AR R R C'],
    ['Sprint Retrospective', 'R AR R -'],
  ]);

  const LANCEMENT = matrixOf('Lancement d\'un produit', ['Chef de produit', 'Marketing', 'Commercial', 'Support'], [
    ['Fixer la date et le périmètre', 'AR C C I'],
    ['Rédiger la page produit et l\'annonce', 'A R C I'],
    ['Former l\'équipe commerciale', 'R C A I'],
    ['Préparer les pages d\'aide', 'C - I AR'],
    ['Publier l\'annonce', 'I AR I I'],
  ]);

  const EXEMPLES = [
    { id: 'exemple-logiciel', titre: 'Un projet logiciel', matrice: LOGICIEL },
    { id: 'exemple-scrum', titre: 'Un sprint Scrum', matrice: SCRUM },
    { id: 'exemple-lancement', titre: 'Le lancement d\'un produit', matrice: LANCEMENT },
  ];

  const FAQ = [
    {
      q: 'Que veut dire RACI\u00A0?',
      r: 'RACI est un sigle anglais\u00A0: Responsible, Accountable, Consulted, Informed. En français\u00A0: Réalisateur, Approbateur, Consulté, Informé. Le R fait la tâche, le A répond du résultat, le C donne son avis avant la décision, le I est prévenu après.',
    },
    {
      q: 'Quelle différence entre R et A\u00A0?',
      r: 'Le R fait le travail. Le A répond du résultat et le valide. Une tâche peut avoir plusieurs R, elle a un seul A. Quand la même personne fait le travail et en répond, sa case porte A/R.',
    },
    {
      q: 'Peut-on avoir plusieurs A\u00A0?',
      r: 'Non. Une tâche a un seul A. Avec deux A, personne ne sait qui tranche en cas de désaccord. Si deux personnes valident le travail, gardez en A celle qui répond du résultat et passez l\'autre en C.',
    },
    {
      q: 'RACI ou RASCI\u00A0?',
      r: 'RASCI ajoute une lettre, S pour Support\u00A0: une personne qui aide le R à faire la tâche sans en répondre. Si personne ne tient ce rôle dans votre projet, les quatre lettres de RACI suffisent.',
    },
    {
      q: 'Comment faire une matrice RACI sur Excel\u00A0?',
      r: 'Remplissez la matrice dans le générateur de cette page, cliquez sur «\u00A0Télécharger en CSV\u00A0», puis ouvrez le fichier dans Excel. Le fichier est en UTF-8 avec BOM et séparé par des points-virgules\u00A0: un Excel réglé en français l\'ouvre en colonnes, accents compris. Dans une feuille vide, mettez une tâche par ligne, un rôle par colonne et une lettre par case.',
    },
  ];

  const sansSoudure = (texte: string) => texte.replaceAll('\u00A0', ' ');

  let generateur: { load: (matrice: Matrix) => void };
</script>

<svelte:head>
  <title>Matrice RACI&nbsp;: définition, exemple et modèle à remplir</title>
  <meta name="description" content="Matrice RACI&nbsp;: définition des quatre lettres, règles, trois exemples remplis et un tableau RACI à compléter en ligne, avec export CSV pour Excel et Markdown." />
  <link rel="canonical" href="https://pokeragile.com/fr/matrice-raci" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/matrice-raci" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/raci-matrix" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/raci-matrix" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fr/matrice-raci" />
  <meta property="og:title" content="Matrice RACI&nbsp;: définition, exemple et modèle à remplir" />
  <meta property="og:description" content="Les quatre lettres de la matrice RACI, ses règles, trois exemples remplis et un tableau à compléter en ligne, avec export CSV et Markdown." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Matrice RACI : définition, exemple et modèle à remplir',
    url: 'https://pokeragile.com/fr/matrice-raci',
    inLanguage: 'fr',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({
      '@type': 'Question',
      name: sansSoudure(q),
      acceptedAnswer: { '@type': 'Answer', text: sansSoudure(r) },
    })),
  })}<\/script>`}
</svelte:head>

{#snippet tableau(matrice: Matrix)}
  <div class="table-wrap">
  <table>
    <caption>{matrice.title}</caption>
    <thead>
      <tr>
        <th scope="col">Tâche</th>
        {#each matrice.roles as role (role)}<th scope="col">{role}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each matrice.tasks as tache, t (tache)}
        <tr>
          <th scope="row">{tache}</th>
          {#each matrice.cells[t] as lettre, r (r)}<td>{shown(lettre)}</td>{/each}
        </tr>
      {/each}
    </tbody>
  </table>
  </div>
{/snippet}

<div class="page container">
  <main id="main">
    <a href="/fr/guides" class="back-link">Guides</a>

    <h1>Matrice RACI&nbsp;: définition, exemple et modèle à remplir</h1>

    <p class="lead">Une matrice RACI est un tableau&nbsp;: une tâche par ligne, un rôle par colonne, une lettre par case.</p>

    <ul class="lettres">
      <li><strong>R, Réalisateur</strong> (Responsible)&nbsp;: fait le travail.</li>
      <li><strong>A, Approbateur</strong> (Accountable)&nbsp;: répond du résultat, un seul par tâche.</li>
      <li><strong>C, Consulté</strong> (Consulted)&nbsp;: donne son avis avant, l'échange va dans les deux sens.</li>
      <li><strong>I, Informé</strong> (Informed)&nbsp;: tenu au courant après, l'information va dans un seul sens.</li>
    </ul>

    {@render tableau(SITE)}
    <p>Deuxième ligne du tableau&nbsp;: le designer crée les maquettes, le chef de projet les valide, le développeur donne son avis avant, le client est prévenu après.</p>
    <p>On lit aussi «&nbsp;Responsable&nbsp;» pour le R et «&nbsp;Autorité&nbsp;» pour le A. Cette page écrit Réalisateur, parce que «&nbsp;responsable&nbsp;» désigne aussi, en français, celui qui répond du résultat, c'est-à-dire le A. Tableau RACI, diagramme RACI et méthode RACI désignent ce même tableau.</p>

    <RaciGenerator bind:this={generateur} lang="fr" initial={SITE} />

    <h2>Exporter et partager la matrice</h2>
    <ul>
      <li><strong>Markdown</strong>&nbsp;: «&nbsp;Copier en Markdown&nbsp;» place un tableau dans le presse-papiers. Il se colle dans une issue GitHub ou GitLab, un fichier README ou un wiki.</li>
      <li><strong>CSV</strong>&nbsp;: le fichier est en UTF-8 avec BOM, séparé par des points-virgules. Un Excel réglé en français l'ouvre en colonnes, accents compris. LibreOffice Calc et Google Sheets le lisent aussi.</li>
      <li><strong>Impression</strong>&nbsp;: «&nbsp;Imprimer&nbsp;» sort le titre et la grille, sans le reste de la page. La fenêtre d'impression du navigateur l'enregistre aussi en PDF.</li>
      <li><strong>Lien</strong>&nbsp;: l'adresse de la page contient la matrice, après le signe #. Le navigateur n'envoie pas cette partie de l'adresse au serveur. «&nbsp;Copier le lien&nbsp;» donne une adresse qui rouvre la même matrice.</li>
    </ul>

    <h2>Les règles d'une matrice RACI</h2>
    <ol>
      <li><strong>Chaque tâche a un A, et un seul.</strong> C'est la personne qui tranche et qui signe le résultat.</li>
      <li><strong>Chaque tâche a au moins un R.</strong> Sans R, personne ne fait le travail.</li>
      <li><strong>Le A peut aussi être R.</strong> La même personne fait le travail et en répond&nbsp;: sa case porte A/R.</li>
      <li><strong>Une tâche a peu de C.</strong> Chaque C est un avis à recueillir avant de décider. Une personne dont la réponse peut changer la décision est C, les autres sont I.</li>
      <li><strong>Un I ne valide rien.</strong> Il reçoit l'information une fois la décision prise et la tâche n'attend pas sa réponse.</li>
      <li><strong>Les personnes nommées relisent la matrice.</strong> Elle est validée avec elles au début du projet, en atelier ou en réunion de lancement.</li>
      <li><strong>La matrice suit le projet.</strong> Elle est corrigée quand une personne arrive, part ou change de rôle, et quand le périmètre change.</li>
    </ol>
    <p>Le générateur contrôle les deux premières règles à chaque modification. Il signale aussi une colonne sans aucune lettre&nbsp;: ce rôle n'a pas de place dans le tableau, ou une ligne manque.</p>

    <h2>Construire sa matrice RACI en six étapes</h2>
    <ol>
      <li>Listez les tâches ou les livrables du projet, un par ligne. Écrivez un verbe et un objet&nbsp;: «&nbsp;Rédiger la spécification&nbsp;», pas «&nbsp;Spécification&nbsp;».</li>
      <li>Listez les rôles en colonnes. Un rôle («&nbsp;Tech lead&nbsp;») tient plus longtemps qu'un nom. Un nom évite de se demander qui tient le rôle.</li>
      <li>Placez le A de chaque ligne en premier.</li>
      <li>Placez les R, puis les C, puis les I. Une case peut rester vide.</li>
      <li>Relisez chaque ligne&nbsp;: un A, au moins un R. Relisez chaque colonne&nbsp;: au moins une lettre.</li>
      <li>Envoyez le lien de la matrice aux personnes nommées et corrigez-la avec elles.</li>
    </ol>

    <h2>Trois exemples de matrice RACI</h2>
    {#each EXEMPLES as exemple (exemple.id)}
      <h3 id={exemple.id}>{exemple.titre}</h3>
      {@render tableau(exemple.matrice)}
      {#if exemple.matrice === LOGICIEL}
        <p>Sur la ligne «&nbsp;Relire le code&nbsp;», le tech lead est A et les développeurs sont R. Le product manager et le testeur n'y ont pas de lettre. Sur la ligne «&nbsp;Tester avant livraison&nbsp;», le testeur fait les tests et en répond&nbsp;: sa case porte A/R.</p>
      {/if}
      {#if exemple.matrice === LANCEMENT}
        <p>Sur la ligne «&nbsp;Former l'équipe commerciale&nbsp;», le chef de produit donne la formation (R) et le commercial en répond (A). Le support est I sur quatre lignes et A/R sur les pages d'aide.</p>
      {/if}
      {#if exemple.matrice === SCRUM}
        <p>Le <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">Guide Scrum de 2020</a> définit trois redevabilités (accountabilities), pas une matrice RACI&nbsp;: ce tableau en est une lecture. Quatre lignes viennent du guide. Le Product Owner répond de la gestion du Product Backlog, dont son ordre. Les Developers répondent du plan du sprint et dimensionnent les éléments du backlog. Le Daily Scrum est un événement de 15&nbsp;minutes pour les Developers. Le Scrum Master répond de l'efficacité de l'équipe Scrum, que la rétrospective inspecte. Le guide ne nomme pas de A pour la Sprint Review&nbsp;: ce tableau le donne au Product Owner, qui répond de la valeur du produit.</p>
      {/if}
      <p><button type="button" class="btn btn-secondary" onclick={() => generateur.load(exemple.matrice)}>Charger cet exemple dans le générateur</button></p>
    {/each}

    <h2>RASCI, RACI-VS, DACI, RAPID&nbsp;: les variantes</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th scope="col">Sigle</th><th scope="col">Lettres</th><th scope="col">Ce qui change</th></tr></thead>
      <tbody>
        <tr><th scope="row">RASCI</th><td>Responsible, Accountable, Support, Consulted, Informed</td><td>Le S aide le R à faire la tâche. S'écrit aussi RASIC.</td></tr>
        <tr><th scope="row">RACI-VS</th><td>RACI, Verifier, Signatory</td><td>Le V vérifie le livrable par rapport aux critères d'acceptation, le S signe la livraison.</td></tr>
        <tr><th scope="row">DACI</th><td>Driver, Approver, Contributors, Informed</td><td>Sert à prendre une décision&nbsp;: le D la pilote, un seul A la prend.</td></tr>
        <tr><th scope="row">RAPID</th><td>Recommend, Agree, Perform, Input, Decide</td><td>Outil de décision du cabinet Bain &amp; Company&nbsp;: le D décide, le P exécute.</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Les erreurs fréquentes</h2>
    <ul>
      <li><strong>Plusieurs A sur une tâche.</strong> En cas de désaccord, personne ne sait qui tranche. Gardez en A la personne qui signe le résultat et passez les autres en C.</li>
      <li><strong>Aucun R.</strong> La tâche est validée par quelqu'un et faite par personne. Nommez un R avant de passer à la ligne suivante.</li>
      <li><strong>Tout le monde en C.</strong> Avec six C, une décision attend six avis. Passez en I les personnes dont l'avis ne change pas la décision.</li>
      <li><strong>Trop de lignes.</strong> Chaque ligne en plus est une ligne à relire et à tenir à jour. Regroupez les tâches par livrable&nbsp;: le générateur s'arrête à 30&nbsp;tâches.</li>
      <li><strong>Une matrice jamais mise à jour.</strong> Elle décrit l'équipe du jour où elle a été écrite. Relisez-la à chaque arrivée, à chaque départ et à chaque changement de périmètre.</li>
    </ul>

    <h2>D'où vient la matrice RACI&nbsp;?</h2>
    <p>La matrice RACI est une matrice d'affectation des responsabilités, en anglais responsibility assignment matrix ou RAM. Le Guide PMBOK du Project Management Institute décrit cette matrice et donne le tableau RACI comme exemple. Le référentiel ITIL, pour la gestion des services informatiques, utilise aussi RACI.</p>

    <h2 id="faq">Questions fréquentes</h2>
    {#each FAQ as { q, r } (q)}
      <h3>{q}</h3>
      <p>{r}</p>
    {/each}

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/guides">tous les guides</a>,
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/retrospective">les formats de rétrospective</a>,
      <a href="/fr/story-points">les story points</a>.
      PokerAgile est une application gratuite de poker planning, sur ce même site.
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
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 0.75rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  h3 { margin-top: 1.25rem; margin-bottom: 0.25rem; font-size: 1rem; }

  p, li { line-height: 1.7; }
  p + p { margin-top: 0.5rem; }

  .lead { font-size: 1.05rem; color: var(--color-text-muted); margin-bottom: 0.75rem; }

  ul, ol {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .lettres {
    list-style: none;
    padding-left: 0;
    gap: 0;
  }

  .lettres li { line-height: 1.5; }

  .table-wrap { overflow-x: auto; margin: 0.75rem 0; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  caption {
    caption-side: top;
    text-align: left;
    font-weight: 600;
    padding-bottom: 0.25rem;
  }

  th, td {
    padding: 0.4rem 0.5rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  thead th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tbody th { font-weight: 600; }

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
