import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useStorage } from '../src';

type Preferences = {
	theme: 'light' | 'dark';
};

describe('useStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('hydrates a persisted object without repeatedly updating state', async () => {
		localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));

		const { result } = renderHook(() => useStorage<Preferences>({ key: 'preferences' }));

		await waitFor(() => {
			expect(result.current.value).toEqual({ theme: 'dark' });
		});
	});

	it('does not rehydrate repeatedly with an inline deserializer', async () => {
		localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));

		const { result } = renderHook(() =>
			useStorage<Preferences>({
				key: 'preferences',
				deserialize: (serialized) => JSON.parse(serialized) as Preferences,
			})
		);

		await waitFor(() => {
			expect(result.current.value).toEqual({ theme: 'dark' });
		});
	});

	it('uses the default value when the key does not exist', async () => {
		const defaultValue: Preferences = { theme: 'light' };
		const { result } = renderHook(() =>
			useStorage<Preferences, Preferences>({ key: 'preferences', defaultValue })
		);

		await waitFor(() => {
			expect(result.current.value).toEqual(defaultValue);
		});
	});

	it('keeps the value type nullable because remove can clear it', async () => {
		const { result } = renderHook(() =>
			useStorage<Preferences, Preferences>({
				key: 'preferences',
				defaultValue: { theme: 'light' },
			})
		);

		await waitFor(() => {
			expect(result.current.value).toEqual({ theme: 'light' });
		});

		act(() => result.current.remove());

		expect(result.current.value).toBeNull();
	});
});
