module.exports = {
	plugins: [
		{
			resolve: `gatsby-plugin-polyfill-io`,
			options: {
				features: [`Array.prototype.flat`],
			},
		},
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				cssLoaderOptions: {
					camelCase: false,
				},
			},
		},
	],
};
