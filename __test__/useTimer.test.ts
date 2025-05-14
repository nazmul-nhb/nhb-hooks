import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimer } from "../src";

/**
 * Utility to convert the result object to milliseconds
 */
const convertToMilliseconds = (result: ReturnType<typeof useTimer>) => {
  const totalMs =
    result.years * 365 * 24 * 60 * 60 * 1000 +
    result.months * 30 * 24 * 60 * 60 * 1000 +
    result.days * 24 * 60 * 60 * 1000 +
    result.hours * 60 * 60 * 1000 +
    result.minutes * 60 * 1000 +
    result.seconds * 1000 +
    result.milliseconds;

  return totalMs;
};

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("counts down from 5 minutes (number + unit)", () => {
    const { result } = renderHook(() => useTimer(5, "minute"));

    // Wrap the timer advance in act to ensure state updates are flushed
    act(() => {
      vi.advanceTimersByTime(1000); // Simulate 1 second passing
    });

    const remainingMs = convertToMilliseconds(result.current);

    expect(remainingMs).toBeLessThanOrEqual(5 * 60_000 - 1000);
    expect(remainingMs).toBeGreaterThan(5 * 60_000 - 2000);
  });

  it("counts down to a future Date", () => {
    const future = new Date(Date.now() + 3 * 60_000);
    const { result } = renderHook(() => useTimer(future));

    act(() => {
      vi.advanceTimersByTime(2000); // Simulate 2 seconds passing
    });

    const remainingMs = convertToMilliseconds(result.current);

    expect(remainingMs).toBeLessThanOrEqual(3 * 60_000 - 2000);
    expect(remainingMs).toBeGreaterThan(3 * 60_000 - 3000);
  });

  it("counts down to an ISO timestamp", () => {
    const future = new Date(Date.now() + 2 * 60_000).toISOString();
    const { result } = renderHook(() => useTimer(future));

    act(() => {
      vi.advanceTimersByTime(3000); // Simulate 3 seconds passing
    });

    const remainingMs = convertToMilliseconds(result.current);

    expect(remainingMs).toBeLessThanOrEqual(2 * 60_000 - 3000);
    expect(remainingMs).toBeGreaterThan(2 * 60_000 - 4000);
  });
});
