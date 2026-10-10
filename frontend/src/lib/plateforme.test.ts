import { describe, expect, it, vi } from 'vitest';
import { plateformeCloudflare } from './plateforme.ts';

type Evenement = { platform?: App.Platform };

const env = { SEL_COMPTEUR: 'sel' };
const waitUntil = vi.fn();

async function servir(event: Evenement, actif = true) {
	const resolve = vi.fn(async () => new Response('ok'));
	await plateformeCloudflare({ env, waitUntil, actif })({ event, resolve } as never);
	return resolve;
}

describe('plateformeCloudflare', () => {
	it('gives the bindings and waitUntil to a request that has no platform', async () => {
		const event: Evenement = {};
		const resolve = await servir(event);
		expect(event.platform?.env).toBe(env);
		expect(event.platform?.context.waitUntil).toBe(waitUntil);
		expect(resolve).toHaveBeenCalledOnce();
	});

	it('keeps a platform the adapter already passed', async () => {
		const donnee = { env: {}, context: { waitUntil: vi.fn() } } as App.Platform;
		const event: Evenement = { platform: donnee };
		await servir(event);
		expect(event.platform).toBe(donnee);
	});

	it('gives nothing when inactive, in development or while prerendering', async () => {
		const event: Evenement = {};
		const resolve = await servir(event, false);
		expect(event.platform).toBeUndefined();
		expect(resolve).toHaveBeenCalledOnce();
	});
});
