import { browser } from '$app/environment';
import { PUBLIC_WS_URL } from '$env/static/public';
import { onDestroy } from 'svelte';
import type { Translation } from '$lib/i18n';
import { transitionOf } from '$lib/room-transition';
import { forgetSeat, loadSeat, saveSeat, tabStorage } from '$lib/seat';

export type Player = { id: string; name: string; vote: string; observer: boolean };
export type Results = { avg: string; min: string; max: string; dist: Record<string, number> };
export type ActivityEntry = { timestamp: string; initiator: string; message: string; target?: string };
export type RoomState = {
  id: string; cards: string[];
  state: 'voting' | 'revealed'; round: number;
  results: Results | null; players: Player[]; activity: ActivityEntry[];
};

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
  // The token of the seat this tab holds. Every reconnection presents it, so
  // a dropped socket takes the same seat back instead of adding a second one.
  let token = '';

  function connect(name: string, observer: boolean) {
    if (!browser) return;
    const roomId = getRoomId();
    const url = `${PUBLIC_WS_URL}/rooms/${roomId}/ws?name=${encodeURIComponent(name)}&observer=${observer}&token=${encodeURIComponent(token)}`;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      isReconnecting = false;
      reconnectDelay = 1000;
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const T = getT();
      if (msg.type === 'welcome') {
        myId = msg.payload.id;
        myVote = msg.payload.vote ?? '';
        token = msg.payload.token ?? '';
        if (token) saveSeat(tabStorage(), roomId, { name, observer, token });
      } else if (msg.type === 'kicked') {
        kicked = true;
        token = '';
        forgetSeat(tabStorage(), roomId);
        socket.close();
      } else if (msg.type === 'state') {
        const prev = roomState;
        roomState = msg.payload;
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

  function send(type: string, payload = '') {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, payload }));
    }
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
    myVote = newVote;
    send('vote', newVote);
  }

  function show() { send('show'); }
  function clear() { myVote = ''; send('clear'); }
  function kick(targetId: string) { send('kick', targetId); }
  function toggleObserver(targetId: string) { send('toggleObserver', targetId); }

  onDestroy(() => {
    destroying = true;
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
