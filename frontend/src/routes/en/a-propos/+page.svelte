<svelte:head>
  <title>About CleanPoker - Eco-designed planning poker</title>
  <meta name="description" content="CleanPoker is a free, eco-designed planning poker tool. Zero trackers, zero cookies, WCAG 2.1 AA accessible, under 50 KB JS, green hosting. Open source MIT." />
  <link rel="canonical" href="https://cleanpoker.dev/en/a-propos" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/a-propos" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/a-propos" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/a-propos" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/a-propos" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/a-propos" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About CleanPoker',
    url: 'https://cleanpoker.dev/en/a-propos',
    description: 'CleanPoker is a free, eco-designed planning poker tool. Zero trackers, zero cookies, WCAG 2.1 AA accessible, under 50 KB JS, green hosting.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      description: 'Free planning poker, zero trackers, JS bundle under 50 KB, green hosting on renewable energy, WCAG 2.1 AA.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/en" class="back-link">← Back to home</a>

    <h1>About CleanPoker</h1>

    <p>
      <strong>CleanPoker</strong> is a free, open-source <strong>planning poker</strong> tool.
      Create a session in 30 seconds, share the URL with your team, estimate in real time.
      No account, no sign-up, no tracker.
    </p>

    <ul class="facts">
      <li>JS bundle <strong>&lt; 50 KB</strong> (brotli)</li>
      <li>Lighthouse Performance and Accessibility: <strong>100 / 100</strong></li>
      <li>100% renewable energy hosting (Cloudflare Pages + Fly.io CDG Paris)</li>
      <li>Zero trackers, zero advertising cookies, zero third-party scripts</li>
      <li>Open source under <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT licence</a></li>
    </ul>

    <h2>Learn more</h2>

    <div class="cards-grid">
      <a href="/en/planning-poker" class="card">
        <h3>Planning poker guide</h3>
        <p>Rules, Fibonacci sequence, card comparison, practical tips for agile teams.</p>
      </a>
      <a href="/en/green" class="card">
        <h3>Eco-design</h3>
        <p>Key metrics, technical choices and green hosting: our environmental statement.</p>
      </a>
      <a href="/en/accessibilite" class="card">
        <h3>Accessibility</h3>
        <p>WCAG 2.1 AA compliance, screen reader support, keyboard navigation.</p>
      </a>
      <a href="/en/mentions-legales" class="card">
        <h3>Legal notice</h3>
        <p>GDPR, cookies, hosting, site publisher.</p>
      </a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT License</a>
      | <a href="/en/a-propos">About</a>
      | <a href="/en/mentions-legales">Legal notice</a>
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
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 1rem; }

  p, li { line-height: 1.7; }

  .facts {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 1rem;
  }

  .card {
    display: block;
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s, background 0.15s;
  }

  .card:hover {
    border-color: var(--color-primary);
    background: var(--color-surface);
  }

  .card h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    color: var(--color-primary);
  }

  .card p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
