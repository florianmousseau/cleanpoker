<svelte:head>
  <title>Retrospective games and ideas: 11 formats | PokerAgile</title>
  <meta name="description" content="Retrospective games and ideas for agile teams: 11 formats with steps and durations, the five phases of a sprint retrospective, a summary table and an FAQ." />
  <link rel="canonical" href="https://pokeragile.com/retrospective" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/retrospective" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/retrospective" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/retrospective" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retrospective games and ideas: 11 formats for agile teams',
    url: 'https://pokeragile.com/retrospective',
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
        name: 'What are the 5 stages of a retrospective?',
        acceptedAnswer: { '@type': 'Answer', text: 'Set the stage, gather data, generate insights, decide what to do, close the retrospective. Esther Derby and Diana Larsen described these five phases in "Agile Retrospectives: Making Good Teams Great", published in 2006.' },
      },
      {
        '@type': 'Question',
        name: 'How long should a sprint retrospective last?',
        acceptedAnswer: { '@type': 'Answer', text: 'The 2020 Scrum Guide sets a maximum of three hours for a one-month sprint and says the event is usually shorter for shorter sprints. As an example, a team on two-week sprints can book 60 to 90 minutes; the guide gives no figure for that sprint length.' },
      },
      {
        '@type': 'Question',
        name: 'Who attends the sprint retrospective?',
        acceptedAnswer: { '@type': 'Answer', text: 'The Scrum Team: the developers, the product owner and the scrum master. The Scrum Guide names no other participant. A manager or a stakeholder comes only if the team invites them.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a sprint review and a sprint retrospective?',
        acceptedAnswer: { '@type': 'Answer', text: 'The sprint review inspects the product: the Scrum Team shows the result of the sprint to stakeholders, for a maximum of four hours for a one-month sprint. The sprint retrospective comes after it and inspects how the team works, for a maximum of three hours.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/planning-poker" class="back-link">Planning poker guide</a>

    <h1>Retrospective games and ideas: 11 formats for agile teams</h1>

    <p class="lead">
      A sprint retrospective is the meeting where a Scrum team looks at how the last sprint went and picks what to change in the next one. This page describes 11 retrospective formats, with the steps and the duration of each.
    </p>

    <h2>The 11 retrospective formats at a glance</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Format</th><th>Best for</th><th>Example duration</th></tr></thead>
      <tbody>
        <tr><td>ESVP check-in</td><td>Opening: finding out who wants to be in the room</td><td>10 min</td></tr>
        <tr><td>Start/Stop/Continue</td><td>A first retrospective, or a team short on time</td><td>45 min</td></tr>
        <tr><td>Mad/Sad/Glad</td><td>A sprint that left people frustrated or tired</td><td>45 to 60 min</td></tr>
        <tr><td>4Ls</td><td>The end of a release or a project</td><td>60 min</td></tr>
        <tr><td>Sailboat (Speedboat)</td><td>A team with a goal and risks ahead</td><td>60 min</td></tr>
        <tr><td>Starfish</td><td>A team that has worn out Start/Stop/Continue</td><td>60 min</td></tr>
        <tr><td>Timeline</td><td>A long sprint, a release or an incident</td><td>60 to 90 min</td></tr>
        <tr><td>5 Whys</td><td>One problem that keeps coming back</td><td>20 to 30 min</td></tr>
        <tr><td>Lean Coffee</td><td>Unrelated topics that nobody has sorted</td><td>60 min</td></tr>
        <tr><td>Dot voting</td><td>Choosing which topics become actions</td><td>5 min</td></tr>
        <tr><td>ROTI closing</td><td>Closing: scoring the meeting itself</td><td>5 min</td></tr>
      </tbody>
    </table>
    </div>
    <p>The durations are examples for a team of 5 to 8 people, not rules. ESVP, dot voting and ROTI are short activities that open, narrow down or close a retrospective built on one of the other eight formats.</p>

    <h2>What is a sprint retrospective?</h2>
    <p>The <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">2020 Scrum Guide</a> gives the sprint retrospective one purpose: to plan ways to increase quality and effectiveness. It is the last event of the sprint, after the sprint review.</p>
    <ul>
      <li><strong>Who attends</strong>: the Scrum Team, meaning the developers, the product owner and the scrum master.</li>
      <li><strong>What is inspected</strong>: individuals, interactions, processes, tools and the Definition of Done.</li>
      <li><strong>How long</strong>: a maximum of three hours for a one-month sprint, and usually shorter for shorter sprints. As an example, a team on two-week sprints can book 60 to 90 minutes; the guide gives no figure for that sprint length.</li>
      <li><strong>What comes out</strong>: the most helpful changes the team identified. The guide says they are addressed as soon as possible and may be added to the Sprint Backlog of the next sprint.</li>
    </ul>

    <h2>The five phases of a retrospective</h2>
    <p>Esther Derby and Diana Larsen described this structure in "Agile Retrospectives: Making Good Teams Great", published in 2006.</p>
    <ol>
      <li><strong>Set the stage</strong>: state the goal and the timebox, and get every person to speak once. ESVP belongs here.</li>
      <li><strong>Gather data</strong>: collect what happened during the sprint, facts and feelings. Start/Stop/Continue, Mad/Sad/Glad, 4Ls, Sailboat, Starfish and Timeline belong here.</li>
      <li><strong>Generate insights</strong>: look for the causes behind the data. 5 Whys belongs here.</li>
      <li><strong>Decide what to do</strong>: pick one or two actions, each with an owner. Dot voting belongs here.</li>
      <li><strong>Close the retrospective</strong>: record the actions and score the meeting. ROTI belongs here.</li>
    </ol>
    <p>Lean Coffee replaces phases 2 and 3: the team builds its agenda and discusses it in the same meeting.</p>

    <h2>The 11 formats, step by step</h2>

    <h3>ESVP check-in</h3>
    <p>Use it to open a retrospective when you do not know how willing people are to take part. Allow about 10 minutes. Derby and Larsen describe it in their book as an anonymous poll.</p>
    <ol>
      <li>Write the four roles on a board. An Explorer wants to discover new ideas. A Shopper will be happy to leave with one useful idea. A Vacationer is glad to be away from daily work. A Prisoner feels forced to attend.</li>
      <li>Each person writes one letter, E, S, V or P, on a folded slip of paper, without a name.</li>
      <li>Count the slips and draw the four totals as bars on the board.</li>
      <li>Tear up the slips in front of the group, so nobody can match handwriting to a vote.</li>
      <li>Ask the group what the totals mean for the next hour.</li>
    </ol>

    <h3>Start/Stop/Continue</h3>
    <p>Use it for a first retrospective, or when the team has 45 minutes.</p>
    <ol>
      <li>Draw three columns: Start (what the team does not do yet), Stop (what costs more than it brings) and Continue (what works).</li>
      <li>Everyone writes notes in silence for 5 minutes, one idea per note.</li>
      <li>Each person reads their notes aloud and places them in a column.</li>
      <li>Group the notes that say the same thing.</li>
      <li>Vote with dots, then turn the top one or two groups into actions.</li>
    </ol>

    <h3>Mad/Sad/Glad</h3>
    <p>Use it after a sprint with a missed goal, an incident or a conflict, when people need to say how they feel before they discuss process. Plan 45 to 60 minutes. The activity is described in Derby and Larsen's book.</p>
    <ol>
      <li>Draw three columns: Mad (what made me angry), Sad (what disappointed me) and Glad (what made me happy).</li>
      <li>Everyone writes notes in silence for 5 to 10 minutes.</li>
      <li>Place the notes, then group them by topic and give each group a name.</li>
      <li>Discuss the largest groups, starting with Mad.</li>
      <li>Pick one action for the group that received the most notes.</li>
    </ol>

    <h3>4Ls: Liked, Learned, Lacked, Longed for</h3>
    <p>Use it at the end of a release or a project, when the question is what the team learned as much as what went wrong. Plan 60 minutes. Mary Gorman and Ellen Gottesdiener described the format in June 2010.</p>
    <ol>
      <li>Draw four areas: Liked, Learned, Lacked and Longed for.</li>
      <li>Everyone writes notes in silence for 10 minutes. "Lacked" is something that was missing, such as a test environment. "Longed for" is something the person wished for, such as a design review before coding.</li>
      <li>Split into four subgroups, one per area. Each subgroup clusters the notes of its area and reports the themes it found.</li>
      <li>The whole team picks the actions from the Lacked and Longed for themes.</li>
    </ol>

    <h3>Sailboat (Speedboat)</h3>
    <p>Use it when the team has a clear goal, such as a release date, and wants to list what helps and what threatens it. Plan 60 minutes. The format also goes by Speedboat, the name of a game Luke Hohmann published in "Innovation Games" in 2006, in which customers identify their biggest pain points with a product.</p>
    <ol>
      <li>Draw a boat, an island, the wind, an anchor and rocks.</li>
      <li>Write the goal on the island.</li>
      <li>Everyone writes notes for 10 minutes: wind for what pushes the team forward, anchor for what slows it down, rocks for the risks ahead.</li>
      <li>Place the notes on the drawing and group them.</li>
      <li>Vote on the anchors and the rocks.</li>
      <li>Write one action for the heaviest anchor and one for the nearest rock.</li>
    </ol>

    <h3>Starfish</h3>
    <p>Use it when Start/Stop/Continue has become routine: two extra branches let people ask for more or less of a practice without dropping it. Plan 60 minutes. Patrick Kua described the Starfish on his blog in March 2006.</p>
    <ol>
      <li>Draw five branches from one point: Keep doing, Less of, More of, Stop doing, Start doing.</li>
      <li>Everyone writes notes in silence for 10 minutes.</li>
      <li>Go through the branches one at a time and place the notes.</li>
      <li>Vote with dots across the whole board.</li>
      <li>Turn the top two notes into actions with an owner.</li>
    </ol>

    <h3>Timeline</h3>
    <p>Use it after a long sprint, a release or an incident, when people remember different parts of the story. Plan 60 to 90 minutes. The activity is described in Derby and Larsen's book.</p>
    <ol>
      <li>Draw a horizontal line from the first day to the last day of the period.</li>
      <li>Everyone writes the events they remember, one per note: a deployment, an outage, a person joining, a change of scope.</li>
      <li>Place the notes on the line in order.</li>
      <li>Each person adds a green dot on the events they that felt good to them and a red dot on the ones that felt bad.</li>
      <li>Read the line from left to right and stop where the red dots gather.</li>
      <li>Pick the actions from those points.</li>
    </ol>

    <h3>5 Whys</h3>
    <p>Use it on one problem that came back in several sprints. Allow 20 to 30 minutes, after the team has gathered data. Taiichi Ohno describes the technique in "Toyota Production System", translated into English in 1988.</p>
    <ol>
      <li>Write the problem as a fact: "The release shipped two days late."</li>
      <li>Ask why and write the answer: "The regression tests failed on Thursday."</li>
      <li>Ask why about that answer: "A database migration was merged on Wednesday evening without running them."</li>
      <li>Repeat until an answer names something the team can change. Five is a guide: some chains end at three, some at seven.</li>
      <li>Write the action against the last answer, here "the pipeline blocks a merge when the regression tests have not run".</li>
    </ol>

    <h3>Lean Coffee</h3>
    <p>Use it when people arrive with unrelated topics. Plan 60 minutes. Jim Benson and Jeremy Lightsmith started Lean Coffee in Seattle in 2009.</p>
    <ol>
      <li>Draw three columns: To discuss, Discussing, Discussed.</li>
      <li>Everyone writes topics for 5 minutes, one per note, and presents each in one sentence.</li>
      <li>Each person gets two votes. Order the To discuss column by number of votes.</li>
      <li>Move the first topic to Discussing and start a timer, for example 7 minutes.</li>
      <li>When the timer rings, everyone shows a thumb: up to add time, for example 3 minutes, down to move to the next topic.</li>
      <li>Note any action before moving the topic to Discussed.</li>
      <li>Stop 5 minutes before the end and read the actions aloud.</li>
    </ol>

    <h3>Dot voting</h3>
    <p>Use it when the board holds more topics than the team can discuss. Allow about 5 minutes.</p>
    <ol>
      <li>Give each person the same number of dots, for example three.</li>
      <li>Everyone places their dots on the notes or groups they want to act on. Putting two dots on the same note is allowed.</li>
      <li>Count the dots and keep the top one or two items.</li>
    </ol>
    <p>On a wall, the last voters see the first dots. Some online whiteboards have a voting mode that hides the votes until the count.</p>

    <h3>ROTI closing</h3>
    <p>ROTI stands for return on time invested. Use it in the last 5 minutes to score the retrospective itself. Derby and Larsen describe the activity in their book, with a scale from 0 to 4.</p>
    <ol>
      <li>Explain the scale: 0 means "no benefit for the time invested", 2 means "a benefit equal to the time invested", 4 means "a benefit greater than the time invested".</li>
      <li>Everyone shows a number of fingers at the same moment, from a closed fist for 0 to four fingers.</li>
      <li>Ask the people who showed 0 or 1 what they wanted and did not get.</li>
      <li>Write the average next to the date and compare it with the previous retrospectives.</li>
    </ol>

    <h2>Retrospective ideas for remote teams</h2>
    <ul>
      <li>Use an online whiteboard with one column per category, prepared before the meeting.</li>
      <li>Have everyone write for 5 minutes with the notes hidden, then reveal them all at once: the first note read does not steer the others.</li>
      <li>Keep the meeting to 60 minutes, and add a 5-minute break if it goes past 90.</li>
      <li>Name a facilitator who is not the note-taker.</li>
      <li>For a team spread across time zones, open the board 24 hours ahead for writing and keep the call for grouping, voting and deciding.</li>
      <li>Replace the ROTI fingers with a number typed in the chat and sent on a countdown.</li>
    </ul>

    <h2>Common retrospective mistakes</h2>
    <ul>
      <li><strong>Leaving without an action.</strong> A retrospective that ends on a list of complaints changes nothing in the next sprint. Each action needs an owner and a date.</li>
      <li><strong>Running the same format every time.</strong> When the same notes come back sprint after sprint, change the format: another one asks the team other questions.</li>
      <li><strong>Inviting a manager whose presence silences people.</strong> The Scrum Guide lists the Scrum Team as the participants. If the person who writes performance reviews is in the room, problems go unsaid.</li>
      <li><strong>Taking on too many actions.</strong> A team that leaves with eight actions rarely finishes them. Keep one or two, and start the next retrospective by checking them.</li>
    </ul>
    <p>An action that needs development work goes into the next sprint planning, where the team can size it with <a href="/planning-poker">planning poker</a>.</p>

    <h2>FAQ</h2>
    <h3>What are the 5 stages of a retrospective?</h3>
    <p>Set the stage, gather data, generate insights, decide what to do, close the retrospective. Esther Derby and Diana Larsen described these five phases in "Agile Retrospectives: Making Good Teams Great", published in 2006.</p>
    <h3>How long should a sprint retrospective last?</h3>
    <p>The 2020 Scrum Guide sets a maximum of three hours for a one-month sprint and says the event is usually shorter for shorter sprints. As an example, a team on two-week sprints can book 60 to 90 minutes; the guide gives no figure for that sprint length.</p>
    <h3>Who attends the sprint retrospective?</h3>
    <p>The Scrum Team: the developers, the product owner and the scrum master. The Scrum Guide names no other participant. A manager or a stakeholder comes only if the team invites them.</p>
    <h3>What is the difference between a sprint review and a sprint retrospective?</h3>
    <p>The sprint review inspects the product: the Scrum Team shows the result of the sprint to stakeholders, for a maximum of four hours for a one-month sprint. The sprint retrospective comes after it and inspects how the team works, for a maximum of three hours.</p>

    <div class="cta">
      <a href="/" class="btn">Create a planning poker room</a>
    </div>

    <p class="related">
      See also:
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/story-points">story points</a>,
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
