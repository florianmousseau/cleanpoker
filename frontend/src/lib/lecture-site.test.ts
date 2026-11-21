import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { lecteurDeSite } from './lecture-site';

describe('lecteurDeSite', () => {
  it('reads an address once, however many times it is asked', async () => {
    const lire = vi.fn().mockResolvedValue(true);
    const lecteur = lecteurDeSite(lire);
    await lecteur.lire('lcl.com');
    await lecteur.lire(' lcl.com ');
    expect(lire).toHaveBeenCalledTimes(1);
    expect(lire).toHaveBeenCalledWith('lcl.com');
  });

  it('lets the room wait for the read in flight', async () => {
    let fin!: (ok: boolean) => void;
    const lecteur = lecteurDeSite(() => new Promise((r) => (fin = r)));
    let lu = false;
    lecteur.lire('lcl.com');
    const attente = lecteur.lire('lcl.com').then(() => (lu = true));
    await Promise.resolve();
    expect(lu).toBe(false);
    fin(true);
    await attente;
    expect(lu).toBe(true);
  });

  it('tries again after a failed read, and reads a new address', async () => {
    const lire = vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
    const lecteur = lecteurDeSite(lire);
    await lecteur.lire('lcl.com');
    await lecteur.lire('lcl.com');
    await lecteur.lire('bnp.fr');
    expect(lire.mock.calls.map((c) => c[0])).toEqual(['lcl.com', 'lcl.com', 'bnp.fr']);
  });

  it('does not read again an address kept from an earlier visit, nor an empty one', async () => {
    const lire = vi.fn().mockResolvedValue(true);
    const lecteur = lecteurDeSite(lire);
    lecteur.deja('lcl.com');
    await lecteur.lire('lcl.com');
    await lecteur.lire('  ');
    expect(lire).not.toHaveBeenCalled();
  });
});

describe('the home form', () => {
  const accueil = readFileSync(new URL('./HomepageTemplate.svelte', import.meta.url), 'utf8');

  it('reads the site when the field is left, and before the room is created', () => {
    expect(accueil).toMatch(/id="team-site"[\s\S]*?onchange=/);
    expect(accueil).toMatch(/async function createRoom\(\)[\s\S]*?await lecteur\.lire\(teamSite\)[\s\S]*?fetch\(/);
  });
});

describe('the team logo', () => {
  it('stands out on a badge of its own colour, at home and in the room', () => {
    for (const fichier of ['./HomepageTemplate.svelte', '../routes/[id]/+page.svelte']) {
      const source = readFileSync(new URL(fichier, import.meta.url), 'utf8');
      expect(source).toMatch(/\.team-logo \{[^}]*box-shadow: 0 0 0 2px #fff/);
    }
  });
});
