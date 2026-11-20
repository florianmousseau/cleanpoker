<svelte:head>
  <title>Planning poker with AI: let Claude or ChatGPT vote | CleanPoker</title>
  <meta name="description" content="Let an AI assistant vote in a planning poker room: connect Claude, ChatGPT or Cursor over MCP, what AI estimates well, what it estimates badly, and how to use it without letting it decide for the team." />
  <link rel="canonical" href="https://cleanpoker.dev/planning-poker-ai" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker-ai" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/planning-poker-ia" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker-ai" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Planning poker with AI: let Claude or ChatGPT vote in the room',
    url: 'https://cleanpoker.dev/planning-poker-ai',
    inLanguage: 'en',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can an AI vote in planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. On CleanPoker, an MCP-compatible assistant (Claude, ChatGPT, Cursor, VS Code) joins the room through https://salles.cleanpoker.dev/mcp, reads the story and votes one card in secret, like the other participants. It is marked as an AI and cannot reveal the votes or start a round.' },
      },
      {
        '@type': 'Question',
        name: 'Does AI estimate better than a team?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. It knows neither the team velocity, nor the real state of the code, nor the dependencies between people. It is useful for spotting what the story leaves out: tests, data migration, edge cases. Its vote opens the discussion when it differs from the team.' },
      },
      {
        '@type': 'Question',
        name: 'Is the story text sent to an AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'CleanPoker sends nothing to any AI. The story goes through the assistant of the person who connected it, under their subscription and their company rules. A room where nobody connects an assistant works exactly as before.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">Planning poker guide</a>

    <h1>Planning poker with AI: let Claude or ChatGPT vote in the room</h1>

    <p class="lead">
      Since November 20, 2026, an AI assistant can join a CleanPoker room and vote like a team
      member. It picks its card in secret, the card is revealed with the others, and it shows in
      the list marked <strong>(AI)</strong>.
    </p>

    <h2>What the AI can do in the room</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Action</th><th>A person</th><th>An AI</th></tr></thead>
      <tbody>
        <tr><td>Vote a card in secret</td><td>yes</td><td>yes</td></tr>
        <tr><td>See other votes before the reveal</td><td>no</td><td>no</td></tr>
        <tr><td>Reveal the votes, start a new round</td><td>yes</td><td>no</td></tr>
        <tr><td>Remove someone, lock the room</td><td>yes</td><td>no</td></tr>
        <tr><td>Be the room host</td><td>yes</td><td>no</td></tr>
      </tbody>
    </table>
    </div>
    <p>
      The host removes an AI like any participant. A room where nobody connects an assistant does
      not change.
    </p>

    <h2>Connect your assistant</h2>
    <p>The address is the same everywhere:</p>
    <pre><code>https://salles.cleanpoker.dev/mcp</code></pre>
    <ul>
      <li><strong>Claude</strong>: Settings, Connectors, Add custom connector, then paste the address.</li>
      <li><strong>ChatGPT</strong>: Settings, Apps, turn on developer mode, then create an app with the address.</li>
      <li><strong>Cursor</strong>: in <code>~/.cursor/mcp.json</code>, add <code>&#123;"mcpServers": &#123; "cleanpoker": &#123; "url": "https://salles.cleanpoker.dev/mcp" &#125; &#125; &#125;</code>.</li>
      <li><strong>VS Code</strong>: in <code>.vscode/mcp.json</code>, add <code>&#123;"servers": &#123; "cleanpoker": &#123; "type": "http", "url": "https://salles.cleanpoker.dev/mcp" &#125; &#125; &#125;</code>.</li>
    </ul>
    <p>No account, no key. Then, in the conversation:</p>
    <pre><code>Join the room https://cleanpoker.dev/ab12cd34 as Claude.
Story: CSV export of the month's invoices, filtered by customer.
Estimate it in story points and vote, then explain your choice in three lines.</code></pre>

    <h2>What AI estimates well</h2>
    <ul>
      <li><strong>What the story leaves out</strong>: tests, data migration, access rights, edge cases, translation.</li>
      <li><strong>Relative size</strong> of a well-written story, against another one you give it as a reference.</li>
      <li><strong>A written reason</strong> for its vote, worth reading when the gap is large.</li>
    </ul>

    <h2>What it estimates badly</h2>
    <ul>
      <li><strong>Your code</strong>, unless the assistant can read it (Cursor or VS Code open on the repository).</li>
      <li><strong>Team velocity</strong>: a 5 only means something to the team that calibrated it.</li>
      <li><strong>Human dependencies</strong>: the person on leave, the neighbour team that must ship first.</li>
    </ul>

    <h2>Three rules that make it useful</h2>
    <ul>
      <li><strong>It votes before the discussion</strong>, together with everyone. Its card shown first would anchor the team.</li>
      <li><strong>A gap opens the discussion, it does not close it.</strong> The AI says 13 and the team says 3: ask it what it saw.</li>
      <li><strong>The person who will do the work decides.</strong> The AI will not be there to ship it.</li>
    </ul>

    <h2>Where the story text goes</h2>
    <p>
      CleanPoker calls no AI. The story goes through the assistant of the person who connected it,
      under their subscription and their company's AI rules. The room content stays on the server
      in Gravelines, France, in memory, and disappears 24 hours after the last activity.
    </p>

    <div class="cta">
      <a href="/" class="btn">Create a room</a>
    </div>

    <p class="related">
      Read also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/planning-poker-tools">how to choose a planning poker tool</a>,
      <a href="/estimation-agile">agile estimation</a>.
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

  .lead { font-size: 1.05rem; color: var(--color-text-muted); }

  ul {
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

  pre {
    overflow-x: auto;
    padding: 0.75rem min(1rem, 16px);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-size: 0.85rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
