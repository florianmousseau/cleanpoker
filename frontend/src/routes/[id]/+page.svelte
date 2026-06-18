<script lang="ts">
  import { page } from '$app/state';
  import { PUBLIC_WS_URL } from '$env/static/public';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { lang } from '$lib/lang.svelte';
  import { FR, EN, ES, DE, PT, translateActivity } from '$lib/i18n';

  type Player = { id: string; name: string; vote: string; observer: boolean };
  type Results = { avg: string; min: string; max: string; dist: Record<string, number> };
  type ActivityEntry = { timestamp: string; initiator: string; message: string; target?: string };
  type RoomState = {
    id: string; cards: string[];
    state: 'voting' | 'revealed'; round: number;
    results: Results | null; players: Player[]; activity: ActivityEntry[];
  };

  const roomId = $derived(page.params.id);
  const T = $derived(
    lang.current === 'fr' ? FR :
    lang.current === 'es' ? ES :
    lang.current === 'de' ? DE :
    lang.current === 'pt' ? PT :
    EN
  );

  let roomState = $state<RoomState | null>(null);
  let myId = $state('');
  let myName = $state('');
  let nameInput = $state('');
  let nameInputEl = $state<HTMLInputElement | null>(null);

  onMount(() => nameInputEl?.focus());
  let isObserver = $state(false);
  let joined = $state(false);
  let ws = $state<WebSocket | null>(null);
  let liveAnnouncement = $state('');
  let copyFeedback = $state('');
  let isReconnecting = $state(false);
  let kicked = $state(false);
  let myVote = $state('');
  let reconnectDelay = 1000;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let destroying = false;

  function connect(name: string, observer: boolean) {
    if (!browser) return;
    const url = `${PUBLIC_WS_URL}/rooms/${roomId}/ws?name=${encodeURIComponent(name)}&observer=${observer}`;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      isReconnecting = false;
      reconnectDelay = 1000;
      myVote = '';
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'welcome') {
        myId = msg.payload.id;
      } else if (msg.type === 'kicked') {
        kicked = true;
        socket.close();
      } else if (msg.type === 'state') {
        const prev = roomState;
        roomState = msg.payload;
        if (prev?.state === 'revealed' && roomState?.state === 'voting') {
          myVote = '';
          liveAnnouncement = T.live.newRound(roomState?.round ?? 0);
        } else if (prev?.state === 'voting' && roomState?.state === 'revealed') {
          liveAnnouncement = T.live.revealed;
        }
      }
    };

    socket.onerror = () => {};

    socket.onclose = () => {
      if (destroying || kicked || !joined) return;
      isReconnecting = true;
      reconnectTimer = setTimeout(() => {
        reconnectDelay = Math.min(reconnectDelay * 2, 30000);
        connect(name, observer);
      }, reconnectDelay);
    };

    ws = socket;
  }

  function send(type: string, payload: string = '') {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, payload }));
    }
  }

  function join() {
    if (!nameInput.trim()) return;
    myName = nameInput.trim();
    joined = true;
    connect(myName, isObserver);
  }

  function castVote(card: string) {
    const newVote = myVote === card ? '' : card;
    myVote = newVote;
    send('vote', newVote);
  }

  function show() { send('show'); }
  function clear() { myVote = ''; send('clear'); }
  function kick(targetId: string) { send('kick', targetId); }
  function toggleObserver(targetId: string) { send('toggleObserver', targetId); }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    copyFeedback = T.copied;
    setTimeout(() => (copyFeedback = ''), 2000);
  }

  const participants = $derived(roomState?.players.filter(p => !p.observer) ?? []);
  const observers = $derived(roomState?.players.filter(p => p.observer) ?? []);
  const allVoted = $derived(participants.length > 0 && participants.every(p => p.vote !== ''));
  const me = $derived(roomState?.players.find(p => p.id === myId));
  const isSolo = $derived(roomState !== null && roomState.players.length === 1);

  onDestroy(() => {
    destroying = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    ws?.close();
  });
</script>

<svelte:head>
  <title>{T.salleLabel} {roomId} | CleanPoker</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div aria-live="polite" aria-atomic="true" class="sr-only">{liveAnnouncement}</div>

<div class="page">
  <header class="header">
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="CleanPoker, accueil">♠ CleanPoker</a>
      <div class="room-meta">
        <span class="badge-pill">{T.salleLabel} <code>{roomId}</code></span>
        {#if roomState}
          <span class="badge-pill">{T.tourLabel} {roomState.round}</span>
        {/if}
        <button class="btn btn-secondary btn-sm" onclick={copyLink}>{copyFeedback || T.copyLink}</button>
        <select class="lang-select" value={lang.current} onchange={(e) => lang.set(e.currentTarget.value as 'fr'|'en'|'es'|'de'|'pt')} aria-label="Language">
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="de">DE</option>
          <option value="pt">PT</option>
        </select>
      </div>
    </div>
  </header>

  <main id="main" class="container main">

    {#if kicked}
      <div class="center-msg">
        <h1>{T.kicked.title}</h1>
        <a href="/" class="btn btn-primary">{T.kicked.back}</a>
      </div>

    {:else if !joined}
      <section class="join-form" aria-labelledby="join-title">
        <h1 id="join-title">{T.join.title}</h1>
        <form onsubmit={(e) => { e.preventDefault(); join(); }}>
          <label for="name-input">{T.join.label}</label>
          <!-- svelte-ignore a11y_autofocus -->
          <input id="name-input" type="text" bind:value={nameInput} bind:this={nameInputEl} maxlength="30"
            autocomplete="off" placeholder="ex. Amandine" required
            autofocus
            onfocus={(e) => e.currentTarget.select()} />
          <label class="toggle-label">
            <input type="checkbox" bind:checked={isObserver} />
            <span>{T.join.observer}</span>
          </label>
          <button type="submit" class="btn btn-primary" disabled={!nameInput.trim()}>
            {T.join.btn}
          </button>
        </form>
      </section>

    {:else if !roomState}
      <p aria-live="polite">{isReconnecting ? T.connection.reconnecting : T.connection.connecting}</p>

    {:else}
      <h1 class="sr-only">{T.salleLabel} {roomId}</h1>

      {#if isReconnecting}
        <div class="reconnecting-banner" role="status">{T.connection.reconnecting}</div>
      {/if}

      {#if isSolo}
        <div class="solo-hint" role="status">
          <span>{T.solo.hint}</span>
          <button class="btn btn-secondary btn-sm" onclick={copyLink}>
            {copyFeedback || T.solo.invite}
          </button>
        </div>
      {/if}

      <!-- Cartes -->
      {#if !me?.observer}
        <section class="card-section" aria-labelledby="cards-title">
          <div class="card-header-row">
            <h2 id="cards-title">{T.cards.title}</h2>
            <p class="card-subtitle">
              {#if roomState.state === 'revealed'}
                {T.cards.revealedSub}
              {:else}
                {T.cards.votingHint}{myVote ? T.cards.selectedSuffix(myVote) : ''}.
              {/if}
            </p>
          </div>
          <ul class="cards-list" role="list" aria-label={T.cards.title}>
            {#each roomState.cards as card}
              <li>
                <button
                  class="poker-card"
                  class:selected={myVote === card}
                  onclick={() => castVote(card)}
                  aria-pressed={myVote === card}
                  aria-label={T.cards.voteLabel(card)}
                  disabled={roomState.state === 'revealed'}
                >
                  {card}
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      <!-- Contrôles + Résultats -->
      <div class="controls-results-row">
        <section class="panel" aria-labelledby="controls-title">
          <h2 id="controls-title">{T.controls.title}</h2>
          <div class="controls-btns">
            <button class="btn btn-secondary btn-block" onclick={clear}>
              {roomState.state === 'revealed' ? T.controls.newRound : T.controls.clear}
            </button>
            <button class="btn btn-primary btn-block" onclick={show} disabled={!allVoted || roomState.state === 'revealed'}
              aria-describedby={!allVoted ? 'show-hint' : undefined}>
              {T.controls.reveal}
            </button>
          </div>
          {#if !allVoted && roomState.state === 'voting' && participants.length > 0}
            <p id="show-hint" class="hint">
              {T.controls.pending(participants.filter(p => p.vote === '').length)}
            </p>
          {/if}
        </section>

        <section class="panel" aria-labelledby="results-title">
          <h2 id="results-title">{T.results.title}</h2>
          {#if roomState.results}
            {#if roomState.results.avg !== '—'}
              <div class="stats-grid">
                <div class="stat"><span class="stat-label">{T.results.avg}</span><span class="stat-value">{roomState.results.avg}</span></div>
                <div class="stat"><span class="stat-label">{T.results.min}</span><span class="stat-value">{roomState.results.min}</span></div>
                <div class="stat"><span class="stat-label">{T.results.max}</span><span class="stat-value">{roomState.results.max}</span></div>
              </div>
            {/if}
            <div class="dist">
              {#each Object.entries(roomState.results.dist).sort((a,b) => b[1]-a[1]) as [val, count]}
                <div class="dist-row">
                  <span class="dist-val">{val}</span>
                  <div class="dist-bar-wrap">
                    <div class="dist-bar" style="width:{Math.round((count/participants.length)*100)}%"></div>
                  </div>
                  <span class="dist-count">{count}</span>
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-results">{T.results.none}</p>
          {/if}
        </section>
      </div>

      <!-- Participants -->
      <section class="panel" aria-labelledby="participants-title">
        <h2 id="participants-title">{T.participants.title}</h2>
        {#if participants.length === 0}
          <p class="empty">{T.participants.none}</p>
        {:else}
          <div class="table-wrap">
            <table class="participants-table" aria-label={T.participants.title}>
              <thead>
                <tr>
                  <th scope="col" class="col-status"><span class="sr-only">{T.participants.colStatus}</span></th>
                  <th scope="col">{T.participants.colName}</th>
                  <th scope="col" class="col-vote">{T.participants.colVote}</th>
                  <th scope="col" class="col-action">{T.participants.colRole}</th>
                  <th scope="col" class="col-action">{T.participants.colAction}</th>
                </tr>
              </thead>
              <tbody>
                {#each participants as player (player.id)}
                  <tr class:voted={player.vote !== ''} class:is-me={player.id === myId}>
                    <td class="voted-icon" aria-hidden="true">{#if player.vote !== ''}✓{/if}</td>
                    <td class="player-name-cell">
                      {player.name}
                      {#if player.id === myId}<span class="me-tag">{T.participants.me}</span>{/if}
                      {#if player.vote !== ''}<span class="sr-only">{T.participants.votedSr}</span>{/if}
                    </td>
                    <td class="vote-cell">
                      {#if roomState.state === 'revealed'}
                        <span class="vote-revealed">{player.vote || '-'}</span>
                      {:else if player.vote === 'hidden'}
                        <span class="vote-pending">{T.participants.votePending}</span>
                      {:else}
                        <span class="vote-empty">·</span>
                      {/if}
                    </td>
                    <td class="col-action">
                      <button class="action-btn action-btn-switch"
                        onclick={() => toggleObserver(player.id)}
                        aria-label={T.participants.toObserverLabel(player.name)}>
                        {T.participants.toObserver}
                      </button>
                    </td>
                    <td class="col-action">
                      <button class="action-btn action-btn-kick"
                        onclick={() => kick(player.id)}
                        aria-label={T.participants.kickLabel(player.name)}>
                        {T.participants.kick}
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </section>

      <!-- Observateurs -->
      {#if observers.length > 0}
        <section class="panel" aria-labelledby="observers-title">
          <h2 id="observers-title">{T.observers.title}</h2>
          <div class="table-wrap">
            <table class="participants-table" aria-label={T.observers.title}>
              <thead>
                <tr>
                  <th scope="col">{T.participants.colName}</th>
                  <th scope="col" class="col-action">{T.participants.colRole}</th>
                  <th scope="col" class="col-action">{T.participants.colAction}</th>
                </tr>
              </thead>
              <tbody>
                {#each observers as player (player.id)}
                  <tr class:is-me={player.id === myId}>
                    <td class="player-name-cell">
                      {player.name}
                      {#if player.id === myId}<span class="me-tag">{T.participants.me}</span>{/if}
                    </td>
                    <td class="col-action">
                      <button class="action-btn action-btn-switch"
                        onclick={() => toggleObserver(player.id)}
                        aria-label={T.observers.toParticipantLabel(player.name)}>
                        {T.observers.toParticipant}
                      </button>
                    </td>
                    <td class="col-action">
                      <button class="action-btn action-btn-kick"
                        onclick={() => kick(player.id)}
                        aria-label={T.participants.kickLabel(player.name)}>
                        {T.participants.kick}
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      <!-- Journal d'activité -->
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
                {#each [...roomState.activity].reverse() as entry}
                  <tr>
                    <td class="log-time">{entry.timestamp}</td>
                    <td>{entry.initiator}</td>
                    <td>{translateActivity(entry.message, entry.target ?? '', T)}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </section>
    {/if}
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/cleanpoker" rel="noopener noreferrer">{T.footer.source}</a>
      · <a href="https://github.com/florianmousseau/cleanpoker/blob/main/LICENSE" rel="noopener noreferrer">{T.footer.license}</a>
    </p>
  </footer>
</div>

<style>
  .page { display: flex; flex-direction: column; min-height: 100dvh; }

  .header { padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
  .logo { font-size: 1.125rem; font-weight: 700; text-decoration: none; color: var(--color-text); }
  .room-meta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  .badge-pill {
    font-size: 0.78rem; padding: 0.2rem 0.6rem;
    background: var(--color-surface); border: 1px solid var(--color-border);
    border-radius: 99px; color: var(--color-text-muted);
  }
  .badge-pill code { font-family: var(--font-mono); }
  .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; min-height: 0; }
  .lang-select {
    font-size: 0.8rem; font-weight: 700; font-family: inherit;
    padding: 0.25rem 0.5rem; border: 1px solid var(--color-border);
    border-radius: 99px; background: transparent; color: var(--color-text-muted);
    cursor: pointer; appearance: none; min-width: 3.5rem; text-align: center;
  }
  .lang-select:hover { border-color: var(--color-primary); color: var(--color-primary); }

  .main { flex: 1; padding-top: 1.5rem; padding-bottom: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }

  .panel {
    background: var(--color-card); border: 1px solid var(--color-border);
    border-radius: var(--radius-lg); padding: 1.25rem;
  }
  .panel h2 { font-size: 1rem; margin-bottom: 0.75rem; }
  .empty { font-size: 0.875rem; color: var(--color-text-muted); }

  .reconnecting-banner {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: 1rem;
  }

  .solo-hint {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--color-card-selected);
    border: 1px solid var(--color-card-border-selected);
    border-radius: var(--radius-lg);
    font-size: 0.875rem; color: var(--color-primary);
  }

  .error-state { display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; padding: 2rem 0; }
  .error { color: var(--color-danger); font-weight: 600; }

  .join-form { max-width: 24rem; margin: 4rem auto; display: flex; flex-direction: column; gap: 1rem; }
  .join-form form { display: flex; flex-direction: column; gap: 0.75rem; }
  .join-form label { font-weight: 600; }
  .join-form input[type="text"] {
    width: 100%; padding: 0.625rem 0.875rem; font-size: 1rem; font-family: inherit;
    border: 1px solid var(--color-border); border-radius: var(--radius);
    background: var(--color-bg); color: var(--color-text);
  }
  .join-form input[type="text"]:focus { outline: 3px solid var(--color-primary); outline-offset: 2px; }
  .toggle-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: 500; }
  .toggle-label input { accent-color: var(--color-primary); }

  .card-section { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; }
  .card-header-row { margin-bottom: 0.875rem; }
  .card-header-row h2 { font-size: 1rem; margin-bottom: 0.25rem; }
  .card-subtitle { font-size: 0.8rem; color: var(--color-text-muted); }
  .cards-list { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; }
  .poker-card {
    width: 3.5rem; height: 5rem;
    font-size: 1.25rem; font-weight: 700; font-family: inherit;
    background: var(--color-bg); border: 2px solid var(--color-border);
    border-radius: var(--radius); cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow);
  }
  .poker-card:hover:not(:disabled) { border-color: var(--color-primary); transform: translateY(-3px); }
  .poker-card.selected { background: var(--color-card-selected); border-color: var(--color-card-border-selected); transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .poker-card:disabled { opacity: 0.5; cursor: default; transform: none; }

  .controls-results-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  @media (max-width: 42rem) { .controls-results-row { grid-template-columns: 1fr; } }

  .controls-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; margin-bottom: 0.5rem; }
  .btn-block { width: 100%; justify-content: center; }
  .hint { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem; }

  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.625rem; margin-bottom: 1rem; }
  .stat { display: flex; flex-direction: column; align-items: center; gap: 0.125rem; padding: 0.625rem; background: var(--color-surface); border-radius: var(--radius); border: 1px solid var(--color-border); }
  .stat-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); }
  .stat-value { font-size: 1.375rem; font-weight: 700; color: var(--color-primary); }
  .no-results { font-size: 0.875rem; color: var(--color-text-muted); }

  .dist { display: flex; flex-direction: column; gap: 0.3rem; }
  .dist-row { display: flex; align-items: center; gap: 0.5rem; }
  .dist-val { width: 2.5rem; text-align: right; font-weight: 600; font-size: 0.875rem; }
  .dist-bar-wrap { flex: 1; height: 1.125rem; background: var(--color-border); border-radius: 99px; overflow: hidden; }
  .dist-bar { height: 100%; background: var(--color-primary); border-radius: 99px; min-width: 2px; transition: width 0.4s ease; }
  .dist-count { width: 1.25rem; font-size: 0.78rem; color: var(--color-text-muted); }

  .table-wrap { overflow-x: auto; }
  .participants-table, .log-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .participants-table th, .participants-table td,
  .log-table th, .log-table td {
    padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border);
  }
  .participants-table thead th { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }
  .participants-table tbody tr:last-child td { border-bottom: none; }
  .participants-table tbody tr:nth-child(even) { background: var(--color-surface); }
  .participants-table tbody tr.voted { background: color-mix(in srgb, var(--color-primary) 8%, transparent); }

  .voted-icon { color: var(--color-primary); font-weight: 700; width: 2rem; }
  .player-name-cell { font-weight: 500; }
  .me-tag { font-size: 0.72rem; color: var(--color-text-muted); margin-left: 0.25rem; font-weight: 400; }
  .vote-cell { font-weight: 700; }
  .vote-revealed { color: var(--color-primary); font-size: 1rem; font-weight: 700; }
  .vote-pending { font-size: 0.75rem; font-weight: 600; color: var(--color-primary); background: var(--color-card-selected); padding: 0.1rem 0.4rem; border-radius: 99px; }
  .vote-empty { color: var(--color-text-muted); }

  .col-status { width: 2rem; }
  .col-vote { width: 5rem; }
  .col-action { width: 8rem; }
  @media (max-width: 42rem) { .col-action { display: none; } }

  .action-btn {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.3rem 0.75rem; font-size: 0.8rem; font-family: inherit; font-weight: 600;
    border-radius: var(--radius); cursor: pointer; border: 2px solid transparent;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    min-height: 2rem; white-space: nowrap;
  }
  .action-btn:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 2px; }
  .action-btn-switch { background: var(--color-surface); color: var(--color-text); border-color: var(--color-border); }
  .action-btn-switch:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }
  .action-btn-kick { background: transparent; color: var(--color-danger); border-color: var(--color-danger); }
  .action-btn-kick:hover { background: var(--color-danger); color: white; }

  .log-table thead th { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }
  .log-table tbody tr:nth-child(even) { background: var(--color-surface); }
  .log-table tbody tr:last-child td { border-bottom: none; }
  .log-time { font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap; }

  .center-msg { text-align: center; padding: 4rem 0; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }

  .footer { padding: 1.25rem 1rem; border-top: 1px solid var(--color-border); font-size: 0.8rem; color: var(--color-text-muted); max-width: 60rem; margin: 0 auto; width: 100%; }
</style>
