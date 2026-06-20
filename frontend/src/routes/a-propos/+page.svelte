<svelte:head>
  <title>À propos de CleanPoker - Planning poker éco-conçu</title>
  <meta name="description" content="CleanPoker est un outil de planning poker gratuit, éco-conçu, zéro trackers, accessible WCAG 2.1 AA. Découvrez notre démarche, nos engagements et notre guide du planning poker." />
  <link rel="canonical" href="https://cleanpoker.dev/a-propos" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/a-propos" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/a-propos" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/a-propos" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/a-propos" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/a-propos" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'À propos de CleanPoker',
    url: 'https://cleanpoker.dev/a-propos',
    description: 'CleanPoker est un outil de planning poker gratuit, éco-conçu, zéro trackers, accessible WCAG 2.1 AA.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      description: 'Planning poker gratuit, zéro trackers, bundle JS < 50 Ko, hébergement sur énergie renouvelable, WCAG 2.1 AA.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">← Retour à l'accueil</a>

    <h1>À propos de CleanPoker</h1>

    <p>
      <strong>CleanPoker</strong> est un outil de <strong>planning poker</strong> collaboratif,
      gratuit et open source. Créez une session en 30 secondes, partagez l'URL avec votre équipe,
      estimez en temps réel. Sans compte, sans inscription, sans tracker.
    </p>

    <ul class="facts">
      <li>Bundle JS <strong>&lt; 50 Ko</strong> (brotli)</li>
      <li>Lighthouse Performance et Accessibilité : <strong>100 / 100</strong></li>
      <li>Hébergement 100 % énergie renouvelable (Cloudflare Pages + Fly.io CDG Paris)</li>
      <li>Zéro trackers, zéro cookies publicitaires, zéro scripts tiers</li>
      <li>Code source ouvert sous <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">licence MIT</a></li>
    </ul>

    <h2>En savoir plus</h2>

    <div class="cards-grid">
      <a href="/planning-poker" class="card">
        <h3>Guide du planning poker</h3>
        <p>Règles, suite de Fibonacci, comparaison des séquences de cartes, conseils pratiques.</p>
      </a>
      <a href="/green" class="card">
        <h3>Éco-conception</h3>
        <p>Chiffres clés, choix techniques et hébergement vert : notre déclaration d'impact.</p>
      </a>
      <a href="/accessibilite" class="card">
        <h3>Accessibilité</h3>
        <p>Conformité WCAG 2.1 AA, compatibilité lecteurs d'écran, navigation clavier.</p>
      </a>
      <a href="/mentions-legales" class="card">
        <h3>Mentions légales</h3>
        <p>RGPD, cookies, hébergement, éditeur du site.</p>
      </a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/a-propos">À propos</a>
      | <a href="/mentions-legales">Mentions légales</a>
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
