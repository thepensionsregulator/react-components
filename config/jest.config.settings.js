const ignores = [
	'/node_modules/',
	'/lib',
	'/__tests__/helpers/',
	'__mocks__',
	'__stories__',
];

module.exports = {
	transform: {
		'.(ts|tsx)': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	testURL: 'http://localhost',
	testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx)'],
	testPathIgnorePatterns: [...ignores],
};
