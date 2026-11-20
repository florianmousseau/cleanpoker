<script lang="ts">
  /* The same few lines as src/lib/fibonacci.ts, kept in this page's own chunk: fibonacci.test.ts renders the page and compares. */
  const fib = (n: number) => {
    let a = 0n;
    let b = 1n;
    for (let i = 1; i < n; i++) [a, b] = [b, a + b];
    return b;
  };
  const ecrire = (valeur: bigint) => valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

  const termes = Array.from({ length: 100 }, (_, i) => ({ n: i + 1, valeur: ecrire(fib(i + 1)) }));
  const rapports = [2, 3, 5, 10, 20, 40].map((n) => {
    const chiffres = ((fib(n) * 10n ** 10n + fib(n - 1) / 2n) / fib(n - 1)).toString();
    return { n, haut: ecrire(fib(n)), bas: ecrire(fib(n - 1)), valeur: `${chiffres[0]},${chiffres.slice(1)}` };
  });

  let rang = $state(10);
  const valide = $derived(Number.isInteger(rang) && rang >= 1 && rang <= 1000);

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
      q: 'Quelle est la formule de la suite de Fibonacci\u00A0?',
      r: "F(n) = F(n-1) + F(n-2), avec F(1) = 1 et F(2) = 1. La formule de Binet donne un terme sans calculer les précédents\u00A0: F(n) est l'entier le plus proche de φ puissance n divisé par √5, où φ = (1 + √5) / 2.",
    },
    {
      q: "Quel est le lien entre la suite de Fibonacci et le nombre d'or\u00A0?",
      r: "Le rapport entre deux termes qui se suivent se rapproche du nombre d'or, φ = (1 + √5) / 2, soit environ 1,6180339887. Au rang 20, 6765 / 4181 vaut 1,6180339632.",
    },
    {
      q: 'La suite de Fibonacci commence-t-elle par 0 ou par 1\u00A0?',
      r: 'Les deux conventions existent. Avec F(1) = F(2) = 1, la suite commence par 1, 1, 2, 3, 5. Avec F(0) = 0, elle commence par 0, 1, 1, 2, 3. Les nombres sont les mêmes.',
    },
    {
      q: 'Quel est le 100e nombre de Fibonacci\u00A0?',
      r: "F(100) = 354224848179261915075. C'est un nombre de 21 chiffres.",
    },
  ];

  const sansSoudure = (texte: string) => texte.replaceAll('\u00A0', ' ');
</script>

<svelte:head>
  <title>Suite de Fibonacci&nbsp;: les 100 premiers nombres et la formule</title>
  <meta name="description" content="Suite de Fibonacci&nbsp;: 1, 1, 2, 3, 5, 8, 13, 21. Tableau des 100 premiers nombres, formule de récurrence, formule de Binet, nombre d'or, code Python et JavaScript." />
  <link rel="canonical" href="https://pokeragile.com/fr/suite-de-fibonacci" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/suite-de-fibonacci" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/fibonacci-numbers" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/fibonacci-numbers" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fr/suite-de-fibonacci" />
  <meta property="og:title" content="Suite de Fibonacci&nbsp;: les 100 premiers nombres et la formule" />
  <meta property="og:description" content="Tableau des 100 premiers nombres de Fibonacci, formule de récurrence, formule de Binet, nombre d'or, code Python et JavaScript." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Suite de Fibonacci : les 100 premiers nombres et la formule',
    url: 'https://pokeragile.com/fr/suite-de-fibonacci',
    inLanguage: 'fr',
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
      name: sansSoudure(q),
      acceptedAnswer: { '@type': 'Answer', text: sansSoudure(r) },
    })),
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr" class="back-link">PokerAgile</a>

    <h1>Suite de Fibonacci&nbsp;: les 100 premiers nombres et la formule</h1>

    <p>
      La suite de Fibonacci est une suite de nombres entiers où
      <strong>chaque terme est la somme des deux termes qui le précèdent</strong>.
      Elle commence par 1 et 1.
    </p>
    <p class="termes">
      Les 20 premiers termes sont <strong>{termes.slice(0, 20).map((terme) => terme.valeur).join(', ')}</strong>.
    </p>

    <nav class="sommaire" aria-label="Sommaire">
      <a href="#calcul">Calculer un terme</a>
      <a href="#tableau">Les 100 premiers nombres</a>
      <a href="#recurrence">Formule de récurrence</a>
      <a href="#binet">Formule de Binet</a>
      <a href="#nombre-d-or">Nombre d'or</a>
      <a href="#lapins">Le problème des lapins</a>
      <a href="#nature">Dans la nature</a>
      <a href="#algorithme">Python et JavaScript</a>
      <a href="#faq">Questions fréquentes</a>
    </nav>

    <h2 id="calcul">Calculer un terme de la suite</h2>
    <div class="calcul">
      <label for="rang">Rang n, de 1 à 1000</label>
      <input id="rang" type="number" min="1" max="1000" step="1" inputmode="numeric" value="10" oninput={(e) => (rang = e.currentTarget.valueAsNumber)} />
      <output for="rang" class="resultat" aria-live="polite">
        {#if valide}F({rang}) = {ecrire(fib(rang))}{:else}Entrez un entier de 1 à 1000.{/if}
      </output>
    </div>

    <h2 id="tableau">Les 100 premiers nombres de Fibonacci</h2>
    <div class="table-wrap">
      <table class="liste">
        <thead>
          <tr><th scope="col">Rang</th><th scope="col">Nombre de Fibonacci</th></tr>
        </thead>
        <tbody data-sveltekit-reload>
          {#each termes as terme (terme.n)}
            <tr>
              <td><a href="/fr/suite-de-fibonacci/{terme.n}">F({terme.n})</a></td>
              <td>{terme.valeur}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h2 id="recurrence">La formule de récurrence</h2>
    <p class="formule">F(n) = F(n-1) + F(n-2), avec F(1) = 1 et F(2) = 1</p>
    <p>
      Exemple&nbsp;: F(7) = F(6) + F(5) = 8 + 5 = 13. La formule demande de connaître les deux
      termes d'avant. Pour obtenir F(50), il faut donc calculer les 49 premiers termes.
    </p>
    <p>
      Certains auteurs ajoutent un terme au début, F(0) = 0. La suite devient 0, 1, 1, 2, 3, 5, 8.
      Les nombres ne changent pas, et F(1) vaut toujours 1. Sur cette page, le rang 1 est le
      premier 1.
    </p>

    <h2 id="binet">La formule de Binet</h2>
    <p class="formule">
      F(n) = (φ<sup>n</sup> - ψ<sup>n</sup>) / √5<br />
      φ = (1 + √5) / 2<br />
      ψ = (1 - √5) / 2
    </p>
    <p>
      Elle donne F(n) sans passer par les termes précédents. Le terme ψ<sup>n</sup> / √5 reste
      toujours plus petit que 0,5&nbsp;: F(n) est donc l'entier le plus proche de
      φ<sup>n</sup> / √5. Au rang 10, φ<sup>10</sup> / √5 vaut 55,0036 et F(10) = 55.
    </p>
    <p>
      Jacques Binet a publié cette formule en 1843. Abraham de Moivre l'avait déjà écrite en 1730
      dans ses <em lang="la">Miscellanea Analytica</em>. Daniel Bernoulli et Leonhard Euler la
      connaissaient aussi.
    </p>
    <p>
      Sur un ordinateur, avec des nombres à virgule sur 64 bits, la formule de Binet donne le bon
      entier jusqu'au rang 70. Au rang 71, l'arrondi tombe à côté.
    </p>

    <h2 id="nombre-d-or">Le lien avec le nombre d'or</h2>
    <p>
      Divisez un terme par celui qui le précède. Plus le rang est grand, plus le résultat est
      proche du nombre d'or, φ = (1 + √5) / 2, soit environ <strong>1,6180339887</strong>.
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th scope="col">Rang n</th><th scope="col">F(n) / F(n-1)</th><th scope="col">Rapport</th></tr>
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
      Le rapport passe tour à tour au-dessus et au-dessous de φ&nbsp;: 2, puis 1,5, puis 1,667,
      puis 1,6. L'astronome Johannes Kepler avait déjà noté que ces rapports se resserrent.
    </p>

    <h2 id="lapins">Explication simple&nbsp;: le problème des lapins</h2>
    <p>
      Ce problème est dans le <em lang="la">Liber Abaci</em>, le livre de calcul que Léonard de
      Pise, surnommé Fibonacci, a écrit en 1202. Un couple de lapins est placé dans un enclos.
      Un couple devient adulte en un mois. Ensuite, il donne naissance à un nouveau couple
      chaque mois. Aucun lapin ne meurt. Combien de couples compte-t-on après un an&nbsp;?
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th scope="col">Mois</th><th scope="col">Couples</th></tr>
        </thead>
        <tbody>
          {#each [1, 2, 3, 4, 5, 6, 12] as mois (mois)}
            <tr><td>{mois}</td><td>{ecrire(fib(mois))}</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p>
      Le premier mois, le couple est jeune. Le deuxième mois, il est adulte. Le troisième mois,
      il a ses premiers petits et l'enclos compte 2 couples.
    </p>
    <p>
      Chaque mois, on retrouve tous les couples du mois d'avant. On ajoute un nouveau couple pour
      chaque couple qui existait deux mois plus tôt. C'est la formule de récurrence. Au douzième
      mois, on compte 144 couples, soit F(12).
    </p>
    <p>
      Dans le livre, le premier couple est déjà adulte et fait des petits dès le premier mois.
      Fibonacci écrit donc 2, 3, 5, 8, 13 et arrive à 377 couples au bout de douze mois, soit F(14).
    </p>
    <p>
      La suite était connue avant lui. Des savants indiens l'utilisaient pour compter les rythmes
      possibles d'un vers en sanskrit, comme Virahanka vers l'an 700 et Hemachandra vers 1150.
      Le nom «&nbsp;suite de Fibonacci&nbsp;» vient du mathématicien français Édouard Lucas, au
      XIX<sup>e</sup> siècle.
    </p>

    <h2 id="nature">La suite de Fibonacci dans la nature</h2>
    <ul>
      <li>
        <strong>Tournesol.</strong> Les graines dessinent des spirales qui tournent dans les deux
        sens. On en compte souvent 34 dans un sens et 55 dans l'autre. Sur de grandes fleurs,
        55 et 89.
      </li>
      <li>
        <strong>Pomme de pin.</strong> Les écailles forment le plus souvent 5 et 8 spirales, ou
        8 et 13.
      </li>
      <li>
        <strong>Abeilles.</strong> Un mâle naît d'un œuf non fécondé. Il a une mère et pas de
        père. Une femelle a deux parents. En remontant l'arbre d'un mâle, on compte 1 parent,
        2 grands-parents, 3 arrière-grands-parents, puis 5 et 8 ancêtres.
      </li>
    </ul>
    <p>
      Ces comptes sont fréquents sans être une règle. Une étude publiée en 2016 dans
      <em lang="en">Royal Society Open Science</em> a porté sur 657 tournesols. Sur 768 comptes
      de spirales jugés fiables, 565 étaient des nombres de Fibonacci. Les autres ne l'étaient pas.
    </p>
    <p>
      La coquille du nautile est souvent citée avec le nombre d'or. C'est une erreur. Sa spirale
      grandit bien d'un facteur constant, mais ce facteur n'est pas φ&nbsp;: les mesures publiées
      donnent un rapport proche de 1,3 entre longueur et hauteur, loin de 1,618.
    </p>

    <h2 id="algorithme">Algorithme&nbsp;: la suite de Fibonacci en Python et en JavaScript</h2>
    <h3>Python</h3>
    <pre><code>{PYTHON}</code></pre>
    <h3>JavaScript</h3>
    <pre><code>{JAVASCRIPT}</code></pre>
    <p>
      Les deux fonctions font n additions et gardent deux nombres en mémoire. Python calcule
      avec des entiers de taille libre. En JavaScript, le type Number est exact jusqu'à
      2<sup>53</sup> - 1, une limite dépassée dès F(79). Le type BigInt, écrit avec un n après
      le nombre, donne la valeur exacte.
    </p>
    <p>
      La version récursive, où la fonction s'appelle elle-même deux fois, refait sans cesse les
      mêmes calculs. Pour F(30), elle fait plus d'un million d'appels.
    </p>

    <h2 id="faq">Questions fréquentes</h2>
    {#each FAQ as { q, r } (q)}
      <details>
        <summary>{q}</summary>
        <p>{r}</p>
      </details>
    {/each}

    <h2>À lire aussi</h2>
    <ul>
      <li>
        <a href="/fr/fibonacci">Fibonacci en planning poker</a>&nbsp;: pourquoi les cartes du
        planning poker suivent cette suite.
      </li>
      <li><a href="/fr/story-points">Les story points</a>, que ces cartes servent à compter.</li>
      <li><a href="/fibonacci-numbers" hreflang="en" lang="en">Fibonacci numbers</a>, cette page en anglais.</li>
    </ul>

    <p class="sources">
      Sources&nbsp;:
      <a href="https://oeis.org/A000045" rel="noopener noreferrer">OEIS A000045</a>,
      <a href="https://oeis.org/A001605" rel="noopener noreferrer">OEIS A001605</a>,
      <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4892450/" rel="noopener noreferrer">Swinton et Ochu, 2016</a>,
      <a href="https://link.springer.com/article/10.1007/s00004-018-0419-3" rel="noopener noreferrer">Bartlett, Nexus Network Journal</a>,
      <a href="https://mathworld.wolfram.com/BinetsFormula.html" rel="noopener noreferrer">MathWorld</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/fr/a-propos">À propos</a>
      | <a href="/fr/mentions-legales">Mentions légales</a>
      | <a href="/fr/mentions-legales#confidentialite">Confidentialité</a>
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
