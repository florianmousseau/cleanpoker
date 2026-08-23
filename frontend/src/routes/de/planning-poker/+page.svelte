<svelte:head>
  <title>Planning Poker: Regeln, Fibonacci und praktischer Leitfaden | CleanPoker</title>
  <meta name="description" content="Was ist Planning Poker? Regeln, Fibonacci-Folge, T-Shirt-Sizing, Tipps zur Schätzung von User Stories im agilen Team. Vollständiger kostenloser Leitfaden." />
  <link rel="canonical" href="https://cleanpoker.dev/de/planning-poker" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/planning-poker" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/planning-poker" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/planning-poker" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist Planning Poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Planning Poker ist eine agile Schätzungstechnik, die in Scrum verwendet wird. Jedes Teammitglied wählt heimlich eine Karte, die seine Schätzung einer User Story darstellt, dann werden alle gleichzeitig aufgedeckt. Die Unterschiede führen zu einer Diskussion, die die kollektive Schätzung verfeinert.' },
      },
      {
        '@type': 'Question',
        name: 'Warum die Fibonacci-Folge beim Planning Poker verwenden?',
        acceptedAnswer: { '@type': 'Answer', text: 'Die Fibonacci-Folge (1, 2, 3, 5, 8, 13, 21) spiegelt wachsende Unsicherheit wider: Je größer eine Aufgabe, desto weniger genau kann sie geschätzt werden. Der Abstand zwischen den Werten wächst, was das Team zwingt, sich klar zu positionieren.' },
      },
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen Story Points und Tagen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Story Points messen relativen Aufwand, nicht Zeit: den Umfang der Arbeit, die Unsicherheit und die Komplexität zusammengenommen. Die Skala ist relativ, eine 5 ist also deutlich größer als eine 2, ohne ein exaktes Vielfaches zu behaupten. Diese Abstraktion ermöglicht den Vergleich von Aufgaben, ohne sich auf individuelle Dauern zu versteifen.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de/a-propos" class="back-link">← Über CleanPoker</a>

    <h1>Planning Poker: vollständiger Leitfaden</h1>

    <p>
      <strong>Planning Poker</strong> ist die am weitesten verbreitete Schätzungstechnik in
      <strong>Scrum</strong> und Agilität. In 5 Minuten alles, was du wissen musst.
    </p>

    <h2>Was ist Planning Poker?</h2>
    <p>
      Planning Poker (auch <em>Scrum Poker</em> genannt) ist eine kollaborative Schätzungstechnik,
      bei der jedes Teammitglied <strong>heimlich</strong> eine Karte mit seiner Schätzung einer
      User Story oder Aufgabe wählt. Alle decken ihre Karten <strong>gleichzeitig</strong> auf.
      Unterschiede führen zu einer kurzen Diskussion, dann stimmt das Team erneut ab bis zur
      Konvergenz.
    </p>

    <h2>Die Regeln in 5 Schritten</h2>
    <ol>
      <li>Der Product Owner stellt eine User Story oder Aufgabe vor.</li>
      <li>Das Team stellt Klärungsfragen.</li>
      <li>Jedes Mitglied wählt heimlich eine Karte (ohne andere zu beeinflussen).</li>
      <li>Alle decken gleichzeitig auf.</li>
      <li>Konvergieren die Schätzungen: Wert übernehmen. Sonst: Extreme diskutieren, dann neu abstimmen.</li>
    </ol>

    <h2>Warum die Fibonacci-Folge?</h2>
    <p>
      Die Folge <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> ist die am häufigsten verwendete,
      da sie wachsende Unsicherheit modelliert: Je größer eine Aufgabe, desto weniger genau
      kann sie geschätzt werden. Der Abstand zwischen den Werten wächst mit der Größe, was das
      Team <strong>zwingt, sich klar zu positionieren</strong> ohne illusorische Präzision.
    </p>

    <h2>Vergleich der Kartenfolgen</h2>
    <table>
      <thead>
        <tr><th>Folge</th><th>Werte</th><th>Ideal für</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Erfahrene Scrum-Teams, Story-Point-Schätzung</td>
        </tr>
        <tr>
          <td><strong>T-Shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Grobe Schätzungen, nicht-technische Teams, Backlog-Sortierung</td>
        </tr>
        <tr>
          <td><strong>Zweierpotenzen</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Technische Aufgaben mit vorhersehbarer Komplexitätsverdoppelung</td>
        </tr>
      </tbody>
    </table>

    <h2>Häufig gestellte Fragen</h2>

    <details>
      <summary>Was ist der Unterschied zwischen Story Points und Tagen?</summary>
      <p>
        Story Points messen <strong>relativen Aufwand</strong>, nicht Zeit: den Umfang der
        Arbeit, die Unsicherheit und die Komplexität zusammengenommen. Die Skala ist relativ -
        eine 5 ist deutlich größer als eine 2, ohne ein exaktes Vielfaches zu behaupten. Diese
        Abstraktion ermöglicht den Vergleich von Aufgaben, ohne sich auf individuelle Dauern zu
        versteifen.
      </p>
    </details>

    <details>
      <summary>Wie geht man mit Schätzungsunterschieden um?</summary>
      <p>
        Wenn die Schätzungen divergieren (z.B. eine 2 und eine 13 in derselben Runde), bitte die
        Personen, die an den Extremen gestimmt haben, ihre Wahl zu erklären. Die Diskussion
        offenbart oft unterschiedliche Annahmen oder nicht identifizierte Risiken. Stimme
        erneut ab bis zur Konvergenz.
      </p>
    </details>

    <details>
      <summary>Funktioniert Planning Poker für Remote-Teams?</summary>
      <p>
        Ja, genau dafür gibt es CleanPoker. Erstelle eine Session, teile die URL, jeder
        Teilnehmer stimmt auf seinem eigenen Gerät ab. Die Ergebnisse werden in Echtzeit
        über WebSocket enthüllt, ohne Konfiguration oder Konto.
      </p>
    </details>

    <div class="cta">
      <a href="/de" class="btn">Kostenlose Session erstellen →</a>
    </div>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Quellcode</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a>
      | <a href="/de/a-propos">Über CleanPoker</a>
      | <a href="/de/mentions-legales">Impressum</a>
      | <a href="/de/mentions-legales#confidentialite">Datenschutz</a>
    </p>
  </footer>
</div>

<style>
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p, li { line-height: 1.7; }
  ol { padding-left: min(1.5rem, 24px); display: flex; flex-direction: column; gap: 0.375rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 0.5rem 0; }
  th, td { padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); text-align: left; }
  th { background: var(--color-surface); font-weight: 700; }
  tr:nth-child(even) td { background: var(--color-surface); }
  details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 0.75rem min(1rem, 16px); margin-bottom: 0.5rem; }
  details[open] { background: var(--color-surface); }
  summary { font-weight: 600; cursor: pointer; font-size: 0.95rem; }
  details p { margin: 0.75rem 0 0; font-size: 0.9rem; }
  .cta { margin-top: 2.5rem; text-align: center; }
  .btn { display: inline-block; padding: 0.875rem min(2rem, 32px); background: var(--color-primary); color: #fff; border-radius: var(--radius-lg); text-decoration: none; font-weight: 700; font-size: 1rem; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
