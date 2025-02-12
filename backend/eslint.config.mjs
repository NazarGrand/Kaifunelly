import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
   { files: ["**/*.{js,mjs,cjs,ts}"] },
   { languageOptions: { globals: globals.node } },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   {
      rules: {
         semi: ["error", "always"], // Always enforce the use of semicolons.
         quotes: ["error", "double"], // Enforce double quotes for strings.
         indent: ["error", 2, { SwitchCase: 1 }], // Use 2 spaces for indentation, with 1 level for SwitchCase.
         //  "@typescript-eslint/indent": ["error", 2], // Apply the same rule for TypeScript files
         "no-tabs": "error", // Disallow the use of tabs.
         "max-len": ["error", { code: 80 }], // Enforce a maximum line length of 80 characters.
         "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline structures.
         "object-curly-spacing": ["error", "always"], // Enforce spaces inside curly braces.
         "arrow-parens": ["error", "always"], // Always require parentheses around arrow function arguments.
         "eol-last": ["error", "always"], // Require a newline at the end of the file.
         "linebreak-style": ["error", "unix"], // Enforce Unix-style line endings (LF).
         "no-unused-vars": "off", // Disable the default ESLint rule
         "@typescript-eslint/no-unused-vars": ["warn"], // Use the TypeScript-specific rule instead
      },
      ignores: ["eslint.config.mjs", "node_modules/"], // Ignore specified files or directories.
   },
];
