import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StorageOptions, WebStorage } from '../types';

/**
 * * Hook to access to `localStorage` or `sessionStorage` with reactive state and methods.
 *
 * @remarks
 * - This hook safely interacts with Web Storage in a React environment (including frameworks like `Next.js`) by delaying access until the client is ready.
 * - It supports custom serialization and deserialization, automatic state synchronization, and simple methods for updating, clearing, or removing stored values.
 *
 * @param options Configuration options for storage type, key, and (de)serializers.
 *
 * @returns An object exposing:
 * - **value**: The current stored value or `null`
 * - **set**: Set/update the stored value
 * - **remove**: Remove only the current key from specified storage
 * - **clear**: Clear all items in the selected storage type
 *
 * @example
 * ```tsx
 * const ls = useStorage<string>({
 *   key: 'theme',
 *   type: 'local',
 * });
 *
 * return (
 *   <button onClick={() => ls.set('dark')}>
 *     Current theme: {ls.value ?? 'none'}
 *   </button>
 * );
 * ```
 *
 * @example
 * Custom serializer example:
 * ```tsx
 * type User = {
 *     name: string;
 *     age: number;
 * 	dob: Date;
 * };
 *
 * const userStore = useStorage<User>({
 * 	key: 'user',
 * 	serialize: (u) => JSON.stringify(u),
 * 	deserialize: (s) => {
 * 		const parsed = JSON.parse(s);
 * 		return { dob: new Date(parsed.dob), ...parsed };
 * 	},
 * });
 * ```
 */
export function useStorage<T>(options: StorageOptions<T>): WebStorage<T> {
	const [value, setValue] = useState<T | null>(null);
	const [isReady, setIsReady] = useState(false);

	const { key = 'nhb-hooks-storage', type = 'local', serialize, deserialize } = options ?? {};

	const serializer = useMemo<(value: T) => string>(() => {
		return serialize ?? JSON.stringify;
	}, [serialize]);

	const deserializer = useMemo<(value: string) => T>(() => {
		return deserialize ?? JSON.parse;
	}, [deserialize]);

	const getStorage = useCallback(() => {
		if (!isReady) return null;
		return window[`${type}Storage`];
	}, [isReady, type]);

	/** Mark hook as client-ready */
	useEffect(() => {
		queueMicrotask(() => setIsReady(true));
	}, []);

	/** Load stored value once ready */
	useEffect(() => {
		if (!isReady || !key) return;

		try {
			const storage = getStorage();
			if (!storage) return;

			const item = storage.getItem(key);

			queueMicrotask(() => {
				setValue(item ? deserializer(item) : null);
			});
		} catch {
			queueMicrotask(() => setValue(null));
		}
	}, [isReady, key, deserializer, getStorage]);

	const setItem = useCallback(
		($value: T) => {
			try {
				const storage = getStorage();
				if (!storage) return;

				storage.setItem(key, serializer($value));
				setValue($value);
			} catch (error) {
				console.error(`Error saving item with key "${key}" in ${type} storage:`, error);
			}
		},
		[getStorage, key, serializer, type]
	);

	const clearItem = useCallback(() => {
		try {
			const storage = getStorage();
			if (!storage) return;

			storage.clear();
		} catch (error) {
			console.error(`Error clearing items from ${type} storage:`, error);
		}
	}, [getStorage, type]);

	const removeItem = useCallback(() => {
		try {
			const storage = getStorage();
			if (!storage) return;

			storage.removeItem(key);
			setValue(null);
		} catch (error) {
			console.error(`Error removing item with key "${key}" from ${type} storage:`, error);
		}
	}, [getStorage, key, type]);

	return useMemo<WebStorage<T>>(() => {
		return {
			value,
			set: setItem,
			remove: removeItem,
			clear: clearItem,
		};
	}, [value, setItem, removeItem, clearItem]);
}
