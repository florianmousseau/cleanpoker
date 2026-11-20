import { describe, expect, it } from 'vitest';
import { moyenneAffichee } from './moyenne';
import { DE, EN, ES, FR, PT } from './i18n/all';

describe('moyenneAffichee', () => {
  it('writes a decimal comma in the four languages that use one', () => {
    for (const langue of ['fr', 'es', 'de', 'pt'] as const) {
      expect(moyenneAffichee('5.5', langue)).toBe('5,5');
    }
  });

  it('keeps the point in English and a whole average untouched', () => {
    expect(moyenneAffichee('5.5', 'en')).toBe('5.5');
    expect(moyenneAffichee('8', 'fr')).toBe('8');
  });
});

describe('the invitation after a reveal', () => {
  // "sans compte, sans traceur et sans publicité" is the slogan shape the fleet
  // refuses since 2026-11-09; a negation repeated in one sentence brings it back.
  it('repeats no negation in any language', () => {
    const negations: [string, RegExp][] = [
      [FR.promo.lead, /\bsans\b/gi],
      [EN.promo.lead, /\bno\b/gi],
      [ES.promo.lead, /\bsin\b/gi],
      [DE.promo.lead, /\bohne\b/gi],
      [PT.promo.lead, /\bsem\b/gi],
    ];
    for (const [lead, negation] of negations) {
      expect((lead.match(negation) ?? []).length, lead).toBeLessThan(2);
    }
  });
});
