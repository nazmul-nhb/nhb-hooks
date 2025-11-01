import { chronos } from 'nhb-toolbox';
import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseClockOptions, UseClockResult } from '../types';

chronos.use(timeZonePlugin);

/**
 * * React hook that returns a live-updating `Chronos` clock.
 *
 * It supports:
 * - Automatic or manual ticking
 * - Timezone handling via `chronos().timeZone(...)`
 * - Formatted string output via `chronos().format(...)`
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
	const { timeZone, format = 'HH:mm:ss', interval = 1000, autoStart = true } = options || {};
	const [now, setNow] = useState(() => (timeZone ? chronos().timeZone(timeZone) : chronos()));

	const rafRef = useRef<number | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const isPausedRef = useRef(!autoStart);

	const tick = useCallback(() => {
		const current = chronos();
		setNow(timeZone ? current.timeZone(timeZone) : current);
	}, [timeZone]);

	const start = useCallback(() => {
		if (!isPausedRef.current) return;
		isPausedRef.current = false;

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
		isPausedRef.current = true;
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (autoStart) start();

		return () => stop();
	}, [start, stop, autoStart]);

	return {
		time: now,
		formatted: now.format(format),
		pause: stop,
		resume: start,
		isPaused: isPausedRef.current,
	};
}
