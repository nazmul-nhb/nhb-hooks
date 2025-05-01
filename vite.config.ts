import react from '@vitejs/plugin-react';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import type { ViteUserConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	assetsInlineLimit: 0,
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'nhb-hooks',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react'],
			plugins: [visualizer({ open: true })],
			output: {
				globals: {
					react: 'React',
				},
				assetFileNames: './assets/[name].[hash][extname]',
			},
		},
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, 'assets'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './__test__/setup.ts',
	},
} as ViteUserConfig);
