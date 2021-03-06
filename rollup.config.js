import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

import pkg from './package.json';

export default {
	input: 'src/ReactDatePicker.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true
		}
	],
	plugins: [
		external(),
		postcss({
			extract: true,
			autoModules: true
		}),
		url(),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
			runtimeHelpers: true
		}),
		resolve(),
		commonjs()
	]
};
