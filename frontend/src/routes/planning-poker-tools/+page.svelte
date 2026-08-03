<svelte:head>
  <title>Planning poker tools compared: the 7 criteria that matter | CleanPoker</title>
  <meta name="description" content="How to choose an online planning poker tool: seven criteria you can check yourself in minutes, what CleanPoker does, what it does not do, and when another tool is the right call." />
  <link rel="canonical" href="https://cleanpoker.dev/planning-poker-tools" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker-tools" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/comparatif-outils" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker-tools" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Planning poker tools compared: the 7 criteria that matter',
    url: 'https://cleanpoker.dev/planning-poker-tools',
    description: 'Seven criteria for choosing an online planning poker tool, all checkable yourself, and exactly what CleanPoker covers, including what it cannot do.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which free planning poker tool should I choose?',
        acceptedAnswer: { '@type': 'Answer', text: 'Almost every online planning poker tool advertises being free and requiring no signup, so neither claim sorts anything. What actually differs: when the paywall appears, what happens to session content afterwards, whether third-party scripts load, whether the tool works by keyboard and with a screen reader, and whether the source can be inspected.' },
      },
      {
        '@type': 'Question',
        name: 'What can CleanPoker not do?',
        acceptedAnswer: { '@type': 'Answer', text: 'CleanPoker has no Jira, Azure DevOps or Linear integration, no backlog import, no history of past sessions, no CSV export, no voting timer and no permanent teams. If any of those is essential, a tool built into the issue tracker is the right choice.' },
      },
      {
        '@type': 'Question',
        name: 'How do I check whether a planning poker tool tracks users?',
        acceptedAnswer: { '@type': 'Answer', text: 'Open the browser developer tools, Network tab, and reload the page: every domain that is not the site itself is a third party. The Application tab shows cookies and local storage. The check takes two minutes and beats any promise printed on a homepage.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">← Planning poker guide</a>

    <h1>Planning poker tools compared: the 7 criteria that matter</h1>

    <p class="lead">
      Every online planning poker tool advertises the same three things: free, no signup, real time.
      Those three sort nothing. Here are the seven criteria that actually separate them, all
      checkable in a few minutes, without taking our word for any of it.
    </p>

    <h2>1. When the paywall shows up</h2>
    <p>
      This is the single most common complaint in negative reviews of agile tooling: the price
      arrives after the work is entered. A tool can be "free" and stop at the sixth participant, the
      third session of the month, or the moment you export. <strong>How to check</strong>: look for a
      pricing page. If there is one, read the free column in full; if there is none, the question is
      what the service lives on.
    </p>

    <h2>2. What happens to sessions after the meeting</h2>
    <p>
      A user story title regularly names a client. Depending on the tool, that text disappears on
      close, lives a few hours, or stays indefinitely in a browsable history.
      <strong>How to check</strong>: close the session, reopen its URL the next day. If the content is
      still there, it is stored, and the retention period belongs somewhere in writing.
    </p>

    <h2>3. Third-party scripts the page loads</h2>
    <p>
      An ad network, an analytics vendor or a remote font sees every visit, and for a European
      employer each one is a transfer to document.
      <strong>How to check</strong>: browser developer tools, Network tab, reload. Every domain that
      is not the site itself is a third party.
    </p>

    <h2>4. Real accessibility, not the badge</h2>
    <p>
      An estimation meeting one team member cannot join is a team problem before it is a compliance
      problem. Since June 2025 the European Accessibility Act also extends the obligation to many
      private digital services, and public-sector bodies have been covered for far longer.
      <strong>How to check</strong>: put the mouse away and go through a full round with
      <kbd>Tab</kbd> and <kbd>Enter</kbd>. If you cannot vote without a mouse, you have your answer.
    </p>

    <h2>5. Page weight</h2>
    <p>
      A tool whose only job is showing cards needs neither several megabytes of JavaScript nor three
      seconds to start. Weight is paid on mobile connections, in crowded meeting rooms, and in
      emissions.
      <strong>How to check</strong>: Network tab, transferred size column, bottom of the window.
    </p>

    <h2>6. What happens when someone drops off</h2>
    <p>
      The most common failure and the least visible on a homepage: does a participant whose wifi
      cuts out have to rejoin by hand, and does their vote survive?
      <strong>How to check</strong>: kill the network for twenty seconds mid-session, then bring it
      back.
    </p>

    <h2>7. Whether the code can be inspected</h2>
    <p>
      A public repository does not prove the published code is the code that runs, but its absence
      makes every claim unverifiable. That is the difference between a promise and a checkable fact.
      <strong>How to check</strong>: look for a repository link, and at the date of the last commit.
    </p>

    <h2>Exactly what CleanPoker covers</h2>
    <table>
      <thead>
        <tr><th>Criterion</th><th>CleanPoker</th></tr>
      </thead>
      <tbody>
        <tr><td>Paywall</td><td>None. No paid tier, no participant cap, no session quota.</td></tr>
        <tr><td>Sessions after the meeting</td><td>In memory only, never written to disk, deleted 24 hours after the last activity.</td></tr>
        <tr><td>Third-party scripts</td><td>None. Two technical cookies: language and theme.</td></tr>
        <tr><td>Accessibility</td><td>WCAG 2.1 AA, full keyboard navigation, NVDA and VoiceOver, Lighthouse accessibility 100.</td></tr>
        <tr><td>Weight</td><td>Under 50 KB of shared JavaScript, brotli compressed, measured on every CI run.</td></tr>
        <tr><td>Dropped connection</td><td>Automatic WebSocket reconnect with exponential backoff.</td></tr>
        <tr><td>Source</td><td>Public, MIT licence.</td></tr>
      </tbody>
    </table>

    <h2>What CleanPoker cannot do</h2>
    <p>
      The list is short and deliberate, but it rules the tool out for some teams. Better to know
      before opening it than after:
    </p>
    <ul>
      <li><strong>No integrations</strong> with Jira, Azure DevOps, Linear or GitHub: stories are presented out loud.</li>
      <li><strong>No backlog import</strong>, and therefore no CSV export of results.</li>
      <li><strong>No history</strong> of past sessions, no velocity tracking over time. That is the direct price of criterion 2.</li>
      <li><strong>No voting timer</strong>, no permanent teams, no accounts.</li>
    </ul>
    <p>
      If the estimate has to land automatically in a ticket's story points field, a tool built into
      the issue tracker does that job and CleanPoker does not. If the meeting only needs votes to
      stay hidden until the reveal, the integration costs more than it returns.
    </p>

    <h2>The tools people compare us with</h2>
    <p>
      To compare for yourself, the most common alternatives are Planning Poker Online, PlanITpoker,
      Scrum Poker Online, Kollabe, TeamRetro and Planning Poker Live. Several are excellent products
      and better equipped than this one on integrations. Run the seven checks above on them rather
      than trusting our claims or theirs: it takes ten minutes and it settles the question.
    </p>

    <div class="cta">
      <a href="/" class="btn">Try CleanPoker →</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/planning-poker-gdpr">planning poker and GDPR</a>,
      <a href="/alternatives">alternatives to the technique itself</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Source code</a>
      | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">MIT licence</a>
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
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

  kbd {
    font-family: var(--font-mono);
    font-size: 0.85em;
    padding: 0.1rem 0.35rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-surface);
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
