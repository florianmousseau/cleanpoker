<script lang="ts">
  import Logo from '#lib/Logo.svelte';
  import { couleurSaisie, requeteEquipe, texteSur } from '#lib/equipe.ts';
  import { chargerHabillage, garderHabillage } from '#lib/habillage.ts';
  import { couleurDuLogo } from '#lib/couleur-logo.ts';
  import { deviceStorage } from '#lib/seat.ts';
  import { PUBLIC_API_URL } from '$app/env/public';
  import { onMount } from 'svelte';
  import { goto, replaceState } from '$app/navigation';
  import { browser } from '$app/env';
  import { lang } from '#lib/lang.svelte.ts';
  import { cardsQuery, fitsServer, parseCards } from '#lib/cards.ts';
  import Footer from '#lib/Footer.svelte';
  import { lecteurDeSite } from '#lib/lecture-site.ts';
  import LanguageSuggestion from '#lib/LanguageSuggestion.svelte';
  import { ACCUEILS } from '#lib/suggestion-langue.ts';

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
    accessibilitySummary: string;
    keywords: string;
    navAriaLabel: string;
    /**
     * The first line of the H1 was hardcoded to "Planning poker" for every
     * locale. French says it the other way round, and that inverted form is
     * what people actually type into Google, so each locale names its own.
     */
    h1Main: string;
    h1Accent: string;
    lead: string;
    cardsLabel: string;
    cardsSepHint: string;
    presetsAriaLabel: string;
    minCardsError: string;
    deckLimitError: string;
    createBtnLabel: string;
    creatingLabel: string;
    createError: string;
    homeLabel: string;
    teamSummary: string;
    teamNameLabel: string;
    teamColorLabel: string;
    teamSiteLabel: string;
    teamSiteButton: string;
    teamSiteError: string;
    footerSource: string;
    footerLicense: string;
    footerAbout: string;
    footerLegal: string;
    footerPrivacy: string;
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
    accessibilitySummary,
    keywords,
    navAriaLabel,
    h1Main,
    h1Accent,
    lead,
    cardsLabel,
    cardsSepHint,
    presetsAriaLabel,
    minCardsError,
    deckLimitError,
    createBtnLabel,
    creatingLabel,
    createError,
    homeLabel,
    teamSummary,
    teamNameLabel,
    teamColorLabel,
    teamSiteLabel,
    teamSiteButton,
    teamSiteError,
    footerSource,
    footerLicense,
    footerAbout,
    footerLegal,
    footerPrivacy,
  }: Props = $props();

  const PRESETS = [
    { label: 'Fibonacci', cards: '1,2,3,5,8,13,21,?' },
    { label: 'T-shirt',   cards: 'XS,S,M,L,XL,XXL,?' },
    { label: '2ⁿ',        cards: '1,2,4,8,16,32,64,?' },
  ];

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PokerAgile',
    url: jsonLdUrl,
    description: jsonLdDesc,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    isAccessibleForFree: true,
    license: 'https://opensource.org/licenses/MIT',
    sameAs: ['https://github.com/florianmousseau/pokeragile'],
    inLanguage: ['en', 'fr', 'es', 'de', 'pt'],
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    accessibilityFeature: [
      'highContrastDisplay',
      'readingOrder',
      'structuralNavigation',
      'alternativeText',
      'displayTransformability',
    ],
    accessibilityHazard: ['noFlashingHazard', 'noMotionSimulationHazard', 'noSoundHazard'],
    accessibilityControl: ['fullKeyboardControl', 'fullMouseControl', 'fullTouchControl'],
    accessibilityAPI: 'ARIA',
    accessibilitySummary,
    keywords,
  });

  let cardsInput = $state(
    browser
      ? (new URLSearchParams(window.location.search).get('cards') ?? '1,2,3,5,8,13,21,?')
      : '1,2,3,5,8,13,21,?'
  );
  let creating = $state(false);
  // Before hydration the form has no handler, and a native submit reloads
  // `/?` with no room: measured on 2026-10-22, the first click lost on a
  // mid-range phone even after the load event. The button waits instead.
  let ready = $state(false);
  onMount(() => {
    ready = true;
    lang.visit(locale);
    const kept = chargerHabillage(deviceStorage());
    if (kept) {
      teamName = kept.nom;
      teamColor = kept.couleur;
      teamSite = kept.site;
      teamLogo = kept.logo;
      lecteur.deja(kept.site);
      teamOpen = true;
    }
  });
  let error = $state('');

  function pushCards(value: string) {
    replaceState(cardsQuery(value), {});
  }

  const cards = $derived(parseCards(cardsInput));
  const fits = $derived(fitsServer(cards));
  const isValid = $derived(cards.length >= 2 && fits);

  let teamName = $state('');
  let teamColor = $state('#1a6b3c');
  let teamOpen = $state(false);
  let teamSite = $state('');
  let teamLogo = $state('');
  // Set when the site declares no colour: the logo, once loaded, gives one.
  let colourFromLogo = $state(false);
  let siteLoading = $state(false);
  let siteError = $state('');

  // The company's own site names the team and gives its colour. True when
  // something was taken from it, so a failed read can be tried again.
  async function lireSite(site: string): Promise<boolean> {
    siteLoading = true;
    siteError = '';
    try {
      const res = await fetch(`/api/marque?site=${encodeURIComponent(site)}`, { signal: AbortSignal.timeout(8000) });
      const marque: { nom?: string; couleur?: string | null; site?: string } = res.ok ? await res.json() : {};
      if (marque.nom) teamName = marque.nom;
      teamLogo = marque.site ?? '';
      if (marque.couleur) teamColor = marque.couleur;
      colourFromLogo = !marque.couleur && !!teamLogo;
      if (!marque.couleur && !teamLogo) siteError = teamSiteError;
      return !siteError;
    } catch {
      siteError = teamSiteError;
      return false;
    } finally {
      siteLoading = false;
    }
  }

  const lecteur = lecteurDeSite(lireSite);
  const takeSiteColors = () => lecteur.lire(teamSite);

  function logoLoaded(img: HTMLImageElement) {
    if (!colourFromLogo) return;
    colourFromLogo = false;
    const c = couleurDuLogo(img);
    if (c) teamColor = c;
    else siteError = teamSiteError;
  }

  function logoFailed() {
    teamLogo = '';
    if (colourFromLogo) siteError = teamSiteError;
    colourFromLogo = false;
  }

  const CREATE_TIMEOUT_MS = 15000;

  async function createRoom() {
    if (!isValid) return;
    creating = true;
    error = '';
    try {
      // A site typed and never confirmed still dresses the room.
      if (teamOpen) await lecteur.lire(teamSite);
      const res = await fetch(`${PUBLIC_API_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards }),
        // A request that never settles must not hold the button for good.
        signal: AbortSignal.timeout(CREATE_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error();
      const { id } = await res.json();
      lang.set(locale);
      if (teamOpen) garderHabillage(deviceStorage(), { nom: teamName, couleur: teamColor, site: teamSite, logo: teamLogo });
      // The team and its deck travel in the address: a saved link reopens the
      // same room dressed the same way, sprint after sprint.
      await goto(`/${id}${teamOpen ? requeteEquipe(teamName, teamColor, cards, teamLogo) : requeteEquipe('', '', cards)}`);
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
  <meta name="keywords" content={keywords} />
  <link rel="canonical" href={canonical} />
  <link rel="alternate" hreflang="en" href="https://pokeragile.com" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr" />
  <link rel="alternate" hreflang="es" href="https://pokeragile.com/es" />
  <link rel="alternate" hreflang="de" href="https://pokeragile.com/de" />
  <link rel="alternate" hreflang="pt" href="https://pokeragile.com/pt" />
  <link rel="alternate" hreflang="x-default" href="https://pokeragile.com" />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDesc} />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={twitterTitle} />
  <meta name="twitter:description" content={twitterDesc} />
  <meta name="twitter:image" content="https://pokeragile.com/og-image.png" />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<div class="page">
  <header class="header">
    <div class="container header-inner">
      <a href={locale === 'en' ? '/' : `/${locale}`} class="logo-group" aria-label={homeLabel}>
        <Logo />
        <span class="logo-text">PokerAgile</span>
      </a>
    </div>
  </header>

  <main id="main" class="hero container">
    <h1>{h1Main} <br /><span class="accent">{h1Accent}</span></h1>
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
              onclick={() => { cardsInput = preset.cards; pushCards(preset.cards); }}
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
          <!-- Keyed by position, never by label: a duplicate key throws
               each_key_duplicate and freezes the whole page. -->
          {#each cards as card, i (i)}
            <span class="card-chip">{card}</span>
          {/each}
          {#if cards.length < 2}
            <span class="cards-error">{minCardsError}</span>
          {:else if !fits}
            <span class="cards-error">{deckLimitError}</span>
          {/if}
        </p>
      </div>

      <details class="team-field" bind:open={teamOpen}>
        <summary>{teamSummary}</summary>
        <div class="team-inputs">
          <label for="team-site">{teamSiteLabel}</label>
          <div class="team-color-row">
            <input
              id="team-site"
              class="team-site"
              type="text"
              inputmode="url"
              autocomplete="url"
              spellcheck="false"
              placeholder="acme.com"
              bind:value={teamSite}
              onchange={takeSiteColors}
              onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); takeSiteColors(); } }}
            />
            <button type="button" class="preset-btn" disabled={siteLoading || !teamSite.trim()} onclick={takeSiteColors} data-testid="team-site-btn">{teamSiteButton}</button>
          </div>
          {#if siteError}
            <p class="cards-error team-site-error" role="status">{siteError}</p>
          {/if}
          <label for="team-name">{teamNameLabel}</label>
          <input id="team-name" type="text" maxlength="30" autocomplete="off" bind:value={teamName} />
          <label for="team-color">{teamColorLabel}</label>
          <div class="team-color-row">
            <input id="team-color" type="color" bind:value={teamColor} />
            <input
              class="team-hex"
              type="text"
              inputmode="text"
              maxlength="7"
              spellcheck="false"
              autocomplete="off"
              placeholder="#1a6b3c"
              aria-label="{teamColorLabel} (#RRGGBB)"
              value={teamColor}
              oninput={(e) => { const c = couleurSaisie(e.currentTarget.value); if (c) teamColor = c; }}
            />
            <span class="team-preview" style:background={teamColor} style:color={texteSur(teamColor)}>{#if teamLogo}<img class="team-logo" src="/api/logo?site={teamLogo}" alt="" width="24" height="24" onload={(e) => logoLoaded(e.currentTarget as HTMLImageElement)} onerror={logoFailed} />{/if}{teamName.trim() || teamColor}</span>
          </div>
        </div>
      </details>

      {#if error}
        <p class="error" role="alert">{error}</p>
      {/if}

      <button type="submit" class="btn btn-primary btn-lg" disabled={!ready || creating || !isValid} data-testid="create-btn">
        {creating ? creatingLabel : createBtnLabel}
      </button>
    </form>
  </main>

  <Footer
    {navAriaLabel}
    source={footerSource}
    license={footerLicense}
    about={footerAbout}
    legal={footerLegal}
    privacy={footerPrivacy}
    {locale}
    guides
  />
  <LanguageSuggestion {locale} versions={ACCUEILS} />
</div>

<style>
  .page { display: flex; flex-direction: column; min-height: 100dvh; }

  .header { padding: 1rem 0; border-bottom: 1px solid var(--color-border); }
  .header-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; }
  .logo-group { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
  .logo-text { font-size: 1.25rem; font-weight: 700; }

  .hero {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding-top: 3rem; padding-bottom: 3rem; gap: 1.5rem;
  }

  .hero h1 { overflow-wrap: anywhere; }
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

  .team-field { width: 100%; font-size: 0.9rem; }
  .team-color-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; min-width: 0; }
  .team-inputs input.team-hex { width: 7.5em; flex: 0 1 7.5em; max-width: 100%; padding: 0.5rem min(0.625rem, 10px); font: inherit; font-family: var(--font-mono); border: 2px solid var(--color-border); border-radius: var(--radius); background: var(--color-bg); color: var(--color-text); }
  .team-preview { padding: 0.2rem min(0.625rem, 10px); border-radius: 99px; font-size: 0.8rem; font-weight: 700; overflow-wrap: anywhere; }
  .team-inputs input.team-site { flex: 1 1 10em; min-width: 0; width: auto; }
  .team-preview { display: inline-flex; align-items: center; gap: 0.35rem; }
  .team-logo { width: 1.5rem; height: 1.5rem; border-radius: 4px; background: #fff; box-shadow: 0 0 0 2px #fff; object-fit: contain; }
  .team-site-error { grid-column: 1 / -1; margin: 0; }
  .team-field summary { cursor: pointer; font-weight: 600; color: var(--color-text-muted); }
  .team-inputs { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 0.5rem 0.75rem; margin-top: 0.625rem; }
  .team-inputs input[type="text"] { width: 100%; padding: 0.5rem min(0.75rem, 12px); font: inherit; border: 2px solid var(--color-border); border-radius: var(--radius); background: var(--color-bg); color: var(--color-text); }
  .team-inputs input[type="color"] { width: 3rem; height: 2.25rem; padding: 0; border: 2px solid var(--color-border); border-radius: var(--radius); background: none; }
  .cards-preview { display: flex; flex-wrap: wrap; gap: 0.3rem; min-height: 1.75rem; }
  .card-chip { overflow-wrap: anywhere; font-size: 0.78rem; font-weight: 700; padding: 0.15rem 0.5rem; background: var(--color-card-selected); color: var(--color-primary); border-radius: 99px; border: 1px solid var(--color-card-border-selected); }
  .cards-error { font-size: 0.78rem; color: var(--color-danger); }

  .btn-lg { padding: 0.875rem min(2.5rem, 40px); font-size: 1.125rem; border-radius: var(--radius-lg); }
  .error { color: var(--color-danger); font-weight: 600; }

</style>
