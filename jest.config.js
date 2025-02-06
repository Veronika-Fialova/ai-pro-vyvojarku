module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
}
