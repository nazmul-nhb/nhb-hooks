import { useMediaQuery } from "./useMediaQuery";

/**
 * * Custom hook to detect responsive breakpoints based on screen width.
 * - `mobile`: true if width is 767px or less.
 * - `tablet`: true if width is between 768px and 1279px.
 * - `desktop`: true if width is 1280px or greater.
 *
 * @returns Object with boolean flags: `{ mobile, tablet, desktop }`
 */
export const useBreakPoint = () => {
  const mobile = useMediaQuery("(max-width: 767px)");
  const tablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
  const desktop = useMediaQuery("(min-width: 1280px)");

  return { mobile, tablet, desktop };
};
