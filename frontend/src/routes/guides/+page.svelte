<svelte:head>
  <title>Guides: planning poker, story points, retrospectives | PokerAgile</title>
  <meta name="description" content="All PokerAgile guides on one page: planning poker, scrum poker, story points, T-shirt sizing, Fibonacci, agile estimation, retrospectives, AI and GDPR." />
  <link rel="canonical" href="https://pokeragile.com/guides" />
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
    url: 'https://pokeragile.com/guides',
    inLanguage: 'en',
    description: 'All PokerAgile guides on one page: planning poker, scrum poker, story points, T-shirt sizing, Fibonacci, agile estimation, retrospectives, AI and GDPR.',
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">Back to home</a>

    <h1>Guides</h1>

    <h2>Estimating</h2>
    <ul>
      <li><a href="/planning-poker">Planning poker guide</a></li>
      <li><a href="/scrum-poker">Scrum poker</a></li>
      <li><a href="/story-points">Story points</a></li>
      <li><a href="/t-shirt-sizing">T-shirt sizing</a></li>
      <li><a href="/fibonacci">Fibonacci scale</a></li>
      <li><a href="/estimation-agile">Agile estimation</a></li>
      <li><a href="/alternatives">Alternatives to planning poker</a></li>
    </ul>
    <h2>With an AI assistant</h2>
    <ul>
      <li><a href="/planning-poker-ai">Planning poker with AI</a></li>
    </ul>
    <h2>Choosing a tool</h2>
    <ul>
      <li><a href="/planning-poker-tools">Planning poker tools compared</a></li>
      <li><a href="/planning-poker-gdpr">Planning poker and GDPR</a></li>
    </ul>
    <h2>After the sprint</h2>
    <ul>
      <li><a href="/retrospective">Retrospective formats</a></li>
    </ul>
    <h2>About this site</h2>
    <ul>
      <li><a href="/a-propos">About</a></li>
      <li><a href="/green">Eco-design</a></li>
      <li><a href="/accessibilite">Accessibility</a></li>
      <li><a href="/mentions-legales">Legal notice</a></li>
    </ul>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">MIT License</a>
      | <a href="/a-propos">About</a>
      | <a href="/mentions-legales">Legal notice</a>
      | <a href="/mentions-legales#confidentialite">Privacy</a>
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
