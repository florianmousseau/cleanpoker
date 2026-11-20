<script lang="ts">
  import { PUBLIC_API_URL } from '$app/env/public';
  import type { Translation } from '#lib/i18n.ts';
  import { cheminQr } from '#lib/qr.ts';

  let { roomId, T }: { roomId: string; T: Translation } = $props();

  let open = $state(false);
  let rows = $state<string[] | null>(null);
  let failed = $state(false);

  // The server encodes, the page draws: no image from another origin.
  async function toggle() {
    open = !open;
    if (!open || rows) return;
    failed = false;
    try {
      const url = `${window.location.origin}/${roomId}`;
      const res = await fetch(`${PUBLIC_API_URL}/qr?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error(String(res.status));
      rows = (await res.json()).rows;
    } catch {
      failed = true;
    }
  }
</script>

<button class="btn btn-secondary btn-sm" onclick={toggle} aria-expanded={open} data-testid="qr-btn">{open ? T.qr.hide : T.qr.show}</button>
{#if open}
  <div class="qr-box" data-testid="qr">
    {#if rows}
      <svg viewBox="-4 -4 {rows.length + 8} {rows.length + 8}" width="200" height="200" role="img" aria-label={T.qr.alt}>
        <rect x="-4" y="-4" width={rows.length + 8} height={rows.length + 8} fill="#fff" />
        <path d={cheminQr(rows)} fill="#000" shape-rendering="crispEdges" />
      </svg>
    {:else if failed}
      <p role="alert">{T.qr.failed}</p>
    {/if}
  </div>
{/if}

<style>
  .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; min-height: 0; }
  .qr-box { flex-basis: 100%; display: flex; justify-content: flex-end; }
  .qr-box svg { display: block; max-width: 100%; height: auto; }
  .qr-box p { font-size: 0.8125rem; color: var(--color-danger); }
</style>
