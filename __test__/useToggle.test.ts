import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../src';

test('should return a boolean and a function', () => {
	const { result } = renderHook(() => useToggle([false, true]));

	expect(typeof result.current[0]).toBe('boolean');
	expect(result.current[0]).toBe(false);
	expect(typeof result.current[1]).toBe('function');
});

test('should toggle the value', () => {
	const { result } = renderHook(() => useToggle([false, true]));

	// First toggle - wrap in act
	act(() => {
		result.current[1]();
	});
	expect(result.current[0]).toBe(true);

	// Second toggle - wrap in act
	act(() => {
		result.current[1]();
	});
	expect(result.current[0]).toBe(false);
});
