import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
// import commonjs from '@rollup/plugin-commonjs';
// import typescriptPlugin from 'rollup-plugin-typescript2';
// import typescript from 'typescript';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import ignoreImport from 'rollup-plugin-ignore-import';

const plugins = [
	nodeResolve(),
	postcss({
		extract: 'styles.css',
		plugins: [autoprefixer()],
		modules: true,
		use: [
			[
				'sass',
				{
					includePaths: [path.resolve('node_modules')],
				},
			],
		],
	}),
];

const outputFile = (format) => `./lib/index.${format}.js`;

function prepareESM(input, external) {
	return {
		input,
		external,
		output: {
			file: outputFile('esm'),
			format: 'esm',
			sourcemap: true,
		},
		plugins,
	};
}

function prepareCJS(input, external) {
	return {
		input,
		external,
		output: {
			file: outputFile('cjs'),
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
		},
		plugins,
	};
}

export function rollup({
	// name,
	input = './lib/index.js',
	extraExternal = [],
}) {
	const external = ['react', 'tslib'].concat(extraExternal);
	return [prepareESM(input, external), prepareCJS(input, external)];
}
