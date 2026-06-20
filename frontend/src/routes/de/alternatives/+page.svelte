<svelte:head>
  <title>Alternativen zum Planning Poker: T-Shirt-Schätzung, Dot Voting und mehr | CleanPoker</title>
  <meta name="description" content="Vergleich der besten Alternativen zum Planning Poker: T-Shirt-Schätzung, Affinity Mapping, Dot Voting und Bucket-System." />
  <link rel="canonical" href="https://cleanpoker.dev/de/alternatives" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/alternatives" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/alternatives" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/alternatives" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/alternatives" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/alternatives" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/alternatives" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de/a-propos" class="back-link">← Uber uns</a>

    <h1>Alternativen zum Planning Poker</h1>

    <p>Planning Poker ist nicht die einzige Möglichkeit zur Schätzung. Je nach Teamgrösse, Backlog-Tiefe und Zielen kann eine andere Technik schneller und genauso effektiv sein.</p>

    <h2>Technik</h2>
    <table>
      <thead>
        <tr><th>Technik</th><th>Geschwindigkeit</th><th>Präzision</th><th>Am besten für</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Planning Poker</strong></td><td>Mittel</td><td>Hoch</td><td>Sprint-Schätzung gut definierter Stories</td></tr>
        <tr><td><strong>T-Shirt-Schätzung</strong></td><td>Schnell</td><td>Niedrig-mittel</td><td>Grobes Backlog-Grooming, nicht-technische Stakeholder</td></tr>
        <tr><td><strong>Affinity Mapping</strong></td><td>Sehr schnell</td><td>Mittel</td><td>Grosse Backlogs (20+ Stories)</td></tr>
        <tr><td><strong>Bucket-System</strong></td><td>Sehr schnell</td><td>Mittel</td><td>Sehr grosse Backlogs (50+ Stories)</td></tr>
        <tr><td><strong>Dot Voting</strong></td><td>Schnell</td><td>Niedrig</td><td>Priorisierung, nicht Schätzung</td></tr>
      </tbody>
    </table>

    <h2>FAQ</h2>

    <details>
      <summary>Was sind die wichtigsten Alternativen zum Planning Poker?</summary>
      <p>Die wichtigsten Alternativen sind: T-Shirt-Schätzung (XS bis XXL), Affinity Mapping, Dot Voting und das Bucket-System. Jede tauscht etwas Präzision gegen Geschwindigkeit.</p>
    </details>

    <details>
      <summary>Wann sollte man T-Shirt-Schätzung statt Planning Poker verwenden?</summary>
      <p>Verwenden Sie T-Shirt-Schätzung für schnelle Schätzungen, bei nicht-technischen Stakeholdern oder beim Grooming eines grossen Backlogs am Projektstart. Wechseln Sie zu Fibonacci-Planning Poker, wenn Sie Velocity-Tracking benötigen.</p>
    </details>

    <div class="cta">
      <a href="/de" class="btn">Planning Poker mit CleanPoker ausprobieren →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Quellcode</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a>
      | <a href="/de/a-propos">Uber uns</a>
      | <a href="/de/mentions-legales">Impressum</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p, li { line-height: 1.7; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 0.5rem 0; }
  th, td { padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); text-align: left; }
  th { background: var(--color-surface); font-weight: 700; }
  tr:nth-child(even) td { background: var(--color-surface); }
  details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 0.75rem 1rem; margin-bottom: 0.5rem; }
  details[open] { background: var(--color-surface); }
  summary { font-weight: 600; cursor: pointer; font-size: 0.95rem; }
  details p { margin: 0.75rem 0 0; font-size: 0.9rem; }
  .cta { margin-top: 2.5rem; text-align: center; }
  .btn { display: inline-block; padding: 0.875rem 2rem; background: var(--color-primary); color: #fff; border-radius: var(--radius-lg); text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
