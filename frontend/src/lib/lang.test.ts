import { readFileSync } from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('$app/env', () => ({ browser: true }));

describe('pickLang', () => {
  beforeEach(() => {
    vi.stubGlobal('document', { documentElement: { lang: 'en' }, cookie: '' });
  });

  it('keeps the language the visitor chose over the browser one', async () => {
    const { pickLang } = await import('./lang.svelte');
    expect(pickLang('theme=dark; lang=de', ['fr-FR', 'en'])).toBe('de');
  });

  it('falls back to the first browser language the site speaks', async () => {
    const { pickLang } = await import('./lang.svelte');
    expect(pickLang('', ['fr-FR', 'en-US'])).toBe('fr');
    expect(pickLang('', ['nl-BE', 'pt-BR', 'fr'])).toBe('pt');
    expect(pickLang('', ['ES'])).toBe('es');
    expect(pickLang('lang=xx', ['de-AT'])).toBe('de');
  });

  it('answers English when nothing matches or nothing is known', async () => {
    const { pickLang } = await import('./lang.svelte');
    expect(pickLang('', ['ja-JP', 'nl'])).toBe('en');
    expect(pickLang('', [])).toBe('en');
  });
});

describe('lang.visit', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('document', { documentElement: { lang: 'en' }, cookie: '' });
    vi.stubGlobal('navigator', { languages: ['en-US'] });
  });

  it('records the language of a localized home for the room opened next', async () => {
    const { lang } = await import('./lang.svelte');
    lang.visit('fr');
    expect(lang.current).toBe('fr');
    expect(document.cookie).toContain('lang=fr');
  });

  it('leaves a chosen language alone on the English home', async () => {
    const { lang } = await import('./lang.svelte');
    lang.set('es');
    lang.visit('en');
    expect(lang.current).toBe('es');
  });

  it('is called by the home template with its locale', () => {
    const home = readFileSync(new URL('./HomepageTemplate.svelte', import.meta.url), 'utf8');
    expect(home).toContain('lang.visit(locale)');
  });
});

describe('lang.set', () => {
  let doc: Document;

  beforeEach(() => {
    doc = { documentElement: { lang: 'en' }, cookie: '' } as unknown as Document;
    vi.stubGlobal('document', doc);
  });

  it('moves <html lang> to the language now on screen', async () => {
    // hooks.server.ts stamps the attribute once per server render, so a
    // client-side switch used to leave German text under lang="fr".
    const { lang } = await import('./lang.svelte');
    lang.set('de');
    expect(doc.documentElement.lang).toBe('de');
  });

  it('still records the choice in the cookie', async () => {
    const { lang } = await import('./lang.svelte');
    lang.set('pt');
    expect(doc.cookie).toContain('lang=pt');
  });
});
