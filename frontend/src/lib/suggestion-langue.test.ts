import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';

vi.mock('$app/env', () => ({ browser: false }));

const { ACCUEILS, BANDEAU, langueProposee } = await import('./suggestion-langue');

const ACCUEIL = ACCUEILS;

describe('langueProposee', () => {
  it('offers French to a French browser on the English home', () => {
    expect(langueProposee('', ['fr-FR', 'en'], 'en', ACCUEIL)).toEqual({ lang: 'fr', href: '/fr' });
  });

  it('says nothing when the page is already in the wanted language', () => {
    expect(langueProposee('', ['fr-FR'], 'fr', ACCUEIL)).toBeNull();
    expect(langueProposee('', ['en-GB', 'fr'], 'en', ACCUEIL)).toBeNull();
  });

  it('lets the chosen language win over the browser one', () => {
    expect(langueProposee('lang=en', ['fr-FR'], 'en', ACCUEIL)).toBeNull();
    expect(langueProposee('theme=dark; lang=de', ['fr-FR'], 'en', ACCUEIL)).toEqual({ lang: 'de', href: '/de' });
  });

  it('offers only a version the page has', () => {
    expect(langueProposee('', ['es'], 'en', { en: '/planning-poker-ai', fr: '/fr/planning-poker-ia' })).toBeNull();
  });

  it('says nothing to a browser the site does not speak, nor on a room', () => {
    expect(langueProposee('', ['ja-JP'], 'en', ACCUEIL)).toBeNull();
    expect(langueProposee('', ['fr-FR'], 'en', {})).toBeNull();
  });
});

describe('le bandeau', () => {
  it('speaks every language of the site', () => {
    expect(Object.keys(BANDEAU).sort()).toEqual(['de', 'en', 'es', 'fr', 'pt']);
  });

  it('is mounted on every home, and never redirects', () => {
    const accueil = readFileSync(new URL('./HomepageTemplate.svelte', import.meta.url), 'utf8');
    expect(accueil).toContain('<LanguageSuggestion {locale} versions={ACCUEILS} />');
    const composant = readFileSync(new URL('./LanguageSuggestion.svelte', import.meta.url), 'utf8');
    expect(composant).not.toMatch(/goto\(|location\.(href|assign|replace)/);
    expect(composant).toContain('lang.set(locale)');
  });
});
