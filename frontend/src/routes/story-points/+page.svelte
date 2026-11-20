<svelte:head>
  <title>Story points: definition, Fibonacci and estimation | PokerAgile</title>
  <meta name="description" content="Story points explained: what one point measures, why the scale is Fibonacci, how a team calibrates, story point estimation in planning poker, and velocity." />
  <link rel="canonical" href="https://pokeragile.com/story-points" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/story-points" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/story-points" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/story-points" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Story points: definition, Fibonacci scale and estimation',
    url: 'https://pokeragile.com/story-points',
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
        name: 'How many hours is one story point?',
        acceptedAnswer: { '@type': 'Answer', text: 'No fixed number. A story point compares the size of a story with a reference story from the same team. Duration comes from velocity: a team that finishes 23 points per two-week sprint will deliver a 46-point batch in about two sprints, or four weeks.' },
      },
      {
        '@type': 'Question',
        name: 'Why do story points use the Fibonacci sequence?',
        acceptedAnswer: { '@type': 'Answer', text: 'Because the gap between two cards grows with size: 1 point between 2 and 3, 8 points between 13 and 21. The larger a story, the less precise its estimate, and the scale removes the in-between values a team cannot tell apart.' },
      },
      {
        '@type': 'Question',
        name: 'How do you calculate story points for a user story?',
        acceptedAnswer: { '@type': 'Answer', text: 'You compare rather than calculate. The team picks a reference story, at 3 points for example, then everyone votes in secret on whether the new story is smaller, the same size or larger. The card the team settles on after discussion is the estimate.' },
      },
      {
        '@type': 'Question',
        name: 'Can you compare the velocity of two teams?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Each team has its own reference story, so its own point. A team at 60 points per sprint does not necessarily deliver more than a team at 30. Velocity forecasts the next sprints of the team that measured it.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">Planning poker guide</a>

    <h1>Story points: definition, Fibonacci scale and estimation</h1>

    <p class="lead">
      A story point is a unit of relative size: it compares one user story with another story from the same team, without converting to hours. The most common cards are 1, 2, 3, 5, 8, 13 and 21.
    </p>

    <h2>What is a story point?</h2>
    <p>A story point measures the size of a user story against the other stories in the backlog. Three things go into the number:</p>
    <ul>
      <li><strong>Effort</strong>: the amount of work, including tests and code review. When an AI agent writes part of the code, reviewing and verifying its output still counts in the card.</li>
      <li><strong>Complexity</strong>: how many cases to handle and how many components to change.</li>
      <li><strong>Uncertainty</strong>: what the team does not know yet, such as an API it has never called.</li>
    </ul>
    <p>A 2-point story is judged twice the size of a 1-point story. The number does not say it will take two days.</p>
    <p>The unit comes from Extreme Programming, in the late 1990s. Ron Jeffries, one of the method's founders, <a href="https://ronjeffries.com/articles/019-01ff/story-points/Index.html" rel="noopener noreferrer">wrote in 2019</a> that he may have invented it. The <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">2020 Scrum Guide</a> mentions neither story points nor velocity: they are a team practice, not a Scrum rule.</p>

    <h2>Why story points use the Fibonacci sequence</h2>
    <p>In the Fibonacci sequence, each value is the sum of the two before it: 1, 2, 3, 5, 8, 13, 21. From 5 upward, each card is about 60% larger than the previous one (13 divided by 8 is 1.625). The gap therefore grows with size: 1 point between 2 and 3, 8 points between 13 and 21.</p>
    <p>A team can tell a 2 from a 3. It cannot tell an 18 from a 19. Since those two cards do not exist, the team picks 13 or 21, and the discussion is about the order of magnitude. A story estimated at 21 is usually split into smaller stories before it enters a sprint.</p>
    <p>Some card decks use a rounded variant: 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100. By default, PokerAgile offers 1, 2, 3, 5, 8, 13, 21 and a "?" card that means "I don't know".</p>

    <h2>How a team calibrates its story points</h2>
    <ol>
      <li>Pick a story that has already shipped, that the whole team knows, of medium size.</li>
      <li>Give it 3 or 5 points. The number is arbitrary: it leaves cards below and above.</li>
      <li>Compare every new story with that reference: smaller, the same size or larger, and by how much.</li>
      <li>Keep two or three reference stories, for example one at 2, one at 5 and one at 13, and review them at the start of each session.</li>
    </ol>

    <h2>Story point estimation in planning poker, step by step</h2>
    <p>Planning poker was described by James Grenning in 2002, then taken up by Mike Cohn in his 2005 book "Agile Estimating and Planning". A session has six steps:</p>
    <ol>
      <li>One person <a href="/">creates a PokerAgile room</a> and sends the link to the team. Joining requires no account.</li>
      <li>The product owner reads the story and answers questions.</li>
      <li>Everyone picks a card in secret.</li>
      <li>The cards are revealed at the same time, so the first number spoken does not influence the other votes.</li>
      <li>If the cards differ, the person who voted lowest and the person who voted highest explain their choice.</li>
      <li>The team votes again. If two rounds end split between two adjacent cards, the team takes the higher one.</li>
    </ol>
    <p>At the reveal, PokerAgile shows the average, the median, the minimum and the maximum of the votes. The story list keeps the card retained for each story and can be downloaded as CSV or copied as Markdown.</p>

    <h2>Converting story points to hours or days</h2>
    <p>The most common conversion, "1 point = 1 day", has three problems.</p>
    <ul>
      <li><strong>A point contains uncertainty.</strong> One 5-point story can take 2 days and another 6.</li>
      <li><strong>Duration depends on the person.</strong> A 4-hour task for someone who knows the module can take 12 hours for someone new to it.</li>
      <li><strong>The relative scale disappears.</strong> Once the conversion is written down, the team estimates in days and then translates into points.</li>
    </ul>
    <p>To give a date, go through velocity: 46 points at 23 points per two-week sprint is 2 sprints, or 4 weeks. The result holds for a batch of stories, not for a single story.</p>

    <h2>Velocity: forecasting with story points</h2>
    <p>Velocity is the total points of the stories finished during a sprint. A story that was started but not finished counts for zero. A team that finished 21, 26 and 23 points over its last three sprints has an average velocity of about 23 points. With a 140-point backlog, it has 6 sprints left at its best pace (140 divided by 26 is 5.4) and 7 at its slowest (140 divided by 21 is 6.7).</p>

    <h2>Common mistakes with story points</h2>
    <ul>
      <li><strong>Comparing two teams.</strong> Each has its own reference story. 30 points per sprint for one and 60 for the other do not say which one delivers more.</li>
      <li><strong>Turning points into a performance target.</strong> When a team is asked to raise its velocity, a 3 becomes a 5 for the same work, and the number stops forecasting anything.</li>
      <li><strong>Re-estimating after the fact.</strong> A story estimated at 3 that took twice as long stays a 3. Correcting it after delivery erases the gap that average velocity already absorbs. Re-estimate only if the scope changes before work starts.</li>
      <li><strong>Letting people who will not do the work vote.</strong> Cards are played by the people who build and test the story. The product owner answers questions and does not vote.</li>
    </ul>

    <h2>Example: three stories and their cards</h2>
    <p>A team of four uses "add a phone field to the profile form" as its reference story, at 3 points.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Story</th><th>First-round votes</th><th>Final card</th></tr></thead>
      <tbody>
        <tr><td>Fix the label of a button</td><td>1, 1, 1, 2</td><td>1</td></tr>
        <tr><td>Export orders to CSV</td><td>3, 5, 5, 5</td><td>5</td></tr>
        <tr><td>Pay by card through a new payment provider</td><td>5, 8, 13, 13</td><td>13</td></tr>
      </tbody>
    </table>
    </div>
    <p>On the first story, the person who voted 2 moves to 1 after a one-sentence explanation, with no second round. On the second, the person who voted 3 had not counted the tests for the export; in the second round, all four cards show 5. On the third, the votes run from 5 to 13: both 13s come from people who know the team has never called that provider's API. The team keeps 13. The batch is worth 19 points, less than one sprint for a team with a velocity of 23.</p>

    <h2>FAQ</h2>
    <h3>How many hours is one story point?</h3>
    <p>No fixed number. A story point compares the size of a story with a reference story from the same team. Duration comes from velocity: a team that finishes 23 points per two-week sprint will deliver a 46-point batch in about two sprints, or four weeks.</p>
    <h3>Why do story points use the Fibonacci sequence?</h3>
    <p>Because the gap between two cards grows with size: 1 point between 2 and 3, 8 points between 13 and 21. The larger a story, the less precise its estimate, and the scale removes the in-between values a team cannot tell apart.</p>
    <h3>How do you calculate story points for a user story?</h3>
    <p>You compare rather than calculate. The team picks a reference story, at 3 points for example, then everyone votes in secret on whether the new story is smaller, the same size or larger. The card the team settles on after discussion is the estimate.</p>
    <h3>Can you compare the velocity of two teams?</h3>
    <p>No. Each team has its own reference story, so its own point. A team at 60 points per sprint does not necessarily deliver more than a team at 30. Velocity forecasts the next sprints of the team that measured it.</p>

    <div class="cta">
      <a href="/" class="btn">Create a room</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/fibonacci">the Fibonacci sequence</a>,
      <a href="/estimation-agile">agile estimation</a>,
      <a href="/alternatives">alternatives to planning poker</a>,
      <a href="/planning-poker-ai">planning poker with AI</a>,
      <a href="/retrospective">retrospective formats</a>.
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
