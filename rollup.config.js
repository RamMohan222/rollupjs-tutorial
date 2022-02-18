
import del from "rollup-plugin-delete";
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

// rollup.config.js
export default {
    input: 'src/index.js',
    output: [{
        /* for umd name is mandatory */
        name: 'iife_bundle', // Necessary for iife/umd
        file: __dirname + '/build/index.iife.js',
        format: 'iife',
        sourcemap: true,
        exports: 'named', //optional, required when we used mixed exports (default and named) other wise throws warning
        plugins: [terser()]
    }, {
        file: __dirname + '/build/index.es.js',
        format: 'es',
        sourcemap: true,
    }, {
        file: __dirname + '/build/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named' //optional, required when we used mixed exports (default and named) other wise throws warning
        /* terser is for minification it can be used build specific or global level as well */
        //plugins: [terser()]
    }, {
        file: __dirname + '/build/index.umd.js',
        format: 'umd',
        /* for umd name is mandatory */
        name: 'umdlib', // Necessary for iife/umd
        sourcemap: true,
        exports: 'named', //optional, required when we used mixed exports (default and named) other wise throws warning
    }, {
        file: __dirname + '/build/index.amd.js',
        format: 'amd',
        sourcemap: true,
        exports: 'named', //optional, required when we used mixed exports (default and named) other wise throws warning
    }, {
        file: __dirname + '/build/index.system.js',
        format: 'system',
        sourcemap: true
    }],
    plugins: [
        // Delete existing build files.
        del({ targets: "build/*" }),
        /*It will allow to import .json files in the source files*/
        json(),
        /* It loads the dependencies with bundle */
        resolve(),
        /* babel plugin should use after resolve and babel is only required to convert es5 */
        /* for es module it is not required since we are converting code to es6 from es5 */
        babel({ babelHelpers: 'bundled' }),
        replace({
            preventAssignment: false,
            values: {
                __HELLO__: 'Hi there',
                __GOODBYE__: 'Bye'
            }
        })
    ],
    // indicate which modules should be treated as external, these are excluded in bundle
    // rollup-plugin-node-externals plugin can use instead of external:[] 
    external: ['lodash']
};


/*
format  ->  description
------------------------
iife    ->	output an Immediately Invoked Function Expression (function () { ... }());
es|esm|module      ->  standard ES6
cjs	    ->  CommonJS for Node.js
umd	    ->  Universal Module Definition
amd	    ->  Asynchronous Module Definition
system  ->  SystemJS modules
*/
// UMD and IIFE output formats are not supported for code-splitting builds.
