// Import core ESLint utilities and configs
import globals from 'globals';
import eslint from '@eslint/js';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

// Import TypeScript ESLint
import tseslint from 'typescript-eslint';
import { plugin as typescriptPlugin } from 'typescript-eslint';

// Import React-related plugins
import reactPlugin from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

// Import other plugins
import importPlugin from 'eslint-plugin-import';

// Initialize compatibility layer
const compat = new FlatCompat();

/**
 * Base Configuration
 * Includes global settings and ignores
 */
const baseConfig = {
  ignores: ['node_modules', '.cache', 'build', 'public/build', '.env'],
  ...eslint.configs.recommended,
  ...js.configs.recommended,
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.es6,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
};

/**
 * React Configuration
 * Includes React-specific rules and settings
 */
const reactConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  ...reactRecommended,
  ...reactJSXRuntime,
  rules: {
    ...reactRecommended.rules,
    ...reactJSXRuntime.rules,
  },
  languageOptions: {
    ...reactRecommended.languageOptions,
    ...reactJSXRuntime.languageOptions,
  },
  plugins: {
    react: reactPlugin,
    ['jsx-a11y']: jsxA11yPlugin,
  },
  extends: [
    ...compat.config(reactHooksPlugin.configs.recommended),
    ...compat.config(jsxA11yPlugin.configs.recommended),
  ],
  settings: {
    react: {
      version: 'detect',
    },
    formComponents: ['Form'],
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' },
      { name: 'NavLink', linkAttribute: 'to' },
    ],
    'import/resolver': {
      typescript: true,
    },
  },
};

/**
 * TypeScript Configuration
 * Combines TypeScript-specific rules, imports, and settings
 */
const typescriptConfig = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    ['@typescript-eslint']: typescriptPlugin,
    import: importPlugin,
  },
  extends: [
    ...tseslint.configs.recommended,
    ...compat.config(importPlugin.configs.recommended),
    ...compat.config(importPlugin.configs.typescript),
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'import/no-dynamic-require': 'warn',
    'import/no-nodejs-modules': 'warn',
  },
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};

/**
 * Configuration specific to the ESLint config file itself
 */
const configForEslintConfigFile = {
  files: ['eslint.config.js'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
};

/**
 * Configuration to explicitly ignore .react-router directory
 */
const ignoreReactRouterConfig = {
  ignores: ['.react-router/**'],
};

/**
 * Combine All Configurations into a Single Array
 */
export default tseslint.config(
  baseConfig,
  reactConfig,
  typescriptConfig,
  configForEslintConfigFile,
  ignoreReactRouterConfig
);
