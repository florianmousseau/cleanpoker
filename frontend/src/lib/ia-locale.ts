/*
 * Chrome's built-in model (Prompt API, stable on the web since Chrome 148).
 * It runs on the reader's machine: the story never leaves it, and nothing is
 * downloaded from this site. Other browsers have no LanguageModel at all.
 */

type Availability = 'unavailable' | 'downloadable' | 'downloading' | 'available';
type LanguageOptions = { expectedInputs: { type: 'text'; languages: string[] }[]; expectedOutputs: { type: 'text'; languages: string[] }[] };
type Monitor = { addEventListener(type: 'downloadprogress', cb: (e: { loaded: number }) => void): void };
type Session = { promptStreaming(input: string, opts?: { signal?: AbortSignal }): AsyncIterable<string>; destroy(): void };
export type LanguageModelApi = {
  availability(opts: LanguageOptions): Promise<Availability>;
  create(opts: LanguageOptions & { monitor?: (m: Monitor) => void; signal?: AbortSignal }): Promise<Session>;
};

/** The browser's LanguageModel, or null where there is none. */
export function modeleLocal(g: unknown = globalThis): LanguageModelApi | null {
  const api = (g as { LanguageModel?: LanguageModelApi }).LanguageModel;
  return api && typeof api.availability === 'function' ? api : null;
}

const options = (lang: string): LanguageOptions => ({
  expectedInputs: [{ type: 'text', languages: [lang, 'en'] }],
  expectedOutputs: [{ type: 'text', languages: [lang] }],
});

/**
 * The language the model can answer in: the reader's, else English, else
 * null when the model cannot run on this machine.
 */
export async function langueDeReponse(api: LanguageModelApi, lang: string): Promise<string | null> {
  for (const l of lang === 'en' ? ['en'] : [lang, 'en']) {
    try {
      if ((await api.availability(options(l))) !== 'unavailable') return l;
    } catch {
      // An unsupported language throws in some versions: try the next one.
    }
  }
  return null;
}

const NOMS: Record<string, string> = { fr: 'French', en: 'English', es: 'Spanish', de: 'German', pt: 'Portuguese' };

/** The instruction given to the model for one story. */
export function consigne(story: string, lang: string): string {
  return [
    'You help an agile team just before it estimates a user story in planning poker.',
    `Story: "${story}"`,
    `Answer in ${NOMS[lang] ?? 'English'}, in plain text, with no preamble and no estimate.`,
    'First, at most five short lines starting with "- ": what the story leaves out (tests, data migration, access rights, edge cases, dependencies, unclear terms).',
    'Then, only if the story looks too large for one sprint, one line proposing how to split it.',
  ].join('\n');
}

/** Stream the model's analysis of a story, chunk by chunk. */
export async function analyser(
  api: LanguageModelApi,
  story: string,
  lang: string,
  { onChunk, onProgress, signal }: { onChunk: (text: string) => void; onProgress?: (loaded: number) => void; signal?: AbortSignal },
): Promise<void> {
  const session = await api.create({
    ...options(lang),
    signal,
    monitor: (m) => m.addEventListener('downloadprogress', (e) => onProgress?.(e.loaded)),
  });
  try {
    for await (const chunk of session.promptStreaming(consigne(story, lang), { signal })) onChunk(chunk);
  } finally {
    session.destroy();
  }
}
