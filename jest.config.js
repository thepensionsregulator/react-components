module.exports = {
	projects: ['<rootDir>/packages/*'],
	testPathIgnorePatterns: ['/.docz/'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
	},
};
