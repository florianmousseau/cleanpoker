<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { goto, replaceState } from '$app/navigation';
  import { browser } from '$app/environment';
  import { lang } from '$lib/lang.svelte';
  import { theme } from '$lib/theme.svelte';

  interface Props {
    locale: 'fr' | 'en' | 'es' | 'de' | 'pt';
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

  const allLangs = ['fr', 'en', 'es', 'de', 'pt'] as const;
  const langHref = (l: string) => l === 'fr' ? '/' : `/${l}`;

  const THEME_LABELS: Record<typeof locale, { toDark: string; toLight: string }> = {
    fr: { toDark: 'Passer en mode sombre', toLight: 'Passer en mode clair' },
    en: { toDark: 'Switch to dark mode',   toLight: 'Switch to light mode' },
    es: { toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
    de: { toDark: 'Zum Dunkelmodus',       toLight: 'Zum Hellmodus' },
    pt: { toDark: 'Modo escuro',           toLight: 'Modo claro' },
  };
  const themeLabel = $derived(
    theme.current === 'dark' ? THEME_LABELS[locale].toLight : THEME_LABELS[locale].toDark
  );

  let cardsInput = $state(
    browser
      ? (new URLSearchParams(window.location.search).get('cards') ?? '1,2,3,5,8,13,21,?')
      : '1,2,3,5,8,13,21,?'
  );
  let creating = $state(false);
  let error = $state('');

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
    <div class="footer-controls">
      <nav class="lang-nav" aria-label={navAriaLabel}>
        {#each allLangs as l (l)}
          {#if l === locale}
            <span class="lang-link lang-current" lang={l} aria-current="page">{l.toUpperCase()}</span>
          {:else}
            <a href={langHref(l)} class="lang-link" lang={l} hreflang={l} onclick={() => lang.set(l)}>{l.toUpperCase()}</a>
          {/if}
        {/each}
      </nav>
      <button
        type="button"
        class="theme-toggle"
        aria-label={themeLabel}
        aria-pressed={theme.current === 'dark'}
        onclick={() => theme.toggle()}
      >
        {#if theme.current === 'dark'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        {:else}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        {/if}
      </button>
    </div>
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

  .footer { padding: 1.5rem 1rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
  .footer-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
  .lang-nav { display: flex; gap: 0.375rem; flex-wrap: wrap; justify-content: center; }
  .lang-link {
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em;
    color: var(--color-text-muted); text-decoration: none;
    padding: 0.25rem 0.625rem; border: 1px solid var(--color-border);
    border-radius: 99px; transition: color 0.15s, border-color 0.15s;
  }
  .lang-link:hover { color: var(--color-primary); border-color: var(--color-primary); }
  .lang-current { color: var(--color-primary); border-color: var(--color-primary); cursor: default; }
  .theme-toggle {
    display: inline-flex; align-items: center; justify-content: center;
    width: 2rem; height: 2rem; padding: 0;
    background: none; border: 1px solid var(--color-border);
    border-radius: 99px; color: var(--color-text-muted);
    cursor: pointer; transition: color 0.15s, border-color 0.15s;
  }
  .theme-toggle:hover { color: var(--color-primary); border-color: var(--color-primary); }
</style>
