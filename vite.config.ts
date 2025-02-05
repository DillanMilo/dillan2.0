import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild', // Explicitly ensure minification using esbuild.
    target: 'esnext',  // Serve modern JavaScript.
  },
});
