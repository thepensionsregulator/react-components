module.exports = {
	stories: ['../packages/**/*.stories.(js|ts|tsx|mdx)'],
	addons: ['@storybook/addon-docs'],
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				},
				// Optional
				{
					loader: require.resolve('react-docgen-typescript-loader'),
				},
			],
		});
		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	},
};
