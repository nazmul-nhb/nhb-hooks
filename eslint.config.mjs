// @ts-check

import js from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ ignores: ['dist'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	reactHooks.configs.flat.recommended,
	{
		// files: ['**/*.{ts,tsx,js,mjs}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				NodeJS: 'readonly',
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
	{
		plugins: {
			'react-refresh': reactRefresh,
		},
		rules: {
			...tsEslintPlugin.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'no-unused-expressions': 'error',
			'prefer-const': 'warn',
			'no-undef': 'error',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-expressions': 'error',
			'@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: false,
				},
			],
		},
	},
	{
		// files: ['**/*.{ts,tsx,js,mjs}'],
		rules: {
			// Disallow ONLY `console.log`
			'no-restricted-syntax': [
				'warn',
				{
					selector:
						"CallExpression[callee.object.name='console'][callee.property.name='log']",
					message:
						'Avoid using `console.log`; use `console.info/warn/error/table/dir` etc. instead.',
				},
			],
		},
	},
];
