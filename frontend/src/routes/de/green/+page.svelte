<svelte:head>
  <title>Öko-Design & verantwortungsvolle Technologie | CleanPoker</title>
  <meta name="description" content="Öko-Design-Erklarung von CleanPoker. JS-Bundle unter 50 KB brotli, null Tracker, null Cookies, 100% erneuerbare Energien, Lighthouse Performance 100, CO2 unter 0,1 g pro Besuch." />
  <link rel="canonical" href="https://cleanpoker.dev/de/green" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/green" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/green" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/green" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/green" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/green" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/green" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Öko-Design: CleanPoker',
    url: 'https://cleanpoker.dev/de/green',
    description: 'Öko-Design-Erklärung von CleanPoker. JS-Bundle unter 50 KB brotli, null Tracker, null Cookies, 100% erneuerbare Energien, Lighthouse Performance 100, CO2 unter 0,1 g pro Besuch.',
    keywords: 'Öko-Design, Green IT, verantwortungsvolle Technologie, Planning Poker umweltfreundlich, null Tracker, grünes Hosting, erneuerbare Energien, Lighthouse 100, leichtes Bundle, geringes CO2',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      sustainabilityNote: 'Auf erneuerbaren Energien gehostet (Cloudflare Pages + Fly.io CDG Paris). JS-Bundle unter 50 KB brotli. Keine Drittanbieter-Skripte. CO2 unter 0,1 g pro Besuch.',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de" class="back-link">← Zurück zur Startseite</a>

    <h1>Öko-Design: CleanPoker, verantwortungsvolle digitale Technologie</h1>

    <p>
      <strong>CleanPoker</strong> wurde nach den Prinzipien der <strong>verantwortungsvollen digitalen Technologie</strong> entwickelt:
      Jede technische Entscheidung zielt darauf ab, den CO₂-Fußabdruck zu reduzieren, unnötige Abhängigkeiten
      zu eliminieren und die Privatsphäre der Nutzer zu respektieren. Dies ist kein nachträglich hinzugefügtes Label,
      sondern die DNA des Projekts.
    </p>

    <h2>Kennzahlen</h2>
    <table>
      <thead>
        <tr><th>Metrik</th><th>Wert</th></tr>
      </thead>
      <tbody>
        <tr><td>Gemeinsames JS-Bundle (brotli, CI-validiert)</td><td><strong>&lt; 50 KB</strong></td></tr>
        <tr><td>Geschätztes CO₂ pro Besuch</td><td><strong>&lt; 0,1 g</strong></td></tr>
        <tr><td>Lighthouse Performance</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Lighthouse Barrierefreiheit</td><td><strong>100 / 100</strong></td></tr>
        <tr><td>Anfragen an Dritte</td><td><strong>0</strong></td></tr>
        <tr><td>Tracker / Analysen</td><td><strong>0</strong></td></tr>
        <tr><td>Werbe-Cookies</td><td><strong>0</strong></td></tr>
        <tr><td>Geladene Google Fonts</td><td><strong>0</strong></td></tr>
        <tr><td>Backend-RAM</td><td><strong>~15 MB</strong> (Go-Binärdatei)</td></tr>
      </tbody>
    </table>

    <h2>Technische Entscheidungen zur Reduzierung des Impacts</h2>
    <ul>
      <li><strong>Kein CSS-Framework</strong> (Tailwind, Bootstrap...): Vanilla CSS, null toter Code</li>
      <li><strong>Keine Google Fonts</strong>: nur Systemschriften, keine Netzwerkanfragen</li>
      <li><strong>Kein virtuelles DOM</strong>: SvelteKit kompiliert zu Vanilla JavaScript, minimales Bundle</li>
      <li><strong>Keine Datenbank</strong>: Go-In-Memory-Sitzungen, nach 24h Inaktivität automatisch gelöscht</li>
      <li><strong>Keine Drittanbieter-Skripte</strong>: kein Analytics-SDK, Chat, A/B-Tests oder ähnliches</li>
      <li><strong>Brotli-Komprimierung</strong>: effizienter als gzip, standardmäßig auf Cloudflare aktiviert</li>
      <li><strong>Go-Backend</strong>: native Binärdatei ~15 MB RAM, keine JVM oder Node.js zu warten</li>
      <li><strong>Natives WebSocket</strong>: kein HTTP-Polling, leichte persistente Verbindung</li>
      <li><strong>Systembilder</strong>: SVG-Favicon, kein schweres PNG, kein Sprite</li>
    </ul>

    <h2>Hosting mit erneuerbaren Energien</h2>
    <ul>
      <li>
        <strong>Frontend: Cloudflare Pages</strong> - Globales CDN, zertifiziert 100% erneuerbare Energien.
        Cloudflare ist in der Datenbank der Green Web Foundation gelistet.
      </li>
      <li>
        <strong>Backend: Fly.io CDG (Paris, Frankreich)</strong> - Hosting-Anbieter mit Zertifizierung für erneuerbare Energien,
        Datenspeicherung in Frankreich, minimale Latenz für europäische Teams.
      </li>
    </ul>

    <h2>Was CleanPoker NICHT tut</h2>
    <ul>
      <li>Kein Google Analytics oder andere Verhaltens-Tracking-Tools</li>
      <li>Keine Werbung, keine Monetarisierung, kein Freemium</li>
      <li>Keine Drittanbieter-Cookies (nur Cloudflare kann <code>__cf_bm</code> setzen, ein unbedingt erforderliches Sicherheits-Cookie)</li>
      <li>Kein localStorage mit persönlichen Daten (nur die Sprachpräferenz wird gespeichert)</li>
      <li>Keine Schriften, Icons oder Skripte von Drittanbieter-CDNs (jsDelivr, cdnjs, unpkg...)</li>
      <li>Kein E-Mail-Marketing, keine Benutzerkonten, keine permanente Datenbank</li>
    </ul>

    <h2>Externe Verifizierung</h2>
    <p>Diese unabhängigen Tools ermöglichen die Überprüfung der obigen Zusagen:</p>
    <ul>
      <li>
        <a href="https://www.websitecarbon.com/website/cleanpoker-dev/" rel="noopener noreferrer">
          Website Carbon: CO₂-Fußabdruck von cleanpoker.dev
        </a>
      </li>
      <li>
        <a href="https://www.thegreenwebfoundation.org/green-web-check/?url=cleanpoker.dev" rel="noopener noreferrer">
          The Green Web Foundation: grünes Hosting von cleanpoker.dev prüfen
        </a>
      </li>
      <li>
        <a href="https://sonarcloud.io/project/overview?id=florianmousseau_cleanpoker" rel="noopener noreferrer">
          SonarCloud: Codequalität und Sicherheit
        </a>
      </li>
      <li>
        <a href="https://github.com/florianmousseau/cleanpoker/actions" rel="noopener noreferrer">
          GitHub Actions: Lighthouse CI und Eco-CI Ergebnisse
        </a>
      </li>
    </ul>

    <h2>Kontinuierliche Verbesserung</h2>
    <p>
      Der digitale Fußabdruck wird bei jedem Deployment über Lighthouse CI und Eco-CI
      (misst den Energieverbrauch der CI-Pipeline) geprüft.
      Jede Performance-Regression blockiert das Produktions-Deployment.
    </p>

    <h2>Datum der Aktualisierung</h2>
    <p>Diese Erklärung wurde im Juni 2026 erstellt.</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Quellcode</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a>
      | <a href="/de/green">Öko-Design</a>
      | <a href="/de/accessibilite">Barrierefreiheit</a>
      | <a href="/de/mentions-legales">Impressum</a>
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
