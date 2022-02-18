import del from "rollup-plugin-delete";
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

console.log(process.env.NODE_ENV)

export default {
  input: 'src/index.js',
  output: {
    // file: 'bin/bundle.js',
    dir: 'bin', // for code splitting we need to supply dir name, instead of file name.
    format: 'cjs',
    sourcemap: process.env.SM === 'sourcemap',
    exports: 'named' //optional, required when we used mixed exports (default and named) other wise throws warning
  },
  plugins: [
    // Delete existing bin files.
    del({ targets: "bin/*" }),
    /*It will allow to import .json files in the source files*/
    json(),
    /* minifies the build */
    terser(),
    /* It loads the dependencies to bundle*/
    resolve(),
    /* babel plugin should use after resolve */
    babel({ babelHelpers: 'bundled' })
  ]
};