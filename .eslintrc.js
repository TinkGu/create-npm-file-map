module.exports = {
  root: true,
  env: {
    browser: false,
    es6: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['eslint:recommended'],
};
