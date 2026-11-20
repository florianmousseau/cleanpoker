<svelte:head>
  <title>Guides&nbsp;: poker planning, story points, rétrospectives | PokerAgile</title>
  <meta name="description" content="Tous les guides PokerAgile sur une page&nbsp;: poker planning, scrum poker, story points, T-shirt sizing, Fibonacci, estimation agile, rétrospectives, IA et RGPD." />
  <link rel="canonical" href="https://pokeragile.com/fr/guides" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/guides" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/guides" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/guides" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/guides" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/guides" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/guides" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guides',
    url: 'https://pokeragile.com/fr/guides',
    inLanguage: 'fr',
    description: 'Tous les guides PokerAgile sur une page : poker planning, scrum poker, story points, T-shirt sizing, Fibonacci, estimation agile, rétrospectives, IA et RGPD.',
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr" class="back-link">Retour à l'accueil</a>

    <h1>Guides</h1>

    <h2>Estimer</h2>
    <ul>
      <li><a href="/fr/planning-poker">Guide du poker planning</a></li>
      <li><a href="/fr/scrum-poker">Scrum poker</a></li>
      <li><a href="/fr/story-points">Story points</a></li>
      <li><a href="/fr/t-shirt-sizing">T-shirt sizing</a></li>
      <li><a href="/fr/fibonacci">Suite de Fibonacci</a></li>
      <li><a href="/fr/estimation-agile">Estimation agile</a></li>
      <li><a href="/fr/alternatives">Alternatives au poker planning</a></li>
    </ul>
    <h2>Avec un assistant IA</h2>
    <ul>
      <li><a href="/fr/planning-poker-ia">Planning poker avec une IA</a></li>
    </ul>
    <h2>Choisir un outil</h2>
    <ul>
      <li><a href="/fr/comparatif-outils">Comparatif des outils de poker planning</a></li>
      <li><a href="/fr/poker-planning-rgpd">Poker planning et RGPD</a></li>
    </ul>
    <h2>Après le sprint</h2>
    <ul>
      <li><a href="/fr/retrospective">Formats de rétrospective</a></li>
    </ul>
    <h2>Le site</h2>
    <ul>
      <li><a href="/fr/a-propos">À propos</a></li>
      <li><a href="/fr/green">Éco-conception</a></li>
      <li><a href="/fr/accessibilite">Accessibilité</a></li>
      <li><a href="/fr/mentions-legales">Mentions légales</a></li>
    </ul>
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
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1rem; }
  h2 { margin-top: 1.75rem; margin-bottom: 0.5rem; font-size: 1.1rem; }
  ul { padding-left: min(1.5rem, 24px); display: flex; flex-direction: column; gap: 0.375rem; }
  li { line-height: 1.7; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
