const ignores = ['/node_modules/', '/lib/'];

module.exports = {
	transform: {
		'.(ts|tsx)': 'ts-jest',
	},
	// Mappings to identity-obj-proxy mock away static assets during tests, so that they don't cause errors.
	// This is required when using govuk-frontend, which includes these static assets.
	moduleNameMapper: {
		'\\.module\\.(css|scss)$': 'identity-obj-proxy',
		"\\.(ico|png|svg)$": "identity-obj-proxy",
		"@tpr/(core|icons|forms|theming)$": "<rootDir>/node_modules/@tpr/$1/src"
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	testURL: 'http://localhost',
	testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx)'],
	testPathIgnorePatterns: [...ignores],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};