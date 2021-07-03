module.exports = {
  testEnvironment: 'node',
  verbose: true,
  coverageThreshold: {
      global: {
          branches: 80,
          functions: 80,
          lines: 80,
      },
  },
};
