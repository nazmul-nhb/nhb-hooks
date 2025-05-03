import { useEffect, useState } from 'react';
import type { ValidImage, ValidImageOptions } from '../types';

import placeholderImage from '@assets/placeholder.png';

const checkImageExists = (fullUrl: string): Promise<boolean> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
		img.src = fullUrl;
	});
};

/**
 * * Custom hook to validate if image URLs are accessible.
 * @description If an image fails to load, it will be replaced with a fallback placeholder.
 * Automatically prepends the image host base (`imgHostLink`) to each input path.
 *
 * **Note**: *If your project is not using `Vite`, you might have to provide the placeholder explicitly in the options.*
 *
 * @param input - A single image path or an array of image paths (relative to the `imgHostLink` base).
 * @param options - Options to set-up image host link and placeholder image.
 *
 * @returns A single valid image URL string or an array of valid image URL strings (with fallback applied as needed).
 *
 * @example
 * const avatar = useValidImage("user/avatar.jpg"); // `as string`
 * const avatars = useValidImage(["img1.jpg", "img2.jpg"]); // `as string[]`
 */
export function useValidImage<T extends string | string[]>(
	input: T | undefined,
	options?: ValidImageOptions
): ValidImage<T> {
	const {
		placeholder = placeholderImage,
		imgHostLink,
		trailingSlash = true,
	} = options ?? {};

	const [validImages, setValidImages] = useState<string | string[]>(
		Array.isArray(input) ? input.map(() => placeholder) : placeholder
	);

	useEffect(() => {
		let isMounted = true;

		const normalizeUrl = (url?: string) => {
			return imgHostLink && url
				? `${imgHostLink}${trailingSlash ? '/' : ''}${url}`
				: placeholder;
		};

		const validate = async () => {
			if (Array.isArray(input)) {
				const results = await Promise.all(
					input.map(async (url) => {
						const fullUrl = normalizeUrl(url);

						const isValid = await checkImageExists(fullUrl);

						return isValid ? fullUrl : placeholder;
					})
				);

				if (isMounted) {
					setValidImages(results);
				}
			} else {
				const fullUrl = normalizeUrl(input);
				const isValid = await checkImageExists(fullUrl);

				if (isMounted) {
					setValidImages(isValid ? fullUrl : placeholder);
				}
			}
		};

		if (input) {
			validate();
		}

		return () => {
			isMounted = false;
		};
	}, [imgHostLink, input, placeholder, trailingSlash]);

	return validImages as ValidImage<T>;
}
