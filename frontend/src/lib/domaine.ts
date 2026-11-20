/** The site's address since 2026-11-20. */
export const ORIGINE = 'https://pokeragile.com';

// The old domain and the www hosts move to the apex, page for page. The probes
// stay where the cockpit reads them, so a monitor never follows a redirect.
const ANCIENS = new Set(['cleanpoker.dev', 'www.cleanpoker.dev', 'www.pokeragile.com']);
const SONDES = /^\/(health(\/|$)|deploye\.json$)/;

/** The address a request moves to, or null when it is served where it is. */
export function versNouveauDomaine(url: URL): string | null {
  if (!ANCIENS.has(url.hostname) || SONDES.test(url.pathname)) return null;
  return `${ORIGINE}${url.pathname}${url.search}`;
}
