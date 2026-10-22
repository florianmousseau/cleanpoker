/*
 * L accroche de l accueil dit comment se passe un vote, dans les cinq langues.
 *
 * Mesure du 2026-10-22 : un lecteur qui n a jamais fait de planning poker,
 * devant l accueil, a repondu « je ne sais pas vraiment » a la question « a
 * quoi sert ce site ». L ancienne accroche disait « creez une session, partagez
 * l URL, estimez en equipe » : trois gestes, et rien sur ce qui se passe dans
 * la salle. La phrase qui manquait est celle du vote cache puis revele d un
 * coup, qui est tout le principe.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const ACCUEILS: Record<string, { fichier: string; secret: RegExp }> = {
  en: { fichier: 'src/routes/+page.svelte', secret: /in secret/ },
  fr: { fichier: 'src/routes/fr/+page.svelte', secret: /en secret/ },
  es: { fichier: 'src/routes/es/+page.svelte', secret: /en secreto/ },
  de: { fichier: 'src/routes/de/+page.svelte', secret: /verdeckt/ },
  pt: { fichier: 'src/routes/pt/+page.svelte', secret: /em segredo/ }
};

function accroche(fichier: string): string {
  const prop = /\blead="([^"]*)"/.exec(readFileSync(fichier, 'utf8'));
  if (!prop) throw new Error(`pas de prop lead dans ${fichier}`);
  return prop[1];
}

describe('accroche de l accueil', () => {
  for (const [langue, { fichier, secret }] of Object.entries(ACCUEILS)) {
    it(`dit le vote cache en ${langue}`, () => {
      expect(accroche(fichier)).toMatch(secret);
    });
  }
});
