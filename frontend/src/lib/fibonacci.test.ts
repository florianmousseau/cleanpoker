import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
	RANG_MAX,
	chiffres,
	ecartDeBinet,
	estPremier,
	estUnRang,
	fib,
	formatEn,
	formatFr,
	ordinalEn,
	ordinalFr,
	rangInconnu,
	rangsDiviseurs,
	rapport,
} from './fibonacci';
import { facteursPremiers } from './fibonacci-facteurs';
import { donneesDuRang } from './fibonacci-pages';
import { render } from 'svelte/server';
import ReferenceEn from '../routes/fibonacci-numbers/+page.svelte';
import RangEn from '../routes/fibonacci-numbers/[n]/+page.svelte';
import ReferenceFr from '../routes/fr/suite-de-fibonacci/+page.svelte';
import RangFr from '../routes/fr/suite-de-fibonacci/[n]/+page.svelte';

/* The rank pages read their rank from the router: here it is whatever a test asks for. */
const rangDemande = vi.hoisted(() => ({ n: '1' }));
vi.mock('$app/state', () => ({ page: { params: rangDemande } }));

const rangs = Array.from({ length: RANG_MAX }, (_, i) => i + 1);

describe('fib', () => {
	it('starts at F(1) = F(2) = 1, with F(0) = 0', () => {
		expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fib)).toEqual([0n, 1n, 1n, 2n, 3n, 5n, 8n, 13n, 21n, 34n, 55n]);
	});

	it('is exact on the values the pages are searched for', () => {
		expect(fib(20)).toBe(6765n);
		expect(fib(50)).toBe(12586269025n);
		expect(fib(100)).toBe(354224848179261915075n);
	});

	it('refuses what is not a rank', () => {
		expect(() => fib(-1)).toThrow(RangeError);
		expect(() => fib(1.5)).toThrow(RangeError);
	});
});

describe('estUnRang', () => {
	it.each(['1', '9', '20', '100'])('accepts %s', (segment) => expect(estUnRang(segment)).toBe(true));
	it.each(['0', '101', '-1', '01', '1.0', 'abc', '', '1e1', '1000'])('refuses %s', (segment) =>
		expect(estUnRang(segment)).toBe(false)
	);
});

describe('rangInconnu', () => {
	it.each(['/fibonacci-numbers/101', '/fibonacci-numbers/0', '/fr/suite-de-fibonacci/abc', '/fr/suite-de-fibonacci/0', '/fibonacci-numbers/007/'])(
		'%s is not a page',
		(chemin) => expect(rangInconnu(chemin)).toBe(true)
	);
	it.each(['/fibonacci-numbers/100', '/fr/suite-de-fibonacci/1', '/fr/suite-de-fibonacci/20/', '/fibonacci-numbers', '/fr/suite-de-fibonacci', '/fibonacci', '/fibonacci-numbers/101/introuvable', '/abc'])(
		'%s is left to the router',
		(chemin) => expect(rangInconnu(chemin)).toBe(false)
	);
});

describe('formats', () => {
	it('separates French thousands with a no-break space and nothing else', () => {
		expect(formatFr(6765n)).toBe('6\u00A0765');
		expect(formatFr(354224848179261915075n)).toBe('354\u00A0224\u00A0848\u00A0179\u00A0261\u00A0915\u00A0075');
		expect(formatFr(987n)).toBe('987');
	});

	it('separates English thousands with a comma', () => {
		expect(formatEn(6765n)).toBe('6,765');
		expect(formatEn(354224848179261915075n)).toBe('354,224,848,179,261,915,075');
	});

	it('writes English ordinals', () => {
		const attendus = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 11: '11th', 12: '12th', 13: '13th', 20: '20th', 21: '21st', 22: '22nd', 23: '23rd', 100: '100th' };
		for (const [n, ordinal] of Object.entries(attendus)) expect(ordinalEn(Number(n))).toBe(ordinal);
	});

	it('writes French ordinals', () => {
		expect([1, 2, 21, 100].map(ordinalFr)).toEqual(['1er', '2e', '21e', '100e']);
	});

	it('counts digits', () => {
		expect(chiffres(fib(1))).toBe(1);
		expect(chiffres(fib(20))).toBe(4);
		expect(chiffres(fib(100))).toBe(21);
	});
});

describe('estPremier', () => {
	it('agrees with trial division below 2000', () => {
		const parDivision = (n: number) => {
			if (n < 2) return false;
			for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
			return true;
		};
		for (let n = 0; n < 2000; n++) expect(estPremier(BigInt(n)), String(n)).toBe(parDivision(n));
	});

	it('is not fooled by strong pseudoprimes and Carmichael numbers', () => {
		for (const n of [561n, 2047n, 3215031751n, 3825123056546413051n]) expect(estPremier(n)).toBe(false);
	});

	// OEIS A001605, checked on 2026-11-20.
	it('finds the prime Fibonacci numbers at ranks 3, 4, 5, 7, 11, 13, 17, 23, 29, 43, 47 and 83', () => {
		expect(rangs.filter((n) => estPremier(fib(n)))).toEqual([3, 4, 5, 7, 11, 13, 17, 23, 29, 43, 47, 83]);
	});
});

describe('facteursPremiers', () => {
	it.each(rangs)('F(%i) is the product of its listed factors, all prime, in order', (n) => {
		const facteurs = facteursPremiers(n);
		expect(facteurs.reduce((produit, p) => produit * p, 1n)).toBe(fib(n));
		for (const p of facteurs) expect(estPremier(p)).toBe(true);
		expect(facteurs).toEqual([...facteurs].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
	});

	it('knows F(20) = 3 x 5 x 11 x 41 and F(12) = 2^4 x 3^2', () => {
		expect(facteursPremiers(20)).toEqual([3n, 5n, 11n, 41n]);
		expect(facteursPremiers(12)).toEqual([2n, 2n, 2n, 2n, 3n, 3n]);
	});
});

describe('rapport', () => {
	it('rounds F(n) / F(n-1) to ten decimals', () => {
		expect(rapport(2)).toBe('1.0000000000');
		expect(rapport(3)).toBe('2.0000000000');
		expect(rapport(5)).toBe('1.6666666667');
		expect(rapport(20)).toBe('1.6180339632');
		expect(rapport(100)).toBe('1.6180339887');
	});
});

describe('ecartDeBinet', () => {
	it('is the distance between phi^n / sqrt(5) and F(n)', () => {
		const phi = (1 + Math.sqrt(5)) / 2;
		const { auDessus, mantisse, exposant } = ecartDeBinet(20);
		expect(auDessus).toBe(true);
		expect(Number(`${mantisse}e${exposant}`)).toBeCloseTo(phi ** 20 / Math.sqrt(5) - 6765, 6);
		expect(ecartDeBinet(7).auDessus).toBe(false);
		expect(ecartDeBinet(100).exposant).toBe(-22);
	});
});

describe('rangsDiviseurs', () => {
	it('lists the ranks whose term divides F(n)', () => {
		expect(rangsDiviseurs(20)).toEqual([4, 5, 10]);
		expect(rangsDiviseurs(23)).toEqual([]);
		expect(rangsDiviseurs(4)).toEqual([]);
	});

	it.each(rangs)('F(d) divides F(%i) exactly when d divides it, for d above 2', (n) => {
		const attendus = rangs.filter((d) => d > 2 && d < n && fib(n) % fib(d) === 0n);
		expect(rangsDiviseurs(n)).toEqual(attendus);
	});
});

describe('donneesDuRang', () => {
	it('prints the 20th term in French', () => {
		const d = donneesDuRang(20, 'fr');
		expect(d.ordinal).toBe('20e');
		expect(d.valeur).toBe('6\u00A0765');
		expect(d.somme).toEqual({
			a: { n: 18, ordinal: '18e', valeur: '2\u00A0584' },
			b: { n: 19, ordinal: '19e', valeur: '4\u00A0181' },
		});
		expect(d.rapport).toBe('1,6180339632');
		expect(d.chiffres).toBe(4);
		expect(d.pair).toBe(false);
		expect(d.premier).toBe(false);
		expect(d.facteurs.map((f) => f.premier)).toEqual(['3', '5', '11', '41']);
		expect(d.cumul).toBe('17\u00A0710');
		expect(d.binet.mantisse).toBe('2,96');
	});

	it('prints the 100th term in English, with no next rank', () => {
		const d = donneesDuRang(100, 'en');
		expect(d.ordinal).toBe('100th');
		expect(d.valeur).toBe('354,224,848,179,261,915,075');
		expect(d.suivant).toBeNull();
		expect(d.precedent?.n).toBe(99);
		expect(d.taille).toBe('longue');
		expect(d.facteurs.find((f) => f.premier === '5')?.exposant).toBe(2);
	});

	it('gives the first rank neither a sum, a ratio nor a previous term', () => {
		const d = donneesDuRang(1, 'en');
		expect([d.somme, d.rapport, d.precedent]).toEqual([null, null, null]);
		expect(d.facteurs).toEqual([]);
	});

	it('makes every page differ from its neighbours by more than its value', () => {
		const pages = rangs.map((n) => donneesDuRang(n, 'en'));
		expect(new Set(pages.map((p) => p.valeur)).size).toBe(99);
		expect(new Set(pages.map((p) => `${p.rapport}|${p.cumul}|${p.binet.mantisse}e${p.binet.exposant}`)).size).toBe(100);
	});
});

/** The rendered HTML without its comments, cut by position, never by a pattern. */
function sansCommentaires(html: string): string {
	let reste = html;
	let sortie = '';
	for (let debut = reste.indexOf('<!--'); debut !== -1; debut = reste.indexOf('<!--')) {
		const fin = reste.indexOf('-->', debut + 4);
		sortie += reste.slice(0, debut);
		reste = fin === -1 ? '' : reste.slice(fin + 3);
	}
	return sortie + reste;
}

/** What a reader sees: the text between the tags, with single spaces. */
function texteDe(html: string): string {
	let texte = '';
	let dansBalise = false;
	for (const c of sansCommentaires(html)) {
		if (c === '<') dansBalise = true;
		else if (c === '>') dansBalise = false;
		else if (!dansBalise) texte += c;
	}
	return texte.split(/[ \n\t]+/).join(' ');
}

describe('the reference pages print what this module computes', () => {
	/** Svelte adds hydration comments and a scoping class: neither is text. */
	const rendre = (page: typeof ReferenceFr) => {
		const { body, head } = render(page);
		return { head, body: sansCommentaires(body).replace(/ class="[^"]*"/g, '') };
	};
	const lignes = (corps: string) =>
		[...corps.matchAll(/<td><a href="([^"]+)">F\((\d+)\)<\/a><\/td>\s*<td>([^<]+)<\/td>/g)].map((m) => m.slice(1));

	it('in French: 100 rows, the first twenty terms and the ratio at rank 40', () => {
		const { body } = rendre(ReferenceFr);
		expect(lignes(body)).toEqual(rangs.map((n) => [`/fr/suite-de-fibonacci/${n}`, String(n), formatFr(fib(n))]));
		expect(body).toContain(rangs.slice(0, 20).map((n) => formatFr(fib(n))).join(', '));
		expect(body).toContain(`<td>${formatFr(fib(40))} / ${formatFr(fib(39))}</td><td>${rapport(40).replace('.', ',')}</td>`);
		expect(body).toContain(`F(10) = ${formatFr(fib(10))}`);
	});

	it('in English', () => {
		const { body } = rendre(ReferenceEn);
		expect(lignes(body)).toEqual(rangs.map((n) => [`/fibonacci-numbers/${n}`, String(n), formatEn(fib(n))]));
		expect(body).toContain(rangs.slice(0, 20).map((n) => formatEn(fib(n))).join(', '));
		expect(body).toContain(`<td>${formatEn(fib(20))} / ${formatEn(fib(19))}</td><td>${rapport(20)}</td>`);
	});

	it('shows the same FAQ as the one declared to search engines', () => {
		for (const Page of [ReferenceFr, ReferenceEn]) {
			const { body, head } = rendre(Page);
			const declarees = [...head.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
				.map((m) => JSON.parse(m[1]))
				.find((graphe) => graphe['@type'] === 'FAQPage')
				.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => [q.name, q.acceptedAnswer.text]);
			const visibles = [...body.matchAll(/<summary>([^<]*)<\/summary>\s*<p>([^<]*)<\/p>/g)].map((m) =>
				[m[1], m[2]].map((texte) => texte.replaceAll('\u00A0', ' ').replaceAll('&#39;', "'").replaceAll('&quot;', '"'))
			);
			expect(declarees).toHaveLength(4);
			expect(visibles).toEqual(declarees);
		}
	});
});

describe('a link to a rank page asks the server', () => {
	// A rank page is rendered on the server only, so the client router must not try to build it.
	it.each(['fr/suite-de-fibonacci', 'fibonacci-numbers'])('in the table of %s', (route) => {
		const source = readFileSync(join(import.meta.dirname, '../routes', route, '+page.svelte'), 'utf8');
		const liens = [...source.matchAll(/href="\/(?:fr\/suite-de-fibonacci|fibonacci-numbers)\/\{/g)];
		expect(liens).toHaveLength(1);
		const avant = source.slice(0, liens[0].index);
		expect(avant.lastIndexOf('<tbody data-sveltekit-reload>')).toBeGreaterThan(avant.lastIndexOf('</tbody>'));
	});
});

describe('a rank page', () => {
	it('prints the value, the sum, the factors and the terms that divide it', () => {
		rangDemande.n = '20';
		const { body, head } = render(RangFr);
		const texte = texteDe(body);
		expect(head).toContain('<title>20e nombre de Fibonacci\u00A0: 6\u00A0765 | PokerAgile</title>');
		expect(head).toContain('<link rel="canonical" href="https://pokeragile.com/fr/suite-de-fibonacci/20"/>');
		expect(texte).toContain('F(20) = F(18) + F(19) = 2\u00A0584 + 4\u00A0181');
		expect(texte).toContain('3 × 5 × 11 × 41');
		expect(texte).toContain('20 est divisible par 4, 5 et 10. F(20) est donc divisible par F(4) = 3, F(5) = 5 et F(10) = 55.');
	});

	it('writes the English title of the 100th', () => {
		rangDemande.n = '100';
		const { head } = render(RangEn);
		expect(head).toContain('<title>100th Fibonacci number: 354,224,848,179,261,915,075 | PokerAgile</title>');
		expect(head).toContain('<link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/suite-de-fibonacci/100"/>');
	});

	it.each(rangs)('renders rank %i in both languages', (n) => {
		rangDemande.n = String(n);
		expect(render(RangFr).body).toContain(formatFr(fib(n)));
		expect(render(RangEn).body).toContain(formatEn(fib(n)));
	});
});

describe('the sitemap declares the family', () => {
	const sitemap = readFileSync(join(import.meta.dirname, '../../static/sitemap.xml'), 'utf8');
	const declarees = new Set([...sitemap.matchAll(/<loc>https:\/\/pokeragile\.com([^<]*)<\/loc>/g)].map((m) => m[1]));

	it.each(['/fr/suite-de-fibonacci', '/fibonacci-numbers'])('%s and its 100 ranks', (base) => {
		expect(declarees.has(base)).toBe(true);
		const trouves = [...declarees].filter((adresse) => adresse.startsWith(`${base}/`));
		expect(trouves.sort()).toEqual(rangs.map((n) => `${base}/${n}`).sort());
	});
});
