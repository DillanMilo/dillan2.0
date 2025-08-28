import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression() // Add Gzip compression for production builds.
  ],
  build: {
    minify: 'esbuild', // Ensure minification using esbuild.
    target: 'esnext',  // Serve modern JavaScript.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor chunks.
          utils: ['./src/utils/schema', './src/utils/metaUtils'], // Separate utils
        }
      }
    },
    chunkSizeWarningLimit: 500, // Stricter chunk size limits
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundle dependencies
  },
  esbuild: {
    // Remove console logs in production
    pure: ['console.log', 'console.warn'],
    drop: ['console', 'debugger'],
  },
  publicDir: 'public', // Make sure this is set
})

