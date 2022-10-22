module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true
    }
  }
};
