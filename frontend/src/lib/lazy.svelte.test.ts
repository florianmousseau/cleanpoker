import { describe, expect, it, vi } from 'vitest';
import { fetchedOnce } from './lazy.svelte';

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('fetchedOnce', () => {
  it('fetches nothing until it is wanted, then once', async () => {
    const load = vi.fn(() => Promise.resolve({ default: 'panel' }));
    const part = fetchedOnce(load);
    expect(load).not.toHaveBeenCalled();
    expect(part.current).toBeNull();

    part.want();
    part.want();
    await settle();
    expect(part.current).toBe('panel');

    part.want();
    await settle();
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('tries again after a fetch that failed', async () => {
    const load = vi
      .fn<() => Promise<{ default: string }>>()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ default: 'panel' });
    const part = fetchedOnce(load);
    part.want();
    await settle();
    expect(part.current).toBeNull();

    part.want();
    await settle();
    expect(part.current).toBe('panel');
    expect(load).toHaveBeenCalledTimes(2);
  });
});
