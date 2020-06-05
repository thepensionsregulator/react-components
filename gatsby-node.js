const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
	const extraConfig = {
		resolve: {
			alias: {
				'@playground': path.resolve(__dirname, '../docs/Playground'),
			},
		},
	};

	actions.setWebpackConfig(extraConfig);
};
