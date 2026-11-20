<svelte:head>
  <title>T-shirt sizing: sizes, story points, session steps | PokerAgile</title>
  <meta name="description" content="T-shirt sizing in agile: the six sizes from XS to XXL, when they replace numbers, how to run a session, and an example conversion to story points." />
  <link rel="canonical" href="https://pokeragile.com/t-shirt-sizing" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/t-shirt-sizing" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/t-shirt-sizing" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/t-shirt-sizing" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/t-shirt-sizing" />
  <meta property="og:title" content="T-shirt sizing: sizes, story points, session steps" />
  <meta property="og:description" content="T-shirt sizing in agile: the six sizes from XS to XXL, when they replace numbers, how to run a session, and an example conversion to story points." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'T-shirt sizing: estimating in XS, S, M, L, XL and XXL',
    url: 'https://pokeragile.com/t-shirt-sizing',
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
        name: 'What are the T-shirt sizes in agile estimation?',
        acceptedAnswer: { '@type': 'Answer', text: 'Six sizes: XS, S, M, L, XL and XXL. They rank backlog items by relative size. Each team defines them with one reference item per size, and no size equals a fixed number of days.' },
      },
      {
        '@type': 'Question',
        name: 'How do you convert T-shirt sizes to story points?',
        acceptedAnswer: { '@type': 'Answer', text: 'No standard conversion exists. A team can adopt its own table, for example XS = 1, S = 2, M = 3, L = 5, XL = 8 and XXL = 13, and apply it when an item enters a sprint. An XXL item is split before it is converted.' },
      },
      {
        '@type': 'Question',
        name: 'Can you measure velocity with T-shirt sizes?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Velocity is the sum of the points finished per sprint, and sizes cannot be added. A team that needs velocity converts its sizes to points, or estimates its sprint stories directly in points.' },
      },
      {
        '@type': 'Question',
        name: 'Is T-shirt sizing the same as planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. T-shirt sizing is a scale, and planning poker is a way of voting. A team that votes its sizes in secret and reveals them together plays planning poker with a T-shirt deck, which is what the T-shirt preset of PokerAgile does.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">Planning poker guide</a>

    <h1>T-shirt sizing: estimating in XS, S, M, L, XL and XXL</h1>

    <p class="lead">
    T-shirt sizing is a relative estimation technique: the team sorts backlog items into six sizes, XS, S, M, L, XL and XXL, instead of giving them a number. A size says how large an item is compared with the others, not how many days it takes.
    </p>

    <h2>What a size says, and what it does not</h2>
    <p>The six sizes are ordered: an L is larger than an M. They are not proportional: nothing in the scale says an L is twice an M, and two sizes cannot be added. Each team gives the sizes their meaning by picking one reference item per size, so one team's M can be another team's L.</p>

    <h2>When T-shirt sizes work better than numbers</h2>
    <ul>
    <li><strong>A roadmap or a quarterly plan.</strong> An item described in one sentence can be called small, medium or large. Choosing between a 5 and an 8 needs details nobody has written yet.</li>
    <li><strong>Epics.</strong> An epic gets a size before it is split. Its stories get story points after the split.</li>
    <li><strong>A new team.</strong> It has no velocity yet, so points cannot forecast anything. Sizes are enough to order its first backlog.</li>
    <li><strong>Non-technical stakeholders.</strong> A sales or marketing lead can vote S or L without learning what a story point is.</li>
    </ul>

    <h2>When numbers are needed</h2>
    <ul>
    <li><strong>Velocity.</strong> Velocity is the sum of the points finished in a sprint. Two M and one L have no sum.</li>
    <li><strong>Sprint capacity.</strong> A team that finishes 23 points per sprint can check that its sprint plan adds up to about 23. Sizes give nothing to add up.</li>
    <li><strong>A date.</strong> 140 points at 23 points per sprint is about 6 sprints. The same backlog in sizes gives no date until the sizes are converted.</li>
    </ul>
    <p>The <a href="/story-points">story points page</a> covers velocity and forecasting.</p>

    <h2>How to run a T-shirt sizing session with PokerAgile</h2>
    <ol>
    <li>Open the <a href="/?cards=XS,S,M,L,XL,XXL,?">PokerAgile home page</a> and click the "T-shirt" preset. The deck is XS, S, M, L, XL, XXL and "?".</li>
    <li>Create the room and send its link to the team. Joining asks for a name, not an account.</li>
    <li>Before the first vote, agree on one item everyone knows and call it M.</li>
    <li>Read the item to estimate and answer questions.</li>
    <li>Everyone picks a size in secret. The "?" card means "I don't know".</li>
    <li>Reveal the cards. The room shows the agreement, which is the share of the votes on the most chosen size, and one bar per size with its number of votes. It shows no average, because sizes are not numbers.</li>
    <li>If the sizes differ, the person with the smallest size and the person with the largest explain their choice, then the team votes again.</li>
    <li>Keep a size. If you pasted a list of items into the room, the size kept stays next to each item, and the list can be downloaded as CSV or copied as Markdown.</li>
    </ol>

    <h2>Example: five roadmap items sized by five people</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Item</th><th>First-round votes</th><th>Agreement</th><th>Size kept</th></tr></thead>
    <tbody>
    <tr><td>Rename the billing page</td><td>XS, XS, XS, XS, S</td><td>80%</td><td>XS</td></tr>
    <tr><td>Dark mode</td><td>S, S, M, M, M</td><td>60%</td><td>M</td></tr>
    <tr><td>Invoice export to CSV</td><td>M, M, M, M, M</td><td>100%</td><td>M</td></tr>
    <tr><td>Single sign-on for company accounts</td><td>L, XL, XL, XL, XXL</td><td>60%</td><td>XL</td></tr>
    <tr><td>Mobile app</td><td>XL, XXL, XXL, XXL, XXL</td><td>80%</td><td>XXL</td></tr>
    </tbody>
    </table>
    </div>
    <p>On dark mode, the two people who voted S had not counted the 40 screens to check one by one; the second round gives five M. On single sign-on, the L and the XXL explain their card, and the second round gives four XL and one XXL. The mobile app stays XXL and goes back to the product owner to be split before any sprint.</p>

    <h2>Converting T-shirt sizes to story points: one example</h2>
    <p>No standard conversion exists. The table below is the choice of one team, built on the Fibonacci cards. Another team can pick other values.</p>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Size</th><th>Story points</th><th>Reference item of this team</th></tr></thead>
    <tbody>
    <tr><td>XS</td><td>1</td><td>Fix the label of a button</td></tr>
    <tr><td>S</td><td>2</td><td>Add an optional field to a form</td></tr>
    <tr><td>M</td><td>3</td><td>Add a phone field to the profile form, with validation</td></tr>
    <tr><td>L</td><td>5</td><td>Export orders to CSV</td></tr>
    <tr><td>XL</td><td>8</td><td>Add search and filters to the order list</td></tr>
    <tr><td>XXL</td><td>13</td><td>Pay by card through a new payment provider</td></tr>
    </tbody>
    </table>
    </div>
    <p>A team that adopts such a table converts once, when an item enters a sprint. An epic sized XXL is split first, and each of its stories is then estimated in points. The 13 from the table is dropped at that moment.</p>

    <h2>Common mistakes with T-shirt sizes</h2>
    <ul>
    <li><strong>Reading a size as a duration.</strong> "M = one week" turns a relative size into a deadline.</li>
    <li><strong>Adding sizes.</strong> "Three S make one L" is arithmetic the scale does not contain.</li>
    <li><strong>Adding XXS and XXXL.</strong> With eight sizes, the team is back to arguing between two neighbouring cards, which six sizes cut short.</li>
    <li><strong>Letting an XXL into a sprint.</strong> The largest size means "split this item", as a 21 does in a Fibonacci deck.</li>
    <li><strong>Comparing two teams.</strong> Each team has its own reference items, so its own M.</li>
    <li><strong>Keeping both scales on one item.</strong> An item that carries an M and a 5 has two estimates to keep in sync.</li>
    </ul>

    <h2>T-shirt sizes versus Fibonacci story points</h2>
    <div class="table-wrap">
    <table>
    <thead><tr><th>Criterion</th><th>T-shirt sizes</th><th>Fibonacci story points</th></tr></thead>
    <tbody>
    <tr><td>Cards in PokerAgile</td><td>XS, S, M, L, XL, XXL, ?</td><td>1, 2, 3, 5, 8, 13, 21, ?</td></tr>
    <tr><td>Values can be added</td><td>No</td><td>Yes</td></tr>
    <tr><td>Velocity</td><td>Cannot be computed</td><td>Sum of the points finished per sprint</td></tr>
    <tr><td>Usual object</td><td>Epics, roadmap items</td><td>User stories of a sprint</td></tr>
    <tr><td>Shown at the reveal in PokerAgile</td><td>Agreement, votes per size</td><td>Average, median, minimum, maximum, agreement, votes per card</td></tr>
    <tr><td>Forecasting a date</td><td>After conversion to points</td><td>Backlog points divided by velocity</td></tr>
    </tbody>
    </table>
    </div>

    <h2>FAQ</h2>
    <h3>What are the T-shirt sizes in agile estimation?</h3>
    <p>Six sizes: XS, S, M, L, XL and XXL. They rank backlog items by relative size. Each team defines them with one reference item per size, and no size equals a fixed number of days.</p>
    <h3>How do you convert T-shirt sizes to story points?</h3>
    <p>No standard conversion exists. A team can adopt its own table, for example XS = 1, S = 2, M = 3, L = 5, XL = 8 and XXL = 13, and apply it when an item enters a sprint. An XXL item is split before it is converted.</p>
    <h3>Can you measure velocity with T-shirt sizes?</h3>
    <p>No. Velocity is the sum of the points finished per sprint, and sizes cannot be added. A team that needs velocity converts its sizes to points, or estimates its sprint stories directly in points.</p>
    <h3>Is T-shirt sizing the same as planning poker?</h3>
    <p>No. T-shirt sizing is a scale, and planning poker is a way of voting. A team that votes its sizes in secret and reveals them together plays planning poker with a T-shirt deck, which is what the T-shirt preset of PokerAgile does.</p>

    <div class="cta">
      <a href="/?cards=XS,S,M,L,XL,XXL,?" class="btn">Create a room with the T-shirt deck</a>
    </div>

    <p class="related">
      See also:
      <a href="/story-points">story points</a>,
      <a href="/fibonacci">the Fibonacci sequence</a>,
      <a href="/alternatives">alternatives to planning poker</a>,
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/scrum-poker">scrum poker online</a>.
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
