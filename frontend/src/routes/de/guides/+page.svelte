<svelte:head>
  <title>Leitfäden: Planning Poker, Scrum Poker, Schätzung | PokerAgile</title>
  <meta name="description" content="Alle PokerAgile-Leitfäden auf einer Seite: Planning Poker, Scrum Poker, Fibonacci-Folge, agile Schätzung und Alternativen zum Planning Poker." />
  <link rel="canonical" href="https://pokeragile.com/de/guides" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/guides" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/guides" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/guides" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/guides" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/guides" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/guides" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Leitfäden',
    url: 'https://pokeragile.com/de/guides',
    inLanguage: 'de',
    description: 'Alle PokerAgile-Leitfäden auf einer Seite: Planning Poker, Scrum Poker, Fibonacci-Folge, agile Schätzung und Alternativen zum Planning Poker.',
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de" class="back-link">Zurück zur Startseite</a>

    <h1>Leitfäden</h1>

    <h2>Schätzen</h2>
    <ul>
      <li><a href="/de/planning-poker">Planning-Poker-Leitfaden</a></li>
      <li><a href="/de/scrum-poker">Scrum Poker</a></li>
      <li><a href="/de/fibonacci">Fibonacci-Folge</a></li>
      <li><a href="/de/estimation-agile">Agile Schätzung</a></li>
      <li><a href="/de/alternatives">Alternativen zum Planning Poker</a></li>
    </ul>
    <h2>Die Website</h2>
    <ul>
      <li><a href="/de/a-propos">Über uns</a></li>
      <li><a href="/de/green">Ökodesign</a></li>
      <li><a href="/de/accessibilite">Barrierefreiheit</a></li>
      <li><a href="/de/mentions-legales">Impressum</a></li>
    </ul>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Quellcode</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a>
      | <a href="/de/a-propos">Über uns</a>
      | <a href="/de/mentions-legales">Impressum</a>
      | <a href="/de/mentions-legales#confidentialite">Datenschutz</a>
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
