module.exports = {
	plugins: [
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
