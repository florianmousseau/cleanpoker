import { describe, expect, it, vi } from 'vitest';
import type { Extras, Translation } from './i18n';
import { DE, EN, FR } from './i18n/all';
import type { Lang } from './lang.svelte';
import { roomWords } from './room-words.svelte';

vi.mock('$app/env', () => ({ browser: false }));

const WORDS: Partial<Record<Lang, Translation & Extras>> = { fr: FR, en: EN, de: DE };

// A room whose language is `current`, with fetches that settle when told to.
function room(start: Lang = 'en') {
  let current: Lang = start;
  const pending: { l: Lang; kind: 'words' | 'extras'; settle: () => void; fail: () => void }[] = [];
  const fetchOf = (kind: 'words' | 'extras') => (l: Lang) =>
    new Promise<Translation & Extras>((resolve, reject) => {
      pending.push({ l, kind, settle: () => resolve(WORDS[l]!), fail: () => reject(new Error('offline')) });
    });
  const words = roomWords(() => WORDS[start]!, {
    load: fetchOf('words'),
    loadExtras: fetchOf('extras'),
    lang: () => current,
    apply: (l) => (current = l),
  });
  const settle = async (pick: (p: (typeof pending)[number]) => boolean = () => true, how: 'settle' | 'fail' = 'settle') => {
    for (const p of pending.splice(0).filter((p) => (pick(p) ? true : (pending.push(p), false)))) p[how]();
    await new Promise((r) => setTimeout(r, 0));
  };
  return { words, pending, settle, lang: () => current };
}

describe('the words of a room', () => {
  it('speaks the language the page was loaded with', () => {
    const { words } = room('fr');
    expect(words.current.join.title).toBe('Rejoindre la salle');
    expect(words.extras).toBeNull();
  });

  it('switches the words and the language together, once the dictionary is here', async () => {
    const { words, settle, lang } = room('en');
    const switching = words.change('de');
    expect(words.current.join.title).toBe('Join the room');
    expect(lang()).toBe('en');
    await settle();
    await switching;
    expect(words.current.join.title).toBe('Dem Raum beitreten');
    expect(lang()).toBe('de');
  });

  it('keeps the last language asked when two switches cross', async () => {
    const { words, settle, lang } = room('en');
    void words.change('de');
    void words.change('fr');
    await settle((p) => p.l === 'fr');
    await settle((p) => p.l === 'de');
    expect(words.current.join.title).toBe('Rejoindre la salle');
    expect(lang()).toBe('fr');
  });

  it('stays in its language when the fetch fails, and can try again', async () => {
    const { words, settle, lang } = room('en');
    const failing = words.change('de');
    await settle(() => true, 'fail');
    await failing;
    expect(words.current.join.title).toBe('Join the room');
    expect(lang()).toBe('en');

    void words.change('de');
    await settle();
    expect(lang()).toBe('de');
  });

  it('fetches the option words only when asked, once, in the room language', async () => {
    const { words, pending, settle } = room('fr');
    expect(pending).toHaveLength(0);
    words.wantExtras();
    words.wantExtras();
    expect(pending.map((p) => `${p.kind}:${p.l}`)).toEqual(['extras:fr']);
    await settle();
    expect(words.extras?.qr.hide).toBe('Masquer le QR code');
  });

  it('switches the option words with the rest once they are in use', async () => {
    const { words, pending, settle } = room('fr');
    words.wantExtras();
    await settle();
    void words.change('de');
    expect(pending.map((p) => `${p.kind}:${p.l}`).sort()).toEqual(['extras:de', 'words:de']);
    await settle();
    expect(words.current.join.title).toBe('Dem Raum beitreten');
    expect(words.extras?.qr.hide).toBe('QR-Code ausblenden');
  });

  it('does not fetch option words nobody opened on a switch', async () => {
    const { words, pending } = room('fr');
    void words.change('de');
    expect(pending.map((p) => p.kind)).toEqual(['words']);
  });

  it('drops option words that arrive for a language already left', async () => {
    const { words, settle } = room('fr');
    words.wantExtras();
    void words.change('de');
    await settle((p) => p.l === 'de');
    await settle((p) => p.l === 'fr');
    expect(words.extras?.qr.hide).toBe('QR-Code ausblenden');
  });

  it('asks again for option words whose fetch failed', async () => {
    const { words, pending, settle } = room('fr');
    words.wantExtras();
    await settle(() => true, 'fail');
    expect(words.extras).toBeNull();
    words.wantExtras();
    expect(pending).toHaveLength(1);
    await settle();
    expect(words.extras?.qr.show).toBe('QR code');
  });
});
