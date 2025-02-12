import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // React import is no longer required in scope with JSX (Next.js or React 17+).
      semi: ["error", "always"], // Always enforce the use of semicolons.
      quotes: ["error", "double"], // Enforce single quotes for strings.
      "jsx-quotes": ["error", "prefer-double"], // Enforce double quotes in JSX attributes.
      indent: ["error", 2, { SwitchCase: 1 }], // Use 2 spaces for indentation, with 1 level for SwitchCase.
      "no-tabs": "error", // Disallow the use of tabs.
      "max-len": ["error", { code: 80 }], // Enforce a maximum line length of 80 characters.
      "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline structures.
      "object-curly-spacing": ["error", "always"], // Enforce spaces inside curly braces.
      "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }], // Enforce space before self-closing JSX tags.
      "arrow-parens": ["error", "always"], // Always require parentheses around arrow function arguments.
      "eol-last": ["error", "always"], // Require a newline at the end of the file.
      "linebreak-style": ["error", "unix"], // Enforce Unix-style line endings (LF).
    },
    ignores: ["eslint.config.mjs", "node_modules/"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
