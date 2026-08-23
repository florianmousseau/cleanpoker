// Nothing pushes the page past the screen.
//
// Measured on the 16 served pages the 2026-08-23, at 320 px with the browser
// text size doubled: 7 of them pushed the document past the viewport, up to
// 432 px on /fr/alternatives, and `body` carried `overflow-x: hidden`, which
// clipped the overflow instead of repairing it.
//
// Seven causes, and each one is a rule below:
//
//   1. a grid track written `1fr` means `minmax(auto, 1fr)`, and that `auto` is
//      the min-content of the cell: the track refuses to go below its contents
//      and carries the document with it. `minmax(0, 1fr)` renders identically
//      wherever the content fits;
//   2. a grid with no `grid-template-columns` at all gets an implicit `auto`
//      track, which is the same floor by another road;
//   3. a `minmax()` minimum written as a length is a hard floor too, so it has
//      to be `min(<length>, 100%)`;
//   4. a horizontal padding in `rem` DOUBLES when the reader enlarges the text:
//      1.4rem took 45 px off each side of a 320 px line. Capping it in px
//      changes nothing at the default size, where 1rem is already 16px;
//   5. `white-space: nowrap` makes the longest word of a label the minimum
//      width of its box. It is allowed in three places and nowhere else: inside
//      a `@media (min-width: <px>)`, on visually hidden text, and inside a box
//      that scrolls horizontally - see `scrollingAncestors` below;
//   6. a flex row that spreads its children apart cannot shrink below the sum
//      of their min-contents unless it may wrap, so it has to say which;
//   7. the FLOOR of a `clamp()` is a length like any other. `--gutter:
//      clamp(1.1rem, 4vw, 2.2rem)` reads as a responsive value and is not: the
//      viewport term is the one that shrinks, the rem floor is the one that
//      wins, and it took 70 px off a 320 px line once the text was doubled.
//
// Plus the safety net that catches what no rule predicts: `overflow-wrap` on
// the body, which breaks only what would overflow and never touches min-content.
// `overflow-x: hidden` on the body is refused: it CLIPS the overflow instead of
// repairing it, and `documentElement.scrollWidth` then stops telling the truth
// (measured on fidalo.co the same day).
//
// It reads app.css AND every `<style>` block of the components: on quivad,
// the 2026-08-22, a guard that read only the main sheet was green while two of
// the three faulty grids lived in a component.
//
// `npm run check:reflow`. This repo has no `gate` script: its CI replays the
// commands one by one, so the check is wired as a step of the `Code Quality`
// job. Wired in one place only, it would never run.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SRC = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const MIN_SHEETS = 40;
const MIN_RULES = 650;

function walk(dir, out = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full, out);
		else if (/\.(svelte|css)$/.test(entry)) out.push(full);
	}
	return out;
}

/** Comments go first: this check's own explanations name the very patterns it refuses. */
const withoutComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, ' ');

/** Every stylesheet of the site: the global one, plus each component's `<style>`. */
function sheets() {
	const out = [];
	for (const file of walk(SRC)) {
		const source = readFileSync(file, 'utf8');
		if (file.endsWith('.css')) {
			out.push({ file, css: withoutComments(source) });
			continue;
		}
		for (const m of source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
			out.push({ file, css: withoutComments(m[1]) });
		}
	}
	return out;
}

/** The innermost `{ ... }` blocks, which is where declarations live. */
function rulesOf(css) {
	const out = [];
	for (const m of css.matchAll(/([^{}]*)\{([^{}]+)\}/g)) {
		out.push({ selector: m[1].trim().split('\n').pop().trim(), body: m[2], at: m.index });
	}
	return out;
}

/**
 * The selectors of this sheet that scroll horizontally inside themselves.
 *
 * `nowrap` on a descendant of one of them cannot push the document anywhere:
 * the box gives up its width first and scrolls inside itself. Two on this site
 * do exactly that on purpose - the header nav, which refuses to hide a link
 * from a small screen, and the three-ruler table of the home page.
 */
function scrollingAncestors(css) {
	const out = [];
	for (const rule of rulesOf(css)) {
		if (!/overflow(-x)?:\s*(auto|scroll)/.test(rule.body)) continue;
		for (const sel of rule.selector.split(',')) {
			const one = sel.trim();
			if (one && !one.includes(':')) out.push(one);
		}
	}
	return out;
}

/**
 * The byte ranges held by a `@media (min-width: <px>)` block. A rule that only
 * applies above a pixel width cannot hurt a 320 px screen, whatever the reader's
 * text size - the same condition written in `rem` would double with it.
 */
function wideOnlyRanges(css) {
	const ranges = [];
	for (const m of css.matchAll(/@media[^{]*min-width:\s*\d+px[^{]*\{/g)) {
		let depth = 1;
		let i = m.index + m[0].length;
		while (i < css.length && depth > 0) {
			if (css[i] === '{') depth += 1;
			if (css[i] === '}') depth -= 1;
			i += 1;
		}
		ranges.push([m.index, i]);
	}
	return ranges;
}

/** Splits a shorthand into its top-level parts, keeping `min(a, b)` whole. */
function parts(value) {
	const out = [];
	let depth = 0;
	let current = '';
	for (const c of value.trim()) {
		if (c === '(') depth += 1;
		if (c === ')') depth -= 1;
		if (/\s/.test(c) && depth === 0) {
			if (current) out.push(current);
			current = '';
		} else current += c;
	}
	if (current) out.push(current);
	return out;
}

/** The left and right parts of a padding declaration, whatever its form. */
function horizontalPaddings(property, value) {
	const p = parts(value);
	if (property === 'padding-left' || property === 'padding-right') return p;
	if (property === 'padding-inline') return p;
	if (property === 'padding-block' || property === 'padding-top' || property === 'padding-bottom')
		return [];
	if (p.length === 1) return p;
	if (p.length === 2 || p.length === 3) return [p[1]];
	if (p.length === 4) return [p[1], p[3]];
	return [];
}

const remValue = (v) => {
	const m = /^(\d+(?:\.\d+)?)rem$/.exec(v);
	return m ? parseFloat(m[1]) : null;
};

function faultsIn(sheet) {
	const found = [];
	const say = (what, detail) => found.push({ file: sheet.file, what, detail });
	const wide = wideOnlyRanges(sheet.css);
	const onlyOnWideScreens = (at) => wide.some(([from, to]) => at >= from && at < to);
	const scrollers = scrollingAncestors(sheet.css);
	const insideAScroller = (selector) => scrollers.some((one) => selector.startsWith(one + ' '));

	for (const rule of rulesOf(sheet.css)) {
		// `nowrap` makes the longest word of a label the minimum width of its box:
		// `npx truecopy a-statement.pdf` measured 308 px on a 320 px screen with the
		// text doubled. Two places make it harmless: visually-hidden text, around
		// which nothing is laid out, and a box that scrolls horizontally.
		const hidden = /clip:|position:\s*absolute/.test(rule.body);
		if (
			/white-space:\s*nowrap/.test(rule.body) &&
			!hidden &&
			!onlyOnWideScreens(rule.at) &&
			!insideAScroller(rule.selector)
		) {
			say('white-space: nowrap outside a min-width in px or a scrolling box', rule.selector);
		}

		// A flex row that spreads its children apart cannot shrink below the sum of
		// their min-contents unless it is allowed to wrap. Both headers of this site
		// ran 643 px wide on a 320 px screen with the text doubled, and neither said
		// anything about wrapping - so the answer has to be written down, either way.
		if (
			/display:\s*flex/.test(rule.body) &&
			/justify-content:\s*space-between/.test(rule.body) &&
			!/flex-wrap:/.test(rule.body)
		) {
			say('a spread-out flex row that never says whether it may wrap', rule.selector);
		}

		const columns = /grid-template-columns:\s*([^;}]+)/.exec(rule.body);

		if (/display:\s*grid/.test(rule.body) && !columns) {
			say('a grid without grid-template-columns', rule.selector);
		}

		if (columns) {
			const value = columns[1];
			for (const track of parts(value.replace(/repeat\([^,]+,/g, '').replace(/\)\s*$/, ''))) {
				if (/^\d*(\.\d+)?fr$/.test(track))
					say('a bare fr track', `${rule.selector} { ... ${value.trim()} }`);
			}
			for (const m of value.matchAll(/minmax\(\s*([^,]+),/g)) {
				const min = m[1].trim();
				if (/^\d+(\.\d+)?(px|rem|em|ch)$/.test(min)) {
					say('a minmax() minimum that cannot shrink', `${rule.selector} { ... ${value.trim()} }`);
				}
			}
		}

		// The floor of a clamp, on anything that eats horizontal room. The `vw`
		// term between the two is what makes it look safe; only the first
		// argument decides how narrow the box is ever allowed to get.
		for (const m of rule.body.matchAll(
			/(--[\w-]*gutter[\w-]*|padding-inline|column-gap|gap|margin-inline):\s*([^;}]+)/g
		)) {
			const floor = /clamp\(\s*([^,]+),/.exec(m[2]);
			if (floor && remValue(floor[1].trim()) !== null) {
				say(
					'a clamp() whose floor is in rem, so it doubles with the text size',
					`${rule.selector} { ${m[1]}: ${m[2].trim()} }`
				);
			}
		}

		for (const m of rule.body.matchAll(
			/(padding(?:-inline|-block|-left|-right|-top|-bottom)?):\s*([^;}]+)/g
		)) {
			for (const side of horizontalPaddings(m[1], m[2])) {
				const rem = remValue(side);
				if (rem !== null && rem >= 1) {
					say(
						'a horizontal padding in rem that doubles with the text size',
						`${rule.selector} { ${m[1]}: ${m[2].trim()} }`
					);
				}
			}
		}
	}
	return found;
}

/** The safety net, and it only makes sense on the sheet the whole site loads. */
function bodyGuards(css) {
	const out = [];
	const body = rulesOf(css).find((r) => r.selector === 'body');
	if (!body) return ['no `body` rule in app.css'];
	if (!/overflow-wrap:\s*break-word/.test(body.body)) {
		out.push(
			'`body` no longer carries `overflow-wrap: break-word`, so a word longer than the line takes the page with it'
		);
	}
	if (/overflow-x:\s*hidden/.test(body.body)) {
		out.push(
			'`body` carries `overflow-x: hidden`, which hides an overflow instead of fixing it - the text is then cut off with no way to reach it'
		);
	}
	// A table is the one box `break-word` cannot help: its minimum width is the
	// SUM of its columns' min-contents, and `break-word` never lowers a
	// min-content. Measured in production the 2026-08-23, with every rem margin
	// already capped, the comparison pages still ran 417 px past a 320 px screen
	// and the culprit was a `th` or a `td` every time. So every table scrolls
	// inside its own box - see `tablesOutsideAScroller` for the other half.
	const wrap = rulesOf(css).find(
		(r) => r.selector === '.table-wrap' && /overflow-x:\s*auto/.test(r.body)
	);
	if (!wrap) {
		out.push(
			'no `.table-wrap { overflow-x: auto }` in app.css, so a table keeps the width of its widest cell and carries the page past the screen'
		);
	}
	return out;
}

/**
 * Every `<table>` of the site, and whether something scrolls around it.
 *
 * The rule above only says the class exists; this says it is USED. `anywhere` on
 * the cells was tried first, on the live pages: it brings the six faulty ones to
 * zero and BREAKS a weld doing it - Chrome wraps on the no-break space of
 * `XXL,\u00A0?`. Repairing an overflow by breaking a weld does not count.
 */
function tablesOutsideAScroller() {
	const out = [];
	for (const file of walk(SRC)) {
		if (!file.endsWith('.svelte')) continue;
		const source = readFileSync(file, 'utf8');
		for (const m of source.matchAll(/<table\b/g)) {
			const before = source.slice(0, m.index);
			if (/<div class="table-wrap">\s*$/.test(before)) continue;
			out.push(relative(SRC, file).split(sep).join('/'));
		}
	}
	return out;
}

// --- Proving the detector, before it is allowed to pass -----------------------
// A check that measures nothing stays green forever. Each of the four defects is
// put back, one at a time, and has to turn it red - then the clean sheet has to
// turn it green again.
const CLEAN = `
/* a bare 1fr in a comment must not be read: grid-template-columns: 1fr; */
.a { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; }
.b { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.c { grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); }
.d { padding: 1.9rem min(1.9rem, 30px); }
.e { padding: 1rem 0; }
.f { padding-inline: var(--gutter); }
.g { padding-block: 2rem; }
.h { display: grid; grid-template-columns: none; }
.i { position: absolute; clip: rect(0 0 0 0); white-space: nowrap; }
@media (min-width: 640px) { .j { white-space: nowrap; } }
.k { display: flex; flex-wrap: wrap; justify-content: space-between; }
.l { display: flex; align-items: center; gap: 1rem; }
.m { overflow-x: auto; min-width: 0; }
.m a { white-space: nowrap; }
.n { --gutter: clamp(min(1.1rem, 18px), 4vw, 2.2rem); }
.o { padding-inline: clamp(12px, 4vw, 2.2rem); }
.p { padding-block: clamp(3rem, 8vw, 5.5rem); }
`;

const proofs = [];
const check = (css) => faultsIn({ file: 'sample.css', css: withoutComments(css) });
if (check(CLEAN).length) {
	proofs.push(
		`wrongly flags a clean sheet: ${check(CLEAN)
			.map((f) => f.what)
			.join(', ')}`
	);
}
const mustFlag = [
	['.z { display: grid; gap: 1rem; }', 'a grid without grid-template-columns'],
	['.z { display: grid; grid-template-columns: 1fr 2fr; }', 'a bare fr track'],
	['.z { grid-template-columns: repeat(2, 1fr); }', 'a bare fr track'],
	[
		'.z { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }',
		'a minmax() minimum that cannot shrink'
	],
	['.z { padding: 1.9rem; }', 'a horizontal padding in rem that doubles with the text size'],
	['.z { padding: 0.9rem 1.1rem; }', 'a horizontal padding in rem that doubles with the text size'],
	['.z { padding-left: 1.25rem; }', 'a horizontal padding in rem that doubles with the text size'],
	[
		'.z { white-space: nowrap; }',
		'white-space: nowrap outside a min-width in px or a scrolling box'
	],
	[
		'@media (min-width: 40rem) { .z { white-space: nowrap; } }',
		'white-space: nowrap outside a min-width in px or a scrolling box'
	],
	[
		'.scr { overflow-x: auto; } .other a { white-space: nowrap; }',
		'white-space: nowrap outside a min-width in px or a scrolling box'
	],
	[
		'.scr { overflow-y: auto; } .scr a { white-space: nowrap; }',
		'white-space: nowrap outside a min-width in px or a scrolling box'
	],
	[
		'.z { display: flex; justify-content: space-between; height: 64px; }',
		'a spread-out flex row that never says whether it may wrap'
	],
	[
		':root { --gutter: clamp(1.1rem, 4vw, 2.2rem); }',
		'a clamp() whose floor is in rem, so it doubles with the text size'
	],
	[
		'.z { padding-inline: clamp(1rem, 4vw, 3rem); }',
		'a clamp() whose floor is in rem, so it doubles with the text size'
	],
	[
		'.z { gap: clamp(1rem, 2vw, 2rem); }',
		'a clamp() whose floor is in rem, so it doubles with the text size'
	]
];
for (const [css, what] of mustFlag) {
	if (!check(css).some((f) => f.what === what)) proofs.push(`misses ${what} in \`${css.trim()}\``);
}
if (check('.z { padding: 0.6rem 0.5rem; }').length)
	proofs.push('wrongly flags a padding below 1rem');
if (check('@media (min-width: 640px) { .z { white-space: nowrap; } }').length)
	proofs.push('wrongly flags a nowrap that only applies above 640px');
const SOUND_BODY = 'body { overflow-wrap: break-word; } .table-wrap { overflow-x: auto; }';
if (!bodyGuards('body { overflow-x: hidden; }').length)
	proofs.push('misses a body without overflow-wrap');
if (bodyGuards(SOUND_BODY).length) proofs.push('wrongly flags a sound body rule');
if (!bodyGuards('body { overflow-wrap: break-word; }').length)
	proofs.push('misses a missing `.table-wrap` rule');
if (!bodyGuards('body { overflow-wrap: break-word; } .table-wrap { overflow: hidden; }').length)
	proofs.push('takes any `.table-wrap` rule for one that scrolls');

const found = sheets();
if (found.length < MIN_SHEETS) {
	proofs.push(
		`only ${found.length} stylesheets read, expected at least ${MIN_SHEETS} - a glob that stops resolving must turn this red, not mute`
	);
}
const ruleCount = found.reduce((n, s) => n + rulesOf(s.css).length, 0);
if (ruleCount < MIN_RULES) {
	proofs.push(`only ${ruleCount} rules read, expected at least ${MIN_RULES}`);
}

if (proofs.length) {
	console.error(
		'The reflow check does not measure what it claims:\n' +
			proofs.map((p) => `  - it ${p}`).join('\n')
	);
	process.exit(1);
}

// --- The check itself ---------------------------------------------------------
const global = found.find((s) => s.file.endsWith(`app.css`));
const faults = found.flatMap(faultsIn);
const netFaults = global ? bodyGuards(global.css) : ['app.css was not read'];
for (const file of tablesOutsideAScroller()) {
	netFaults.push(`${file}: a <table> with nothing scrolling around it - wrap it in a \`.table-wrap\``);
}

if (faults.length || netFaults.length) {
	console.error(
		`Narrow screens: ${faults.length + netFaults.length} rules can push the page past the viewport ` +
			'when the reader enlarges the text on a 320 px screen.\n' +
			[
				...netFaults.map((n) => `  - ${n}`),
				...faults.map(
					(f) => `  - ${relative(SRC, f.file).split(sep).join('/')}: ${f.what} - ${f.detail}`
				)
			].join('\n')
	);
	process.exit(1);
}
console.log(
	`Reflow checks passed: ${found.length} stylesheets, ${ruleCount} rules, no unbounded grid track, no rem gutter that doubles, no unconditional nowrap and no silent flex row.`
);
