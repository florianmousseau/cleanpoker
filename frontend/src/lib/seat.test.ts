import { describe, expect, it } from 'vitest';
import { forgetSeat, loadSeat, saveSeat } from './seat';

function memoryStorage() {
  const items = new Map<string, string>();
  return {
    getItem: (k: string) => items.get(k) ?? null,
    setItem: (k: string, v: string) => void items.set(k, v),
    removeItem: (k: string) => void items.delete(k),
    items,
  };
}

const alice = { name: 'Alice', observer: false, token: 't-123' };

describe('seat', () => {
  // QA-105: a reload used to arrive as someone new, vote lost, name to type
  // again, and the team told that Alice had left.
  it('gives back the seat kept for the same room', () => {
    const storage = memoryStorage();
    saveSeat(storage, 'abc', alice);
    expect(loadSeat(storage, 'abc')).toEqual(alice);
  });

  it('keeps each room apart', () => {
    const storage = memoryStorage();
    saveSeat(storage, 'abc', alice);
    expect(loadSeat(storage, 'xyz')).toBeNull();
  });

  it('forgets a seat, as after a kick', () => {
    const storage = memoryStorage();
    saveSeat(storage, 'abc', alice);
    forgetSeat(storage, 'abc');
    expect(loadSeat(storage, 'abc')).toBeNull();
  });

  it('refuses what is not a whole seat', () => {
    const storage = memoryStorage();
    for (const raw of ['not json', '{}', '{"name":"","observer":false,"token":"t"}',
      '{"name":"Alice","observer":false,"token":""}', '{"name":"Alice","observer":"no","token":"t"}']) {
      storage.setItem('cleanpoker:seat:abc', raw);
      expect(loadSeat(storage, 'abc')).toBeNull();
    }
  });

  it('works without a storage at all', () => {
    expect(loadSeat(null, 'abc')).toBeNull();
    expect(() => saveSeat(null, 'abc', alice)).not.toThrow();
    expect(() => forgetSeat(null, 'abc')).not.toThrow();
  });

  it('survives a storage that throws', () => {
    const refusing = {
      getItem: () => { throw new DOMException('denied', 'SecurityError'); },
      setItem: () => { throw new DOMException('full', 'QuotaExceededError'); },
      removeItem: () => { throw new DOMException('denied', 'SecurityError'); },
    };
    expect(loadSeat(refusing, 'abc')).toBeNull();
    expect(() => saveSeat(refusing, 'abc', alice)).not.toThrow();
    expect(() => forgetSeat(refusing, 'abc')).not.toThrow();
  });
});
