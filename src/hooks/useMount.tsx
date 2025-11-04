import { useEffect, useState, type ReactNode } from 'react';

/**
 * * Hook to prevent *React hydration errors* in `Next.js`.
 *
 * It delays rendering of `children` until the component has mounted on the client,
 * ensuring that server-rendered and client-rendered content match.
 *
 * @template T - The type of `children`, usually a `ReactNode`.
 * @param children - The content to render after mounting.
 * @returns The children after the component has mounted, or `null` on the server or before mount.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   return useMount(<div>Client-only content</div>);
 * };
 * ```
 *
 * @remarks
 * - Useful for client-only components like theme togglers.
 * - Prevents hydration mismatch errors.
 */
export const useMount = <T extends ReactNode>(children: T): T | null => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setMounted(true), 0);

		return () => clearTimeout(timeoutId);
	}, []);

	if (!mounted) return null;

	return children;
};
