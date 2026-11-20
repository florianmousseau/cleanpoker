<script lang="ts">
  import { onMount } from 'svelte';
  import type { Extras } from '#lib/i18n.ts';
  import { analyser, langueDeReponse, modeleLocal, type LanguageModelApi } from '#lib/ia-locale.ts';

  let { story, lang, X }: { story: string; lang: string; X: Extras } = $props();

  let api = $state<LanguageModelApi | null>(null);
  let answerLang = $state<string | null>(null);
  let status = $state<'idle' | 'running' | 'done' | 'failed'>('idle');
  let progress = $state<number | null>(null);
  let text = $state('');
  let controller: AbortController | null = null;

  // Checked once in the browser: the button exists only where the model can run.
  onMount(() => {
    const found = modeleLocal();
    if (!found) return;
    langueDeReponse(found, lang).then((l) => {
      api = found;
      answerLang = l;
    });
    return () => controller?.abort();
  });

  // A new story on the table clears the analysis of the previous one.
  $effect(() => {
    void story;
    controller?.abort();
    status = 'idle';
    text = '';
  });

  async function run() {
    if (!api || !answerLang) return;
    controller?.abort();
    controller = new AbortController();
    status = 'running';
    text = '';
    progress = null;
    try {
      await analyser(api, story, answerLang, {
        onChunk: (c) => (text += c),
        onProgress: (loaded) => (progress = Math.round(loaded * 100)),
        signal: controller.signal,
      });
      status = 'done';
    } catch {
      if (!controller.signal.aborted) status = 'failed';
    }
  }
</script>

{#if api && answerLang}
  <div class="local-ai" data-testid="local-ai">
    <button class="btn btn-secondary btn-sm" onclick={run} disabled={status === 'running'}>
      {status === 'done' ? X.ia.again : X.ia.button}
    </button>
    {#if status === 'running' && progress !== null && progress < 100}
      <p class="ai-note" role="status">{X.ia.downloading(progress)}</p>
    {:else if status === 'running' && !text}
      <p class="ai-note" role="status">{X.ia.running}</p>
    {/if}
    {#if status === 'failed'}
      <p class="ai-note" role="alert">{X.ia.failed}</p>
    {/if}
    {#if text}
      <div class="ai-out" aria-live="polite">{text}</div>
      <p class="ai-note">{X.ia.private}</p>
    {/if}
  </div>
{/if}

<style>
  .local-ai { display: flex; flex-direction: column; align-items: flex-start; gap: 0.4rem; margin-top: 0.5rem; }
  .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; min-height: 0; }
  .ai-out {
    white-space: pre-wrap; overflow-wrap: anywhere; font-size: 0.875rem; line-height: 1.55;
    padding: 0.625rem min(0.875rem, 14px); width: 100%;
    background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius);
  }
  .ai-note { font-size: 0.78rem; color: var(--color-text-muted); }
</style>
