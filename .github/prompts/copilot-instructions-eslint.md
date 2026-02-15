# ESLint Configuration - Best Practices

## Comprehensive ESLint Setup for TypeScript + React + Vite

### Installation

```bash
npm install -D eslint @eslint/js @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D eslint-plugin-jsx-a11y eslint-plugin-import
npm install -D eslint-config-prettier
npm install -D typescript-eslint
```

### ESLint Configuration (eslint.config.js - Flat Config)

```javascript
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  
  // Global ignores
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      'vite.config.ts',
    ],
  },

  // Main configuration
  {
    files: ['**/*.{ts,tsx}'],
    
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'import': importPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },

    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/strict-boolean-expressions': [
        'warn',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // React rules
      'react/prop-types': 'off', // Using TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/jsx-uses-react': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/hook-use-state': 'warn',
      'react/jsx-no-leaked-render': 'warn',
      'react/jsx-props-no-spreading': 'off', // Allow prop spreading

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useMyCustomHook|useAnotherCustomHook)',
        },
      ],

      // React Refresh (Vite HMR)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',

      // Import rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',

      // General best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-param-reassign': ['error', { props: true }],
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'default-case-last': 'error',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },

  // Prettier compatibility (disable conflicting rules)
  prettierConfig,
);
```

### Legacy ESLintRC Format (if needed)

```json
// .eslintrc.json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "react-refresh",
    "jsx-a11y",
    "import"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  },
  "rules": {
    // Copy rules from flat config above
  },
  "ignorePatterns": [
    "dist",
    "build",
    "node_modules",
    "coverage",
    "*.config.js",
    "*.config.ts"
  ]
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "check": "npm run type-check && npm run lint"
  }
}
```

### TypeScript Configuration for ESLint

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### VS Code Settings for Auto-Fix on Save

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Custom ESLint Rules Examples

### Enforce Naming Conventions

```javascript
'@typescript-eslint/naming-convention': [
  'error',
  // Interfaces must start with I
  {
    selector: 'interface',
    format: ['PascalCase'],
    custom: {
      regex: '^I[A-Z]',
      match: false, // We DON'T require I prefix (modern practice)
    },
  },
  // Type aliases in PascalCase
  {
    selector: 'typeAlias',
    format: ['PascalCase'],
  },
  // Enums in PascalCase
  {
    selector: 'enum',
    format: ['PascalCase'],
  },
  // Boolean variables should start with is/has/should
  {
    selector: 'variable',
    types: ['boolean'],
    format: ['PascalCase'],
    prefix: ['is', 'has', 'should', 'can', 'did', 'will'],
  },
  // Constants in UPPER_CASE
  {
    selector: 'variable',
    modifiers: ['const'],
    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
  },
  // React components in PascalCase
  {
    selector: 'function',
    format: ['camelCase', 'PascalCase'],
  },
],
```

### Complexity Rules

```javascript
'complexity': ['warn', 10],
'max-depth': ['warn', 4],
'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
'max-params': ['warn', 4],
```

## ESLint + Prettier Integration

### Prettier Configuration

```json
// .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "jsxBracketSameLine": false
}
```

### Prettier Ignore

```
// .prettierignore
dist
build
node_modules
coverage
*.min.js
pnpm-lock.yaml
package-lock.json
```

## Pre-commit Hooks with Husky + lint-staged

### Installation

```bash
npm install -D husky lint-staged
npx husky init
```

### Configuration

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
npm run lint-staged
npm run type-check
```

## Review Checklist - ESLint

- [ ] No `any` types without explicit `eslint-disable` comment
- [ ] All functions have explicit return types
- [ ] Consistent import ordering
- [ ] No unused variables or imports
- [ ] React hooks dependency arrays are correct
- [ ] No `console.log` in production code
- [ ] Accessibility rules passing
- [ ] No ESLint warnings (max-warnings: 0)
- [ ] Type checking passes (`tsc --noEmit`)
- [ ] Complexity metrics within limits
- [ ] Naming conventions followed
- [ ] Pre-commit hooks configured and running
