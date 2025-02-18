import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

// import dsv from '@rollup/plugin-dsv';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
