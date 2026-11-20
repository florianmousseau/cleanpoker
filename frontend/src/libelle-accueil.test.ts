/*
 * Le lien du logo se lit dans la langue de la page. Le 2026-11-20, les pages
 * anglaises annoncaient « PokerAgile, accueil » au lecteur d ecran.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DE, EN, ES, FR, PT } from '#lib/i18n/all.ts';

const SOURCES = ['src/lib/HomepageTemplate.svelte', 'src/routes/[id]/+page.svelte'];

describe('libelle du lien vers l accueil', () => {
  it('vient de la traduction, jamais d une chaine en dur', () => {
    for (const fichier of SOURCES) {
      expect(readFileSync(fichier, 'utf8')).not.toMatch(/aria-label="PokerAgile, /);
    }
  });

  it('change avec la langue', () => {
    const libelles = [FR, EN, ES, DE, PT].map((t) => t.homeLabel);
    expect(new Set(libelles).size).toBe(libelles.length);
    expect(EN.homeLabel).toBe('PokerAgile, home');
  });
});
