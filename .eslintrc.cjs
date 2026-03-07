module.exports = {
  // Stop ESLint from searching parent directories.
  root: true,
  env: {
    // Enable modern ES globals.
    es2022: true,
  },
  // Use TypeScript-aware parser for TS/TSX files.
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // Allow JSX parsing in TSX/JSX.
    ecmaFeatures: { jsx: true },
  },
  // Additional rule sets for TS, hooks, HMR, import sorting, and Prettier.
  plugins: [
    "@typescript-eslint",
    "react-hooks",
    "react-refresh",
    "import",
    "prettier",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    // Disable ESLint rules that conflict with Prettier and run Prettier as a rule.
    "plugin:prettier/recommended",
  ],
  // Skip build outputs and dependencies.
  ignorePatterns: ["dist", "node_modules", "coverage"],
  rules: {
    // Allow explicit any to keep linting fast and flexible.
    "@typescript-eslint/no-explicit-any": "off",
    // Required for Vite React Fast Refresh.
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Keep imports grouped and ordered for readability.
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
        ],
        pathGroups: [
          { pattern: "@/**", group: "internal" },
          { pattern: "@assets/**", group: "internal" },
          { pattern: "@hooks/**", group: "internal" },
          { pattern: "@components/**", group: "internal" },
          { pattern: "@services/**", group: "internal" },
          { pattern: "@pages/**", group: "internal" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
  },
  overrides: [
    {
      // Node globals for server code.
      files: ["src/server/**/*.{ts,js}"],
      env: { node: true },
    },
    {
      // Browser globals for client code.
      files: ["src/client/**/*.{ts,tsx,js,jsx}", "src/*.{ts,tsx,js,jsx}"],
      env: { browser: true },
    },
  ],
};
