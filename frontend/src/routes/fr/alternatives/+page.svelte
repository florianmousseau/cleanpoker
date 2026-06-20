<svelte:head>
  <title>Alternatives au planning poker : tailles de T-shirt, dot voting et plus | CleanPoker</title>
  <meta name="description" content="Comparatif des meilleures alternatives au planning poker : tailles de T-shirt, affinity mapping, dot voting, bucket system. Quelle technique choisir ?" />
  <link rel="canonical" href="https://cleanpoker.dev/fr/alternatives" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/alternatives" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/alternatives" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/alternatives" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/alternatives" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/alternatives" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/alternatives" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Alternatives au planning poker : tailles de T-shirt, dot voting et plus",
    "url": "https://cleanpoker.dev/fr/alternatives",
    "description": "Comparatif des principales alternatives au planning poker : tailles de T-shirt, affinity mapping, dot voting et bucket system.",
    "isPartOf": { "@type": "WebApplication", "name": "CleanPoker", "url": "https://cleanpoker.dev" },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quelles sont les principales alternatives au planning poker ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Les principales alternatives sont : tailles de T-shirt (XS à XXL), affinity mapping, dot voting et bucket system. Chacune sacrifie un peu de précision pour gagner en vitesse." },
      },
      {
        "@type": "Question",
        "name": "Quand utiliser les tailles de T-shirt plutôt que le planning poker ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Utiliser les tailles de T-shirt pour estimations rapides, parties prenantes non techniques, ou affinage grand backlog en début de projet. Passer au planning poker Fibonacci pour le suivi de vélocité." },
      },
      {
        "@type": "Question",
        "name": "Le planning poker est-il toujours la meilleure technique ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Non. Le planning poker est idéal pour estimation au sprint de stories bien définies en équipes établies. Pour grands backlogs ou parties prenantes non techniques, affinity mapping ou tailles de T-shirt sont plus adaptés." },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/a-propos" class="back-link">← À propos</a>

    <h1>Alternatives au planning poker</h1>

    <p>
      Le planning poker n'est pas la seule façon d'estimer. Selon la taille de votre équipe,
      la profondeur du backlog et vos objectifs de session, une autre technique peut être
      plus rapide et tout aussi efficace. Voici une comparaison honnête.
    </p>

    <h2>Comparaison rapide</h2>
    <table>
      <thead>
        <tr><th>Technique</th><th>Rapidité</th><th>Précision</th><th>Idéal pour</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Planning poker</strong></td><td>Moyen</td><td>Élevée</td><td>Estimation au sprint de stories bien définies</td></tr>
        <tr><td><strong>Tailles de T-shirt</strong></td><td>Rapide</td><td>Faible-moyen</td><td>Affinage grossier du backlog, parties prenantes non techniques</td></tr>
        <tr><td><strong>Affinity mapping</strong></td><td>Très rapide</td><td>Moyen</td><td>Grands backlogs (20+ stories), phase de découverte</td></tr>
        <tr><td><strong>Bucket system</strong></td><td>Très rapide</td><td>Moyen</td><td>Très grands backlogs (50+ stories)</td></tr>
        <tr><td><strong>Dot voting</strong></td><td>Rapide</td><td>Faible</td><td>Priorisation, pas estimation</td></tr>
      </tbody>
    </table>

    <h2>Tailles de T-shirt</h2>
    <p>
      Les tailles XS, S, M, L, XL (et parfois XXL) représentent l'effort relatif. Intuitives
      et indépendantes de la langue, elles conviennent parfaitement aux équipes mixtes
      techniques et non-techniques.
    </p>
    <p>
      <strong>Force</strong> : Rapides, non intimidantes. Idéales pour le sizing initial
      d'un backlog en début de projet.
    </p>
    <p>
      <strong>Faiblesse</strong> : Non convertibles directement en vélocité numérique. Si vous
      devez prévoir des dates de release, il faudra mapper les tailles en story points ou
      passer au planning poker Fibonacci.
    </p>

    <h2>Affinity mapping</h2>
    <p>
      Dans l'affinity mapping, les membres de l'équipe déplacent simultanément (et en
      silence) des cartes de stories dans des seaux de taille : XS, S, M, L, XL. L'équipe
      ne discute ensuite que des stories où les membres ont divergé.
    </p>
    <p>
      <strong>Force</strong> : S'adapte à de grands backlogs (20 à 50 stories) en une
      seule session. La phase silencieuse prévient l'ancrage et la pression sociale.
    </p>
    <p>
      <strong>Faiblesse</strong> : Moins précis que le planning poker pour les stories
      complexes.
    </p>

    <h2>Le bucket system</h2>
    <p>
      Le bucket system est conçu pour les très grands backlogs. Des seaux numériques sont
      définis en avance (ex. : 1, 2, 3, 5, 8, 13, 20, 40, 100). Les membres trient les
      stories par comparaison avec une story de référence plutôt que par estimation
      individuelle.
    </p>
    <p>
      <strong>Force</strong> : Une équipe peut trier 50 à 200 stories en moins de deux heures.
    </p>
    <p>
      <strong>Faiblesse</strong> : Les premiers choix de seaux influencent tous les placements
      suivants. Calibrez soigneusement les stories de référence.
    </p>

    <h2>Questions fréquentes</h2>

    <details>
      <summary>Quelles sont les principales alternatives au planning poker ?</summary>
      <p>
        Les principales alternatives sont : les tailles de T-shirt (XS à XXL), l'affinity
        mapping, le dot voting et le bucket system. Chacune sacrifie un peu de précision
        pour gagner en vitesse.
      </p>
    </details>

    <details>
      <summary>Quand utiliser les tailles de T-shirt plutôt que le planning poker ?</summary>
      <p>
        Utilisez les tailles de T-shirt pour des estimations rapides, avec des parties
        prenantes non techniques, ou pour affiner un grand backlog en début de projet.
        Passez au planning poker Fibonacci quand vous avez besoin de suivi de vélocité.
      </p>
    </details>

    <details>
      <summary>Le planning poker est-il toujours la meilleure technique ?</summary>
      <p>
        Non. Le planning poker est idéal pour l'estimation au sprint de stories bien définies
        dans des équipes établies. Pour les grands backlogs ou les parties prenantes non
        techniques, l'affinity mapping ou les tailles de T-shirt sont plus adaptés.
      </p>
    </details>

    <div class="cta">
      <a href="/fr" class="btn">Essayer le planning poker avec CleanPoker →</a>
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
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p { line-height: 1.7; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 0.5rem 0; }
  th, td { padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); text-align: left; }
  th { background: var(--color-surface); font-weight: 700; }
  tr:nth-child(even) td { background: var(--color-surface); }
  details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 0.75rem 1rem; margin-bottom: 0.5rem; }
  details[open] { background: var(--color-surface); }
  summary { font-weight: 600; cursor: pointer; font-size: 0.95rem; }
  details p { margin: 0.75rem 0 0; font-size: 0.9rem; }
  .cta { margin-top: 2.5rem; text-align: center; }
  .btn { display: inline-block; padding: 0.875rem 2rem; background: var(--color-primary); color: #fff; border-radius: var(--radius-lg); text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
