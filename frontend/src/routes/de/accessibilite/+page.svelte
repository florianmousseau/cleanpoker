<svelte:head>
  <title>Barrierefreiheit & Behinderung | CleanPoker inklusives Planning Poker</title>
  <meta name="description" content="CleanPoker ist ein Planning-Poker-Tool, das vollständig für Menschen mit Behinderungen zugänglich ist. Vollständige Tastaturnavigation, Screenreader (NVDA, VoiceOver, JAWS), WCAG 2.1 AA Konformität." />
  <link rel="canonical" href="https://cleanpoker.dev/de/accessibilite" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/accessibilite" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/accessibilite" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/accessibilite" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/accessibilite" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/accessibilite" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/accessibilite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Barrierefreiheitserklärung: CleanPoker',
    url: 'https://cleanpoker.dev/de/accessibilite',
    description: 'CleanPoker ist ein Planning-Poker-Tool, das vollständig für Menschen mit Behinderungen zugänglich ist. Vollständige Tastaturnavigation, kompatibel mit NVDA, VoiceOver und JAWS Screenreadern. WCAG 2.1 AA konform.',
    isPartOf: {
      '@type': 'WebApplication',
      name: 'CleanPoker',
      url: 'https://cleanpoker.dev',
      accessibilityFeature: ['highContrastDisplay','readingOrder','structuralNavigation','alternativeText','displayTransformability'],
      accessibilityHazard: ['noFlashingHazard','noMotionSimulationHazard','noSoundHazard'],
      accessibilityControl: ['fullKeyboardControl','fullMouseControl','fullTouchControl'],
      accessibilityAPI: 'ARIA',
    },
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de" class="back-link">← Zurück zur Startseite</a>

    <h1>Barrierefreiheit: CleanPoker für inklusive Teams</h1>

    <p>
      <strong>CleanPoker</strong> ist ein Planning-Poker-Tool, das so gestaltet wurde, dass es von allen genutzt werden kann,
      einschließlich Menschen mit Behinderungen: Nutzer von Screenreadern,
      Personen, die ausschließlich mit der Tastatur navigieren,
      sehbehinderte Personen oder Personen mit motorischen Einschränkungen.
      Es entspricht den Richtlinien <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 Stufe AA.
    </p>

    <h2>Für wen?</h2>
    <p>CleanPoker eignet sich für:</p>
    <ul>
      <li>Blinde oder sehbehinderte Personen, die einen Screenreader verwenden (NVDA, VoiceOver, JAWS)</li>
      <li>Personen mit motorischen Einschränkungen, die ausschließlich mit der Tastatur navigieren</li>
      <li>Personen, die empfindlich auf Animationen reagieren (Epilepsie, vestibuläre Störungen)</li>
      <li>Personen, die den Browser-Zoom bis zu 200% verwenden</li>
      <li>Agile Teams, die Mitglieder mit Behinderungen einbeziehen möchten</li>
    </ul>

    <h2>Konformitätsstatus</h2>
    <p>CleanPoker ist <strong>teilweise konform</strong> mit den WCAG 2.1 AA-Kriterien.
    Barrierefreiheit wurde von Anfang an in das Design integriert, nicht nachträglich hinzugefügt.
    Der Lighthouse-Barrierefreiheits-Score beträgt <strong>100/100</strong>.</p>

    <h2>Kompatibilität mit unterstützenden Technologien</h2>
    <ul>
      <li><strong>NVDA</strong> (Windows): getestet mit Firefox</li>
      <li><strong>VoiceOver</strong> (macOS / iOS): getestet mit Safari</li>
      <li><strong>JAWS</strong> (Windows): kompatibel über semantisches HTML und ARIA</li>
      <li>Vollständige Tastaturnavigation: Tab, Umschalt+Tab, Eingabe, Leertaste, Pfeiltasten</li>
    </ul>

    <h2>Implementierte technische Maßnahmen</h2>
    <ul>
      <li>Sprunglink ("Zum Hauptinhalt") am Seitenanfang</li>
      <li>Vollständige Tastaturnavigation (Tab, Eingabe, Leertaste)</li>
      <li><code>aria-live="polite"</code>-Bereiche für Echtzeit-Abstimmungsaktualisierungen</li>
      <li><code>aria-pressed</code>-Zustände auf Abstimmungskarten</li>
      <li>Kontrastverhältnisse, die das Minimum von 4,5:1 erfüllen</li>
      <li>Kein <code>user-scalable=no</code> (freier Browser-Zoom)</li>
      <li>Unterstützung von <code>prefers-reduced-motion</code> (keine erzwungenen Animationen)</li>
      <li>Unterstützung des Dunkelmodus (<code>prefers-color-scheme</code>)</li>
      <li>Semantisches HTML5: <code>&lt;button&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;table&gt;</code></li>
      <li><code>rem</code>-Einheiten: Browser-Zoom funktioniert korrekt</li>
      <li>Schaltflächen und Links mit expliziten Labels (<code>aria-label</code>)</li>
    </ul>

    <h2>Verwendete Technologien</h2>
    <ul>
      <li>Semantisches HTML5</li>
      <li>CSS mit <code>rem</code>-Einheiten (Zoom wird respektiert)</li>
      <li>JavaScript (SvelteKit)</li>
      <li>WebSocket für Echtzeit</li>
      <li>WAI-ARIA für interaktive Komponenten</li>
    </ul>

    <h2>Bekannte Einschränkungen</h2>
    <p>Bisher wurden keine wesentlichen Einschränkungen identifiziert. Diese Website wird aktiv gepflegt und regelmäßig geprüft.</p>

    <h2>Problem melden</h2>
    <p>
      Um ein Barrierefreiheitsproblem zu melden oder eine Verbesserung vorzuschlagen:
      <a href="https://github.com/florianmousseau/cleanpoker/issues" rel="noopener noreferrer">
        ein GitHub-Issue öffnen
      </a>
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

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
