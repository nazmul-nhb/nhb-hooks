import { Chronos } from 'nhb-toolbox';
import type { ChronosInput, TimeDuration } from 'nhb-toolbox/date/types';
import { useEffect, useRef, useState } from 'react';
import type { TimerUnit } from '../types';

/**
 * * Hook to create a countdown timer from a duration and unit.
 *
 * @param initialDuration - The starting duration value (in minute, hour, month, day etc.).
 * @param unit - The unit of time to count down from (excluding 'week').
 * @returns Remaining time as a structured duration object.
 */
export function useTimer(initialDuration: number, unit: TimerUnit): TimeDuration;

/**
 * * Hook to create a countdown timer to a specific date or time.
 *
 * @param time - The target time or date to count down to.
 * @returns Remaining time as a structured duration object.
 */
export function useTimer(time: ChronosInput): TimeDuration;

/**
 * * Hook to create a countdown timer from a duration and unit or to a specific point in time.
 *
 * @param time - Either a number representing a duration or a specific date/time.
 * @param unit - Optional time unit if the first argument is a number.
 * @returns Remaining time as a structured duration object.
 */
export function useTimer(time: ChronosInput, unit?: TimerUnit): TimeDuration {
	const now = /*#__PURE__*/ new Chronos();
	const target =
		typeof time === 'number' && unit ?
			/*#__PURE__*/ now.add(time, unit)
		:	/*#__PURE__*/ new Chronos(time);

	const initialMs = target.diff(now, 'millisecond');

	const [remainingMs, setRemainingMs] = useState<number>(initialMs);
	const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (remainingMs <= 0) return;

		intervalRef.current = setInterval(() => {
			setRemainingMs((prev) => {
				const next = prev - 1000;
				if (next <= 0) {
					clearInterval(intervalRef.current!);
					return 0;
				}
				return next;
			});
		}, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [remainingMs]);

	return /*#__PURE__*/ new Chronos().subtract(remainingMs, 'millisecond').duration();
}
