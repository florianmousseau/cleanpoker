/*
 * Fetching a company's site from the worker. Every hop goes back through
 * `adresseSure`: a public site must not bounce the request inward.
 */
import { adresseSure, lireManifeste, manifesteDe } from './marque.ts';

const REDIRECTIONS_MAX = 3;

/** The final response for this address, or null when a hop is refused or too many. */
export async function charger(depart: URL, signal: AbortSignal, accept: string): Promise<{ res: Response; url: URL } | null> {
  let url: URL | null = depart;
  for (let saut = 0; url && saut <= REDIRECTIONS_MAX; saut++) {
    const res: Response = await fetch(url, { redirect: 'manual', signal, headers: { accept } });
    const vers = res.headers.get('location');
    if (res.status < 300 || res.status >= 400 || !vers) return { res, url };
    url = adresseSure(new URL(vers, url).href);
  }
  return null;
}

/** At most `max` bytes of the body; the rest is never downloaded. */
export async function lireDebut(res: Response, max: number): Promise<Uint8Array> {
  const tout = new Uint8Array(max);
  let total = 0;
  const lecteur = res.body?.getReader();
  while (lecteur && total < max) {
    const { done, value } = await lecteur.read();
    if (done) break;
    const part = value.subarray(0, max - total);
    tout.set(part, total);
    total += part.length;
  }
  await lecteur?.cancel().catch(() => {});
  return tout.slice(0, total);
}

/** The home page of this site, as text, or null. */
export async function pageDAccueil(cible: URL, signal: AbortSignal): Promise<{ html: string; url: URL } | null> {
  const r = await charger(cible, signal, 'text/html');
  if (!r || !r.res.ok || !(r.res.headers.get('content-type') ?? '').includes('html')) return null;
  return { html: new TextDecoder().decode(await lireDebut(r.res, 256_000)), url: r.url };
}

/** The colour and icons of the manifest this page links to, if any. */
export async function manifeste(html: string, base: URL, signal: AbortSignal): Promise<{ couleur: string | null; icones: string[] }> {
  const lien = manifesteDe(html, base);
  const cible = lien && adresseSure(lien.href);
  const r = cible ? await charger(cible, signal, 'application/manifest+json, application/json').catch(() => null) : null;
  if (!r?.res.ok) return { couleur: null, icones: [] };
  return lireManifeste(new TextDecoder().decode(await lireDebut(r.res, 64_000)), r.url);
}
