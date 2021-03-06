module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    //   project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'prettier',
    'sonarjs',
    'json-format',
    'promise',
    'jest',
    'jest-formatting',
    '@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'node/no-unsupported-features/es-syntax': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jest/no-done-callback': 'off',
  },
  ignorePatterns: ['./tsconfig.json'],
  settings: {
    jest: {
      version: 'detect',
    },
    node: {
      tryExtensions: ['.ts'],
    },
  },
};
