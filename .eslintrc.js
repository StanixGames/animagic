module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 9
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'max-len': ['error', 120],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        delimiter: 'semi',    // 'none' or 'semi' or 'comma'
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',    // 'semi' or 'comma'
        requireLast: false,
      },
    }],
    // 'max-lines': ['error', 200],
    'import/no-default-export': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'arrow-body-style': 0,
  },
  overrides: [],
};
