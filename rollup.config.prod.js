import del from "rollup-plugin-delete";
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const isProdMode = process.env.NODE_ENV === 'prod';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: process.env.SM === 'true',
        exports: 'named' 
    },
    plugins: [
        del({ targets: 'dist/*' }),
        json(),
        terser({
            ecma: 2020,
            mangle: { toplevel: true },
            compress: {
                module: true,
                toplevel: true,
                unsafe_arrows: true,
                drop_console: isProdMode, // it removes all console.log's from source code.
                drop_debugger: isProdMode
            },
            output: { quote_style: 1 }
        }),
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
};