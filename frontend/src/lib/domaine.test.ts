import { describe, expect, it } from 'vitest';
import { versNouveauDomaine } from './domaine.ts';

describe('versNouveauDomaine', () => {
  it('moves the old domain page for page, query kept', () => {
    expect(versNouveauDomaine(new URL('https://cleanpoker.dev/fr/planning-poker?x=1'))).toBe('https://pokeragile.com/fr/planning-poker?x=1');
    expect(versNouveauDomaine(new URL('https://cleanpoker.dev/ab12cd34'))).toBe('https://pokeragile.com/ab12cd34');
    expect(versNouveauDomaine(new URL('https://www.pokeragile.com/'))).toBe('https://pokeragile.com/');
  });
  it('leaves the probes and the new domain alone', () => {
    expect(versNouveauDomaine(new URL('https://cleanpoker.dev/health'))).toBeNull();
    expect(versNouveauDomaine(new URL('https://cleanpoker.dev/health/exercice'))).toBeNull();
    expect(versNouveauDomaine(new URL('https://pokeragile.com/fr'))).toBeNull();
    expect(versNouveauDomaine(new URL('https://cleanpoker.pages.dev/fr'))).toBeNull();
  });
  it('never sends a reader to another host', () => {
    expect(versNouveauDomaine(new URL('https://cleanpoker.dev//evil.example'))).toBe('https://pokeragile.com//evil.example');
  });
});
