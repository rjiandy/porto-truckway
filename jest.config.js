module.exports = {
  verbose: true,
  preset: 'jest-react-native',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  testRegex: '(./src/.*\\.(test|spec))\\.js?$',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif|jpg)$': '<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub'
  },
  coveragePathIgnorePatterns: [
    './tests/setup.tsx',
    './src/themes/',
    './src/assets/',
    './src/utils/',
    './src/App.js',
    './src/stores/',
    './src/navigations/',
    './src/components/',
    './src/api/'
  ],
  globals: {},
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  clearMocks: true,
  timers: 'fake',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation|@react-native-community)'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70
      // statements: -10
    }
  },
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!**/__mocks__/*.{js}',
    '!**/node_modules/**'
  ]
};
