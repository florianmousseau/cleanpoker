import { describe, expect, it } from 'vitest';
import { analyser, consigne, langueDeReponse, modeleLocal, type LanguageModelApi } from './ia-locale.ts';

function fake(available: Record<string, string>, chunks: string[] = []) {
  const created: unknown[] = [];
  let destroyed = false;
  const api = {
    availability: async (o: { expectedOutputs: { languages: string[] }[] }) => available[o.expectedOutputs[0].languages[0]] ?? 'unavailable',
    create: async (o: unknown) => {
      created.push(o);
      return {
        async *promptStreaming() { for (const c of chunks) yield c; },
        destroy() { destroyed = true; },
      };
    },
  } as unknown as LanguageModelApi;
  return { api, created, isDestroyed: () => destroyed };
}

describe('modeleLocal', () => {
  it('is null in a browser without the API', () => {
    expect(modeleLocal({})).toBeNull();
  });
  it('returns the API where it exists', () => {
    const { api } = fake({});
    expect(modeleLocal({ LanguageModel: api })).toBe(api);
  });
});

describe('langueDeReponse', () => {
  it('prefers the reader language', async () => {
    expect(await langueDeReponse(fake({ fr: 'downloadable', en: 'available' }).api, 'fr')).toBe('fr');
  });
  it('falls back to English', async () => {
    expect(await langueDeReponse(fake({ en: 'available' }).api, 'de')).toBe('en');
  });
  it('is null when the model cannot run here', async () => {
    expect(await langueDeReponse(fake({}).api, 'fr')).toBeNull();
  });
});

describe('consigne', () => {
  it('names the story and the answer language, and asks for no estimate', () => {
    const c = consigne('CSV export', 'pt');
    expect(c).toContain('"CSV export"');
    expect(c).toContain('Portuguese');
    expect(c).toContain('no estimate');
  });
});

describe('analyser', () => {
  it('streams the chunks and frees the session', async () => {
    const f = fake({ en: 'available' }, ['- Tests', '\n- Migration']);
    let out = '';
    await analyser(f.api, 'CSV export', 'en', { onChunk: (c) => (out += c) });
    expect(out).toBe('- Tests\n- Migration');
    expect(f.isDestroyed()).toBe(true);
  });
});
