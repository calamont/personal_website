import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {ignores: ["**/build/**/*"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/no-deprecated": "warn",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "warn",
      "no-undef": "warn"
    }
  }
];
