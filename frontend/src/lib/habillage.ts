/*
 * The last team look used to create a room, kept in this browser only, so
 * the next visit to the home page starts dressed the same way. No account:
 * nothing leaves the device.
 */

export type Habillage = { nom: string; couleur: string; site: string };

type Rangement = Pick<Storage, 'getItem' | 'setItem'>;

const CLE = 'cleanpoker:habillage';
const HEX = /^#[0-9a-f]{6}$/;

function texte(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** The look kept in this browser, or null when there is none or it is not one. */
export function chargerHabillage(rangement: Rangement | null): Habillage | null {
  try {
    const brut: unknown = JSON.parse(rangement?.getItem(CLE) ?? 'null');
    if (typeof brut !== 'object' || brut === null) return null;
    const o = brut as Record<string, unknown>;
    const couleur = texte(o.couleur, 7).toLowerCase();
    if (!HEX.test(couleur)) return null;
    return { nom: texte(o.nom, 30), couleur, site: texte(o.site, 200) };
  } catch {
    return null;
  }
}

/** Keep the look for the next visit. A storage that refuses only costs the retyping. */
export function garderHabillage(rangement: Rangement | null, h: Habillage): void {
  try {
    rangement?.setItem(CLE, JSON.stringify({ nom: h.nom.trim(), couleur: h.couleur, site: h.site.trim() }));
  } catch {
    // Private mode or a full storage: the room is created all the same.
  }
}
