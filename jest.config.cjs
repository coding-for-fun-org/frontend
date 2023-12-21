module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.{ts,tsx}',
    '<rootDir>/src/hooks/**/*.{ts,tsx}',
    '<rootDir>/src/utils/**/*.{ts,tsx}',
    '<rootDir>/src/**/components/**/*.{ts,tsx}',
    '<rootDir>/src/**/hooks/**/*.{ts,tsx}',
    '<rootDir>/src/**/utils/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**'
  ],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/src/__mocks__/style.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
      '<rootDir>/src/__mocks__/file.js',

    /* Handle typescript custom absolute imports */
    '@/styles/root/(.*)': '<rootDir>/src/styles/$1',
    '@/dictionaries/root/(.*)': '<rootDir>/src/dictionaries/$1',
    '@/server/root/(.*)': '<rootDir>/src/server/$1',
    '@/elements/root/(.*)': '<rootDir>/src/elements/$1',
    '@/components/root/(.*)': '<rootDir>/src/components/$1',
    '@/contexts/root/(.*)': '<rootDir>/src/contexts/$1',
    '@/hooks/root/(.*)': '<rootDir>/src/hooks/$1',
    '@/utils/root/(.*)': '<rootDir>/src/utils/$1',
    '@/types/root/(.*)': '<rootDir>/src/types/$1',
    '@/styles/github/root/(.*)': '<rootDir>/src/modules/github/styles/$1',
    '@/components/github/root/(.*)':
      '<rootDir>/src/modules/github/components/$1',
    '@/contexts/github/root/(.*)': '<rootDir>/src/modules/github/contexts/$1',
    '@/hooks/github/root/(.*)': '<rootDir>/src/modules/github/hooks/$1',
    '@/types/github/root/(.*)': '<rootDir>/src/modules/github/types/$1',
    '@/utils/github/root/(.*)': '<rootDir>/src/modules/github/utils/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}
