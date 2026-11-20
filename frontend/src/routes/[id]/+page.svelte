<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { lang } from '#lib/lang.svelte.ts';
  import Footer from '#lib/Footer.svelte';
  import QrCode from '#lib/QrCode.svelte';
  import { equipeDe } from '#lib/equipe.ts';
  import Logo from '#lib/Logo.svelte';
  import { FR, EN, ES, DE, PT, translateActivity } from '#lib/i18n.ts';
  import { useRoom } from '#lib/useRoom.svelte.ts';
  import { copierTexte } from '#lib/presse-papiers.ts';
  import { accorderDocumentALaLangue } from '#lib/html-lang.ts';
  import { expulserApresAccord } from '#lib/expulsion.ts';
  import { barWidth } from '#lib/distribution.ts';
  import { allVoted as allVotedOf } from '#lib/reveal.ts';
  import { moyenneAffichee } from '#lib/moyenne.ts';
  import { cadran, peutMener, secondesRestantes } from '#lib/minuteur.ts';
  import { agreement, extreme } from '#lib/consensus.ts';
  import StoriesPanel from '#lib/StoriesPanel.svelte';
  import LocalAi from '#lib/LocalAi.svelte';

  const roomId = $derived(page.params.id ?? '');
  const equipe = $derived(equipeDe(page.url.searchParams));
  const T = $derived(
    lang.current === 'fr' ? FR :
    lang.current === 'es' ? ES :
    lang.current === 'de' ? DE :
    lang.current === 'pt' ? PT :
    EN
  );

  let nameInput = $state('');
  let nameInputEl = $state<HTMLInputElement | null>(null);
  let isObserver = $state(false);
  let copyFeedback = $state('');
  let copyError = $state('');
  let inviteFeedback = $state('');
  let inviteError = $state('');
  let promoDismissed = $state(false);

  // QA-105: a reload, or the back button after a footer link, used to put the
  // participant in front of this form again - vote lost, and the team told
  // they had left. The tab's seat is taken back before the form is offered.
  onMount(() => {
    if (!room.resume()) nameInputEl?.focus();
  });

  // A room URL has no locale prefix, so hooks.server.ts stamped `en` for
  // everyone while this page renders in the cookie language. Anyone opening
  // the shared link - the only way into a room - got a fully translated page
  // under the wrong `lang`, with an untranslated skip link.
  $effect(() => {
    accorderDocumentALaLangue(document, lang.current);
  });

  const room = useRoom(() => roomId, () => T);

  function kick(player: { id: string; name: string }) {
    expulserApresAccord(T.participants.kickConfirm(player.name), (q) => window.confirm(q), () => room.kick(player.id));
  }

  function handleJoin() {
    if (!nameInput.trim()) return;
    room.join(nameInput.trim(), isObserver);
  }

  // A refused copy used to say nothing at all: the rejection left as an
  // unhandled one, the label went back to "Copy link", and the host pasted the
  // previous clipboard into the team channel. Sharing the URL is the whole of
  // this step, so a failure has to be visible where the click happened.
  async function copyLink() {
    if (await copierTexte(window.location.href)) {
      copyError = '';
      copyFeedback = T.copied;
      setTimeout(() => (copyFeedback = ''), 2000);
      return;
    }
    copyFeedback = '';
    copyError = T.copyFailed;
  }

  // The invite lands in a team chat, where a bare URL says nothing. The sentence
  // names the product and answers the "do I need an account" question upfront.
  async function copyInvite() {
    if (await copierTexte(T.share.inviteMessage(window.location.href))) {
      inviteError = '';
      inviteFeedback = T.copied;
      setTimeout(() => (inviteFeedback = ''), 2000);
      return;
    }
    inviteFeedback = '';
    inviteError = T.copyFailed;
  }

  const participants = $derived(room.roomState?.players.filter(p => !p.observer) ?? []);
  const observers = $derived(room.roomState?.players.filter(p => p.observer) ?? []);
  const allVoted = $derived(allVotedOf(room.roomState?.players ?? []));
  const me = $derived(room.roomState?.players.find(p => p.id === room.myId));
  const isHost = $derived(room.roomState !== null && room.roomState.host === room.myId);
  const canRun = $derived(room.roomState === null || peutMener(room.roomState, room.myId));
  const TIMER_CHOICES = [30, 60, 120, 300];
  // Role and removal buttons show only with the options: the list stays a list of who voted.
  let optionsOpen = $state(false);

  // One tick a second while a timer runs; the deadline comes from the server.
  let now = $state(Date.now());
  $effect(() => {
    if (!room.roomState?.timerEnd) return;
    now = Date.now();
    const tick = setInterval(() => (now = Date.now()), 1000);
    return () => clearInterval(tick);
  });
  const timerLeft = $derived(room.roomState?.timerEnd ? secondesRestantes(room.roomState.timerEnd, now) : null);

  const stories = $derived(room.roomState?.stories ?? []);
  const currentIndex = $derived(room.roomState?.current ?? -1);
  const onTable = $derived(currentIndex >= 0 ? stories[currentIndex] : undefined);
  // The cards the team voted, in deck order: the estimates it can keep.
  const keepable = $derived(
    room.roomState?.results ? room.roomState.cards.filter(c => (room.roomState?.results?.dist[c] ?? 0) > 0) : []
  );
  const agreed = $derived(room.roomState?.results ? agreement(room.roomState.results.dist) : null);

  const isSolo = $derived(room.roomState !== null && room.roomState.players.length === 1);
  // Most people meet PokerAgile as someone else's guest and never see the home
  // page. The reveal is the one moment they are looking at the result rather
  // than at a card, so that is where they get told they can host their own.
  const showPromo = $derived(
    !promoDismissed &&
    room.roomState?.state === 'revealed' &&
    room.roomState.players.length > 1
  );
  const homeHref = $derived(
    lang.current === 'fr' ? '/fr' :
    lang.current === 'es' ? '/es' :
    lang.current === 'de' ? '/de' :
    lang.current === 'pt' ? '/pt' :
    '/'
  );
</script>

<svelte:head>
  <title>{T.salleLabel} {roomId} | PokerAgile</title>
  <meta name="robots" content="noindex" />
  <!-- This URL is the only one anyone ever shares, and it lands in a team chat.
       The card is what the whole channel sees, so it says what PokerAgile is
       and never echoes the room id. noindex keeps it out of search all the same. -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="PokerAgile" />
  <meta property="og:title" content={T.share.ogTitle} />
  <meta property="og:description" content={T.share.ogDesc} />
  <meta property="og:image" content="https://pokeragile.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={T.share.ogTitle} />
  <meta name="twitter:description" content={T.share.ogDesc} />
</svelte:head>

<div aria-live="polite" aria-atomic="true" class="sr-only">{room.liveAnnouncement}</div>

<div class="page" class:equipe={equipe?.clair} style:--eq-clair={equipe?.clair || undefined} style:--eq-sombre={equipe?.sombre || undefined}>
  <header class="header">
    <div class="container header-inner">
      <a href={homeHref} class="logo" aria-label="PokerAgile, accueil"><Logo /><span>PokerAgile</span></a>
      <div class="room-meta">
        {#if equipe?.nom}<span class="badge-pill team-name" data-testid="team-name">{equipe.nom}</span>{/if}
        <span class="badge-pill">{T.salleLabel} <code>{roomId}</code></span>
        {#if room.roomState}
          <span class="badge-pill">{T.tourLabel} {room.roomState.round}</span>
        {/if}
        <button class="btn btn-secondary btn-sm" onclick={copyLink}>{copyFeedback || T.copyLink}</button>
        {#if copyError}
          <span class="copy-error" role="alert">{copyError}</span>
        {/if}
      </div>
    </div>
  </header>

  <main id="main" class="container main">

    {#if room.kicked}
      <div class="center-msg">
        <h1>{T.kicked.title}</h1>
        <a href="/" class="btn btn-primary">{T.kicked.back}</a>
      </div>

    {:else if !room.joined}
      <section class="join-form" aria-labelledby="join-title" data-testid="join-form">
        <h1 id="join-title">{T.join.title}</h1>
        <form onsubmit={(e) => { e.preventDefault(); handleJoin(); }}>
          <label for="name-input">{T.join.label}</label>
          <!-- svelte-ignore a11y_autofocus -->
          <input id="name-input" type="text" bind:value={nameInput} bind:this={nameInputEl} maxlength="30"
            autocomplete="off" placeholder={T.join.placeholder} required
            autofocus
            onfocus={(e) => e.currentTarget.select()} />
          <label class="toggle-label">
            <input type="checkbox" bind:checked={isObserver} data-testid="observer-checkbox" />
            <span>{T.join.observer}</span>
          </label>
          <button type="submit" class="btn btn-primary" disabled={!nameInput.trim()} data-testid="join-btn">
            {T.join.btn}
          </button>
        </form>
      </section>

    {:else if !room.roomState}
      <p aria-live="polite">{room.isReconnecting ? T.connection.reconnecting : T.connection.connecting}</p>

    {:else}
      <h1 class="sr-only">{T.salleLabel} {roomId}</h1>

      {#if room.isReconnecting}
        <div class="reconnecting-banner" role="status">{T.connection.reconnecting}</div>
      {/if}

      {#if isSolo}
        <div class="solo-hint" role="status">
          <span>{T.solo.hint}</span>
          <button class="btn btn-secondary btn-sm" onclick={copyInvite}>
            {inviteFeedback || T.solo.invite}
          </button>
          {#if inviteError}
            <span class="copy-error" role="alert">{inviteError}</span>
          {/if}
        </div>
      {/if}

      {#if onTable}
        <div>
          <p class="on-table" data-testid="story-on-table">{T.stories.onTable} <strong>{onTable.title}</strong></p>
          <LocalAi story={onTable.title} lang={lang.current} {T} />
        </div>
      {/if}

      <!-- Cartes -->
      {#if !me?.observer}
        <section class="card-section" aria-labelledby="cards-title">
          <div class="card-header-row">
            <h2 id="cards-title">{T.cards.title}</h2>
            <p class="card-subtitle">
              {#if room.roomState.state === 'revealed'}
                {T.cards.revealedSub}
              {:else}
                {T.cards.votingHint}{room.myVote ? T.cards.selectedSuffix(room.myVote) : ''}.
              {/if}
            </p>
          </div>
          <ul class="cards-list" role="list" aria-label={T.cards.title} data-testid="cards-list">
            <!-- Keyed by position, never by label: rooms created before the
                 home page deduplicated still carry repeated cards, and a
                 duplicate key throws each_key_duplicate, which leaves every
                 arriving player stuck on "Connecting...". -->
            {#each room.roomState.cards as card, i (i)}
              <li>
                <button
                  class="poker-card"
                  class:selected={room.myVote === card}
                  onclick={() => room.castVote(card)}
                  aria-pressed={room.myVote === card}
                  aria-label={T.cards.voteLabel(card)}
                  disabled={room.roomState.state === 'revealed'}
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
            <button class="btn btn-secondary btn-block" onclick={() => room.clear()} disabled={!canRun} data-testid="new-round-btn">
              {T.controls.newRound}
            </button>
            <button class="btn btn-primary btn-block" onclick={() => room.show()} disabled={!canRun || !allVoted || room.roomState.state === 'revealed'}
              aria-describedby={!allVoted ? 'show-hint' : undefined}
              data-testid="reveal-btn">
              {T.controls.reveal}
            </button>
          </div>
          {#if !allVoted && room.roomState.state === 'voting' && participants.length > 0}
            <p id="show-hint" class="hint">
              {T.controls.pending(participants.filter(p => p.vote === '').length)}
            </p>
          {/if}
          {#if timerLeft !== null}
            <p class="timer-left" class:timer-over={timerLeft === 0} role="timer" data-testid="timer-left">
              {timerLeft === 0 ? T.host.timerOver : T.host.timerLeft(cadran(timerLeft))}
            </p>
          {/if}
          {#if room.roomState.locked}
            <p class="hint" data-testid="locked-hint">{T.host.lockedHint}</p>
          {/if}
        </section>

        <section class="panel" aria-labelledby="results-title" data-testid="results">
          <h2 id="results-title">{T.results.title}</h2>
          {#if room.roomState.results}
            <div data-testid="results-data">
            {#if room.roomState.results.avg !== 'N/A'}
              <div class="stats-grid">
                <div class="stat"><span class="stat-label">{T.results.avg}</span><span class="stat-value">{moyenneAffichee(room.roomState.results.avg, lang.current)}</span></div>
                {#if room.roomState.results.median}
                  <div class="stat"><span class="stat-label">{T.results.median}</span><span class="stat-value">{moyenneAffichee(room.roomState.results.median, lang.current)}</span></div>
                {/if}
                <div class="stat"><span class="stat-label">{T.results.min}</span><span class="stat-value">{room.roomState.results.min}</span></div>
                <div class="stat"><span class="stat-label">{T.results.max}</span><span class="stat-value">{room.roomState.results.max}</span></div>
              </div>
            {/if}
            {#if agreed !== null}
              <p class="agreement" data-testid="agreement">{T.results.agreement(agreed)}</p>
            {/if}
            <div class="dist">
              {#each Object.entries(room.roomState.results.dist).sort((a,b) => b[1]-a[1]) as [val, count] (val)}
                <div class="dist-row">
                  <span class="dist-val">{val}</span>
                  <div class="dist-bar-wrap">
                    <div class="dist-bar" style="width:{barWidth(count, room.roomState.results.dist)}%"></div>
                  </div>
                  <span class="dist-count">{count}</span>
                </div>
              {/each}
            </div>
            {#if onTable && canRun}
              <div class="keep" role="group" aria-label={T.stories.keepTitle}>
                {#each keepable as card (card)}
                  <button class="btn btn-secondary btn-sm" class:kept={onTable.estimate === card}
                    aria-pressed={onTable.estimate === card} onclick={() => room.estimate(card)}>{T.stories.keep(card)}</button>
                {/each}
                {#if currentIndex < stories.length - 1}
                  <button class="btn btn-primary btn-sm" onclick={() => room.selectStory(currentIndex + 1)} data-testid="next-story">{T.stories.next}</button>
                {/if}
              </div>
            {/if}
            </div>
          {:else}
            <p class="no-results">{T.results.none}</p>
          {/if}
        </section>
      </div>

      {#if showPromo}
        <aside class="promo" data-testid="promo">
          <p class="promo-lead">{T.promo.lead}</p>
          <div class="promo-actions">
            <a class="btn btn-secondary btn-sm" href={homeHref}>{T.promo.cta}</a>
            <button class="promo-close" onclick={() => (promoDismissed = true)}>{T.promo.close}</button>
          </div>
        </aside>
      {/if}


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
                  {#if optionsOpen}
                  <th scope="col" class="col-action">{T.participants.colRole}</th>
                  <th scope="col" class="col-action">{T.participants.colAction}</th>
                  {/if}
                </tr>
              </thead>
              <tbody>
                {#each participants as player (player.id)}
                  <tr class:voted={player.vote !== ''} class:is-me={player.id === room.myId}>
                    <td class="voted-icon" aria-hidden="true">{#if player.vote !== ''}✓{/if}</td>
                    <td class="player-name-cell">
                      {player.name}
                      {#if player.id === room.myId}<span class="me-tag">{T.participants.me}</span>{/if}
                      {#if player.id === room.roomState.host}<span class="me-tag">({T.host.badge})</span>{/if}
                      {#if player.ai}<span class="me-tag">({T.host.ai})</span>{/if}
                      {#if player.vote !== ''}<span class="sr-only">{T.participants.votedSr}</span>{/if}
                      {#if room.roomState.state === 'revealed' && player.reason}<p class="reason">{player.reason}</p>{/if}
                    </td>
                    <td class="vote-cell">
                      {#if room.roomState.state === 'revealed'}
                        <span class="vote-revealed" data-extreme={room.roomState.results ? extreme(player.vote, room.roomState.results.min, room.roomState.results.max) : null}>{player.vote || '-'}</span>
                      {:else if player.vote === 'hidden'}
                        <span class="vote-pending">{T.participants.votePending}</span>
                      {:else}
                        <span class="vote-empty">-</span>
                      {/if}
                    </td>
                    {#if optionsOpen}
                    <td class="col-action">
                      <button class="action-btn action-btn-switch"
                        disabled={!canRun && player.id !== room.myId}
                        onclick={() => room.toggleObserver(player.id)}
                        aria-label={T.participants.toObserverLabel(player.name)}>
                        {T.participants.toObserver}
                      </button>
                    </td>
                    <td class="col-action">
                      <button class="action-btn action-btn-kick"
                        disabled={!canRun}
                        onclick={() => kick(player)}
                        aria-label={T.participants.kickLabel(player.name)}>
                        {T.participants.kick}
                      </button>
                    </td>
                    {/if}
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
                  {#if optionsOpen}
                  <th scope="col" class="col-action">{T.participants.colRole}</th>
                  <th scope="col" class="col-action">{T.participants.colAction}</th>
                  {/if}
                </tr>
              </thead>
              <tbody>
                {#each observers as player (player.id)}
                  <tr class:is-me={player.id === room.myId}>
                    <td class="player-name-cell">
                      {player.name}
                      {#if player.id === room.myId}<span class="me-tag">{T.participants.me}</span>{/if}
                      {#if player.id === room.roomState.host}<span class="me-tag">({T.host.badge})</span>{/if}
                      {#if player.ai}<span class="me-tag">({T.host.ai})</span>{/if}
                    </td>
                    {#if optionsOpen}
                    <td class="col-action">
                      <button class="action-btn action-btn-switch"
                        disabled={!canRun && player.id !== room.myId}
                        onclick={() => room.toggleObserver(player.id)}
                        aria-label={T.observers.toParticipantLabel(player.name)}>
                        {T.observers.toParticipant}
                      </button>
                    </td>
                    <td class="col-action">
                      <button class="action-btn action-btn-kick"
                        disabled={!canRun}
                        onclick={() => kick(player)}
                        aria-label={T.participants.kickLabel(player.name)}>
                        {T.participants.kick}
                      </button>
                    </td>
                    {/if}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
      {/if}

      {#if stories.length > 0}
      <StoriesPanel {stories} current={currentIndex} {T} {canRun}
        onAdd={(text) => room.addStories(text)}
        onClear={() => room.clearStories()}
        onSelect={(i) => room.selectStory(i)} />
      {/if}

      <!-- Everything beyond voting waits here, closed: the room opens on the cards. -->
      <details class="panel options" data-testid="options" bind:open={optionsOpen}>
        <summary>{T.options}</summary>
        <div class="options-body">
            {#if canRun && room.roomState.state === 'voting'}
              <div class="timer-row" role="group" aria-label={T.host.timer}>
                <span class="timer-label">{T.host.timer}</span>
                {#each TIMER_CHOICES as seconds (seconds)}
                  <button class="btn btn-secondary btn-sm" onclick={() => room.startTimer(seconds)}>{T.host.seconds(seconds)}</button>
                {/each}
                {#if room.roomState.timerEnd}
                  <button class="btn btn-secondary btn-sm" onclick={() => room.startTimer(0)}>{T.host.timerStop}</button>
                {/if}
              </div>
            {/if}
            {#if canRun}
              <label class="auto-reveal">
                <input type="checkbox" checked={room.roomState.autoReveal ?? false}
                  onchange={(e) => room.setAutoReveal(e.currentTarget.checked)} data-testid="auto-reveal" />
                <span>{T.controls.autoReveal}</span>
              </label>
            {/if}
            {#if isHost}
              <button class="btn btn-secondary btn-sm lock-btn" onclick={() => room.setLocked(!room.roomState?.locked)}
                aria-pressed={room.roomState.locked} data-testid="lock-btn">
                {room.roomState.locked ? T.host.unlock : T.host.lock}
              </button>
            {/if}
          <QrCode {roomId} {T} />
          {#if stories.length === 0}
          <StoriesPanel {stories} current={currentIndex} {T} {canRun}
            onAdd={(text) => room.addStories(text)}
            onClear={() => room.clearStories()}
            onSelect={(i) => room.selectStory(i)} />
          {/if}
        <!-- Journal d'activité -->
        <section class="panel" aria-labelledby="log-title">
          <h2 id="log-title">{T.activity.title}</h2>
          {#if room.roomState.activity.length === 0}
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
                  {#each [...room.roomState.activity].reverse() as entry, i (i)}
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
        </div>
      </details>
    {/if}
  </main>

  <Footer
    navAriaLabel={T.footer.navAriaLabel}
    source={T.footer.source}
    license={T.footer.license}
    legal={T.footer.legal}
    privacy={T.footer.privacy}
    about={T.footer.about}
    locale={lang.current}
    onLangChange={(l) => lang.set(l as 'fr'|'en'|'es'|'de'|'pt')}
  />
</div>

<style>
  .page { display: flex; flex-direction: column; min-height: 100dvh; }
  /* A team colour, already brought to 4.5:1 against the text that sits on it. */
  .page.equipe {
    --color-primary: var(--eq-clair); --color-primary-hover: var(--eq-clair);
    --color-card-border-selected: var(--eq-clair);
    --color-card-selected: color-mix(in srgb, var(--eq-clair) 12%, white);
  }
  :global([data-theme="dark"]) .page.equipe {
    --color-primary: var(--eq-sombre); --color-primary-hover: var(--eq-sombre);
    --color-card-border-selected: var(--eq-sombre);
    --color-card-selected: color-mix(in srgb, var(--eq-sombre) 18%, #0d1117);
  }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme="light"])) .page.equipe {
      --color-primary: var(--eq-sombre); --color-primary-hover: var(--eq-sombre);
      --color-card-border-selected: var(--eq-sombre);
      --color-card-selected: color-mix(in srgb, var(--eq-sombre) 18%, #0d1117);
    }
  }
  .badge-pill.team-name { font-weight: 700; color: var(--color-primary); border-color: var(--color-primary); }

  .header { padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
  .logo { display: flex; align-items: center; gap: 0.5rem; font-size: 1.125rem; font-weight: 700; text-decoration: none; color: var(--color-text); }
  .room-meta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }

  /* Sits next to the button that failed, because that is where the eye already
     is. It wraps onto its own line on a narrow screen rather than pushing the
     room id out of the header. */
  .copy-error {
    flex-basis: 100%;
    font-size: 0.8125rem;
    color: var(--color-danger);
  }
  .badge-pill {
    font-size: 0.78rem; padding: 0.2rem 0.6rem;
    background: var(--color-surface); border: 1px solid var(--color-border);
    border-radius: 99px; color: var(--color-text-muted);
  }
  .badge-pill code { font-family: var(--font-mono); }
  .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.8rem; min-height: 0; }
  .main { flex: 1; padding-top: 1.5rem; padding-bottom: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }

  .panel {
    background: var(--color-card); border: 1px solid var(--color-border);
    border-radius: var(--radius-lg); padding: min(1.25rem, 20px);
  }
  .panel h2 { font-size: 1rem; margin-bottom: 0.75rem; }
  .empty { font-size: 0.875rem; color: var(--color-text-muted); }

  .reconnecting-banner {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 0.5rem min(1rem, 16px);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: 1rem;
  }

  .solo-hint {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
    padding: 0.75rem min(1rem, 16px);
    background: var(--color-card-selected);
    border: 1px solid var(--color-card-border-selected);
    border-radius: var(--radius-lg);
    font-size: 0.875rem; color: var(--color-primary);
  }

  .promo {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
    padding: 0.75rem min(1rem, 16px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
  }
  .promo-lead { margin: 0; color: var(--color-text-muted); }
  .promo-actions { display: flex; align-items: center; gap: 0.75rem; }
  .promo-close {
    background: none; border: none; padding: 0.25rem;
    font: inherit; color: var(--color-text-muted); cursor: pointer;
    text-decoration: underline;
  }
  .promo-close:hover { color: var(--color-text); }

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

  .card-section { background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: min(1.25rem, 20px); }
  .card-header-row { margin-bottom: 0.875rem; }
  .card-header-row h2 { font-size: 1rem; margin-bottom: 0.25rem; }
  .card-subtitle { font-size: 0.8rem; color: var(--color-text-muted); }
  .cards-list { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; }
  /* A card label is whatever the host typed. A fixed box let a long one spill
     past the card and the screen edge; the card now grows to hold it and
     breaks it at any character once it reaches the width of the row. */
  .poker-card {
    min-width: 3.5rem; max-width: 100%; min-height: 5rem;
    padding: 4px 8px; overflow-wrap: anywhere; text-align: center;
    font-size: 1.25rem; font-weight: 700; font-family: inherit;
    background: var(--color-card-face); border: 2px solid var(--color-border);
    color: var(--color-text);
    border-radius: var(--radius); cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow);
  }
  .poker-card:hover:not(:disabled) { border-color: var(--color-primary); transform: translateY(-3px); }
  .poker-card.selected { background: var(--color-card-selected); border-color: var(--color-card-border-selected); color: var(--color-primary); transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .poker-card:disabled { opacity: 0.65; cursor: default; transform: none; }
  .poker-card.selected:disabled { opacity: 1; }

  .controls-results-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.25rem; }
  @media (max-width: 42rem) { .controls-results-row { grid-template-columns: minmax(0, 1fr); } }

  .controls-btns { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0.625rem; margin-bottom: 0.5rem; }
  .btn-block { width: 100%; justify-content: center; }
  .hint { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem; }
  .timer-left { font-size: 1.125rem; font-weight: 700; color: var(--color-primary); margin: 0.5rem 0; font-variant-numeric: tabular-nums; }
  .timer-left.timer-over { color: var(--color-danger); }
  .timer-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; margin-top: 0.5rem; }
  .timer-label { font-size: 0.8rem; color: var(--color-text-muted); margin-right: 0.25rem; }
  .lock-btn { margin-top: 0.625rem; }
  .options summary { cursor: pointer; font-weight: 600; }
  .options-body { display: flex; flex-direction: column; gap: 0.875rem; margin-top: 0.875rem; }
  .options-body .lock-btn, .options-body .auto-reveal, .options-body .timer-row { margin-top: 0; align-self: flex-start; }
  .reason { margin-top: 0.25rem; font-size: 0.8rem; font-weight: 400; color: var(--color-text-muted); overflow-wrap: break-word; }
  .auto-reveal { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.625rem; font-size: 0.85rem; cursor: pointer; }
  .auto-reveal input { accent-color: var(--color-primary); }
  .on-table { font-size: 1rem; padding: 0.625rem min(1rem, 16px); background: var(--color-card-selected); border: 1px solid var(--color-card-border-selected); border-radius: var(--radius-lg); overflow-wrap: break-word; }
  .agreement { font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 0.5rem; }
  .keep { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.875rem; }
  .keep .kept { background: var(--color-card-selected); border-color: var(--color-card-border-selected); color: var(--color-primary); }
  .vote-revealed[data-extreme] { padding: 0.05rem 0.4rem; border-radius: 99px; outline: 2px solid var(--color-danger); }
  .action-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.625rem; margin-bottom: 1rem; }
  @media (max-width: 30rem) { .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
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

  .action-btn {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.3rem 0.75rem; font-size: 0.8rem; font-family: inherit; font-weight: 600;
    border-radius: var(--radius); cursor: pointer; border: 2px solid transparent;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    min-height: 2rem;
  }
  /* Les deux `nowrap` sont portes par le selecteur descendant de `.table-wrap`,
     qui defile : le libelle le plus long y fixe la largeur de la boite, jamais
     celle du document. */
  .table-wrap .action-btn { white-space: nowrap; }
  .action-btn:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 2px; }
  .action-btn-switch { background: var(--color-surface); color: var(--color-text); border-color: var(--color-border); }
  .action-btn-switch:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }
  .action-btn-kick { background: transparent; color: var(--color-danger); border-color: var(--color-danger); }
  .action-btn-kick:hover { background: var(--color-danger); color: white; }

  .log-table thead th { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }
  .log-table tbody tr:nth-child(even) { background: var(--color-surface); }
  .log-table tbody tr:last-child td { border-bottom: none; }
  .log-time { font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-muted); }
  .table-wrap .log-time { white-space: nowrap; }

  .center-msg { text-align: center; padding: 4rem 0; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }


</style>
