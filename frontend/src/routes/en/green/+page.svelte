<svelte:head>
  <title>Eco-design & responsible technology | CleanPoker</title>
  <meta name="description" content="CleanPoker eco-design declaration. JS bundle under 50 KB brotli, zero trackers, zero cookies, 100% renewable energy hosting, Lighthouse Performance 100, CO2 under 0.1 g per visit." />
  <link rel="canonical" href="https://cleanpoker.dev/en/green" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/green" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/green" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/green" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/green" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/green" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/green" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Eco-design: CleanPoker',
    url: 'https://cleanpoker.dev/en/green',
    description: 'CleanPoker eco-design declaration. JS bundle under 50 KB brotli, zero trackers, zero cookies, 100% renewable energy hosting, Lighthouse Performance 100, CO2 under 0.1 g per visit.',
    keywords: 'eco-design, green IT, responsible technology, planning poker eco-friendly, zero trackers, green hosting, renewable energy, Lighthouse 100, lightweight bundle, low CO2',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      sustainabilityNote: 'Hosted on renewable energy (Cloudflare Pages + Fly.io CDG Paris). JS bundle under 50 KB brotli. No third-party scripts. CO2 under 0.1 g per visit.',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/en" class="back-link">← Back to home</a>

    <h1>Eco-design: CleanPoker, responsible digital technology</h1>

    <p>
      <strong>CleanPoker</strong> is built on <strong>responsible technology</strong> principles:
      every technical decision aims to reduce the carbon footprint, eliminate unnecessary dependencies
      and respect user privacy. This isn't a label added as an afterthought —
      it's the DNA of the project.
    </p>

    <h2>Key figures</h2>
    <table>
      <thead>
        <tr><th>Metric</th><th>Value</th></tr>
      </thead>
      <tbody>
        <tr><td>Shared JS bundle (brotli, CI-validated)</td><td><strong>&lt; 50 KB</strong></td></tr>
        <tr><td>Estimated CO₂ per visit</td><td><strong>&lt; 0.1 g</strong></td></tr>
        <tr><td>Lighthouse Performance</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Lighthouse Accessibility</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Third-party requests</td><td><strong>0</strong></td></tr>
        <tr><td>Trackers / analytics</td><td><strong>0</strong></td></tr>
        <tr><td>Advertising cookies</td><td><strong>0</strong></td></tr>
        <tr><td>Google Fonts loaded</td><td><strong>0</strong></td></tr>
        <tr><td>Backend RAM</td><td><strong>~15 MB</strong> (Go binary)</td></tr>
      </tbody>
    </table>

    <h2>Technical choices to reduce impact</h2>
    <ul>
      <li><strong>No CSS framework</strong> (Tailwind, Bootstrap...): vanilla CSS, zero dead code</li>
      <li><strong>No Google Fonts</strong>: system fonts only, no network requests</li>
      <li><strong>No virtual DOM</strong>: SvelteKit compiles to vanilla JavaScript, minimal bundle</li>
      <li><strong>No database</strong>: Go in-memory sessions, auto-deleted after 24h of inactivity</li>
      <li><strong>No third-party scripts</strong>: no Analytics SDK, Chat, A/B testing or similar</li>
      <li><strong>Brotli compression</strong>: more efficient than gzip, enabled by default on Cloudflare</li>
      <li><strong>Go backend</strong>: native binary ~15 MB RAM, no JVM or Node.js runtime to maintain</li>
      <li><strong>Native WebSocket</strong>: no HTTP polling, lightweight persistent connection</li>
      <li><strong>System images</strong>: SVG favicon, no heavy PNG, no sprite</li>
    </ul>

    <h2>Renewable energy hosting</h2>
    <ul>
      <li>
        <strong>Frontend: Cloudflare Pages</strong> - Global CDN, certified 100% renewable energy.
        Cloudflare is listed in The Green Web Foundation database.
      </li>
      <li>
        <strong>Backend: Fly.io CDG (Paris, France)</strong> - renewable energy certified host,
        data residency in France, minimal latency for European teams.
      </li>
    </ul>

    <h2>What CleanPoker does NOT do</h2>
    <ul>
      <li>No Google Analytics or any behavioral tracking tool</li>
      <li>No advertising, no monetisation, no freemium</li>
      <li>No third-party cookies (only Cloudflare may set <code>__cf_bm</code>, a strictly necessary security cookie)</li>
      <li>No localStorage containing personal data (only language preference is stored)</li>
      <li>No fonts, icons or scripts loaded from third-party CDNs (jsDelivr, cdnjs, unpkg...)</li>
      <li>No email marketing, no user accounts, no permanent database</li>
    </ul>

    <h2>External verification</h2>
    <p>These independent tools allow you to verify the commitments above:</p>
    <ul>
      <li>
        <a href="https://www.websitecarbon.com/website/cleanpoker-dev/" rel="noopener noreferrer">
          Website Carbon: CO₂ footprint of cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://www.thegreenwebfoundation.org/green-web-check/?url=cleanpoker.dev" rel="noopener noreferrer">
          The Green Web Foundation: verify green hosting of cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://sonarcloud.io/project/overview?id=florianmousseau_cleanpoker" rel="noopener noreferrer">
          SonarCloud: code quality and security
        </a>
      </li>
      <li>
        <a href="https://github.com/florianmousseau/cleanpoker/actions" rel="noopener noreferrer">
          GitHub Actions: Lighthouse CI and Eco-CI results
        </a>
      </li>
    </ul>

    <h2>Continuous improvement</h2>
    <p>
      The digital footprint is audited at every deployment via Lighthouse CI and Eco-CI
      (measures CI pipeline energy consumption).
      Any performance regression blocks the production deployment.
    </p>

    <h2>Last updated</h2>
    <p>This declaration was established in June 2026.</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT Licence</a>
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
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }

  p, li { line-height: 1.7; }

  ul {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  th, td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background: var(--color-surface);
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
