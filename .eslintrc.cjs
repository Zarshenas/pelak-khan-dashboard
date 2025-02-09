/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['perfectionist', 'unused-imports', 'prettier'],
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    node: {
      allowModules: ['@axios'], // Allow specific modules
    },
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'], // Map 'src' to './src'
        ],
        extensions: ['.js', '.jsx', '.css'], // Add '.css' to resolve CSS files
      },
    },
  },
  rules: {
    // General
    'no-alert': 0,
    'camelcase': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-exports': 0,
    'no-promise-executor-return': 0,
    'import/prefer-default-export': 0,
    'prefer-destructuring': [0, { object: false, array: false }],
    'no-use-before-define': 'off',

    // React
    'react/no-children-prop': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
    'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
    'react/no-unstable-nested-components': [1, { allowAsProps: true }],
    'react/prop-types': 0,

    // JSX Accessibility
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,

    // Unused Imports
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      0,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    // Perfectionist (Sorting)
    // 'perfectionist/sort-exports': [1, { order: 'asc', type: 'line-length' }],
    // 'perfectionist/sort-named-imports': [1, { order: 'asc', type: 'line-length' }],
    // 'perfectionist/sort-named-exports': [1, { order: 'asc', type: 'line-length' }],
    // 'perfectionist/sort-imports': [
    //   1,
    //   {
    //     order: 'asc',
    //     type: 'line-length',
    //     'newlines-between': 'always',
    //     groups: [
    //       'style',
    //       'type',
    //       ['builtin', 'external'],
    //       'custom-mui',
    //       'custom-routes',
    //       'custom-hooks',
    //       'custom-utils',
    //       'internal',
    //       'custom-components',
    //       'custom-sections',
    //       'custom-auth',
    //       'custom-types',
    //       ['parent', 'sibling', 'index'],
    //       ['parent-type', 'sibling-type', 'index-type'],
    //       'object',
    //       'unknown',
    //     ],
    //     'custom-groups': {
    //       value: {
    //         'custom-mui': '@mui/**',
    //         'custom-auth': 'src/auth/**',
    //         'custom-hooks': 'src/hooks/**',
    //         'custom-utils': 'src/utils/**',
    //         'custom-types': 'src/types/**',
    //         'custom-routes': 'src/routes/**',
    //         'custom-sections': 'src/sections/**',
    //         'custom-components': 'src/components/**',
    //       },
    //     },
    //     'internal-pattern': ['src/**'],
    //   },
    // ],

    // Additional Rules for Formik and MUI
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }], // Allow JSX in .jsx files
    'import/extensions': [1, 'ignorePackages', { js: 'never', jsx: 'never' }], // Allow omitting file extensions
    'import/no-extraneous-dependencies': [1, { devDependencies: true }], // Allow dev dependencies in certain files
  },
};