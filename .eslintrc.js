module.exports = {
  root: true,
  env: {
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "ts-react"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react-hooks",
    "react",
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};