// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";

// export default [
//   { ignores: ["dist"] },
//   {
//     files: ["**/*.{js,jsx}"],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         ecmaFeatures: { jsx: true },
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ];

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
