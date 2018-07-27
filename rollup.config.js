/**
 * @file
 * Rollup config for production builds
 */

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: './index.js',
  output: [
    {
      format: 'umd',
      file: './build/index.min.js',
      name: 'GComponents',
      exports: 'named',
    },
    {
      format: 'es',
      file: './build/index.mjs',
    },
  ],
  plugins: [
    builtins(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }], 'react'],
      plugins: ['transform-object-rest-spread', 'external-helpers'],
      externalHelpers: true,
    }),
    json(),
    resolve({
      preferBuiltins: false,
    }),
    commonjs({
      namedExports: {
        react: ['Fragment'],
      },
    }),
    terser(),
  ],
};
