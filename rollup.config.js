import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'popup.js',
  output: {
    file: 'public/bundle.js',  // Ensure this points to where popup.html can access it
    format: 'iife'
  },
  plugins: [
    svelte(),
    resolve(),
    commonjs()
  ]
};
