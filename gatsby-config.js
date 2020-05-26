module.exports = {
	plugins: [
		`gatsby-plugin-polyfill-io`,
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
