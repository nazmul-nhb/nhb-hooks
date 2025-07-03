import { createContext } from 'react';
import type { TitleConfig } from '../types';

/**  * Default configuration used by the `TitleContext` when no provider is specified. */
export const defaultTitleConfig: TitleConfig = {
	siteTitle: '',
	defaultPosition: 'before',
	defaultSeparator: ' - ',
};

/**  * React context used internally by the `useTitle` hook and `TitleProvider`. */
export const TitleContext = createContext<TitleConfig>(defaultTitleConfig);
