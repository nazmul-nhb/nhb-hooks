import { defaultTitleConfig, TitleContext } from '../contexts/TitleContext';
import type { TitleProviderProps } from '../types';

/**
 * * Provides default site title and formatting options for `useTitle`
 * @param props Component props
 * @returns JSX element wrapping children with title configuration context
 *
 * @example
 * <TitleProvider
 * 	config={{
 * 		siteTitle: 'Bangu Site Inc.',
 * 		defaultPosition: 'after',
 * 		defaultSeparator: ' | ',
 * 	}}
 * >
 * 	<App />
 * </TitleProvider>;
 */
export function TitleProvider({ children, config }: TitleProviderProps) {
	const merged = { ...defaultTitleConfig, ...config };

	return (
		<TitleContext.Provider value={merged}>{children}</TitleContext.Provider>
	);
}
