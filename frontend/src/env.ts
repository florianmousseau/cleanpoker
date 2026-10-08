import { defineEnvVars } from '@sveltejs/kit/env';

// Both point at the room server; the build inlines them, the browser reads them.
export const variables = defineEnvVars({
	PUBLIC_API_URL: { public: true, static: true },
	PUBLIC_WS_URL: { public: true, static: true }
});
