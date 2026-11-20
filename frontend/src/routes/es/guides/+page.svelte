<svelte:head>
  <title>Guías: planning poker, scrum poker, estimación ágil | PokerAgile</title>
  <meta name="description" content="Todas las guías de PokerAgile en una página: planning poker, scrum poker, secuencia de Fibonacci, estimación ágil y alternativas al planning poker." />
  <link rel="canonical" href="https://pokeragile.com/es/guides" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/guides" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/guides" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/guides" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/guides" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/guides" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/guides" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guías',
    url: 'https://pokeragile.com/es/guides',
    inLanguage: 'es',
    description: 'Todas las guías de PokerAgile en una página: planning poker, scrum poker, secuencia de Fibonacci, estimación ágil y alternativas al planning poker.',
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es" class="back-link">Volver al inicio</a>

    <h1>Guías</h1>

    <h2>Estimar</h2>
    <ul>
      <li><a href="/es/planning-poker">Guía de planning poker</a></li>
      <li><a href="/es/scrum-poker">Scrum poker</a></li>
      <li><a href="/es/fibonacci">Secuencia de Fibonacci</a></li>
      <li><a href="/es/estimation-agile">Estimación ágil</a></li>
      <li><a href="/es/alternatives">Alternativas al planning poker</a></li>
    </ul>
    <h2>El sitio</h2>
    <ul>
      <li><a href="/es/a-propos">Acerca de</a></li>
      <li><a href="/es/green">Ecodiseño</a></li>
      <li><a href="/es/accessibilite">Accesibilidad</a></li>
      <li><a href="/es/mentions-legales">Aviso legal</a></li>
    </ul>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Código fuente</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">Licencia MIT</a>
      | <a href="/es/a-propos">Acerca de</a>
      | <a href="/es/mentions-legales">Aviso legal</a>
      | <a href="/es/mentions-legales#confidentialite">Privacidad</a>
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
