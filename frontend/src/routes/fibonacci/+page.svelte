<svelte:head>
  <title>Fibonacci in planning poker: why and how to use it | CleanPoker</title>
  <meta name="description" content="Why do agile teams use the Fibonacci sequence in planning poker? Discover the psychology behind it, how to pick the right card, and when to use alternative scales." />
  <link rel="canonical" href="https://cleanpoker.dev/fibonacci" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/fibonacci" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/fibonacci" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es/fibonacci" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de/fibonacci" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt/fibonacci" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/fibonacci" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fibonacci in planning poker: why and how to use it',
    url: 'https://cleanpoker.dev/fibonacci',
    description: 'Complete guide to the Fibonacci sequence in agile estimation: psychology, card selection, and comparison with other scales.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does planning poker use Fibonacci numbers?',
        acceptedAnswer: { '@type': 'Answer', text: 'Fibonacci numbers (1, 2, 3, 5, 8, 13, 21) model growing uncertainty: the larger a task, the less precisely it can be estimated. The increasing gap between values forces the team to take a clear position without pretending to false precision.' },
      },
      {
        '@type': 'Question',
        name: 'What does the ? card mean in planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'The ? card signals "I cannot estimate this task." It is a healthy indicator that the story lacks clarity, is too large, or has unresolved dependencies. It triggers a clarification discussion before any estimate.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use Fibonacci or modified Fibonacci (0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100)?',
        acceptedAnswer: { '@type': 'Answer', text: 'Both work. Standard Fibonacci (1-21) suits most Scrum teams. Modified Fibonacci with 0, 0.5, and values above 21 is useful when you need to distinguish very small tasks or when your team routinely works on epics. Start with standard and add granularity only if the team asks for it.' },
      },
      {
        '@type': 'Question',
        name: 'Is there a correct Fibonacci value for a given task?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Story points are relative, not absolute. A 5 is roughly twice as complex as a 3 within the team shared reference frame. The goal is consistency over time so velocity becomes a reliable planning tool.' },
      },
      {
        '@type': 'Question',
        name: 'When should a team switch from Fibonacci to T-shirt sizes?',
        acceptedAnswer: { '@type': 'Answer', text: 'T-shirt sizes (XS to XXL) are better for rough backlog grooming at the start of a project or for non-technical stakeholders. Once the team needs velocity tracking, switch to Fibonacci story points for numerical tracking.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/a-propos" class="back-link">← About</a>

    <h1>Fibonacci in planning poker</h1>

    <p>
      The Fibonacci sequence is the backbone of planning poker. Understanding <em>why</em> it works
      helps teams use it better, avoid common pitfalls, and choose the right scale for their context.
    </p>

    <h2>What is the Fibonacci sequence?</h2>
    <p>
      The Fibonacci sequence is <strong>1, 1, 2, 3, 5, 8, 13, 21, 34…</strong> where each number
      is the sum of the two preceding ones. In planning poker, the sequence is typically shortened
      to <strong>1, 2, 3, 5, 8, 13, 21</strong> plus a <strong>?</strong> card.
    </p>
    <p>
      The key property is that <strong>gaps grow with the size of the number</strong>. Between 1
      and 2, the gap is 1. Between 13 and 21, it is 8. This is not arbitrary — it reflects how
      human cognition works when estimating uncertainty.
    </p>

    <h2>Why Fibonacci instead of 1–10?</h2>
    <p>
      A linear scale (1, 2, 3, 4, 5, 6, 7, 8, 9, 10) creates a false sense of precision. Is a
      task a 6 or a 7? Teams spend time debating distinctions that carry no real information.
    </p>
    <p>
      With Fibonacci, the choice is always coarser: is this a 5 or an 8? That is a meaningful
      difference. The <strong>forced coarseness prevents analysis paralysis</strong> and pushes
      teams towards discussion rather than point arithmetic.
    </p>
    <p>
      Psychologists call this <em>subitizing</em>: humans can reliably distinguish small quantities
      at a glance, but lose accuracy quickly beyond 5–7 items. Fibonacci aligns the scale with this
      cognitive limit.
    </p>

    <h2>The ? card: an underused signal</h2>
    <p>
      The <strong>?</strong> card is one of the most valuable in the deck. It means: "I cannot
      estimate this story." Valid reasons include:
    </p>
    <ul>
      <li>The acceptance criteria are unclear.</li>
      <li>The story depends on an unresolved technical decision.</li>
      <li>The story is too large to estimate as a whole (needs splitting).</li>
      <li>The team member lacks the context to judge complexity.</li>
    </ul>
    <p>
      A <strong>?</strong> vote should always pause the estimation and trigger a discussion. It is a
      quality gate, not a failure.
    </p>

    <h2>Standard vs. modified Fibonacci</h2>
    <table>
      <thead>
        <tr><th>Scale</th><th>Values</th><th>Best for</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Standard</strong></td>
          <td>1, 2, 3, 5, 8, 13, 21, ?</td>
          <td>Most Scrum teams, sprint-level estimation</td>
        </tr>
        <tr>
          <td><strong>Modified</strong></td>
          <td>0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?</td>
          <td>Teams with very small tasks or large epics in the same backlog</td>
        </tr>
        <tr>
          <td><strong>Powers of 2</strong></td>
          <td>1, 2, 4, 8, 16, 32, 64, ?</td>
          <td>Technical teams where complexity doubles predictably</td>
        </tr>
      </tbody>
    </table>

    <h2>How to pick your card</h2>
    <p>
      Good estimators think in reference tasks. Before your first session, identify 2 or 3
      anchor stories the team knows well: one that is clearly a 1, one a 5, one a 13. Every
      new story is then compared to these anchors rather than estimated in isolation.
    </p>
    <p>
      Ask yourself:
    </p>
    <ul>
      <li>Is this story simpler or more complex than our 5-point anchor?</li>
      <li>Does it involve more unknowns than our 8-point anchor?</li>
      <li>Could one developer finish it in a single day? (Usually a 1 or 2.)</li>
    </ul>

    <h2>Frequently asked questions</h2>

    <details>
      <summary>Why does planning poker use Fibonacci numbers?</summary>
      <p>
        Fibonacci numbers model growing uncertainty: the larger a task, the less precisely it can
        be estimated. The increasing gap between values forces the team to take a clear position
        without pretending to false precision.
      </p>
    </details>

    <details>
      <summary>What does the ? card mean in planning poker?</summary>
      <p>
        The ? card signals "I cannot estimate this task." It is a healthy indicator that the story
        lacks clarity, is too large, or has unresolved dependencies. It triggers a clarification
        discussion before any estimate is locked in.
      </p>
    </details>

    <details>
      <summary>Should I use standard or modified Fibonacci?</summary>
      <p>
        Start with standard (1, 2, 3, 5, 8, 13, 21). Add 0 and 0.5 only if your team regularly
        debates whether a task is "almost nothing." Add values above 21 only if you estimate epics
        alongside sprint stories. Adding complexity rarely helps — simplicity keeps velocity reliable.
      </p>
    </details>

    <details>
      <summary>Is there a correct Fibonacci value for a given task?</summary>
      <p>
        No. Story points are relative to your team's reference frame, not to clock time. What
        matters is consistency: a 5 today should feel as complex as a 5 six months from now. That
        consistency is what makes velocity a useful forecasting tool.
      </p>
    </details>

    <details>
      <summary>When should a team switch to T-shirt sizes?</summary>
      <p>
        T-shirt sizes are better for rough backlog grooming at the start of a project or for
        non-technical stakeholders. Once the team needs velocity tracking, switch to Fibonacci story
        points for numerical tracking over sprints.
      </p>
    </details>

    <div class="cta">
      <a href="/" class="btn">Try it with CleanPoker →</a>
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
