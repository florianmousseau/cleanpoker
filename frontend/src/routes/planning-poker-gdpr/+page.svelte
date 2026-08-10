<svelte:head>
  <title>Planning poker and GDPR: where your session data goes | CleanPoker</title>
  <meta name="description" content="Does a planning poker tool process personal data? What a DPO actually checks, how to verify it yourself in two minutes, and why CleanPoker has no account, no cookie and no stored sessions." />
  <link rel="canonical" href="https://cleanpoker.dev/planning-poker-gdpr" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/planning-poker-gdpr" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev/fr/poker-planning-rgpd" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev/planning-poker-gdpr" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Planning poker and GDPR: where your session data goes',
    url: 'https://cleanpoker.dev/planning-poker-gdpr',
    description: 'What an online planning poker tool processes as personal data, how to verify it yourself, and where CleanPoker stands: no account, no tracking cookie, nothing written to disk.',
    isPartOf: { '@type': 'WebApplication', name: 'CleanPoker', url: 'https://cleanpoker.dev' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does a planning poker tool process personal data?',
        acceptedAnswer: { '@type': 'Answer', text: 'Almost always, even unintentionally. The nickname a participant types is usually their real first and last name, a story title can name a client, and an IP address counts as personal data under the GDPR. The real question is not whether a tool processes data, but how long it keeps it and who else sees it.' },
      },
      {
        '@type': 'Question',
        name: 'Do you need a data processing agreement for a planning poker tool?',
        acceptedAnswer: { '@type': 'Answer', text: 'As soon as a vendor processes personal data on the company\'s behalf, Article 28 of the GDPR requires a data processing agreement. Many teams adopt a free tool without one, which is exactly what a DPO flags during an audit. A tool that stores nothing shrinks the question without removing it.' },
      },
      {
        '@type': 'Question',
        name: 'How can I check what a tool sends?',
        acceptedAnswer: { '@type': 'Answer', text: 'Open the browser developer tools, Network tab, and reload the page: every domain that is not the site itself is a third party. Then the Application tab, Cookies and local storage: anything written there outlives the session. Both checks take two minutes and need no special skill.' },
      },
      {
        '@type': 'Question',
        name: 'Where are CleanPoker sessions hosted?',
        acceptedAnswer: { '@type': 'Answer', text: 'The real-time server runs in Paris, France, and nowhere else. Sessions live in memory only, are never written to disk, and are deleted 24 hours after the last activity. There is no account, no email collected, no advertising cookie, and a single third-party script, a cookieless page counter that builds no visitor identifier: the only two cookies remember the chosen language and theme, and stay on the device.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">← Planning poker guide</a>

    <h1>Planning poker and GDPR: where your session data goes</h1>

    <p class="lead">
      The question rarely comes from the agile team. It comes from the DPO, six months later,
      during an audit or an insurance renewal. Here is what is actually at stake, and how to check
      it before someone asks.
    </p>

    <h2>What a planning poker tool processes, even when it says it collects nothing</h2>
    <p>
      An estimation session looks harmless. It nonetheless produces several categories of data the
      GDPR treats as personal, without anyone intending it:
    </p>
    <ul>
      <li>
        <strong>Participant nicknames.</strong> In practice people type their first name, often
        their full name. That is direct identification.
      </li>
      <li>
        <strong>User story titles.</strong> They routinely name a client, a partner or a project
        under a confidentiality agreement.
      </li>
      <li>
        <strong>IP addresses.</strong> Every server processes them, and European case law treats
        them as personal data whenever cross-referencing is possible.
      </li>
      <li>
        <strong>The votes themselves.</strong> Tied to a nickname and retained, they amount to an
        individual assessment. A named estimation history is employee evaluation data, with the
        prior-information duties that follow.
      </li>
    </ul>
    <p>
      So the right question is not "does this tool collect data". It is
      <strong>how long it keeps it, where, and who else sees it</strong>.
    </p>

    <h2>The three things a DPO flags</h2>
    <ol>
      <li>
        <strong>No data processing agreement.</strong> Article 28 of the GDPR requires a contract
        as soon as a vendor processes data on the company's behalf. A free tool adopted by one team
        without going through procurement generally has none.
      </li>
      <li>
        <strong>Transfers outside the European Union.</strong> A tool hosted in the United States,
        or one that loads American analytics scripts, raises the transfer safeguards question. It
        is not unsolvable, it is simply rarely documented.
      </li>
      <li>
        <strong>Retention periods.</strong> "We keep your data as long as necessary" is not a
        period. A record of processing activities needs a number.
      </li>
    </ol>

    <h2>Check it yourself, in two minutes</h2>
    <p>
      None of these checks needs any particular skill, and they work on any tool, including this
      one.
    </p>
    <ol>
      <li>
        Open the browser developer tools (<kbd>F12</kbd>), <strong>Network</strong> tab, and reload
        the page. Every listed domain that is not the site itself is a third party watching your
        visit.
      </li>
      <li>
        <strong>Application</strong> tab, Cookies then Local storage. Anything written there
        outlives closing the tab.
      </li>
      <li>
        Close the session, reopen its URL the next day. If the content is still there, it is stored
        somewhere, and that retention period belongs in a privacy policy.
      </li>
    </ol>

    <h2>Where CleanPoker stands</h2>
    <table>
      <thead>
        <tr><th>Question</th><th>Answer</th></tr>
      </thead>
      <tbody>
        <tr><td>User account</td><td>None. No email, no password, no profile.</td></tr>
        <tr><td>Cookies</td><td>Two, both technical: language and theme. No advertising cookie, no measurement cookie.</td></tr>
        <tr><td>Third-party scripts</td><td>One: Cloudflare Web Analytics, a cookieless page counter. No remote fonts, no external CDN.</td></tr>
        <tr><td>Session retention</td><td>In memory only, never written to disk. Deleted 24 hours after the last activity.</td></tr>
        <tr><td>Hosting</td><td>Real-time server in France (Paris) and nowhere else, pages served by a renewable-powered delivery network.</td></tr>
        <tr><td>Audience measurement</td><td>None, neither in the browser nor per page view. The server keeps three aggregate counters (sessions created, participants, active sessions) that identify neither a room nor a person, and reset to zero on every restart.</td></tr>
        <tr><td>Verifiable</td><td>The source is public under the MIT licence. The three checks above apply to this page too.</td></tr>
      </tbody>
    </table>
    <p>
      This does not make the GDPR go away: a typed nickname is still data, and a server still sees
      an IP address. It shrinks the surface to what the vote strictly requires, and makes the answer
      to the DPO short and checkable. The detail lives in the
      <a href="/mentions-legales#confidentialite">legal notice</a>.
    </p>

    <h2>What privacy does not replace</h2>
    <p>
      A tool that collects nothing but fails at its job is worthless. The job of a planning poker
      tool fits in one line: keep votes invisible until the reveal, so the first number said out
      loud does not anchor the whole team. Everything else, including this page, follows from that.
    </p>

    <div class="cta">
      <a href="/" class="btn">Create a free session →</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/planning-poker-tools">how to choose a tool</a>,
      <a href="/accessibilite">the accessibility statement</a>.
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

  ol, ul {
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
