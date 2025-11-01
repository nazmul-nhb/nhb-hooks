import { useEffect, useRef, type RefObject } from 'react';

type RefType<T> = RefObject<T | null>;

/**
 * * Custom hook to detect clicks outside of a specified element.
 * @param handler - The function to call when a click is detected outside the element.
 * @returns A ref to assign to a DOM element.
 *
 * @example
 * const ref = useClickOutside(() => {
 *   console.log('Clicked outside the element');
 * });
 *
 * return <div ref={ref}>Click outside me</div>;
 */
export function useClickOutside<T extends Element | null>(handler: () => void): RefObject<T>;

/**
 * * Custom hook to detect clicks outside multiple specified elements.
 * @param refs - An array of refs to monitor for outside clicks.
 * @param handler - The function to call when a click is detected outside the elements.
 *
 * @example
 * const ref1 = useRef(null);
 * const ref2 = useRef(null);
 *
 * useClickOutside([ref1, ref2], () => {
 *   console.log('Clicked outside both elements');
 * });
 *
 * return (
 *   <>
 *     <div ref={ref1}>Box 1</div>
 *     <div ref={ref2}>Box 2</div>
 *   </>
 * );
 */
export function useClickOutside<T extends Element | null>(
	refs: RefType<T>[],
	handler: () => void
): void;

/**
 * * Custom hook to detect clicks outside of a specified element or elements.
 * @param arg1 - A single ref or an array of refs, to monitor for outside or function to call when a click is detected outside the element.
 * @param arg2 - Function to call on outside click (only if arg1 is a single ref or array refs).
 * @returns A ref object if a single ref is provided, otherwise nothing.
 */
export function useClickOutside<T extends Element | null>(
	arg1: (() => void) | RefType<T>[],
	arg2?: () => void
): RefObject<T> | void {
	const singleRef = useRef<T>(null);

	useEffect(() => {
		const handler = typeof arg1 === 'function' ? arg1 : arg2;
		const refs: RefType<T>[] = Array.isArray(arg1) ? arg1 : [singleRef];

		if (!handler) return;

		const listener = (event: MouseEvent | TouchEvent) => {
			const clickedInside = refs.some((ref) => {
				return ref.current && ref.current.contains(event.target as Node);
			});

			if (!clickedInside) {
				handler();
			}
		};

		document.addEventListener('mouseup', listener);
		document.addEventListener('touchend', listener);

		return () => {
			document.removeEventListener('mouseup', listener);
			document.removeEventListener('touchend', listener);
		};
	}, [arg1, arg2]);

	if (typeof arg1 === 'function') {
		return singleRef as RefObject<T>;
	}
}
