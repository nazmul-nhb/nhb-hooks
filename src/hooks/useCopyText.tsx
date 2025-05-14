import { useState } from 'react';
import type { CopyOptions, UseCopyTextReturn } from '../types';

/**
 * * Hook to copy text to the clipboard with optional callbacks.
 *
 * @param options Optional configuration for success/error callbacks and auto-reset timeout.
 * @returns An object with:
 * - `copiedText`: A string containing the last copied text. Automatically resets after timeout.
 * - `copyToClipboard(text, successMsg?, errorMsg?)`: Function to trigger copy operation.
 *
 * @description
 * * This hook allows copying a string to the clipboard using the modern Clipboard API,
 * with a fallback for unsupported environments.
 *
 * - `onSuccess(msg)` will be called when the text is copied successfully.
 * - `onError(msg)` will be triggered if the copy fails.
 * - `resetTimeOut` controls how long the `copiedText` state retains the copied value before clearing (default is `2500ms`).
 *
 * The `copiedText` state can be used to reflect UI feedback, such as changing button labels ("Copied!" or similar).
 *
 * @example
 * ```tsx
 * const { copiedText, copyToClipboard } = useCopyText({
 *   onSuccess: (msg) => toast.success(msg),
 *   onError: (msg) => toast.error(msg),
 *   resetTimeOut: 3000
 * });
 *
 * return (
 *   <button onClick={() => copyToClipboard('Hello World!')}>
 *     {copiedText ? 'Copied!' : 'Copy'}
 *   </button>
 * );
 * ```
 *
 * @example
 * ```tsx
 * const { copyToClipboard } = useCopyText();
 * copyToClipboard('Text with fallback', 'Copied!', 'Oops, try again!');
 * ```
 */
export const useCopyText = (options?: CopyOptions): UseCopyTextReturn => {
	const [copiedText, setCopiedText] = useState<string>('');

	/**
	 * * Function to copy the provided text to the clipboard.
	 *
	 * @param text - The string content to be copied.
	 * @param msg - Optional custom success message. Default is `'Text Copied!'`
	 * @param errorMsg - Optional custom error message. Default is from message from the error object or `'Failed to copy!'`
	 */
	const copyToClipboard = async (
		text: string,
		msg?: string,
		errorMsg?: string,
	) => {
		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(text);
			} else {
				const textArea = document.createElement('textarea');

				textArea.value = text;
				textArea.style.position = 'fixed';
				textArea.style.opacity = '0';
				document.body.appendChild(textArea);

				textArea.select();
				textArea.setSelectionRange(0, textArea.value.length);

				const success = document.execCommand('copy');

				document.body.removeChild(textArea);

				if (!success) {
					throw new Error(
						'Cannot execute command in this environment!',
					);
				}
			}

			setCopiedText(text);

			options?.onSuccess?.(msg ?? 'Text Copied!');

			setTimeout(() => {
				setCopiedText('');
			}, options?.resetTimeOut ?? 2500);
		} catch (err) {
			options?.onError?.(
				errorMsg ? errorMsg
				: err instanceof Error ? err?.message
				: 'Failed to copy!',
			);
			console.error('Clipboard copy failed:', err);
		} finally {
			const textArea = document.querySelector('textarea[style*="fixed"]');

			if (textArea) {
				document.body.removeChild(textArea);
			}
		}
	};

	return { copiedText, copyToClipboard };
};
