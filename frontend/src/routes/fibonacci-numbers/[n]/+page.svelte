<script lang="ts">
  import { page } from '$app/state';
  import { donneesDuRang } from '#lib/fibonacci-pages.ts';

  /* Rendered on the server only (csr is off in +page.server.ts): the guard keeps the maths module out of every client chunk. */
  const d = $derived(import.meta.env.SSR ? donneesDuRang(Number(page.params.n), 'en') : (undefined as never));
  const liaison = (i: number) => (i === 0 ? '' : i === d.diviseurs.length - 1 ? ' and ' : ', ');
  const sum = $derived(d.somme ? `, the sum of ${d.somme.a.valeur} and ${d.somme.b.valeur}` : '');
  const kind = $derived([`${d.chiffres} digit${d.chiffres > 1 ? 's' : ''}`, d.pair ? 'even' : 'odd', ...(d.premier ? ['prime'] : [])].join(', '));
  const description = $derived(`The ${d.ordinal} Fibonacci number is ${d.valeur}${sum}. ${kind}.`);
</script>

<svelte:head>
  <title>{d.ordinal} Fibonacci number: {d.valeur} | PokerAgile</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://pokeragile.com/fibonacci-numbers/{d.n}" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/fibonacci-numbers/{d.n}" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/suite-de-fibonacci/{d.n}" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/fibonacci-numbers/{d.n}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fibonacci-numbers/{d.n}" />
  <meta property="og:title" content="{d.ordinal} Fibonacci number: {d.valeur}" />
  <meta property="og:description" content="F({d.n}) = {d.valeur}. The sum that produces it, its prime factors, its ratio to the previous term." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fibonacci-numbers" class="back-link">Fibonacci numbers, the first 100</a>

    <h1>{d.ordinal} Fibonacci number</h1>
    <p class="valeur {d.taille}">{d.valeur}</p>

    {#if d.somme}
      <p class="somme">
        F({d.n}) = F({d.somme.a.n}) + F({d.somme.b.n}) = {d.somme.a.valeur} + {d.somme.b.valeur}
      </p>
    {:else}
      <p>F(1) = 1 and F(2) = 1 are the two starting values of the sequence. No sum produces them.</p>
    {/if}

    <dl>
      <div class="fait">
        <dt>Number of digits</dt>
        <dd>{d.chiffres}</dd>
      </div>
      <div class="fait">
        <dt>Odd or even</dt>
        <dd>
          {#if d.pair}
            Even. Rank {d.n} is a multiple of 3, and every third Fibonacci number is even.
          {:else}
            Odd. Rank {d.n} is not a multiple of 3.
          {/if}
        </dd>
      </div>
      <div class="fait">
        <dt>Prime</dt>
        <dd>
          {#if d.premier}
            Yes. {d.valeur} has no divisor other than 1 and itself.
          {:else if d.facteurs.length === 0}
            No. 1 is neither prime nor composite.
          {:else}
            No. {d.valeur} =
            {#each d.facteurs as facteur, i (facteur.premier)}{i > 0 ? ' × ' : ''}{facteur.premier}{#if facteur.exposant > 1}<sup>{facteur.exposant}</sup>{/if}{/each}
          {/if}
        </dd>
      </div>
      {#if d.n > 2}
        <div class="fait">
          <dt>Fibonacci numbers that divide it</dt>
          <dd>
            {#if d.diviseurs.length > 0}
              {d.n} is divisible by {#each d.diviseurs as diviseur, i (diviseur.n)}{liaison(i)}{diviseur.n}{/each},
              so F({d.n}) is divisible by
              {#each d.diviseurs as diviseur, i (diviseur.n)}{liaison(i)}<a href="/fibonacci-numbers/{diviseur.n}">F({diviseur.n})</a> = {diviseur.valeur}{/each}.
            {:else}
              None, apart from 1. Rank {d.n} has no divisor between 3 and {d.n - 1}.
            {/if}
          </dd>
        </div>
      {/if}
      {#if d.rapport && d.precedent}
        <div class="fait">
          <dt>Ratio to the previous term</dt>
          <dd>
            F({d.n}) / F({d.precedent.n}) = {d.valeur} / {d.precedent.valeur} = {d.rapport}.
            The golden ratio is 1.6180339887.
          </dd>
        </div>
      {/if}
      <div class="fait">
        <dt>Binet's formula</dt>
        <dd>
          φ<sup>{d.n}</sup> / √5 is {d.binet.auDessus ? 'above' : 'below'} {d.valeur} by
          {d.binet.mantisse}&nbsp;×&nbsp;10<sup>{d.binet.exposant}</sup>. The closest integer is F({d.n}).
        </dd>
      </div>
      <div class="fait">
        <dt>Sum of the first {d.n} terms</dt>
        <dd>F({d.n + 2}) - 1 = {d.cumul}</dd>
      </div>
    </dl>

    <nav class="voisins" aria-label="Neighbouring ranks">
      {#if d.precedent}
        <a href="/fibonacci-numbers/{d.precedent.n}" rel="prev">{d.precedent.ordinal} Fibonacci number, {d.precedent.valeur}</a>
      {/if}
      {#if d.suivant}
        <a href="/fibonacci-numbers/{d.suivant.n}" rel="next">{d.suivant.ordinal} Fibonacci number, {d.suivant.valeur}</a>
      {/if}
    </nav>

    <p>
      <a href="/fibonacci-numbers#list">List of the first 100 Fibonacci numbers</a>, with the
      formula and a calculator.
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
  h1 { margin-bottom: 0.75rem; }
  p { line-height: 1.7; margin-bottom: 0.75rem; }
  .valeur { font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1.2; color: var(--color-primary); margin-bottom: 1.25rem; overflow-wrap: anywhere; }
  .courte { font-size: 2.5rem; }
  .moyenne { font-size: 1.75rem; }
  .longue { font-size: 1.125rem; }
  .somme { font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
  dl { margin: 0; border-top: 1px solid var(--color-border); }
  .fait { padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
  dt { font-weight: 700; font-size: 0.9rem; }
  dd { margin: 0.25rem 0 0; line-height: 1.6; overflow-wrap: anywhere; }
  .voisins { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 1.5rem; margin: 2rem 0 1.5rem; }
  .voisins a { overflow-wrap: anywhere; }
  .footer { padding: 1.5rem 0; margin-top: 3rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); }
</style>
