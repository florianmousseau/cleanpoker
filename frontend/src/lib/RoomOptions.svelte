<script lang="ts">
  import { PUBLIC_API_URL } from '$app/env/public';
  import { translateActivity, type Translation } from '#lib/i18n.ts';
  import type { RoomState, Story, useRoom } from '#lib/useRoom.svelte.ts';
  import QrCode from '#lib/QrCode.svelte';
  import StoriesPanel from '#lib/StoriesPanel.svelte';
  import { copierTexte } from '#lib/presse-papiers.ts';
  import { logTime } from '#lib/log-time.ts';
  import { mcpUrl, roomUrl } from '#lib/invite-ai.ts';

  // Everything beyond voting. The room fetches this file when the options
  // are first opened, so nothing here weighs on someone who only votes.
  let { room, roomState, roomId, T, canRun, isHost, stories, current }: {
    room: ReturnType<typeof useRoom>;
    roomState: RoomState;
    roomId: string;
    T: Translation;
    canRun: boolean;
    isHost: boolean;
    stories: Story[];
    current: number;
  } = $props();

  const TIMER_CHOICES = [30, 60, 120, 300];
  let aiFeedback = $state('');
  let aiError = $state('');

  async function copyAiPrompt() {
    if (await copierTexte(T.ia.prompt(roomUrl(window.location), mcpUrl(PUBLIC_API_URL)))) {
      aiError = '';
      aiFeedback = T.copied;
      setTimeout(() => (aiFeedback = ''), 2000);
      return;
    }
    aiFeedback = '';
    aiError = T.copyFailed;
  }
</script>

<div class="options-body">
  {#if canRun && roomState.state === 'voting'}
    <div class="timer-row" role="group" aria-label={T.host.timer}>
      <span class="timer-label">{T.host.timer}</span>
      {#each TIMER_CHOICES as seconds (seconds)}
        <button class="btn btn-secondary btn-sm" onclick={() => room.startTimer(seconds)}>{T.host.seconds(seconds)}</button>
      {/each}
      {#if roomState.timerEnd}
        <button class="btn btn-secondary btn-sm" onclick={() => room.startTimer(0)}>{T.host.timerStop}</button>
      {/if}
    </div>
  {/if}
  {#if canRun}
    <label class="auto-reveal">
      <input type="checkbox" checked={roomState.autoReveal ?? false}
        onchange={(e) => room.setAutoReveal(e.currentTarget.checked)} data-testid="auto-reveal" />
      <span>{T.controls.autoReveal}</span>
    </label>
  {/if}
  {#if isHost}
    <button class="btn btn-secondary btn-sm lock-btn" onclick={() => room.setLocked(!roomState.locked)}
      aria-pressed={roomState.locked} data-testid="lock-btn">
      {roomState.locked ? T.host.unlock : T.host.lock}
    </button>
  {/if}
  <QrCode {roomId} {T} />
  <div class="invite-ai">
  <button class="btn btn-secondary btn-sm" onclick={copyAiPrompt} data-testid="invite-ai">{aiFeedback || T.ia.invite}</button>
  <span class="hint">{T.ia.inviteHelp}</span>
  {#if aiError}
    <span class="copy-error" role="alert">{aiError}</span>
  {/if}
  </div>
  {#if stories.length === 0}
  <StoriesPanel {stories} {current} {T} {canRun}
  onAdd={(text) => room.addStories(text)}
  onClear={() => room.clearStories()}
  onSelect={(i) => room.selectStory(i)} />
  {/if}
  <section class="panel" aria-labelledby="log-title">
    <h2 id="log-title">{T.activity.title}</h2>
    {#if roomState.activity.length === 0}
    <p class="empty">{T.activity.none}</p>
    {:else}
    <div class="table-wrap">
      <table class="log-table" aria-label={T.activity.title}>
        <thead>
          <tr>
            <th scope="col">{T.activity.colTime}</th>
            <th scope="col">{T.activity.colAuthor}</th>
            <th scope="col">{T.activity.colAction}</th>
          </tr>
        </thead>
        <tbody>
          <!-- Keyed by position, never by content: timestamps are cut to
               the second, so two identical events in the same second
               (a double-clicked "new round", a vote changed twice) used
               to collide and throw each_key_duplicate, poisoning the room
               for every player who arrived afterwards. -->
          {#each [...roomState.activity].reverse() as entry, i (i)}
            <tr>
              <td class="log-time">{logTime(entry.timestamp)}</td>
              <td>{entry.initiator}</td>
              <td>{translateActivity(entry.message, entry.target ?? '', T)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {/if}
  </section>
</div>

<style>
  .options-body { display: flex; flex-direction: column; gap: 0.875rem; margin-top: 0.875rem; }
  .timer-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; align-self: flex-start; }
  .timer-label { font-size: 0.8rem; color: var(--color-text-muted); margin-right: 0.25rem; }
  .lock-btn { align-self: flex-start; }
  .auto-reveal { display: flex; align-items: center; gap: 0.5rem; align-self: flex-start; font-size: 0.85rem; cursor: pointer; }
  .auto-reveal input { accent-color: var(--color-primary); }
  .invite-ai { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 0.625rem; }
  .hint { font-size: 0.8rem; color: var(--color-text-muted); }
  .copy-error { flex-basis: 100%; font-size: 0.8125rem; color: var(--color-danger); }
  .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; min-height: 0; }

  .panel {
    background: var(--color-card); border: 1px solid var(--color-border);
    border-radius: var(--radius-lg); padding: min(1.25rem, 20px);
  }
  .panel h2 { font-size: 1rem; margin-bottom: 0.75rem; }
  .empty { font-size: 0.875rem; color: var(--color-text-muted); }
  .table-wrap { overflow-x: auto; }
  .log-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .log-table th, .log-table td {
    padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border);
  }
  .log-table thead th { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }
  .log-table tbody tr:nth-child(even) { background: var(--color-surface); }
  .log-table tbody tr:last-child td { border-bottom: none; }
  .log-time { font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-muted); }
  .table-wrap .log-time { white-space: nowrap; }
</style>
