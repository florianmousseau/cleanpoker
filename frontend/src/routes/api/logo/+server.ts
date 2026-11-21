/**
 * A company's icon, fetched by the worker and served from this origin: the
 * room keeps `img-src 'self'` and no visitor ever contacts the company's site.
 * Raster images only, checked on their bytes; SVG never, it could run a script.
 */
import type { RequestHandler } from '@sveltejs/kit';
import { adresseSure, iconesDe, typeImage } from '#lib/marque.ts';
import { charger, lireDebut, pageDAccueil } from '#lib/marque-reseau.ts';

export const prerender = false;

const OCTETS_MAX = 200_000;

async function premiereImage(urls: string[], signal: AbortSignal): Promise<{ octets: Uint8Array; type: string } | null> {
  for (const brute of urls) {
    const cible = adresseSure(brute);
    const r = cible ? await charger(cible, signal, 'image/*').catch(() => null) : null;
    if (!r?.res.ok) continue;
    const octets = await lireDebut(r.res, OCTETS_MAX + 1);
    const type = typeImage(octets);
    if (type && octets.length <= OCTETS_MAX) return { octets, type };
  }
  return null;
}

export const GET: RequestHandler = async ({ url }) => {
  const cible = adresseSure(url.searchParams.get('site') ?? '');
  if (!cible) return new Response(null, { status: 400 });
  try {
    const signal = AbortSignal.timeout(8000);
    const page = await pageDAccueil(cible, signal);
    const image = await premiereImage(iconesDe(page?.html ?? '', page?.url ?? cible), signal);
    if (!image) return new Response(null, { status: 404, headers: { 'cache-control': 'public, max-age=3600' } });
    return new Response(new Blob([image.octets as Uint8Array<ArrayBuffer>]), {
      headers: {
        'content-type': image.type,
        'cache-control': 'public, max-age=86400',
        'content-security-policy': "default-src 'none'",
        'x-content-type-options': 'nosniff',
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
};
