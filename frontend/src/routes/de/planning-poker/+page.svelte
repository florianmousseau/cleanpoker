<svelte:head>
  <title>Planning Poker: Regeln, Fibonacci und praktischer Leitfaden | CleanPoker</title>
  <meta name="description" content="Was ist Planning Poker? Regeln, Fibonacci-Folge, T-Shirt-Sizing, Tipps zur Schatzung von User Stories im agilen Team. Vollstandiger kostenloser Leitfaden." />
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
        acceptedAnswer: { '@type': 'Answer', text: 'Planning Poker ist eine agile Schatzungstechnik, die in Scrum verwendet wird. Jedes Teammitglied wahlt heimlich eine Karte, die seine Schatzung einer User Story darstellt, dann werden alle gleichzeitig aufgedeckt. Die Unterschiede fuhren zu einer Diskussion, die die kollektive Schatzung verfeinert.' },
      },
      {
        '@type': 'Question',
        name: 'Warum die Fibonacci-Folge beim Planning Poker verwenden?',
        acceptedAnswer: { '@type': 'Answer', text: 'Die Fibonacci-Folge (1, 2, 3, 5, 8, 13, 21) spiegelt wachsende Unsicherheit wider: Je grosser eine Aufgabe, desto weniger genau kann sie geschatzt werden. Der Abstand zwischen den Werten wachst, was das Team zwingt, sich klar zu positionieren.' },
      },
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen Story Points und Tagen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Story Points messen relative Komplexitat, nicht Zeit. Eine 5 ist etwa 2,5-mal komplexer als eine 2, unabhangig von der tatsachlichen Dauer. Diese Abstraktion ermoglicht den Vergleich von Aufgaben, ohne sich auf individuelle Dauern zu versteifen.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de/a-propos" class="back-link">← Uber CleanPoker</a>

    <h1>Planning Poker: vollstandiger Leitfaden</h1>

    <p>
      <strong>Planning Poker</strong> ist die am weitesten verbreitete Schatzungstechnik in
      <strong>Scrum</strong> und Agilitat. In 5 Minuten alles, was du wissen musst.
    </p>

    <h2>Was ist Planning Poker?</h2>
    <p>
      Planning Poker (auch <em>Scrum Poker</em> genannt) ist eine kollaborative Schatzungstechnik,
      bei der jedes Teammitglied <strong>heimlich</strong> eine Karte mit seiner Schatzung einer
      User Story oder Aufgabe wahlt. Alle decken ihre Karten <strong>gleichzeitig</strong> auf.
      Unterschiede fuhren zu einer kurzen Diskussion, dann stimmt das Team erneut ab bis zur
      Konvergenz.
    </p>

    <h2>Die Regeln in 5 Schritten</h2>
    <ol>
      <li>Der Product Owner stellt eine User Story oder Aufgabe vor.</li>
      <li>Das Team stellt Klarungsfragen.</li>
      <li>Jedes Mitglied wahlt heimlich eine Karte (ohne andere zu beeinflussen).</li>
      <li>Alle decken gleichzeitig auf.</li>
      <li>Konvergieren die Schatzungen: Wert ubernehmen. Sonst: Extreme diskutieren, dann neu abstimmen.</li>
    </ol>

    <h2>Warum die Fibonacci-Folge?</h2>
    <p>
      Die Folge <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> ist die am haufigsten verwendete,
      da sie wachsende Unsicherheit modelliert: Je grosser eine Aufgabe, desto weniger genau
      kann sie geschatzt werden. Der Abstand zwischen den Werten wachst mit der Grosse, was das
      Team <strong>zwingt, sich klar zu positionieren</strong> ohne illusorische Prazision.
    </p>

    <h2>Vergleich der Kartenfolgen</h2>
    <table>
      <thead>
        <tr><th>Folge</th><th>Werte</th><th>Ideal fur</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fibonacci</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Erfahrene Scrum-Teams, Story-Point-Schatzung</td>
        </tr>
        <tr>
          <td><strong>T-Shirt</strong></td>
          <td>XS, S, M, L, XL, XXL, ?</td>
          <td>Grobe Schatzungen, nicht-technische Teams, Backlog-Sortierung</td>
        </tr>
        <tr>
          <td><strong>Zweierpotenzen</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Technische Aufgaben mit vorhersehbarer Komplexitatsverdoppelung</td>
        </tr>
      </tbody>
    </table>

    <h2>Haufig gestellte Fragen</h2>

    <details>
      <summary>Was ist der Unterschied zwischen Story Points und Tagen?</summary>
      <p>
        Story Points messen <strong>relative Komplexitat</strong>, nicht Zeit. Eine 5 ist etwa
        2,5-mal komplexer als eine 2, unabhangig von der tatsachlichen Dauer. Diese Abstraktion
        ermoglicht den Vergleich von Aufgaben, ohne sich auf individuelle Dauern zu versteifen.
      </p>
    </details>

    <details>
      <summary>Wie geht man mit Schatzungsunterschieden um?</summary>
      <p>
        Wenn die Schatzungen divergieren (z.B. eine 2 und eine 13 in derselben Runde), bitte die
        Personen, die an den Extremen gestimmt haben, ihre Wahl zu erklaren. Die Diskussion
        offenbart oft unterschiedliche Annahmen oder nicht identifizierte Risiken. Stimme
        erneut ab bis zur Konvergenz.
      </p>
    </details>

    <details>
      <summary>Funktioniert Planning Poker fur Remote-Teams?</summary>
      <p>
        Ja, genau dafur gibt es CleanPoker. Erstelle eine Session, teile die URL, jeder
        Teilnehmer stimmt auf seinem eigenen Gerat ab. Die Ergebnisse werden in Echtzeit
        uber WebSocket enthullt, ohne Konfiguration oder Konto.
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
      | <a href="/de/a-propos">Uber CleanPoker</a>
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
  ol { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
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
