var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_zoomora_es = __commonJS({
  "zoomora.es.js"(exports, module) {
    /*!
     * Zoomora Lightbox Plugin v1.1.0
     * A modern, responsive lightbox plugin with zoom, fullscreen, and gallery features
     *
     * Copyright (c) 2025 Faruk Ahmed (FrontTheme)
     * Licensed under MIT License
     */
    (function(global, factory) {
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        global.Zoomora = factory();
      }
    })(typeof window !== "undefined" ? window : void 0, function() {
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
            // 'fade' or 'slide'
            useHref: false,
            // Use href instead of data-src
            maxZoomScale: 3,
            // Maximum zoom scale
            zoomStep: 0.1,
            // Zoom step for scroll wheel
            animationDuration: 300,
            // Animation duration in ms
            onOpen: null,
            // Callback when lightbox opens
            onClose: null,
            // Callback when lightbox closes
            onNext: null,
            // Callback when navigating to next item
            onPrev: null,
            // Callback when navigating to previous item
            // Auto-hide controls
            showAutoHideToggle: true,
            // Show auto-hide toggle button
            autoHideDelay: 3e3,
            // Delay in ms before hiding controls
            autoHideEnabled: false
            // Default state of auto-hide
          };
        }
        /**
         * Constructor
         * @param {Object} options - Configuration options
         */
        constructor(options = {}) {
          this.options = __spreadValues(__spreadValues({}, Zoomora.defaults), options);
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
          this.idleTimer = null;
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
            handleTouchEnd: this.handleTouchEnd.bind(this)
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
          const enhancedOptions = __spreadProps(__spreadValues({}, options), {
            selector,
            useHref: true
          });
          return new Zoomora(enhancedOptions);
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
              <div class="zoomora-counter" id="zoomoraCounter">1 / 1</div>
              <div class="zoomora-controls">
                <button class="zoomora-btn" id="zoomoraThumbnailBtn" title="Toggle Thumbnails">
                  <i class="zoomorai-thumbnails"></i>
                </button>
                ${autoHideButtonHTML}
                <button class="zoomora-btn" id="zoomoraZoomBtn" title="Zoom">
                  <i class="zoomorai-zoom"></i>
                </button>
                <button class="zoomora-btn" id="zoomoraFullscreenBtn" title="Fullscreen">
                  <i class="zoomorai-expand"></i>
                </button>
                <button class="zoomora-btn" id="zoomoraCollapseBtn" title="Exit Fullscreen" style="display: none;">
                  <i class="zoomorai-collapse"></i>
                </button>
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
    
            <div class="zoomora-caption" id="zoomoraCaption"></div>
            <div class="zoomora-thumbnails" id="zoomoraThumbs"></div>
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
          if (!this.zoomora || !this.content || !this.counter || !this.thumbs || !this.loading || !this.caption) {
            throw new Error("Failed to create required DOM elements");
          }
        }
        /**
         * Bind event listeners
         */
        bindEvents() {
          this.addEventListener(document, "click", this.boundMethods.handleDocumentClick);
          this.addEventListener(document.getElementById("zoomoraCloseBtn"), "click", () => this.close());
          this.addEventListener(document.getElementById("zoomoraPrevBtn"), "click", () => this.prev());
          this.addEventListener(document.getElementById("zoomoraNextBtn"), "click", () => this.next());
          this.addEventListener(document.getElementById("zoomoraZoomBtn"), "click", () => this.toggleZoom());
          this.addEventListener(document.getElementById("zoomoraFullscreenBtn"), "click", () => this.toggleFullscreen());
          this.addEventListener(document.getElementById("zoomoraCollapseBtn"), "click", () => this.exitFullscreen());
          this.addEventListener(document.getElementById("zoomoraThumbnailBtn"), "click", () => this.toggleThumbnails());
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
          if (this.options.showAutoHideToggle) {
            this.addEventListener(document.getElementById("zoomoraAutoHideBtn"), "click", () => this.toggleAutoHide());
            this.addEventListener(this.zoomora, "mousemove", () => this.handleUserActivity());
            this.addEventListener(this.zoomora, "touchstart", () => this.handleUserActivity());
            this.addEventListener(this.zoomora, "keydown", () => this.handleUserActivity());
          }
        }
        /**
         * Add event listener with cleanup tracking
         * @param {Element} element - DOM element
         * @param {string} event - Event type
         * @param {Function} handler - Event handler
         * @param {Object} options - Event options
         */
        addEventListener(element, event, handler, options = {}) {
          if (!element) return;
          element.addEventListener(event, handler, options);
          const key = `${element.constructor.name}_${event}`;
          if (!this.eventListeners.has(key)) {
            this.eventListeners.set(key, []);
          }
          this.eventListeners.get(key).push({ element, event, handler, options });
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
              if (this.isFullscreen) {
                this.exitFullscreen();
              } else {
                this.close();
              }
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
          const isInFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
          if (!isInFullscreen && this.isFullscreen) {
            this.isFullscreen = false;
            this.zoomora.classList.remove("fullscreen");
            this.updateButtons();
          }
        }
        /**
         * Handle zoomora container clicks
         * @param {Event} e - Click event
         */
        handleZoomoraClick(e) {
          if (e.target === this.zoomora) {
            this.close();
          }
        }
        /**
         * Handle content clicks
         * @param {Event} e - Click event
         */
        handleContentClick(e) {
          if (Date.now() - this.lastDragTime < 200) {
            return;
          }
          const media = e.target.closest(".zoomora-media");
          if (media && !media.classList.contains("no-zoom")) {
            this.toggleZoom();
          }
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
         * Get image source from element
         * @param {Element} item - DOM element
         * @returns {string} - Image source URL
         */
        getImageSource(item) {
          const src = item.dataset.src || item.src || item.getAttribute("src");
          const type = item.dataset.type || "image";
          if (type === "video" && src) {
            return this.convertToEmbedUrl(src);
          }
          return src;
        }
        /**
         * Convert YouTube URLs to embed format
         * @param url
         * @returns {*|string}
         */
        convertToEmbedUrl(url) {
          if (url.includes("youtube.com/embed/")) {
            return url;
          }
          let videoId = null;
          let startTime = null;
          if (url.includes("youtube.com/watch")) {
            const urlParams = new URLSearchParams(url.split("?")[1]);
            videoId = urlParams.get("v");
            const t = urlParams.get("t");
            if (t) {
              startTime = t.replace("s", "");
            }
          } else if (url.includes("youtu.be/")) {
            const parts = url.split("/");
            const videoAndParams = parts[parts.length - 1];
            if (videoAndParams.includes("?")) {
              videoId = videoAndParams.split("?")[0];
              const urlParams = new URLSearchParams(videoAndParams.split("?")[1]);
              const t = urlParams.get("t");
              if (t) startTime = t.replace("s", "");
            } else {
              videoId = videoAndParams;
            }
          }
          if (videoId) {
            let embedUrl = `https://www.youtube.com/embed/${videoId}`;
            const params = new URLSearchParams();
            if (startTime) {
              params.append("start", startTime);
            }
            params.append("rel", "0");
            params.append("modestbranding", "1");
            if (params.toString()) {
              embedUrl += "?" + params.toString();
            }
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
          const type = item.dataset.type || "image";
          if (type === "video") {
            return item.src || item.getAttribute("src");
          }
          return item.dataset.src || item.src || item.getAttribute("src");
        }
        /**
         * Get group identifier from element
         * @param {Element} element - DOM element
         * @returns {string} - Group identifier
         */
        getGroup(element) {
          if (this.options.useHref) {
            return element.dataset.lightbox || element.dataset.gallery || "default";
          }
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
          if (this.options.useHref) {
            if (element.dataset.lightbox) {
              groupSelector = `[data-lightbox="${group}"]`;
            } else if (element.dataset.gallery) {
              groupSelector = `[data-gallery="${group}"]`;
            } else {
              groupSelector = this.options.selector;
            }
          } else {
            groupSelector = `[data-zoomora="${group}"]`;
          }
          this.items = Array.from(document.querySelectorAll(groupSelector));
          this.currentIndex = Math.max(0, this.items.indexOf(element));
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
          if (this.autoHideEnabled) {
            this.startAutoHideTimer();
          } else {
            this.showControls();
          }
          if (typeof this.options.onOpen === "function") {
            this.options.onOpen(element, this.currentIndex);
          }
        }
        /**
         * Close lightbox
         */
        close() {
          if (this.isFullscreen) {
            this.exitFullscreen();
          }
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
          if (typeof this.options.onClose === "function") {
            this.options.onClose(this.currentIndex);
          }
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
            if (typeof this.options.onPrev === "function") {
              this.options.onPrev(this.currentIndex);
            }
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
            if (typeof this.options.onNext === "function") {
              this.options.onNext(this.currentIndex);
            }
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
          if (this.slidesContainer) {
            this.slidesContainer.innerHTML = "";
          }
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
                  if (posterSrc) {
                    mediaElement.setAttribute("poster", posterSrc);
                  }
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
        // Animation helper
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
        // Toggle auto-hide controls
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
        // Handle user activity
        handleUserActivity() {
          if (!this.autoHideEnabled) return;
          this.showControls();
          this.startAutoHideTimer();
        }
        // Start auto-hide timer
        startAutoHideTimer() {
          this.stopAutoHideTimer();
          this.autoHideTimeout = setTimeout(() => {
            this.hideControls();
          }, this.options.autoHideDelay);
        }
        // Stop auto-hide timer
        stopAutoHideTimer() {
          if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
            this.autoHideTimeout = null;
          }
        }
        // Show controls
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
        // Hide controls
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
          img.dataset.zoomRatio = maxZoomRatio;
          img.dataset.naturalWidth = naturalWidth;
          img.dataset.naturalHeight = naturalHeight;
          img.dataset.renderedWidth = renderedWidth;
          img.dataset.renderedHeight = renderedHeight;
          if (isScaledDown && maxZoomRatio > 1.1) {
            img.classList.remove("no-zoom");
          } else {
            img.classList.add("no-zoom");
          }
        }
        /**
         * Calculate zoom levels for an image
         * @param {HTMLImageElement} img - Image element
         * @returns {Object} Zoom configuration
         */
        /**
         * Calculate zoom levels for an image
         * @param {HTMLImageElement} img - Image element
         * @returns {Object} Zoom configuration
         */
        calculateZoomLevels(img) {
          if (!img || !img.naturalWidth || !img.naturalHeight) {
            return { canZoom: false, levels: [], currentLevel: 0 };
          }
          const container = this.content.getBoundingClientRect();
          const containerWidth = container.width;
          const containerHeight = container.height;
          const naturalWidth = img.naturalWidth;
          const naturalHeight = img.naturalHeight;
          const scaleToFitWidth = containerWidth / naturalWidth;
          const scaleToFitHeight = containerHeight / naturalHeight;
          const fitScale = Math.min(scaleToFitWidth, scaleToFitHeight);
          if (fitScale >= 0.95) {
            return { canZoom: false, levels: [], currentLevel: 0 };
          }
          const levels = [1];
          if (fitScale * 1.5 <= 1) levels.push(1.5);
          if (fitScale * 2 <= 1) levels.push(2);
          if (fitScale * 3 <= 1) levels.push(3);
          const actualSizeScale = 1 / fitScale;
          if (actualSizeScale > levels[levels.length - 1]) {
            levels.push(actualSizeScale);
          }
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
          if (this.options.showCounter && this.counter) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
          }
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
          if (prevBtn) {
            prevBtn.style.display = this.currentIndex > 0 ? "flex" : "none";
          }
          if (nextBtn) {
            nextBtn.style.display = this.currentIndex < this.items.length - 1 ? "flex" : "none";
          }
        }
        /**
         * Update control buttons
         */
        updateButtons() {
          const fullscreenBtn = document.getElementById("zoomoraFullscreenBtn");
          const collapseBtn = document.getElementById("zoomoraCollapseBtn");
          if (fullscreenBtn && collapseBtn) {
            if (this.isFullscreen) {
              fullscreenBtn.style.display = "none";
              collapseBtn.style.display = "flex";
            } else {
              fullscreenBtn.style.display = "flex";
              collapseBtn.style.display = "none";
            }
          }
        }
        /**
         * Toggle zoom state
         */
        toggleZoom() {
          const media = this.content.querySelector(".zoomora-media");
          if (!media || media.tagName !== "IMG") return;
          const zoomConfig = this.calculateZoomLevels(media);
          if (!zoomConfig.canZoom) {
            console.log("Image cannot be zoomed (already at full size or larger)");
            return;
          }
          if (!media.dataset.zoomLevel) {
            media.dataset.zoomLevel = "0";
          }
          let currentLevel = parseInt(media.dataset.zoomLevel) || 0;
          currentLevel++;
          if (currentLevel >= zoomConfig.levels.length) {
            currentLevel = 0;
          }
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
            console.log(`Zoomed to level ${currentLevel}/${zoomConfig.levels.length - 1} (${(targetScale * 100).toFixed(0)}%)`);
          }
        }
        /**
         * Update image transform based on current state
         * @param {HTMLElement} media - Media element
         */
        updateImageTransform(media) {
          if (!media) return;
          if (this.currentScale === 1) {
            media.style.transform = "";
          } else {
            const translateX = this.currentX / this.currentScale;
            const translateY = this.currentY / this.currentScale;
            media.style.transform = `scale(${this.currentScale}) translate(${translateX}px, ${translateY}px)`;
          }
        }
        /**
         * Toggle fullscreen mode
         */
        toggleFullscreen() {
          if (!this.isFullscreen) {
            this.enterFullscreen();
          } else {
            this.exitFullscreen();
          }
        }
        /**
         * Enter fullscreen mode
         */
        enterFullscreen() {
          const element = this.zoomora;
          const requestFullscreen = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen;
          if (requestFullscreen) {
            requestFullscreen.call(element).then(() => {
              this.isFullscreen = true;
              this.zoomora.classList.add("fullscreen");
              this.updateButtons();
            }).catch((err) => {
              console.warn("Zoomora: Could not enter fullscreen:", err);
              this.fallbackFullscreen();
            });
          } else {
            this.fallbackFullscreen();
          }
        }
        /**
         * Exit fullscreen mode
         */
        exitFullscreen() {
          const isInFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
          if (isInFullscreen) {
            const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
            if (exitFullscreen) {
              exitFullscreen.call(document).then(() => {
                this.isFullscreen = false;
                this.zoomora.classList.remove("fullscreen");
                this.updateButtons();
              }).catch((err) => {
                console.warn("Zoomora: Could not exit fullscreen:", err);
                this.fallbackExitFullscreen();
              });
            } else {
              this.fallbackExitFullscreen();
            }
          } else {
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
            const caption = item.dataset.caption || item.title || "";
            if (caption && this.thumbs.classList.contains("thumbs-hidden")) {
              this.caption.style.bottom = "20px";
              this.caption.style.transition = "bottom 0.3s ease, transform 0.3s ease";
            } else {
              this.caption.style.bottom = "120px";
            }
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
          if (overflowX > 0) {
            newX = Math.max(-overflowX, Math.min(overflowX, newX));
          } else {
            newX = 0;
          }
          if (overflowY > 0) {
            newY = Math.max(-overflowY, Math.min(overflowY, newY));
          } else {
            newY = 0;
          }
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
            if (this.isZoomed) {
              media.style.cursor = "grab";
            }
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
          this.options = __spreadValues(__spreadValues({}, this.options), newOptions);
        }
        /**
         * Refresh the lightbox (re-scan for items)
         */
        refresh() {
          if (this.isOpen()) {
            const currentItem = this.items[this.currentIndex];
            if (currentItem) {
              this.open(currentItem);
            }
          }
        }
        /**
         * Destroy the lightbox instance
         */
        destroy() {
          if (!this.isInitialized) return;
          if (this.isOpen()) {
            this.close();
          }
          this.stopAutoHideTimer();
          this.eventListeners.forEach((listeners, key) => {
            listeners.forEach(({ element, event, handler, options }) => {
              if (element && element.removeEventListener) {
                element.removeEventListener(event, handler, options);
              }
            });
          });
          this.eventListeners.clear();
          if (this.zoomora && this.zoomora.parentNode) {
            this.zoomora.parentNode.removeChild(this.zoomora);
          }
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
  }
});
export default require_zoomora_es();
//# sourceMappingURL=zoomora.es.js.map
