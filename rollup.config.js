import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';

export default {
  input: 'popup.js', // Your main Svelte entry file
  output: {
    file: 'popup.js', // Output to the same file name for compatibility
    format: 'iife',   // Use an immediately-invoked function expression (IIFE)
    name: 'popup'
  },
  plugins: [
    svelte({
      // Enable run-time checks when not in production
      dev: !production,
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs()
  ]
};
