<svelte:head>
  <title>Accessibility & disability | CleanPoker inclusive planning poker</title>
  <meta name="description" content="CleanPoker is a planning poker tool fully accessible to people with disabilities. Full keyboard navigation, screen readers (NVDA, VoiceOver, JAWS), WCAG 2.1 AA compliance." />
  <link rel="canonical" href="https://cleanpoker.dev/en/accessibilite" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/accessibilite" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en/accessibilite" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/accessibilite" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/accessibilite" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/accessibilite" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/accessibilite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Accessibility declaration: CleanPoker',
    url: 'https://cleanpoker.dev/en/accessibilite',
    description: 'CleanPoker is a planning poker tool fully accessible to people with disabilities. Full keyboard navigation, compatible with NVDA, VoiceOver and JAWS screen readers. WCAG 2.1 AA compliant.',
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
    <a href="/en" class="back-link">← Back to home</a>

    <h1>Accessibility: CleanPoker for inclusive teams</h1>

    <p>
      <strong>CleanPoker</strong> is a planning poker tool designed to be usable by everyone,
      including people with disabilities: screen reader users, keyboard-only users,
      people with low vision or motor impairments.
      It conforms to the <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 Level AA guidelines.
    </p>

    <h2>Who is it for?</h2>
    <p>CleanPoker is suitable for:</p>
    <ul>
      <li>Blind or visually impaired people using a screen reader (NVDA, VoiceOver, JAWS)</li>
      <li>People with motor impairments who navigate exclusively with a keyboard</li>
      <li>People sensitive to animations (epilepsy, vestibular disorders)</li>
      <li>People using browser zoom up to 200%</li>
      <li>Agile teams wishing to include members with disabilities</li>
    </ul>

    <h2>Conformance status</h2>
    <p>CleanPoker is <strong>partially conformant</strong> with WCAG 2.1 AA criteria.
    Accessibility was integrated from the design stage, not added afterwards.
    The Lighthouse Accessibility score is <strong>100/100</strong>.</p>

    <h2>Compatibility with assistive technologies</h2>
    <ul>
      <li><strong>NVDA</strong> (Windows): tested with Firefox</li>
      <li><strong>VoiceOver</strong> (macOS / iOS): tested with Safari</li>
      <li><strong>JAWS</strong> (Windows): compatible via semantic HTML and ARIA</li>
      <li>Full keyboard navigation: Tab, Shift+Tab, Enter, Space, arrow keys</li>
    </ul>

    <h2>Technical measures implemented</h2>
    <ul>
      <li>Skip link ("Skip to main content") at the top of the page</li>
      <li>Full keyboard navigation (Tab, Enter, Space)</li>
      <li><code>aria-live="polite"</code> regions for real-time vote updates</li>
      <li><code>aria-pressed</code> states on voting cards</li>
      <li>Contrast ratios meeting the 4.5:1 minimum</li>
      <li>No <code>user-scalable=no</code> (free browser zoom)</li>
      <li><code>prefers-reduced-motion</code> support (no forced animations)</li>
      <li>Dark mode support (<code>prefers-color-scheme</code>)</li>
      <li>Semantic HTML5: <code>&lt;button&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;table&gt;</code></li>
      <li><code>rem</code> units: browser zoom works correctly</li>
      <li>Buttons and links with explicit labels (<code>aria-label</code>)</li>
    </ul>

    <h2>Technologies used</h2>
    <ul>
      <li>Semantic HTML5</li>
      <li>CSS with <code>rem</code> units (zoom respected)</li>
      <li>JavaScript (SvelteKit)</li>
      <li>WebSocket for real-time</li>
      <li>WAI-ARIA for interactive components</li>
    </ul>

    <h2>Known limitations</h2>
    <p>No major limitations identified to date. This site is actively maintained and regularly audited.</p>

    <h2>Report a problem</h2>
    <p>
      To report an accessibility issue or suggest an improvement:
      <a href="https://github.com/florianmousseau/cleanpoker/issues" rel="noopener noreferrer">
        open a GitHub issue
      </a>
    </p>

    <h2>Last updated</h2>
    <p>This declaration was established in June 2026.</p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT Licence</a>
      | <a href="/en/green">Eco-design</a>
      | <a href="/en/accessibilite">Accessibility</a>
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

  h1 {
    margin-bottom: 1.5rem;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  p, li {
    line-height: 1.7;
  }

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
