import type { Chronos } from 'nhb-toolbox';
import type {
	StrictFormat,
	TimeUnit,
	TimeZone,
	TimeZoneIdentifier,
	UTCOffset,
} from 'nhb-toolbox/date/types';
import type { NumberRange } from 'nhb-toolbox/number/types';
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
	/** * A string containing the last copied text (`string`). Automatically resets (`undefined`) after timeout. */
	copiedText: string | undefined;
	/**
	 * * Function to copy the provided text to the clipboard. Optionally accepts custom success and error msg.
	 *
	 * @param text - The string content to be copied.
	 * @param msg - Optional custom success message. Default is `'Text Copied!'`
	 * @param errorMsg - Optional custom error message. Default is `message` from the `Error` object or `'Failed to copy!'`
	 */
	copyToClipboard: (text: string, msg?: string, errorMsg?: string) => Promise<void>;
}

/** Page title position, either `"after" `or `"before"` the site title. */
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
	Pick<TitleContextConfig, 'siteTitle' | 'defaultPosition' | 'defaultSeparator'>
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
	 * Timezone string:
	 * - Time zone identifier (e.g., `'Africa/Harare'`)
	 * - Time zone abbreviation (e.g., `'IST'`, `'UTC'`, `'EST'` etc.)
	 * - UTC Offset in `UTC±HH:mm` format for fictional or unlisted time zone (e.g., `'UTC+06:15'`)
	 *
	 * Passed to `Chronos.timeZone()`.
	 */
	timeZone?: TimeZoneIdentifier | TimeZone | UTCOffset;

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
	formatted: string;
	/** * Stops the clock updates (pause effect). */
	pause: () => void;
	/** * Resumes the clock updates (if previously paused). */
	resume: () => void;
	/** * Indicates whether the clock is currently paused. */
	isPaused: boolean;
}

/** - Time units for `useTimer` hook. */
export type TimerUnit = Exclude<TimeUnit, 'week'>;

/** Options to format duration string for object returned by `useTimer` hook used by the helper utility `formatTimer` */
export type TimerFormatOptions = {
	/** Maximum number of units (`1-6`) to display, e.g. 2 → "1 hour, 20 minutes". Default is `6`. */
	maxUnits?: NumberRange<1, 6>;
	/** Separator between units (default: `' · '`) */
	separator?: string;
	/** Display mode: `"full"` (default) → "2 hours", `"short"` → "2h" */
	style?: 'full' | 'short';
	/** Whether to include zero values (default: `false`) */
	showZero?: boolean;
};

/** Options for `useStorage` hook. */
export type StorageOptions<T> = {
	/** * Key to store the value with in local/session storage. */
	key: string;
	/** * Storage type to use (`localStorage`/`sessionStorage`). Defaults to `'local'`. */
	type?: 'local' | 'session';
	/**
	 * * Optional serializer function to convert the value of type `T` to a string. Defaults to `JSON.stringify`.
	 * @param value Value to serialize.
	 * @returns Serialized/stringified value.
	 */
	serialize?: (value: T) => string;
	/**
	 * * Optional deserializer function to convert the stored value back to type `T`. Defaults to `JSON.parse`.
	 * @param value Value to deserialize/parse to its actual type.
	 * @returns Parsed/deserialized value.
	 */
	deserialize?: (value: string) => T;
};

/** * Return type of `useStorage` hook. */
export type WebStorage<T> = {
	/** * Current value from storage, or `null` if not set or on error. */
	value: T | null;
	/**
	 * * Function to set value in specified storage.
	 * @param value Value to set in the storage.
	 */
	set: (value: T) => void;
	/** * Function to remove the item from specified storage. */
	remove: () => void;
	/**
	 * * Function to clear all items from the selected storage type.
	 *
	 * `CAUTION` This will remove **all items** in the selected storage type, not just the current key.
	 */
	clear: () => void;
};

/** Options for `useTimerMs` */
export interface TimerOptions {
	/**
	 * Start the countdown automatically when the hook mounts.
	 *
	 * @default false
	 */
	autoStart?: boolean;

	/**
	 * Update interval in milliseconds.
	 *
	 * This controls how often the UI is refreshed, not the actual countdown accuracy.
	 *
	 * @default 100
	 */
	interval?: number;

	/**
	 * Initial remaining time in milliseconds.
	 *
	 * Use this when you want to resume from a precomputed value instead of deriving the starting point from `time`.
	 */
	initialRemainingMs?: number;

	/**
	 * External pause control.
	 *
	 * When `false`, the timer will start or resume. When `true`, the timer pauses and preserves the current remaining time.
	 *
	 * @default false
	 */
	paused?: boolean;
}

/** Result of `useTimerMs` */
export interface TimerResult {
	/**
	 * Remaining countdown time in milliseconds.
	 */
	remaining: number;

	/**
	 * Indicates whether the timer is currently running.
	 */
	isRunning: boolean;

	/**
	 * Starts or resumes the countdown.
	 *
	 * If the timer is already running, this function does nothing.
	 */
	start: () => void;

	/**
	 * Pauses the countdown.
	 *
	 * The current remaining time is preserved and can be resumed later with
	 * {@link start}.
	 */
	pause: () => void;

	/**
	 * Resets the timer.
	 *
	 * Stops the countdown and sets the remaining time to the provided value.
	 * When no value is passed, the timer resets to the initial countdown value resolved from `time` or `initialRemainingMs`.
	 *
	 * @param time - Optional remaining time in milliseconds.
	 */
	reset: (time?: number) => void;

	/**
	 * Toggles the running state of the timer.
	 *
	 * If running, pauses the timer. If paused, starts or resumes it.
	 */
	toggle: () => void;
}

/** Options for `useStopwatch` */
export interface StopwatchOptions {
	/**
	 * Start the stopwatch automatically when the hook mounts.
	 *
	 * @default false
	 */
	autoStart?: boolean;

	/**
	 * Update interval in milliseconds.
	 *
	 * This controls how often the UI is refreshed, not the actual stopwatch precision.
	 *
	 * @default 100
	 */
	interval?: number;

	/**
	 * Initial elapsed time in milliseconds.
	 */
	initialTime?: number;

	/**
	 * External pause control.
	 *
	 * When `false`, the stopwatch starts or resumes. When `true`, the stopwatch pauses and preserves the current elapsed time.
	 *
	 * @default false
	 */
	paused?: boolean;
}

/** Result of `useStopwatch` */
export interface StopwatchResult {
	/**
	 * Elapsed time in milliseconds.
	 *
	 * This value increases while the stopwatch is running and remains constant while paused.
	 */
	elapsed: number;

	/**
	 * Indicates whether the stopwatch is currently running.
	 */
	isRunning: boolean;

	/**
	 * Starts or resumes the stopwatch.
	 *
	 * If the stopwatch is already running, this function does nothing.
	 */
	start: () => void;

	/**
	 * Pauses the stopwatch.
	 *
	 * The current elapsed time is preserved and can be resumed later with {@link start}.
	 */
	pause: () => void;

	/**
	 * Resets the stopwatch.
	 *
	 * Stops the stopwatch and sets the elapsed time to the provided value.
	 *
	 * @param time - Optional elapsed time in milliseconds. Defaults to `0`.
	 */
	reset: (time?: number) => void;

	/**
	 * Toggles the running state of the stopwatch.
	 *
	 * If running, pauses the stopwatch. If paused, starts or resumes it.
	 */
	toggle: () => void;
}
