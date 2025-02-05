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
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Adjust if needed.
  }
  // Removed server.compression as it's not a recognized property.
})

