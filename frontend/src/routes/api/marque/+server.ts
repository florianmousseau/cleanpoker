/**
 * Reads a company's home page and answers its name and colour, nothing else:
 * the page itself never reaches the visitor, so this is no open proxy.
 */
import type { RequestHandler } from '@sveltejs/kit';
import { adresseSure, marqueDe } from '#lib/marque.ts';

export const prerender = false;

const REDIRECTIONS_MAX = 3;
const OCTETS_MAX = 256_000;
const DELAI_MS = 5000;

async function lireDebut(res: Response): Promise<string> {
  if (!res.body) return '';
  const lecteur = res.body.getReader();
  const morceaux: Uint8Array[] = [];
  let total = 0;
  while (total < OCTETS_MAX) {
    const { done, value } = await lecteur.read();
    if (done) break;
    morceaux.push(value);
    total += value.length;
  }
  await lecteur.cancel().catch(() => {});
  const tout = new Uint8Array(total);
  let i = 0;
  for (const m of morceaux) {
    tout.set(m, i);
    i += m.length;
  }
  return new TextDecoder().decode(tout.slice(0, OCTETS_MAX));
}

// Each hop is checked again: a public site must not bounce the request inward.
async function pageDe(depart: URL): Promise<{ html: string; hote: string } | null> {
  let url: URL | null = depart;
  const signal = AbortSignal.timeout(DELAI_MS);
  for (let saut = 0; url && saut <= REDIRECTIONS_MAX; saut++) {
    const res = await fetch(url, { redirect: 'manual', signal, headers: { accept: 'text/html' } });
    const vers = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && vers) {
      url = adresseSure(new URL(vers, url).href);
      continue;
    }
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('html')) return null;
    return { html: await lireDebut(res), hote: url.hostname };
  }
  return null;
}

const json = (corps: unknown, status: number) =>
  new Response(JSON.stringify(corps), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': status === 200 ? 'public, max-age=86400' : 'no-store' },
  });

export const GET: RequestHandler = async ({ url }) => {
  const cible = adresseSure(url.searchParams.get('site') ?? '');
  if (!cible) return json({ erreur: 'adresse' }, 400);
  try {
    const page = await pageDe(cible);
    return page ? json(marqueDe(page.html, page.hote), 200) : json({ erreur: 'page' }, 422);
  } catch {
    return json({ erreur: 'page' }, 422);
  }
};
