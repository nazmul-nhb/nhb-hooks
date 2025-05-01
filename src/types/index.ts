/** Type for `useValidImage` hook's return type. */
export type ValidImage<T> = T extends string ? string : string[];

/** Options for `useValidImage` hook. */
export interface ValidImageOptions {
	/** Optional base path to prepend to image URLs (no trailing slash) */
	imgHostLink?: string;
	/** Fallback image URL. If your project is not using `Vite`, you must provide the placeholder explicitly. */
	placeholder?: string;
}
