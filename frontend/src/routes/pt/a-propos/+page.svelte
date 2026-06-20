<svelte:head>
  <title>Sobre o CleanPoker - Planning poker eco-concebido</title>
  <meta name="description" content="CleanPoker e uma ferramenta de planning poker gratuita, eco-concebida, sem rastreadores, acessivel WCAG 2.1 AA, menos de 50 KB JS, alojamento verde. Codigo aberto MIT." />
  <link rel="canonical" href="https://cleanpoker.dev/pt/a-propos" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/a-propos" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/a-propos" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/a-propos" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/a-propos" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/a-propos" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sobre o CleanPoker',
    url: 'https://cleanpoker.dev/pt/a-propos',
    description: 'CleanPoker e uma ferramenta de planning poker gratuita, eco-concebida, sem rastreadores, acessivel WCAG 2.1 AA.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      description: 'Planning poker gratuito, sem rastreadores, bundle JS inferior a 50 KB, alojamento em energia renovavel, WCAG 2.1 AA.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/pt" class="back-link">← Voltar ao inicio</a>

    <h1>Sobre o CleanPoker</h1>

    <p>
      O <strong>CleanPoker</strong> e uma ferramenta de <strong>planning poker</strong> colaborativa,
      gratuita e de codigo aberto. Crie uma sessao em 30 segundos, partilhe o URL com a sua equipa
      e estime em tempo real. Sem conta, sem registo, sem rastreadores.
    </p>

    <ul class="facts">
      <li>Bundle JS <strong>&lt; 50 KB</strong> (brotli)</li>
      <li>Lighthouse Desempenho e Acessibilidade: <strong>100 / 100</strong></li>
      <li>Alojamento 100% energia renovavel (Cloudflare Pages + Fly.io CDG Paris)</li>
      <li>Sem rastreadores, sem cookies publicitarios, sem scripts de terceiros</li>
      <li>Codigo aberto sob <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">licenca MIT</a></li>
    </ul>

    <h2>Saber mais</h2>

    <div class="cards-grid">
      <a href="/pt/planning-poker" class="card">
        <h3>Guia de planning poker</h3>
        <p>Regras, suite de Fibonacci, comparacao de sequencias de cartas, dicas praticas.</p>
      </a>
      <a href="/pt/green" class="card">
        <h3>Eco-design</h3>
        <p>Indicadores chave, decisoes tecnicas e alojamento verde: a nossa declaracao de impacto.</p>
      </a>
      <a href="/pt/accessibilite" class="card">
        <h3>Acessibilidade</h3>
        <p>Conformidade WCAG 2.1 AA, compatibilidade com leitores de ecra, navegacao por teclado.</p>
      </a>
      <a href="/pt/mentions-legales" class="card">
        <h3>Aviso legal</h3>
        <p>RGPD, cookies, alojamento, editor do site.</p>
      </a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Codigo fonte</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licenca MIT</a>
      | <a href="/pt/a-propos">Sobre</a>
      | <a href="/pt/mentions-legales">Aviso legal</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 1rem; }
  p, li { line-height: 1.7; }
  .facts { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 0.75rem; }
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: 1rem; }
  .card { display: block; padding: 1.25rem 1.5rem; border: 1px solid var(--color-border); border-radius: var(--radius); text-decoration: none; color: inherit; transition: border-color 0.15s, background 0.15s; }
  .card:hover { border-color: var(--color-primary); background: var(--color-surface); }
  .card h3 { margin: 0 0 0.5rem; font-size: 1rem; color: var(--color-primary); }
  .card p { margin: 0; font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.5; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
