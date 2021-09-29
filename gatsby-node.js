const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
	const extraConfig = {
		resolve: {
			alias: {
				'@playground': path.resolve(__dirname, '../docs/Playground'),
				'@tpr/theming': path.resolve(__dirname, '../packages/theming'),
				'@tpr/core': path.resolve(__dirname, '../packages/core'),
				'@tpr/icons': path.resolve(__dirname, '../packages/icons'),
				'@tpr/forms': path.resolve(__dirname, '../packages/forms'),
				'@tpr/layout': path.resolve(__dirname, '../packages/layout'),
			},
		},
	};

	actions.setWebpackConfig(extraConfig);
};
