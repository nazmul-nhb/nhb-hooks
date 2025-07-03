import { useCallback, useState } from 'react';

/**
 * * Hook to toggle between two values.
 *
 * @template T - The type of the values to toggle between.
 * @param values - An array of two values to toggle between. [initial, alternate]
 * @returns A tuple containing the current value and a function to toggle the value.
 *
 * @example
 * const [loading, toggle] = useToggle([false, true]);
 * toggle(); // Switches between false and true
 */
export function useToggle<T>(values: [T, T]): [T, () => void] {
	const [state, setState] = useState<T>(values[0]);

	const toggle = useCallback(() => {
		setState((prev) => (prev === values[0] ? values[1] : values[0]));
	}, [values]);

	return [state, toggle];
}
