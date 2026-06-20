<svelte:head>
  <title>Agile estimation: story points, velocity and sprint planning | CleanPoker</title>
  <meta name="description" content="Complete guide to agile estimation: story points vs. hours, how velocity works, capacity planning, and the most common mistakes to avoid." />
  <link rel="canonical" href="https://cleanpoker.dev/estimation-agile" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/estimation-agile" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/estimation-agile" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/estimation-agile" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/estimation-agile" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/estimation-agile" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/estimation-agile" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Agile estimation: story points, velocity and sprint planning',
    url: 'https://cleanpoker.dev/estimation-agile',
    description: 'Complete guide to agile estimation: story points, velocity, capacity planning, and common pitfalls.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between story points and hours?',
        acceptedAnswer: { '@type': 'Answer', text: 'Story points measure relative complexity, not time. A 5-point story is roughly twice as complex as a 3-point story, regardless of who implements it or how long it takes. Hours vary by developer and context; complexity is team-relative and stable.' },
      },
      {
        '@type': 'Question',
        name: 'What is velocity in agile?',
        acceptedAnswer: { '@type': 'Answer', text: 'Velocity is the number of story points a team completes per sprint on average. After 3-5 sprints, velocity stabilizes and becomes a reliable input for release planning and sprint commitment.' },
      },
      {
        '@type': 'Question',
        name: 'Should the team estimate bugs and technical debt?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. If a bug takes significant effort, estimate it. If technical debt work (refactoring, infrastructure) is planned in a sprint, it should be estimated and counted in velocity. Ignoring it produces inflated velocity that misleads planning.' },
      },
      {
        '@type': 'Question',
        name: 'What is the right team velocity?',
        acceptedAnswer: { '@type': 'Answer', text: 'There is no universally correct velocity. A team of 4 delivering 30 points per sprint is not better or worse than a team of 6 delivering 60 points. Velocity is an internal team metric used for forecasting, not a performance benchmark.' },
      },
      {
        '@type': 'Question',
        name: 'How many sprints does it take for velocity to stabilize?',
        acceptedAnswer: { '@type': 'Answer', text: 'Typically 3 to 5 sprints. The first sprint is often lower as the team calibrates. By sprint 4 or 5, the average becomes reliable enough for release date forecasting.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/a-propos" class="back-link">← About</a>

    <h1>Agile estimation: complete guide</h1>

    <p>
      Agile estimation is often misunderstood. Teams either over-engineer it with spreadsheets
      or dismiss it as inaccurate. This guide explains the principles, the tools, and the
      common mistakes, so your team can estimate with confidence and plan with clarity.
    </p>

    <h2>Why estimate at all?</h2>
    <p>
      Estimation is not about predicting the future. It is about
      <strong>surfacing what the team does not know</strong>. A good estimation session
      reveals hidden complexity, unstated assumptions, and unresolved dependencies, before
      any code is written.
    </p>
    <p>
      The output (the number) is less valuable than the conversation that produced it.
    </p>

    <h2>Story points vs. hours: the key difference</h2>
    <p>
      <strong>Hours</strong> measure time, which varies by developer, day, and context.
      A senior engineer may finish a task in 2 hours; a junior in 8. Neither estimate is
      wrong; they just measure different things.
    </p>
    <p>
      <strong>Story points</strong> measure <em>relative complexity</em> within the team's
      shared experience. A 5-point story is roughly twice as complex as a 3-point story,
      regardless of who implements it. This abstraction makes velocity a stable and
      comparable metric across sprints.
    </p>
    <p>
      The shift from hours to story points is the single most impactful change most teams
      can make to improve planning accuracy.
    </p>

    <h2>How velocity works</h2>
    <p>
      Velocity is the number of story points a team completes per sprint on average.
      It is calculated after each sprint by summing the points of all completed stories
      (not started, not partially done, only done-done).
    </p>
    <p>
      After 3–5 sprints, velocity stabilizes. You can then use it to:
    </p>
    <ul>
      <li>Forecast how many sprints a release will take.</li>
      <li>Set a sustainable sprint commitment.</li>
      <li>Detect capacity changes (new team member, vacation, on-call duty).</li>
    </ul>
    <p>
      Velocity is a <strong>team metric</strong>, not an individual one. Never compare
      velocities across teams, scales differ and contexts differ.
    </p>

    <h2>Capacity planning in practice</h2>
    <p>
      Before committing to a sprint, calculate available capacity:
    </p>
    <ul>
      <li>How many developers are available this sprint?</li>
      <li>Are there holidays, on-call rotations, or planned meetings?</li>
      <li>What is the team's historical velocity over the last 3 sprints?</li>
    </ul>
    <p>
      A simple formula: <strong>planned velocity = average velocity × (available days / full sprint days)</strong>.
      If the team averages 40 points over a 10-day sprint but two developers are out for 2 days
      each, reduce commitment proportionally rather than guessing.
    </p>

    <h2>The most common estimation mistakes</h2>
    <table>
      <thead>
        <tr><th>Mistake</th><th>Why it hurts</th><th>Fix</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Estimating in hours</td>
          <td>Anchors to individual speed, not team complexity</td>
          <td>Switch to relative story points</td>
        </tr>
        <tr>
          <td>Anchoring on the first vote revealed</td>
          <td>Kills independent estimation</td>
          <td>Always reveal cards simultaneously</td>
        </tr>
        <tr>
          <td>Forcing consensus on outliers</td>
          <td>Suppresses valid risk signals</td>
          <td>Ask outliers to explain; revote after discussion</td>
        </tr>
        <tr>
          <td>Skipping estimation for bugs</td>
          <td>Inflates velocity, misleads planning</td>
          <td>Estimate bugs that take meaningful effort</td>
        </tr>
        <tr>
          <td>Comparing team velocities</td>
          <td>Different scales, contexts, team sizes</td>
          <td>Velocity is an internal forecasting tool only</td>
        </tr>
      </tbody>
    </table>

    <h2>When to re-estimate</h2>
    <p>
      Re-estimate a story when its scope changes significantly mid-sprint, or when a new
      technical discovery makes the original estimate obviously wrong. Do not re-estimate
      simply because the work took longer than expected, that information lives in velocity,
      not in the point value.
    </p>

    <h2>Frequently asked questions</h2>

    <details>
      <summary>What is the difference between story points and hours?</summary>
      <p>
        Story points measure relative complexity, not time. A 5-point story is roughly twice as
        complex as a 3-point story, regardless of who implements it or how long it takes. Hours
        vary by developer and context; complexity is team-relative and stable.
      </p>
    </details>

    <details>
      <summary>What is velocity in agile?</summary>
      <p>
        Velocity is the number of story points a team completes per sprint on average. After 3–5
        sprints, velocity stabilizes and becomes a reliable input for release planning and sprint
        commitment.
      </p>
    </details>

    <details>
      <summary>Should the team estimate bugs and technical debt?</summary>
      <p>
        Yes. If a bug takes significant effort, estimate it. If technical debt work is planned in a
        sprint, estimate and count it in velocity. Ignoring it produces inflated velocity that
        misleads planning.
      </p>
    </details>

    <details>
      <summary>What is the right team velocity?</summary>
      <p>
        There is no universally correct velocity. Velocity is an internal team metric used for
        forecasting, not a performance benchmark. Never compare velocities across teams.
      </p>
    </details>

    <details>
      <summary>How many sprints does it take for velocity to stabilize?</summary>
      <p>
        Typically 3 to 5 sprints. The first sprint is often lower as the team calibrates
        estimation. By sprint 4 or 5, the average becomes reliable enough for release date
        forecasting.
      </p>
    </details>

    <div class="cta">
      <a href="/" class="btn">Run a session with CleanPoker →</a>
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
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  p, li { line-height: 1.7; }
  ul { padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
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
