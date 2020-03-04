import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import path from 'path';
import invariantPlugin from 'rollup-plugin-invariant';
import { terser as minify } from 'rollup-plugin-terser';

function onwarn(message) {
	const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

	if (!suppressed.find(code => message.code === code)) {
		return console.warn(message.message);
	}
}

const defaultGlobals = {
	react: 'react',
	'react-dom': 'react-dom',
};

export function rollup({
	name,
	input = './src/index.ts',
	outputPrefix = 'bundle',
	extraGlobals = {},
}) {
	const projectDir = path.join(__filename, '..');
	console.info(`Building project esm ${projectDir}`);
	const tsconfig = `${projectDir}/tsconfig.json`;

	const globals = {
		...defaultGlobals,
		...extraGlobals,
	};

	function external(id) {
		return Object.prototype.hasOwnProperty.call(globals, id);
	}

	function outputFile(format) {
		return './lib/' + outputPrefix + '.' + format + '.js';
	}

	function convert(format) {
		return {
			input: outputFile('esm'),
			external,
			output: {
				file: outputFile(format),
				format,
				sourcemap: true,
				name,
				globals,
			},
			onwarn,
		};
	}

	return [
		{
			input,
			external,
			output: {
				file: outputFile('esm'),
				format: 'esm',
				exports: 'named',
				sourcemap: true,
			},
			plugins: [
				nodeResolve({
					mainFields: ['module', 'main'],
					extensions: ['.ts', '.tsx'],
				}),
				typescriptPlugin({ typescript, tsconfig }),
				invariantPlugin({
					// Instead of completely stripping InvariantError messages in
					// production, this option assigns a numeric code to the
					// production version of each error (unique to the call/throw
					// location), which makes it much easier to trace production
					// errors back to the unminified code where they were thrown,
					// where the full error string can be found. See #4519.
					errorCodes: true,
				}),
				commonjs({
					include: /node_modules/,
				}),
			],
			onwarn,
		},
		convert('umd'),
		convert('cjs'),
		{
			input: outputFile('cjs'),
			output: {
				file: outputFile('cjs.min'),
				format: 'cjs',
			},
			plugins: [
				minify({
					mangle: {
						toplevel: true,
					},
					compress: {
						global_defs: {
							'@process.env.NODE_ENV': JSON.stringify('production'),
						},
					},
				}),
			],
		},
	];
}
