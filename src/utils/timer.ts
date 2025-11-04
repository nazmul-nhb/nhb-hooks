import type { TimeDuration } from 'nhb-toolbox/date/types';
import type { TimerFormatOptions } from '../types';

/**
 * * Returns a human-readable formatted duration string from duration object returned by `useTimer` hook.
 *
 * @param duration The `duration` object returned by `useTimer` hook.
 * @param options Options to format duration string from `duration` object.
 * @returns Formatted duration string, e.g. `"2 hours, 5 minutes"` or `"2h 5m"`.
 */
export function formatTimer(duration: TimeDuration, options?: TimerFormatOptions): string {
	const { maxUnits = 6, separator = ' · ', style = 'full', showZero = false } = options ?? {};

	const _formatUnit = (unit: string, value: number): string => {
		const $unit = Math.abs(value) === 1 ? unit.slice(0, -1) : unit;

		return `${value} ${$unit}`;
	};

	const parts = (Object.entries(duration).slice(0, 6) as Array<[string, number]>)
		.filter(([_, value]) => showZero || Math.abs(value) > 0)
		.slice(0, maxUnits)
		.map(([unit, value]) => _formatUnit(unit, value));

	return (
		parts.length ? parts.join(separator)
		: style === 'short' ? '0s'
		: '0 seconds'
	);
}
