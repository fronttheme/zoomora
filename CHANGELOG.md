# Changelog

All notable changes to Zoomora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
