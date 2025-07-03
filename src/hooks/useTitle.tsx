import { useEffect } from 'react';
import { TITLE_POSITIONS } from '../constants';
import { useTitleConfig } from '../helpers/useTitleConfig';
import type { TitleOptions, TitlePosition } from '../types';

/**
 * * Dynamically sets the `document.title` based on the provided page title and site-wide config.
 * @param title The main page-specific title (e.g., "Dashboard", "About")
 * @param options Optional custom separator or positioning for this call
 *
 * @example
 * useTitle('Dashboard'); // → "Dashboard - MySite"
 *
 * @example
 * useTitle('About', { position: 'before' }); // → "MySite - About"
 *
 * @example
 * useTitle('Docs', { separator: ' | ', position: 'after' }); // → "Docs | MySite"
 */
export function useTitle(title: string, options?: TitleOptions) {
	const { siteTitle, defaultSeparator, defaultPosition } = useTitleConfig();

	useEffect(() => {
		if (!title && !siteTitle) return;

		const pos = (
			options?.position ?? defaultPosition
		)?.toLowerCase() as TitlePosition;

		const position = TITLE_POSITIONS.includes(pos) ? pos : 'before';
		const separator = options?.separator ?? defaultSeparator ?? ' - ';

		const finalTitle =
			!siteTitle ? title
			: position === 'before' ? `${title}${separator}${siteTitle}`
			: `${siteTitle}${separator}${title}`;

		document.title = finalTitle;

		const prevTitle = document.title;
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
	]);
}
