// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'popup.js', // entry point
  output: {
    format: 'iife',  // immediately invoked function expression, suitable for browsers
    name: 'app',
    file: 'bundle.js',
  },
  plugins: [
    svelte(),
    resolve({
      browser: true, // resolves modules for the browser
      dedupe: ['svelte'] // prevents multiple copies of Svelte library
    }),
    commonjs()
  ]
};
