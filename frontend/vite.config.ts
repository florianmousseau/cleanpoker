import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// The commit /health serves and judges against main. The deploy workflow
	// builds on GitHub, which sets GITHUB_SHA; a local build says "inconnu".
	define: {
		__COMMIT__: JSON.stringify(process.env.GITHUB_SHA ?? 'inconnu'),
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: { passes: 3 },
		},
	}
});
