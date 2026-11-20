<script lang="ts">
  import type { Matrix } from '#lib/raci.ts';
  import { matrixOf, shown } from '#lib/raci.ts';
  import RaciGenerator from '#lib/RaciGenerator.svelte';

  const SITE = matrixOf('Launching a company website', ['Project manager', 'Designer', 'Developer', 'Client'], [
    ['Write the brief', 'R C C A'],
    ['Design the mockups', 'A R C I'],
    ['Build the pages', 'A C R I'],
    ['Put the site online', 'A I R I'],
  ]);

  const SOFTWARE = matrixOf('Software project', ['Product manager', 'Tech lead', 'Developers', 'Tester'], [
    ['Write the specification', 'AR C C I'],
    ['Develop the feature', 'I A R I'],
    ['Review the code', '- A R -'],
    ['Test before release', 'I I C AR'],
    ['Release to production', 'I A R C'],
  ]);

  const SCRUM = matrixOf('Scrum sprint', ['Product Owner', 'Scrum Master', 'Developers', 'Stakeholders'], [
    ['Order the Product Backlog', 'AR - C C'],
    ['Sprint Planning', 'R R AR C'],
    ['Size the backlog items', 'C - AR -'],
    ['Daily Scrum', '- - AR -'],
    ['Sprint Review', 'AR R R C'],
    ['Sprint Retrospective', 'R AR R -'],
  ]);

  const LAUNCH = matrixOf('Product launch', ['Product manager', 'Marketing', 'Sales', 'Support'], [
    ['Set the date and the scope', 'AR C C I'],
    ['Write the product page and the announcement', 'A R C I'],
    ['Train the sales team', 'R C A I'],
    ['Prepare the help pages', 'C - I AR'],
    ['Publish the announcement', 'I AR I I'],
  ]);

  const EXAMPLES = [
    { id: 'example-software', title: 'A software project', matrix: SOFTWARE },
    { id: 'example-scrum', title: 'A Scrum sprint', matrix: SCRUM },
    { id: 'example-launch', title: 'A product launch', matrix: LAUNCH },
  ];

  const FAQ = [
    {
      q: 'What does RACI stand for?',
      r: 'Responsible, Accountable, Consulted, Informed. The R does the task, the A answers for the result, the C gives an opinion before the decision, the I is told after it.',
    },
    {
      q: 'What is the difference between R and A?',
      r: 'The R does the work. The A answers for the result and signs it off. A task can have several R and has one A. When the same person does the work and answers for it, the cell reads A/R.',
    },
    {
      q: 'Can a task have more than one A?',
      r: 'No. A task has one A. With two, nobody knows who decides when they disagree. If two people sign off the work, keep as A the one who answers for the result and make the other a C.',
    },
    {
      q: 'RACI or RASCI?',
      r: 'RASCI adds one letter, S for Support: someone who helps the R do the task without answering for it. If nobody plays that part in your project, the four letters of RACI are enough.',
    },
    {
      q: 'How do I make a RACI matrix in Excel?',
      r: 'Fill in the matrix in the generator on this page, click "Download as CSV", then open the file in Excel. The file is UTF-8 with a byte order mark and comma-separated, which an English-language Excel opens in columns. In an empty sheet, put one task per row, one role per column and one letter per cell.',
    },
  ];

  let generator: { load: (matrix: Matrix) => void };
</script>

<svelte:head>
  <title>RACI matrix: definition, example and a template to fill in</title>
  <meta name="description" content="RACI matrix: what the four letters mean, the rules, three filled examples and a RACI chart template to fill in online, with CSV and Markdown export." />
  <link rel="canonical" href="https://pokeragile.com/raci-matrix" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/matrice-raci" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/raci-matrix" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/raci-matrix" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/raci-matrix" />
  <meta property="og:title" content="RACI matrix: definition, example and a template to fill in" />
  <meta property="og:description" content="The four letters of a RACI matrix, its rules, three filled examples and a chart to fill in online, with CSV and Markdown export." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'RACI matrix: definition, example and a template to fill in',
    url: 'https://pokeragile.com/raci-matrix',
    inLanguage: 'en',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  })}<\/script>`}
</svelte:head>

{#snippet table(matrix: Matrix)}
  <div class="table-wrap">
  <table>
    <caption>{matrix.title}</caption>
    <thead>
      <tr>
        <th scope="col">Task</th>
        {#each matrix.roles as role (role)}<th scope="col">{role}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each matrix.tasks as task, t (task)}
        <tr>
          <th scope="row">{task}</th>
          {#each matrix.cells[t] as letter, r (r)}<td>{shown(letter)}</td>{/each}
        </tr>
      {/each}
    </tbody>
  </table>
  </div>
{/snippet}

<div class="page container">
  <main id="main">
    <a href="/guides" class="back-link">Guides</a>

    <h1>RACI matrix: definition, example and a template to fill in</h1>

    <p class="lead">A RACI matrix, or RACI chart, is a table: one task per row, one role per column, one letter per cell.</p>

    <ul class="lettres">
      <li><strong>R, Responsible</strong>: does the work.</li>
      <li><strong>A, Accountable</strong>: answers for the result, one per task.</li>
      <li><strong>C, Consulted</strong>: gives an opinion beforehand, the exchange goes both ways.</li>
      <li><strong>I, Informed</strong>: is told afterwards, the information goes one way.</li>
    </ul>

    {@render table(SITE)}
    <p>Second row of the table: the designer draws the mockups, the project manager signs them off, the developer gives an opinion beforehand, the client is told afterwards.</p>
    <p>RACI matrix, RACI chart, RACI model and responsibility matrix name this same table.</p>

    <RaciGenerator bind:this={generator} lang="en" initial={SITE} />

    <h2>Exporting and sharing the matrix</h2>
    <ul>
      <li><strong>Markdown</strong>: "Copy as Markdown" puts a table on the clipboard. It pastes into a GitHub or GitLab issue, a README file or a wiki.</li>
      <li><strong>CSV</strong>: the file is UTF-8 with a byte order mark, comma-separated. An English-language Excel opens it in columns. LibreOffice Calc and Google Sheets read it too.</li>
      <li><strong>Print</strong>: "Print" outputs the title and the grid, without the rest of the page. The print dialog of the browser also saves it as a PDF.</li>
      <li><strong>Link</strong>: the address of the page carries the matrix, after the # sign. A browser does not send that part of the address to the server. "Copy the link" gives an address that reopens the same matrix.</li>
    </ul>

    <h2>The rules of a RACI matrix</h2>
    <ol>
      <li><strong>Every task has one A, and only one.</strong> That person decides and signs off the result.</li>
      <li><strong>Every task has at least one R.</strong> Without an R, nobody does the work.</li>
      <li><strong>The A can also be the R.</strong> The same person does the work and answers for it: the cell reads A/R.</li>
      <li><strong>A task has few C.</strong> Each C is an opinion to collect before deciding. Someone whose answer can change the decision is a C, the others are I.</li>
      <li><strong>An I signs off nothing.</strong> The I is told once the decision is made, and the task does not wait for an answer.</li>
      <li><strong>The people named read the matrix.</strong> It is agreed with them at the start of the project, in a workshop or at the kick-off meeting.</li>
      <li><strong>The matrix follows the project.</strong> It is corrected when someone joins, leaves or changes role, and when the scope changes.</li>
    </ol>
    <p>The generator checks the first two rules after every change. It also reports a column with no letter at all: that role has no place in the table, or a row is missing.</p>

    <h2>Building a RACI matrix in six steps</h2>
    <ol>
      <li>List the tasks or deliverables of the project, one per row. Write a verb and an object: "Write the specification", not "Specification".</li>
      <li>List the roles in columns. A role ("Tech lead") outlasts a name. A name spares the reader from asking who holds the role.</li>
      <li>Place the A of each row first.</li>
      <li>Place the R, then the C, then the I. A cell can stay empty.</li>
      <li>Read each row again: one A, at least one R. Read each column again: at least one letter.</li>
      <li>Send the link of the matrix to the people it names and correct it with them.</li>
    </ol>

    <h2>Three RACI matrix examples</h2>
    {#each EXAMPLES as example (example.id)}
      <h3 id={example.id}>{example.title}</h3>
      {@render table(example.matrix)}
      {#if example.matrix === SOFTWARE}
        <p>On the "Review the code" row, the tech lead is A and the developers are R. The product manager and the tester have no letter there. On the "Test before release" row, the tester runs the tests and answers for them: the cell reads A/R.</p>
      {/if}
      {#if example.matrix === LAUNCH}
        <p>On the "Train the sales team" row, the product manager gives the training (R) and sales answers for it (A). Support is I on four rows and A/R on the help pages.</p>
      {/if}
      {#if example.matrix === SCRUM}
        <p>The <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">2020 Scrum Guide</a> defines three accountabilities, not a RACI matrix: this table is one reading of it. Four rows come from the guide. The Product Owner is accountable for Product Backlog management, which includes its order. The Developers are accountable for the plan for the Sprint and are responsible for sizing the backlog items. The Daily Scrum is a 15-minute event for the Developers. The Scrum Master is accountable for the Scrum Team's effectiveness, which the retrospective inspects. The guide names no A for the Sprint Review: this table gives it to the Product Owner, who is accountable for the value of the product.</p>
      {/if}
      <p><button type="button" class="btn btn-secondary" onclick={() => generator.load(example.matrix)}>Load this example into the generator</button></p>
    {/each}

    <h2>RASCI, RACI-VS, DACI, RAPID: the variants</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th scope="col">Acronym</th><th scope="col">Letters</th><th scope="col">What changes</th></tr></thead>
      <tbody>
        <tr><th scope="row">RASCI</th><td>Responsible, Accountable, Support, Consulted, Informed</td><td>The S helps the R do the task. Also written RASIC.</td></tr>
        <tr><th scope="row">RACI-VS</th><td>RACI, Verifier, Signatory</td><td>The V checks the deliverable against its acceptance criteria, the S signs the handover.</td></tr>
        <tr><th scope="row">DACI</th><td>Driver, Approver, Contributors, Informed</td><td>Used to make a decision: the D drives it, a single A makes it.</td></tr>
        <tr><th scope="row">RAPID</th><td>Recommend, Agree, Perform, Input, Decide</td><td>A decision tool from the firm Bain &amp; Company: the D decides, the P carries it out.</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Common mistakes</h2>
    <ul>
      <li><strong>Several A on one task.</strong> When they disagree, nobody knows who decides. Keep as A the person who signs off the result and make the others C.</li>
      <li><strong>No R.</strong> The task is signed off by someone and done by no one. Name an R before moving to the next row.</li>
      <li><strong>Everyone is a C.</strong> With six C, a decision waits for six opinions. Make I the people whose opinion does not change the decision.</li>
      <li><strong>Too many rows.</strong> Each extra row is one more row to read again and keep up to date. Group the tasks by deliverable: the generator stops at 30 tasks.</li>
      <li><strong>A matrix nobody updates.</strong> It describes the team of the day it was written. Read it again each time someone joins or leaves and each time the scope changes.</li>
    </ul>

    <h2>Where does the RACI matrix come from?</h2>
    <p>A RACI matrix is a responsibility assignment matrix, or RAM. The PMBOK Guide of the Project Management Institute describes that matrix and gives the RACI chart as an example. ITIL, the framework for IT service management, uses RACI as well.</p>

    <h2 id="faq">Frequently asked questions</h2>
    {#each FAQ as { q, r } (q)}
      <h3>{q}</h3>
      <p>{r}</p>
    {/each}

    <p class="related">
      See also:
      <a href="/guides">all the guides</a>,
      <a href="/planning-poker">the planning poker guide</a>,
      <a href="/retrospective">retrospective formats</a>,
      <a href="/story-points">story points</a>.
      PokerAgile is a free planning poker app, on this same site.
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
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 0.75rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  h3 { margin-top: 1.25rem; margin-bottom: 0.25rem; font-size: 1rem; }

  p, li { line-height: 1.7; }
  p + p { margin-top: 0.5rem; }

  .lead { font-size: 1.05rem; color: var(--color-text-muted); margin-bottom: 0.75rem; }

  ul, ol {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .lettres {
    list-style: none;
    padding-left: 0;
    gap: 0;
  }

  .lettres li { line-height: 1.5; }

  .table-wrap { overflow-x: auto; margin: 0.75rem 0; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  caption {
    caption-side: top;
    text-align: left;
    font-weight: 600;
    padding-bottom: 0.25rem;
  }

  th, td {
    padding: 0.4rem 0.5rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  thead th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tbody th { font-weight: 600; }

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
