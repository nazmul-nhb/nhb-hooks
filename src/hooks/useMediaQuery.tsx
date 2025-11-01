import { useCallback, useEffect, useState } from 'react';
import type { MediaQueryOptions } from '../types';

/**
 * * Evaluates a media query string or a screen width range and returns whether it matches.
 * @param queryOrOptions - A media query string or an object with `minWidth`/`maxWidth` in pixels.
 * @returns `true` if the media query or screen width condition matches, otherwise `false`.
 *
 * ### Examples:
 *
 * @example
 * // Checking for Mobile Screen Size (maxWidth)
 * const isMobile = useMediaQuery({ maxWidth: 767 });
 * // This returns `true` if the screen width is 767px or less.
 *
 * @example
 * // Checking for Tablet Screen Size (minWidth and maxWidth)
 * const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
 * // This returns `true` if the screen width is between 768px and 1024px.
 *
 * @example
 * // Checking for Desktop Screen Size (minWidth)
 * const isDesktop = useMediaQuery({ minWidth: 1025 });
 * // This returns `true` if the screen width is 1025px or greater.
 *
 * @example
 * // Using a Custom Media Query String
 * const isLandscape = useMediaQuery('(orientation: landscape)');
 * // This returns `true` if the screen is in landscape orientation.
 *
 * @example
 * // Combining Multiple Conditions
 * const isLandscapeTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
 * // This returns `true` if the screen width is between 768px and 1024px and the device is in landscape orientation.
 *
 * #### Notes:
 * - The hook automatically recalculates the result if the screen size changes.
 * - If you pass a media query string, it will evaluate that query.
 * - If you pass an object with `minWidth`/`maxWidth`, the hook will build the media query and evaluate it.
 */
export const useMediaQuery = (queryOrOptions: string | MediaQueryOptions): boolean => {
	const getQuery = useCallback((): string => {
		if (typeof queryOrOptions === 'string') return queryOrOptions;

		const conditions: string[] = [];
		if (queryOrOptions.minWidth != null)
			conditions.push(`(min-width: ${queryOrOptions.minWidth}px)`);

		if (queryOrOptions.maxWidth != null)
			conditions.push(`(max-width: ${queryOrOptions.maxWidth}px)`);
		return conditions.join(' and ');
	}, [queryOrOptions]);

	const getMatches = useCallback(
		() => typeof window !== 'undefined' && window.matchMedia(getQuery()).matches,
		[getQuery]
	);

	const [matches, setMatches] = useState<boolean>(getMatches());

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQueryList = window.matchMedia(getQuery());

		const handleChange = () => setMatches(mediaQueryList.matches);

		mediaQueryList.addEventListener('change', handleChange);

		return () => mediaQueryList.removeEventListener('change', handleChange);
	}, [getQuery]);

	return matches;
};
