module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    logger: 'writable',
    PRODUCTION: 'writable',
    __non_webpack_require__: 'writable',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    'import/no-named-as-default': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    'max-classes-per-file': 'off',
    'no-restricted-syntax': 'off',
    camelcase: 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-throw-literal': 'off',
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': 'off',
    'react/no-array-index-key': 'off',
    'no-continue': 'off',
    'no-return-await': 'off',
    'react/jsx-one-expression-per-line': 'off'
  },
  ignorePatterns: ['src/render/pages/sdk/compile.js'],
};
