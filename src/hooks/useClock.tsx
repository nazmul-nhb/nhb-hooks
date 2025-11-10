import { Chronos } from 'nhb-toolbox';
import type { TimeZoneIdentifier } from 'nhb-toolbox/date/types';
import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { UseClockOptions, UseClockResult } from '../types';

/**
 * * React hook that returns a live-updating `Chronos` clock.
 *
 * It supports:
 * - Automatic or manual ticking
 * - Timezone handling via `timeZone(...)` method of `Chronos` instance
 * - Formatted string output via `format(...)` method of `Chronos` instance
 * - Optional `requestAnimationFrame`-based ticking
 * - Pause and resume controls
 *
 * Internally uses `Chronos` from `nhb-toolbox` and registers the `timeZonePlugin` automatically.
 *
 * @param options - {@link UseClockOptions Options} to configure interval, timezone, formatting, etc.
 * @returns Reactive clock state, formatted {@link UseClockResult output}, and controls.
 *
 * @example
 * // Basic usage (updates every second)
 * const { time } = useClock();
 * console.log(time.toISOString());
 *
 * @example
 * // With formatting
 * const { formatted } = useClock({ format: 'hh:mm:ss A' });
 * console.log(formatted); // → "02:19:42 PM"
 *
 * @example
 * // With custom timezone
 * const { time } = useClock({ timeZone: 'BDT' });
 * console.log(time.toString()); // time in BDT
 *
 * @example
 * // Frame-based updates (requestAnimationFrame)
 * const { time } = useClock({ interval: 'frame' });
 *
 * @example
 * // Start paused
 * const clock = useClock({ autoStart: false });
 * clock.resume(); // manually start
 */
export function useClock(options?: UseClockOptions): UseClockResult {
	const rafRef = useRef<number | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const { timeZone, format = 'HH:mm:ss', interval = 1000, autoStart = true } = options || {};

	const [isPaused, setIsPaused] = useState(!autoStart);

	useMemo(() => {
		Chronos.register(timeZonePlugin);
	}, []);

	const [now, setNow] = useState(() => {
		const init = /* @__PURE__ */ new Chronos();

		return timeZone ? init.timeZone(timeZone as TimeZoneIdentifier) : init;
	});

	const tick = useCallback(() => {
		const $init = /* @__PURE__ */ new Chronos();
		const tzApplied = timeZone ? $init.timeZone(timeZone as TimeZoneIdentifier) : $init;

		setNow(tzApplied);
	}, [timeZone]);

	const start = useCallback(() => {
		setIsPaused(false);

		if (interval === 'frame') {
			const loop = () => {
				tick();
				rafRef.current = requestAnimationFrame(loop);
			};

			rafRef.current = requestAnimationFrame(loop);
		} else {
			tick();

			intervalRef.current = setInterval(tick, interval);
		}
	}, [interval, tick]);

	const stop = useCallback(() => {
		setIsPaused(true);

		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const Effect = interval === 'frame' ? useLayoutEffect : useEffect;

	Effect(() => {
		if (autoStart) {
			start();
		}

		return stop;
	}, [start, stop, autoStart, interval]);

	return useMemo<UseClockResult>(
		() => ({
			time: now,
			formatted: now.format(format),
			pause: stop,
			resume: start,
			isPaused,
		}),
		// @ts-expect-error This is TypeScript recursion limitation
		[now, format, stop, start, isPaused]
	);
}
