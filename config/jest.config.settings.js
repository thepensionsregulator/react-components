const ignores = ['/node_modules/', '/fixtures/', '/__tests__/helpers/', '__mocks__', '__stories__'];

module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testURL: 'http://localhost',

  testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx)'],
  testPathIgnorePatterns: [...ignores],
};
