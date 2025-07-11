import type { Chronos } from 'nhb-toolbox';
import type { StrictFormat, TimeZone, UTCOffSet } from 'nhb-toolbox/date/types';
import type { Prettify } from 'nhb-toolbox/utils/types';
import type { ReactNode } from 'react';
import type { TITLE_POSITIONS } from '../constants';

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

/** Return type of `useCopyText` */
export interface UseCopyTextReturn {
	/** * A string containing the last copied text. Automatically resets after timeout. */
	copiedText: string;
	/**
	 * * Function to copy the provided text to the clipboard.
	 *
	 * @param text - The string content to be copied.
	 * @param msg - Optional custom success message. Default is `'Text Copied!'`
	 * @param errorMsg - Optional custom error message. Default is from message from the error object or `'Failed to copy!'`
	 */
	copyToClipboard: (
		text: string,
		msg?: string,
		errorMsg?: string,
	) => Promise<void>;
}

export type TitlePosition = (typeof TITLE_POSITIONS)[number];

/** * Configuration options for the title context. */
export interface TitleContextConfig {
	/** Default site or app title (e.g., 'Bangu Site Inc.'). */
	siteTitle: string;
	/** Title of the current page. Site title not included. */
	pageTitle?: string;
	/** Set current page's title. */
	setPageTitle?: (title: string) => void;
	/** Full title of the current page. Site title included with separator. */
	fullTitle?: string;
	/** Set current page's full title. */
	setFullTitle?: (title: string) => void;
	/** Where to place the page title relative to the site title. Default is `"before"`. */
	defaultPosition?: TitlePosition;
	/** Separator string between page title and site title. Default is `" - "`. */
	defaultSeparator?: string;
}

/** Metadata from `TitleProvider` and `useTitle` */
export type TitleMeta = Prettify<
	Partial<Omit<TitleContextConfig, 'setPageTitle' | 'setFullTitle'>>
>;

/** Configuration options for the title context provider. */
export type TitleConfig = Partial<
	Pick<
		TitleContextConfig,
		'siteTitle' | 'defaultPosition' | 'defaultSeparator'
	>
>;

/** * Runtime options for a specific call to `useTitle`. */
export interface TitleOptions {
	/** Custom separator string (overrides context default).. Default is `" - "`.  */
	separator?: string;
	/** Position of the page title relative to the site title (overrides context default). Default is `"before"`. */
	position?: TitlePosition;
	/** Set favicon for the current page, use static image path. */
	favicon?: string;
}

/** * Props accepted by the `TitleProvider` component. */
export interface TitleProviderProps {
	/** React children to wrap in the provider. */
	children: ReactNode;
	/** Optional override configuration for title behavior. */
	config?: TitleConfig;
}

/** Configurable options for `useClock` hook */
export interface UseClockOptions {
	/**
	 * Timezone string (e.g., `'BDT'`, or UTC offset like `'+06:00'`).
	 * Passed to `Chronos.timeZone()`.
	 */
	timeZone?: TimeZone | UTCOffSet;

	/**
	 * Format string to return a formatted time value via `Chronos.format()`.
	 * If omitted, default formatted (`'HH:mm:ss'`) string will be returned.
	 * @default 'HH:mm:ss'
	 */
	format?: StrictFormat;

	/**
	 * Update interval in milliseconds, or `'frame'` to use `requestAnimationFrame`.
	 * @default 1000
	 */
	interval?: number | 'frame';

	/**
	 * Whether to start the clock immediately.
	 * If `false`, the clock is paused until `resume()` is called.
	 * @default true
	 */
	autoStart?: boolean;
}

/** * Object returned by `useClock` hook. */
export interface UseClockResult {
	/** * Current Chronos time instance, respecting timezone (if provided). */
	time: Chronos;
	/** * Formatted time string based on the `format` option. */
	formatted: string | undefined;
	/** * Stops the clock updates (pause effect). */
	pause: () => void;
	/** * Resumes the clock updates (if previously paused). */
	resume: () => void;
	/** * Indicates whether the clock is currently paused. */
	isPaused: boolean;
}
