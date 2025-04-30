import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { ViteUserConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'nhb-hooks',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'React',
				},
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './__test__/setup.ts',
	},
} as ViteUserConfig);
