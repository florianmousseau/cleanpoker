import { describe, expect, it } from 'vitest';
import { forgetSeat, loadCredit, loadName, loadSeat, saveCredit, saveName, saveSeat } from './seat';

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

describe('name', () => {
  it('gives back the name of the last join, whatever the room', () => {
    const storage = memoryStorage();
    saveName(storage, '  Alice ');
    expect(loadName(storage)).toBe('Alice');
    expect([...storage.items.keys()]).toEqual(['cleanpoker:name']);
  });

  it('is empty when nothing was kept or the storage is missing', () => {
    expect(loadName(memoryStorage())).toBe('');
    expect(loadName(null)).toBe('');
  });

  it('survives a storage that throws', () => {
    const broken = {
      getItem: () => { throw new Error('blocked'); },
      setItem: () => { throw new Error('blocked'); },
      removeItem: () => {},
    };
    expect(loadName(broken)).toBe('');
    expect(() => saveName(broken, 'Alice')).not.toThrow();
  });
});

describe('the PokerAgile line of copied results', () => {
  it('is added until the person says otherwise', () => {
    expect(loadCredit(memoryStorage())).toBe(true);
    expect(loadCredit(null)).toBe(true);
  });

  it('remembers that it was turned off, then back on', () => {
    const storage = memoryStorage();
    saveCredit(storage, false);
    expect(loadCredit(storage)).toBe(false);
    saveCredit(storage, true);
    expect(loadCredit(storage)).toBe(true);
  });

  it('sits beside the name, under its own key, and renames nothing', () => {
    const storage = memoryStorage();
    saveName(storage, 'Alice');
    saveCredit(storage, false);
    expect([...storage.items.keys()].sort()).toEqual(['cleanpoker:credit', 'cleanpoker:name']);
    expect(loadName(storage)).toBe('Alice');
  });

  it('answers yes and stays quiet when the storage refuses', () => {
    const refusing = {
      getItem: () => { throw new Error('blocked'); },
      setItem: () => { throw new Error('blocked'); },
      removeItem: () => {},
    };
    expect(loadCredit(refusing)).toBe(true);
    expect(() => saveCredit(refusing, false)).not.toThrow();
  });
});
