module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['components/**/*.tsx', 'pages/**/*.tsx'],
  coverageReporters: ['lcov', 'text'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@context/(.*)': '<rootDir>/src/context/$1',
    '@graphql/(.*)': '<rootDir>/src/graphql/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@validations/(.*)': '<rootDir>/src/validations/$1',
    '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@ssr-functions/(.*)': '<rootDir>/src/functions/$1',
    '\\.svg': '<rootDir>/src/__mocks__/svgrMock.tsx',
  },
};
