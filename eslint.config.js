import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/",
      "docs/",
      ".github/",
      "dist/",
      "prototype/"
    ]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}", "vite.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      jsdoc
    },
    rules: {
      ...jsdoc.configs['flat/recommended'].rules,
      "jsdoc/require-jsdoc": "off",
      "no-unused-vars": "warn",
      "no-console": "off"
    },
  },
  {
    files: ["src/app/**/*.{js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": [
                "**/Internal/**",
                "src/modules/*/Internal/**",
                "./modules/*/Internal/**",
                "../modules/*/Internal/**"
              ],
              "message": "Import from a module's PublicApi/index.js instead of its Internal implementation."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/shared/**/*.{js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["**/modules/**", "src/modules/**"],
              "message": "Shared code must stay domain-agnostic and must not import application modules."
            }
          ]
        }
      ]
    }
  }
];
