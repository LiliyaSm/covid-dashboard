module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    'no-continue': 'off',
    'linebreak-style': ['error', 'windows'],
    indent: ['error', 2],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': 'off',
  },
  plugins: ['react'],
};
