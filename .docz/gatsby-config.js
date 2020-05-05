const { mergeWith } = require('docz-utils');
const fs = require('fs-extra');

let custom = {};
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js');

if (hasGatsbyConfig) {
	try {
		custom = require('./gatsby-config.custom');
	} catch (err) {
		console.error(
			`Failed to load your gatsby-config.js file : `,
			JSON.stringify(err),
		);
	}
}

const config = {
	pathPrefix: '/',

	siteMetadata: {
		title: 'TPR React Components',
		description: 'React Components reused across the apps',
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-typescript',
			options: {
				isTSX: true,
				allExtensions: true,
			},
		},
		{
			resolve: 'gatsby-theme-docz',
			options: {
				themeConfig: { mode: 'light', showDarkModeSwitch: false },
				src: './',
				gatsbyRoot: null,
				themesDir: 'src',
				mdxExtensions: ['.md', '.mdx'],
				docgenConfig: {},
				menu: ['Home', 'Core', 'Forms', 'Layout'],
				mdPlugins: [],
				hastPlugins: [],
				ignore: [
					'CHANGELOG.md',
					'CODE_OF_CONDUCT.md',
					'CONTRIBUTING.md',
					'LICENSE.md',
					'README.md',
				],
				typescript: true,
				ts: false,
				propsParser: true,
				'props-parser': true,
				debug: false,
				native: false,
				openBrowser: null,
				o: null,
				open: null,
				'open-browser': null,
				root: '/Users/davidalekna/Development/tpr/react-components/.docz',
				base: '/',
				source: './',
				'gatsby-root': null,
				files: '**/*.{markdown,mdx}',
				public: '/public',
				dest: '.docz/dist',
				d: '.docz/dist',
				editBranch: 'master',
				eb: 'master',
				'edit-branch': 'master',
				config: '',
				title: 'TPR React Components',
				description: 'React Components reused across the apps',
				host: 'localhost',
				port: 6006,
				p: 3000,
				separator: '-',
				paths: {
					root: '/Users/davidalekna/Development/tpr/react-components',
					templates:
						'/Users/davidalekna/Development/tpr/react-components/node_modules/docz-core/dist/templates',
					docz: '/Users/davidalekna/Development/tpr/react-components/.docz',
					cache:
						'/Users/davidalekna/Development/tpr/react-components/.docz/.cache',
					app: '/Users/davidalekna/Development/tpr/react-components/.docz/app',
					appPackageJson:
						'/Users/davidalekna/Development/tpr/react-components/package.json',
					appTsConfig:
						'/Users/davidalekna/Development/tpr/react-components/tsconfig.json',
					gatsbyConfig:
						'/Users/davidalekna/Development/tpr/react-components/gatsby-config.js',
					gatsbyBrowser:
						'/Users/davidalekna/Development/tpr/react-components/gatsby-browser.js',
					gatsbyNode:
						'/Users/davidalekna/Development/tpr/react-components/gatsby-node.js',
					gatsbySSR:
						'/Users/davidalekna/Development/tpr/react-components/gatsby-ssr.js',
					importsJs:
						'/Users/davidalekna/Development/tpr/react-components/.docz/app/imports.js',
					rootJs:
						'/Users/davidalekna/Development/tpr/react-components/.docz/app/root.jsx',
					indexJs:
						'/Users/davidalekna/Development/tpr/react-components/.docz/app/index.jsx',
					indexHtml:
						'/Users/davidalekna/Development/tpr/react-components/.docz/app/index.html',
					db:
						'/Users/davidalekna/Development/tpr/react-components/.docz/app/db.json',
				},
			},
		},
	],
};

const merge = mergeWith((objValue, srcValue) => {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
});

module.exports = merge(config, custom);
