import del from "rollup-plugin-delete";
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

console.log(process.env.NODE_ENV)

export default {
  plugins: [
    del({ targets: "bin/*" }),
  ]
};