<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import type { Cell, Matrix } from '#lib/raci.ts';
  import {
    MAX_NAME,
    MAX_ROLES,
    MAX_TASKS,
    addRole,
    addTask,
    blankMatrix,
    cellForKey,
    checkMatrix,
    cloneMatrix,
    decodeMatrix,
    encodeMatrix,
    matrixCsv,
    matrixMarkdown,
    nextCell,
    removeRole,
    removeTask,
    shown,
  } from '#lib/raci.ts';
  import { RACI_WORDS } from '#lib/raci-words.ts';

  let { lang, initial }: { lang: 'fr' | 'en'; initial: Matrix } = $props();

  const W = untrack(() => RACI_WORDS[lang]);
  const start = untrack(() => encodeMatrix(initial));

  let m = $state(untrack(() => cloneMatrix(initial)));
  let notice = $state('');
  let section: HTMLElement;
  let heading: HTMLElement;

  const taskLabel = (index: number) => m.tasks[index].trim() || `${W.task} ${index + 1}`;
  const roleLabel = (index: number) => m.roles[index].trim() || `${W.role} ${index + 1}`;

  const link = $derived(encodeMatrix(m));
  const findings = $derived(
    checkMatrix(m).map((found) => W.finding(found, found.kind === 'emptyRole' ? roleLabel(found.role) : taskLabel(found.task))),
  );

  /** Loads a matrix from outside: an example of the page that carries the generator. */
  export function load(next: Matrix) {
    m = cloneMatrix(next);
    notice = '';
    section.scrollIntoView();
    heading.focus({ preventScroll: true });
  }

  // The link is a fragment: a browser never sends it with a request.
  onMount(() => {
    const read = () => {
      const found = decodeMatrix(location.hash);
      if (found) m = found;
    };
    read();
    addEventListener('hashchange', read);
    return () => removeEventListener('hashchange', read);
  });

  $effect(() => {
    const wanted = link ?? '';
    const untouched = wanted === start && location.hash === '';
    if (untouched || wanted === location.hash) return;
    history.replaceState(history.state, '', wanted || location.pathname + location.search);
  });

  const oneLine = (value: string) => value.replaceAll('\r', ' ').replaceAll('\n', ' ').slice(0, MAX_NAME);

  function onCellKey(event: KeyboardEvent, task: number, role: number) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const set = cellForKey(event.key);
    if (set !== null) {
      event.preventDefault();
      m.cells[task][role] = set;
      return;
    }
    const moves: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const move = moves[event.key];
    if (!move) return;
    const target = section.querySelector<HTMLElement>(`[data-cell="${task + move[0]}-${role + move[1]}"]`);
    if (!target) return;
    event.preventDefault();
    target.focus();
  }

  function say(text: string) {
    notice = text;
    setTimeout(() => {
      if (notice === text) notice = '';
    }, 4000);
  }

  // No shared clipboard helper: a module shared with the room is one more file on its first visit.
  async function copy(text: string) {
    let done = false;
    try {
      await navigator.clipboard.writeText(text);
      done = true;
    } catch {
      // No permission, an insecure context, a webview: the sentence below says so.
    }
    say(done ? W.copied : W.refused);
  }

  // Built on click, in the page: the matrix never leaves the browser.
  function downloadCsv() {
    const blob = new Blob([matrixCsv(m, W.corner, W.separator)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = W.fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function clear() {
    const four = [1, 2, 3, 4];
    m = blankMatrix(m.title, four.map((i) => `${W.task} ${i}`), four.map((i) => `${W.role} ${i}`));
  }

  const cellClass = (cell: Cell) => (cell === '' ? 'cell' : `cell on ${cell === 'AR' ? 'A' : cell}`);
</script>

<section class="raci" id="generator" bind:this={section} aria-labelledby="raci-heading">
  <h2 id="raci-heading" tabindex="-1" bind:this={heading}>{W.heading}</h2>

  <p class="field no-print">
    <label for="raci-title">{W.titleLabel}</label>
    <input id="raci-title" type="text" maxlength={MAX_NAME} value={m.title} oninput={(e) => (m.title = oneLine(e.currentTarget.value))} />
  </p>
  <p class="print-title">{m.title}</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th scope="col" class="corner">{W.corner}</th>
          {#each m.roles as name, r (r)}
            <th scope="col">
              <span class="name">
                <textarea rows="2" maxlength={MAX_NAME} aria-label={W.roleName(r + 1)} value={name} oninput={(e) => (m.roles[r] = oneLine(e.currentTarget.value))}></textarea>
                <button type="button" class="remove no-print" aria-label={W.removeRole(roleLabel(r))} disabled={m.roles.length <= 1} onclick={() => removeRole(m, r)}>&times;</button>
              </span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each m.tasks as name, t (t)}
          <tr>
            <th scope="row">
              <span class="name">
                <textarea rows="2" maxlength={MAX_NAME} aria-label={W.taskName(t + 1)} value={name} oninput={(e) => (m.tasks[t] = oneLine(e.currentTarget.value))}></textarea>
                <button type="button" class="remove no-print" aria-label={W.removeTask(taskLabel(t))} disabled={m.tasks.length <= 1} onclick={() => removeTask(m, t)}>&times;</button>
              </span>
            </th>
            {#each m.cells[t] as cell, r (r)}
              <td>
                <button
                  type="button"
                  class={cellClass(cell)}
                  data-cell="{t}-{r}"
                  aria-label={W.cell(taskLabel(t), roleLabel(r), W.states[cell])}
                  onclick={() => (m.cells[t][r] = nextCell(cell))}
                  onkeydown={(e) => onCellKey(e, t, r)}
                  onfocus={(e) => e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
                >{shown(cell)}</button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <p class="actions no-print">
    <button type="button" class="btn btn-secondary" disabled={m.tasks.length >= MAX_TASKS} onclick={() => addTask(m, `${W.task} ${m.tasks.length + 1}`)}>{W.addTask}</button>
    <button type="button" class="btn btn-secondary" disabled={m.roles.length >= MAX_ROLES} onclick={() => addRole(m, `${W.role} ${m.roles.length + 1}`)}>{W.addRole}</button>
    <button type="button" class="btn btn-secondary" onclick={clear}>{W.clear}</button>
  </p>
  <p class="help no-print">{W.help}</p>

  <div class="checks no-print" aria-live="polite">
    <h3>{W.checks}</h3>
    {#if findings.length === 0}
      <p class="ok">{W.clean}</p>
    {:else}
      <ul>
        {#each findings as sentence, i (i)}
          <li>{sentence}</li>
        {/each}
      </ul>
    {/if}
  </div>

  <p class="actions no-print">
    <button type="button" class="btn btn-secondary" onclick={() => copy(matrixMarkdown(m, W.corner))}>{W.copyMarkdown}</button>
    <button type="button" class="btn btn-secondary" onclick={downloadCsv}>{W.downloadCsv}</button>
    <button type="button" class="btn btn-secondary" onclick={() => print()}>{W.print}</button>
    <button type="button" class="btn btn-secondary" disabled={link === null} onclick={() => copy(location.origin + location.pathname + (link ?? ''))}>{W.copyLink}</button>
  </p>
  <p class="notice no-print" aria-live="polite">{notice}</p>
  <p class="privacy no-print">{W.privacy}</p>
  <p class="privacy no-print" aria-live="polite">{link === null ? W.tooLong : ''}</p>
</section>

<style>
  .raci {
    margin-top: 2rem;
    scroll-margin-top: 1rem;
  }

  h2 { margin-bottom: 0.75rem; }
  h2:focus { outline: none; }
  h3 { font-size: 1rem; margin-bottom: 0.25rem; }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }

  .field input {
    font: inherit;
    width: 100%;
    max-width: 28rem;
    padding: 0.4rem 0.5rem;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1px solid var(--color-text-muted);
    border-radius: var(--radius);
  }

  .print-title { display: none; }

  /* A cell focused with the arrow keys scrolls clear of the sticky task column. */
  .table-wrap {
    overflow-x: auto;
    scroll-padding-left: min(9.5rem, 40vw);
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.3rem;
    border-bottom: 1px solid var(--color-border);
    text-align: center;
    vertical-align: middle;
  }

  thead th {
    background: var(--color-surface);
    vertical-align: bottom;
  }

  /* The task names stay in view while the roles scroll under them. */
  th[scope='row'], .corner {
    position: sticky;
    left: 0;
    z-index: 1;
    width: min(9.5rem, 40vw);
    min-width: min(9.5rem, 40vw);
    text-align: left;
    background: var(--color-bg);
    border-right: 1px solid var(--color-border);
  }

  .corner {
    background: var(--color-surface);
    padding: 0.5rem;
  }

  thead th:not(.corner) { min-width: min(6.5rem, 32vw); }

  /* A role name gets the whole width of its column: its remove button sits under it. */
  thead .name {
    flex-direction: column;
    align-items: center;
  }

  .name {
    display: flex;
    align-items: flex-start;
    gap: 2px;
  }

  textarea {
    flex: 1;
    min-width: 0;
    width: 100%;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.3;
    padding: 0.25rem 0.3rem;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1px solid var(--color-text-muted);
    border-radius: 4px;
    resize: none;
    /* Where the browser knows how, the box grows with the name instead of scrolling it. */
    field-sizing: content;
    min-height: 2.9em;
  }

  .remove {
    flex: none;
    width: 1.75rem;
    height: 1.75rem;
    font: inherit;
    line-height: 1;
    color: var(--color-text);
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
  }

  .remove:hover:not(:disabled) { border-color: var(--color-text-muted); }
  .remove:disabled { opacity: 0.4; cursor: not-allowed; }

  .cell {
    width: 100%;
    min-width: 2.75rem;
    height: 2.75rem;
    font: inherit;
    font-weight: 700;
    font-size: 1rem;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1px solid var(--color-text-muted);
    border-radius: 4px;
    cursor: pointer;
  }

  /*
   * Two rings, drawn inside the box so the scrolling table never clips them:
   * one in the text colour, one in the page colour. Whatever the cell is
   * filled with, one of the two stands out against it.
   */
  .cell:focus-visible, textarea:focus-visible, .remove:focus-visible {
    outline: 3px solid var(--color-text);
    outline-offset: -3px;
    box-shadow: inset 0 0 0 6px var(--color-bg);
  }

  .field input:focus-visible {
    outline: 3px solid var(--color-text);
    outline-offset: 2px;
  }

  /* The letter says the role; the fill only helps the eye find a column of A. */
  .cell.R { background: var(--color-primary); color: var(--color-primary-text); border-color: var(--color-primary); }
  .cell.A { background: var(--color-text); color: var(--color-bg); border-color: var(--color-text); }
  .cell.C { background: var(--color-surface); border-width: 2px; }
  .cell.I { border-style: dashed; border-width: 2px; }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .help, .privacy, .notice {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .notice { min-height: 1.4rem; }

  .checks {
    margin-top: 1rem;
    padding: 0.75rem min(1rem, 16px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  .checks ul {
    padding-left: min(1.25rem, 20px);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .ok { font-weight: 600; }

  /* On paper: the title and the grid, in black on white whatever the theme. */
  @media print {
    :global(main:has(> .raci) > :not(.raci)),
    :global(.page:has(.raci) > .footer),
    .no-print {
      display: none !important;
    }

    .raci {
      --color-text: #000;
      --color-bg: #fff;
      --color-surface: #fff;
      --color-border: #000;
      --color-text-muted: #000;
      margin: 0;
      color: #000;
    }

    h2 { display: none; }

    .print-title {
      display: block;
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .table-wrap { overflow: visible; }
    th[scope='row'], .corner { position: static; }
    th, td { border: 1px solid #000; }
    textarea { border: none; }

    .cell, .cell.on {
      color: #000;
      background: #fff;
      border: none;
    }
  }
</style>
