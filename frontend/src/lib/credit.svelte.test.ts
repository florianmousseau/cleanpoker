import { beforeEach, describe, expect, it, vi } from 'vitest';

function memoryStorage(initial: Record<string, string> = {}) {
  const items = new Map(Object.entries(initial));
  return {
    getItem: (k: string) => items.get(k) ?? null,
    setItem: (k: string, v: string) => void items.set(k, v),
    removeItem: (k: string) => void items.delete(k),
    items,
  };
}

describe('credit', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it('adds the line by default', async () => {
    vi.stubGlobal('localStorage', memoryStorage());
    const { credit } = await import('./credit.svelte');
    expect(credit.on).toBe(true);
    expect(credit.line('Estimated with PokerAgile: https://pokeragile.com')).toBe('Estimated with PokerAgile: https://pokeragile.com');
  });

  it('drops the line once unchecked, and keeps the choice for the next visit', async () => {
    const storage = memoryStorage();
    vi.stubGlobal('localStorage', storage);
    const first = await import('./credit.svelte');
    first.credit.set(false);
    expect(first.credit.on).toBe(false);
    expect(first.credit.line('x')).toBeNull();
    expect(storage.items.get('cleanpoker:credit')).toBe('off');

    vi.resetModules();
    const next = await import('./credit.svelte');
    expect(next.credit.on).toBe(false);
  });

  it('answers yes where there is no storage, as on the server', async () => {
    const { credit } = await import('./credit.svelte');
    expect(credit.on).toBe(true);
  });
});
