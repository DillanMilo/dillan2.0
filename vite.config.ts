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
    target: 'es2015',  // More compatible target for better browser support.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor chunks.
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
  server: {
    fs: {
      strict: false // Allow serving files from parent directories
    }
  }
})

