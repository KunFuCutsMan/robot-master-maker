import { svelte } from '@sveltejs/vite-plugin-svelte';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [svelte()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	resolve: {
		alias: {
			$lib: '/src/lib'
		}
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: 'robot-master-maker',
		},
		rollupOptions: {

		}
	}
});
