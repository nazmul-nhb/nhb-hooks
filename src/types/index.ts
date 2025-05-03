/** Type for `useValidImage` hook's return type. */
export type ValidImage<T> = T extends string ? string : string[];

/** Options for `useValidImage` hook. */
export interface ValidImageOptions {
	/** Optional base path to prepend to image URLs */
	imgHostLink?: string;
	/** Whether the `imgHostLink` has any trailing slash `/`. Default is `false`. Full image URL will be built on this flag. */
	trailingSlash?: boolean;
	/** Fallback image URL.
	 *
	 *  **Note**: *If your project is not using `Vite`, you might have to provide the placeholder explicitly in the options.*
	 */
	placeholder?: string;
}

/** Interface for `useMediaQuery` hook's options */
export interface MediaQueryOptions {
	/** Minimum screen width in pixels (inclusive) */
	minWidth?: number;
	/** Maximum screen width in pixels (inclusive) */
	maxWidth?: number;
}
