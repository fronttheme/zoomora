import {defineConfig} from 'vite'
import {resolve} from 'path'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  build: {
    sourcemap: true,
    cssCodeSplit: false,
    cssMinify: true, // Enable CSS minification
    lib: {
      entry: resolve(__dirname, 'src/zoomora.js'),
      name: 'Zoomora',
      fileName: (format) => {
        if (format === 'umd') {
          return 'zoomora.umd.js'
        } else if (format === 'es') {
          return 'zoomora.es.js'
        }
        return `zoomora.${format}.js`
      },
      formats: ['umd', 'es']
    },
    rollupOptions: {
      output: [
        // UMD build for WordPress/browser
        {
          format: 'umd',
          name: 'Zoomora',
          dir: 'dist',
          entryFileNames: 'zoomora.umd.js'
        },
        // Minified UMD build
        {
          format: 'umd',
          name: 'Zoomora',
          dir: 'dist',
          entryFileNames: 'zoomora.umd.min.js',
          plugins: [terser({
            format: {
              comments: /^!/ // Keep license comments
            },
            compress: {
              drop_console: true, // ✅ Remove console.log
              drop_debugger: true, // ✅ Remove debugger statements
              pure_funcs: ['console.log', 'console.info', 'console.debug'] // ✅ Remove specific console methods
            }
          })]
        },
        // ES module build
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: 'zoomora.es.js'
        },
        // Minified ES module build
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: 'zoomora.es.min.js',
          plugins: [terser({
            format: {
              comments: /^!/ // Keep license comments
            },
            compress: {
              drop_console: true, // ✅ Remove console.log
              drop_debugger: true, // ✅ Remove debugger statements
              pure_funcs: ['console.log', 'console.info', 'console.debug'] // ✅ Remove specific console methods
            }
          })]
        }
      ]
    },
    minify: false, // Handling minification in rollup options
    target: 'es2015' // Good browser support including older versions
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {}
    }
  },
  // Development server config
  server: {
    port: 3000,
    open: true
  }
})