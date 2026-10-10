/**
 * Gives `event.platform` back to the routes and to the visitor counter.
 *
 * adapter-cloudflare 8 no longer passes one: the bindings and `waitUntil` come
 * from `cloudflare:workers`. Without this hook the counter counted nothing and
 * /health read its own files as 404 (measured in production on v0.0.16,
 * 2026-10-10). It runs before everything that reads `platform`, so the counter
 * stays a byte-for-byte copy of its template.
 *
 * The bindings are passed in rather than imported: the adapter resolves
 * `cloudflare:workers` to a stub no test can replace.
 */
import type { Handle } from '@sveltejs/kit/hooks';

type Liaisons = {
	env: App.Platform['env'];
	waitUntil: App.Platform['context']['waitUntil'];
	/** False in development and while prerendering: neither is a visit. */
	actif: boolean;
};

export function plateformeCloudflare({ env, waitUntil, actif }: Liaisons): Handle {
	return ({ event, resolve }) => {
		if (actif && !event.platform) {
			Object.assign(event, { platform: { env, context: { waitUntil } } });
		}
		return resolve(event);
	};
}
