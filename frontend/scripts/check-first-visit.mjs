#!/usr/bin/env node
/*
 * What a first visit downloads, in JavaScript, brotli: the promise is
 * "under 50 KB", and it is made to a visitor, not to a folder.
 *
 * The gate this replaces summed every file of `chunks/`. It passed while a
 * room downloaded 55 KB, because the room's own file was not in that folder,
 * and it went red the day the five languages became five files fetched one
 * at a time, because all five were. It measured the layout of the build.
 *
 * This one follows the build manifest from what the browser is told to
 * fetch: the two entry files, the client they always import, the layouts and
 * the page of the route, and every file those import statically. A room adds
 * the one dictionary its `load` awaits before the page shows - the heaviest
 * of the five, so no language passes on the back of a lighter one.
 * What is fetched later, on a click, is not a first visit and is not counted.
 *
 * It refuses to pass on nothing: a missing manifest, a route the build does
 * not know, a closure too small to be a page, or a room that no longer has
 * five dictionaries to choose from are all red. And it proves its own walk
 * on a sample before it reads the build.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { brotliCompressSync } from 'node:zlib';

export const LIMIT = 50_000;

/** The visits held under the limit. `onDemand` names what a `load` awaits. */
export const VISITS = [
	{ route: '/', name: 'Home, first visit (/)' },
	{ route: '/fr', name: 'Home, first visit (/fr)' },
	{
		route: '/[id]',
		name: 'Room, first visit (/[id], heaviest language)',
		onDemand: { pattern: /^src\/lib\/i18n\/[a-z]{2}\.ts$/, expected: 5 }
	}
];

// Fewer files or fewer bytes than this is not a page: the walk found nothing.
const MIN_FILES = 6;
const MIN_BYTES = 20_000;

const isJs = (file) => file.endsWith('.js');

/** Every manifest key reached from `starts` through static imports. */
export function staticClosure(manifest, starts) {
	const seen = new Set();
	const stack = [...starts];
	while (stack.length) {
		const key = stack.pop();
		if (seen.has(key)) continue;
		const chunk = manifest[key];
		if (!chunk) throw new Error(`the manifest has no entry "${key}"`);
		seen.add(key);
		stack.push(...(chunk.imports ?? []));
	}
	return seen;
}

function entryKey(manifest, what, test) {
	const keys = Object.keys(manifest).filter((key) => manifest[key].isEntry && test(key, manifest[key]));
	if (keys.length !== 1) throw new Error(`expected one ${what} in the manifest, found ${keys.length}`);
	return keys[0];
}

/**
 * The manifest keys a first visit of a route fetches.
 * `nodes` are the route's layouts and its page; `weigh` gives the bytes of a
 * set of keys, to pick the heaviest of the files fetched on demand.
 */
export function firstVisitKeys(manifest, nodes, onDemand, weigh) {
	const start = entryKey(manifest, 'start entry', (_, chunk) => /\/entry\/start\./.test(chunk.file));
	const app = entryKey(manifest, 'app entry', (_, chunk) => /\/entry\/app\./.test(chunk.file));
	const nodeKeys = nodes.map((n) => entryKey(manifest, `node ${n}`, (key) => key.endsWith(`/nodes/${n}.js`)));
	// The start entry imports the client as soon as it runs, on every page.
	const always = manifest[start].dynamicImports ?? [];
	if (always.length === 0) throw new Error('the start entry imports no client: the manifest changed shape');
	const keys = staticClosure(manifest, [start, app, ...always, ...nodeKeys]);
	if (!onDemand) return keys;

	const candidates = [...new Set([...keys].flatMap((key) => manifest[key].dynamicImports ?? []))].filter((key) =>
		onDemand.pattern.test(key)
	);
	if (candidates.length !== onDemand.expected) {
		throw new Error(
			`expected ${onDemand.expected} files fetched on demand matching ${onDemand.pattern}, found ${candidates.length}`
		);
	}
	const extra = (key) => new Set([...staticClosure(manifest, [key])].filter((k) => !keys.has(k)));
	const heaviest = candidates.map(extra).reduce((a, b) => (weigh(b) > weigh(a) ? b : a));
	return new Set([...keys, ...heaviest]);
}

/** The layouts and the page of a route, read from the server manifest SvelteKit writes. */
export function routeNodes(serverManifest, route) {
	const at = serverManifest.indexOf(`id: ${JSON.stringify(route)},`);
	if (at === -1) throw new Error(`the build has no route ${route}`);
	const page = /page: \{ layouts: \[([^\]]*)\], errors: \[[^\]]*\], leaf: (\d+) \}/.exec(
		serverManifest.slice(at, serverManifest.indexOf('endpoint:', at))
	);
	if (!page) throw new Error(`route ${route} has no page in the build`);
	const layouts = page[1].split(',').map((s) => s.trim()).filter(Boolean).map(Number);
	return [...layouts, Number(page[2])];
}

export const brotli = (buffer) => brotliCompressSync(buffer).length;

/** Measure every visit of a build. Throws when the build cannot be read. */
export function measure(root, visits = VISITS) {
	const manifestPath = join(root, '.svelte-kit/output/client/.vite/manifest.json');
	const serverPath = join(root, '.svelte-kit/output/server/manifest.js');
	const served = join(root, '.svelte-kit/cloudflare');
	for (const path of [manifestPath, serverPath, served]) {
		if (!existsSync(path)) throw new Error(`${path} is missing: run "npm run build" first`);
	}
	const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
	const serverManifest = readFileSync(serverPath, 'utf8');
	const sizes = new Map();
	const sizeOf = (key) => {
		const { file } = manifest[key];
		if (!isJs(file)) return 0;
		if (!sizes.has(file)) sizes.set(file, brotli(readFileSync(join(served, file))));
		return sizes.get(file);
	};
	const weigh = (keys) => [...keys].reduce((sum, key) => sum + sizeOf(key), 0);
	return visits.map((visit) => {
		const keys = firstVisitKeys(manifest, routeNodes(serverManifest, visit.route), visit.onDemand, weigh);
		const files = [...new Set([...keys].map((key) => manifest[key].file).filter(isJs))].sort();
		const bytes = weigh(keys);
		if (files.length < MIN_FILES || bytes < MIN_BYTES) {
			throw new Error(`${visit.name}: ${files.length} files, ${bytes} B. That is not a page: the walk found nothing.`);
		}
		return { ...visit, files, bytes };
	});
}

/** The walk, proved on a build small enough to check by hand. */
export function proveOnSample() {
	const sample = {
		'kit/entry.js': { file: 'x/entry/start.1.js', isEntry: true, imports: ['_p.js'], dynamicImports: ['kit/client.js'] },
		'kit/client.js': { file: 'x/chunks/client.js', isDynamicEntry: true, imports: ['_rt.js'] },
		'gen/app.js': { file: 'x/entry/app.1.js', isEntry: true, dynamicImports: ['gen/nodes/0.js', 'gen/nodes/1.js', 'gen/nodes/2.js'] },
		'gen/nodes/0.js': { file: 'x/nodes/0.js', isEntry: true, imports: ['_rt.js'] },
		'gen/nodes/1.js': { file: 'x/nodes/1.js', isEntry: true, imports: ['_rt.js', '_home.js'] },
		'gen/nodes/2.js': { file: 'x/nodes/2.js', isEntry: true, imports: ['_rt.js'], dynamicImports: ['src/lib/i18n/aa.ts', 'src/lib/i18n/bb.ts', 'src/lib/Options.svelte'] },
		'_p.js': { file: 'x/chunks/p.js' },
		'_rt.js': { file: 'x/chunks/rt.js' },
		'_home.js': { file: 'x/chunks/home.js', css: ['x/home.css'] },
		'_words.js': { file: 'x/chunks/words.js' },
		'src/lib/i18n/aa.ts': { file: 'x/chunks/aa.js', isDynamicEntry: true },
		'src/lib/i18n/bb.ts': { file: 'x/chunks/bb.js', isDynamicEntry: true, imports: ['_words.js', '_rt.js'] },
		'src/lib/Options.svelte': { file: 'x/chunks/options.js', isDynamicEntry: true, imports: ['_rt.js'] }
	};
	const weight = { 'src/lib/i18n/aa.ts': 10, 'src/lib/i18n/bb.ts': 4, '_words.js': 9 };
	const weigh = (keys) => [...keys].reduce((sum, key) => sum + (weight[key] ?? 1), 0);
	const files = (keys) => [...keys].map((key) => sample[key].file.replace(/^x\/(chunks\/)?/, '')).sort().join(' ');
	const dictionaries = { pattern: /^src\/lib\/i18n\/[a-z]{2}\.ts$/, expected: 2 };
	const cases = [
		// A home: entries, client, layout, page, their static imports. No other page, nothing on demand.
		[files(firstVisitKeys(sample, [0, 1], undefined, weigh)), 'client.js entry/app.1.js entry/start.1.js home.js nodes/0.js nodes/1.js p.js rt.js'],
		// A room: one dictionary, the heaviest once what it imports is counted (bb + words = 13 > aa = 10), never the options.
		[files(firstVisitKeys(sample, [0, 2], dictionaries, weigh)), 'bb.js client.js entry/app.1.js entry/start.1.js nodes/0.js nodes/2.js p.js rt.js words.js']
	];
	for (const [got, expected] of cases) {
		if (got !== expected) throw new Error(`the walk is wrong on the sample: got "${got}", expected "${expected}"`);
	}
	// A dictionary gone missing must be red, not a lighter room.
	let refused = false;
	try {
		firstVisitKeys(sample, [0, 2], { ...dictionaries, expected: 5 }, weigh);
	} catch {
		refused = true;
	}
	if (!refused) throw new Error('the walk accepts a room with dictionaries missing');
}

const kB = (bytes) => `${(bytes / 1000).toFixed(2)} kB`;

/** The lines to print for the measured visits, and whether one is over the limit. */
export function verdict(results, limit = LIMIT) {
	const lines = results.flatMap(({ name, bytes, files }) => [
		'',
		`  ${name}`,
		...(bytes > limit ? [`  Over the limit by ${bytes - limit} B`] : []),
		`  Size limit: ${kB(limit)}`,
		`  Size:       ${kB(bytes)} brotlied, ${files.length} files`
	]);
	return { red: results.some(({ bytes }) => bytes > limit), lines: [...lines, ''] };
}

function main() {
	let results;
	try {
		proveOnSample();
		results = measure(process.cwd());
	} catch (error) {
		console.error(`\n  First-visit JavaScript: ${error.message}\n`);
		process.exit(1);
	}
	const { red, lines } = verdict(results);
	console.log(lines.join('\n'));
	if (red) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
