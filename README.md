# NHB Hooks

## Reusable React Hooks

<p>
  <!-- Package Info -->
  <a href="https://www.npmjs.com/package/nhb-hooks" aria-label="Downloads">
    <img src="https://img.shields.io/npm/dm/nhb-hooks.svg?label=DOWNLOADS&style=flat&color=red&logo=npm" alt="Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/nhb-hooks" aria-label="Version">
    <img src="https://img.shields.io/npm/v/nhb-hooks.svg?label=NPM&style=flat&color=teal&logo=npm" alt="Latest Version" />
  </a>
  <a href="https://bundlephobia.com/result?p=nhb-hooks" aria-label="Bundle size">
    <img src="https://img.shields.io/bundlephobia/minzip/nhb-hooks?style=flat&color=purple&label=SIZE&logo=nodedotjs" alt="Bundle Size" />
  </a>

  <!-- Project Metadata -->
  <a href="https://github.com/nazmul-nhb/nhb-hooks" aria-label="TypeScript">
    <img src="https://img.shields.io/badge/BUILT%20with-TypeScript-3178C6?style=flat&logo=typescript&logoColor=blue" alt="Built with TypeScript" />
  </a>
  <a href="https://github.com/nazmul-nhb/nhb-hooks/actions" aria-label="Build Status">
    <img src="https://img.shields.io/github/actions/workflow/status/nazmul-nhb/nhb-hooks/publish.yml?label=BUILD%20%26%20PUBLISH&style=flat&logo=github" alt="Build Status" />
  </a>
  <a href="https://github.com/nazmul-nhb/nhb-hooks" aria-label="Project Status">
    <img src="https://img.shields.io/badge/STATUS-maintained-brightgreen?style=flat&logo=git" alt="Maintained" />
  </a>
  <a href="https://github.com/nazmul-nhb/nhb-hooks/commits/main" aria-label="Last Commit">
    <img src="https://img.shields.io/github/last-commit/nazmul-nhb/nhb-hooks?style=flat&label=LAST%20COMMIT&logo=git" alt="Last Commit" />
  </a>

  <!-- GitHub Meta -->
  <a href="https://github.com/nazmul-nhb/nhb-hooks/stargazers" aria-label="GitHub Stars">
    <img src="https://img.shields.io/github/stars/nazmul-nhb/nhb-hooks?style=flat&label=STARS&logo=github" alt="GitHub stars" />
  </a>

  <a href="https://github.com/nazmul-nhb/nhb-hooks/issues" aria-label="Open Issues">
    <img src="https://img.shields.io/github/issues/nazmul-nhb/nhb-hooks?style=flat&label=ISSUES&logo=github" alt="Open Issues" />
  </a>
  <a href="https://github.com/nazmul-nhb/nhb-hooks/pulls" aria-label="Open Pull Requests">
    <img src="https://img.shields.io/github/issues-pr/nazmul-nhb/nhb-hooks?style=flat&label=PRs&logo=github" alt="Pull Requests" />
  </a>

  <a href="https://www.npmjs.com/package/nhb-hooks" aria-label="License">
    <img src="https://img.shields.io/npm/l/nhb-hooks.svg?label=LICENSE&style=flat&color=orange&logo=open-source-initiative" alt="License" />
  </a>
</p>

<!-- markdownlint-disable-file MD024 -->

## 📦 Description

A **lightweight**, **tree-shakable**, and **type-safe** collection of essential React hooks for modern applications.
Each hook is designed to be **independent**, **performant**, and **production-ready**, covering common real-world scenarios with minimal overhead.

> 🧩 **Peer Dependency Notice**
> This package depends on [**nhb-toolbox**](https://toolbox.nazmul-nhb.dev/), a modular utility library that provides foundational classes and utilities used internally by certain hooks.
>
> Specifically:
>
> - [**useClock**](#useclock) and [**useTimer**](#usetimer) rely on the [**Chronos**](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos) class from **nhb-toolbox** for accurate, timezone-aware date and time manipulation.
> - Make sure to install both `nhb-hooks` and `nhb-toolbox` packages to use all available features. Both packages are **fully tree-shakable**, so only the hooks you use will be bundled if you use bundler tools like `vite`, `turbopack`, `rollup`, `webpack` etc.

---

## 🚀 Installation

**npm:**

```bash
npm i nhb-hooks nhb-toolbox
```

**pnpm:**

```bash
pnpm add nhb-hooks nhb-toolbox
```

**yarn:**

```bash
yarn add nhb-hooks nhb-toolbox
```

---

## ✨ Features

- **Tree-shakable** – Only bundles the hooks you actually import.
- **First-class TypeScript support** – Written in TypeScript for strict type safety and IntelliSense.
- **Zero runtime bloat** – Minimal footprint with no unnecessary dependencies.
- **Chronos integration** – Hooks like [**useClock**](#useclock) and [**useTimer**](#usetimer) leverage the powerful [**Chronos**](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos) class for time, date, and timezone operations.

> 🧠 So far, only one utility class ([**Chronos**](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos)) from [**nhb-toolbox**](https://www.npmjs.com/package/nhb-toolbox) is used. This keeps the package extremely light while allowing seamless future integration of more utilities from [**nhb-toolbox**](https://www.npmjs.com/package/nhb-toolbox).

---

## Table of Contents

- [useMediaQuery](#usemediaquery)
- [useBreakPoint](#usebreakpoint)
- [useClickOutside](#useclickoutside)
- [useCopyText](#usecopytext)
- [useDebouncedValue](#usedebouncedvalue)
- [useClock](#useclock)
- [useTimer](#usetimer)
- [useTimerMs](#usetimerms)
- [useStopwatch](#usestopwatch)
- [useToggle](#usetoggle)
- [useValidImage](#usevalidimage)
- [useWindowResize](#usewindowresize)
- [useTitle](#usetitle)
- [useMount](#usemount)
- [useStorage](#usestorage)

---

## useMediaQuery

Evaluates a media query string or a screen width range and returns whether it matches. Detect if a media query matches the current viewport. Perfect for responsive UI logic.

### Import

```ts
import { useMediaQuery } from 'nhb-hooks';
```

### Hook Signature

```ts
function useMediaQuery(queryOrOptions: string | MediaQueryOptions): boolean;
```

### Examples

```tsx
// Checking for Mobile Screen Size (maxWidth)
const isMobile = useMediaQuery({ maxWidth: 767 });

// Checking for Tablet Screen Size (minWidth and maxWidth)
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

// Checking for Desktop Screen Size (minWidth)
const isDesktop = useMediaQuery({ minWidth: 1025 });

// Using a Custom Media Query String
const isLandscape = useMediaQuery('(orientation: landscape)');
const mobile = useMediaQuery('(max-width: 767px)');
const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
const desktop = useMediaQuery('(min-width: 1280px)');
```

```tsx
// Show mobile-only component
const isMobile = useMediaQuery({ maxWidth: 767 });

return (
  {isMobile && <MobileMenu />}
)

// Adjust layout based on screen size
const isLargeScreen = useMediaQuery({ minWidth: 1200 });

return (
  <Grid columns={isLargeScreen ? 4 : 2} />
)
```

### Notes for `useMediaQuery`

- **Automatic Updates**: Recalculates whenever the viewport size changes
- **Performance**: Uses `matchMedia` under the hood for efficient detection
- **Options Format**: Prefer using the object format (`{ minWidth, maxWidth }`) over strings for better type safety
- **SSR Incompatible**: Hooks are not meant for SSR. Use it in client components
- **Multiple Conditions**: Combine conditions with `and` in strings or by passing both `minWidth` and `maxWidth` in options object.

**Best Practice**:

```ts
// Recommended
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

// Less recommended (prone to typos)
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
```

### Type Definitions

```ts
/** Interface for `useMediaQuery` hook's options */
interface MediaQueryOptions {
 /** Minimum screen width in pixels (inclusive) */
 minWidth?: number;
 /** Maximum screen width in pixels (inclusive) */
 maxWidth?: number;
}
```

---

## useBreakPoint

Simplified responsive breakpoints detection. Detects responsive breakpoints based on screen width.

### Import

```ts
import { useBreakPoint } from 'nhb-hooks';
```

### Hook Signature

```ts
function useBreakPoint(): {
 mobile: boolean;
 tablet: boolean;
 desktop: boolean;
};
```

### Examples

```tsx
const { mobile, tablet, desktop } = useBreakPoint();

// mobile: true if width ≤ 767px
// tablet: true if 768px ≤ width ≤ 1279px
// desktop: true if width ≥ 1280px
```

```tsx
const { mobile, tablet, desktop } = useBreakPoint();

return (
 <>
  {mobile && <MobileNav />}
  {tablet && <TabletLayout />}
  {desktop && <DesktopSidebar />}
 </>
);
```

### Notes for `useBreakPoint`

- **Predefined Breakpoints**: Uses common device breakpoints (mobile < 768px, tablet 768-1279px, desktop ≥1280px)
- **Derived Hook**: Built on top of [useMediaQuery](#usemediaquery)
- **Consistent Values**: Only one breakpoint will be true at any time
- **No Customization**: Breakpoints are fixed (use `useMediaQuery` directly for custom breakpoints)

**When to Use**:

- Quick responsive layouts with standard breakpoints
- When you need mobile/tablet/desktop detection

---

## useClickOutside

Detects clicks outside of specified element(s). Great for closing dropdowns/modals when clicking outside.

### Import

```ts
import { useClickOutside } from 'nhb-hooks';
```

### Hook Signatures

```ts
// Single element version
function useClickOutside<T extends Element | null>(
 handler: () => void,
): React.RefObject<T>;

// Multiple elements version
function useClickOutside<T extends Element | null>(
 refs: RefType<T>[],
 handler: () => void,
): void;
```

### Examples

```tsx
// Single element
const ref = useClickOutside(() => {
 console.log('Clicked outside the element');
});

return <div ref={ref}>Click outside me</div>;

// Multiple elements
const ref1 = useRef(null);
const ref2 = useRef(null);

useClickOutside([ref1, ref2], () => {
 console.log('Clicked outside both elements');
});

return (
 <>
  <div ref={ref1}>Box 1</div>
  <div ref={ref2}>Box 2</div>
 </>
);
```

```tsx
function Dropdown() {
 const [isOpen, setIsOpen] = useState(false);
 const ref = useClickOutside(() => setIsOpen(false));

 return (
  <div ref={ref}>
   <button onClick={() => setIsOpen(true)}>Menu</button>
   {isOpen && <div className="dropdown">...</div>}
  </div>
 );
}
```

### Notes for `useClickOutside`

- **Multiple Elements**: Supports both single element and multiple element detection
- **Event Types**: Handles both mouse and touch events
- **Cleanup**: Automatically removes event listeners
- **Ref Handling**: Returns a ref for single element version

**Important**:

- Elements must be in the DOM when the click occurs
- Doesn't work with elements that stop event propagation
- For modals, ensure proper z-index so elements aren't covered

**Performance Tip**:

```tsx
// Memoize handler if it creates new functions
const handler = useCallback(() => setIsOpen(false), []);
const ref = useClickOutside(handler);
```

---

## useCopyText

Copy text to clipboard with lifecycle callbacks and timeout-controlled state reset.

### Import

```ts
import { useCopyText } from 'nhb-hooks';
```

### Hook Signature

```ts
function useCopyText(options?: CopyOptions): {
 copiedText: string | undefined;
 copyToClipboard: (
  text: string,
  msg?: string,
  errorMsg?: string,
 ) => Promise<void>;
};
```

### Examples

```tsx
// Basic usage
const { copiedText, copyToClipboard } = useCopyText();

return (
 <button onClick={() => copyToClipboard('Hello, world!')}>
  {copiedText ? 'Copied!' : 'Copy Text'}
 </button>
);
```

```tsx
// With success and error handling
const { copiedText, copyToClipboard } = useCopyText({
 onSuccess: (msg) => toast.success(msg),
 onError: (msg) => toast.error(msg),
 resetTimeOut: 1500,
});

return (
 <button onClick={() => copyToClipboard('secret-token', 'Token copied!')}>
  {copiedText ? '✔ Copied' : 'Copy Token'}
 </button>
);
```

### Options

- `onSuccess`: Callback called when text is successfully copied. Receives a success message string.
- `onError`: Callback called if copy operation fails. Receives an error message string.
- `resetTimeOut`: Time in milliseconds to retain `copiedText` before it resets to `undefined`. Defaults to `2500`.

### Notes for `useCopyText`

- **`copiedText` State**: Useful for showing transient UI feedback like button label change ("Copied!" state).
- **Fallback-Safe**: Works in environments without `navigator.clipboard` by falling back to `document.execCommand('copy')`.
- **Resets Automatically**: Automatically clears `copiedText` after timeout (resets to `undefined`).

### Type Definitions

```ts
/** Options for useCopyText hook. */
interface CopyOptions {
 /** Called when text is successfully copied. Receives a message. */
 onSuccess?: (msg: string) => void;
 /** Called when copy operation fails. Receives an error message. */
 onError?: (msg: string) => void;
 /** How long to retain the copied text in state before resetting. */
 resetTimeOut?: number;
}
```

---

## useDebouncedValue

Returns a debounced version of the input value. Optimize inputs and expensive calculations.

### Import

```ts
import { useDebouncedValue } from 'nhb-hooks';
```

### Hook Signature

```tsx
function useDebouncedValue<T>(value: T, delay?: number): [T, () => void];
```

### Examples

```tsx
const [search, setSearch] = useState('');
const [debouncedSearch, cancel] = useDebouncedValue(search, 500);

// debouncedSearch updates 500ms after search stops changing
// cancel() aborts pending update
```

```tsx
function Search() {
 const [query, setQuery] = useState('');
 const [debouncedQuery] = useDebouncedValue(query, 500);

 return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### Notes for `useDebouncedValue`

- **Cancellation**: Includes a cancel function to abort pending updates
- **Leading Edge**: Doesn't fire immediately (for leading edge debounce, consider `useThrottle`)
- **Cleanup**: Automatically clears pending timeouts
- **Value Stability**: Returns the same value until delay passes

**Common Use Cases**:

- Search input debouncing
- Expensive calculations
- Auto-save forms

**Warning**:

```ts
// Try to avoid this - creates new function each render. For tiny project using like this is okay but for large scale project use it with `RTK Query` or `React (Tanstack) Query`
useEffect(() => {
 fetchResults(debouncedQuery);
}, [debouncedQuery]);
```

---

## useClock

Live-updating clock based on [`Chronos` from `nhb-toolbox`](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos). Supports formatting, timezones, animation frame ticking, and pause/resume. Lightweight and reactive by default.

### Import

```ts
import { useClock } from 'nhb-hooks';
```

### Hook Signature

```ts
function useClock(options?: UseClockOptions): UseClockResult;
```

### Examples

```tsx
// Default usage — updates every second
const { time } = useClock();
console.log(time.toISOString());
```

```tsx
// With formatting
const { formatted } = useClock({ format: 'HH:mm:ss' });
console.log(formatted); // → "14:45:32"
```

```tsx
// With custom timezone
const { time } = useClock({ timeZone: 'BDT' });
console.log(time.format()); // → local time in BDT
```

```tsx
// Frame-based updates (using requestAnimationFrame)
const { time } = useClock({ interval: 'frame' });
```

```tsx
// Start paused, then resume manually
const clock = useClock({ autoStart: false });
clock.resume(); // Starts ticking
```

### UI Example

```tsx
function ClockWidget() {
 const { formatted } = useClock({ format: 'hh:mm:ss A', timeZone: '+06:00' });

 return <p className="text-lg font-mono">{formatted}</p>;
}
```

### Notes for `useClock`

- **Dependency**: Uses `Chronos` from [`nhb-toolbox`](https://toolbox.nazmul-nhb.dev).
- **Timezone**: Supports `TimeZone` names or `UTCOffset` values (e.g. `"BDT"` or `"+06:00"`).
- **Precision**: Set `interval` for custom update rate (default: `1000`ms). Use `'frame'` for smooth updates.
- **Control**: Fully pauseable/resumable using `.pause()` / `.resume()`.
- **Tree-shaking**: Only includes `Chronos` and its `timeZonePlugin` plugin is automatically applied internally.

---

### Type Definitions

```ts
interface UseClockOptions {
 timeZone?: TimeZone | UTCOffSet;
 format?: StrictFormat;
 interval?: number | 'frame';
 autoStart?: boolean;
}

interface UseClockResult {
 time: Chronos;
 formatted: string | undefined;
 pause: () => void;
 resume: () => void;
 isPaused: boolean;
}
```

### `UseClockOptions`

| Property    | Type                    | Default      | Description                                                              |
| ----------- | ----------------------- | ------------ | ------------------------------------------------------------------------ |
| `timeZone`  | `TimeZone \| UTCOffSet` | System TZ    | Time zone override, e.g. `'BDT'` or `'+06:00'` etc.                      |
| `format`    | `StrictFormat`          | `'HH:mm:ss'` | Format string used by `format()` method of `Chronos` instance            |
| `interval`  | `number \| 'frame'`     | `1000`       | Update interval in milliseconds or `'frame'` for `requestAnimationFrame` |
| `autoStart` | `boolean`               | `true`       | Whether the clock starts immediately or remains paused                   |

---

### `UseClockResult`

| Property    | Type         | Description                                                         |
| ----------- | ------------ | ------------------------------------------------------------------- |
| `time`      | `Chronos`    | The current `Chronos` instance, auto-updated                        |
| `formatted` | `string`     | Formatted time string using the given format, or `HH:mm:ss` if none |
| `pause`     | `() => void` | Function to pause the ticking clock                                 |
| `resume`    | `() => void` | Function to resume the clock if paused                              |
| `isPaused`  | `boolean`    | Indicates whether the clock is currently paused                     |

---

## useTimer

Creates a countdown timer. Requires [`Chronos` from `nhb-toolbox`](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos) (automatically tree-shaken if not used). Install it separately. Create countdown timers with minimal setup. Also provides a duration formatter utility: `formatTimer`.

### Import

```ts
import { useTimer, formatTimer} from 'nhb-hooks';
```

### Hook Signature

```ts
// Duration-based timer
function useTimer(initialDuration: number, unit: TimerUnit): TimeDuration;

// Target time-based timer
function useTimer(time: ChronosInput): TimeDuration;
```

### Examples

```tsx
// Countdown from 5 minutes
const timeLeft = useTimer(5, 'minute');
// { days: 0, hours: 0, minutes: 4, seconds: 59, ... }

// Countdown to specific date
const timeLeft = useTimer('2023-12-31');
```

```tsx
// Product sale countdown
function SaleBanner() {
 const { days, hours, minutes, seconds } = useTimer('2023-12-31');

 return (
  <div>
   Sale ends in: {days}d {hours}h {minutes}m {seconds}s
  </div>
 );
}

// Use the formatTimer utility
function SaleBanner() {
 const timeLeft = useTimer('2023-12-31');

 return (
  <div>
   Sale ends in:  {formatTimer(timeLeft)}
  </div>
 );
}
```

```ts
// Session timeout warning
function SessionTimeout() {
 const timeLeft = useTimer(15, 'minute');
 return (
  <div>
   Session expires in: {timeLeft.minutes}m {timeLeft.seconds}s
  </div>
 );
}

// Use the formatTimer utility
function SessionTimeout() {
 const timeLeft = useTimer(15, 'minute');
 return (
  <div>
   Session expires in: {formatTimer(timeLeft)}
  </div>
 );
}
```

### Notes for `useTimer`

- **Dependency**: Requires [**Chronos**](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos) from `nhb-toolbox`
- **Precision**: Updates every second (`1000`ms)
- **Formats**: Accepts both duration and target date
- **Output**: Returns a `TimeDuration` object with *dynamic* `years`, `months`, `days`, `hours`, `minutes`, `seconds` and *static* `milliseconds` properties
- **Duration Formatter**: `nhb-hooks` also provides utility to format the returned `TimeDuration` object: [`formatTimer`](#formattimer)

**Important**:

- Install required package: `npm i nhb-toolbox`
- Tree-shakable - `Chronos` is bundled only if the [hook](#usetimer) is used

**Accepted Formats**:

```ts
useTimer(5, 'minute'); // Countdown from 5 minutes
useTimer(5, 'day'); // Countdown from 5 days
useTimer('2025-12-31'); // Countdown to NYE
useTimer(new Date(2025, 11, 31)); // Date object
useTimer(new Chronos(2025, 11, 31)); // Chronos object
```

### Type Definitions

```ts
interface TimeDuration {
 years: number;
 months: number;
 days: number;
 hours: number;
 minutes: number;
 seconds: number;
 milliseconds: number;
}

type ChronosInput = number | string | Date | Chronos;

type TimerUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
```

### `formatTimer`

Formats a `TimeDuration` object (returned by [`useTimer`](#usetimer) hook) into a human-readable string.

> - The `formatTimer` utility transforms a duration object into a readable time string such as `"2 hours · 15 minutes"` or `"2h 15m"`.
> - It is especially useful when displaying timer or countdown values in the UI with minimal code.
> - Exported as separate utility to reduce final bundle size by making it optional.

---

#### Parameters

| Name       | Type                                                     | Description                                                |
| ---------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `duration` | `TimeDuration`                                           | Duration object returned by [`useTimer`](#usetimer).       |
| `options`  | [`TimerFormatOptions`](#timerformatoptions) *(optional)* | Control display style, separator, and formatting behavior. |

---

#### `TimerFormatOptions`

| Option      | Type                | Default  | Description                                                |
| ----------- | ------------------- | -------- | ---------------------------------------------------------- |
| `maxUnits`  | `1–6`               | `6`      | Limits the number of displayed time units.                 |
| `separator` | `string`            | `' · '`  | String used to separate time units.                        |
| `style`     | `'full' \| 'short'` | `'full'` | Display style. `"full"` → `"2 hours"`, `"short"` → `"2h"`. |
| `showZero`  | `boolean`           | `false`  | Whether to include units with `0` value.                   |

---

#### Examples

```tsx
import { formatTimer, useTimer } from 'nhb-hooks';

const duration = useTimer('2025-12-31');

console.log(formatTimer(duration));
// something like → "1 day · 2 hours · 15 minutes · 30 seconds"

console.log(formatTimer(duration, { style: 'short', maxUnits: 2 }));
// something like → "1d · 2h"

console.log(formatTimer(duration, { showZero: true }));
// something like → "0 years · 0 months · 1 day · 2 hours · 15 minutes · 30 seconds"
```

#### Notes for `formatTimer`

- `formatTimer` returns a human-readable formatted duration string from duration object returned by [`useTimer`](#usetimer) hook.
- When `showZero` is `false` (default), only units with non-zero values are included in the output.
- If all values are zero and `showZero` is `false`, the result will be `"0 seconds"` or `"0s"` depending on `style`.
- The `maxUnits` parameter limits the number of time units displayed, starting from the largest unit (`years`). It always applies **after** zero filtering.
- The method automatically handles pluralization in `"full"` style (e.g., `"1 second"` vs `"2 seconds"`).
- The order of units is always consistent: `years → months → days → hours → minutes → seconds`.
- It removes `'milliseconds'` property as it is static (updates after `1000ms` which is equivalent to `seconds`).
- Short style abbreviations: `years` (y), `months` (mo), `days` (d), `hours` (h), `minutes` (m), `seconds` (s).

#### Related

- [`duration`](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos/calculation#duration) method from `Chronos` — Used internally by `useTimer` to compute durations.
- [`durationString`](https://toolbox.nazmul-nhb.dev/docs/classes/Chronos/calculation#durationstring) — Similar `Chronos` method which returns formatted duration string.

---

## useTimerMs

Countdown timer with millisecond precision. Uses deadline-based timing for accurate countdowns, even when browser timers are throttled.

### Import

```ts
import { useTimerMs } from 'nhb-hooks';
```

### Hook Signature

```ts
function useTimerMs(time: TimeWithUnit | Numeric, options?: TimerOptions): TimerResult;
```

### Examples

```tsx
// Basic usage – countdown from 5 seconds
const { remaining, start, pause, reset } = useTimerMs(5);

return (
  <div>
    <p>Remaining: {(remaining / 1000).toFixed(2)}s</p>
    <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={reset}>Reset</button>
  </div>
);
```

```tsx
// Explicit milliseconds
const timer = useTimerMs('1500ms');
```

```tsx
// Auto start on mount
const timer = useTimerMs('10s', { autoStart: true });
```

```tsx
// Resume from existing remaining time
const timer = useTimerMs('30s', {
  initialRemainingMs: 15000, // start with 15 seconds remaining
});
```

```tsx
// Controlled pause via external state
const [paused, setPaused] = useState(false);
const { remaining } = useTimerMs(30, { paused });

return (
  <button onClick={() => setPaused(!paused)}>
    {paused ? 'Resume' : 'Pause'}
  </button>
);
```

```tsx
// Reset with custom value
const { reset } = useTimerMs('5m');

reset(120000); // reset to 2 minutes
```

### Options

| Option               | Type      | Default     | Description                                                             |
| -------------------- | --------- | ----------- | ----------------------------------------------------------------------- |
| `autoStart`          | `boolean` | `false`     | Whether to start the timer immediately on mount                         |
| `interval`           | `number`  | `100`       | UI update interval in milliseconds (does not affect countdown accuracy) |
| `initialRemainingMs` | `number`  | `undefined` | Initial remaining time in milliseconds (overrides parsed `time` value)  |
| `paused`             | `boolean` | `false`     | External pause control – when `true`, the timer remains paused          |

### Time Parsing Behavior

The `time` argument is parsed using [`parseMSec`](https://toolbox.nazmul-nhb.dev/docs/utilities/date/parse-time#parsemsec) from `nhb-toolbox`:

| Input Type    | Interpretation             | Examples                               |
| ------------- | -------------------------- | -------------------------------------- |
| `number`      | Interpreted as **seconds** | `5` or `"5"` → `5s` or `5000ms`        |
| `string`      | Supports explicit units    | `'1500ms'`, `'2s'`, `'1m'`, `'30m'`    |
| Invalid input | Normalized to `0`          | `null`, `undefined`, `'invalid'` → `0` |

**Best Practice**: If you already have milliseconds, prefer explicit units:

```ts
// Recommended
useTimerMs('1500ms');

// Works but less explicit
useTimerMs(1.5);
```

### Notes for `useTimerMs`

- **High Precision**: Uses deadline-based approach (`Date.now()`) for accurate timing, independent of render interval frequency
- **Interval Purpose**: The `interval` option only controls UI refresh rate, not countdown accuracy
- **Auto Completion**: Automatically stops when remaining time reaches `0`
- **External Control**: The `paused` option allows controlling the timer from parent component state
- **Reset Flexibility**: The `reset()` method accepts an optional custom time value

**Common Use Cases**:

- Session timeouts and auto-logout warnings
- Quiz timers with countdown
- Limited-time offers and flash sales
- Any scenario requiring precise countdown timing

### Comparison with `useTimer`

| Feature          | `useTimer`                                       | `useTimerMs`                                   |
| ---------------- | ------------------------------------------------ | ---------------------------------------------- |
| **Precision**    | Second-level (updates every 1000ms)              | Millisecond-level (configurable interval)      |
| **Output**       | Structured `TimeDuration` object                 | Raw milliseconds (`remaining`)                 |
| **Dependencies** | Requires `Chronos` from `nhb-toolbox`            | Uses lightweight `parseMSec` helper            |
| **Formatting**   | Built-in `formatTimer` utility                   | Manual formatting required                     |
| **Best For**     | Human-readable countdowns (days, hours, minutes) | Precise timing needs (animations, performance) |

> 💡 Tips:
> **Choose `useTimerMs`** when you need millisecond precision or want to build custom formatting.  
> **Choose `useTimer`** when you need structured duration objects (days, hours, minutes) with built-in formatting.

### Type Definitions

```ts
/** Options for `useTimerMs` */
interface TimerOptions {
  /** Start the countdown automatically when the hook mounts. @default false */
  autoStart?: boolean;
  /** Update interval in milliseconds. Controls UI refresh rate, not accuracy. @default 100 */
  interval?: number;
  /** Initial remaining time in milliseconds (overrides parsed `time` value) */
  initialRemainingMs?: number;
  /** External pause control – when `true`, the timer remains paused. @default false */
  paused?: boolean;
}

/** Result of `useTimerMs` */
interface TimerResult {
  /** Remaining countdown time in milliseconds */
  remaining: number;
  /** Indicates whether the timer is currently running */
  isRunning: boolean;
  /** Starts or resumes the countdown */
  start: () => void;
  /** Pauses the countdown */
  pause: () => void;
  /** Resets the timer to the provided time (defaults to initial value) */
  reset: (time?: number) => void;
  /** Toggles the running state */
  toggle: () => void;
}
```

---

## useStopwatch

High-precision stopwatch with millisecond accuracy. Uses timestamp-based timing to maintain precision even when browser timers are throttled in background tabs.

### Import

```ts
import { useStopwatch } from 'nhb-hooks';
```

### Hook Signature

```ts
function useStopwatch(options?: StopwatchOptions): StopwatchResult;
```

### Examples

```tsx
// Basic usage
const { elapsed, start, pause, reset, toggle } = useStopwatch();

return (
  <div>
    <p>Elapsed: {(elapsed / 1000).toFixed(2)}s</p>
    <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={reset}>Reset</button>
    <button onClick={toggle}>Toggle</button>
  </div>
);
```

```tsx
// Auto start on mount
const stopwatch = useStopwatch({ autoStart: true });
```

```tsx
// Custom update interval (UI refresh rate)
const stopwatch = useStopwatch({ interval: 50 }); // updates every 50ms
```

```tsx
// Start with initial elapsed time
const stopwatch = useStopwatch({ initialTime: 5000 }); // starts at 5 seconds
```

```tsx
// Controlled pause via external state
const [paused, setPaused] = useState(false);
const { elapsed } = useStopwatch({ paused });

return (
  <button onClick={() => setPaused(!paused)}>
    {paused ? 'Resume' : 'Pause'}
  </button>
);
```

```tsx
// Reset with custom time
const { reset } = useStopwatch();

reset(2000); // reset to 2 seconds
```

### Options

| Option        | Type      | Default | Description                                                        |
| ------------- | --------- | ------- | ------------------------------------------------------------------ |
| `autoStart`   | `boolean` | `false` | Whether to start the stopwatch immediately on mount                |
| `interval`    | `number`  | `100`   | UI update interval in milliseconds (does not affect precision)     |
| `initialTime` | `number`  | `0`     | Initial elapsed time in milliseconds                               |
| `paused`      | `boolean` | `false` | External pause control – when `true`, the stopwatch remains paused |

### Notes for `useStopwatch`

- **High Precision**: Uses `Date.now()` and accumulates elapsed time via offset, ensuring accuracy even if render intervals drift or browsers throttle timers in background tabs
- **Interval Purpose**: The `interval` option only controls UI update frequency, **not** the actual timing precision
- **Pause/Resume**: Elapsed time is accumulated seamlessly across multiple pause/resume cycles
- **External Control**: The `paused` option allows controlling the stopwatch from parent component state

**Common Use Cases**:

- Timing user interactions (game playtime, task completion)
- Performance measurement and benchmarking
- Exercise/activity timers
- Any scenario requiring millisecond-precision elapsed time tracking

### Type Definitions

```ts
/** Options for `useStopwatch` */
interface StopwatchOptions {
  /** Start the stopwatch automatically when the hook mounts. @default false */
  autoStart?: boolean;
  /** Update interval in milliseconds. Controls UI refresh rate, not precision. @default 100 */
  interval?: number;
  /** Initial elapsed time in milliseconds. @default 0 */
  initialTime?: number;
  /** External pause control – when `true`, the stopwatch remains paused. @default false */
  paused?: boolean;
}

/** Result of `useStopwatch` */
interface StopwatchResult {
  /** Elapsed time in milliseconds */
  elapsed: number;
  /** Indicates whether the stopwatch is currently running */
  isRunning: boolean;
  /** Starts or resumes the stopwatch */
  start: () => void;
  /** Pauses the stopwatch */
  pause: () => void;
  /** Resets the stopwatch to the provided time (defaults to 0) */
  reset: (time?: number) => void;
  /** Toggles the running state */
  toggle: () => void;
}
```

---

## useToggle

Clean state toggling between two values.

### Import

```ts
import { useToggle } from 'nhb-hooks';
```

### Hook Signature

```ts
function useToggle<T>(values: [T, T]): [T, () => void];
```

### Examples

```tsx
const [isOn, toggle] = useToggle([false, true]);
toggle(); // switches between false and true

const [fruit, switchFruit] = useToggle(['apple', 'orange']);
switchFruit(); // switches between 'apple' and 'orange'

const [theme, toggleTheme] = useToggle(['light', 'dark']);
toggleTheme(); // Switches between `dark` and `light` theme
```

### Notes for `useToggle`

- **Simple API**: Just provide two values to toggle between
- **Type Safe**: Maintains your value types
- **Stable Toggle**: Function identity remains consistent
- **No Limits**: Works with any comparable values
- **Note**: Values must be distinct (don't use [true, true])

**Creative Uses**:

```ts
const [mode, toggle] = useToggle(['light', 'dark']); // Theme
const [tab, switchTab] = useToggle(['overview', 'details']); // Tabs
const [view, toggleView] = useToggle(['list', 'grid']); // Layout
```

---

## useValidImage

Graceful image loading with fallbacks. Validates image URLs and provides fallback for broken images.

### Import

```ts
import { useValidImage } from 'nhb-hooks';
```

### Hook Signature

```ts
function useValidImage<T extends string | string[]>(
 input: T | undefined,
 options?: ValidImageOptions,
): ValidImage<T>;
```

### Examples

```tsx
// Single image
const avatar = useValidImage('user/avatar.jpg', {
 imgHostLink: 'https://cdn.example.com/',
 placeholder: '/default-avatar.png',
});

// Multiple images
const gallery = useValidImage(['img1.jpg', 'img2.jpg']);
```

```tsx
// Single image with CDN prefix and no trailing slash
const avatar = useValidImage('user123.jpg', {
 imgHostLink: 'https://cdn.example.com',
 placeholder: '/default-avatar.png',
 trailingSlash: false,
});

return <img src={avatar} alt="Profile" />;

// Image gallery
const galleryImages = useValidImage(
 ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
 { imgHostLink: 'https://images.example.com' },
);

return galleryImages.map((img, i) => (
 <img key={i} src={img} alt={`Photo ${i}`} />
));
```

### Options

- `imgHostLink`: Base path to prepend to image URL(s) if the image is hosted somewhere else. By default the hook assumes that the link has a trailing `/`. Customize it in `trailingSlash` option.
- `trailingSlash`: Whether the `imgHostLink` has a trailing slash `/`. Default is `true`. Full image URL will be built on this flag.
- `placeholder`: Fallback image URL. It can be local/public image or hosted image (needs full url for hosted placeholder image).

### Notes for `useValidImage`

- **Fallback**: Automatically uses placeholder for broken images
- **CDN Support**: Easily prepend base URLs
- **Async Loading**: Checks images in parallel
- **Type Safe**: Maintains input type (string or string[])

**Important Options**:

```ts
{
  imgHostLink: 'https://cdn.example.com', // Base URL
  trailingSlash: false, // Handle URL formatting
  placeholder: '/fallback.jpg' // Custom fallback
}
```

**Performance**:

- Only checks images once per URL
- Doesn't revalidate unless input changes

### Type Definitions

```ts
/** Type for `useValidImage` hook's return type. */
type ValidImage<T> = T extends string ? string : string[];

/** Options for `useValidImage` hook. */
interface ValidImageOptions {
 /** Base path to prepend to image URL(s) if the image is hosted somewhere else. By default the hook assumes that the link has a trailing `/`. Customize it in `trailingSlash` option. */
 imgHostLink?: string;
 /** Whether the `imgHostLink` has a trailing slash `/`. Default is `true`. Full image URL will be built on this flag. */
 trailingSlash?: boolean;
 /** Fallback image URL. It can be local/public image or hosted image (needs full url for hosted placeholder image). */
 placeholder?: string;
}
```

---

## useWindowResize

Triggers a callback whenever the window is resized..

### Import

```ts
import { useWindowResize } from 'nhb-hooks';
```

### Hook Signature

```ts
function useWindowResize(callback: () => void): void;
```

### Examples

```tsx
useWindowResize(() => {
 console.log('Window resized');
});
```

```tsx
useWindowResize(() => {
 // Recalculate layout on resize
 updateChartDimensions();
});
```

### Notes for `useWindowResize`

- **Simple API**: Just pass your resize handler
- **Cleanup**: Automatically removes listeners
- **Throttling**: Doesn't include built-in throttling (add your own if needed)

**Performance Tip**:

```ts
// Throttle heavy operations
useWindowResize(() => {
  throttleAction(() => updateLayout(), 100);
});

// Or use with useDebouncedValue
const [width, setWidth] = useState(window.innerWidth);
useWindowResize(debounceAction(() => setWidth(window.innerWidth), 200);
```

---

## useTitle

Sets the `document.title` dynamically at runtime, using your app’s site title configuration. Supports prepend/append positions, custom separators, and global title context via a provider.

### Import

```tsx
import { useTitle, useTitleMeta, TitleProvider } from 'nhb-hooks';
```

### 📦 Context Setup (Required Once)

Wrap your root component (or layout) with `TitleProvider` to configure the global site title and defaults:

```tsx
import { TitleProvider } from 'nhb-hooks';

<TitleProvider
  config={{
    siteTitle: 'Bangu Site Inc.',
    defaultPosition: 'after',     // or 'before'
    defaultSeparator: ' - ',
  }}
>
  <App />
</TitleProvider>
```

### ✅ Hook Signature

```ts
function useTitle(title: string, options?: TitleOptions): void
```

### 🔧 Options

| Option      | Type                    | Description                                                   | Default    |
| ----------- | ----------------------- | ------------------------------------------------------------- | ---------- |
| `separator` | `string`                | Character(s) between page and site title                      | `" - "`    |
| `position`  | `"before" \| "after"`   | Where to place the page title: before or after the site title | `"before"` |
| `favicon`   | `string` \| `undefined` | Optional favicon to temporarily set with the title            |            |

### 🧪 Examples

```tsx
// Basic usage (uses default site title and config)
useTitle('Dashboard'); // → "Dashboard - Bangu Site Inc."

// Change position
useTitle('Login', { position: 'after' }); // → "Bangu Site Inc. - Login"

// Custom separator
useTitle('Docs', { separator: ' | ' }); // → "Docs | Bangu Site Inc."

// Custom everything
useTitle('Account', { position: 'after', separator: ' • ' }); // → "Bangu Site Inc. • Account"
```

### 🌐 Full Page Example

```tsx
function Page() {
  useTitle('Settings');

  return <h1>Settings Page</h1>;
}
```

```tsx
function Page() {
  useTitle('About', { position: 'after', separator: ' · ' });

  return <h1>About Us</h1>;
}
```

### 🧼 Cleanup Behavior

On unmount, `useTitle` will **restore the previous document title**, making it safe for conditional rendering and nested layouts.

### ⚠️ Notes

- **Client-only**: This hook must run in a browser environment.
- **Memoization**: You don’t need to memoize `options`; shallow comparison is already handled.
- **TitleProvider config options**: If not used, fallback title will be `title` only.

### 🧩 Advanced Customization

You can extract the current title metadata using:

```tsx
import { useTitleMeta } from 'nhb-hooks';

const { siteTitle, pageTitle, fullTitle, ... } = useTitleMeta();
```

Extract and observe current title state from the global `TitleProvider` context.

#### Purpose

Use `useTitleMeta` when you want to **read** the current title state (e.g., for displaying breadcrumbs, page headers, or meta tags).

#### Signature

```ts
function useTitleMeta(): TitleMeta
```

#### Returned Object

| Key                | Type                    | Description                          |
| ------------------ | ----------------------- | ------------------------------------ |
| `pageTitle`        | `string`                | The current page-specific title      |
| `siteTitle`        | `string`                | The global app/site name             |
| `fullTitle`        | `string`                | The computed `document.title` value  |
| `defaultPosition`  | `"before"` \| `"after"` | Global default for title positioning |
| `defaultSeparator` | `string`                | Global default separator             |

#### Example Usage

```tsx
import { useTitleMeta } from 'nhb-hooks';

function Breadcrumb() {
  const { pageTitle, fullTitle } = useTitleMeta();

  return <nav aria-label="breadcrumb">{pageTitle}</nav>;
}
```

### 📘 Type Definitions

```ts
/** Configuration values for the provider context */
interface TitleConfig {
  siteTitle?: string;
  defaultPosition?: 'before' | 'after';
  defaultSeparator?: string;
}

/** Props for the TitleProvider component */
interface TitleProviderProps {
  children: React.ReactNode;
  config?: Partial<TitleConfig>;
}

/** Per-call override options */
interface TitleOptions {
  separator?: string;
  position?: 'before' | 'after';
  favicon?: string;
}

/** Metadata from `TitleProvider` and `useTitle` */
interface TitleMeta {
  siteTitle?: string;
  pageTitle?: string;
  fullTitle?: string;
  defaultPosition?: 'before' | 'after';
  defaultSeparator?: string;
}
```

### 🧠 Best Practices

| Scenario             | Recommendation                                                              |
| -------------------- | --------------------------------------------------------------------------- |
| Default branding     | Use `TitleProvider` once in your root layout for consistent app-wide titles |
| Specific page titles | Use `useTitle` for client-side updates; use `<title>` tag for SSR           |
| Read-only access     | Use `useTitleMeta()` in components like breadcrumbs or metadata injection   |
| SSR                  | `useTitle` doesn't run on server — inject `<title>` tag manually for SEO    |

> ℹ️ `useTitle` only affects the document title **after hydration**.  
> For proper SEO and server-rendered HTML, include a static `<title>` in your SSR framework's head management.

---

## useMount

A tiny, client-only *React hook* to prevent **Next.js hydration mismatch errors**.

### Description

`Next.js` hydration mismatch errors occur when the server-rendered HTML doesn't match the client render.  
`useMount` solves this by **rendering children only after the component mounts** on the client.

### Import

```tsx
import { useMount } from 'nhb-hooks';
```

### Hook Signature

```ts
function useMount<T extends ReactNode>(children: T, onMount?: () => void): T | null
```

### Examples

#### With `children` only

```tsx
'use client';

import FloatingButton from '@/components/ui/floating-button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMount } from 'nhb-hooks';
import { useCallback } from 'react';

export default function ThemeToggler() {
 const { theme, setTheme } = useTheme();

 const toggleTheme = useCallback(() => {
  if (theme) {
   setTheme(theme === 'dark' ? 'light' : 'dark');
  }
 }, [theme]);

 return useMount(
  <FloatingButton onClick={toggleTheme} icon={theme === 'dark' ? Sun : Moon} />
 );
}
```

#### With optional `onMount`

```tsx
const ClientOnlyContent = () => {
 return useMount(<div>This will only render on the client!</div>, () => console.log('Mounted on client!'));
};
```

### Notes for `onMount`

- Returns `null` on the server or before mounting to avoid mismatch.
- Perfect for **Floating Buttons**, **theme toggles**, or other **client-only UI elements**.
- Lightweight, zero dependencies, fully typed for TypeScript.
- Works seamlessly with `Next.js` **App Router**.

### Why It’s Effective

- **Hydration-safe:** Ensures `children` render **only on the client**.  
- **Tiny & composable:** Works with any component or UI element. Keeps SSR clean while safely rendering client-only logic.
- **Optional callback:** Executes client-only logic after mount, useful for initialization.
- **Type-safe:** Generic `<T extends ReactNode>` supports all React content.  
- **No layout shift:** Simple, lightweight, no extra markup is added.  
- **Versatile:** Can be used for buttons, modals, theme togglers, animations, etc.

---

## useStorage

Persist state in `localStorage` or `sessionStorage` with reactive updates and type safety. Safely handles SSR environments like `Next.js`.

### Import

```ts
import { useStorage } from 'nhb-hooks';
```

### Hook Signature

```ts
function useStorage<T>(options: StorageOptions<T>): WebStorage<T>;
```

### Examples

```tsx
// Basic usage - store theme preference
const themeStorage = useStorage<string>({
  key: 'app-theme',
  type: 'local',
});

return (
  <button onClick={() => themeStorage.set('dark')}>
    Current theme: {themeStorage.value ?? 'none'}
  </button>
);
```

```tsx
// Store complex objects with custom serialization
type User = {
  name: string;
  age: number;
  dob: Date;
};

const userStore = useStorage<User>({
  key: 'app-user',
  serialize: (u) => JSON.stringify(u),
  deserialize: (s) => {
    const parsed = JSON.parse(s);
    return { ...parsed, dob: new Date(parsed.dob) };
  },
});

// Session storage example
const sessionData = useStorage<number[]>({
  key: 'cart-items',
  type: 'session',
});
```

```tsx
// Complete storage management
const settings = useStorage<Settings>({
  key: 'app-settings',
  type: 'local',
});

// Update settings
settings.set({ theme: 'dark', language: 'en' });

// Remove just these settings
settings.remove();

// Clear all local storage
settings.clear();
```

### Options

- `key`: Unique key to identify the stored value (required)
- `type`: Storage type - `'local'` (default) or `'session'`
- `serialize`: Custom function to convert value to string (default: `JSON.stringify`)
- `deserialize`: Custom function to parse stored string back to type (default: `JSON.parse`)

### Notes for `useStorage`

- **SSR Safe**: Delays storage access until client-side hydration is complete
- **Reactive**: Component re-renders when stored value changes
- **Type Safe**: Full TypeScript support with generic type parameter
- **Error Handling**: Gracefully handles storage errors (quota exceeded, etc.)
- **Synchronized**: Multiple components using same key stay in sync

**Important Behaviors**:

- Returns `null` for `value` if key doesn't exist or on error
- `set()` overwrites existing value
- `remove()` deletes only the specified key
- `clear()` removes all items from the selected storage type

### Type Definitions

```ts
/** Options for `useStorage` hook. */
export type StorageOptions<T> = {
  /** Key to store the value with in local/session storage. */
  key: string;
  /** Storage type to use (`localStorage`/`sessionStorage`). Defaults to `'local'`. */
  type?: 'local' | 'session';
  /**
   * Optional serializer function to convert the value of type `T` to a string. 
   * Defaults to `JSON.stringify`.
   */
  serialize?: (value: T) => string;
  /**
   * Optional deserializer function to convert the stored value back to type `T`.
   * Defaults to `JSON.parse`.
   */
  deserialize?: (value: string) => T;
};

/** Return type of `useStorage` hook. */
export type WebStorage<T> = {
  /** Current value from storage, or `null` if not set or on error. */
  value: T | null;
  /** Function to set value in specified storage. */
  set: (value: T) => void;
  /** Function to remove the item from specified storage. */
  remove: () => void;
  /** Function to clear all items from the selected storage type. */
  clear: () => void;
};
```

---

## 📜 License

MIT © [Nazmul Hassan](https://nazmul-nhb.dev/). See [LICENSE](LICENSE) for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
