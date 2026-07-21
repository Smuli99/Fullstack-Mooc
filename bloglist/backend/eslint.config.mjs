import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      indent: ['error', 2],
      semi: ['error', 'always'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    }
  },
  {
    ignores: ['dist/**'],
  }
]);
