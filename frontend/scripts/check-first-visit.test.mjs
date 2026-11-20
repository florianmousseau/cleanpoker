import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LIMIT, VISITS, firstVisitKeys, measure, proveOnSample, routeNodes, staticClosure, verdict } from './check-first-visit.mjs';

const SCRIPT = fileURLToPath(new URL('./check-first-visit.mjs', import.meta.url));

const SERVER_MANIFEST = `
		{
			id: "/",
			pattern: /^\\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/health",
			pattern: /^\\/health\\/?$/,
			params: [],
			page: null,
			endpoint: __memo(() => import('./entries/endpoints/health/_server.ts.js'))
		},
		{
			id: "/[id]",
			pattern: /^\\/([^/]+?)\\/?$/,
			params: [{"name":"id","optional":false,"rest":false,"chained":false}],
			page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
			endpoint: null
		}`;

// A build of four files a page: big enough to pass the floor, small enough to read.
function fakeBuild(overrides = {}) {
	const root = mkdtempSync(join(tmpdir(), 'first-visit-'));
	const noise = (n) => Array.from({ length: n }, (_, i) => `x${(i * 7919) % 9973}`).join(';');
	const manifest = {
		'kit/entry.js': { file: '_app/immutable/entry/start.a.js', isEntry: true, dynamicImports: ['kit/client.js'] },
		'kit/client.js': { file: '_app/immutable/chunks/client.js', isDynamicEntry: true, imports: ['_rt.js'] },
		'gen/app.js': { file: '_app/immutable/entry/app.a.js', isEntry: true, dynamicImports: ['gen/nodes/0.js', 'gen/nodes/3.js'] },
		'gen/nodes/0.js': { file: '_app/immutable/nodes/0.js', isEntry: true, imports: ['_rt.js'] },
		'gen/nodes/3.js': { file: '_app/immutable/nodes/3.js', isEntry: true, imports: ['_rt.js', '_style.css'], dynamicImports: ['src/lib/Later.svelte'] },
		'_rt.js': { file: '_app/immutable/chunks/rt.js' },
		'_style.css': { file: '_app/immutable/assets/style.css' },
		'src/lib/Later.svelte': { file: '_app/immutable/chunks/later.js', isDynamicEntry: true },
		...overrides.manifest
	};
	const sizes = { 'chunks/rt.js': 9000, 'chunks/client.js': 3000, 'chunks/later.js': 9000, 'assets/style.css': 9000, ...overrides.sizes };
	for (const { file } of Object.values(manifest)) {
		const path = join(root, '.svelte-kit/cloudflare', file);
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, noise(sizes[file.replace('_app/immutable/', '')] ?? 300));
	}
	mkdirSync(join(root, '.svelte-kit/output/client/.vite'), { recursive: true });
	mkdirSync(join(root, '.svelte-kit/output/server'), { recursive: true });
	if (overrides.noManifest !== true) {
		writeFileSync(join(root, '.svelte-kit/output/client/.vite/manifest.json'), JSON.stringify(manifest));
	}
	writeFileSync(join(root, '.svelte-kit/output/server/manifest.js'), SERVER_MANIFEST);
	return root;
}

const HOME = [{ route: '/', name: 'Home' }];

describe('the walk', () => {
	it('proves itself on its own sample', () => {
		expect(() => proveOnSample()).not.toThrow();
	});

	it('follows static imports only, and each file once', () => {
		const manifest = {
			a: { file: 'a.js', imports: ['b', 'c'], dynamicImports: ['later'] },
			b: { file: 'b.js', imports: ['c'] },
			c: { file: 'c.js', imports: ['a'] },
			later: { file: 'later.js' }
		};
		expect([...staticClosure(manifest, ['a'])].sort()).toEqual(['a', 'b', 'c']);
	});

	it('refuses an import the manifest does not know', () => {
		expect(() => staticClosure({ a: { file: 'a.js', imports: ['gone'] } }, ['a'])).toThrow(/no entry "gone"/);
	});

	it('refuses a manifest without the entries a browser starts from', () => {
		expect(() => firstVisitKeys({ x: { file: 'x.js' } }, [0], undefined, () => 0)).toThrow(/start entry/);
	});
});

describe('the nodes of a route', () => {
	it('reads the layouts and the page', () => {
		expect(routeNodes(SERVER_MANIFEST, '/')).toEqual([0, 3]);
		expect(routeNodes(SERVER_MANIFEST, '/[id]')).toEqual([0, 2, 4]);
	});

	it('refuses a route the build does not have, and one that is not a page', () => {
		expect(() => routeNodes(SERVER_MANIFEST, '/fr')).toThrow(/no route \/fr/);
		expect(() => routeNodes(SERVER_MANIFEST, '/health')).toThrow(/no page/);
	});
});

describe('the measure of a build', () => {
	it('counts the JavaScript of the visit: no stylesheet, nothing fetched later', () => {
		const [home] = measure(fakeBuild(), HOME);
		expect(home.files).toEqual([
			'_app/immutable/chunks/client.js',
			'_app/immutable/chunks/rt.js',
			'_app/immutable/entry/app.a.js',
			'_app/immutable/entry/start.a.js',
			'_app/immutable/nodes/0.js',
			'_app/immutable/nodes/3.js'
		]);
		expect(home.bytes).toBeGreaterThan(20_000);
	});

	it('gives the same figure twice', () => {
		const root = fakeBuild();
		expect(measure(root, HOME)[0].bytes).toBe(measure(root, HOME)[0].bytes);
	});

	it('is red without a manifest, never green on nothing', () => {
		expect(() => measure(fakeBuild({ noManifest: true }), HOME)).toThrow(/manifest\.json is missing/);
		expect(() => measure(mkdtempSync(join(tmpdir(), 'first-visit-empty-')), HOME)).toThrow(/is missing/);
	});

	it('is red on a closure too small to be a page', () => {
		expect(() => measure(fakeBuild({ sizes: { 'chunks/rt.js': 300, 'chunks/client.js': 300 } }), HOME)).toThrow(
			/not a page/
		);
	});

	it('is red when the room has lost a dictionary', () => {
		const room = [{ route: '/[id]', name: 'Room', onDemand: { pattern: /^src\/lib\/i18n\/[a-z]{2}\.ts$/, expected: 5 } }];
		const manifest = {
			'gen/nodes/2.js': { file: '_app/immutable/nodes/2.js', isEntry: true },
			'gen/nodes/4.js': { file: '_app/immutable/nodes/4.js', isEntry: true, dynamicImports: ['src/lib/i18n/fr.ts'] },
			'src/lib/i18n/fr.ts': { file: '_app/immutable/chunks/fr.js', isDynamicEntry: true }
		};
		expect(() => measure(fakeBuild({ manifest }), room)).toThrow(/expected 5 files fetched on demand/);
	});
});

describe('the gate', () => {
	it('holds the two homes and the room under 50 kB', () => {
		expect(LIMIT).toBe(50_000);
		expect(VISITS.map((v) => v.route)).toEqual(['/', '/fr', '/[id]']);
		expect(VISITS[2].onDemand.expected).toBe(5);
	});

	it('exits red with the reason when there is no build', () => {
		const run = spawnSync(process.execPath, [SCRIPT], { cwd: mkdtempSync(join(tmpdir(), 'first-visit-cli-')), encoding: 'utf8' });
		expect(run.status).toBe(1);
		expect(run.stderr).toMatch(/is missing: run "npm run build" first/);
	});

	it('is red one byte over the limit, green at the limit, and says by how much', () => {
		const visit = (bytes) => ({ name: 'Room', bytes, files: ['a.js', 'b.js'] });
		expect(verdict([visit(50_000)]).red).toBe(false);
		const over = verdict([visit(49_000), visit(50_001)]);
		expect(over.red).toBe(true);
		expect(over.lines).toContain('  Over the limit by 1 B');
		expect(over.lines).toContain('  Size:       50.00 kB brotlied, 2 files');
	});
});
