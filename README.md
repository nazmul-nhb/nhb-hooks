# NHB Hooks

## Reusable React Hooks

<p>
  <a href="https://www.npmjs.com/package/nhb-hooks" aria-label="Downloads">
    <img src="https://img.shields.io/npm/dm/nhb-hooks.svg?label=DOWNLOADS&style=flat&color=red&logo=npm" alt="Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/nhb-hooks" aria-label="Version">
    <img src="https://img.shields.io/npm/v/nhb-hooks.svg?label=NPM&style=flat&color=teal&logo=npm" alt="Latest Version" />
  </a>
  <a href="https://bundlephobia.com/result?p=nhb-hooks" aria-label="Bundle size">
    <img src="https://img.shields.io/bundlephobia/minzip/nhb-hooks?style=flat&color=purple&label=SIZE&logo=nodedotjs" alt="Bundle Size" />
  </a>
  <a href="https://www.npmjs.com/package/nhb-hooks" aria-label="License">
    <img src="https://img.shields.io/npm/l/nhb-hooks.svg?label=LICENSE&style=flat&color=orange&logo=open-source-initiative" alt="License" />
  </a>
</p>

<!-- markdownlint-disable-file MD024 -->

## 📦 Description

A **lightweight**, **tree-shakable** collection of essential React hooks designed for common use cases. Only the hooks you import are included in your final bundle, ensuring optimal performance.

> This package requires [nhb-toolbox](https://nhb-toolbox.vercel.app/) as a peer dependency, as some hooks rely on utilities from it.

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

> **Note:** The `useTimer` and `useClock` hooks depend on the [Chronos](https://nhb-toolbox.vercel.app/docs/classes/Chronos) class and/or [chronos](https://nhb-toolbox.vercel.app/docs/utilities/date/chronos) function from [nhb-toolbox](https://www.npmjs.com/package/nhb-toolbox). Make sure to install both `nhb-hooks` and `nhb-toolbox` packages to use all available features. Both packages are fully tree-shakable, so only the code you use will be bundled if you use bundler tools like vite, rollup, webpack etc.

---

## Features

✅ **Tree-shakable** – Only bundle what you use.  
✅ **TypeScript support** – Built with type safety in mind.  
✅ **Minimal dependencies** – Only `react`, `react-dom` and `nhb-toolbox` as a peer dependencies.

---

## Table of Contents

- [useMediaQuery](#usemediaquery)
- [useBreakPoint](#usebreakpoint)
- [useClickOutside](#useclickoutside)
- [useCopyText](#usecopytext)
- [useDebouncedValue](#usedebouncedvalue)
- [useClock](#useclock)
- [useTimer](#usetimer)
- [useToggle](#usetoggle)
- [useValidImage](#usevalidimage)
- [useWindowResize](#usewindowresize)
- [useTitle](#usetitle)

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

### Notes for useMediaQuery

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

### Notes for useBreakPoint

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

### Notes for useClickOutside

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
 copiedText: string;
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
- `resetTimeOut`: Time in milliseconds to retain `copiedText` before it resets. Defaults to `2500`.

### Notes for useCopyText

- **copiedText State**: Useful for showing transient UI feedback like button label change ("Copied!" state).
- **Fallback-Safe**: Works in environments without `navigator.clipboard` by falling back to `document.execCommand('copy')`.
- **Resets Automatically**: Automatically clears `copiedText` after timeout.

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

### Notes for useDebouncedValue

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

Live-updating clock based on `Chronos` from [`nhb-toolbox`](https://nhb-toolbox.vercel.app/). Supports formatting, timezones, animation frame ticking, and pause/resume. Lightweight and reactive by default.

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

- **Dependency**: Uses `Chronos` from [`nhb-toolbox`](https://nhb-toolbox.vercel.app/).
- **Timezone**: Supports `TimeZone` names or `UTCOffset` values (e.g. `"BDT"` or `"+06:00"`).
- **Formats**: Supports `Chronos.format()` strings.
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

| Property     | Type                    | Default      | Description                                        |
| ------------ | ----------------------- | ------------ | -------------------------------------------------- |
| `timeZone`   | `TimeZone \| UTCOffSet` | System TZ    | Time zone override, e.g. `'BDT'` or `'+06:00'` etc.|
| `format`     | `StrictFormat`          | `'HH:mm:ss'` | Format string used by `Chronos.format()`           |
| `interval`   | `number \| 'frame'`     | `1000`       | Update interval in milliseconds or `'frame'` for `requestAnimationFrame` |
| `autoStart`  | `boolean`               | `true`       | Whether the clock starts immediately or remains paused |

---

### `UseClockResult`

| Property    | Type                  | Description                                                          |
| ----------- | --------------------- | -------------------------------------------------------------------- |
| `time`      | `Chronos`             | The current `Chronos` instance, auto-updated                         |
| `formatted` | `string`              | Formatted time string using the given format, or `HH:mm:ss` if none  |
| `pause`     | `() => void`          | Function to pause the ticking clock                                  |
| `resume`    | `() => void`          | Function to resume the clock if paused                               |
| `isPaused`  | `boolean`             | Indicates whether the clock is currently paused                      |

---

## useTimer

Creates a countdown timer. Requires [nhb-toolbox](https://nhb-toolbox.vercel.app/) (automatically tree-shaken if not used). Install it separately. Create countdown timers with minimal setup.

### Import

```ts
import { useTimer } from 'nhb-hooks';
```

### Hook Signature

```ts
// Duration-based timer
function useTimer(
 initialDuration: number,
 unit: Exclude<TimeUnit, 'week'>,
): TimeDuration;

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

// Session timeout warning
function SessionTimeout() {
 const timeLeft = useTimer(15, 'minute');
 return (
  <div>
   Session expires in: {timeLeft.minutes}m {timeLeft.seconds}s
  </div>
 );
}
```

### Notes for useTimer

- **Dependency**: Requires [Chronos](https://nhb-toolbox.vercel.app/docs/classes/Chronos) from `nhb-toolbox`
- **Precision**: Updates every second (1000ms)
- **Formats**: Accepts both duration and target date
- **Output**: Returns a TimeDuration object with days/hours/minutes/seconds

**Important**:

- Install required package: `npm i nhb-toolbox`
- Tree-shaking works - only Chronos is bundled if used
- Week unit is excluded due to ambiguous duration

**Example Formats**:

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

type TimeUnit =
 | 'year'
 | 'month'
 | 'day'
 | 'week'
 | 'hour'
 | 'minute'
 | 'second'
 | 'millisecond';

// And `unit` parameter type is just excluding `week`
Exclude<TimeUnit, 'week'>;
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

### Notes for useToggle

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

### Notes for useValidImage

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

### Notes for useWindowResize

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

---

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

---

### ✅ Hook Signature

```ts
function useTitle(title: string, options?: TitleOptions): void
```

---

### 🔧 Options

| Option      | Type                   | Description                                                   | Default   |
| ----------- | ---------------------- | ------------------------------------------------------------- | --------- |
| `separator` | `string`               | Character(s) between page and site title                      | `" - "`   |
| `position`  | `"before" \| "after"`  | Where to place the page title: before or after the site title | `"before"`|
| `favicon`   | `string` \| `undefined`| Optional favicon to temporarily set with the title            |           |

---

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

---

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

---

### 🧼 Cleanup Behavior

On unmount, `useTitle` will **restore the previous document title**, making it safe for conditional rendering and nested layouts.

---

### ⚠️ Notes

- **Client-only**: This hook must run in a browser environment.
- **Memoization**: You don’t need to memoize `options`; shallow comparison is already handled.
- **TitleProvider config options**: If not used, fallback title will be `title` only.

---

### 🧩 Advanced Customization

You can extract the current title metadata using:

```tsx
import { useTitleMeta } from 'nhb-hooks';

const { siteTitle, pageTitle, fullTitle, ... } = useTitleMeta();
```

Extract and observe current title state from the global `TitleProvider` context.

### Purpose

Use `useTitleMeta` when you want to **read** the current title state (e.g., for displaying breadcrumbs, page headers, or meta tags).

### Signature

```ts
function useTitleMeta(): TitleMeta
```

### Returned Object

| Key                | Type                    | Description                          |
| ------------------ | ----------------------- | ------------------------------------ |
| `pageTitle`        | `string`                | The current page-specific title      |
| `siteTitle`        | `string`                | The global app/site name             |
| `fullTitle`        | `string`                | The computed `document.title` value  |
| `defaultPosition`  | `"before"` \| `"after"` | Global default for title positioning |
| `defaultSeparator` | `string`                | Global default separator             |

### Example Usage

```tsx
import { useTitleMeta } from 'nhb-hooks';

function Breadcrumb() {
  const { pageTitle, fullTitle } = useTitleMeta();

  return <nav aria-label="breadcrumb">{pageTitle}</nav>;
}
```

---

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

---

### 🧠 Best Practices

| Scenario             | Recommendation                                                              |
| -------------------- | --------------------------------------------------------------------------- |
| Default branding     | Use `TitleProvider` once in your root layout for consistent app-wide titles |
| Specific page titles | Use `useTitle` for client-side updates; use `<title>` tag for SSR           |
| Read-only access     | Use `useTitleMeta()` in components like breadcrumbs or metadata injection   |
| SSR                  | `useTitle` doesn't run on server — inject `<title>` tag manually for SEO    |

---

> ℹ️ `useTitle` only affects the document title **after hydration**.  
> For proper SEO and server-rendered HTML, include a static `<title>` in your SSR framework's head management.

---

## 📜 License

MIT © [Nazmul Hassan](https://nazmul-nhb.vercel.app/). See [LICENSE](LICENSE) for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
