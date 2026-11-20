<script lang="ts">
  import type { Translation } from '#lib/i18n.ts';
  import type { Story } from '#lib/useRoom.svelte.ts';
  import { storiesCsv, storiesMarkdown, withCredit } from '#lib/export.ts';
  import { credit } from '#lib/credit.svelte.ts';
  import { copierTexte } from '#lib/presse-papiers.ts';

  let { stories, current, T, canRun, onAdd, onClear, onSelect }: {
    stories: Story[];
    current: number;
    T: Translation;
    canRun: boolean;
    onAdd: (text: string) => void;
    onClear: () => void;
    onSelect: (index: number) => void;
  } = $props();

  let text = $state('');
  let copied = $state(false);
  const header = $derived([T.stories.colStory, T.stories.colEstimate] as [string, string]);

  function add(e: SubmitEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    text = '';
  }

  function clear() {
    if (window.confirm(T.stories.clearConfirm)) onClear();
  }

  async function copyMarkdown() {
    if (await copierTexte(withCredit(storiesMarkdown(stories, header), credit.line(T.results.credit)))) {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    }
  }

  // Built on click, in the page: the stories never leave the browser.
  function downloadCsv() {
    const blob = new Blob(['﻿' + storiesCsv(stories, header)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stories.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<section class="panel" aria-labelledby="stories-title" data-testid="stories">
  <h2 id="stories-title">{T.stories.title}</h2>
  {#if stories.length === 0}
    <p class="empty">{T.stories.none}</p>
  {:else}
    <div class="table-wrap">
      <table class="stories-table">
        <thead>
          <tr>
            <th scope="col">{T.stories.colStory}</th>
            <th scope="col" class="col-estimate">{T.stories.colEstimate}</th>
          </tr>
        </thead>
        <tbody>
          {#each stories as story, i (i)}
            <tr class:on-table={i === current} aria-current={i === current ? 'true' : undefined}>
              <td>
                {#if canRun && i !== current}
                  <button class="story-link" onclick={() => onSelect(i)} aria-label={T.stories.vote(story.title)}>{story.title}</button>
                {:else}
                  <span class="story-title">{story.title}</span>
                {/if}
              </td>
              <td class="col-estimate">{story.estimate || '-'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="story-actions">
      <button class="btn btn-secondary btn-sm" onclick={copyMarkdown}>{copied ? T.stories.copied : T.stories.copyMd}</button>
      <button class="btn btn-secondary btn-sm" onclick={downloadCsv}>{T.stories.downloadCsv}</button>
      {#if canRun}
        <button class="btn btn-secondary btn-sm" onclick={clear}>{T.stories.clear}</button>
      {/if}
    </div>
  {/if}
  {#if canRun}
    <form class="add-form" onsubmit={add}>
      <label for="stories-input">{T.stories.addLabel}</label>
      <textarea id="stories-input" rows="3" bind:value={text} placeholder={T.stories.addPlaceholder}></textarea>
      <button type="submit" class="btn btn-secondary btn-sm" disabled={!text.trim()}>{T.stories.addBtn}</button>
    </form>
  {/if}
</section>

<style>
  .panel {
    background: var(--color-card); border: 1px solid var(--color-border);
    border-radius: var(--radius-lg); padding: min(1.25rem, 20px);
  }
  .panel h2 { font-size: 1rem; margin-bottom: 0.75rem; }
  .empty { font-size: 0.875rem; color: var(--color-text-muted); }
  .table-wrap { overflow-x: auto; }
  .stories-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .stories-table th, .stories-table td { padding: 0.4rem 0.6rem; text-align: left; border-bottom: 1px solid var(--color-border); overflow-wrap: break-word; }
  .stories-table thead th { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }
  .col-estimate { width: 6rem; font-weight: 700; }
  tr.on-table { background: var(--color-card-selected); }
  tr.on-table .story-title { font-weight: 700; color: var(--color-primary); }
  .story-link {
    background: none; border: none; padding: 0; font: inherit; color: var(--color-text);
    text-align: left; cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
  }
  .story-link:hover { color: var(--color-primary); }
  .story-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
  .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; min-height: 0; }
  .add-form { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 1rem; }
  .add-form label { font-size: 0.85rem; font-weight: 600; }
  .add-form textarea {
    width: 100%; padding: 0.5rem min(0.75rem, 12px); font: inherit; font-size: 0.9rem;
    border: 1px solid var(--color-border); border-radius: var(--radius);
    background: var(--color-bg); color: var(--color-text); resize: vertical;
  }
  .add-form button { align-self: flex-start; }
</style>
