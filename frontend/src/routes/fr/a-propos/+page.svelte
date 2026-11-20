<svelte:head>
  <title>À propos de PokerAgile, un poker planning éco-conçu</title>
  <meta name="description" content="PokerAgile est un outil de planning poker gratuit, éco-conçu, sans suivi comportemental, accessible WCAG 2.1 AA. Découvrez notre démarche, nos engagements et notre guide du planning poker." />
  <link rel="canonical" href="https://pokeragile.com/fr/a-propos" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/a-propos" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/a-propos" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/a-propos" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/a-propos" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/a-propos" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/a-propos" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'À propos de PokerAgile',
    url: 'https://pokeragile.com/fr/a-propos',
    description: 'PokerAgile est un outil de planning poker gratuit, éco-conçu, sans suivi comportemental, accessible WCAG 2.1 AA.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'PokerAgile',
      url: 'https://pokeragile.com',
      description: 'Planning poker gratuit, sans suivi comportemental, bundle JS < 50 Ko, hébergement sur énergie renouvelable, WCAG 2.1 AA.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr" class="back-link">Retour à l'accueil</a>

    <h1>À propos de PokerAgile</h1>

    <p>
      <strong>PokerAgile</strong> est un outil de <strong>planning poker</strong> collaboratif,
      gratuit et open source. Créez une session en un clic, partagez l'URL avec votre équipe,
      estimez en temps réel. Sans compte, sans inscription, sans suivi comportemental.
    </p>

    <ul class="facts">
      <li>Bundle JS <strong>&lt; 50 Ko</strong> (brotli)</li>
      <li>Lighthouse Performance et Accessibilité&nbsp;: <strong>100 / 100</strong></li>
      <li>Hébergement 100&nbsp;% énergie renouvelable (Cloudflare Pages + OVHcloud Gravelines)</li>
      <li>Aucun traceur, aucun cookie publicitaire, aucun script tiers</li>
      <li>Code source ouvert sous <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">licence MIT</a></li>
    </ul>

    <h2>En savoir plus</h2>

    <div class="cards-grid">
      <a href="/fr/planning-poker" class="card">
        <h3>Guide du planning poker</h3>
        <p>Règles, suite de Fibonacci, comparaison des séquences de cartes, conseils pratiques.</p>
      </a>
      <a href="/fr/green" class="card">
        <h3>Éco-conception</h3>
        <p>Chiffres clés, choix techniques et hébergement vert&nbsp;: notre déclaration d'impact.</p>
      </a>
      <a href="/fr/accessibilite" class="card">
        <h3>Accessibilité</h3>
        <p>Conformité WCAG 2.1 AA, compatibilité lecteurs d'écran, navigation clavier.</p>
      </a>
      <a href="/fr/mentions-legales" class="card">
        <h3>Mentions légales</h3>
        <p>RGPD, cookies, hébergement, éditeur du site.</p>
      </a>
      <a href="/fr/fibonacci" class="card">
        <h3>Fibonacci en planning poker</h3>
        <p>Pourquoi Fibonacci, la carte&nbsp;?, échelle standard vs. modifiée, et comment choisir sa carte.</p>
      </a>
      <a href="/fr/estimation-agile" class="card">
        <h3>Estimation agile</h3>
        <p>Story points vs. heures, vélocité, planification de capacité et erreurs courantes.</p>
      </a>
      <a href="/fr/alternatives" class="card">
        <h3>Alternatives au planning poker</h3>
        <p>Tailles de T-shirt, affinity mapping, bucket system&nbsp;: quelle technique selon le contexte.</p>
      </a>
    </div>
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
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr));
    gap: 1rem;
  }

  .card {
    display: block;
    padding: 1.25rem min(1.5rem, 24px);
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
