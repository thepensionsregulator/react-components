import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import path from 'path';
import invariantPlugin from 'rollup-plugin-invariant';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

function onwarn(message) {
	const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED'];

	if (!suppressed.find((code) => message.code === code)) {
		return console.warn(message.message);
	}
}

const defaultGlobals = {
	react: 'react',
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
		// outputPrefix.format.js
		return `./lib/${format}.js`;
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
				peerDepsExternal({
					packageJsonPath: `${projectDir}/package.json`,
				}),
				postcss({
					extract: 'styles.css',
					modules: true,
					use: ['sass'],
				}),
				nodeResolve({
					browser: true,
				}),
				commonjs({
					include: '/node_modules/**',
				}),
				typescriptPlugin({ typescript, tsconfig }),
			],
			onwarn,
		},
		convert('cjs'),
		convert('umd'),
	];
}
