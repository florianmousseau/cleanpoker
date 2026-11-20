<svelte:head>
  <title>Guias: planning poker, scrum poker, estimativa ágil | PokerAgile</title>
  <meta name="description" content="Todos os guias do PokerAgile numa página: planning poker, scrum poker, sequência de Fibonacci, estimativa ágil e alternativas ao planning poker." />
  <link rel="canonical" href="https://pokeragile.com/pt/guides" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/guides" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/guides" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/guides" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/guides" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/guides" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/guides" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guias',
    url: 'https://pokeragile.com/pt/guides',
    inLanguage: 'pt',
    description: 'Todos os guias do PokerAgile numa página: planning poker, scrum poker, sequência de Fibonacci, estimativa ágil e alternativas ao planning poker.',
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt" class="back-link">Voltar ao início</a>

    <h1>Guias</h1>

    <h2>Estimar</h2>
    <ul>
      <li><a href="/pt/planning-poker">Guia de planning poker</a></li>
      <li><a href="/pt/scrum-poker">Scrum poker</a></li>
      <li><a href="/pt/fibonacci">Sequência de Fibonacci</a></li>
      <li><a href="/pt/estimation-agile">Estimativa ágil</a></li>
      <li><a href="/pt/alternatives">Alternativas ao planning poker</a></li>
    </ul>
    <h2>O site</h2>
    <ul>
      <li><a href="/pt/a-propos">Sobre</a></li>
      <li><a href="/pt/green">Ecodesign</a></li>
      <li><a href="/pt/accessibilite">Acessibilidade</a></li>
      <li><a href="/pt/mentions-legales">Aviso legal</a></li>
    </ul>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Código fonte</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">Licença MIT</a>
      | <a href="/pt/a-propos">Sobre</a>
      | <a href="/pt/mentions-legales">Aviso legal</a>
      | <a href="/pt/mentions-legales#confidentialite">Privacidade</a>
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
