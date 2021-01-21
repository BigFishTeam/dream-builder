/*
 * @Date: 2020-07-06 15:35:54
 * @LastEditTime: 2020-12-23 14:10:35
 * @Description: eslint config
 */

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    // react
    'react/prop-types': 'off',
    'react/display-name': 'off',
    // import
    // eslint
    'operator-linebreak': 'off',
    'no-console': 'off'
  },
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true // Enable JSX since we're using React
    }
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true // Enables Node.js global variables and Node.js scoping.
  }
};
