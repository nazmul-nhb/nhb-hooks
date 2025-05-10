/** Type for `useValidImage` hook's return type. */
export type ValidImage<T> = T extends string ? string : string[];

/** Options for `useValidImage` hook. */
export interface ValidImageOptions {
	/** Base path to prepend to image URL(s) if the image is hosted somewhere else. By default the hook assumes that the link has a trailing `/`. Customize it in `trailingSlash` option. */
	imgHostLink?: string;
	/** Whether the `imgHostLink` has a trailing slash `/`. Default is `true`. Full image URL will be built on this flag. */
	trailingSlash?: boolean;
	/** Fallback image URL. It can be local/public image or hosted image (needs full url for hosted placeholder image). */
	placeholder?: string;
}

/** Interface for `useMediaQuery` hook's options */
export interface MediaQueryOptions {
	/** Minimum screen width in pixels (inclusive) */
	minWidth?: number;
	/** Maximum screen width in pixels (inclusive) */
	maxWidth?: number;
}

/** Options for `useCopyText` hook */
export interface CopyOptions {
	/**
	 * * Callback invoked when the text is successfully copied.
	 * @param msg Message describing the success event.
	 */
	onSuccess?: (msg: string) => void;

	/**
	 * * Callback invoked when the copy operation fails.
	 * @param msg Message describing the error.
	 */
	onError?: (msg: string) => void;

	/**
	 * * Time (in milliseconds) to reset the copied text state.
	 * @default 2500
	 */
	resetTimeOut?: number;
}
