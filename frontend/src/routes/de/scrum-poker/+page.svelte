<svelte:head>
  <title>Scrum Poker online: kostenlos, ohne Konto | PokerAgile</title>
  <meta name="description" content="Scrum Poker online: Raum erstellen, Link verschicken, verdeckt abstimmen und die Karten gemeinsam aufdecken. Fibonacci, T-Shirt oder eigenes Kartenset." />
  <link rel="canonical" href="https://pokeragile.com/de/scrum-poker" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/scrum-poker" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/scrum-poker" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/scrum-poker" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/scrum-poker" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/scrum-poker" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/scrum-poker" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/de/scrum-poker" />
  <meta property="og:title" content="Scrum Poker online: kostenlos, ohne Konto" />
  <meta property="og:description" content="Scrum Poker online: Raum erstellen, Link verschicken, verdeckt abstimmen und die Karten gemeinsam aufdecken. Fibonacci, T-Shirt oder eigenes Kartenset." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Scrum Poker online',
    url: 'https://pokeragile.com/de/scrum-poker',
    inLanguage: 'de',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ist Scrum Poker dasselbe wie Planning Poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja. Beide Namen bezeichnen dieselbe Technik: verdeckt eine Karte wählen, alle Karten gleichzeitig aufdecken und über die Abweichungen sprechen. „Planning Poker“ ist der Name, den James Grenning 2002 verwendet hat. „Pointing Poker“ ist ein dritter Name.' },
      },
      {
        '@type': 'Question',
        name: 'Gehört Scrum Poker zu Scrum?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nein. Der Scrum Guide von 2020 erwähnt weder Scrum Poker noch Planning Poker noch Story Points. Teams setzen die Technik im Backlog Refinement oder im Sprint Planning ein.' },
      },
      {
        '@type': 'Question',
        name: 'Welche Karten verwendet man beim Scrum Poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Am häufigsten 1, 2, 3, 5, 8, 13 und 21 aus der Fibonacci-Folge. Manche Kartensets nutzen die gerundete Variante 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. Der Abstand zwischen zwei Karten wächst mit der Größe: 1 Punkt zwischen 2 und 3, 8 Punkte zwischen 13 und 21.' },
      },
      {
        '@type': 'Question',
        name: 'Was tun, wenn die Karten beim Aufdecken auseinanderliegen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Die Person mit der niedrigsten und die Person mit der höchsten Karte erklären ihre Wahl, dann stimmt das Team erneut ab. Liegen die Stimmen nach zwei Runden immer noch zwischen zwei benachbarten Karten, nimmt das Team die höhere.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/de/planning-poker" class="back-link">Planning-Poker-Leitfaden</a>

    <h1>Scrum Poker online</h1>

    <p class="lead">
    Scrum Poker, Planning Poker und Pointing Poker sind drei Namen für dieselbe Schätztechnik: Jedes Teammitglied wählt verdeckt eine Karte, und alle Karten werden gleichzeitig aufgedeckt. James Grenning hat das Verfahren 2002 unter dem Namen Planning Poker beschrieben, Mike Cohn hat es 2005 mit seinem Buch „Agile Estimating and Planning“ bekannt gemacht. „Planning Poker“ ist eine eingetragene Marke von Mountain Goat Software, dem Unternehmen von Mike Cohn, und viele Werkzeuge heißen „Scrum Poker“ oder „Pointing Poker“.
    </p>

    <div class="cta">
    <a href="/de" class="btn">Scrum-Poker-Raum erstellen</a>
    </div>

    <h2>So läuft eine Runde Scrum Poker ab</h2>
    <ol>
    <li>Eine Person <a href="/de">erstellt einen Raum auf PokerAgile</a>, wählt das Kartenset und schickt den Link an das Team.</li>
    <li>Jede Person öffnet den Link und gibt einen Vornamen oder ein Pseudonym ein. Wer zusieht, ohne abzustimmen, tritt als Beobachter bei.</li>
    <li>Der Product Owner liest die User Story vor und beantwortet Fragen.</li>
    <li>Alle Teilnehmenden wählen eine Karte. Der Raum zeigt, wer abgestimmt hat, aber nicht, welche Karte.</li>
    <li>Sobald alle abgestimmt haben, deckt die Schaltfläche „Aufdecken“ alle Karten gleichzeitig auf. Eine Option deckt sie automatisch auf, wenn die letzte Stimme eingeht.</li>
    <li>Wer am niedrigsten und wer am höchsten geschätzt hat, begründet die eigene Karte. Danach startet das Team eine neue Runde oder hält eine Karte für die Story fest.</li>
    </ol>

    <h2>Die Kartensets</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Kartenset</th><th>Karten</th></tr></thead>
    <tbody>
    <tr><td>Fibonacci</td><td>1, 2, 3, 5, 8, 13, 21, ?</td></tr>
    <tr><td>T-shirt</td><td>XS, S, M, L, XL, XXL, ?</td></tr>
    <tr><td>Zweierpotenzen (2ⁿ)</td><td>1, 2, 4, 8, 16, 32, 64, ?</td></tr>
    <tr><td>Eigenes Set</td><td>Eine durch Kommas getrennte Liste mit 2 bis 64 Karten, höchstens 16 Zeichen pro Karte</td></tr>
    </tbody>
    </table>
    </div>
    <p>Beim Öffnen der Seite ist Fibonacci ausgewählt. Die Karte „?“ bedeutet „Ich weiß es nicht“ und fließt nicht in den Durchschnitt ein.</p>

    <h2>Was der Raum beim Aufdecken zeigt</h2>
    <ul>
    <li>Durchschnitt, Median, Minimum und Maximum der Stimmen mit Zahlenwert.</li>
    <li>Die Einigkeit: der Anteil der Stimmen für die meistgewählte Karte, in Prozent.</li>
    <li>Einen Balken pro Karte mit der Anzahl der Stimmen.</li>
    </ul>
    <p>Beispiel: Fünf Personen legen 3, 5, 5, 5 und 8. Der Raum zeigt einen Durchschnitt von 5,2, einen Median von 5, ein Minimum von 3, ein Maximum von 8 und eine Einigkeit von 60 %. Mit dem T-Shirt-Set gibt es keine Zahlen: Der Raum zeigt dann nur die Einigkeit und die Balken. Hat das Team eine Liste von Stories eingefügt, bleibt die festgehaltene Karte neben jeder Story stehen, und die Liste lässt sich als CSV herunterladen oder als Markdown kopieren.</p>

    <h2>Was PokerAgile ist</h2>
    <ul>
    <li><strong>Preis</strong>: kostenlos. Es gibt keinen Bezahltarif und keine Obergrenze für Teilnehmende oder Sitzungen.</li>
    <li><strong>Konto</strong>: keines. Zum Beitreten genügt ein Name.</li>
    <li><strong>Quellcode</strong>: auf <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">GitHub</a> unter der MIT-Lizenz veröffentlicht.</li>
    <li><strong>Daten</strong>: Die Räume liegen im Arbeitsspeicher eines Servers in Frankreich und werden 24 Stunden nach der letzten Aktivität gelöscht.</li>
    <li><strong>KI</strong>: Ein Assistent wie Claude, ChatGPT oder Cursor kann dem Raum über MCP beitreten und mit abstimmen.</li>
    <li><strong>Sprachen</strong>: Deutsch, Englisch, Französisch, Spanisch und Portugiesisch.</li>
    </ul>

    <h2>Häufig gestellte Fragen</h2>
    <h3>Ist Scrum Poker dasselbe wie Planning Poker?</h3>
    <p>Ja. Beide Namen bezeichnen dieselbe Technik: verdeckt eine Karte wählen, alle Karten gleichzeitig aufdecken und über die Abweichungen sprechen. „Planning Poker“ ist der Name, den James Grenning 2002 verwendet hat. „Pointing Poker“ ist ein dritter Name.</p>
    <h3>Gehört Scrum Poker zu Scrum?</h3>
    <p>Nein. Der Scrum Guide von 2020 erwähnt weder Scrum Poker noch Planning Poker noch Story Points. Teams setzen die Technik im Backlog Refinement oder im Sprint Planning ein.</p>
    <h3>Welche Karten verwendet man beim Scrum Poker?</h3>
    <p>Am häufigsten 1, 2, 3, 5, 8, 13 und 21 aus der Fibonacci-Folge. Manche Kartensets nutzen die gerundete Variante 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. Der Abstand zwischen zwei Karten wächst mit der Größe: 1 Punkt zwischen 2 und 3, 8 Punkte zwischen 13 und 21.</p>
    <h3>Was tun, wenn die Karten beim Aufdecken auseinanderliegen?</h3>
    <p>Die Person mit der niedrigsten und die Person mit der höchsten Karte erklären ihre Wahl, dann stimmt das Team erneut ab. Liegen die Stimmen nach zwei Runden immer noch zwischen zwei benachbarten Karten, nimmt das Team die höhere.</p>

    <div class="cta">
      <a href="/de" class="btn">Scrum-Poker-Raum erstellen</a>
    </div>

    <p class="related">
      Siehe auch:
      <a href="/de/planning-poker">der Planning-Poker-Leitfaden</a>,
      <a href="/de/fibonacci">die Fibonacci-Folge</a>,
      <a href="/de/estimation-agile">agile Schätzung</a>,
      <a href="/de/alternatives">Alternativen zu Planning Poker</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Quellcode</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">MIT-Lizenz</a>
      | <a href="/de/a-propos">Über uns</a>
      | <a href="/de/mentions-legales">Impressum</a>
      | <a href="/de/mentions-legales#confidentialite">Datenschutz</a>
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
  h3 { margin-top: 1.25rem; margin-bottom: 0.25rem; font-size: 1rem; }

  p, li { line-height: 1.7; }

  .lead { font-size: 1.05rem; color: var(--color-text-muted); }

  ul, ol {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .table-wrap { overflow-x: auto; }

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


  .cta {
    margin-top: 2.5rem;
    text-align: center;
  }

  .btn {
    display: inline-block;
    padding: 0.875rem min(2rem, 32px);
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: opacity 0.15s;
  }

  .btn:hover { opacity: 0.85; }

  .related {
    margin-top: 2.5rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }


  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
