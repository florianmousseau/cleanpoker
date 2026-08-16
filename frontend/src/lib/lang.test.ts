import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('$app/environment', () => ({ browser: true }));

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
