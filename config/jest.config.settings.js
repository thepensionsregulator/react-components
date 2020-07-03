const ignores = ['/node_modules/', '/lib/'];

module.exports = {
	transform: {
		'.(ts|tsx)': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.module\\.(css|scss)$': 'identity-obj-proxy',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	testURL: 'http://localhost',
	testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx)'],
	testPathIgnorePatterns: [...ignores],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
