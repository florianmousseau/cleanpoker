import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { accueilDuVisiteur, langueAcceptee, VARY_RACINE } from './redirection-langue';

describe('accueilDuVisiteur', () => {
  it('sends a French browser from the root to the French home', () => {
    expect(accueilDuVisiteur('/', '', 'fr-FR,fr;q=0.9,en;q=0.8')).toBe('/fr');
    expect(accueilDuVisiteur('/', '', 'de-DE')).toBe('/de');
  });

  it('keeps English, unknown languages and crawlers on the root', () => {
    expect(accueilDuVisiteur('/', '', 'en-US,fr;q=0.5')).toBeNull();
    expect(accueilDuVisiteur('/', '', 'ja-JP')).toBeNull();
    expect(accueilDuVisiteur('/', '', '')).toBeNull();
  });

  it('lets the language chosen on the site win over the browser one', () => {
    expect(accueilDuVisiteur('/', 'lang=en', 'fr-FR')).toBeNull();
    expect(accueilDuVisiteur('/', 'theme=dark; lang=pt', 'fr-FR')).toBe('/pt');
  });

  it('never redirects any other address', () => {
    for (const path of ['/fr', '/de', '/planning-poker', '/abc123', '/guides']) {
      expect(accueilDuVisiteur(path, '', 'fr-FR')).toBeNull();
    }
  });
});

describe('langueAcceptee', () => {
  it('follows the weights, not the order', () => {
    expect(langueAcceptee('en;q=0.4, es;q=0.9')).toBe('es');
    expect(langueAcceptee('fr;q=0, de')).toBe('de');
    expect(langueAcceptee('*')).toBeNull();
  });
});

describe('the root', () => {
  const hooks = readFileSync(new URL('../hooks.server.ts', import.meta.url), 'utf8');

  it('redirects in the server hook, with a temporary status and a Vary header', () => {
    expect(hooks).toContain('accueilDuVisiteur(');
    expect(hooks).toMatch(/status: 302/);
    expect(VARY_RACINE).toBe('Accept-Language, Cookie');
  });

  it('no longer shows a language banner', () => {
    expect(existsSync(new URL('./LanguageSuggestion.svelte', import.meta.url))).toBe(false);
    const accueil = readFileSync(new URL('./HomepageTemplate.svelte', import.meta.url), 'utf8');
    expect(accueil).not.toContain('LanguageSuggestion');
  });
});
