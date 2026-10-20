import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('$app/env', () => ({ browser: true }));
vi.mock('$app/env/public', () => ({ PUBLIC_WS_URL: 'ws://test' }));
vi.mock('svelte', async (original) => ({ ...(await original<typeof import('svelte')>()), onDestroy: () => {} }));

class FakeSocket {
  static OPEN = 1;
  static last: FakeSocket;
  readyState = 0;
  sent: { type: string; payload: string }[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public url: string) {
    FakeSocket.last = this;
  }
  send(data: string) {
    this.sent.push(JSON.parse(data));
  }
  close() {
    this.readyState = 3;
  }
  open() {
    this.readyState = 1;
    this.onopen?.();
  }
  receive(type: string, payload: unknown) {
    this.onmessage?.({ data: JSON.stringify({ type, payload }) });
  }
}

const T = { live: { newRound: () => '', revealed: '' } };

async function joined() {
  const { useRoom } = await import('./useRoom.svelte');
  const room = useRoom(() => 'r1', () => T as never);
  room.join('Alice', false);
  return room;
}

describe('useRoom', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('WebSocket', FakeSocket);
    vi.stubGlobal('sessionStorage', { getItem: () => null, setItem: () => {}, removeItem: () => {} });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('does not show a vote that could not leave', async () => {
    const room = await joined();
    room.castVote('5');
    expect(room.myVote).toBe('');
    expect(FakeSocket.last.sent).toEqual([]);
  });

  it('shows the vote the room holds, not the one it refused', async () => {
    const room = await joined();
    FakeSocket.last.open();
    room.castVote('8');
    expect(room.myVote).toBe('8');
    FakeSocket.last.receive('vote', '5');
    expect(room.myVote).toBe('5');
  });

  it('does not let the answer to an earlier vote replace a later one', async () => {
    const room = await joined();
    FakeSocket.last.open();
    room.castVote('5');
    room.castVote('8');
    FakeSocket.last.receive('vote', '5');
    expect(room.myVote).toBe('8');
    FakeSocket.last.receive('vote', '8');
    expect(room.myVote).toBe('8');
    room.castVote('5');
    expect(FakeSocket.last.sent.at(-1)).toEqual({ type: 'vote', payload: '5' });
  });

  it('pings, and reconnects after a silence', async () => {
    await joined();
    const first = FakeSocket.last;
    first.open();
    vi.advanceTimersByTime(25_000);
    expect(first.sent.at(-1)?.type).toBe('ping');
    vi.advanceTimersByTime(60_000);
    expect(first.readyState).toBe(3);
    vi.advanceTimersByTime(1_000);
    expect(FakeSocket.last).not.toBe(first);
  });
});
