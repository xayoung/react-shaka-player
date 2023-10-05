import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';

import fs from 'fs';

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  }),
  resolve(),
  typescript({
    include: ['*.ts+(|x)', '**/*.ts+(|x)', '*.js+(|x)', '**/*.js+(|x)']
  }),
  commonjs(),
  copy({
    targets: [
      {
        src: [
          'node_modules/shaka-player/dist/controls.css',
          'assets/themes.css'
        ],
        dest: 'dist'
      }
    ]
  })
];

const builds = [];

const lib = {
  input: 'src/index.tsx',
  output: {
    file: 'dist/cjs.js',
    format: 'cjs',
    // sourcemap: true,
    exports: 'default'
  },
  external: ['react'],
  plugins
};

builds.push(lib);

if (process.env.DEV) {
  const devtool = {
    input: 'example/index.js',
    output: {
      file: 'dist/example.js',
      format: 'umd'
    },
    plugins: [
      ...plugins,
      serve({
        open: true,
        contentBase: 'dist'
      }),
      html({
        dest: 'dist',
        filename: 'index.html',
        template: () => fs.readFileSync('./example/template.html'),
        ignore: /cjs\.js/
      }),
      alias({
        entries: [
          {
            find: 'react-shaka-player',
            replacement: 'src/index.tsx'
          }
        ]
      })
    ]
  };
  builds.push(devtool);
}

export default builds;
