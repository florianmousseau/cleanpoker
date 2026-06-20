<svelte:head>
  <title>Agile Schätzung: Story Points, Velocity und Sprint-Planung | CleanPoker</title>
  <meta name="description" content="Vollständiger Leitfaden zur agilen Schätzung: Story Points vs. Stunden, Velocity, Kapazitätsplanung und häufige Fehler." />
  <link rel="canonical" href="https://cleanpoker.dev/de/estimation-agile" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/estimation-agile" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/estimation-agile" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/estimation-agile" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/estimation-agile" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/estimation-agile" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/estimation-agile" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Agile Schätzung: Story Points, Velocity und Sprint-Planung',
    url: 'https://cleanpoker.dev/de/estimation-agile',
    description: 'Vollständiger Leitfaden zur agilen Schätzung: Story Points, Velocity, Kapazitätsplanung und häufige Fehler.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen Story Points und Stunden?',
        acceptedAnswer: { '@type': 'Answer', text: 'Story Points messen relative Komplexität, keine Zeit. Eine 5-Punkte-Story ist ungefähr doppelt so komplex wie eine 3-Punkte-Story, unabhängig davon, wer sie implementiert oder wie lange es dauert. Stunden variieren je nach Entwickler und Kontext; Komplexität ist teamrelativ und stabil.' },
      },
      {
        '@type': 'Question',
        name: 'Was ist Velocity in Agile?',
        acceptedAnswer: { '@type': 'Answer', text: 'Velocity ist die Anzahl der Story Points, die ein Team pro Sprint im Durchschnitt abschließt. Nach 3-5 Sprints stabilisiert sich die Velocity und wird zu einem zuverlässigen Input für Release-Planung und Sprint-Commitment.' },
      },
      {
        '@type': 'Question',
        name: 'Sollte das Team Bugs und technische Schulden schätzen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja. Wenn ein Bug erheblichen Aufwand erfordert, schätzen Sie ihn. Wenn technische Schuldenarbeit in einem Sprint geplant ist, sollte sie geschätzt und in der Velocity gezählt werden. Sie zu ignorieren erzeugt eine aufgeblähte Velocity, die die Planung irreführt.' },
      },
      {
        '@type': 'Question',
        name: 'Was ist die richtige Team-Velocity?',
        acceptedAnswer: { '@type': 'Answer', text: 'Es gibt keine universell korrekte Velocity. Ein Team von 4 Personen mit 30 Punkten pro Sprint ist nicht besser oder schlechter als ein Team von 6 mit 60 Punkten. Velocity ist eine interne Teammetrik für Prognosen, kein Leistungsmaßstab.' },
      },
      {
        '@type': 'Question',
        name: 'Wie viele Sprints dauert es, bis sich die Velocity stabilisiert?',
        acceptedAnswer: { '@type': 'Answer', text: 'Typischerweise 3 bis 5 Sprints. Der erste Sprint ist oft niedriger, da sich das Team kalibriert. Ab Sprint 4 oder 5 wird der Durchschnitt für Release-Datumsprognosen zuverlässig genug.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de/a-propos" class="back-link">← Uber uns</a>

    <h1>Agile Schätzung: vollständiger Leitfaden</h1>

    <p>
      Agile Schätzung geht nicht darum, die Zukunft vorherzusagen. Es geht darum,
      <strong>aufzudecken, was das Team noch nicht weiss</strong>. Eine gute
      Schätzsitzung bringt versteckte Komplexität, unstated Annahmen und ungelöste
      Abhängigkeiten ans Licht.
    </p>

    <h2>Story Points vs. Stunden</h2>
    <p>
      <strong>Story Points</strong> messen relative Komplexität innerhalb des Teams.
      Eine 5-Punkte-Story ist ungefähr doppelt so komplex wie eine 3-Punkte-Story,
      unabhängig davon, wer sie umsetzt. Stunden variieren; relative Komplexität ist stabil.
    </p>

    <h2>Wie Velocity funktioniert</h2>
    <p>
      Velocity ist die durchschnittliche Anzahl von Story Points, die ein Team pro Sprint
      abschliesst. Nach 3 bis 5 Sprints stabilisiert sie sich und wird zum zuverlässigen
      Werkzeug für Release-Planung und Sprint-Commitment.
    </p>

    <h2>Häufige Schätzfehler</h2>
    <table>
      <thead>
        <tr><th>Fehler</th><th>Warum es schadet</th><th>Lösung</th></tr>
      </thead>
      <tbody>
        <tr><td>In Stunden schätzen</td><td>Ankert an individueller Geschwindigkeit</td><td>Zu relativen Story Points wechseln</td></tr>
        <tr><td>Am ersten Schätzwert verankern</td><td>Verhindert unabhängige Schätzung</td><td>Karten immer gleichzeitig aufdecken</td></tr>
        <tr><td>Bugs bei der Schätzung ignorieren</td><td>Bläht Velocity auf</td><td>Bugs schätzen die echten Aufwand erfordern</td></tr>
        <tr><td>Velocities zwischen Teams vergleichen</td><td>Unterschiedliche Skalen und Kontexte</td><td>Velocity ist nur eine interne Kennzahl</td></tr>
      </tbody>
    </table>

    <h2>Häufig gestellte Fragen</h2>

    <details>
      <summary>Was ist der Unterschied zwischen Story Points und Stunden?</summary>
      <p>
        Story Points messen relative Komplexität, nicht Zeit. Eine 5-Punkte-Story ist
        ungefähr doppelt so komplex wie eine 3-Punkte-Story, unabhängig vom Entwickler.
      </p>
    </details>

    <details>
      <summary>Wie viele Sprints braucht Velocity zur Stabilisierung?</summary>
      <p>
        Typischerweise 3 bis 5 Sprints. Der erste Sprint ist oft niedriger, da das Team
        seine Schätzung kalibriert. Ab Sprint 4 oder 5 ist der Durchschnitt zuverlässig
        genug für Release-Terminprognosen.
      </p>
    </details>

    <div class="cta">
      <a href="/de" class="btn">Mit CleanPoker eine Session starten →</a>
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
  p { line-height: 1.7; }
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
