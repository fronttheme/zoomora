# Zoomora Lightbox

![Zoomora Lightbox Banner](assets/zoomora-lightbox-banner-v1.3.0.png)

<div align="center">

A modern, responsive lightbox plugin with zoom, fullscreen, and gallery features. Perfect for showcasing images and videos in a beautiful, user-friendly interface.

[![View Live Demo](https://img.shields.io/badge/View-Live%20Demo-667eea?style=for-the-badge&logo=github)](https://fronttheme.github.io/zoomora/)
[![npm version](https://img.shields.io/npm/v/zoomora?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/zoomora)
[![npm downloads](https://img.shields.io/npm/dm/zoomora?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/zoomora)
[![License](https://img.shields.io/npm/l/zoomora?style=for-the-badge&color=green)](https://github.com/fronttheme/zoomora/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/zoomora?style=for-the-badge&color=orange&logo=webpack)](https://bundlephobia.com/package/zoomora)
[![GitHub stars](https://img.shields.io/github/stars/fronttheme/zoomora?style=for-the-badge&logo=github&color=yellow)](https://github.com/fronttheme/zoomora/stargazers)

**[Demo](https://fronttheme.github.io/zoomora/)** • **[Documentation](#-quick-start)** • **[Report Bug](https://github.com/fronttheme/zoomora/issues)** • **[Request Feature](https://github.com/fronttheme/zoomora/issues)**

</div>

## ✨ Features

- 🖼️ **Image Galleries** - Group multiple images together
- 🎥 **Video Support** - YouTube embeds and local video files (MP4, WebM, OGG)
- 🔍 **Smart Zoom** - Automatically detects if images are zoomable
- 🖱️ **Pan & Drag** - Navigate zoomed images with mouse/touch
- 🖱️ **Scroll-Wheel Zoom** - Mouse wheel and trackpad pinch zoom
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⌨️ **Keyboard Navigation** - Arrow keys, Escape, and shortcut keys
- 🎬 **Smooth Animations** - Fade and slide transition effects
- 🖼️ **Thumbnail Strip** - Quick navigation between gallery items
- 🎯 **Auto-Hide Controls** - Distraction-free viewing mode
- 🌓 **Fullscreen Mode** - Immersive viewing experience
- 🎨 **Customizable** - Extensive options, CSS custom properties, and callbacks
- ♿ **Accessible** - Keyboard and screen reader friendly
- 🚀 **Lightweight** - No dependencies required (~15KB gzipped)
- 🔧 **Easy Integration** - Works with vanilla JS, React, Vue, etc.
- 🎁 **MIT Licensed** - Free for personal and commercial use

## 📦 Installation

### NPM

```bash
npm install zoomora
```

### Yarn

```bash
yarn add zoomora
```

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zoomora/dist/zoomora.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/zoomora/dist/zoomora.umd.min.js"></script>
```

### Manual Download

Download the latest release from [GitHub Releases](https://github.com/fronttheme/zoomora/releases) and include the files in your project:

```html
<link rel="stylesheet" href="path/to/zoomora.css">
<script src="path/to/zoomora.umd.min.js"></script>
```

## 🚀 Quick Start

### Basic Usage

```html
<!-- Add data-zoomora attribute with a unique group ID -->
<img src="image-1.jpg" 
     data-src="image-1.jpg" 
     data-zoomora="my-gallery" 
     alt="Image 1">

<img src="image-2.jpg" 
     data-src="image-2.jpg" 
     data-zoomora="my-gallery" 
     alt="Image 2">

<!-- Initialize (auto-initializes if elements exist) -->
<script>
  new Zoomora();
</script>
```

### With Custom Options

```javascript
const lightbox = new Zoomora({
  selector: '[data-zoomora]',
  showCounter: true,
  showThumbnails: true,
  showFullscreen: true,
  showZoom: true,
  transition: 'fade', // 'fade' or 'slide'
  maxZoomScale: 3,
  animationDuration: 300,
  closeOnBackgroundClick: true, // v1.2.0+
  autoHideDelay: 3000,
  autoHideEnabled: false,
  onOpen: (element, index) => {
    console.log('Lightbox opened', element, index);
  },
  onClose: (index) => {
    console.log('Lightbox closed', index);
  }
});
```

## 📖 Usage Examples

### Image Gallery

```html
<div class="gallery">
  <img src="thumb-1.jpg" 
       data-src="full-1.jpg" 
       data-caption="Beautiful sunset" 
       data-zoomora="gallery-1" 
       alt="Sunset">
  
  <img src="thumb-2.jpg" 
       data-src="full-2.jpg" 
       data-caption="Mountain view" 
       data-zoomora="gallery-1" 
       alt="Mountains">
</div>
```

### Video Support

#### Local Video
```html
<img src="video-poster.jpg" 
     data-src="video.mp4" 
     data-type="video" 
     data-caption="My video" 
     data-zoomora="media-gallery" 
     alt="Video">
```

#### YouTube Video
```html
<img src="video-thumbnail.jpg" 
     data-src="https://www.youtube.com/watch?v=VIDEO_ID" 
     data-type="video" 
     data-caption="YouTube video" 
     data-zoomora="media-gallery" 
     alt="Video">
```

YouTube short URLs also work:
```html
data-src="https://youtu.be/VIDEO_ID"
```

### Single Image

```html
<img src="image.jpg" 
     data-src="image.jpg" 
     data-zoomora="single-image" 
     alt="Single image">
```

### Using with Anchor Tags

```javascript
// Initialize with href attribute instead of data-src
const lightbox = Zoomora.bind('a[data-lightbox]', {
  useHref: true
});
```

```html
<a href="full-image.jpg" data-lightbox="gallery">
  <img src="thumbnail.jpg" alt="Image">
</a>
```

### Opening Images Programmatically (v1.3.0+)

No DOM element required — open any image or set of images directly via JavaScript:

```javascript
const lightbox = new Zoomora();

// Single image
lightbox.openImage('photo.jpg');

// With caption and alt text
lightbox.openImage({ src: 'photo.jpg', caption: 'Beautiful sunset', alt: 'Sunset photo' });

// Synthetic gallery — opens at the second item
lightbox.openImage(['a.jpg', 'b.jpg', 'c.jpg'], { startIndex: 1 });

// Mixed gallery with video
lightbox.openImage([
  { src: 'photo.jpg', caption: 'A photo' },
  { src: 'https://youtu.be/VIDEO_ID', type: 'video', thumb: 'poster.jpg', caption: 'A video' },
]);
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | String | `'[data-zoomora]'` | CSS selector for lightbox triggers |
| `showCounter` | Boolean | `true` | Show image counter (1 / 5) |
| `showThumbnails` | Boolean | `true` | Show thumbnail navigation |
| `showFullscreen` | Boolean | `true` | Show fullscreen button |
| `showZoom` | Boolean | `true` | Show zoom button and enable scroll-wheel zoom |
| `transition` | String | `'fade'` | Transition effect: 'fade' or 'slide' |
| `useHref` | Boolean | `false` | Use href instead of data-src |
| `maxZoomScale` | Number | `3` | Maximum zoom scale for both click-to-cycle and scroll-wheel zoom. Set to `1` to disable zoom entirely |
| `zoomStep` | Number | `0.1` | Scale increment per mouse-wheel tick (as a fraction of `maxZoomScale`) |
| `animationDuration` | Number | `300` | Animation duration in milliseconds |
| `closeOnBackgroundClick` | Boolean | `true` | Close lightbox on background click (v1.2.0+) |
| `showAutoHideToggle` | Boolean | `true` | Show auto-hide toggle button |
| `autoHideDelay` | Number | `3000` | Delay before hiding controls (ms) |
| `autoHideEnabled` | Boolean | `false` | Enable auto-hide by default |
| `onOpen` | Function | `null` | Callback when lightbox opens |
| `onClose` | Function | `null` | Callback when lightbox closes |
| `onNext` | Function | `null` | Callback when navigating next |
| `onPrev` | Function | `null` | Callback when navigating previous |

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous image |
| `→` | Next image |
| `Esc` | Close lightbox / Exit fullscreen |
| `Z` | Toggle zoom |
| `F` | Toggle fullscreen |
| `T` | Toggle thumbnails |

## 🔧 API Methods

```javascript
const lightbox = new Zoomora();

// Navigate
lightbox.next();           // Go to next item
lightbox.prev();           // Go to previous item
lightbox.goTo(2);          // Go to specific index

// Controls
lightbox.open(element);    // Open lightbox with a DOM element
lightbox.close();          // Close lightbox
lightbox.toggleZoom();     // Toggle zoom
lightbox.toggleFullscreen(); // Toggle fullscreen
lightbox.toggleThumbnails(); // Toggle thumbnails
lightbox.toggleAutoHide(); // Toggle auto-hide controls

// Programmatic (v1.3.0+)
lightbox.openImage('photo.jpg');                           // Open single image by URL
lightbox.openImage(['a.jpg', 'b.jpg'], { startIndex: 1 }); // Open synthetic gallery
lightbox.openImage({ src, thumb, type, caption, alt });    // Open with full config
lightbox.createVirtualItem({ src, thumb, type, caption, alt }); // Create virtual item manually

// State
lightbox.isOpen();          // Check if open
lightbox.getCurrentIndex(); // Get current index
lightbox.getTotalItems();   // Get total items

// Management
lightbox.refresh();         // Refresh gallery items
lightbox.updateOptions({    // Update options
  transition: 'slide'
});
lightbox.destroy();         // Clean up and remove
```

## 🎨 Styling

Zoomora exposes four CSS custom properties so you can restyle it with plain CSS — no Sass recompilation needed:

```css
:root {
  --zoomora-overlay-bg:    rgba(0, 0, 0, 0.92);     /* lightbox backdrop */
  --zoomora-control-bg:    rgba(255, 255, 255, 0.15); /* button/nav background */
  --zoomora-control-hover: rgba(255, 255, 255, 0.25); /* button/nav hover */
  --zoomora-primary:       #ff6b6b;                   /* accent / active state colour */
}
```

For deeper customisation (fonts, thumbnail sizes, border radii) override the component classes directly:

```css
.zoomora-caption {
  font-family: 'Your Font', sans-serif;
  border-radius: 4px;
}

.zoomora-thumb.active {
  border-color: #ff6b6b;
}
```

## 📊 Stats & Performance

- **Bundle Size**: ~15KB minified + gzipped
- **Zero Dependencies**: Pure vanilla JavaScript
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Optimized**: Touch-friendly with gesture support
- **Performance**: 60fps smooth animations
- **Accessibility**: WCAG 2.1 AA compliant

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

### Recent Updates

#### v1.3.0 (Latest)
- ✨ **New**: `openImage()` API — open the lightbox programmatically without DOM elements ([#7](https://github.com/fronttheme/zoomora/issues/7))
- ✨ **New**: Scroll-wheel and trackpad-pinch zoom
- ✨ **New**: CSS custom properties for runtime theming (`--zoomora-overlay-bg`, `--zoomora-control-bg`, `--zoomora-control-hover`, `--zoomora-primary`)
- 🐛 **Fixed**: `maxZoomScale` option now actually controls the zoom ceiling
- 🐛 **Fixed**: `zoomStep` option now drives the scroll-wheel zoom increment
- 🔧 **Updated**: Vite 8, Sass 1.101

#### v1.2.1
- 🐛 **Fixed**: `showZoom`, `showFullscreen`, `showCounter`, `showThumbnails` options not hiding their respective elements

#### v1.2.0
- ✨ **New**: Background click to close lightbox
- ✨ **New**: `closeOnBackgroundClick` configuration option
- 🐛 **Fixed**: Smart click detection between media and background

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Faruk Ahmed**
- Website: [FrontTheme](https://fronttheme.com)
- Portfolio: [farukdesign.com](https://www.farukdesign.com/)
- GitHub: [@fronttheme](https://github.com/fronttheme)

## 🙏 Acknowledgments

- Inspired by modern lightbox libraries
- Built with love for the web community
- Thanks to all [contributors](https://github.com/fronttheme/zoomora/graphs/contributors)!

## 💬 Community & Support

- 🐛 [Report a bug](https://github.com/fronttheme/zoomora/issues)
- 💡 [Request a feature](https://github.com/fronttheme/zoomora/issues)
- 📖 [Read the docs](https://github.com/fronttheme/zoomora)
- ⭐ [Star on GitHub](https://github.com/fronttheme/zoomora)

## 🔗 Resources

- 🟢 [Live Demo](https://fronttheme.github.io/zoomora/)
- 📦 [NPM Package](https://www.npmjs.com/package/zoomora)
- 📚 [Documentation](https://github.com/fronttheme/zoomora)
- 💬 [Discussions](https://github.com/fronttheme/zoomora/discussions)

---

<div align="center">

Made with ❤️ by [FrontTheme](https://fronttheme.com)

**[⬆ back to top](#zoomora-lightbox)**

</div>