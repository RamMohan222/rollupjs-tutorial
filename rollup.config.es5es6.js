import del from "rollup-plugin-delete";
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

/** It converts the common js code to es6 */
export default [{
  input: 'src/main.js',
  output: {
    // file: 'es6/index.es.js',
    dir: 'es6', // for code splitting we need to supply dir name, instead of file name.
    format: 'es',
    sourcemap: true,
    chunkFileNames: "chunks/[name]-[hash]-es.js"
  },
  plugins: [
    // Delete existing bin files.
    del({ targets: "es6/*" }),
    /*It will allow to import .json files in the source files*/
    json(),
    /* It loads the dependencies to bundle*/
    resolve(),
    /* converts CommonJS to ES6 modules */
    commonjs()
  ]
},
{
  input: 'src/main.js',
  output: {
    // file: 'es5/index.cjs.js', // for single file
    dir: 'es5', // for code splitting we need to supply dir name, instead of file name.
    format: 'cjs',
    sourcemap: true,
    chunkFileNames: "chunks/[name]-[hash]-es.js",
    exports: 'named' //optional, required when we used mixed exports (default and named) other wise throws warning
  },
  plugins: [
    // Delete existing bin files.
    del({ targets: "es5/*" }),
    /*It will allow to import .json files in the source files*/
    json(),
    /* It loads the dependencies to bundle*/
    resolve(),
    /* Converts ES6 to ES5 */
    // Presets configuration instead of .babelrc or babel.config.js files
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
    })
  ]
},
];

/*
<script type="module" src="./es6/main.js"></script>
<script nomodule src="./es5/main.js" defer></script>

Modern browsers will load and run the ES6 module contained in ./es6/main.js. 
Older browsers will load and run the ES5 script contained in ./es5/main.js. 
In both cases, the scripts will run when the DOM is ready — that is the default for ES6 
and the defer attribute enables it in ES5.
*/