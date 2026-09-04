import type { Maybe } from 'nhb-toolbox/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { StorageOptions, WebStorage } from '../types';

/**
 * * Hook to access to `localStorage` or `sessionStorage` with reactive state and methods.
 *
 * @remarks
 * - This hook safely interacts with Web Storage in a React environment (including frameworks like `Next.js`) by delaying access until the client is ready.
 * - It supports custom serialization and deserialization, default value, automatic state synchronization, and simple methods for updating, clearing, or removing stored values.
 *
 * @param options Configuration options for storage type, key, and (de)serializers.
 *
 * @returns An object exposing:
 * - **value**: The current stored/default value or `null`
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
 * ```tsx
 * // Custom serializer example:
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
 * 		return { ...parsed, dob: new Date(parsed.dob) };
 * 	},
 * });
 * ```
 */
export function useStorage<T, D extends Maybe<T> = undefined>(
	options: StorageOptions<T, D>
): WebStorage<T, D> {
	const {
		key = 'nhb-hooks-storage',
		type = 'local',
		defaultValue,
		serialize,
		deserialize,
	} = options ?? {};

	// `defaultValue` is an initial fallback, not a reactive dependency.
	const [value, setValue] = useState<T | null>(() => defaultValue ?? null);
	const [isReady, setIsReady] = useState(false);

	// Options may contain inline callbacks. Keep their latest implementations
	// without making hydration or the returned methods unstable on every render.
	const serializerRef = useRef<(value: T) => string>(serialize ?? JSON.stringify);
	const deserializerRef = useRef<(value: string) => T>(deserialize ?? JSON.parse);

	const getStorage = useCallback(() => {
		if (!isReady) return null;
		return window[`${type}Storage`];
	}, [isReady, type]);

	/** Mark hook as client-ready */
	useEffect(() => {
		queueMicrotask(() => setIsReady(true));
	}, []);

	/** Keep custom callbacks current without accessing refs during render. */
	useEffect(() => {
		serializerRef.current = serialize ?? JSON.stringify;
		deserializerRef.current = deserialize ?? JSON.parse;
	}, [serialize, deserialize]);

	/** Load stored value once ready */
	useEffect(() => {
		if (!isReady || !key) return;
		let isCancelled = false;

		try {
			const storage = getStorage();
			if (!storage) return undefined;

			const item = storage.getItem(key);

			const nextValue = item !== null ? deserializerRef.current(item) : null;
			queueMicrotask(() => {
				if (!isCancelled) {
					setValue((currentValue) => (item !== null ? nextValue : currentValue));
				}
			});
		} catch {
			queueMicrotask(() => {
				if (!isCancelled) setValue(null);
			});
		}

		return () => {
			isCancelled = true;
		};
	}, [isReady, key, getStorage]);

	const setItem = useCallback(
		($value: T) => {
			try {
				const storage = getStorage();
				if (!storage) return;

				storage.setItem(key, serializerRef.current($value));
				setValue($value);
			} catch (error) {
				console.error(`Error saving item with key "${key}" in ${type} storage:`, error);
			}
		},
		[getStorage, key, type]
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

	return useMemo(() => {
		return {
			value,
			set: setItem,
			remove: removeItem,
			clear: clearItem,
		} as WebStorage<T, D>;
	}, [value, setItem, removeItem, clearItem]);
}
