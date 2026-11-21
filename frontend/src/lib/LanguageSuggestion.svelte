<script lang="ts">
  import { onMount } from 'svelte';
  import { lang, type Lang } from '#lib/lang.svelte.ts';
  import { BANDEAU, langueProposee, type Proposition } from '#lib/suggestion-langue.ts';

  interface Props {
    locale: Lang;
    versions: Readonly<Partial<Record<Lang, string>>>;
  }

  let { locale, versions }: Props = $props();

  let proposition = $state<Proposition | null>(null);
  const mots = $derived(proposition ? BANDEAU[proposition.lang] : null);

  onMount(() => {
    proposition = langueProposee(document.cookie, navigator.languages ?? [], locale, versions);
  });

  function rester() {
    lang.set(locale);
    proposition = null;
  }

  function changer() {
    if (proposition) lang.set(proposition.lang);
    proposition = null;
  }
</script>

{#if proposition && mots}
  <aside class="suggestion-langue" lang={proposition.lang} aria-label={mots.lien}>
    <p>
      {mots.texte}
      <a href={proposition.href} hreflang={proposition.lang} onclick={changer}>{mots.lien}</a>
    </p>
    <button type="button" aria-label={mots.fermer} title={mots.fermer} onclick={rester}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </aside>
{/if}

<style>
  .suggestion-langue {
    position: fixed;
    inset-inline: 1rem;
    bottom: 1rem;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    max-width: 32rem;
    margin-inline: auto;
    padding: 12px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
  }

  p {
    flex: 1 1 0;
    min-width: 0;
    margin: 0;
  }

  a {
    font-weight: 600;
  }

  button {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    border: 0;
    background: none;
    color: inherit;
    cursor: pointer;
  }
</style>
