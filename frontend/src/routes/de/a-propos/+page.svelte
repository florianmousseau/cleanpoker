<svelte:head>
  <title>Uber CleanPoker - Okodesigntes Planning Poker</title>
  <meta name="description" content="CleanPoker ist ein kostenloses, okodesigntes Planning-Poker-Tool. Keine Tracker, keine Cookies, WCAG 2.1 AA barrierefrei, unter 50 KB JS, grunens Hosting. Open Source MIT." />
  <link rel="canonical" href="https://cleanpoker.dev/de/a-propos" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/a-propos" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/a-propos" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/a-propos" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/a-propos" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/a-propos" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Uber CleanPoker',
    url: 'https://cleanpoker.dev/de/a-propos',
    description: 'CleanPoker ist ein kostenloses, okodesigntes Planning-Poker-Tool. Keine Tracker, keine Cookies, WCAG 2.1 AA barrierefrei.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      description: 'Kostenloses Planning Poker, keine Tracker, JS-Bundle unter 50 KB, gruenes Hosting mit erneuerbarer Energie, WCAG 2.1 AA.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de" class="back-link">← Zur Startseite</a>

    <h1>Uber CleanPoker</h1>

    <p>
      <strong>CleanPoker</strong> ist ein kostenloses, quelloffenes <strong>Planning-Poker</strong>-Tool.
      Erstelle eine Session in 30 Sekunden, teile die URL mit deinem Team und schatze in Echtzeit.
      Kein Konto, keine Registrierung, keine Tracker.
    </p>

    <ul class="facts">
      <li>JS-Bundle <strong>&lt; 50 KB</strong> (brotli)</li>
      <li>Lighthouse Performance und Barrierefreiheit: <strong>100 / 100</strong></li>
      <li>100% erneuerbare Energie Hosting (Cloudflare Pages + Fly.io CDG Paris)</li>
      <li>Keine Tracker, keine Werbe-Cookies, keine Drittanbieter-Skripte</li>
      <li>Open Source unter <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a></li>
    </ul>

    <h2>Mehr erfahren</h2>

    <div class="cards-grid">
      <a href="/de/planning-poker" class="card">
        <h3>Planning-Poker-Leitfaden</h3>
        <p>Regeln, Fibonacci-Folge, Kartenvergleich, praktische Tipps fur agile Teams.</p>
      </a>
      <a href="/de/green" class="card">
        <h3>Okodesign</h3>
        <p>Kennzahlen, technische Entscheidungen und grunes Hosting: unsere Umwelterklarung.</p>
      </a>
      <a href="/de/accessibilite" class="card">
        <h3>Barrierefreiheit</h3>
        <p>WCAG 2.1 AA Konformitat, Screenreader-Kompatibilitat, Tastaturnavigation.</p>
      </a>
      <a href="/de/mentions-legales" class="card">
        <h3>Impressum</h3>
        <p>DSGVO, Cookies, Hosting, Seitenbetreiber.</p>
      </a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Quellcode</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a>
      | <a href="/de/a-propos">Uber CleanPoker</a>
      | <a href="/de/mentions-legales">Impressum</a>
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
