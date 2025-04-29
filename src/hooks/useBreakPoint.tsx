import React from 'react';

/**
 * * Evaluates a given media query string and returns a boolean indicating whether it matches.
 * @param query - The media query string to evaluate.
 * @returns Boolean: `true` if the media query matches, otherwise `false`.
 */
const useMediaQuery = (query: string): boolean => {
	const getMatches = (q: string) =>
		typeof window !== 'undefined' && window.matchMedia(q).matches;

	const [matches, setMatches] = React.useState<boolean>(getMatches(query));

	React.useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQueryList = window.matchMedia(query);

		const handleChange = () => setMatches(mediaQueryList.matches);

		mediaQueryList.addEventListener('change', handleChange);
		return () => mediaQueryList.removeEventListener('change', handleChange);
	}, [query]);

	return matches;
};

/**
 * * Custom hook to detect responsive breakpoints based on screen width.
 * - `mobile`: true if width is 767px or less.
 * - `tablet`: true if width is between 768px and 1279px.
 * - `desktop`: true if width is 1280px or greater.
 *
 * @returns Object with boolean flags: `{ mobile, tablet, desktop }`
 */
export const useBreakPoint = () => {
	const mobile = useMediaQuery('(max-width: 767px)');
	const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
	const desktop = useMediaQuery('(min-width: 1280px)');

	return { mobile, tablet, desktop };
};
