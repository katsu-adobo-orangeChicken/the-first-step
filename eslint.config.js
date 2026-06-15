// eslint.config.js
import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

export default [
  // Global ignores: Tell ESLint not to look at these directories
  {
    ignores: [
      "node_modules/",
      "docs/",
      ".github/"
    ]
  },
  // Global linting rules for future JavaScript
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdoc.configs['flat/recommended'].rules,
      "no-unused-vars": "warn",
      "no-console": "off"
    },
  }
];