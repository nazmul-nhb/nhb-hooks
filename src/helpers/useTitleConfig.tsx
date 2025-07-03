import { useContext } from 'react';
import { TitleContext } from '../contexts/TitleContext';

/**
 * * Access the current title configuration from `TitleContext`
 * @returns The resolved `TitleConfig` from context
 *
 * @example
 * const { siteTitle } = useTitleConfig();
 */
export function useTitleConfig() {
	return useContext(TitleContext);
}
