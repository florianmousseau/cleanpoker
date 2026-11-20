import { loadDictionary } from '#lib/dictionaries.ts';
import { lang } from '#lib/lang.svelte.ts';

// Awaited before the page renders: on the server, which speaks English, and
// in the browser before hydration, in the visitor's language. The room never
// shows a missing string, and fetches one language instead of five.
export async function load() {
  return { T: await loadDictionary(lang.current) };
}
