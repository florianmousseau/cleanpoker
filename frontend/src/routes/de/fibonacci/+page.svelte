<svelte:head>
  <title>Fibonacci im Planning Poker: Warum und wie man es verwendet | CleanPoker</title>
  <meta name="description" content="Warum verwenden agile Teams die Fibonacci-Folge im Planning Poker? Psychologie, Kartenauswahl und Vergleich mit anderen Skalen." />
  <link rel="canonical" href="https://cleanpoker.dev/de/fibonacci" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/fibonacci" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/fibonacci" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/fibonacci" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/fibonacci" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/fibonacci" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/fibonacci" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fibonacci im Planning Poker: Warum und wie man es verwendet',
    url: 'https://cleanpoker.dev/de/fibonacci',
    description: 'Vollständiger Leitfaden zur Fibonacci-Folge in agilen Schätzungen: Psychologie, Kartenauswahl und Skalenvergleich.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Warum verwendet Planning Poker Fibonacci-Zahlen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Fibonacci-Zahlen (1, 2, 3, 5, 8, 13, 21) modellieren wachsende Unsicherheit: Je größer eine Aufgabe, desto ungenauer kann sie geschätzt werden. Die wachsenden Abstände zwischen den Werten zwingen das Team zu einer klaren Positionierung ohne falsche Präzision.' },
      },
      {
        '@type': 'Question',
        name: 'Was bedeutet die ?-Karte im Planning Poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Die ?-Karte signalisiert "Ich kann diese Aufgabe nicht schätzen." Es ist ein gesundes Zeichen, dass die Story unklar ist, zu groß oder hat ungelöste Abhängigkeiten. Sie löst eine Klärungsdiskussion aus, bevor geschätzt wird.' },
      },
      {
        '@type': 'Question',
        name: 'Standard-Fibonacci oder modifiziertes Fibonacci verwenden?',
        acceptedAnswer: { '@type': 'Answer', text: 'Beide funktionieren. Standard-Fibonacci (1-21) eignet sich für die meisten Scrum-Teams. Modifiziertes Fibonacci mit 0, 0,5 und Werten über 21 ist nützlich, wenn sehr kleine Aufgaben oder Epics im gleichen Backlog unterschieden werden müssen.' },
      },
      {
        '@type': 'Question',
        name: 'Gibt es einen richtigen Fibonacci-Wert für eine Aufgabe?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nein. Story Points sind relativ, nicht absolut. Eine 5 ist ungefähr doppelt so komplex wie eine 3 im gemeinsamen Referenzrahmen des Teams. Das Ziel ist Konsistenz über die Zeit, damit Velocity ein zuverlässiges Planungsinstrument wird.' },
      },
      {
        '@type': 'Question',
        name: 'Wann sollte ein Team von Fibonacci zu T-Shirt-Größen wechseln?',
        acceptedAnswer: { '@type': 'Answer', text: 'T-Shirt-Größen (XS bis XXL) eignen sich besser für grobe Backlog-Pflege zu Projektbeginn oder für nicht-technische Stakeholder. Sobald das Team Velocity-Tracking benötigt, wechselt es zu Fibonacci Story Points für numerisches Tracking.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de/a-propos" class="back-link">← Uber uns</a>

    <h1>Fibonacci im Planning Poker</h1>

    <p>
      Die Fibonacci-Folge ist die Grundlage des Planning Pokers. <em>Warum</em> sie funktioniert
      zu verstehen hilft Teams, sie besser zu nutzen und die richtige Skala zu wählen.
    </p>

    <h2>Was ist die Fibonacci-Folge?</h2>
    <p>
      Die Fibonacci-Folge ist <strong>1, 1, 2, 3, 5, 8, 13, 21, 34…</strong> wobei jede Zahl
      die Summe der beiden vorherigen ist. Im Planning Poker wird typischerweise
      <strong>1, 2, 3, 5, 8, 13, 21</strong> plus eine <strong>?</strong>-Karte verwendet.
    </p>
    <p>
      Die Schlüsseleigenschaft: <strong>Die Lücken wachsen mit dem Wert</strong>. Das spiegelt
      wider, wie menschliche Kognition bei Unsicherheit funktioniert.
    </p>

    <h2>Warum Fibonacci statt 1-10?</h2>
    <p>
      Eine lineare Skala erzeugt falsche Präzision. Mit Fibonacci ist die Wahl grober:
      Ist das eine 5 oder eine 8? Das ist ein bedeutsamer Unterschied, der
      <strong>Diskussionen statt Punktarithmetik</strong> fördert.
    </p>

    <h2>Die ?-Karte: ein unterschätztes Signal</h2>
    <p>
      Die <strong>?</strong>-Karte bedeutet: "Ich kann diese Story nicht schätzen." Gültige
      Gründe: unklare Akzeptanzkriterien, ungelöste technische Abhängigkeiten, zu große Story,
      oder fehlender Kontext. Sie sollte immer eine Klärungs-Diskussion auslösen.
    </p>

    <h2>Standard- vs. modifiziertes Fibonacci</h2>
    <table>
      <thead>
        <tr><th>Skala</th><th>Werte</th><th>Am besten für</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Standard</strong></td><td>1, 2, 3, 5, 8, 13, 21, ?</td><td>Die meisten Scrum-Teams</td></tr>
        <tr><td><strong>Modifiziert</strong></td><td>0, 0,5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?</td><td>Teams mit sehr kleinen Tasks und Epics im gleichen Backlog</td></tr>
        <tr><td><strong>Zweierpotenzen</strong></td><td>1, 2, 4, 8, 16, 32, 64, ?</td><td>Technische Teams mit vorhersehbarer Komplexitätsverdopplung</td></tr>
      </tbody>
    </table>

    <h2>Häufig gestellte Fragen</h2>

    <details>
      <summary>Warum verwendet Planning Poker Fibonacci-Zahlen?</summary>
      <p>
        Fibonacci-Zahlen modellieren wachsende Unsicherheit: Je grösser eine Aufgabe, desto
        weniger präzise kann sie geschätzt werden. Die wachsende Lücke zwischen Werten zwingt
        das Team zu einer klaren Positionierung ohne falsche Präzision.
      </p>
    </details>

    <details>
      <summary>Gibt es einen richtigen Fibonacci-Wert für eine gegebene Aufgabe?</summary>
      <p>
        Nein. Story Points sind relativ zum Referenzrahmen des Teams. Was zählt ist Konsistenz
        über die Zeit, damit Velocity ein zuverlässiges Planungswerkzeug wird.
      </p>
    </details>

    <div class="cta">
      <a href="/de" class="btn">Mit CleanPoker ausprobieren →</a>
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
