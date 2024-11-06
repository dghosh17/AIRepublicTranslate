import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'popup.js', // Path to your main JS file
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'bundle.js' // Output path
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production // Use "compilerOptions" for Svelte compiler configurations
      },
      emitCss: true // Ensure CSS is emitted separately
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    css({ output: 'bundle.css' }) // Use the rollup-plugin-css-only plugin to output CSS
  ],
  watch: {
    clearScreen: false
  }
};
