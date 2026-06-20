<script lang="ts">
  import { lang } from '$lib/lang.svelte';
  import { theme } from '$lib/theme.svelte';

  interface Props {
    navAriaLabel: string;
    source: string;
    license: string;
    legal: string;
    about: string;
    locale: string;
    onLangChange?: (l: string) => void;
  }

  let { navAriaLabel, source, license, legal, about, locale, onLangChange }: Props = $props();

  const ALL_LANGS = ['en', 'fr', 'es', 'de', 'pt'] as const;
  const langHref = (l: string) => (l === 'en' ? '/' : `/${l}`);

  const THEME_LABELS: Record<string, { toDark: string; toLight: string }> = {
    fr: { toDark: 'Passer en mode sombre', toLight: 'Passer en mode clair' },
    en: { toDark: 'Switch to dark mode',   toLight: 'Switch to light mode' },
    es: { toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
    de: { toDark: 'Zum Dunkelmodus',       toLight: 'Zum Hellmodus' },
    pt: { toDark: 'Modo escuro',           toLight: 'Modo claro' },
  };

  const themeLabel = $derived(
    theme.current === 'dark'
      ? (THEME_LABELS[locale]?.toLight ?? 'Light mode')
      : (THEME_LABELS[locale]?.toDark ?? 'Dark mode')
  );

  const prefix = $derived(locale === 'en' ? '' : `/${locale}`);
</script>

<footer class="footer container">
  <div class="footer-controls">
    <nav class="lang-nav" aria-label={navAriaLabel}>
      {#each ALL_LANGS as l (l)}
        {#if l === locale}
          <span class="lang-link lang-current" lang={l} aria-current="page">{l.toUpperCase()}</span>
        {:else if onLangChange}
          <button
            type="button"
            class="lang-link"
            lang={l}
            onclick={() => onLangChange(l)}
          >{l.toUpperCase()}</button>
        {:else}
          <a
            href={langHref(l)}
            class="lang-link"
            lang={l}
            hreflang={l}
            onclick={() => lang.set(l)}
          >{l.toUpperCase()}</a>
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
    <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">{source}</a>
    | <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">{license}</a>
    | <a href="{prefix}/a-propos">{about}</a>
    | <a href="{prefix}/mentions-legales">{legal}</a>
  </p>
</footer>

<style>
  .footer { padding: 1.5rem 1rem; border-top: 1px solid var(--color-border); font-size: 0.875rem; color: var(--color-text-muted); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
  .footer-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
  .lang-nav { display: flex; gap: 0.375rem; flex-wrap: wrap; justify-content: center; }
  .lang-link {
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em;
    color: var(--color-text-muted); text-decoration: none;
    padding: 0.25rem 0.625rem; border: 1px solid var(--color-border);
    border-radius: 99px; transition: color 0.15s, border-color 0.15s;
    background: none; font-family: inherit; cursor: pointer;
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
