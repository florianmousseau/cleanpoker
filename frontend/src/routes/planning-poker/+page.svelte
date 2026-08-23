<svelte:head>
  <title>Planning poker: rules, Fibonacci and practical guide | CleanPoker</title>
  <meta name="description" content="What is planning poker? The rules in 5 steps, the Fibonacci sequence, how long a session takes, remote and asynchronous estimation, and the mistakes that skew estimates. Free complete guide." />
  <link rel="canonical" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/planning-poker" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/planning-poker" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/planning-poker" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Planning poker: rules, Fibonacci and practical guide',
    url: 'https://cleanpoker.dev/planning-poker',
    description: 'Complete guide to planning poker: definition, rules, why Fibonacci, session length, remote and asynchronous estimation, how to use CleanPoker.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Planning poker is an agile estimation technique used in Scrum. Each team member secretly chooses a card representing their estimate for a user story, then all reveal simultaneously. Differences spark a discussion that refines the collective estimate.' },
      },
      {
        '@type': 'Question',
        name: 'Why use the Fibonacci sequence in planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'The Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) reflects growing uncertainty: the larger a task, the less precisely it can be estimated. The gap between values increases, forcing the team to take a clear position without artificial over-precision.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between story points and days?',
        acceptedAnswer: { '@type': 'Answer', text: 'Story points measure relative effort, not time: the volume of work, the uncertainty and the complexity taken together. The scale is relative, so a 5 is clearly bigger than a 2 without claiming an exact multiple of it. This abstraction lets teams compare tasks without getting blocked on individual durations that vary by person and context.' },
      },
      {
        '@type': 'Question',
        name: 'What is T-shirt sizing?',
        acceptedAnswer: { '@type': 'Answer', text: 'T-shirt sizing (XS, S, M, L, XL, XXL) is an alternative to Fibonacci, useful for rough estimates at the start of a project or for non-technical teams. Less precise than Fibonacci, it is faster for sorting a backlog.' },
      },
      {
        '@type': 'Question',
        name: 'How to handle estimation disagreements?',
        acceptedAnswer: { '@type': 'Answer', text: 'When estimates diverge (e.g., a 2 and a 13 in the same hand), ask the extremes to explain their vote. The discussion often reveals different assumptions or unidentified risks. Vote again until convergence.' },
      },
      {
        '@type': 'Question',
        name: 'How long does a planning poker session take?',
        acceptedAnswer: { '@type': 'Answer', text: 'Budget 2 to 5 minutes per user story: a minute of presentation, one round of voting, and discussion only when the cards disagree. A one-hour refinement session covers 12 to 20 stories. Past 90 minutes estimate quality drops, so split it into two sessions.' },
      },
      {
        '@type': 'Question',
        name: 'Can planning poker be done asynchronously?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, but you lose the point of it. Asynchronous voting gives you a number, while the value of the technique lies in the discussion the gaps trigger. A common compromise: vote asynchronously on the stories everyone agrees on, and keep a short synchronous session for the ones where estimates diverge.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/a-propos" class="back-link">← About</a>

    <h1>Planning poker: complete guide</h1>

    <p>
      <strong>Planning poker</strong> is the most widely used estimation technique in
      <strong>Scrum</strong> and agile. Here is everything you need to know in 5 minutes.
    </p>

    <h2>What is planning poker?</h2>
    <p>
      Planning poker (also called <em>Scrum poker</em>) is a collaborative estimation technique
      where each team member <strong>secretly</strong> chooses a card representing their estimate
      of a user story or task. All cards are revealed <strong>simultaneously</strong>. Differences
      trigger a short discussion, then the team revotes until convergence.
    </p>
    <p>
      The goal is not precision but <strong>discussion</strong>: uncovering hidden assumptions,
      unidentified risks and technical disagreements.
    </p>

    <h2>The rules in 5 steps</h2>
    <ol>
      <li>The Product Owner presents a user story or task.</li>
      <li>The team asks clarifying questions.</li>
      <li>Each member secretly chooses a card (without influencing others).</li>
      <li>All cards are revealed simultaneously.</li>
      <li>If estimates converge: keep the value. Otherwise: discuss the extremes, then revote.</li>
    </ol>

    <h2>How long does a session take?</h2>
    <p>
      Budget <strong>2 to 5 minutes per user story</strong>: a minute of presentation, one round
      of voting, and discussion only when the cards disagree. A one-hour refinement session
      therefore covers 12 to 20 stories, which is more than enough to feed a two-week sprint.
    </p>
    <p>
      Past <strong>90 minutes</strong>, estimate quality drops: fatigue pushes people to vote like
      their neighbour just to get it over with. Two 45-minute sessions beat one two-hour session.
      If a single story eats more than ten minutes, the problem is no longer estimation but
      framing: send it back to the backlog to be split.
    </p>

    <h2>Why the Fibonacci sequence?</h2>
    <p>
      The sequence <strong>1, 2, 3, 5, 8, 13, 21, ?</strong> is the most common because it models
      growing uncertainty: the larger a task, the less precisely it can be estimated. The gap
      between values grows with size, which <strong>forces the team to take a clear position</strong>
      without pretending to illusory precision.
    </p>
    <p>
      The <strong>?</strong> card means "I can't estimate this task", a useful signal to detect
      a lack of clarity in the specification.
    </p>

    <h2>Comparison of card sequences</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Sequence</th><th>Values</th><th>Best for</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Fibonacci</strong></td>
            <td>1, 2, 3, 5, 8, 13, 21, ?</td>
            <td>Experienced Scrum teams, story point estimation</td>
          </tr>
          <tr>
            <td><strong>T-shirt</strong></td>
            <td>XS, S, M, L, XL, XXL, ?</td>
            <td>Rough estimates, non-technical teams, backlog sorting</td>
          </tr>
          <tr>
            <td><strong>Powers of 2</strong></td>
            <td>1, 2, 4, 8, 16, 32, 64, ?</td>
            <td>Technical tasks with predictable doubling of complexity</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Planning poker for remote teams</h2>
    <p>
      In a room, the secrecy of the vote comes from the gesture: everyone lays a card face down.
      Remotely, you need a tool that keeps votes hidden until the reveal, otherwise the first
      number spoken on the call anchors the whole team. That is the one indispensable job of an
      online planning poker tool, and it requires no account, no install and no integration.
    </p>
    <p>
      Three things worth checking before picking one: do votes stay masked until the reveal, does
      a participant who drops off get back into the session, and what happens to session content
      once the meeting ends. On that last point, the only answer that commits to nothing is that
      there is nothing to keep.
    </p>

    <h2>Asynchronous planning poker</h2>
    <p>
      Letting everyone vote on their own time, over two days, is tempting when time zones barely
      overlap. You get a number, but you lose what makes the technique worth doing:
      <strong>the discussion the gaps trigger</strong>. An estimate nobody argued about has
      surfaced no risk.
    </p>
    <p>
      The compromise that works: one asynchronous round to sort, then a short synchronous session
      for the stories where cards disagree. In practice that is a third of the backlog, and the
      meeting drops to twenty minutes.
    </p>

    <h2>Four mistakes that skew estimates</h2>
    <ol>
      <li>
        <strong>The most senior person votes first.</strong> The moment a number is said out loud
        before the reveal, everyone else lines up behind it. Simultaneous voting is not stagecraft,
        it is the entire mechanism.
      </li>
      <li>
        <strong>Converting points into days.</strong> "One point equals half a day" cancels the
        benefit of a relative scale and turns the estimate into a delivery commitment. Points
        compare stories to each other, they do not fill a calendar.
      </li>
      <li>
        <strong>Forcing consensus.</strong> A persistent disagreement is information: it signals a
        story that is misunderstood or badly split. Averaging it away removes the signal without
        fixing the problem.
      </li>
      <li>
        <strong>Estimating without the person who will do the work.</strong> An estimate produced
        by a subgroup commits people who were not there. It is the most common reason planned
        velocity and actual velocity drift apart.
      </li>
    </ol>

    <h2>Frequently asked questions</h2>

    <details>
      <summary>What is the difference between story points and days?</summary>
      <p>
        Story points measure <strong>relative effort</strong>, not time: the volume of work,
        the uncertainty and the complexity taken together. The scale is relative - a 5 is
        clearly bigger than a 2, without claiming an exact multiple of it. This abstraction
        lets teams compare tasks without getting blocked on individual durations, which vary
        by person and context.
      </p>
    </details>

    <details>
      <summary>How to handle estimation disagreements?</summary>
      <p>
        When estimates diverge (e.g., a 2 and a 13 in the same hand), ask the people who voted at
        the extremes to explain their choice. The discussion often reveals different assumptions or
        unidentified risks. Vote again until convergence, without forcing consensus.
      </p>
    </details>

    <details>
      <summary>Does planning poker work for remote teams?</summary>
      <p>
        Yes, that is precisely why CleanPoker exists. Create a session, share the URL, each
        participant votes on their own device. Results are revealed in real time via WebSocket,
        with no setup or account required.
      </p>
    </details>

    <details>
      <summary>What is the maximum number of participants?</summary>
      <p>
        CleanPoker has no technical limit. In practice, beyond 10 participants, discussions become
        difficult to manage. For large teams, prefer parallel sessions or sub-group estimation.
      </p>
    </details>

    <div class="cta">
      <a href="/" class="btn">Create a free session →</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker-tools">how to choose a planning poker tool</a>,
      <a href="/planning-poker-gdpr">planning poker and GDPR</a>,
      <a href="/fibonacci">the Fibonacci sequence in detail</a>,
      <a href="/alternatives">alternatives to the technique</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT License</a>
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

  p, li { line-height: 1.7; }

  ol {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

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

  details {
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 0.75rem min(1rem, 16px);
    margin-bottom: 0.5rem;
  }

  details[open] { background: var(--color-surface); }

  summary {
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
  }

  details p {
    margin: 0.75rem 0 0;
    font-size: 0.9rem;
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
