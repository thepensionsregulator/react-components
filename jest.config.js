module.exports = {
	projects: ['<rootDir>/packages/*'],
	testPathIgnorePatterns: ['/.docz/', '/lib/'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
	},
};
