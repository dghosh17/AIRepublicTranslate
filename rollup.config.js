import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';

export default {
  input: 'popup.svelte', // Your main Svelte entry file
  output: {
    file: 'popup.js', // Output to the same file name for compatibility
    format: 'iife',   // Use an immediately-invoked function expression (IIFE)
    name: 'popup'
  },
  plugins: [
    svelte({
      dev: !production,          // Enable run-time checks when not in production
      emitCss: true,             // Extract CSS
    }),
    css({ output: 'bundle.css' }), // Outputs CSS to bundle.css
    resolve({
      browser: true,
      dedupe: ['svelte']         // Avoids duplicated Svelte libraries
    }),
    commonjs(),
    production && terser()       // Minify code in production
  ]
};