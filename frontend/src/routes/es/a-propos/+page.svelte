<svelte:head>
  <title>Acerca de CleanPoker - Planning poker eco-diseñado</title>
  <meta name="description" content="CleanPoker es una herramienta de planning poker gratuita, eco-diseñada, sin rastreadores, accesible WCAG 2.1 AA, menos de 50 KB JS, alojamiento verde. Código abierto MIT." />
  <link rel="canonical" href="https://cleanpoker.dev/es/a-propos" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/a-propos" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/a-propos" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/a-propos" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/a-propos" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/a-propos" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Acerca de CleanPoker',
    url: 'https://cleanpoker.dev/es/a-propos',
    description: 'CleanPoker es una herramienta de planning poker gratuita, eco-diseñada, sin rastreadores, accesible WCAG 2.1 AA.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      description: 'Planning poker gratuito, sin rastreadores, bundle JS menos de 50 KB, alojamiento en energia renovable, WCAG 2.1 AA.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/es" class="back-link">← Volver al inicio</a>

    <h1>Acerca de CleanPoker</h1>

    <p>
      <strong>CleanPoker</strong> es una herramienta de <strong>planning poker</strong> colaborativa,
      gratuita y de codigo abierto. Crea una sesion en 30 segundos, comparte la URL con tu equipo
      y estima en tiempo real. Sin cuenta, sin registro, sin rastreadores.
    </p>

    <ul class="facts">
      <li>Bundle JS <strong>&lt; 50 KB</strong> (brotli)</li>
      <li>Lighthouse Rendimiento y Accesibilidad: <strong>100 / 100</strong></li>
      <li>Alojamiento 100% energia renovable (Cloudflare Pages + Fly.io CDG Paris)</li>
      <li>Sin rastreadores, sin cookies publicitarias, sin scripts de terceros</li>
      <li>Codigo abierto bajo <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">licencia MIT</a></li>
    </ul>

    <h2>Saber mas</h2>

    <div class="cards-grid">
      <a href="/es/planning-poker" class="card">
        <h3>Guia de planning poker</h3>
        <p>Reglas, suite de Fibonacci, comparacion de secuencias de cartas, consejos practicos.</p>
      </a>
      <a href="/es/green" class="card">
        <h3>Eco-diseno</h3>
        <p>Cifras clave, decisiones tecnicas y alojamiento verde: nuestra declaracion de impacto.</p>
      </a>
      <a href="/es/accessibilite" class="card">
        <h3>Accesibilidad</h3>
        <p>Conformidad WCAG 2.1 AA, compatibilidad con lectores de pantalla, navegacion por teclado.</p>
      </a>
      <a href="/es/mentions-legales" class="card">
        <h3>Aviso legal</h3>
        <p>RGPD, cookies, alojamiento, editor del sitio.</p>
      </a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Codigo fuente</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licencia MIT</a>
      | <a href="/es/a-propos">Acerca de</a>
      | <a href="/es/mentions-legales">Aviso legal</a>
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
