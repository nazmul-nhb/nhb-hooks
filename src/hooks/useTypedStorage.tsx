import type { Prettify } from 'nhb-toolbox/utils/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PascalCase } from '../types/strings';
import { toPascalCase } from '../utils/helpers';

/** Options for `useTypedStorage` hook. */
type StorageOptions<T, Key extends string, St extends 'session' | 'local' = 'local'> = {
	/** * Key to store the value with in local/session storage. */
	key: Key;
	initialValue: T;
	/** * Storage type to use (`localStorage`/`sessionStorage`). Defaults to `'local'`. */
	type?: St;
	/**
	 * * Optional serializer function to convert the value of type `T` to a string. Defaults to `JSON.stringify`.
	 * @param value Value to serialize.
	 * @returns Serialized/stringified value.
	 */
	serialize?: (value: T) => string;
	/**
	 * * Optional deserializer function to convert the stored value back to type `T`. Defaults to `JSON.parse`.
	 * @param value Value to deserialize/parse to its actual type.
	 * @returns Parsed/deserialized value.
	 */
	deserialize?: (value: string) => T;
};

// type Value<T> = {
// 	/** * Current value from storage, or `null` if not set or on error. */
// 	value: T | null;
// };

type Mutate<Data> = {
	/**
	 * * Function to set value in specified storage.
	 * @param value Value to set in the storage.
	 */
	set: (value: Data) => void;
	/** * Function to remove the item from specified storage. */
	remove: () => void;
};

type Clear = {
	/**
	 * * Function to clear all items from the selected storage type.
	 *
	 * `CAUTION` This will remove **all items** in the selected storage type, not just the current key.
	 */
	clear: () => void;
};

/** * Return type of `useTypedStorage` hook. */
type WebStorage<T, Key extends string, St extends 'local' | 'session' = 'local'> = Prettify<
	// { [K in 'value' as `${K}Of${PascalCase<Key>}`]: T | null }
	{
		/** * Current value from storage, or `null` if not set or on error. */
		value: T | null;
	} & {
		[K in keyof Mutate<T> as `${K}${PascalCase<Key>}`]: Mutate<T>[K];
	} & {
		[K in keyof Clear as `${K}${PascalCase<St>}Storage`]: Clear[K];
	}
>;

/**
 * * Hook to access to `localStorage` or `sessionStorage` with reactive state and methods.
 * @param options Configuration options for storage type, key, and (de)serializers.
 */
export function useTypedStorage<T, Key extends string, St extends 'local' | 'session'>(
	options: StorageOptions<T, Key, St>
): WebStorage<T, Key, St> {
	const [value, setValue] = useState<T | null>(null);
	const [isReady, setIsReady] = useState(false);

	const { key, type = 'local', serialize, deserialize } = options ?? {};

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

	return useMemo<WebStorage<T, Key, St>>(() => {
		const keySfx = toPascalCase(key);
		const stSfx = toPascalCase(type);

		return {
			value,
			[`set${keySfx}`]: setItem,
			[`remove${keySfx}`]: removeItem,
			[`clear${stSfx}Storage`]: clearItem,
		} as WebStorage<T, Key, St>;
	}, [key, type, value, setItem, removeItem, clearItem]);
}

const int: Date | null = new Date();

// eslint-disable-next-line react-hooks/rules-of-hooks
const { removeMyApp } = useTypedStorage({
	key: 'my-app',
	initialValue: int,
	type: 'local',
});

removeMyApp();
