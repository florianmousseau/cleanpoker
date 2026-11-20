<script lang="ts">
  import { page } from '$app/state';
  import { donneesDuRang } from '#lib/fibonacci-pages.ts';

  /* Rendered on the server only (csr is off in +page.server.ts): the guard keeps the maths module out of every client chunk. */
  const d = $derived(import.meta.env.SSR ? donneesDuRang(Number(page.params.n), 'fr') : (undefined as never));
  const liaison = (i: number) => (i === 0 ? '' : i === d.diviseurs.length - 1 ? ' et ' : ', ');
  const somme = $derived(d.somme ? `, somme de ${d.somme.a.valeur} et de ${d.somme.b.valeur}` : '');
  const nature = $derived([`${d.chiffres} chiffre${d.chiffres > 1 ? 's' : ''}`, d.pair ? 'pair' : 'impair', ...(d.premier ? ['premier'] : [])].join(', '));
  const description = $derived(`Le ${d.ordinal} nombre de la suite de Fibonacci est ${d.valeur}${somme}. ${nature}.`);
</script>

<svelte:head>
  <title>{d.ordinal} nombre de Fibonacci&nbsp;: {d.valeur} | PokerAgile</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://pokeragile.com/fr/suite-de-fibonacci/{d.n}" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/suite-de-fibonacci/{d.n}" />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com/fibonacci-numbers/{d.n}" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com/fibonacci-numbers/{d.n}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://pokeragile.com/fr/suite-de-fibonacci/{d.n}" />
  <meta property="og:title" content="{d.ordinal} nombre de Fibonacci&nbsp;: {d.valeur}" />
  <meta property="og:description" content="F({d.n}) = {d.valeur}. Somme qui le produit, facteurs premiers, rapport au terme précédent." />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/suite-de-fibonacci" class="back-link">Suite de Fibonacci, les 100 premiers nombres</a>

    <h1>{d.ordinal} nombre de Fibonacci</h1>
    <p class="valeur {d.taille}">{d.valeur}</p>

    {#if d.somme}
      <p class="somme">
        F({d.n}) = F({d.somme.a.n}) + F({d.somme.b.n}) = {d.somme.a.valeur} + {d.somme.b.valeur}
      </p>
    {:else}
      <p>
        F(1) = 1 et F(2) = 1 sont les deux valeurs de départ de la suite. Aucune somme ne les
        produit.
      </p>
    {/if}

    <dl>
      <div class="fait">
        <dt>Nombre de chiffres</dt>
        <dd>{d.chiffres}</dd>
      </div>
      <div class="fait">
        <dt>Parité</dt>
        <dd>
          {#if d.pair}
            Pair. Le rang {d.n} est un multiple de 3, et un nombre de Fibonacci sur trois est pair.
          {:else}
            Impair. Le rang {d.n} n'est pas un multiple de 3.
          {/if}
        </dd>
      </div>
      <div class="fait">
        <dt>Nombre premier</dt>
        <dd>
          {#if d.premier}
            Oui. {d.valeur} n'a pas d'autre diviseur que 1 et lui-même.
          {:else if d.facteurs.length === 0}
            Non. 1 n'est ni premier ni composé.
          {:else}
            Non. {d.valeur} =
            {#each d.facteurs as facteur, i (facteur.premier)}{i > 0 ? ' × ' : ''}{facteur.premier}{#if facteur.exposant > 1}<sup>{facteur.exposant}</sup>{/if}{/each}
          {/if}
        </dd>
      </div>
      {#if d.n > 2}
        <div class="fait">
          <dt>Nombres de Fibonacci qui le divisent</dt>
          <dd>
            {#if d.diviseurs.length > 0}
              {d.n} est divisible par {#each d.diviseurs as diviseur, i (diviseur.n)}{liaison(i)}{diviseur.n}{/each}.
              F({d.n}) est donc divisible par
              {#each d.diviseurs as diviseur, i (diviseur.n)}{liaison(i)}<a href="/fr/suite-de-fibonacci/{diviseur.n}">F({diviseur.n})</a> = {diviseur.valeur}{/each}.
            {:else}
              Aucun, à part 1. Le rang {d.n} n'a pas de diviseur entre 3 et {d.n - 1}.
            {/if}
          </dd>
        </div>
      {/if}
      {#if d.rapport && d.precedent}
        <div class="fait">
          <dt>Rapport au terme précédent</dt>
          <dd>
            F({d.n}) / F({d.precedent.n}) = {d.valeur} / {d.precedent.valeur} = {d.rapport}.
            Le nombre d'or vaut 1,6180339887.
          </dd>
        </div>
      {/if}
      <div class="fait">
        <dt>Formule de Binet</dt>
        <dd>
          φ<sup>{d.n}</sup> / √5 est {d.binet.auDessus ? 'au-dessus' : 'au-dessous'} de {d.valeur},
          à {d.binet.mantisse}&nbsp;×&nbsp;10<sup>{d.binet.exposant}</sup> près. L'entier le plus proche est
          bien F({d.n}).
        </dd>
      </div>
      <div class="fait">
        <dt>Somme des {d.n} premiers termes</dt>
        <dd>F({d.n + 2}) - 1 = {d.cumul}</dd>
      </div>
    </dl>

    <nav class="voisins" aria-label="Rangs voisins">
      {#if d.precedent}
        <a href="/fr/suite-de-fibonacci/{d.precedent.n}" rel="prev">{d.precedent.ordinal} nombre de Fibonacci, {d.precedent.valeur}</a>
      {/if}
      {#if d.suivant}
        <a href="/fr/suite-de-fibonacci/{d.suivant.n}" rel="next">{d.suivant.ordinal} nombre de Fibonacci, {d.suivant.valeur}</a>
      {/if}
    </nav>

    <p>
      <a href="/fr/suite-de-fibonacci#tableau">Tableau des 100 premiers nombres de Fibonacci</a>,
      avec la formule et un calculateur.
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
