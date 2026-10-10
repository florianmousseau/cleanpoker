// What this app reads from `cloudflare:workers`, which adapter-cloudflare 8
// resolves at build time. Declared here rather than through
// @cloudflare/workers-types, whose globals would replace the DOM's.
declare module 'cloudflare:workers' {
	export const env: App.Platform['env'];
	export function waitUntil(work: Promise<unknown>): void;
}
