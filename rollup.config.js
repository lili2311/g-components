/**
 * @file
 * Rollup config for production builds
 */

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const common = {
  input: './index.js',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }], 'react'],
      plugins: ['transform-object-rest-spread', 'external-helpers'],
      externalHelpers: true,
    }),
    json(),
    resolve({
      browser: true,
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs({
      namedExports: {
        react: ['Fragment'],
      },
    }),
  ],
};

export default [
  {
    ...common,
    output: {
      format: 'umd',
      file: pkg.main,
      name: 'GComponents',
      exports: 'named',
      globals: {
        react: 'React',
      },
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [...common.plugins, terser()],
  },
  {
    ...common,
    output: {
      format: 'umd',
      file: './dist/gcomponents.umd.js',
      name: 'GComponents',
      exports: 'named',
      globals: {
        react: 'React',
      },
    },
    external: Object.keys(pkg.peerDependencies || {}),
  },
  {
    ...common,
    output: {
      format: 'es',
      file: pkg.module,
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [...common.plugins, terser()],
  },
  {
    ...common,
    output: {
      format: 'es',
      file: './dist/gcomponents.mjs',
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  },
];
