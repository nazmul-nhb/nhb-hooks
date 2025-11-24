import type { PascalCase } from '../types/strings';

/** Convert a string to `PascalCase`. */
export function toPascalCase<S extends string>(input: S): PascalCase<S> {
	return (
		typeof input === 'string' ?
			input
				.replace(/[-_.]+/g, ' ')
				.replace(/\s+/g, ' ')
				.trim()
				.split(' ')
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
				.join('')
		:	'') as PascalCase<S>;
}
