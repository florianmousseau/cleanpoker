<script lang="ts">
  /* The same few lines as src/lib/fibonacci.ts, kept in this page's own chunk: fibonacci.test.ts renders the page and compares. */
  const fib = (n: number) => {
    let a = 0n;
    let b = 1n;
    for (let i = 1; i < n; i++) [a, b] = [b, a + b];
    return b;
  };
  const ecrire = (valeur: bigint) => valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const termes = Array.from({ length: 100 }, (_, i) => ({ n: i + 1, valeur: ecrire(fib(i + 1)) }));
  const rapports = [2, 3, 5, 10, 20, 40].map((n) => {
    const chiffres = ((fib(n) * 10n ** 10n + fib(n - 1) / 2n) / fib(n - 1)).toString();
    return { n, haut: ecrire(fib(n)), bas: ecrire(fib(n - 1)), valeur: `${chiffres[0]}.${chiffres.slice(1)}` };
  });

  let rank = $state(10);
  const valide = $derived(Number.isInteger(rank) && rank >= 1 && rank <= 1000);

  const PYTHON = `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fibonacci(100))
# 354224848179261915075`;

  const JAVASCRIPT = `function fibonacci(n) {
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}

console.log(fibonacci(100));
// 354224848179261915075n`;

  const FAQ = [
    {
      q: 'What is the formula for Fibonacci numbers?',
      a: 'F(n) = F(n-1) + F(n-2), with F(1) = 1 and F(2) = 1. Binet\'s formula gives a term without the ones before it: F(n) is the integer closest to φ to the power n divided by √5, where φ = (1 + √5) / 2.',
    },
    {
      q: 'What is the 10th Fibonacci number?',
      a: 'F(10) = 55, counting from F(1) = F(2) = 1. The first ten Fibonacci numbers are 1, 1, 2, 3, 5, 8, 13, 21, 34 and 55.',
    },
    {
      q: 'Does the Fibonacci sequence start with 0 or 1?',
      a: 'Both conventions are in use. With F(1) = F(2) = 1 the sequence starts 1, 1, 2, 3, 5. With F(0) = 0 it starts 0, 1, 1, 2, 3. The numbers are the same.',
    },
    {
      q: 'What is the 100th Fibonacci number?',
      a: 'F(100) = 354,224,848,179,261,915,075. It has 21 digits.',
    },
  ];
</script>

<svelte:head>
  <title>Fibonacci numbers: the first 100, formula and calculator</title>
  <meta name="description" content="Fibonacci numbers: 1, 1, 2, 3, 5, 8, 13, 21. List of the first 100, a calculator up to F(1000), the recurrence, Binet's formula, the golden ratio, Python and JavaScript code." />
  <link rel="canonical" href="https://pokeragile.com/fibonacci-numbers" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/fibonacci-numbers" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/suite-de-fibonacci" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/fibonacci-numbers" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fibonacci-numbers" />
  <meta property="og:title" content="Fibonacci numbers: the first 100, formula and calculator" />
  <meta property="og:description" content="List of the first 100 Fibonacci numbers, a calculator up to F(1000), the recurrence, Binet's formula, the golden ratio, Python and JavaScript code." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fibonacci numbers: the first 100, formula and calculator',
    url: 'https://pokeragile.com/fibonacci-numbers',
    inLanguage: 'en',
    datePublished: '2026-11-20',
    dateModified: '2026-11-20',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/" class="back-link">PokerAgile</a>

    <h1>Fibonacci numbers: the first 100, formula and calculator</h1>

    <p>
      The Fibonacci sequence is a sequence of whole numbers in which
      <strong>each term is the sum of the two terms before it</strong>. It starts with 1 and 1.
    </p>
    <p class="termes">
      The first 20 Fibonacci numbers are <strong>{termes.slice(0, 20).map((terme) => terme.valeur).join(', ')}</strong>.
    </p>

    <nav class="sommaire" aria-label="Contents">
      <a href="#calculator">Calculator</a>
      <a href="#list">First 100 numbers</a>
      <a href="#recurrence">Recurrence</a>
      <a href="#binet">Binet's formula</a>
      <a href="#golden-ratio">Golden ratio</a>
      <a href="#rabbits">The rabbit problem</a>
      <a href="#nature">In nature</a>
      <a href="#code">Python and JavaScript</a>
      <a href="#faq">FAQ</a>
    </nav>

    <h2 id="calculator">Fibonacci sequence calculator</h2>
    <div class="calcul">
      <label for="rank">Rank n, from 1 to 1000</label>
      <input id="rank" type="number" min="1" max="1000" step="1" inputmode="numeric" value="10" oninput={(e) => (rank = e.currentTarget.valueAsNumber)} />
      <output for="rank" class="resultat" aria-live="polite">
        {#if valide}F({rank}) = {ecrire(fib(rank))}{:else}Enter a whole number from 1 to 1000.{/if}
      </output>
    </div>

    <h2 id="list">Fibonacci number list: the first 100</h2>
    <div class="table-wrap">
      <table class="liste">
        <thead>
          <tr><th scope="col">Rank</th><th scope="col">Fibonacci number</th></tr>
        </thead>
        <tbody data-sveltekit-reload>
          {#each termes as terme (terme.n)}
            <tr>
              <td><a href="/fibonacci-numbers/{terme.n}">F({terme.n})</a></td>
              <td>{terme.valeur}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h2 id="recurrence">The recurrence</h2>
    <p class="formule">F(n) = F(n-1) + F(n-2), with F(1) = 1 and F(2) = 1</p>
    <p>
      Example: F(7) = F(6) + F(5) = 8 + 5 = 13. The rule needs the two terms before the one you
      want, so reaching F(50) means computing the first 49 terms.
    </p>
    <p>
      Some authors add a term in front, F(0) = 0. The sequence then reads 0, 1, 1, 2, 3, 5, 8.
      The numbers do not change and F(1) is still 1. On this page, rank 1 is the first 1.
    </p>

    <h2 id="binet">Binet's formula</h2>
    <p class="formule">
      F(n) = (φ<sup>n</sup> - ψ<sup>n</sup>) / √5<br />
      φ = (1 + √5) / 2<br />
      ψ = (1 - √5) / 2
    </p>
    <p>
      It gives F(n) without the earlier terms. The term ψ<sup>n</sup> / √5 is always smaller than
      0.5, so F(n) is the integer closest to φ<sup>n</sup> / √5. At rank 10,
      φ<sup>10</sup> / √5 is 55.0036 and F(10) = 55.
    </p>
    <p>
      Jacques Binet published the formula in 1843. Abraham de Moivre had already written it in
      1730, in his <em lang="la">Miscellanea Analytica</em>. Daniel Bernoulli and Leonhard Euler
      knew it too.
    </p>
    <p>
      In 64-bit floating point, Binet's formula returns the right integer up to rank 70. At rank
      71 the rounding lands on the wrong number.
    </p>

    <h2 id="golden-ratio">Fibonacci numbers and the golden ratio</h2>
    <p>
      Divide a term by the one before it. The higher the rank, the closer the result gets to the
      golden ratio, φ = (1 + √5) / 2, about <strong>1.6180339887</strong>.
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th scope="col">Rank n</th><th scope="col">F(n) / F(n-1)</th><th scope="col">Ratio</th></tr>
        </thead>
        <tbody>
          {#each rapports as rapport (rapport.n)}
            <tr>
              <td>{rapport.n}</td>
              <td>{rapport.haut} / {rapport.bas}</td>
              <td>{rapport.valeur}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p>
      The ratio lands above φ, then below it, in turn: 2, then 1.5, then 1.667, then 1.6. The
      astronomer Johannes Kepler had already noted that these ratios close in.
    </p>

    <h2 id="rabbits">Where it comes from: the rabbit problem</h2>
    <p>
      Leonardo of Pisa, known as Fibonacci, sets this problem in his book of calculation,
      <em lang="la">Liber Abaci</em>, in 1202. A pair of rabbits is put in an enclosure. A pair
      takes one month to mature, then produces a new pair every month. No rabbit dies. How many
      pairs are there after a year?
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th scope="col">Month</th><th scope="col">Pairs</th></tr>
        </thead>
        <tbody>
          {#each [1, 2, 3, 4, 5, 6, 12] as month (month)}
            <tr><td>{month}</td><td>{ecrire(fib(month))}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p>
      In month 1 the pair is young. In month 2 it is adult. In month 3 it has its first young
      and the enclosure holds 2 pairs.
    </p>
    <p>
      Each month keeps every pair from the month before and adds one new pair for each pair
      that existed two months earlier. That is the recurrence. Month 12 has 144 pairs, which is
      F(12).
    </p>
    <p>
      In the book the first pair is already adult and breeds in the first month, so Fibonacci
      writes 2, 3, 5, 8, 13 and reaches 377 pairs after twelve months, which is F(14).
    </p>
    <p>
      The sequence was known before him. Indian scholars used it to count the possible rhythms
      of a line of Sanskrit verse, among them Virahanka around 700 and Hemachandra around 1150.
      The name "Fibonacci sequence" comes from the French mathematician Édouard Lucas, in the
      19th century.
    </p>

    <h2 id="nature">Fibonacci numbers in nature</h2>
    <ul>
      <li>
        <strong>Sunflowers.</strong> The seeds form spirals that turn in both directions. A common
        count is 34 one way and 55 the other. Large heads can show 55 and 89.
      </li>
      <li>
        <strong>Pine cones.</strong> The scales most often form 5 and 8 spirals, or 8 and 13.
      </li>
      <li>
        <strong>Honeybees.</strong> A male hatches from an unfertilised egg, so he has a mother
        and no father. A female has two parents. Going up a male's family tree gives 1 parent,
        2 grandparents, 3 great-grandparents, then 5 and 8 ancestors.
      </li>
    </ul>
    <p>
      These counts are common without being a rule. A study published in 2016 in
      <em>Royal Society Open Science</em> covered 657 sunflowers. Of 768 spiral counts judged
      reliable, 565 were Fibonacci numbers. The rest were not.
    </p>
    <p>
      The nautilus shell is often shown next to the golden ratio. That is a mistake. Its spiral
      does grow by a constant factor, but the factor is not φ: published measurements put the
      length-to-height ratio near 1.3, far from 1.618.
    </p>

    <h2 id="code">Fibonacci in Python and JavaScript</h2>
    <h3>Python</h3>
    <pre><code>{PYTHON}</code></pre>
    <h3>JavaScript</h3>
    <pre><code>{JAVASCRIPT}</code></pre>
    <p>
      Both functions do n additions and keep two numbers in memory. Python integers have no
      size limit. In JavaScript, the Number type is exact up to 2<sup>53</sup> - 1, a limit
      F(79) already passes. BigInt, written with an n after the number, gives the exact value.
    </p>
    <p>
      The recursive version, where the function calls itself twice, repeats the same work over
      and over. For F(30) it makes more than a million calls.
    </p>

    <h2 id="faq">FAQ</h2>
    {#each FAQ as { q, a } (q)}
      <details>
        <summary>{q}</summary>
        <p>{a}</p>
      </details>
    {/each}

    <h2>See also</h2>
    <ul>
      <li>
        <a href="/fibonacci">Fibonacci in planning poker</a>: why planning poker cards follow
        this sequence.
      </li>
      <li><a href="/story-points">Story points</a>, which those cards count.</li>
      <li><a href="/fr/suite-de-fibonacci" hreflang="fr" lang="fr">Suite de Fibonacci</a>, this page in French.</li>
    </ul>

    <p class="sources">
      Sources:
      <a href="https://oeis.org/A000045" rel="noopener noreferrer">OEIS A000045</a>,
      <a href="https://oeis.org/A001605" rel="noopener noreferrer">OEIS A001605</a>,
      <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4892450/" rel="noopener noreferrer">Swinton and Ochu, 2016</a>,
      <a href="https://link.springer.com/article/10.1007/s00004-018-0419-3" rel="noopener noreferrer">Bartlett, Nexus Network Journal</a>,
      <a href="https://mathworld.wolfram.com/BinetsFormula.html" rel="noopener noreferrer">MathWorld</a>.
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
  .page { padding-top: 2rem; padding-bottom: 4rem; max-width: 48rem; }
  .back-link { display: inline-block; margin-bottom: 2rem; font-size: 0.9rem; }
  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2.5rem; margin-bottom: 0.75rem; }
  h3 { margin-top: 1.25rem; margin-bottom: 0.5rem; }
  p, li { line-height: 1.7; }
  p { margin-bottom: 0.75rem; }
  ul { padding-left: min(1.5rem, 24px); margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.375rem; }
  .sommaire { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; margin: 1.25rem 0; font-size: 0.9rem; }
  .formule { font-family: var(--font-mono); font-weight: 700; padding: 0.75rem min(1rem, 16px); border-left: 3px solid var(--color-primary); background: var(--color-surface); overflow-wrap: anywhere; }
  .calcul { display: flex; flex-direction: column; gap: 0.5rem; }
  .calcul label { font-weight: 600; }
  .calcul input { max-width: 10rem; padding: 0.5rem 0.75rem; font: inherit; color: inherit; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); }
  .resultat { display: block; font-family: var(--font-mono); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin: 0.5rem 0; font-variant-numeric: tabular-nums; }
  th, td { padding: 0.375rem 0.5rem; border: 1px solid var(--color-border); text-align: left; }
  th { background: var(--color-surface); font-weight: 700; }
  tr:nth-child(even) td { background: var(--color-surface); }
  .liste { font-size: 0.8125rem; }
  .liste th, .liste td { padding: 0.375rem; }
  .liste td:last-child, .liste th:last-child { text-align: right; }
  pre { overflow-x: auto; padding: 0.75rem min(1rem, 16px); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); font-family: var(--font-mono); font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.75rem; }
  details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 0.75rem min(1rem, 16px); margin-bottom: 0.5rem; }
  details[open] { background: var(--color-surface); }
  summary { font-weight: 600; cursor: pointer; font-size: 0.95rem; }
  details p { margin: 0.75rem 0 0; font-size: 0.9rem; }
  .sources { margin-top: 2rem; font-size: 0.85rem; color: var(--color-text-muted); }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
