import { isBoolean } from 'nhb-toolbox';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { StopwatchOptions, StopwatchResult } from '../types';

/**
 * * Hook to create high-precision stopwatch using timestamp-based timing.
 *
 * @remarks
 * - Uses `Date.now()` to calculate elapsed time, ensuring accuracy even if:
 *   - The render interval drifts
 *   - The browser throttles timers (e.g. background tabs)
 * - The `interval` option only controls UI update frequency, **not** timing precision
 * - Elapsed time is accumulated using an internal offset, allowing seamless pause/resume cycles
 *
 * @param options - Stopwatch configuration options
 *
 * @returns Stopwatch state and control methods
 *
 * @example
 * Basic usage
 * ```tsx
 * const { elapsed, start, pause } = useStopwatch();
 * ```
 *
 * @example
 * Auto start
 * ```tsx
 * const timer = useStopwatch({ autoStart: true });
 * ```
 *
 * @example
 * Controlled pause (external state)
 * ```tsx
 * const [paused, setPaused] = useState(false);
 *
 * const { elapsed } = useStopwatch({ paused });
 * ```
 *
 * @example
 * Custom update interval
 * ```tsx
 * const stopwatch = useStopwatch({ interval: 50 });
 * ```
 *
 * @example
 * Reset with custom time
 * ```tsx
 * const { reset } = useStopwatch();
 *
 * reset(2000); // reset to 2 seconds
 * ```
 *
 * @example
 * Resume from existing elapsed time
 * ```tsx
 * const stopwatch = useStopwatch({
 *   initialTime: 5000,
 * });
 * ```
 */
export function useStopwatch(options: StopwatchOptions = {}): StopwatchResult {
	const { autoStart = false, interval = 100, initialTime = 0, paused = false } = options;

	const [elapsed, setElapsed] = useState(initialTime);
	const [isRunning, setIsRunning] = useState(autoStart);

	const runningRef = useRef(autoStart);
	const startTimeRef = useRef<number | null>(null);
	const offsetRef = useRef(initialTime);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	/**
	 * Timer tick.
	 */
	const tick = useCallback(() => {
		if (!runningRef.current || startTimeRef.current === null) return;

		setElapsed(offsetRef.current + (Date.now() - startTimeRef.current));
	}, []);

	/**
	 * Start stopwatch.
	 */
	const start = useCallback(() => {
		if (runningRef.current) return;

		runningRef.current = true;
		startTimeRef.current = Date.now();

		setIsRunning(true);
	}, []);

	/**
	 * Pause stopwatch.
	 */
	const pause = useCallback(() => {
		if (!runningRef.current) return;

		runningRef.current = false;

		if (startTimeRef.current !== null) {
			offsetRef.current += Date.now() - startTimeRef.current;
		}

		startTimeRef.current = null;

		setIsRunning(false);
	}, []);

	/**
	 * Reset stopwatch.
	 */
	const reset = useCallback((time = 0) => {
		runningRef.current = false;
		startTimeRef.current = null;
		offsetRef.current = time;

		setElapsed(time);
		setIsRunning(false);
	}, []);

	/**
	 * Toggle running state.
	 */
	const toggle = useCallback(() => {
		if (runningRef.current) {
			pause();
		} else {
			start();
		}
	}, [pause, start]);

	/**
	 * Interval lifecycle.
	 */
	useEffect(() => {
		intervalRef.current = setInterval(tick, interval);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [interval, tick]);

	/**
	 * External pause control.
	 */
	useEffect(() => {
		if (!isBoolean(paused)) return;

		if (paused) {
			queueMicrotask(() => pause());
		} else {
			queueMicrotask(() => start());
		}
	}, [paused, pause, start]);

	/**
	 * Auto start (run once).
	 */
	useEffect(() => {
		if (autoStart) queueMicrotask(() => start());
	}, [autoStart, start]);

	return useMemo(
		() => ({
			elapsed,
			isRunning,
			start,
			pause,
			reset,
			toggle,
		}),
		[elapsed, isRunning, start, pause, reset, toggle]
	);
}
