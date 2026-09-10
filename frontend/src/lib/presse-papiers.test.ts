import { afterEach, describe, expect, it, vi } from 'vitest';
import { copierTexte } from './presse-papiers';

function stubClipboard(value: unknown) {
  vi.stubGlobal('navigator', value === undefined ? {} : { clipboard: value });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('copierTexte', () => {
  it('copies and says so', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard({ writeText });
    await expect(copierTexte('https://cleanpoker.dev/abc')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('https://cleanpoker.dev/abc');
  });

  // The room URL is the only thing anyone ever shares, and a browser that
  // refuses the write used to throw into nothing: the label stayed on "Copy
  // link" and the host pasted whatever was in the clipboard before.
  it('says no when the browser refuses the write', async () => {
    const writeText = vi
      .fn()
      .mockRejectedValue(new DOMException('Write permission denied.', 'NotAllowedError'));
    stubClipboard({ writeText });
    await expect(copierTexte('https://cleanpoker.dev/abc')).resolves.toBe(false);
  });

  it('says no when the browser has no clipboard API at all', async () => {
    stubClipboard(undefined);
    await expect(copierTexte('https://cleanpoker.dev/abc')).resolves.toBe(false);
  });

  it('says no when the clipboard object carries no writeText', async () => {
    stubClipboard({});
    await expect(copierTexte('https://cleanpoker.dev/abc')).resolves.toBe(false);
  });

  it('never lets a rejection escape as an unhandled one', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('boom'));
    stubClipboard({ writeText });
    const unhandled = vi.fn();
    process.on('unhandledRejection', unhandled);
    await copierTexte('x');
    await new Promise((r) => setTimeout(r, 0));
    process.off('unhandledRejection', unhandled);
    expect(unhandled).not.toHaveBeenCalled();
  });
});
