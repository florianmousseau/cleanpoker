/**
 * Four rules that no compiler enforces and that cost the site its indexing
 * once already. Measured on 2026-08-03: 20 of 45 submitted pages were indexed,
 * and Bing was still showing a bare "CleanPoker" as the title of several pages.
 *
 *   1. app.html must not carry a <title>. It sits above %sveltekit.head%, so it
 *      wins over the one each route sets: every URL then ships two titles and
 *      search engines keep the first.
 *   2. Every route must set its own <title>, since app.html no longer does.
 *   3. A page's rel="canonical" must point at its own path. Four French pages
 *      pointed at their English counterpart, which asks Google not to index
 *      them.
 *   4. Every route must appear in sitemap.xml. The sitemap is a hand-written
 *      file, so a route added without its entry is declared to nobody. The
 *      five mentions-legales pages sat under an EMPTY "Legal notice" comment:
 *      the heading had been written, the entries never were. They were linked
 *      from every footer and declared in no sitemap.
 *
 * Run with `npm run check:seo`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROUTES = new URL('../src/routes', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const APP_HTML = new URL('../src/app.html', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITEMAP = new URL('../static/sitemap.xml', import.meta.url).pathname.replace(
	/^\/([A-Za-z]:)/,
	'$1'
);
const ORIGIN = 'https://cleanpoker.dev';

const failures = [];

// The room route captures every unknown URL and is deliberately noindex, so it
// has nothing to declare. Anything else that renders a page belongs in the map.
const NOT_IN_SITEMAP = new Set(['[id]']);
const declared = new Set(
	[...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) =>
		m[1].replace(/\/$/, '')
	)
);

function walk(dir) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full);
		else if (entry === '+page.svelte' || entry === '+error.svelte') check(full);
	}
}

function check(file) {
	const src = readFileSync(file, 'utf8');
	const rel = relative(ROUTES, file).replace(/\\/g, '/');

	// Homepages hand their title to HomepageTemplate as a pageTitle prop.
	const hasTitle = /<title>/.test(src) || /pageTitle=/.test(src);
	if (!hasTitle) failures.push(`${rel}: no title, and app.html no longer provides a fallback`);

	const path = rel.replace(/\/?\+(page|error)\.svelte$/, '');
	if (rel.endsWith('+page.svelte') && !NOT_IN_SITEMAP.has(path)) {
		const url = (ORIGIN + '/' + path).replace(/\/$/, '');
		if (!declared.has(url)) failures.push(`${rel}: ${url} is missing from sitemap.xml`);
	}

	const canonical =
		src.match(/rel="canonical" href="([^"]*)"/)?.[1] ?? src.match(/\n\s*canonical="([^"]*)"/)?.[1];
	if (!canonical) return;

	const expected = ORIGIN + '/' + rel.replace(/\/?\+(page|error)\.svelte$/, '');
	// The homepage is declared with its trailing slash, inner pages without.
	if (canonical !== expected && canonical !== expected.replace(/\/$/, '')) {
		failures.push(`${rel}: canonical points at ${canonical}, expected ${expected}`);
	}
}

if (/<title>/.test(readFileSync(APP_HTML, 'utf8'))) {
	failures.push('app.html: carries a <title>, which overrides the one every route sets');
}
walk(ROUTES);

if (failures.length) {
	console.error('SEO head checks failed:\n' + failures.map((f) => `  - ${f}`).join('\n'));
	process.exit(1);
}
console.log('SEO head checks passed.');
