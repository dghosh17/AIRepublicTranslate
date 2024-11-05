import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        popup: './src/popup.html', // Your main HTML file for the popup
      },
      output: {
        entryFileNames: 'popup.js',
        assetFileNames: 'popup.[ext]'
      }
    }
  }
})
