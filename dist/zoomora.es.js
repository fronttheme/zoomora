//#region \0rolldown/runtime.js
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
//#endregion
//#region src/styles/zoomora.scss
var init_zoomora = __esmMin((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var init_toPrimitive = __esmMin((() => {
	init_typeof();
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esmMin((() => {
	init_typeof();
	init_toPrimitive();
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
var init_defineProperty = __esmMin((() => {
	init_toPropertyKey();
}));
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var init_objectSpread2 = __esmMin((() => {
	init_defineProperty();
}));
//#endregion
//#region src/zoomora.js
var require_zoomora = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	init_zoomora();
	init_objectSpread2();
	/*!
	* Zoomora Lightbox Plugin v1.3.0
	* A modern, responsive lightbox plugin with zoom, fullscreen, and gallery features
	*
	* Copyright (c) 2026 Faruk Ahmed (FrontTheme)
	* Licensed under MIT License
	*/
	(function(global, factory) {
		"use strict";
		if (typeof module === "object" && typeof module.exports === "object") module.exports = factory();
		else if (typeof define === "function" && define.amd) define(factory);
		else global.Zoomora = factory();
	})(typeof window !== "undefined" ? window : exports, function() {
		"use strict";
		/**
		* Zoomora Lightbox Plugin
		* @class
		*/
		class Zoomora {
			/**
			* Default configuration options
			* @type {Object}
			*/
			static get defaults() {
				return {
					selector: "[data-zoomora]",
					showCounter: true,
					showThumbnails: true,
					showFullscreen: true,
					showZoom: true,
					transition: "fade",
					useHref: false,
					maxZoomScale: 3,
					zoomStep: .1,
					animationDuration: 300,
					closeOnBackgroundClick: true,
					onOpen: null,
					onClose: null,
					onNext: null,
					onPrev: null,
					showAutoHideToggle: true,
					autoHideDelay: 3e3,
					autoHideEnabled: false
				};
			}
			/**
			* Constructor
			* @param {Object} options - Configuration options
			*/
			constructor(options = {}) {
				this.options = _objectSpread2(_objectSpread2({}, Zoomora.defaults), options);
				this.currentIndex = 0;
				this.items = [];
				this.isZoomed = false;
				this.isFullscreen = false;
				this.isDragging = false;
				this.thumbnailsVisible = true;
				this.startX = 0;
				this.startY = 0;
				this.currentX = 0;
				this.currentY = 0;
				this.currentScale = 1;
				this.isInitialized = false;
				this.eventListeners = /* @__PURE__ */ new Map();
				this.autoHideEnabled = false;
				this.autoHideTimeout = null;
				this.autoHideDelay = 3e3;
				this.isControlsVisible = true;
				this.lastDragTime = 0;
				this.boundMethods = {
					handleDocumentClick: this.handleDocumentClick.bind(this),
					handleKeydown: this.handleKeydown.bind(this),
					handleFullscreenChange: this.handleFullscreenChange.bind(this),
					handleZoomoraClick: this.handleZoomoraClick.bind(this),
					handleContentClick: this.handleContentClick.bind(this),
					handleMouseDown: this.handleMouseDown.bind(this),
					handleMouseMove: this.handleMouseMove.bind(this),
					handleMouseUp: this.handleMouseUp.bind(this),
					handleTouchStart: this.handleTouchStart.bind(this),
					handleTouchMove: this.handleTouchMove.bind(this),
					handleTouchEnd: this.handleTouchEnd.bind(this),
					handleWheel: this.handleWheel.bind(this)
				};
				this.init();
			}
			/**
			* Initialize the plugin
			*/
			init() {
				if (this.isInitialized) {
					console.warn("Zoomora: Plugin already initialized");
					return;
				}
				try {
					this.createLightbox();
					this.bindEvents();
					this.isInitialized = true;
				} catch (error) {
					console.error("Zoomora: Initialization failed", error);
				}
			}
			/**
			* Static method to bind to anchor tags with href
			* @param {string} selector - CSS selector
			* @param {Object} options - Configuration options
			* @returns {Zoomora} - New Zoomora instance
			*/
			static bind(selector, options = {}) {
				return new Zoomora(_objectSpread2(_objectSpread2({}, options), {}, {
					selector,
					useHref: true
				}));
			}
			/**
			* Create lightbox HTML structure
			*/
			createLightbox() {
				if (document.getElementById("zoomoraLightbox")) {
					console.warn("Zoomora: Lightbox already exists in DOM");
					return;
				}
				const autoHideButtonHTML = this.options.showAutoHideToggle ? `
        <button class="zoomora-btn" id="zoomoraAutoHideBtn" title="Toggle Auto-Hide Controls">
          <i class="zoomorai-controls-off"></i>
        </button>
      ` : "";
				const zoomoraHTML = `
        <div class="zoomora" id="zoomoraLightbox">
          <div class="zoomora-container">
            <div class="zoomora-header" id="zoomoraHeader">
              <div class="zoomora-counter" id="zoomoraCounter" ${!this.options.showCounter ? "style=\"opacity:0;visibility:hidden;\"" : ""}>1 / 1</div>
              <div class="zoomora-controls">
                ${this.options.showThumbnails ? `
                  <button class="zoomora-btn" id="zoomoraThumbnailBtn" title="Toggle Thumbnails">
                    <i class="zoomorai-thumbnails"></i>
                  </button>
                ` : ""}
                ${autoHideButtonHTML}
                ${this.options.showZoom ? `
                  <button class="zoomora-btn" id="zoomoraZoomBtn" title="Zoom">
                    <i class="zoomorai-zoom"></i>
                  </button>
                ` : ""}
                ${this.options.showFullscreen ? `
                  <button class="zoomora-btn" id="zoomoraFullscreenBtn" title="Fullscreen">
                    <i class="zoomorai-expand"></i>
                  </button>
                  <button class="zoomora-btn" id="zoomoraCollapseBtn" title="Exit Fullscreen" style="display: none;">
                    <i class="zoomorai-collapse"></i>
                  </button>
                ` : ""}
                <button class="zoomora-btn" id="zoomoraCloseBtn" title="Close">
                  <i class="zoomorai-close"></i>
                </button>
              </div>
            </div>
    
            <div class="zoomora-content" id="zoomoraContent">
              <div class="zoomora-loading" id="zoomoraLoading"></div>
              <div class="zoomora-slides-container" id="zoomoraSlidesContainer"></div>
            </div>
    
            <button class="zoomora-nav prev" id="zoomoraPrevBtn">
              <i class="zoomorai-arrow-left"></i>
            </button>
            <button class="zoomora-nav next" id="zoomoraNextBtn">
              <i class="zoomorai-arrow-right"></i>
            </button>
    
            <div class="zoomora-caption" id="zoomoraCaption" ${!this.options.showThumbnails ? "style=\"bottom:20px;\"" : ""}></div>
            <div class="zoomora-thumbnails" id="zoomoraThumbs" ${!this.options.showThumbnails ? "style=\"display:none;\"" : ""}></div>
          </div>
        </div>
      `;
				document.body.insertAdjacentHTML("beforeend", zoomoraHTML);
				this.zoomora = document.getElementById("zoomoraLightbox");
				this.header = document.getElementById("zoomoraHeader");
				this.content = document.getElementById("zoomoraContent");
				this.slidesContainer = document.getElementById("zoomoraSlidesContainer");
				this.counter = document.getElementById("zoomoraCounter");
				this.thumbs = document.getElementById("zoomoraThumbs");
				this.loading = document.getElementById("zoomoraLoading");
				this.caption = document.getElementById("zoomoraCaption");
				this.prevBtn = document.getElementById("zoomoraPrevBtn");
				this.nextBtn = document.getElementById("zoomoraNextBtn");
				if (!this.zoomora || !this.content || !this.counter || !this.thumbs || !this.loading || !this.caption) throw new Error("Failed to create required DOM elements");
			}
			/**
			* Bind event listeners
			*/
			bindEvents() {
				this.addEventListener(document, "click", this.boundMethods.handleDocumentClick);
				this.addEventListener(document.getElementById("zoomoraCloseBtn"), "click", () => this.close());
				this.addEventListener(document.getElementById("zoomoraPrevBtn"), "click", () => this.prev());
				this.addEventListener(document.getElementById("zoomoraNextBtn"), "click", () => this.next());
				if (this.options.showZoom) this.addEventListener(document.getElementById("zoomoraZoomBtn"), "click", () => this.toggleZoom());
				if (this.options.showFullscreen) {
					this.addEventListener(document.getElementById("zoomoraFullscreenBtn"), "click", () => this.toggleFullscreen());
					this.addEventListener(document.getElementById("zoomoraCollapseBtn"), "click", () => this.exitFullscreen());
				}
				if (this.options.showThumbnails) this.addEventListener(document.getElementById("zoomoraThumbnailBtn"), "click", () => this.toggleThumbnails());
				this.addEventListener(document, "fullscreenchange", this.boundMethods.handleFullscreenChange);
				this.addEventListener(document, "webkitfullscreenchange", this.boundMethods.handleFullscreenChange);
				this.addEventListener(document, "mozfullscreenchange", this.boundMethods.handleFullscreenChange);
				this.addEventListener(document, "MSFullscreenChange", this.boundMethods.handleFullscreenChange);
				this.addEventListener(document, "keydown", this.boundMethods.handleKeydown);
				this.addEventListener(this.zoomora, "click", this.boundMethods.handleZoomoraClick);
				this.addEventListener(this.content, "click", this.boundMethods.handleContentClick);
				this.addEventListener(this.content, "mousedown", this.boundMethods.handleMouseDown);
				this.addEventListener(this.content, "mousemove", this.boundMethods.handleMouseMove);
				this.addEventListener(this.content, "mouseup", this.boundMethods.handleMouseUp);
				this.addEventListener(this.content, "mouseleave", this.boundMethods.handleMouseUp);
				this.addEventListener(this.content, "touchstart", this.boundMethods.handleTouchStart, { passive: false });
				this.addEventListener(this.content, "touchmove", this.boundMethods.handleTouchMove, { passive: false });
				this.addEventListener(this.content, "touchend", this.boundMethods.handleTouchEnd);
				if (this.options.showZoom) this.addEventListener(this.content, "wheel", this.boundMethods.handleWheel, { passive: false });
				if (this.options.showAutoHideToggle) {
					this.addEventListener(document.getElementById("zoomoraAutoHideBtn"), "click", () => this.toggleAutoHide());
					this.addEventListener(this.zoomora, "mousemove", () => this.handleUserActivity());
					this.addEventListener(this.zoomora, "touchstart", () => this.handleUserActivity());
					this.addEventListener(this.zoomora, "keydown", () => this.handleUserActivity());
				}
			}
			/**
			* Add event listener with cleanup tracking
			* @param {EventTarget} element - DOM element or document
			* @param {string} event - Event type
			* @param {Function} handler - Event handler
			* @param {Object} options - Event options
			*/
			addEventListener(element, event, handler, options = {}) {
				if (!element) return;
				element.addEventListener(event, handler, options);
				const key = `${element.constructor.name}_${event}`;
				if (!this.eventListeners.has(key)) this.eventListeners.set(key, []);
				this.eventListeners.get(key).push({
					element,
					event,
					handler,
					options
				});
			}
			/**
			* Handle document click events
			* @param {Event} e - Click event
			*/
			handleDocumentClick(e) {
				const target = e.target.closest(this.options.selector);
				if (target) {
					e.preventDefault();
					this.open(target);
				}
			}
			/**
			* Handle keyboard events
			* @param {KeyboardEvent} e - Keyboard event
			*/
			handleKeydown(e) {
				if (!this.zoomora.classList.contains("active")) return;
				switch (e.key) {
					case "Escape":
						if (this.isFullscreen) this.exitFullscreen();
						else this.close();
						break;
					case "ArrowLeft":
						this.prev();
						break;
					case "ArrowRight":
						this.next();
						break;
					case "z":
					case "Z":
						this.toggleZoom();
						break;
					case "f":
					case "F":
						this.toggleFullscreen();
						break;
					case "t":
					case "T":
						this.toggleThumbnails();
						break;
				}
			}
			/**
			* Handle fullscreen change events
			*/
			handleFullscreenChange() {
				const isInFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
				if (!isInFullscreen && this.isFullscreen) {
					this.isFullscreen = false;
					this.zoomora.classList.remove("fullscreen");
					this.updateButtons();
				} else if (isInFullscreen && !this.isFullscreen) {
					this.isFullscreen = true;
					this.zoomora.classList.add("fullscreen");
					this.updateButtons();
				}
			}
			/**
			* Handle zoomora container clicks
			* @param {Event} e - Click event
			*/
			handleZoomoraClick(e) {
				if (e.target === this.zoomora && this.options.closeOnBackgroundClick) this.close();
			}
			/**
			* Handle content clicks
			* @param {Event} e - Click event
			*/
			handleContentClick(e) {
				if (Date.now() - this.lastDragTime < 200) return;
				if (this.header && this.header.contains(e.target)) return;
				if (e.target.closest("button")) return;
				const mediaElement = e.target.closest(".zoomora-media, .zoomora-video, .zoomora-iframe");
				if (mediaElement) {
					if (mediaElement.classList.contains("zoomora-media") && !mediaElement.classList.contains("no-zoom")) this.toggleZoom();
					return;
				}
				if (e.target.closest(".zoomora-video-container")) {
					if (e.target.closest(".zoomora-play-button")) return;
					if (this.options.closeOnBackgroundClick) this.close();
					return;
				}
				const clickedElement = e.target;
				if ((clickedElement.classList.contains("zoomora-content") || clickedElement.classList.contains("zoomora-slide-container") || clickedElement.classList.contains("zoomora-slide") || clickedElement.classList.contains("zoomora-slides-container") || clickedElement.id === "zoomoraContent" || clickedElement.id === "zoomoraSlidesContainer") && this.options.closeOnBackgroundClick) {
					this.close();
					return;
				}
				if (this.options.closeOnBackgroundClick) this.close();
			}
			/**
			* Handle mouse down events
			* @param {MouseEvent} e - Mouse event
			*/
			handleMouseDown(e) {
				this.startDrag(e);
			}
			/**
			* Handle mouse move events
			* @param {MouseEvent} e - Mouse event
			*/
			handleMouseMove(e) {
				this.drag(e);
			}
			/**
			* Handle mouse up events
			*/
			handleMouseUp() {
				this.endDrag();
			}
			/**
			* Handle touch start events
			* @param {TouchEvent} e - Touch event
			*/
			handleTouchStart(e) {
				this.startDrag(e);
			}
			/**
			* Handle touch move events
			* @param {TouchEvent} e - Touch event
			*/
			handleTouchMove(e) {
				this.drag(e);
			}
			/**
			* Handle touch end events
			*/
			handleTouchEnd() {
				this.endDrag();
			}
			/**
			* Handle scroll-wheel zoom
			* @param {WheelEvent} e - Wheel event
			*/
			handleWheel(e) {
				const media = this.content.querySelector(".zoomora-media");
				if (!media || media.tagName !== "IMG") return;
				const zoomConfig = this.calculateZoomLevels(media);
				if (!zoomConfig.canZoom) return;
				e.preventDefault();
				const maxScale = zoomConfig.levels[zoomConfig.levels.length - 1];
				const step = this.options.zoomStep || .1;
				const direction = e.deltaY < 0 ? 1 : -1;
				let newScale = (this.currentScale || 1) + direction * step * maxScale;
				newScale = Math.max(1, Math.min(maxScale, newScale));
				if (newScale === this.currentScale) return;
				this.currentScale = newScale;
				this.isZoomed = newScale > 1;
				this.currentX = 0;
				this.currentY = 0;
				if (this.isZoomed) {
					media.style.transform = `scale(${newScale})`;
					media.style.cursor = "grab";
					media.classList.add("zoomed");
				} else {
					media.style.transform = "";
					media.style.cursor = "pointer";
					media.classList.remove("zoomed");
				}
				let nearestIndex = 0;
				zoomConfig.levels.forEach((level, index) => {
					if (Math.abs(level - newScale) < Math.abs(zoomConfig.levels[nearestIndex] - newScale)) nearestIndex = index;
				});
				media.dataset.zoomLevel = nearestIndex.toString();
			}
			/**
			* Get image source from element
			* @param {Element} item - DOM element
			* @returns {string} - Image source URL
			*/
			getImageSource(item) {
				const src = item.dataset.src || item.src || item.getAttribute("src");
				if ((item.dataset.type || "image") === "video" && src) return this.convertToEmbedUrl(src);
				return src;
			}
			/**
			* Convert YouTube URLs to embed format
			* @param url
			* @returns {*|string}
			*/
			convertToEmbedUrl(url) {
				if (url.includes("youtube.com/embed/")) return url;
				let videoId = null;
				let startTime = null;
				if (url.includes("youtube.com/watch")) {
					const urlParams = new URLSearchParams(url.split("?")[1]);
					videoId = urlParams.get("v");
					const t = urlParams.get("t");
					if (t) startTime = t.replace("s", "");
				} else if (url.includes("youtu.be/")) {
					const parts = url.split("/");
					const videoAndParams = parts[parts.length - 1];
					if (videoAndParams.includes("?")) {
						videoId = videoAndParams.split("?")[0];
						const t = new URLSearchParams(videoAndParams.split("?")[1]).get("t");
						if (t) startTime = t.replace("s", "");
					} else videoId = videoAndParams;
				}
				if (videoId) {
					let embedUrl = `https://www.youtube.com/embed/${videoId}`;
					const params = new URLSearchParams();
					if (startTime) params.append("start", startTime);
					params.append("rel", "0");
					params.append("modestbranding", "1");
					if (params.toString()) embedUrl += "?" + params.toString();
					return embedUrl;
				}
				return url;
			}
			/**
			* Get thumbnail source from element
			* @param {Element} item - DOM element
			* @returns {string} - Thumbnail source URL
			*/
			getThumbnailSource(item) {
				if ((item.dataset.type || "image") === "video") return item.src || item.getAttribute("src");
				return item.dataset.src || item.src || item.getAttribute("src");
			}
			/**
			* Get group identifier from element
			* @param {Element} element - DOM element
			* @returns {string} - Group identifier
			*/
			getGroup(element) {
				if (this.options.useHref) return element.dataset.lightbox || element.dataset.gallery || "default";
				return element.dataset.zoomora || "default";
			}
			/**
			* Open lightbox with specified element
			* @param {Element} element - DOM element to open
			*/
			open(element) {
				if (!element) return;
				const group = this.getGroup(element);
				let groupSelector;
				if (this.options.useHref) if (element.dataset.lightbox) groupSelector = `[data-lightbox="${group}"]`;
				else if (element.dataset.gallery) groupSelector = `[data-gallery="${group}"]`;
				else groupSelector = this.options.selector;
				else groupSelector = `[data-zoomora="${group}"]`;
				this.items = Array.from(document.querySelectorAll(groupSelector));
				this.currentIndex = Math.max(0, this.items.indexOf(element));
				this._activateLightbox();
				if (typeof this.options.onOpen === "function") this.options.onOpen(element, this.currentIndex);
			}
			/**
			* Open lightbox programmatically with image(s) not present in the DOM.
			* Accepts a single URL, an array of URLs, a config object, or an array
			* of config objects — so all of these work:
			*
			*   lightbox.openImage('photo.jpg');
			*   lightbox.openImage(['a.jpg', 'b.jpg'], { startIndex: 1 });
			*   lightbox.openImage({ src: 'photo.jpg', caption: 'Hello' });
			*   lightbox.openImage([
			*     { src: 'a.jpg', caption: 'First' },
			*     { src: 'https://youtu.be/xyz', type: 'video', thumb: 'poster.jpg' },
			*   ]);
			*
			* @param {string|string[]|Object|Object[]} images - URL(s) or config object(s)
			* @param {Object} [opts] - Options
			* @param {number} [opts.startIndex=0] - Index to open at when passing an array
			*/
			openImage(images, opts = {}) {
				const list = Array.isArray(images) ? images : [images];
				this.items = list.map((entry) => this.createVirtualItem(typeof entry === "string" ? { src: entry } : entry));
				this.currentIndex = Math.max(0, Math.min(opts.startIndex || 0, this.items.length - 1));
				this._activateLightbox();
				if (typeof this.options.onOpen === "function") this.options.onOpen(this.items[this.currentIndex], this.currentIndex);
			}
			/**
			* Create a virtual item that mimics a DOM element's interface so
			* programmatic images work through the existing render pipeline without
			* any changes to getImageSource, getThumbnailSource, updateCaption, etc.
			* @param {Object} config
			* @param {string} config.src - Full-size image/video/iframe URL
			* @param {string} [config.thumb] - Thumbnail URL (falls back to src)
			* @param {string} [config.type='image'] - 'image', 'video', or 'iframe'
			* @param {string} [config.caption=''] - Caption text
			* @param {string} [config.alt=''] - Alt text for the thumbnail img
			* @returns {Object} Virtual item
			*/
			createVirtualItem({ src, thumb, type = "image", caption = "", alt = "" }) {
				const thumbSrc = thumb || src;
				return {
					dataset: {
						src,
						type,
						caption
					},
					src: thumbSrc,
					alt,
					title: caption,
					getAttribute: (name) => name === "src" ? thumbSrc : null
				};
			}
			/**
			* Shared activation sequence used by both open() and openImage().
			* Resets state, shows the lightbox, and triggers all UI updates.
			*/
			_activateLightbox() {
				this.isZoomed = false;
				this.isFullscreen = false;
				this.thumbnailsVisible = true;
				this.currentX = 0;
				this.currentY = 0;
				this.currentScale = 1;
				this.zoomora.classList.add("active");
				document.body.style.overflow = "hidden";
				this.loadContent();
				this.updateThumbnails();
				this.updateCounter();
				this.updateNavigation();
				this.updateCaption();
				this.updateButtons();
				if (this.autoHideEnabled) this.startAutoHideTimer();
				else this.showControls();
			}
			/**
			* Close lightbox
			*/
			close() {
				if (this.isFullscreen) this.exitFullscreen();
				this.zoomora.classList.remove("active");
				document.body.style.overflow = "";
				this.isZoomed = false;
				this.isFullscreen = false;
				this.currentX = 0;
				this.currentY = 0;
				this.currentScale = 1;
				const media = this.content.querySelector(".zoomora-media");
				if (media) {
					media.classList.remove("zoomed");
					media.style.transform = "";
					media.style.cursor = "";
				}
				this.zoomora.classList.remove("fullscreen");
				this.updateButtons();
				this.stopAutoHideTimer();
				this.showControls();
				if (typeof this.options.onClose === "function") this.options.onClose(this.currentIndex);
			}
			/**
			* Navigate to previous item
			*/
			prev() {
				if (this.currentIndex > 0) {
					this.currentIndex--;
					this.loadContent();
					this.updateCounter();
					this.updateThumbnails();
					this.updateNavigation();
					this.updateCaption();
					if (typeof this.options.onPrev === "function") this.options.onPrev(this.currentIndex);
				}
			}
			/**
			* Navigate to next item
			*/
			next() {
				if (this.currentIndex < this.items.length - 1) {
					this.currentIndex++;
					this.loadContent();
					this.updateCounter();
					this.updateThumbnails();
					this.updateNavigation();
					this.updateCaption();
					if (typeof this.options.onNext === "function") this.options.onNext(this.currentIndex);
				}
			}
			/**
			* Load content for current item
			*/
			loadContent() {
				if (!this.items[this.currentIndex]) return;
				const item = this.items[this.currentIndex];
				const src = this.getImageSource(item);
				const type = item.dataset.type || "image";
				if (!src) {
					console.error("Zoomora: No source found for item");
					return;
				}
				this.isZoomed = false;
				this.currentX = 0;
				this.currentY = 0;
				this.currentScale = 1;
				this.loading.style.display = "block";
				if (this.slidesContainer) this.slidesContainer.innerHTML = "";
				setTimeout(() => {
					this.renderContent(src, type, item);
				}, 100);
			}
			/**
			* Render content based on type
			* @param {string} src - Source URL
			* @param {string} type - Content type
			* @param {Element} item - Original item element
			*/
			renderContent(src, type, item) {
				const slideContainer = document.createElement("div");
				slideContainer.className = "zoomora-slide-container";
				const slide = document.createElement("div");
				slide.className = `zoomora-slide ${this.options.transition === "slide" ? "slide-effect" : "fade-effect"}`;
				slide.style.opacity = "0";
				slide.style.transform = this.options.transition === "slide" ? "translateX(100%)" : "scale(0.8)";
				let mediaElement;
				try {
					switch (type) {
						case "video":
							if (src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")) {
								const videoContainer = document.createElement("div");
								videoContainer.className = "zoomora-video-container";
								mediaElement = document.createElement("video");
								mediaElement.src = src;
								mediaElement.className = "zoomora-video";
								mediaElement.setAttribute("preload", "metadata");
								const posterSrc = item.src || item.getAttribute("src");
								if (posterSrc) mediaElement.setAttribute("poster", posterSrc);
								const playButton = document.createElement("div");
								playButton.className = "zoomora-play-button";
								playButton.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
								playButton.addEventListener("click", () => {
									mediaElement.play();
									playButton.style.display = "none";
									mediaElement.setAttribute("controls", "");
								});
								mediaElement.addEventListener("ended", () => {
									playButton.style.display = "flex";
								});
								videoContainer.appendChild(mediaElement);
								videoContainer.appendChild(playButton);
								slideContainer.appendChild(videoContainer);
							} else {
								mediaElement = document.createElement("iframe");
								mediaElement.src = src;
								mediaElement.className = "zoomora-video";
								mediaElement.setAttribute("allowfullscreen", "");
								mediaElement.setAttribute("frameborder", "0");
								slideContainer.appendChild(mediaElement);
							}
							break;
						case "iframe":
							mediaElement = document.createElement("iframe");
							mediaElement.src = src;
							mediaElement.className = "zoomora-iframe";
							mediaElement.setAttribute("frameborder", "0");
							slideContainer.appendChild(mediaElement);
							break;
						default:
							mediaElement = document.createElement("img");
							mediaElement.src = src;
							mediaElement.className = "zoomora-media";
							mediaElement.alt = item.alt || item.title || "";
							mediaElement.onload = () => {
								this.loading.style.display = "none";
								this.checkZoomability(mediaElement);
								this.animateSlideIn(slide);
							};
							mediaElement.onerror = () => {
								this.loading.style.display = "none";
								console.error("Zoomora: Failed to load image:", src);
								this.animateSlideIn(slide);
							};
							slideContainer.appendChild(mediaElement);
					}
					slide.appendChild(slideContainer);
					this.slidesContainer.innerHTML = "";
					this.slidesContainer.appendChild(slide);
					if (type !== "image") {
						this.loading.style.display = "none";
						this.animateSlideIn(slide);
					}
				} catch (error) {
					console.error("Zoomora: Error rendering content:", error);
					this.loading.style.display = "none";
				}
			}
			animateSlideIn(slide) {
				slide.offsetHeight;
				slide.classList.add("active");
				if (this.options.transition === "slide") {
					slide.style.transition = `transform ${this.options.animationDuration}ms ease, opacity ${this.options.animationDuration}ms ease`;
					slide.style.transform = "translateX(0)";
					slide.style.opacity = "1";
				} else {
					slide.style.transition = `transform ${this.options.animationDuration}ms ease, opacity ${this.options.animationDuration}ms ease`;
					slide.style.transform = "scale(1)";
					slide.style.opacity = "1";
				}
			}
			toggleAutoHide() {
				this.autoHideEnabled = !this.autoHideEnabled;
				const autoHideBtn = document.getElementById("zoomoraAutoHideBtn");
				if (this.autoHideEnabled) {
					autoHideBtn.classList.add("active");
					autoHideBtn.title = "Disable Auto-Hide Controls";
					this.startAutoHideTimer();
				} else {
					autoHideBtn.classList.remove("active");
					autoHideBtn.title = "Enable Auto-Hide Controls";
					this.stopAutoHideTimer();
					this.showControls();
				}
			}
			handleUserActivity() {
				if (!this.autoHideEnabled) return;
				this.showControls();
				this.startAutoHideTimer();
			}
			startAutoHideTimer() {
				this.stopAutoHideTimer();
				this.autoHideTimeout = setTimeout(() => {
					this.hideControls();
				}, this.options.autoHideDelay);
			}
			stopAutoHideTimer() {
				if (this.autoHideTimeout) {
					clearTimeout(this.autoHideTimeout);
					this.autoHideTimeout = null;
				}
			}
			showControls() {
				if (this.isControlsVisible) return;
				this.isControlsVisible = true;
				this.zoomora.classList.remove("controls-hidden");
				if (this.header) {
					this.header.style.transform = "translateY(0)";
					this.header.style.opacity = "1";
				}
				if (this.caption) {
					this.caption.style.transform = "translateX(-50%) translateY(0)";
					this.caption.style.opacity = "1";
				}
				if (this.thumbs) {
					this.thumbs.style.transform = "translateX(-50%) translateY(0)";
					this.thumbs.style.opacity = "1";
				}
				if (this.prevBtn) {
					this.prevBtn.style.transform = "translateX(0)";
					this.prevBtn.style.opacity = "1";
				}
				if (this.nextBtn) {
					this.nextBtn.style.transform = "translateX(0)";
					this.nextBtn.style.opacity = "1";
				}
			}
			hideControls() {
				if (!this.isControlsVisible) return;
				this.isControlsVisible = false;
				this.zoomora.classList.add("controls-hidden");
				if (this.header) {
					this.header.style.transform = "translateY(-100%)";
					this.header.style.opacity = "0";
				}
				if (this.caption) {
					this.caption.style.transform = "translateX(-50%) translateY(100%)";
					this.caption.style.opacity = "0";
				}
				if (this.thumbs) {
					this.thumbs.style.transform = "translateX(-50%) translateY(100%)";
					this.thumbs.style.opacity = "0";
				}
				if (this.prevBtn) {
					this.prevBtn.style.transform = "translateX(-100%)";
					this.prevBtn.style.opacity = "0";
				}
				if (this.nextBtn) {
					this.nextBtn.style.transform = "translateX(100%)";
					this.nextBtn.style.opacity = "0";
				}
			}
			/**
			* Check if image can be zoomed
			* @param {HTMLImageElement} img - Image element
			*/
			checkZoomability(img) {
				if (!img || !img.naturalWidth || !img.naturalHeight) return;
				const imgRect = img.getBoundingClientRect();
				const renderedWidth = imgRect.width;
				const renderedHeight = imgRect.height;
				const naturalWidth = img.naturalWidth;
				const naturalHeight = img.naturalHeight;
				const isScaledDown = naturalWidth > renderedWidth || naturalHeight > renderedHeight;
				const zoomRatioX = naturalWidth / renderedWidth;
				const zoomRatioY = naturalHeight / renderedHeight;
				const maxZoomRatio = Math.max(zoomRatioX, zoomRatioY);
				img.dataset.zoomRatio = maxZoomRatio.toString();
				img.dataset.naturalWidth = naturalWidth.toString();
				img.dataset.naturalHeight = naturalHeight.toString();
				img.dataset.renderedWidth = renderedWidth.toString();
				img.dataset.renderedHeight = renderedHeight.toString();
				if (isScaledDown && maxZoomRatio > 1.1) img.classList.remove("no-zoom");
				else img.classList.add("no-zoom");
			}
			/**
			* Calculate zoom levels for an image
			* @param {HTMLImageElement} img - Image element
			* @returns {Object} Zoom configuration
			*/
			calculateZoomLevels(img) {
				if (!img || !img.naturalWidth || !img.naturalHeight) return {
					canZoom: false,
					levels: [],
					currentLevel: 0
				};
				const container = this.content.getBoundingClientRect();
				const containerWidth = container.width;
				const containerHeight = container.height;
				const naturalWidth = img.naturalWidth;
				const naturalHeight = img.naturalHeight;
				const scaleToFitWidth = containerWidth / naturalWidth;
				const scaleToFitHeight = containerHeight / naturalHeight;
				const fitScale = Math.min(scaleToFitWidth, scaleToFitHeight);
				if (fitScale >= .95) return {
					canZoom: false,
					levels: [],
					currentLevel: 0
				};
				const configuredMax = Number(this.options.maxZoomScale);
				const maxZoom = Number.isFinite(configuredMax) && configuredMax > 0 ? Math.max(1, configuredMax) : 3;
				const levels = [1];
				[
					1.5,
					2,
					3,
					4,
					5
				].forEach((candidate) => {
					if (candidate <= maxZoom && fitScale * candidate <= 1) levels.push(candidate);
				});
				const actualSizeScale = Math.min(1 / fitScale, maxZoom);
				if (actualSizeScale > levels[levels.length - 1]) levels.push(actualSizeScale);
				return {
					canZoom: levels.length > 1,
					levels,
					currentLevel: 0,
					baseScale: fitScale,
					naturalWidth,
					naturalHeight
				};
			}
			/**
			* Update counter display
			*/
			updateCounter() {
				if (this.options.showCounter && this.counter) this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
			}
			/**
			* Update caption display
			*/
			updateCaption() {
				if (!this.caption || !this.items[this.currentIndex]) return;
				const item = this.items[this.currentIndex];
				const caption = item.dataset.caption || item.title || "";
				if (caption) {
					this.caption.textContent = caption;
					this.caption.style.transform = "translateX(-50%) translateY(0)";
					this.caption.style.opacity = "1";
					this.caption.style.pointerEvents = "auto";
					this.caption.style.transition = "opacity 0.3s ease, transform 0.3s ease";
				} else {
					this.caption.style.transform = "translateX(-50%) translateY(100%)";
					this.caption.style.opacity = "0";
					this.caption.style.pointerEvents = "none";
					this.caption.style.transition = "opacity 0.3s ease, transform 0.3s ease";
				}
			}
			/**
			* Update thumbnails display
			*/
			updateThumbnails() {
				if (!this.options.showThumbnails || !this.thumbs) return;
				if (this.items.length === 1) {
					this.caption.classList.add("single-item-thumbnail");
					this.thumbs.style.display = "none";
					return;
				}
				this.caption.classList.remove("single-item-thumbnail");
				this.thumbs.style.display = "flex";
				this.thumbs.innerHTML = "";
				this.items.forEach((item, index) => {
					const thumb = document.createElement("div");
					thumb.className = "zoomora-thumb";
					if (index === this.currentIndex) thumb.classList.add("active");
					const img = document.createElement("img");
					const thumbSrc = this.getThumbnailSource(item);
					if (thumbSrc) {
						img.src = thumbSrc;
						img.alt = item.alt || item.title || "";
						img.onerror = () => {
							thumb.style.display = "none";
						};
					}
					thumb.appendChild(img);
					thumb.addEventListener("click", () => {
						this.currentIndex = index;
						this.loadContent();
						this.updateCounter();
						this.updateThumbnails();
						this.updateNavigation();
						this.updateCaption();
					});
					this.thumbs.appendChild(thumb);
				});
			}
			/**
			* Update navigation buttons
			*/
			updateNavigation() {
				const prevBtn = document.getElementById("zoomoraPrevBtn");
				const nextBtn = document.getElementById("zoomoraNextBtn");
				if (prevBtn) prevBtn.style.display = this.currentIndex > 0 ? "flex" : "none";
				if (nextBtn) nextBtn.style.display = this.currentIndex < this.items.length - 1 ? "flex" : "none";
			}
			/**
			* Update control buttons
			*/
			updateButtons() {
				const fullscreenBtn = document.getElementById("zoomoraFullscreenBtn");
				const collapseBtn = document.getElementById("zoomoraCollapseBtn");
				if (fullscreenBtn && collapseBtn) if (this.isFullscreen) {
					fullscreenBtn.style.display = "none";
					collapseBtn.style.display = "flex";
				} else {
					fullscreenBtn.style.display = "flex";
					collapseBtn.style.display = "none";
				}
			}
			/**
			* Toggle zoom state
			*/
			toggleZoom() {
				const media = this.content.querySelector(".zoomora-media");
				if (!media || media.tagName !== "IMG") return;
				const zoomConfig = this.calculateZoomLevels(media);
				if (!zoomConfig.canZoom) return;
				if (!media.dataset.zoomLevel) media.dataset.zoomLevel = "0";
				let currentLevel = parseInt(media.dataset.zoomLevel) || 0;
				currentLevel++;
				if (currentLevel >= zoomConfig.levels.length) currentLevel = 0;
				const targetScale = zoomConfig.levels[currentLevel];
				media.dataset.zoomLevel = currentLevel.toString();
				if (currentLevel === 0) {
					this.isZoomed = false;
					this.isDragging = false;
					media.classList.remove("dragging");
					media.style.transform = "";
					media.style.cursor = "pointer";
					media.classList.remove("zoomed");
					this.currentX = 0;
					this.currentY = 0;
					this.currentScale = 1;
				} else {
					this.isZoomed = true;
					this.currentScale = targetScale;
					this.currentX = 0;
					this.currentY = 0;
					media.style.transform = `translate(0px, 0px) scale(${targetScale})`;
					media.style.cursor = "grab";
					media.classList.add("zoomed");
				}
			}
			/**
			* Toggle fullscreen mode
			*/
			toggleFullscreen() {
				if (!this.isFullscreen) this.enterFullscreen();
				else this.exitFullscreen();
			}
			/**
			* Enter fullscreen mode
			*/
			enterFullscreen() {
				const element = this.zoomora;
				try {
					if (element.requestFullscreen) element.requestFullscreen().then(() => {
						this.isFullscreen = true;
						this.zoomora.classList.add("fullscreen");
						this.updateButtons();
					}).catch((err) => {
						console.warn("Zoomora: Fullscreen request failed:", err.message);
						this.fallbackFullscreen();
					});
					else if (element.webkitRequestFullscreen) {
						element.webkitRequestFullscreen();
						this.isFullscreen = true;
						this.zoomora.classList.add("fullscreen");
						this.updateButtons();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
						this.isFullscreen = true;
						this.zoomora.classList.add("fullscreen");
						this.updateButtons();
					} else if (element.msRequestFullscreen) {
						element.msRequestFullscreen();
						this.isFullscreen = true;
						this.zoomora.classList.add("fullscreen");
						this.updateButtons();
					} else {
						console.warn("Zoomora: Fullscreen API not supported, using CSS fallback");
						this.fallbackFullscreen();
					}
				} catch (error) {
					console.error("Zoomora: Error entering fullscreen:", error);
					this.fallbackFullscreen();
				}
			}
			/**
			* Exit fullscreen mode
			*/
			exitFullscreen() {
				if (!!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
					this.fallbackExitFullscreen();
					return;
				}
				try {
					if (document.exitFullscreen) document.exitFullscreen().then(() => {
						this.isFullscreen = false;
						this.zoomora.classList.remove("fullscreen");
						this.updateButtons();
					}).catch((err) => {
						console.warn("Zoomora: Exit fullscreen failed:", err.message);
						this.fallbackExitFullscreen();
					});
					else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
						this.isFullscreen = false;
						this.zoomora.classList.remove("fullscreen");
						this.updateButtons();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
						this.isFullscreen = false;
						this.zoomora.classList.remove("fullscreen");
						this.updateButtons();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
						this.isFullscreen = false;
						this.zoomora.classList.remove("fullscreen");
						this.updateButtons();
					} else this.fallbackExitFullscreen();
				} catch (error) {
					console.error("Zoomora: Error exiting fullscreen:", error);
					this.fallbackExitFullscreen();
				}
			}
			/**
			* Fallback fullscreen using CSS
			*/
			fallbackFullscreen() {
				this.isFullscreen = true;
				this.zoomora.classList.add("fullscreen");
				this.updateButtons();
			}
			/**
			* Exit CSS fullscreen
			*/
			fallbackExitFullscreen() {
				this.isFullscreen = false;
				this.zoomora.classList.remove("fullscreen");
				this.updateButtons();
			}
			/**
			* Toggle thumbnails visibility
			*/
			toggleThumbnails() {
				if (this.items.length === 1) return;
				this.thumbnailsVisible = !this.thumbnailsVisible;
				if (this.thumbs) {
					this.thumbs.classList.toggle("thumbs-hidden", !this.thumbnailsVisible);
					if (!this.caption || !this.items[this.currentIndex]) return;
					const item = this.items[this.currentIndex];
					if ((item.dataset.caption || item.title || "") && this.thumbs.classList.contains("thumbs-hidden")) {
						this.caption.style.bottom = "20px";
						this.caption.style.transition = "bottom 0.3s ease, transform 0.3s ease";
					} else this.caption.style.bottom = "120px";
				}
			}
			/**
			* Start drag operation
			* @param {Event} e - Mouse or touch event
			*/
			startDrag(e) {
				const media = this.content.querySelector(".zoomora-media");
				if (!media || !this.isZoomed) return;
				this.isDragging = true;
				media.classList.add("dragging");
				media.style.cursor = "grabbing";
				this.startX = e.clientX || e.touches && e.touches[0].clientX || 0;
				this.startY = e.clientY || e.touches && e.touches[0].clientY || 0;
				const transform = window.getComputedStyle(media).transform;
				if (transform && transform !== "none") {
					const matrix = new DOMMatrix(transform);
					this.currentX = matrix.m41;
					this.currentY = matrix.m42;
				} else {
					this.currentX = 0;
					this.currentY = 0;
				}
				e.preventDefault();
			}
			/**
			* Handle drag movement
			* @param {Event} e - Mouse or touch event
			*/
			drag(e) {
				if (!this.isDragging) return;
				e.preventDefault();
				const media = this.content.querySelector(".zoomora-media");
				if (!media) return;
				const clientX = e.clientX || e.touches && e.touches[0].clientX || 0;
				const clientY = e.clientY || e.touches && e.touches[0].clientY || 0;
				const deltaX = clientX - this.startX;
				const deltaY = clientY - this.startY;
				let newX = this.currentX + deltaX;
				let newY = this.currentY + deltaY;
				const container = this.content.getBoundingClientRect();
				const mediaRect = media.getBoundingClientRect();
				const overflowX = Math.max(0, (mediaRect.width - container.width) / 2);
				const overflowY = Math.max(0, (mediaRect.height - container.height) / 2);
				if (overflowX > 0) newX = Math.max(-overflowX, Math.min(overflowX, newX));
				else newX = 0;
				if (overflowY > 0) newY = Math.max(-overflowY, Math.min(overflowY, newY));
				else newY = 0;
				media.style.transform = `translate(${newX}px, ${newY}px) scale(${this.currentScale})`;
				this.startX = clientX;
				this.startY = clientY;
				this.currentX = newX;
				this.currentY = newY;
			}
			/**
			* End drag operation
			*/
			endDrag() {
				if (!this.isDragging) return;
				this.isDragging = false;
				this.lastDragTime = Date.now();
				const media = this.content.querySelector(".zoomora-media");
				if (media) {
					media.classList.remove("dragging");
					if (this.isZoomed) media.style.cursor = "grab";
				}
			}
			/**
			* Go to specific item by index
			* @param {number} index - Item index
			*/
			goTo(index) {
				if (index < 0 || index >= this.items.length) return;
				this.currentIndex = index;
				this.loadContent();
				this.updateCounter();
				this.updateThumbnails();
				this.updateNavigation();
				this.updateCaption();
			}
			/**
			* Get current item index
			* @returns {number} - Current index
			*/
			getCurrentIndex() {
				return this.currentIndex;
			}
			/**
			* Get total number of items
			* @returns {number} - Total items
			*/
			getTotalItems() {
				return this.items.length;
			}
			/**
			* Check if lightbox is open
			* @returns {boolean} - True if open
			*/
			isOpen() {
				return this.zoomora && this.zoomora.classList.contains("active");
			}
			/**
			* Update options
			* @param {Object} newOptions - New options to merge
			*/
			updateOptions(newOptions) {
				this.options = _objectSpread2(_objectSpread2({}, this.options), newOptions);
			}
			/**
			* Refresh the lightbox (re-scan for items)
			*/
			refresh() {
				if (this.isOpen()) {
					const currentItem = this.items[this.currentIndex];
					if (currentItem) this.open(currentItem);
				}
			}
			/**
			* Destroy the lightbox instance
			*/
			destroy() {
				if (!this.isInitialized) return;
				if (this.isOpen()) this.close();
				this.stopAutoHideTimer();
				this.eventListeners.forEach((listeners, _key) => {
					listeners.forEach(({ element, event, handler, options }) => {
						if (element && element.removeEventListener) element.removeEventListener(event, handler, options);
					});
				});
				this.eventListeners.clear();
				if (this.zoomora && this.zoomora.parentNode) this.zoomora.parentNode.removeChild(this.zoomora);
				this.isInitialized = false;
				this.items = [];
				this.currentIndex = 0;
				this.zoomora = null;
				this.content = null;
				this.counter = null;
				this.thumbs = null;
				this.loading = null;
				this.caption = null;
			}
		}
		return Zoomora;
	});
}));
//#endregion
export default require_zoomora();

//# sourceMappingURL=zoomora.es.js.map