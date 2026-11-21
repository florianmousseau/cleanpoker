<script lang="ts">
  import type { Extras, Translation } from '#lib/i18n.ts';
  import type { Reference, Story } from '#lib/useRoom.svelte.ts';
  import { storiesCsv, storiesMarkdown, withCredit } from '#lib/export.ts';
  import { credit } from '#lib/credit.svelte.ts';
  import { copierTexte } from '#lib/presse-papiers.ts';
  import { isGap, linesOf, measurePayload } from '#lib/mesure-story.ts';

  let { stories, references = [], current, T, X, canRun, onAdd, onClear, onSelect, onMeasure }: {
    stories: Story[];
    references?: Reference[];
    current: number;
    T: Translation;
    X: Extras;
    canRun: boolean;
    onAdd: (text: string) => void;
    onClear: () => void;
    onSelect: (index: number) => void;
    // The "measure" command, ready to send: built here so the room page carries none of it.
    onMeasure: (payload: string) => void;
  } = $props();

  let text = $state('');
  let copied = $state(false);
  const header = $derived([T.stories.colStory, T.stories.colEstimate] as [string, string]);

  // A measure is compared with an estimate: only kept stories can take one.
  const kept = $derived(stories.map((story, index) => ({ story, index })).filter(({ story }) => story.estimate));
  const anyMeasured = $derived(stories.some((s) => s.actual));

  // Read from the form on submit: a bound select or number field would add
  // its Svelte helpers to the runtime every visitor of a room downloads.
  function measure(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const field = (name: string) => Number(new FormData(form).get(name));
    const actual = { files: field('files'), added: field('added'), removed: field('removed') };
    if (actual.added + actual.removed <= 0) return;
    onMeasure(measurePayload(field('story'), actual));
    form.reset();
  }

  function add(e: SubmitEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    text = '';
  }

  function clear() {
    if (window.confirm(X.stories.clearConfirm)) onClear();
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
  <h2 id="stories-title">{X.stories.title}</h2>
  {#if stories.length === 0}
    <p class="empty">{X.stories.none}</p>
  {:else}
    <div class="table-wrap">
      <table class="stories-table">
        <thead>
          <tr>
            <th scope="col">{T.stories.colStory}</th>
            <th scope="col" class="col-estimate">{T.stories.colEstimate}</th>
            {#if anyMeasured}
              <th scope="col" class="col-measure">{X.stories.colLines}</th>
              <th scope="col" class="col-measure">{X.stories.colLooksLike}</th>
            {/if}
          </tr>
        </thead>
        <tbody>
          {#each stories as story, i (i)}
            <tr class:on-table={i === current} aria-current={i === current ? 'true' : undefined}>
              <td>
                {#if canRun && i !== current}
                  <button class="story-link" onclick={() => onSelect(i)} aria-label={X.stories.vote(story.title)}>{story.title}</button>
                {:else}
                  <span class="story-title">{story.title}</span>
                {/if}
              </td>
              <td class="col-estimate">{story.estimate || '-'}</td>
              {#if anyMeasured}
                <td class="col-measure" data-testid="story-lines">{linesOf(story) ?? '-'}</td>
                <td class="col-measure" class:gap={isGap(story)} data-testid="story-looks-like">{story.looksLike || '-'}</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="story-actions">
      <button class="btn btn-secondary btn-sm" onclick={copyMarkdown}>{copied ? T.stories.copied : X.stories.copyMd}</button>
      <button class="btn btn-secondary btn-sm" onclick={downloadCsv}>{X.stories.downloadCsv}</button>
      {#if canRun}
        <button class="btn btn-secondary btn-sm" onclick={clear}>{X.stories.clear}</button>
      {/if}
    </div>
  {/if}
  {#if references.length > 0}
    <h3 class="references-title">{X.stories.references}</h3>
    <ul class="references" data-testid="references">
      {#each references as reference (reference.card)}
        <li><strong>{reference.card}</strong> {reference.title}</li>
      {/each}
    </ul>
  {/if}
  {#if canRun && kept.length > 0}
    <details class="measure">
      <summary>{X.stories.measureTitle}</summary>
      <form class="measure-form" onsubmit={measure} data-testid="measure-form">
        <label>{X.stories.measureStory}
          <select name="story" required>
            <option value=""></option>
            {#each kept as { story, index } (index)}
              <option value={index}>{story.title}</option>
            {/each}
          </select>
        </label>
        <label>{X.stories.measureFiles}
          <input type="number" name="files" min="0" max="1000000" step="1" value="0" required />
        </label>
        <label>{X.stories.measureAdded}
          <input type="number" name="added" min="0" max="1000000" step="1" value="0" required />
        </label>
        <label>{X.stories.measureRemoved}
          <input type="number" name="removed" min="0" max="1000000" step="1" value="0" required />
        </label>
        <button type="submit" class="btn btn-secondary btn-sm">{X.stories.measureBtn}</button>
      </form>
    </details>
  {/if}
  {#if canRun}
    <form class="add-form" onsubmit={add}>
      <label for="stories-input">{X.stories.addLabel}</label>
      <textarea id="stories-input" rows="3" bind:value={text} placeholder={X.stories.addPlaceholder}></textarea>
      <button type="submit" class="btn btn-secondary btn-sm" disabled={!text.trim()}>{X.stories.addBtn}</button>
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
  .col-measure { width: 4.5rem; font-weight: 700; }
  td.gap { color: var(--color-primary); }
  .references-title { font-size: 0.85rem; margin-top: 1rem; }
  .references { list-style: none; padding: 0; margin: 0.4rem 0 0; font-size: 0.875rem; }
  .references li { padding: 0.2rem 0; overflow-wrap: break-word; }
  .references strong { display: inline-block; min-width: 2em; }
  .measure { margin-top: 1rem; font-size: 0.85rem; }
  .measure summary { cursor: pointer; font-weight: 600; }
  .measure-form { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.6rem; }
  .measure-form label { display: flex; flex-direction: column; gap: 0.2rem; font-weight: 600; }
  .measure-form select, .measure-form input {
    width: 100%; padding: 0.4rem min(0.6rem, 10px); font: inherit;
    border: 1px solid var(--color-border); border-radius: var(--radius);
    background: var(--color-bg); color: var(--color-text);
  }
  .measure-form button { align-self: flex-start; }
</style>
