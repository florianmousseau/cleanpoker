/**
 * Reads a company's home page and answers its name, colour and host, nothing
 * else: the page itself never reaches the visitor, so this is no open proxy.
 */
import type { RequestHandler } from '@sveltejs/kit';
import { adresseSure, marqueDe } from '#lib/marque.ts';
import { pageDAccueil } from '#lib/marque-reseau.ts';

export const prerender = false;

const json = (corps: unknown, status: number, garder = status === 200) =>
  new Response(JSON.stringify(corps), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': garder ? 'public, max-age=86400' : 'no-store' },
  });

// A home page that refuses robots still has an icon at its usual path:
// the host comes back so the logo is tried all the same.
const sansPage = (cible: URL) => {
  const parties = cible.hostname.replace(/^www\./, '').split('.');
  const mot = parties[Math.max(0, parties.length - 2)];
  return json({ nom: mot.charAt(0).toUpperCase() + mot.slice(1), couleur: null, site: cible.hostname }, 200, false);
};

export const GET: RequestHandler = async ({ url }) => {
  const cible = adresseSure(url.searchParams.get('site') ?? '');
  if (!cible) return json({ erreur: 'adresse' }, 400);
  try {
    const page = await pageDAccueil(cible, AbortSignal.timeout(5000));
    return page ? json(marqueDe(page.html, page.url.hostname), 200) : sansPage(cible);
  } catch {
    return sansPage(cible);
  }
};
