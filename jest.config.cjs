// jest.config.cjs

const { createRequire } = require('module');
const createReq = createRequire(__filename);

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '/tests/unit/*.spec.js',
    '/tests/unit/*.spec.jsx',
    '/tests/unit/*.spec.ts',
    '/tests/unit/*.spec.tsx',
  ],
};
