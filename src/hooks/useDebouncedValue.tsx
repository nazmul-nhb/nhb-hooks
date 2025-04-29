import React from 'react';

/**
 * * Returns a debounced version of the input value.
 * - *The debounced value updates only after the specified delay has passed since the last change to the input value.*
 *
 * @template T - The type of the value to debounce
 * @param value - The input value to debounce
 * @param delay - The debounce delay in milliseconds (default: 300ms)
 * @returns A tuple containing:
 *  - `debouncedValue`: The debounced value
 *  - `cancel`: A function to manually cancel the debounce timeout
 *
 * @example
 * const [search, setSearch] = useState('');
 * const [debouncedSearch] = useDebouncedValue(search, 500);
 */
export function useDebouncedValue<T>(value: T, delay = 300): [T, () => void] {
	const [debouncedValue, setDebouncedValue] = React.useState(value);
	const [timeoutId, setTimeoutId] = React.useState<number | null>(null);

	React.useEffect(() => {
		if (timeoutId) clearTimeout(timeoutId);

		const id = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		setTimeoutId(id);

		return () => clearTimeout(id);
	}, [value, delay]);

	const cancelFn = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			setTimeoutId(null);
		}
	};

	return [debouncedValue, cancelFn];
}
