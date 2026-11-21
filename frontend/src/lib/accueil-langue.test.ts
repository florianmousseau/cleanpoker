import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { accueilDeLaLangue, languesAcceptees } from './accueil-langue';

describe('languesAcceptees', () => {
	it('orders by weight, keeps the order of equal ones, drops refused ones', () => {
		expect(languesAcceptees('en;q=0.5, fr-FR, de;q=0.8')).toEqual(['fr', 'de', 'en']);
		expect(languesAcceptees('fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7')).toEqual(['fr', 'fr', 'en', 'en']);
		expect(languesAcceptees('fr;q=0, es')).toEqual(['es']);
	});

	it('reads nothing from a missing or empty header', () => {
		expect(languesAcceptees(null)).toEqual([]);
		expect(languesAcceptees('')).toEqual([]);
		expect(languesAcceptees('*')).toEqual(['*']);
	});
});

describe('accueilDeLaLangue', () => {
	it('sends a French browser from / to /fr', () => {
		expect(accueilDeLaLangue('/', undefined, 'fr-FR,fr;q=0.9,en;q=0.8')).toBe('/fr');
		expect(accueilDeLaLangue('/', undefined, 'pt-BR')).toBe('/pt');
	});

	it('lets the chosen language win, English included', () => {
		expect(accueilDeLaLangue('/', 'en', 'fr-FR')).toBeNull();
		expect(accueilDeLaLangue('/', 'de', 'fr-FR')).toBe('/de');
		expect(accueilDeLaLangue('/', 'xx', 'es')).toBe('/es');
	});

	it('serves English to crawlers, English and unknown browsers', () => {
		expect(accueilDeLaLangue('/', undefined, null)).toBeNull();
		expect(accueilDeLaLangue('/', undefined, 'en-GB,fr;q=0.5')).toBeNull();
		expect(accueilDeLaLangue('/', undefined, 'ja,nl;q=0.8,*;q=0.1')).toBeNull();
	});

	it('never moves any other address', () => {
		for (const path of ['/fr', '/green', '/planning-poker', '/a1b2c3d4', '/fr/guides']) {
			expect(accueilDeLaLangue(path, 'de', 'fr-FR')).toBeNull();
		}
	});
});

describe('hooks.server.ts', () => {
	const hooks = readFileSync(new URL('../hooks.server.ts', import.meta.url), 'utf8');

	it('redirects / temporarily, keeps the query, and varies on what it read', () => {
		expect(hooks).toMatch(/accueilDeLaLangue\(\s*event\.url\.pathname,\s*event\.cookies\.get\("lang"\),\s*event\.request\.headers\.get\("accept-language"\),?\s*\)/);
		expect(hooks).toMatch(/status: 302[\s\S]{0,200}location: `\$\{accueil\}\$\{event\.url\.search\}`/);
		expect(hooks).toContain('const VARIE_PAR_VISITEUR = "Accept-Language, Cookie";');
		expect(hooks).toContain('if (event.url.pathname === "/") response.headers.set("vary", VARIE_PAR_VISITEUR);');
	});
});
