import packageJson from './package.json' assert {type: 'json'};
import externalPlugin from 'rollup-plugin-peer-deps-external';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import {dts} from 'rollup-plugin-dts';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      externalPlugin(),
      resolvePlugin(),
      commonjsPlugin(),
      typescriptPlugin(),
      terser()
    ]
  },
  {
    input: './types/index.d.ts',
    output: [{
      file: './dist/index.d.ts',
      format: 'esm'
    }],
    plugins: [dts()]
  }
];
