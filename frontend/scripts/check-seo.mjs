/**
 * Three head-tag rules that no compiler enforces and that cost the site its
 * indexing once already. Measured on 2026-08-03: 20 of 45 submitted pages were
 * indexed, and Bing was still showing a bare "CleanPoker" as the title of
 * several pages.
 *
 *   1. app.html must not carry a <title>. It sits above %sveltekit.head%, so it
 *      wins over the one each route sets: every URL then ships two titles and
 *      search engines keep the first.
 *   2. Every route must set its own <title>, since app.html no longer does.
 *   3. A page's rel="canonical" must point at its own path. Four French pages
 *      pointed at their English counterpart, which asks Google not to index
 *      them.
 *
 * Run with `npm run check:seo`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROUTES = new URL('../src/routes', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const APP_HTML = new URL('../src/app.html', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const ORIGIN = 'https://cleanpoker.dev';

const failures = [];

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
