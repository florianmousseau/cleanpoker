<svelte:head>
  <title>Alternatives to planning poker: T-shirt sizing, dot voting and more | CleanPoker</title>
  <meta name="description" content="Explore the best alternatives to planning poker: T-shirt sizing, affinity mapping, dot voting, and bucket system. Discover which technique fits your team and context." />
  <link rel="canonical" href="https://cleanpoker.dev/alternatives" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/alternatives" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/alternatives" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/alternatives" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/alternatives" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/alternatives" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/alternatives" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Alternatives to planning poker: T-shirt sizing, dot voting and more',
    url: 'https://cleanpoker.dev/alternatives',
    description: 'Comparison of the main alternatives to planning poker for agile estimation: T-shirt sizing, affinity mapping, dot voting, and bucket system.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the main alternatives to planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'The main alternatives to planning poker are: T-shirt sizing (XS to XXL), affinity mapping (grouping stories by size), dot voting (budget allocation), and the bucket system (sorting stories into predefined size buckets). Each trades precision for speed.' },
      },
      {
        '@type': 'Question',
        name: 'When should you use T-shirt sizing instead of planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use T-shirt sizing when you need rough estimates quickly, when estimating with non-technical stakeholders, or when grooming a large backlog at the start of a project. Switch to planning poker (Fibonacci) when you need velocity tracking over sprints.' },
      },
      {
        '@type': 'Question',
        name: 'What is affinity mapping in agile?',
        acceptedAnswer: { '@type': 'Answer', text: 'Affinity mapping is a silent, collaborative technique where team members simultaneously place stories into size buckets (XS to XL). Disagreements are discussed only for outliers. It is faster than planning poker for large backlogs.' },
      },
      {
        '@type': 'Question',
        name: 'What is the bucket system in agile estimation?',
        acceptedAnswer: { '@type': 'Answer', text: 'The bucket system uses predefined numeric buckets (e.g., 1, 2, 3, 5, 8, 13, 20, 40, 100). Stories are sorted into buckets by comparison with a reference story. It is much faster than planning poker for large backlogs (50+ stories).' },
      },
      {
        '@type': 'Question',
        name: 'Is planning poker always the best agile estimation technique?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Planning poker is best for sprint-level estimation of well-defined stories in established teams. For large backlogs, early-stage projects, or non-technical audiences, affinity mapping or T-shirt sizing are faster and equally accurate.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/a-propos" class="back-link">← About</a>

    <h1>Alternatives to planning poker</h1>

    <p>
      Planning poker is not the only way to estimate. Depending on your team's size,
      backlog depth, and session goals, another technique may be faster and equally effective.
      Here is an honest comparison.
    </p>

    <h2>Quick comparison</h2>
    <table>
      <thead>
        <tr><th>Technique</th><th>Speed</th><th>Precision</th><th>Best for</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Planning poker</strong></td>
          <td>Medium</td>
          <td>High</td>
          <td>Sprint-level estimation of well-defined stories</td>
        </tr>
        <tr>
          <td><strong>T-shirt sizing</strong></td>
          <td>Fast</td>
          <td>Low-medium</td>
          <td>Rough backlog grooming, non-technical stakeholders</td>
        </tr>
        <tr>
          <td><strong>Affinity mapping</strong></td>
          <td>Very fast</td>
          <td>Medium</td>
          <td>Large backlogs (20+ stories), discovery phase</td>
        </tr>
        <tr>
          <td><strong>Bucket system</strong></td>
          <td>Very fast</td>
          <td>Medium</td>
          <td>Very large backlogs (50+ stories)</td>
        </tr>
        <tr>
          <td><strong>Dot voting</strong></td>
          <td>Fast</td>
          <td>Low</td>
          <td>Prioritization, not estimation</td>
        </tr>
      </tbody>
    </table>

    <h2>T-shirt sizing</h2>
    <p>
      T-shirt sizing uses sizes XS, S, M, L, XL, and sometimes XXL to represent relative
      effort. It is intuitive and language-independent, which makes it ideal for mixed
      technical and non-technical teams.
    </p>
    <p>
      <strong>Strength</strong>: Fast, non-intimidating for stakeholders without engineering
      backgrounds. Great for initial backlog sizing at the start of a project or product.
    </p>
    <p>
      <strong>Weakness</strong>: Not directly convertible to a numeric velocity. If you need
      to forecast release dates, you will eventually need to map sizes to story points or
      switch to Fibonacci planning poker.
    </p>

    <h2>Affinity mapping</h2>
    <p>
      In affinity mapping, team members simultaneously (and silently) move story cards into
      size buckets: XS, S, M, L, XL. Once everyone has placed their cards, the team discusses
      only the stories where members disagreed — not every story.
    </p>
    <p>
      <strong>Strength</strong>: Scales to large backlogs (20–50 stories) in a single session.
      The silent phase prevents anchoring and social pressure.
    </p>
    <p>
      <strong>Weakness</strong>: Less precise than planning poker for complex stories.
      Works best when stories are reasonably well-defined before the session.
    </p>

    <h2>The bucket system</h2>
    <p>
      The bucket system is designed for very large backlogs. Buckets are defined upfront using
      numeric values (e.g., 1, 2, 3, 5, 8, 13, 20, 40, 100). A reference story is placed in
      each bucket. Team members then sort remaining stories by comparison rather than
      individual estimation.
    </p>
    <p>
      <strong>Strength</strong>: A team can sort 50–200 stories in under two hours.
      Comparison-based sorting is cognitively easier than absolute estimation.
    </p>
    <p>
      <strong>Weakness</strong>: Early bucket choices influence all subsequent placements.
      Calibrate reference stories carefully before the session.
    </p>

    <h2>Dot voting</h2>
    <p>
      Dot voting (also called cumulative voting or budget allocation) gives each participant
      a fixed number of votes to distribute across stories. It is primarily a
      <strong>prioritization</strong> tool, not an estimation one — it reveals what the team
      values, not how much effort each item requires.
    </p>
    <p>
      Use dot voting to prioritize your backlog; use planning poker or the bucket system
      to estimate it.
    </p>

    <h2>When to stick with planning poker</h2>
    <p>
      Despite the alternatives, planning poker remains the gold standard for sprint-level
      estimation of well-defined user stories in established Scrum teams. It combines
      simultaneous revelation (preventing anchoring), structured discussion (surfaces
      disagreement), and Fibonacci scales (prevents false precision).
    </p>
    <p>
      Use CleanPoker when you need a fast, privacy-respecting planning poker session with
      no setup, no account, and no trackers.
    </p>

    <h2>Frequently asked questions</h2>

    <details>
      <summary>What are the main alternatives to planning poker?</summary>
      <p>
        The main alternatives are: T-shirt sizing (XS to XXL), affinity mapping (grouping
        stories by size), dot voting (budget allocation), and the bucket system (sorting stories
        into predefined size buckets). Each trades some precision for speed.
      </p>
    </details>

    <details>
      <summary>When should you use T-shirt sizing instead of planning poker?</summary>
      <p>
        Use T-shirt sizing when you need rough estimates quickly, when estimating with
        non-technical stakeholders, or when grooming a large backlog at the start of a project.
        Switch to Fibonacci planning poker when you need velocity tracking over sprints.
      </p>
    </details>

    <details>
      <summary>What is affinity mapping in agile?</summary>
      <p>
        Affinity mapping is a silent, collaborative technique where team members simultaneously
        place stories into size buckets. Disagreements are only discussed for outliers.
        It is faster than planning poker for large backlogs.
      </p>
    </details>

    <details>
      <summary>What is the bucket system in agile estimation?</summary>
      <p>
        The bucket system uses predefined numeric buckets. Stories are sorted into buckets by
        comparison with a reference story. It is much faster than planning poker for very
        large backlogs (50+ stories).
      </p>
    </details>

    <details>
      <summary>Is planning poker always the best agile estimation technique?</summary>
      <p>
        No. Planning poker is best for sprint-level estimation of well-defined stories in
        established teams. For large backlogs, early-stage projects, or non-technical audiences,
        affinity mapping or T-shirt sizing are faster and equally accurate.
      </p>
    </details>

    <div class="cta">
      <a href="/" class="btn">Try planning poker with CleanPoker →</a>
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
