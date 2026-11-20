<svelte:head>
  <title>Scrum poker online: free tool, no account | PokerAgile</title>
  <meta name="description" content="Scrum poker online: create a room, send the link, vote in secret and reveal the cards together. Fibonacci, T-shirt or custom decks, free, no account." />
  <link rel="canonical" href="https://pokeragile.com/scrum-poker" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/scrum-poker" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/scrum-poker" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es/scrum-poker" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de/scrum-poker" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt/scrum-poker" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/scrum-poker" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/scrum-poker" />
  <meta property="og:title" content="Scrum poker online: free tool, no account" />
  <meta property="og:description" content="Scrum poker online: create a room, send the link, vote in secret and reveal the cards together. Fibonacci, T-shirt or custom decks, free, no account." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Scrum poker online',
    url: 'https://pokeragile.com/scrum-poker',
    inLanguage: 'en',
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
        name: 'Is scrum poker the same as planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both names refer to the same technique: pick a card in secret, reveal all cards at the same time, then discuss the gaps. "Planning poker" is the name James Grenning used in 2002. "Pointing poker" is a third name.' },
      },
      {
        '@type': 'Question',
        name: 'Is scrum poker part of Scrum?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. The 2020 Scrum Guide mentions neither scrum poker, nor planning poker, nor story points. Teams use the technique during backlog refinement or sprint planning.' },
      },
      {
        '@type': 'Question',
        name: 'Which cards are used in scrum poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most often 1, 2, 3, 5, 8, 13 and 21, taken from the Fibonacci sequence. Some decks use the rounded variant 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. The gap between two cards grows with size: 1 point between 2 and 3, 8 points between 13 and 21.' },
      },
      {
        '@type': 'Question',
        name: 'What do you do when the cards differ at the reveal?',
        acceptedAnswer: { '@type': 'Answer', text: 'The person who voted lowest and the person who voted highest explain their choice, then the team votes again. If the votes are still split between two adjacent cards after two rounds, the team takes the higher one.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">Planning poker guide</a>

    <h1>Scrum poker online</h1>

    <p class="lead">
    Scrum poker, planning poker and pointing poker are three names for one estimation technique: each team member picks a card in secret, and all cards are turned over at the same time. James Grenning described it in 2002 under the name planning poker, and Mike Cohn's 2005 book "Agile Estimating and Planning" made it widely known. "Planning Poker" is a registered trademark of Mountain Goat Software, Mike Cohn's company, and many tools go by "scrum poker" or "pointing poker".
    </p>

    <div class="cta">
    <a href="/" class="btn">Create a scrum poker room</a>
    </div>

    <h2>How a scrum poker round goes</h2>
    <ol>
    <li>One person <a href="/">creates a room on PokerAgile</a>, chooses the card deck and sends the link to the team.</li>
    <li>Each person opens the link and types a first name or a username. Someone who watches without voting joins as an observer.</li>
    <li>The product owner reads the user story and answers questions.</li>
    <li>Each participant picks a card. The room shows who has voted, not which card.</li>
    <li>Once everyone has voted, the "Reveal" button turns all cards over at the same time. An option reveals them automatically when the last vote arrives.</li>
    <li>The person who voted lowest and the person who voted highest explain their card. The team then starts a new round or keeps a card for the story.</li>
    </ol>

    <h2>The card decks</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Deck</th><th>Cards</th></tr></thead>
    <tbody>
    <tr><td>Fibonacci</td><td>1, 2, 3, 5, 8, 13, 21, ?</td></tr>
    <tr><td>T-shirt</td><td>XS, S, M, L, XL, XXL, ?</td></tr>
    <tr><td>Powers of two (2ⁿ)</td><td>1, 2, 4, 8, 16, 32, 64, ?</td></tr>
    <tr><td>Custom</td><td>A comma-separated list of 2 to 64 cards, 16 characters at most per card</td></tr>
    </tbody>
    </table>
    </div>
    <p>Fibonacci is selected when the page opens. The "?" card means "I don't know" and is left out of the average.</p>

    <h2>What the room shows at the reveal</h2>
    <ul>
    <li>The average, the median, the minimum and the maximum of the numeric votes.</li>
    <li>The agreement: the share of the votes that went to the most chosen card, as a percentage.</li>
    <li>One bar per card, with its number of votes.</li>
    </ul>
    <p>Example: five people vote 3, 5, 5, 5 and 8. The room shows an average of 5.2, a median of 5, a minimum of 3, a maximum of 8 and an agreement of 60%. With the T-shirt deck there are no numbers: the room shows the agreement and the bars only. If the team pasted a list of stories, the card kept stays next to each story, and the list can be downloaded as CSV or copied as Markdown.</p>

    <h2>What PokerAgile is</h2>
    <ul>
    <li><strong>Price</strong>: free. There is no paid tier and no cap on participants or sessions.</li>
    <li><strong>Account</strong>: none. A name is enough to join a room.</li>
    <li><strong>Source code</strong>: published on <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">GitHub</a> under the MIT license.</li>
    <li><strong>Data</strong>: rooms are kept in memory on a server in France and deleted 24 hours after the last activity.</li>
    <li><strong>AI</strong>: an assistant such as Claude, ChatGPT or Cursor can <a href="/planning-poker-ai">join the room and vote through MCP</a>.</li>
    <li><strong>Languages</strong>: English, French, German, Spanish and Portuguese.</li>
    </ul>

    <h2>FAQ</h2>
    <h3>Is scrum poker the same as planning poker?</h3>
    <p>Yes. Both names refer to the same technique: pick a card in secret, reveal all cards at the same time, then discuss the gaps. "Planning poker" is the name James Grenning used in 2002. "Pointing poker" is a third name.</p>
    <h3>Is scrum poker part of Scrum?</h3>
    <p>No. The 2020 Scrum Guide mentions neither scrum poker, nor planning poker, nor story points. Teams use the technique during backlog refinement or sprint planning.</p>
    <h3>Which cards are used in scrum poker?</h3>
    <p>Most often 1, 2, 3, 5, 8, 13 and 21, taken from the Fibonacci sequence. Some decks use the rounded variant 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. The gap between two cards grows with size: 1 point between 2 and 3, 8 points between 13 and 21.</p>
    <h3>What do you do when the cards differ at the reveal?</h3>
    <p>The person who voted lowest and the person who voted highest explain their choice, then the team votes again. If the votes are still split between two adjacent cards after two rounds, the team takes the higher one.</p>

    <div class="cta">
      <a href="/" class="btn">Create a scrum poker room</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/fibonacci">the Fibonacci sequence</a>,
      <a href="/story-points">story points</a>,
      <a href="/t-shirt-sizing">T-shirt sizing</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">MIT License</a>
      | <a href="/a-propos">About</a>
      | <a href="/mentions-legales">Legal notice</a>
      | <a href="/mentions-legales#confidentialite">Privacy</a>
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
