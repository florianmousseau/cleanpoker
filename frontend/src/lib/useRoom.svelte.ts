import { browser } from '$app/env';
import { PUBLIC_WS_URL } from '$app/env/public';
import { onDestroy } from 'svelte';
import type { Translation } from '#lib/i18n.ts';
import { transitionOf } from '#lib/room-transition.ts';
import { forgetSeat, loadSeat, saveSeat, tabStorage } from '#lib/seat.ts';

export type Player = { id: string; name: string; vote: string; observer: boolean };
export type Results = { avg: string; min: string; max: string; dist: Record<string, number> };
export type ActivityEntry = { timestamp: string; initiator: string; message: string; target?: string };
export type RoomState = {
  id: string; cards: string[];
  state: 'voting' | 'revealed'; round: number;
  results: Results | null; players: Player[]; activity: ActivityEntry[];
};

const PING_MS = 25_000;
const SILENCE_MS = 60_000;

export function useRoom(getRoomId: () => string, getT: () => Translation) {
  let roomState = $state<RoomState | null>(null);
  let myId = $state('');
  let myVote = $state('');
  let joined = $state(false);
  let isReconnecting = $state(false);
  let kicked = $state(false);
  let liveAnnouncement = $state('');
  let ws: WebSocket | null = null;
  let reconnectDelay = 1000;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let destroying = false;
  let heartbeat: ReturnType<typeof setInterval> | null = null;
  let watchdog: ReturnType<typeof setTimeout> | null = null;
  // The token of the seat this tab holds. Every reconnection presents it, so
  // a dropped socket takes the same seat back instead of adding a second one.
  let token = '';
  // Votes sent and not yet answered: only the answer to the LAST one says what
  // the room holds, an earlier answer would put back a vote already replaced.
  let votesInFlight = 0;

  function connect(name: string, observer: boolean) {
    if (!browser) return;
    const roomId = getRoomId();
    const url = `${PUBLIC_WS_URL}/rooms/${roomId}/ws?name=${encodeURIComponent(name)}&observer=${observer}&token=${encodeURIComponent(token)}`;
    const socket = new WebSocket(url);

    // A link cut without a TCP close looked connected for minutes: the server
    // answers every ping, so a silence past SILENCE_MS is a dead link.
    const reconnect = () => {
      stopHeartbeat();
      if (destroying || kicked || !joined) return;
      isReconnecting = true;
      reconnectTimer = setTimeout(() => {
        reconnectDelay = Math.min(reconnectDelay * 2, 30000);
        connect(name, observer);
      }, reconnectDelay);
    };
    const armWatchdog = () => {
      if (watchdog) clearTimeout(watchdog);
      watchdog = setTimeout(() => {
        socket.onclose = null;
        socket.close();
        reconnect();
      }, SILENCE_MS);
    };

    socket.onopen = () => {
      isReconnecting = false;
      reconnectDelay = 1000;
      armWatchdog();
      heartbeat = setInterval(() => send('ping'), PING_MS);
    };

    socket.onmessage = (event) => {
      armWatchdog();
      const msg = JSON.parse(event.data);
      const T = getT();
      if (msg.type === 'welcome') {
        myId = msg.payload.id;
        myVote = msg.payload.vote ?? '';
        votesInFlight = 0;
        token = msg.payload.token ?? '';
        if (token) saveSeat(tabStorage(), roomId, { name, observer, token });
      } else if (msg.type === 'vote') {
        // The vote the room holds: a refused one does not stay on screen.
        votesInFlight = Math.max(0, votesInFlight - 1);
        if (votesInFlight === 0) myVote = msg.payload ?? '';
      } else if (msg.type === 'kicked') {
        kicked = true;
        token = '';
        forgetSeat(tabStorage(), roomId);
        socket.close();
      } else if (msg.type === 'state') {
        const prev = roomState;
        roomState = msg.payload;
        // An observer holds no vote: turning one clears it on the server, and
        // without this the card stayed selected on its own screen.
        if (msg.payload.players?.some((p: Player) => p.id === myId && p.observer)) myVote = '';
        const change = transitionOf(prev, msg.payload);
        if (change?.kind === 'newRound') {
          myVote = '';
          liveAnnouncement = T.live.newRound(change.round);
        } else if (change?.kind === 'revealed') {
          liveAnnouncement = T.live.revealed;
        }
      }
    };

    socket.onerror = () => {};

    socket.onclose = reconnect;

    ws = socket;
  }

  function stopHeartbeat() {
    if (heartbeat) clearInterval(heartbeat);
    if (watchdog) clearTimeout(watchdog);
    heartbeat = null;
    watchdog = null;
  }

  /**
   * Send a command; false when the socket is not open and nothing left. It
   * names the round on screen, so the room refuses a vote or a "new round"
   * meant for a round that has already gone.
   */
  function send(type: string, payload = ''): boolean {
    if (ws?.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify({ type, payload, round: roomState?.round ?? 0 }));
    return true;
  }

  function join(name: string, observer: boolean) {
    joined = true;
    connect(name, observer);
  }

  /** Take back the seat this tab held in the room, if it kept one. */
  function resume(): boolean {
    const seat = loadSeat(tabStorage(), getRoomId());
    if (!seat) return false;
    token = seat.token;
    join(seat.name, seat.observer);
    return true;
  }

  function castVote(card: string) {
    const newVote = myVote === card ? '' : card;
    // Shown at once when it left; the room's answer then sets what it holds.
    if (send('vote', newVote)) {
      myVote = newVote;
      votesInFlight += 1;
    }
  }

  function show() { send('show'); }
  function clear() { myVote = ''; send('clear'); }
  function kick(targetId: string) { send('kick', targetId); }
  function toggleObserver(targetId: string) { send('toggleObserver', targetId); }

  onDestroy(() => {
    destroying = true;
    stopHeartbeat();
    if (reconnectTimer) clearTimeout(reconnectTimer);
    ws?.close();
  });

  return {
    get roomState() { return roomState; },
    get myId() { return myId; },
    get myVote() { return myVote; },
    get joined() { return joined; },
    get isReconnecting() { return isReconnecting; },
    get kicked() { return kicked; },
    get liveAnnouncement() { return liveAnnouncement; },
    join, resume, send, castVote, show, clear, kick, toggleObserver,
  };
}
