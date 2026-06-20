<svelte:head>
  <title>Planning poker: rules, Fibonacci and practical guide | CleanPoker</title>
  <meta name="description" content="What is planning poker? Rules, Fibonacci sequence, T-shirt sizing, tips for estimating user stories as an agile team. Free complete guide." />
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
    description: 'Complete guide to planning poker: definition, rules, why Fibonacci, how to use CleanPoker.',
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
        acceptedAnswer: { '@type': 'Answer', text: 'Story points measure relative complexity, not time. A 5 is roughly 2.5 times more complex than a 2, regardless of actual duration. This abstraction lets teams compare tasks without getting blocked on individual durations that vary by person and context.' },
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

    <h2>Frequently asked questions</h2>

    <details>
      <summary>What is the difference between story points and days?</summary>
      <p>
        Story points measure <strong>relative complexity</strong>, not time. A 5 is roughly 2.5
        times more complex than a 2, regardless of actual duration. This abstraction lets teams
        compare tasks without getting blocked on individual durations, which vary by person and
        context.
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
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT License</a>
      | <a href="/a-propos">About</a>
      | <a href="/mentions-legales">Legal notice</a>
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
    padding-left: 1.5rem;
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
    padding: 0.75rem 1rem;
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
    padding: 0.875rem 2rem;
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: opacity 0.15s;
  }

  .btn:hover { opacity: 0.85; }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
