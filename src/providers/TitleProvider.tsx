import { useState } from 'react';
import { defaultTitleConfig, TitleContext } from '../contexts/TitleContext';
import type { TitleContextConfig, TitleProviderProps } from '../types';

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
	const [pageTitle, setPageTitle] = useState<string>();
	const [fullTitle, setFullTitle] = useState<string>();

	const merged: TitleContextConfig = {
		...defaultTitleConfig,
		...config,
		pageTitle,
		setPageTitle,
		fullTitle,
		setFullTitle,
	};

	return <TitleContext.Provider value={merged}>{children}</TitleContext.Provider>;
}
