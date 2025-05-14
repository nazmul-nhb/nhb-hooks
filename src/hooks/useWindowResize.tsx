import React from "react";

/**
 * * Custom React hook that triggers a callback whenever the window is resized.
 *
 * @param callback - The function to be executed on every window resize event.
 *
 * @example
 * useWindowResize(() => {
 *   console.log("Window was resized!");
 * });
 */
export function useWindowResize(callback: () => void): void {
  React.useEffect(() => {
    if (typeof callback !== "function") return;

    const handleResize = () => callback();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);
}
