/*
 * A team's look, carried by the room address alone: ?equipe=Alpha&couleur=d0453a&logo=alpha.fr.
 * Nothing is stored; whoever opens the link sees the same room.
 */

export type Equipe = { nom: string; logo: string; clair: string; sombre: string } | null;

const HEX = /^[0-9a-f]{6}$/i;
// The site whose icon the room shows, through this origin's /api/logo.
const HOTE = /^[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63}){1,4}$/;

function canaux(hex: string): number[] {
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function luminance(rgb: number[]): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colours. */
export function contraste(a: number[], b: number[]): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

function versHex(rgb: number[]): string {
  return '#' + rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
}

// Moves the colour toward black or white until it reaches 4.5:1 against
// the text that sits on it: a team colour never breaks the AA contrast.
function ajuster(rgb: number[], texte: number[], vers: number): string {
  let c = rgb;
  for (let i = 0; i < 40 && contraste(c, texte) < 4.5; i++) c = c.map((v) => v + (vers - v) * 0.08);
  return versHex(c);
}

const BLANC = [255, 255, 255];
const NUIT = [13, 17, 23];

/** The team of a room address, or null when it carries none. */
export function equipeDe(params: { get(name: string): string | null }): Equipe {
  const nom = (params.get('equipe') ?? '').trim().slice(0, 30);
  const couleur = params.get('couleur') ?? '';
  const site = (params.get('logo') ?? '').toLowerCase();
  const logo = HOTE.test(site) ? site : '';
  if (!HEX.test(couleur)) return nom || logo ? { nom, logo, clair: '', sombre: '' } : null;
  const rgb = canaux(couleur);
  return { nom, logo, clair: ajuster(rgb, BLANC, 0), sombre: ajuster(rgb, NUIT, 255) };
}

/** The query a room address carries for a team, deck included. */
export function requeteEquipe(nom: string, couleur: string, cartes: string[], logo = ''): string {
  const p = new URLSearchParams();
  if (nom.trim()) p.set('equipe', nom.trim().slice(0, 30));
  if (HEX.test(couleur.replace('#', ''))) p.set('couleur', couleur.replace('#', '').toLowerCase());
  if (HOTE.test(logo)) p.set('logo', logo);
  if (cartes.length) p.set('cards', cartes.join(','));
  const q = p.toString();
  return q ? `?${q}` : '';
}

/** A colour typed by hand, as #rrggbb, or null while it is not one yet. */
export function couleurSaisie(saisie: string): string | null {
  const hex = saisie.trim().replace(/^#/, '');
  return HEX.test(hex) ? `#${hex.toLowerCase()}` : null;
}

/** Black or white, whichever reads better on this colour. */
export function texteSur(couleur: string): string {
  const hex = couleur.replace('#', '');
  if (!HEX.test(hex)) return '#000000';
  const rgb = canaux(hex);
  return contraste(rgb, BLANC) >= contraste(rgb, [0, 0, 0]) ? '#ffffff' : '#000000';
}
