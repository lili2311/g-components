/**
 * @file
 * Rollup config for production builds
 */

import nodeResolve from 'rollup-plugin-node-resolve';
import bowerResolve from 'rollup-plugin-bower-resolve';
// import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import runtime from 'node-sass';
import pkg from './package.json';

const common = {
  input: './index.js',
  plugins: [
    bowerResolve({
      extensions: ['.scss', '.js'],
    }),
    nodeResolve({
      browser: true,
      module: true,
      jsnext: true,
      main: true,
    }),
    sass({
      runtime,
      options: {
        sourceMap: true,
        includePaths: ['bower_components'],
      },
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }], 'react'],
      plugins: [
        'external-helpers',
        'transform-runtime',
        'transform-object-rest-spread',
        'transform-class-properties',
      ],
    }),
    commonjs(),
    json(),
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
      file: pkg.main.replace('.min', ''),
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
      file: pkg.module.replace('.min', ''),
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  },
];
