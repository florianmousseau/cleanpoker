<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { lang } from '$lib/lang.svelte';

  onMount(() => {
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

  const PRESETS = [
    { label: 'Fibonacci', cards: '1,2,3,5,8,13,21,?' },
    { label: 'T-shirt',   cards: 'XS,S,M,L,XL,XXL,?' },
    { label: '2ⁿ',        cards: '1,2,4,8,16,32,64,?' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CleanPoker',
    url: 'https://cleanpoker.dev',
    description: 'Outil de planning poker collaboratif, gratuit et sans compte.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };

  let cardsInput = $state(
    browser
      ? (new URLSearchParams(window.location.search).get('cards') ?? '1,2,3,5,8,13,21,?')
      : '1,2,3,5,8,13,21,?'
  );
  let creating = $state(false);
  let error = $state('');

  function pushCards(value: string) {
    const safe = value.replace(/&/g, '%26').replace(/=/g, '%3D');
    history.replaceState(null, '', `?cards=${safe}`);
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
      lang.set('fr');
      await goto(`/${id}`);
    } catch {
      error = 'Impossible de créer la salle. Réessaie.';
    } finally {
      creating = false;
    }
  }
</script>

<svelte:head>
  <title>CleanPoker | Planning poker gratuit, sans compte</title>
  <meta name="description" content="Outil de planning poker collaboratif. Créez une session, partagez l'URL, estimez en équipe. Sans compte, sans tracking. Accessible WCAG 2.1 AA." />
  <link rel="canonical" href="https://cleanpoker.dev" />
  <link rel="alternate" hreflang="fr" href="https://cleanpoker.dev" />
  <link rel="alternate" hreflang="en" href="https://cleanpoker.dev/en" />
  <link rel="alternate" hreflang="es" href="https://cleanpoker.dev/es" />
  <link rel="alternate" hreflang="de" href="https://cleanpoker.dev/de" />
  <link rel="alternate" hreflang="pt" href="https://cleanpoker.dev/pt" />
  <link rel="alternate" hreflang="x-default" href="https://cleanpoker.dev" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cleanpoker.dev" />
  <meta property="og:title" content="CleanPoker | Planning poker gratuit, sans compte" />
  <meta property="og:description" content="Créez une session, partagez l'URL, estimez en équipe. Aucun compte requis." />
  <meta property="og:image" content="https://cleanpoker.dev/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CleanPoker | Planning poker gratuit, sans compte" />
  <meta name="twitter:description" content="Créez une session, partagez l'URL, estimez en équipe. Aucun compte requis." />
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
      <nav class="lang-nav" aria-label="Langue">
        <a href="/en" class="lang-link" hreflang="en">EN</a>
        <a href="/es" class="lang-link" hreflang="es">ES</a>
        <a href="/de" class="lang-link" hreflang="de">DE</a>
        <a href="/pt" class="lang-link" hreflang="pt">PT</a>
      </nav>
    </div>
  </header>

  <main id="main" class="hero container">
    <h1>Planning poker<br /><span class="accent">créer · voter · décider</span></h1>
    <p class="lead">Créez une session, partagez l'URL, estimez en équipe. Aucun compte requis.</p>

    <form class="create-form" onsubmit={(e) => { e.preventDefault(); createRoom(); }}>
      <div class="cards-field">
        <label for="cards-input">Cartes <span class="label-hint">(séparées par des virgules)</span></label>
        <div class="presets" role="group" aria-label="Présélections">
          {#each PRESETS as preset}
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
          {#each cards as card}
            <span class="card-chip">{card}</span>
          {/each}
          {#if !isValid}
            <span class="cards-error">Minimum 2 cartes</span>
          {/if}
        </p>
      </div>

      {#if error}
        <p class="error" role="alert">{error}</p>
      {/if}

      <button type="submit" class="btn btn-primary btn-lg" disabled={creating || !isValid}>
        {creating ? 'Création…' : 'Créer une session'}
      </button>
      <p class="hint">Partage le lien. C&apos;est prêt.</p>
    </form>
  </main>


<footer class="footer container">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">Code source</a>
      · <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      · <a href="/mentions-legales">Mentions légales</a>
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
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 3rem;
    padding-bottom: 3rem;
    gap: 1.5rem;
  }

  .accent { color: var(--color-primary); }
  .lead { font-size: 1.125rem; color: var(--color-text-muted); max-width: 36rem; }

  /* Formulaire création */
  .create-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    max-width: 32rem;
  }

  .cards-field {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cards-field label {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .label-hint {
    font-weight: 400;
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }

  .presets {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .preset-btn {
    padding: 0.3rem 0.875rem;
    font-size: 0.825rem;
    font-family: inherit;
    font-weight: 600;
    border: 2px solid var(--color-border);
    border-radius: 99px;
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    min-height: 2rem;
  }

  .preset-btn:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .preset-btn.active {
    border-color: var(--color-primary);
    background: var(--color-card-selected);
    color: var(--color-primary);
  }

  .cards-field input[type="text"] {
    width: 100%;
    padding: 0.625rem 0.875rem;
    font-size: 1rem;
    font-family: var(--font-mono);
    border: 2px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-bg);
    color: var(--color-text);
    transition: border-color 0.15s;
  }

  .cards-field input[type="text"]:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .cards-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    min-height: 1.75rem;
  }

  .card-chip {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    background: var(--color-card-selected);
    color: var(--color-primary);
    border-radius: 99px;
    border: 1px solid var(--color-card-border-selected);
  }

  .cards-error {
    font-size: 0.78rem;
    color: var(--color-danger);
  }

  .btn-lg { padding: 0.875rem 2.5rem; font-size: 1.125rem; border-radius: var(--radius-lg); }
  .hint { font-size: 0.875rem; color: var(--color-text-muted); }
  .error { color: var(--color-danger); font-weight: 600; }

  .footer {
    padding: 1.5rem 1rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-align: center;
  }
</style>
