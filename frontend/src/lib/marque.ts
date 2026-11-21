/*
 * A company's own look, read from its home page: the colour it declares for
 * itself and the name it gives. Pure functions; the fetching lives in
 * `src/routes/api/marque/+server.ts`.
 */

export type Marque = { nom: string; couleur: string | null; site: string };

const HOTE_INTERDIT = /^(localhost|.*\.(localhost|local|internal|lan|home|arpa|test|invalid|example))$/i;
const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

/**
 * The address a visitor typed, as a URL safe to fetch from the server, or
 * null. Only a public host name on the default port: no IP, no credentials.
 */
export function adresseSure(saisie: string): URL | null {
  const brut = saisie.trim();
  if (!brut || brut.length > 200) return null;
  let url: URL;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(brut) ? brut : `https://${brut}`);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (url.username || url.password || url.port) return null;
  const hote = url.hostname;
  if (!hote.includes('.') || hote.startsWith('[') || IPV4.test(hote) || HOTE_INTERDIT.test(hote)) return null;
  return url;
}

function attributs(balise: string): Record<string, string> {
  const res: Record<string, string> = {};
  for (const m of balise.matchAll(/\s([a-z:-]+)=(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/gi)) {
    res[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return res;
}

function metas(html: string): Record<string, string>[] {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attributs(m[0]));
}

function meta(liste: Record<string, string>[], cle: string): string | null {
  const trouve = liste.find((a) => (a.name ?? a.property ?? '').toLowerCase() === cle && a.content);
  return trouve ? trouve.content : null;
}

const ENTITES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decoder(texte: string): string {
  return texte
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (e, n) => ENTITES[n.toLowerCase()] ?? e);
}

/** A CSS colour as #rrggbb, for the forms sites actually declare. */
export function couleurCss(valeur: string): string | null {
  const v = valeur.trim().toLowerCase();
  const court = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(v);
  if (court) return `#${court[1]}${court[1]}${court[2]}${court[2]}${court[3]}${court[3]}`;
  if (/^#[0-9a-f]{6}$/.test(v)) return v;
  if (/^#[0-9a-f]{8}$/.test(v)) return v.slice(0, 7);
  const rgb = /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/.exec(v);
  if (rgb) {
    const canaux = rgb.slice(1, 4).map(Number);
    if (canaux.some((c) => c > 255)) return null;
    return '#' + canaux.map((c) => c.toString(16).padStart(2, '0')).join('');
  }
  return null;
}

// Every browser's default; a site that declares it has declared nothing.
const NEUTRES = new Set(['#ffffff', '#000000']);

const sansAccent = (t: string) => t.normalize('NFD').replace(/[^a-z0-9]/gi, '').toLowerCase();

function etiquette(hote: string): string {
  const parties = hote.replace(/^www\./, '').split('.');
  return parties.length > 1 ? parties.at(-2) ?? parties[0] : parties[0];
}

// A tagline often fills og:site_name or the title ("Banque pour les
// particuliers"); the candidate that matches the domain is the company.
function nomDuSite(liste: Record<string, string>[], html: string, hote: string): string {
  const titre = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1] ?? '';
  const candidats = [meta(liste, 'og:site_name'), meta(liste, 'application-name'), ...titre.split(/\s[|\-–—:]\s/)]
    .filter((c): c is string => !!c && !!c.trim())
    .map((c) => decoder(c).replace(/[\u200b-\u200f\u2060\ufeff]/g, '').replace(/\s+/g, ' ').trim())
    .filter((c) => /\p{L}/u.test(c));
  const mot = etiquette(hote);
  const cle = sansAccent(mot);
  const qui = candidats.find((c) => {
    const n = sansAccent(c);
    return n.length >= 2 && (n.includes(cle) || cle.includes(n));
  });
  // A long match is a sentence about the company, not its name.
  if (qui && qui.length <= 24) return qui;
  if (qui || !candidats[0] || candidats[0].length > 24) return mot.charAt(0).toUpperCase() + mot.slice(1);
  return candidats[0];
}

function liens(html: string): Record<string, string>[] {
  return [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => attributs(m[0]));
}

const taille = (a: Record<string, string>) => Math.max(0, ...(a.sizes ?? '').split(/\s+/).map((t) => Number.parseInt(t, 10) || 0));
const vectoriel = (a: Record<string, string>) => /svg/i.test(a.type ?? '') || /\.svg(\?|$)/i.test(a.href ?? '');

/**
 * The icons a home page offers, best first: the touch icon (a square of
 * 180 px or so), then the declared icons by size, then the usual paths.
 * SVG is left out: served from this origin it could carry a script.
 */
export function iconesDe(html: string, base: URL): string[] {
  const declares = liens(html)
    .filter((a) => a.href && /(^|\s)(apple-touch-icon(-precomposed)?|icon)(\s|$)/i.test(a.rel ?? '') && !vectoriel(a))
    .sort((a, b) => Number(/apple/i.test(b.rel)) - Number(/apple/i.test(a.rel)) || taille(b) - taille(a))
    .map((a) => a.href);
  const urls = [...declares, '/apple-touch-icon.png', '/favicon.ico'].flatMap((h) => {
    try {
      return [new URL(decoder(h), base).href];
    } catch {
      return [];
    }
  });
  return [...new Set(urls)].slice(0, 5);
}

/** The web app manifest a home page links to, or null. */
export function manifesteDe(html: string, base: URL): URL | null {
  const lien = liens(html).find((a) => /(^|\s)manifest(\s|$)/i.test(a.rel ?? '') && a.href);
  try {
    return lien ? new URL(decoder(lien.href), base) : null;
  } catch {
    return null;
  }
}

/** The colour and icons (largest first, no SVG) a manifest declares. */
export function lireManifeste(texte: string, base: URL): { couleur: string | null; icones: string[] } {
  try {
    const m = JSON.parse(texte) as { theme_color?: unknown; icons?: unknown };
    const brute = typeof m.theme_color === 'string' ? couleurCss(m.theme_color) : null;
    const icones = (Array.isArray(m.icons) ? m.icons : [])
      .filter((i): i is Record<string, string> => typeof i === 'object' && i !== null && typeof i.src === 'string')
      .filter((i) => !vectoriel({ type: i.type, href: i.src }))
      .sort((a, b) => taille(b) - taille(a))
      .flatMap((i) => {
        try {
          return [new URL(i.src, base).href];
        } catch {
          return [];
        }
      });
    return { couleur: brute && !NEUTRES.has(brute) ? brute : null, icones };
  } catch {
    return { couleur: null, icones: [] };
  }
}

/** The last resort for an icon: a public favicon service, asked by the worker only. */
export const iconeDeSecours = (hote: string) => `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hote)}&sz=128`;

/** The image type of these bytes, or null when they are not a raster image a browser shows. */
export function typeImage(o: Uint8Array): string | null {
  const debut = (...b: number[]) => b.every((v, i) => o[i] === v);
  if (debut(0x89, 0x50, 0x4e, 0x47)) return 'image/png';
  if (debut(0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (debut(0x47, 0x49, 0x46, 0x38)) return 'image/gif';
  if (debut(0x52, 0x49, 0x46, 0x46) && String.fromCodePoint(...o.slice(8, 12)) === 'WEBP') return 'image/webp';
  if (debut(0, 0, 1, 0)) return 'image/x-icon';
  return null;
}

/** The name and colour a home page declares for its company. */
export function marqueDe(html: string, hote: string): Marque {
  const liste = metas(html);
  const declaree = meta(liste, 'theme-color') ?? meta(liste, 'msapplication-tilecolor');
  const couleur = declaree ? couleurCss(declaree) : null;
  return {
    nom: nomDuSite(liste, html, hote),
    couleur: couleur && !NEUTRES.has(couleur) ? couleur : null,
    site: hote,
  };
}
