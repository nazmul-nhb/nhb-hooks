import { isNonEmptyString } from 'nhb-toolbox';
import type { Prettify } from 'nhb-toolbox/utils/types';

/** Utility: ensure early inference and string constraint. */
export type EnsureString<S> = S extends string ? S : never;

/** Replace any of these separators with a single space (iterative, bounded). */
type $NormalizeSeparators<S extends string> =
	S extends `${infer Head}-${infer Tail}` ? $NormalizeSeparators<`${Head} ${Tail}`>
	: S extends `${infer Head}_${infer Tail}` ? $NormalizeSeparators<`${Head} ${Tail}`>
	: S extends `${infer Head}.${infer Tail}` ? $NormalizeSeparators<`${Head} ${Tail}`>
	: S extends `${infer Head} ${infer Tail}` ? `${Head} ${$NormalizeSeparators<Tail>}`
	: S;

/** Insert a space before an uppercase letter boundary (e.g. `helloWorld` -> `hello World`). */
type InsertSpaceBeforeUpper<S extends string> =
	S extends `${infer F}${infer R}` ?
		R extends Uncapitalize<R> ?
			`${F}${InsertSpaceBeforeUpper<R>}`
		:	// R starts with uppercase — boundary between F and R
			`${F} ${InsertSpaceBeforeUpper<R>}`
	:	S;

type TrimRight<S extends string> = S extends `${infer L} ` ? TrimRight<L> : S;

type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : S;

type Trim<S extends string> = TrimLeft<TrimRight<S>>;

/** Normalize the input into a single-space separated, lowercased-ish stream,
 *  but keep original characters for case handling later. */
type NormalizeForSplit<S extends string> =
	EnsureString<S> extends infer T ?
		T extends string ?
			Trim<$NormalizeSeparators<InsertSpaceBeforeUpper<T>>>
		:	never
	:	never;

/** Split a space-separated string into a tuple of words. */
type SplitWords<S extends string> =
	S extends '' ? []
	: S extends `${infer Head} ${infer Rest}` ? [Head, ...SplitWords<Rest>]
	: [S];

/** Map tuple of words to lowercase strings. */
type LowercaseWords<Arr extends readonly string[]> =
	Arr extends [infer H extends string, ...infer R extends string[]] ?
		[Lowercase<H>, ...LowercaseWords<R>]
	:	[];

/** Capitalize each word in tuple. */
type CapitalizeWords<Arr extends readonly string[]> =
	Arr extends [infer H extends string, ...infer R extends string[]] ?
		[Capitalize<Lowercase<H>>, ...CapitalizeWords<R>]
	:	[];

/** Join tuple with a separator. */
type JoinWith<Arr extends readonly string[], Sep extends string> =
	Arr extends [] ? ''
	: Arr extends [infer Only extends string] ? Only
	: Arr extends [infer H extends string, ...infer R extends string[]] ?
		`${H}${Sep}${JoinWith<R, Sep>}`
	:	string;

/** ---------- Public case converters ---------- */

/**
 * Convert any literal string `S` to `snake_case`.
 *
 * Examples:
 * - "helloWorld" -> "hello_world"
 * - "Hello-World" -> "hello_world"
 * - "my.example_text" -> "my_example_text"
 */
export type SnakeCase<S extends string> =
	EnsureString<S> extends infer T ?
		T extends string ?
			JoinWith<LowercaseWords<SplitWords<NormalizeForSplit<T>>>, '_'>
		:	never
	:	never;

/**
 * Convert any literal string `S` to `kebab-case`.
 *
 * Examples:
 * - "helloWorld" -> "hello-world"
 * - "Hello_World" -> "hello-world"
 */
export type KebabCase<S extends string> =
	EnsureString<S> extends infer T ?
		T extends string ?
			JoinWith<LowercaseWords<SplitWords<NormalizeForSplit<T>>>, '-'>
		:	never
	:	never;

/**
 * Convert any literal string `S` to `camelCase`.
 *
 * Examples:
 * - "hello_world" -> "helloWorld"
 * - "Hello-world" -> "helloWorld"
 */
export type CamelCase<S extends string> =
	EnsureString<S> extends infer T ?
		T extends string ?
			SplitWords<NormalizeForSplit<T>> extends (
				[infer F extends string, ...infer R extends string[]]
			) ?
				`${Lowercase<F>}${JoinWith<
					{
						[K in keyof R]: R[K] extends string ? Capitalize<Lowercase<R[K]>>
						:	never;
					} extends infer M ?
						M extends string[] ?
							M
						:	[]
					:	never,
					''
				>}`
			:	''
		:	never
	:	never;

/**
 * Convert any literal string `S` to `PascalCase`.
 *
 * Examples:
 * - "hello_world" -> "HelloWorld"
 * - "my-example text" -> "MyExampleText"
 */
export type PascalCase<S extends string> =
	EnsureString<S> extends infer T ?
		T extends string ?
			JoinWith<CapitalizeWords<SplitWords<NormalizeForSplit<T>>>, ''>
		:	never
	:	never;

type Ex<T> = {
	/**
	 * * Function to set value in specified storage.
	 * @param value Value to set in the storage.
	 */
	set: (value: T) => void;
	/** * Function to remove the item from specified storage. */
	remove: () => void;
};

export type Includes<S extends string, Search extends string> =
	S extends `${string}${Search}${string}` ? true : false;

export type Vex<T, Key extends string> = Prettify<
	{
		value: T | null;
		/**
		 * * Function to clear all items from the selected storage type.
		 *
		 * `CAUTION` This will remove **all items** in the selected storage type, not just the current key.
		 */
		clear: () => void;
	} & {
		[K in keyof Ex<T> as `${K}${PascalCase<Key>}`]: Ex<T>[K];
	}
>;

type M = Vex<Date, 'app-settings'>;

const h: M = {} as M;

h.removeAppSettings();
h.setAppSettings(new Date());

type _T = PascalCase<'who are.you?'>;

/** Convert a string to PascalCase (runtime). */
export function pascalCase<S extends string>(input: S): PascalCase<S> {
	return (
		!isNonEmptyString(input) ? '' : (
			input
				.replace(/[-_.]+/g, ' ')
				.replace(/\s+/g, ' ')
				.trim()
				.split(' ')
				.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
				.join('')
		)) as PascalCase<S>;
}
