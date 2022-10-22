module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'node', 'prettier'],
  root: true,
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'node/no-empty-function': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/shebang': 'off',
    'prettier/prettier': 'warn',
    strict: 'warn'
  }
};
