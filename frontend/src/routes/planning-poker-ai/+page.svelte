<svelte:head>
  <title>AI planning poker: let Claude or ChatGPT vote | PokerAgile</title>
  <meta name="description" content="Let Claude, ChatGPT or Cursor vote in a planning poker room: one MCP address to paste, nothing to install. What AI estimates well, and what it gets wrong." />
  <link rel="canonical" href="https://pokeragile.com/planning-poker-ai" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/planning-poker-ia" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/planning-poker-ai" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/planning-poker-ai" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Planning poker with AI: let Claude or ChatGPT vote in the room',
    url: 'https://pokeragile.com/planning-poker-ai',
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
        name: 'Can an AI vote in planning poker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. On PokerAgile, an MCP-compatible assistant (Claude, ChatGPT, Cursor, VS Code) joins the room through https://salles.pokeragile.com/mcp, reads the story on the table if the team pasted its list into the room, or gets it in its own conversation, then picks one card in secret, like the other participants. It is marked as an AI and cannot reveal the votes or start a round.' },
      },
      {
        '@type': 'Question',
        name: 'Does AI estimate better than a team?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. It does not know the team\'s velocity, the real state of the code or who depends on whom. It is useful for spotting what the story leaves out: tests, data migration, edge cases. Its vote opens the discussion when it differs from the team\'s.' },
      },
      {
        '@type': 'Question',
        name: 'Is the story text sent to an AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, to the assistant a team member connected, and to no other AI service: PokerAgile calls none. The assistant receives the room state: the story titles and their estimates if the team pasted a list, participant names, then the votes once revealed.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">Planning poker guide</a>

    <h1>Planning poker with AI: let Claude or ChatGPT vote in the room</h1>

    <p class="lead">
      Since November 20, 2026, an AI assistant can join a PokerAgile planning poker room and vote like a team member. It picks its card in secret, the card is revealed with the others, and it shows in the list marked <strong>(AI)</strong>.
    </p>

    <h2>What the AI can do in the room</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Action</th><th>A person</th><th>An AI</th></tr></thead>
      <tbody>
        <tr><td>Pick a card in secret</td><td>yes</td><td>yes</td></tr>
        <tr><td>See other votes before the reveal</td><td>no</td><td>no</td></tr>
        <tr><td>Reveal the votes, start a round, remove someone</td><td>yes (host only once the room is locked)</td><td>no</td></tr>
        <tr><td>Lock the room</td><td>the host</td><td>no</td></tr>
        <tr><td>Be the room host</td><td>yes</td><td>no</td></tr>
      </tbody>
    </table>
    </div>
    <p>
      Its vote counts in the average and the median, and its reason, 280 characters at most, shows under its name at the reveal. With auto-reveal on, the room waits for its vote too. Any participant can remove an AI; in a locked room, only the host can. The AI acts only when asked: one message per round, and its seat stays taken until it leaves the room.
    </p>

    <h2>Connect your assistant over MCP</h2>
    <p>The address is the same everywhere:</p>
    <pre><code>https://salles.pokeragile.com/mcp</code></pre>
    <ul>
      <li><strong>Claude</strong>: Settings, Connectors, Add custom connector, then paste the address. On a Team or Enterprise plan, a workspace owner adds it first.</li>
      <li><strong>Claude Code</strong>: <code>claude mcp add --transport http pokeragile https://salles.pokeragile.com/mcp</code></li>
      <li><strong>ChatGPT</strong>: Settings, Apps, Advanced settings, turn on developer mode, then Create app with the address. Voting needs a Business, Enterprise or Edu plan; on Plus and Pro, developer mode only accepts read-only tools, so the AI reads the room without voting.</li>
      <li><strong>Cursor</strong>: in <code>~/.cursor/mcp.json</code>, add <code>&#123;"mcpServers": &#123; "pokeragile": &#123; "url": "https://salles.pokeragile.com/mcp" &#125; &#125; &#125;</code>.</li>
      <li><strong>VS Code</strong>: with Copilot in agent mode, in <code>.vscode/mcp.json</code>, add <code>&#123;"servers": &#123; "pokeragile": &#123; "type": "http", "url": "https://salles.pokeragile.com/mcp" &#125; &#125; &#125;</code>.</li>
    </ul>
    <p>PokerAgile asks for no account and no API key, and there is nothing to install: the address is a remote MCP server with four tools, <code>join_room</code>, <code>get_room</code>, <code>vote</code> and <code>leave_room</code>. A person must already have the room open in a browser. If the team pasted its story list into the room, the assistant reads the one on the table; otherwise, give it the story in your message. Then, in the conversation:</p>
    <pre><code>Join the room https://pokeragile.com/ab12cd34 as Claude.
Estimate the story on the table in story points and vote with a one or two sentence reason, without telling me your card.
Leave the room when I say so.</code></pre>

    <h2>What AI estimates well</h2>
    <ul>
      <li><strong>What the story leaves out</strong>: tests, data migration, access rights, edge cases, translation.</li>
      <li><strong>Relative size</strong> of a well-written story, against another one you give it as a reference.</li>
      <li><strong>A written reason</strong> for its vote, shown under its name at the reveal, useful when the gap is large.</li>
    </ul>

    <h2>What it estimates badly</h2>
    <ul>
      <li><strong>Your code</strong>, unless the assistant can read it (Cursor or VS Code open on the repository).</li>
      <li><strong>Team velocity</strong>: a 5 only means something to the team that calibrated it.</li>
      <li><strong>Human dependencies</strong>: the person on leave, another team that has to ship first.</li>
      <li><strong>What is not written in the room</strong>: it reads the title of the story on the table, 200 characters at most, never its description or what the team says. Paste the detail in your message.</li>
    </ul>

    <h2>Rules that make it useful</h2>
    <ul>
      <li><strong>It votes before the discussion</strong>, together with everyone. If it tells you its card in your conversation before the reveal, vote first.</li>
      <li><strong>A gap gets discussed.</strong> The AI says 13 and the team says 3: read its reason under its name, then ask it for the detail.</li>
      <li><strong>The person who will do the work decides.</strong> That person knows the code that has to change; the AI does not.</li>
    </ul>

    <h2>What the assistant receives</h2>
    <p>
      PokerAgile calls no AI service. The assistant a team member connected receives the room state: the story titles and their estimates if the team pasted a list, participant names, who has voted, the activity log, then the votes once revealed. It receives it under that person's subscription and their company's AI rules. The room lives in memory on the server in Gravelines, France, and disappears 24 hours after the last activity.
    </p>

    <h2>Without a connected assistant: the AI built into the browser</h2>
    <p>
      In Chrome 148 or later, on a Windows, macOS or Linux computer or a Chromebook Plus, an
      "Analyze the story with the browser's AI" button shows under the story on the table, if the
      team pasted its story list. It lists what the story leaves out, five lines at most, and
      proposes a split if it looks too large, without giving an estimate. The model, Gemini Nano,
      runs on the computer: the analysis sends the story to no service, and only the person who
      clicked sees the answer. The answer comes in the room's language if the model offers it,
      otherwise in English. On first use, Chrome downloads the model, several gigabytes; it needs
      22 GB of free disk, and 16 GB of memory or a graphics card with more than 4 GB. The button
      does not show on phones, or in Firefox or Safari.
    </p>

    <h2>FAQ</h2>
    <h3>Can an AI vote in planning poker?</h3>
    <p>Yes. On PokerAgile, an MCP-compatible assistant (Claude, ChatGPT, Cursor, VS Code) joins the room through https://salles.pokeragile.com/mcp, reads the story on the table if the team pasted its list into the room, or gets it in its own conversation, then picks one card in secret, like the other participants. It is marked as an AI and cannot reveal the votes or start a round.</p>
    <h3>Does AI estimate better than a team?</h3>
    <p>No. It does not know the team's velocity, the real state of the code or who depends on whom. It is useful for spotting what the story leaves out: tests, data migration, edge cases. Its vote opens the discussion when it differs from the team's.</p>
    <h3>Is the story text sent to an AI?</h3>
    <p>Yes, to the assistant a team member connected, and to no other AI service: PokerAgile calls none. The assistant receives the room state: the story titles and their estimates if the team pasted a list, participant names, then the votes once revealed.</p>

    <div class="cta">
      <a href="/" class="btn">Create a room</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/planning-poker-tools">how to choose a planning poker tool</a>,
      <a href="/estimation-agile">agile estimation</a>.
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
