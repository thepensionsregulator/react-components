const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
	const extraConfig = {
		resolve: {
			alias: {
				'@playground': path.resolve(__dirname, '../docs/Playground'),
				'@tpr/core': path.resolve(__dirname, '../packages/core'),
			},
		},
	};

	actions.setWebpackConfig(extraConfig);
};
