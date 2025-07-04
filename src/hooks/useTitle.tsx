import { useEffect } from 'react';
import { TITLE_POSITIONS } from '../constants';
import { useTitleConfig } from '../helpers/useTitleConfig';
import type { TitleMeta, TitleOptions, TitlePosition } from '../types';

/**
 * * Dynamically sets the `document.title` based on the provided page title and site-wide config.
 * @param title The main page-specific title (e.g., "Dashboard", "About")
 * @param options Optional custom separator or positioning for this call
 *
 * @example
 * useTitle('Dashboard'); // → "Dashboard - Bangu Site Inc."
 *
 * @example
 * useTitle('About', { position: 'before' }); // → "Bangu Site Inc. - About"
 *
 * @example
 * useTitle('Docs', { separator: ' | ', position: 'after' }); // → "Docs | Bangu Site Inc."
 *
 * @remarks
 * This hook requires `TitleProvider` to be used in a parent component.
 */
export function useTitle(title: string, options?: TitleOptions) {
	const {
		siteTitle,
		defaultSeparator,
		defaultPosition,
		setPageTitle: setCurrentTitle,
		setFullTitle,
	} = useTitleConfig();

	useEffect(() => {
		if (!options?.favicon) return;

		const favicon =
			document.querySelector<HTMLLinkElement>("link[rel*='icon']") ??
			document.createElement('link');

		const prevHref = favicon.href;

		if (!favicon.parentNode) {
			favicon.rel = 'icon';
			document.head.appendChild(favicon);
		}

		favicon.href = options.favicon;

		return () => {
			favicon.href = prevHref;
		};
	}, [options?.favicon]);

	useEffect(() => {
		if (!title && !siteTitle) return;

		setCurrentTitle?.(title);

		const pos = (
			options?.position ?? defaultPosition
		)?.toLowerCase() as TitlePosition;

		const position = TITLE_POSITIONS.includes(pos) ? pos : 'before';
		const separator = options?.separator ?? defaultSeparator ?? ' - ';

		const finalTitle =
			!siteTitle ? title
			: position === 'before' ? `${title}${separator}${siteTitle}`
			: `${siteTitle}${separator}${title}`;

		const prevTitle = document.title;

		document.title = finalTitle;

		setFullTitle?.(finalTitle);

		if (prevTitle !== finalTitle) {
			return () => {
				document.title = prevTitle;
			};
		}
	}, [
		title,
		options?.separator,
		options?.position,
		siteTitle,
		defaultSeparator,
		defaultPosition,
		setCurrentTitle,
		setFullTitle,
	]);
}

/**
 * * Provides access to current title metadata from `TitleProvider`.
 *
 * Useful for reading the current page title, full document title, and defaults like
 * site title, separator, and position without needing to recompute or pass props.
 *
 * @returns An object containing:
 * - `pageTitle`: The current page-specific title (without site name)
 * - `siteTitle`: The global site name or brand title
 * - `fullTitle`: The full title currently set in `document.title`
 * - `defaultPosition`: The default positioning of titles (`before` or `after`)
 * - `defaultSeparator`: The string separator used between page and site title
 *
 * @example
 * const { pageTitle, fullTitle } = useTitleMeta();
 *
 * @remarks
 * This hook requires `TitleProvider` to be used in a parent component.
 */
export const useTitleMeta = () => {
	const {
		siteTitle,
		defaultPosition,
		defaultSeparator,
		pageTitle,
		fullTitle,
	} = useTitleConfig();

	return {
		pageTitle,
		siteTitle,
		fullTitle,
		defaultPosition,
		defaultSeparator,
	} as TitleMeta;
};
