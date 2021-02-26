import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { sass } from 'svelte-preprocess-sass';
import { string } from 'rollup-plugin-string';
import json from '@rollup/plugin-json';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

require('dotenv').config({ path: '../.env' });

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      compilerOptions: {

        // enable run-time checks when not in production
        dev: !production
      },
      preprocess: {
        style: sass({}, { name: 'scss' })
      }
    }),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    string({
      include: '../**/*.bpmn'
    }),

    json(),

    injectProcessEnv({
      CLOUD_CLUSTER_ID: process.env.CLOUD_CLUSTER_ID,
      CLOUD_ORGA_ID: process.env.CLOUD_ORGA_ID
    })

  ],
  watch: {
    clearScreen: false
  }
};