import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from '@rollup/plugin-terser';

export default {
  input: 'popup.js',    // Entry point, replace with your file if named differently
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'app',
    file: 'dist/popup.js'   // Compiled output file
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: false,          // Set to true for development, false for production
      },
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser()
  ]
};
