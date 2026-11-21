/*
 * A company's own look, read from its home page: the colour it declares for
 * itself and the name it gives. Pure functions; the fetching lives in
 * `src/routes/api/marque/+server.ts`.
 */

export type Marque = { nom: string; couleur: string | null };

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
  for (const m of balise.matchAll(/([a-z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/gi)) {
    res[m[1].toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? '';
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
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
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

function nomDuSite(liste: Record<string, string>[], html: string, hote: string): string {
  const titre = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1];
  const brut =
    meta(liste, 'og:site_name') ??
    meta(liste, 'application-name') ??
    titre?.split(/\s[|\-–—:]\s/)[0] ??
    hote.replace(/^www\./, '').split('.')[0];
  return decoder(brut).replace(/\s+/g, ' ').trim().slice(0, 30);
}

/** The name and colour a home page declares for its company. */
export function marqueDe(html: string, hote: string): Marque {
  const liste = metas(html);
  const declaree = meta(liste, 'theme-color') ?? meta(liste, 'msapplication-tilecolor');
  const couleur = declaree ? couleurCss(declaree) : null;
  return {
    nom: nomDuSite(liste, html, hote),
    couleur: couleur && !NEUTRES.has(couleur) ? couleur : null,
  };
}
