import { describe, expect, it } from 'vitest';
import { sansPrefixeEn } from './redirection-en.ts';

describe('the /en redirect', () => {
	it('moves an /en address to the same path at the root', () => {
		expect(sansPrefixeEn('/en')).toBe('/');
		expect(sansPrefixeEn('/en/')).toBe('/');
		expect(sansPrefixeEn('/en/fibonacci')).toBe('/fibonacci');
	});

	it('never leaves the site, whatever slashes follow the prefix', () => {
		for (const chemin of ['/en//evil.example', '/en///evil.example/x', '/en/\\evil.example', '/en/\\/evil.example']) {
			const cible = sansPrefixeEn(chemin) as string;
			expect(cible.startsWith('/')).toBe(true);
			expect(/^\/[/\\]/.test(cible)).toBe(false);
			expect(new URL(cible, 'https://cleanpoker.app').host).toBe('cleanpoker.app');
		}
	});

	it('leaves alone a path that only starts with the letters', () => {
		expect(sansPrefixeEn('/english')).toBeNull();
		expect(sansPrefixeEn('/fr/x')).toBeNull();
	});
});
