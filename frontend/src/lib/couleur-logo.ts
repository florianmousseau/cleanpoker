/*
 * The colour of a logo, for a site that declares none: the most frequent
 * saturated colour of its pixels. White, black and greys are backgrounds
 * and outlines, never the brand.
 */

const SATURATION_MIN = 48;

/** The dominant brand colour of RGBA pixels, as #rrggbb, or null when the logo has none. */
export function couleurDominante(pixels: ArrayLike<number>): string | null {
  const paniers = new Map<number, { n: number; r: number; g: number; b: number }>();
  for (let i = 0; i + 3 < pixels.length; i += 4) {
    const [r, g, b, a] = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
    if (a < 128 || Math.max(r, g, b) - Math.min(r, g, b) < SATURATION_MIN) continue;
    const cle = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const p = paniers.get(cle) ?? { n: 0, r: 0, g: 0, b: 0 };
    paniers.set(cle, { n: p.n + 1, r: p.r + r, g: p.g + g, b: p.b + b });
  }
  let meilleur: { n: number; r: number; g: number; b: number } | null = null;
  for (const p of paniers.values()) if (!meilleur || p.n > meilleur.n) meilleur = p;
  if (!meilleur) return null;
  const m = meilleur;
  return '#' + [m.r, m.g, m.b].map((c) => Math.round(c / m.n).toString(16).padStart(2, '0')).join('');
}

/** The dominant colour of a loaded same-origin image, or null. */
export function couleurDuLogo(img: HTMLImageElement): string | null {
  try {
    const toile = document.createElement('canvas');
    toile.width = toile.height = 32;
    const ctx = toile.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, 32, 32);
    return couleurDominante(ctx.getImageData(0, 0, 32, 32).data);
  } catch {
    return null;
  }
}
