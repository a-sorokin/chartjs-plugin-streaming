// Flat ESLint config for ESLint v9 (ESM)
// Covers JS, TypeScript (in types/), and Markdown files

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import markdown from 'eslint-plugin-markdown';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Global ignores (migrated from .eslintignore)
  {
    ignores: [
      'dist/**/*.js',
      'dist/**/*.html',
      'docs/scripts/chartjs-chart-financial.js',
    ],
  },

  // JavaScript files
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },

  // Node.js environment files
  {
    files: ['rollup.config.js', 'scripts/**/*.js', 'eslint.config.*', 'docs/.vuepress/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        // VuePress config may access window at runtime on client
        window: 'readonly',
      },
    },
  },

  // Browser environment files
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
      },
    },
  },

  // TypeScript declaration files under types/
  {
    files: ['types/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Start from the recommended rule set if available
      ...(tsPlugin.configs && tsPlugin.configs.recommended
        ? tsPlugin.configs.recommended.rules
        : {}),
      // Declaration files often intentionally redeclare and use empty interfaces for augmentation
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Lint Markdown files using the markdown processor
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown',
  },

  // Relax rules for code blocks extracted from Markdown
  {
    files: ['**/*.md/*.js', '**/*.md/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },

  // Use TS parser for TypeScript code blocks in Markdown
  {
    files: ['**/*.md/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
  },
];


