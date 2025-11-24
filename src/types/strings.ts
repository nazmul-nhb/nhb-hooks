import type { Join, Prettify } from 'nhb-toolbox/utils/types';

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
type $SpaceUpper<S extends string> =
	S extends `${infer F}${infer R}` ?
		R extends Uncapitalize<R> ?
			`${F}${$SpaceUpper<R>}`
		:	`${F} ${$SpaceUpper<R>}`
	:	S;

type $TrimRight<S extends string> = S extends `${infer L} ` ? $TrimRight<L> : S;

type $TrimLeft<S extends string> = S extends ` ${infer R}` ? $TrimLeft<R> : S;

export type Trim<S extends string> = $TrimLeft<$TrimRight<S>>;

/** Normalize the input into a single-space separated, lowercased-ish stream,
 *  but keep original characters for case handling later. */
type $Normalize<S extends string> =
	EnsureString<S> extends infer T ?
		T extends string ?
			Trim<$NormalizeSeparators<$SpaceUpper<T>>>
		:	never
	:	never;

/** Split a space-separated string into a tuple of words. */
type $SplitWords<S extends string> =
	S extends '' ? []
	: S extends `${infer Head} ${infer Rest}` ? [Head, ...$SplitWords<Rest>]
	: [S];

/** Map tuple of words to lowercase strings. */
export type LowercaseWords<Arr extends readonly string[]> =
	Arr extends [infer H extends string, ...infer R extends string[]] ?
		[Lowercase<H>, ...LowercaseWords<R>]
	:	[];

/** Capitalize each word in tuple. */
export type CapitalizeWords<Arr extends readonly string[]> =
	Arr extends [infer H extends string, ...infer R extends string[]] ?
		[Capitalize<Lowercase<H>>, ...CapitalizeWords<R>]
	:	[];

// /** Join tuple with a separator. */
// type $JoinWith<Arr extends readonly string[], Sep extends string> =
// 	Arr extends [] ? ''
// 	: Arr extends [infer Only extends string] ? Only
// 	: Arr extends [infer H extends string, ...infer R extends string[]] ?
// 		`${H}${Sep}${$JoinWith<R, Sep>}`
// 	:	string;

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
			Join<LowercaseWords<$SplitWords<$Normalize<T>>>, '_'>
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
			Join<LowercaseWords<$SplitWords<$Normalize<T>>>, '-'>
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
			$SplitWords<$Normalize<T>> extends (
				[infer F extends string, ...infer R extends string[]]
			) ?
				`${Lowercase<F>}${Join<
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
			Join<CapitalizeWords<$SplitWords<$Normalize<T>>>, ''>
		:	never
	:	never;

export type Includes<S extends string, Search extends string> =
	S extends `${string}${Search}${string}` ? true : false;

type Mutate<T> = {
	/**
	 * * Function to set value in specified storage.
	 * @param value Value to set in the storage.
	 */
	set: (value: T) => void;
	/** * Function to remove the item from specified storage. */
	remove: () => void;
};

type Clear = {
	/**
	 * * Function to clear all items from the selected storage type.
	 *
	 * `CAUTION` This will remove **all items** in the selected storage type, not just the current key.
	 */
	clear: () => void;
};

export type WStore<
	T,
	Key extends string,
	Storage extends 'local' | 'session' = 'local',
> = Prettify<
	// { [K in 'value' as `${K}Of${PascalCase<Key>}`]: T | null }
	{
		/** * Current value from storage, or `null` if not set or on error. */
		value: T | null;
	} & {
		[K in keyof Mutate<T> as `${K}${PascalCase<Key>}`]: Mutate<T>[K];
	} & {
		[K in keyof Clear as `${K}${PascalCase<Storage>}Storage`]: Clear[K];
	}
>;

type Store = WStore<Date, 'app-settings', 'session'>;

const { clearSessionStorage, removeAppSettings, setAppSettings, value } = {} as Store;
const t = {} as Store;

clearSessionStorage();
removeAppSettings();
setAppSettings(new Date());
console.info(value);
t.clearSessionStorage();
