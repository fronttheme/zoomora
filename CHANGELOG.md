# Changelog

All notable changes to Zoomora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-07-01

### Added
- **`openImage()` API** — open the lightbox programmatically with images not present in the DOM. Accepts a single URL string, an array of URLs, a config object, or an array of config objects with `src`, `thumb`, `type`, `caption`, and `alt` fields. Closes [#7](https://github.com/fronttheme/zoomora/issues/7)
  ```js
  lightbox.openImage('photo.jpg');
  lightbox.openImage(['a.jpg', 'b.jpg'], { startIndex: 1 });
  lightbox.openImage({ src: 'video.mp4', type: 'video', thumb: 'poster.jpg', caption: 'My video' });
  ```
- **`createVirtualItem()` method** — public helper that wraps a raw URL/config object into the virtual DOM-compatible shape `openImage()` uses internally; also useful for custom integrations
- **Scroll-wheel / trackpad-pinch zoom** — mouse wheel and trackpad pinch now zoom images continuously, using `zoomStep` as the scale increment per wheel tick
- **CSS custom properties** — four runtime theming variables are now exposed in `:root` so users can restyle the lightbox with plain CSS without recompiling Sass:
    - `--zoomora-overlay-bg` — lightbox backdrop colour
    - `--zoomora-control-bg` — button and nav background
    - `--zoomora-control-hover` — button and nav hover background
    - `--zoomora-primary` — accent colour (used for active states)

### Fixed
- **`maxZoomScale` now respected** — `calculateZoomLevels()` previously hardcoded a 3× ceiling regardless of the option value; it now builds progressive zoom steps up to the configured maximum. Setting `maxZoomScale: 1` disables zoom entirely; invalid values (zero, negative, non-numeric) fall back to the documented default of `3`
- **`zoomStep` now respected** — was documented and present in defaults since v1.0.0 but never wired to any handler; now drives the scroll-wheel zoom increment
- **LICENSE year** — corrected from 2025 to 2026 to match the copyright year in all file headers
- Removed unused `idleTimer` instance property (declared in constructor, never read or written after init)
- Removed unused `updateImageTransform()` method (defined but never called; drag and wheel handlers write transforms directly)
- Widened `addEventListener` internal JSDoc type from `{Element}` to `{EventTarget}` — both `Element` and `Document` extend `EventTarget`; passing `document` was always correct but triggered type warnings
- Added `.toString()` to the five `dataset` assignments in `checkZoomability()` — `dataset` properties are always strings; assigning numbers directly caused type warnings
- Renamed unused `key` parameter to `_key` in `destroy()` forEach to signal intentional discard

### Changed
- **Build: `rollupOptions` → `rolldownOptions`** in `vite.config.js` for Vite 8; the old key still resolves but is deprecated and will be removed in a future Vite release
- **Build: sourcemaps removed from minified outputs** — `zoomora.umd.min.js` and `zoomora.es.min.js` no longer ship `.map` files; CDN and WordPress users don't need them. Unminified builds (`zoomora.umd.js`, `zoomora.es.js`) retain their sourcemaps for developers bundling via npm
- **Dependencies** — `vite` `^7.0.4` → `^8.1.2`, `sass` `^1.89.2` → `^1.101.0`
- Extracted `_activateLightbox()` internal method from `open()` to eliminate the duplicated activation sequence now shared with `openImage()`

---

## [1.2.1] - 2026-02-26

### Fixed
- Fixed `showZoom: false` option not hiding the zoom button
- Fixed `showFullscreen: false` option not hiding the fullscreen/collapse buttons
- Fixed `showCounter: false` option not hiding the counter
- Fixed `showThumbnails: false` option not hiding the thumbnail strip and toggle button
- Fixed caption repositioning when `showThumbnails: false` (now sits at correct bottom offset)
- Fixed font glyph bounding box warning in Firefox (regenerated icon font)

## [1.2.0] - 2026-02-04

### Added
- **Background click to close**: Clicking on the dark background area (outside media content) now closes the lightbox (#4)
- New configuration option `closeOnBackgroundClick` (default: `true`) to control this behavior
- Smart click detection that distinguishes between media content, controls, and background clicks

### Changed
- Enhanced `handleContentClick()` method to support background click detection
- Improved click handling logic to prevent accidental closes during image zoom or drag operations

### Fixed
- Click handling now properly respects drag operations (won't trigger close if recently dragging)
- Video and iframe clicks no longer interfere with zoom or close functionality

### Thanks
- Special thanks to [@dragoeco] for suggesting this feature and providing a working CodePen example!

## [1.1.0] - 2025-11-30

### Added
- **Progressive zoom levels**: Click to zoom through multiple levels (1x → 1.5x → 2x → 3x → 100% actual size)
- **Smart zoom detection**: Only allows zoom if image is actually larger than viewport
- **Improved vertical image support**: Proper boundary calculation for portrait-oriented images
- **Click vs drag detection**: Prevents accidental zoom when releasing after drag

### Fixed
- Fixed drag dezooming issue - images no longer jump or reset position during drag ([#2](https://github.com/fronttheme/zoomora/issues/2))
- Fixed `showAutoHideToggle` option not working - button now properly shows/hides ([#3](https://github.com/fronttheme/zoomora/issues/3))
- Fixed CSS transition conflicts during drag operations
- Fixed boundary calculations for vertical/portrait images
- Fixed zoom button not responding on already-zoomed landscape images

### Changed
- Zoom behavior now cycles through progressive levels instead of simple toggle
- Improved transform state management for more reliable dragging
- Better handling of different image orientations (landscape, portrait, square)
- Enhanced drag smoothness on both desktop and mobile devices

### Technical Improvements
- Removed unreliable CSS transform string parsing
- Implemented proper state-based transform management
- Added `calculateZoomLevels()` method for intelligent zoom level detection
- Improved boundary constraints using container vs image size comparison
- Added drag timing detection to prevent click events after drag

## [1.0.0] - 2025-10-03

### Added
- Initial release
- Image lightbox with zoom functionality
- Gallery support with thumbnails
- Fullscreen mode
- Keyboard navigation
- Touch/swipe support
- Video support (YouTube, MP4)
- Auto-hide controls
- Customizable options
- Responsive design
- Modern ES6+ code

---

## Upgrade Guide

### From 1.2.x to 1.3.0

**Breaking Changes:** None — fully backward compatible.

**New Behavior:**
- `maxZoomScale` and `zoomStep` now actually do something. If you relied on `maxZoomScale` being silently ignored (e.g. to keep the hardcoded 3× cap on a small image), review your configuration.
- Scroll wheel over an open image now zooms instead of scrolling the page. This is gated behind `showZoom: true` (the default). Set `showZoom: false` to disable both the button and wheel zoom.

**No code changes required** for existing integrations — just update the version and enjoy the improvements.

```bash
npm install zoomora@1.3.0
```

### From 1.0.0 to 1.1.0

**Breaking Changes:** None - fully backward compatible!

**New Behavior:**
- Zoom now works progressively (multiple clicks) instead of toggle
- Small images that fit in viewport won't have zoom functionality
- Images zoom to actual size (100%) as final zoom level

**No code changes required** - just update the version and enjoy the improvements!

```bash
npm install zoomora@1.1.0
```

**Recommended:** Test zoom functionality with various image sizes to experience the new progressive zoom levels.