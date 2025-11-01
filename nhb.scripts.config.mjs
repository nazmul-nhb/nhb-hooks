// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

export default defineScriptConfig({
	format: {
		args: ['--write'],
		files: ['src', 'eslint.config.mjs', 'nhb.scripts.config.mjs'],
		ignorePath: '.prettierignore',
	},
	commit: {
		runFormatter: true,
		wrapPrefixWith: '`',
	},
	lint: {
		folders: ['src'],
		patterns: ['**/*.ts', '**/*.tsx'],
	},
	fix: {
		folders: ['src'],
		patterns: ['**/*.ts', '**/*.tsx'],
	},
	count: {
		defaultPath: 'src/index.ts',
		excludePaths: ['node_modules', 'dist'],
	},
	build: {
		commands: [{ cmd: 'vite build' }, { cmd: 'rollup', args: ['-c'] }],
	},
});
