<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { goto, replaceState } from '$app/navigation';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { lang } from '$lib/lang.svelte';

  interface Props {
    locale: 'fr' | 'en' | 'es' | 'de' | 'pt';
    redirectOnMount?: boolean;
    pageTitle: string;
    metaDesc: string;
    canonical: string;
    ogLocale: string;
    ogTitle: string;
    ogDesc: string;
    twitterTitle: string;
    twitterDesc: string;
    jsonLdUrl: string;
    jsonLdDesc: string;
    navAriaLabel: string;
    h1Accent: string;
    lead: string;
    cardsLabel: string;
    cardsSepHint: string;
    presetsAriaLabel: string;
    minCardsError: string;
    createBtnLabel: string;
    creatingLabel: string;
    hintText: string;
    createError: string;
    footerSource: string;
    footerLicense: string;
    footerLegal: string;
  }

  let {
    locale,
    redirectOnMount = false,
    pageTitle,
    metaDesc,
    canonical,
    ogLocale,
    ogTitle,
    ogDesc,
    twitterTitle,
    twitterDesc,
    jsonLdUrl,
    jsonLdDesc,
    navAriaLabel,
    h1Accent,
    lead,
    cardsLabel,
    cardsSepHint,
    presetsAriaLabel,
    minCardsError,
    createBtnLabel,
    creatingLabel,
    hintText,
    createError,
    footerSource,
    footerLicense,
    footerLegal,
  }: Props = $props();

  const PRESETS = [
    { label: 'Fibonacci', cards: '1,2,3,5,8,13,21,?' },
    { label: 'T-shirt',   cards: 'XS,S,M,L,XL,XXL,?' },
    { label: '2ⁿ',        cards: '1,2,4,8,16,32,64,?' },
  ];

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CleanPoker',
    url: jsonLdUrl,
    description: jsonLdDesc,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  });

  const otherLangs = (['fr', 'en', 'es', 'de', 'pt'] as const).filter(l => l !== locale);
  const langHref = (l: string) => l === 'fr' ? '/' : `/${l}`;

  let cardsInput = $state(
    browser
      ? (new URLSearchParams(window.location.search).get('cards') ?? '1,2,3,5,8,13,21,?')
      : '1,2,3,5,8,13,21,?'
  );
  let creating = $state(false);
  let error = $state('');

  onMount(() => {
    if (!redirectOnMount) return;
    const saved = localStorage.getItem('lang');
    if (saved === 'en') { goto('/en', { replaceState: true }); return; }
    if (saved === 'es') { goto('/es', { replaceState: true }); return; }
    if (saved === 'de') { goto('/de', { replaceState: true }); return; }
    if (saved === 'pt') { goto('/pt', { replaceState: true }); return; }
    const bl = navigator.language.toLowerCase();
    if (bl.startsWith('pt')) { goto('/pt', { replaceState: true }); return; }
    if (bl.startsWith('es')) { goto('/es', { replaceState: true }); return; }
    if (bl.startsWith('de')) { goto('/de', { replaceState: true }); return; }
    if (bl.startsWith('en')) { goto('/en', { replaceState: true }); return; }
  });

  function pushCards(value: string) {
    const safe = value.replace(/&/g, '%26').replace(/=/g, '%3D');
    replaceState(`?cards=${safe}`, {});
  }

  function parseCards(input: string): string[] {
    return input.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }

  const cards = $derived(parseCards(cardsInput));
  const isValid = $derived(cards.length >= 2);

  async function createRoom() {
    if (!isValid) return;
    creating = true;
    error = '';
    try {
      const res = await fetch(`${PUBLIC_API_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards }),
      });
      if (!res.ok) throw new Error();
      const { id } = await res.json();
      lang.set(locale);
      await goto(`/${id}`);
    } catch {
      error = createError;
    } finally {
      creating = false;
    }
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={metaDesc} />
  <link rel="canonical" href={canonical} />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev" />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDesc} />
  <meta property="og:image" content="https://cleanpoker.dev/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={twitterTitle} />
  <meta name="twitter:description" content={twitterDesc} />
  <meta name="twitter:image" content="https://cleanpoker.dev/og-image.png" />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<div class="page">
  <header class="header">
    <div class="container header-inner">
      <div class="logo-group">
        <span class="logo" aria-hidden="true">♠</span>
        <span class="logo-text">CleanPoker</span>
      </div>
      <nav class="lang-nav" aria-label={navAriaLabel}>
        {#each otherLangs as l (l)}
          <a href={langHref(l)} class="lang-link" hreflang={l}>{l.toUpperCase()}</a>
        {/each}
      </nav>
    </div>
  </header>

  <main id="main" class="hero container">
    <h1>Planning poker<br /><span class="accent">{h1Accent}</span></h1>
    <p class="lead">{lead}</p>

    <form class="create-form" onsubmit={(e) => { e.preventDefault(); createRoom(); }}>
      <div class="cards-field">
        <label for="cards-input">{cardsLabel} <span class="label-hint">{cardsSepHint}</span></label>
        <div class="presets" role="group" aria-label={presetsAriaLabel}>
          {#each PRESETS as preset (preset.label)}
            <button
              type="button"
              class="preset-btn"
              class:active={cardsInput === preset.cards}
              onclick={() => { cardsInput = preset.cards; }}
              aria-pressed={cardsInput === preset.cards}
            >{preset.label}</button>
          {/each}
        </div>
        <input
          id="cards-input"
          type="text"
          bind:value={cardsInput}
          oninput={() => pushCards(cardsInput)}
          placeholder="1,2,3,5,8,13,21,?"
          aria-describedby="cards-preview"
          spellcheck="false"
        />
        <p id="cards-preview" class="cards-preview" aria-live="polite">
          {#each cards as card (card)}
            <span class="card-chip">{card}</span>
          {/each}
          {#if !isValid}
            <span class="cards-error">{minCardsError}</span>
          {/if}
        </p>
      </div>

      {#if error}
        <p class="error" role="alert">{error}</p>
      {/if}

      <button type="submit" class="btn btn-primary btn-lg" disabled={creating || !isValid} data-testid="create-btn">
        {creating ? creatingLabel : createBtnLabel}
      </button>
      <p class="hint">{hintText}</p>
    </form>
  </main>

  <footer class="footer container">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">{footerSource}</a>
      · <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">{footerLicense}</a>
      · <a href="/mentions-legales">{footerLegal}</a>
    </p>
  </footer>
</div>

<style>
  .page { display: flex; flex-direction: column; min-height: 100dvh; }

  .header { padding: 1rem 0; border-bottom: 1px solid var(--color-border); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; }
  .logo-group { display: flex; align-items: center; gap: 0.5rem; }
  .logo { font-size: 1.5rem; color: var(--color-primary); }
  .logo-text { font-size: 1.25rem; font-weight: 700; }
  .lang-nav { display: flex; gap: 0.375rem; }
  .lang-link {
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em;
    color: var(--color-text-muted); text-decoration: none;
    padding: 0.25rem 0.625rem; border: 1px solid var(--color-border);
    border-radius: 99px; transition: color 0.15s, border-color 0.15s;
  }
  .lang-link:hover { color: var(--color-primary); border-color: var(--color-primary); }

  .hero {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding-top: 3rem; padding-bottom: 3rem; gap: 1.5rem;
  }

  .accent { color: var(--color-primary); }
  .lead { font-size: 1.125rem; color: var(--color-text-muted); max-width: 36rem; }

  .create-form { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; width: 100%; max-width: 32rem; }

  .cards-field { width: 100%; display: flex; flex-direction: column; gap: 0.5rem; }
  .cards-field label { font-weight: 600; font-size: 0.9rem; }
  .label-hint { font-weight: 400; color: var(--color-text-muted); font-size: 0.8rem; }

  .presets { display: flex; gap: 0.375rem; flex-wrap: wrap; }
  .preset-btn {
    padding: 0.3rem 0.875rem; font-size: 0.825rem; font-family: inherit; font-weight: 600;
    border: 2px solid var(--color-border); border-radius: 99px;
    background: var(--color-surface); color: var(--color-text);
    cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s; min-height: 2rem;
  }
  .preset-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
  .preset-btn.active { border-color: var(--color-primary); background: var(--color-card-selected); color: var(--color-primary); }

  .cards-field input[type="text"] {
    width: 100%; padding: 0.625rem 0.875rem; font-size: 1rem; font-family: var(--font-mono);
    border: 2px solid var(--color-border); border-radius: var(--radius);
    background: var(--color-bg); color: var(--color-text); transition: border-color 0.15s;
  }
  .cards-field input[type="text"]:focus { outline: none; border-color: var(--color-primary); }

  .cards-preview { display: flex; flex-wrap: wrap; gap: 0.3rem; min-height: 1.75rem; }
  .card-chip { font-size: 0.78rem; font-weight: 700; padding: 0.15rem 0.5rem; background: var(--color-card-selected); color: var(--color-primary); border-radius: 99px; border: 1px solid var(--color-card-border-selected); }
  .cards-error { font-size: 0.78rem; color: var(--color-danger); }

  .btn-lg { padding: 0.875rem 2.5rem; font-size: 1.125rem; border-radius: var(--radius-lg); }
  .hint { font-size: 0.875rem; color: var(--color-text-muted); }
  .error { color: var(--color-danger); font-weight: 600; }

  .footer { padding: 1.5rem 1rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); text-align: center; }
</style>
