# GitHub Copilot Instructions - Master Guide

This repository contains comprehensive code review guidelines for building scalable TypeScript applications with React and Vite, following clean architecture principles and industry best practices.

## 📚 Instruction Files

### 1. [TypeScript Best Practices](./copilot-instructions-typescript.md)
Core TypeScript patterns and principles for senior-level code quality.

**Topics covered:**
- Type safety and explicit typing
- Avoiding `any` and proper use of utility types
- Error handling patterns
- Scalability considerations
- Performance patterns
- Comprehensive review checklist

**Use when:** Reviewing any TypeScript code, type definitions, or general code quality

---

### 2. [React + Vite Best Practices](./copilot-instructions-react-vite.md)
Modern React patterns optimized for Vite build tooling.

**Topics covered:**
- Component design and composition
- Hooks best practices (useState, useEffect, custom hooks)
- Performance optimization (React.memo, useMemo, useCallback)
- Context API patterns
- Code splitting and lazy loading
- Vite configuration optimization
- React Query / TanStack Query patterns

**Use when:** Reviewing React components, hooks, or Vite configuration

---

### 3. [Clean Architecture](./copilot-instructions-clean-architecture.md)
Architectural patterns for maintainable, testable, and scalable applications.

**Topics covered:**
- Layer separation (Domain, Application, Interface Adapters, Infrastructure)
- Dependency inversion principle
- Repository pattern
- Use case / application service pattern
- Folder structure organization
- Dependency injection

**Use when:** Reviewing project structure, business logic organization, or architectural decisions

---

### 4. [ESLint Configuration](./copilot-instructions-eslint.md)
Comprehensive ESLint setup with TypeScript, React, and best practices enforcement.

**Topics covered:**
- Complete ESLint configuration (Flat Config + Legacy)
- TypeScript-specific rules
- React and React Hooks rules
- Accessibility rules (jsx-a11y)
- Import ordering and organization
- Prettier integration
- Pre-commit hooks setup (Husky + lint-staged)
- VS Code integration

**Use when:** Setting up or reviewing linting configuration, code style enforcement

---

## 🎯 Quick Start

### For Code Reviews

1. **TypeScript code quality?** → Read [TypeScript Best Practices](./copilot-instructions-typescript.md)
2. **React components/hooks?** → Read [React + Vite Best Practices](./copilot-instructions-react-vite.md)
3. **Architecture/structure?** → Read [Clean Architecture](./copilot-instructions-clean-architecture.md)
4. **ESLint setup/config?** → Read [ESLint Configuration](./copilot-instructions-eslint.md)

### For New Projects

Review all four files in order:
1. Set up ESLint first (foundation)
2. Plan architecture (structure)
3. Apply TypeScript best practices (implementation)
4. Follow React patterns (UI layer)

---

## 🔍 How to Use These Instructions

### In GitHub Copilot Chat

```
@workspace Review this component following the React best practices
```

```
@workspace Does this code follow clean architecture principles?
```

```
@workspace Check if my types follow TypeScript best practices
```

### In Code Reviews

Reference specific sections:
- "This component should use React.memo - see React Best Practices > Performance Optimization"
- "Move this business logic to the domain layer - see Clean Architecture > Domain Layer"
- "Add explicit return type - see TypeScript Best Practices > Type Definitions"

### As a Learning Resource

Each file contains:
- ✅ Good examples (do this)
- ❌ Bad examples (don't do this)
- Explanations of why
- Practical code snippets
- Comprehensive checklists

---

## 📋 Complete Review Checklist

Before merging any code, ensure:

### TypeScript
- [ ] No `any` types without justification
- [ ] Explicit function return types
- [ ] Proper error handling
- [ ] Utility types used where applicable
- [ ] No type assertions without reason

### React
- [ ] Components follow single responsibility
- [ ] Props properly typed
- [ ] Custom hooks for reusable logic
- [ ] Proper dependency arrays
- [ ] No unnecessary re-renders
- [ ] Accessibility attributes present
- [ ] Error boundaries where needed

### Architecture
- [ ] Correct layer separation
- [ ] Dependencies point inward
- [ ] Business logic in domain/application layer
- [ ] No circular dependencies
- [ ] Repository pattern followed
- [ ] Use cases orchestrate properly

### Code Quality
- [ ] ESLint passes with 0 warnings
- [ ] TypeScript compilation succeeds
- [ ] Tests pass
- [ ] No console.log in production
- [ ] Code is self-documenting
- [ ] Complex logic has comments

---

## 🚀 Recommended Tools

### VS Code Extensions
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Error Lens
- Import Cost
- GitLens

### NPM Packages
```bash
# Core
npm i -D typescript @types/react @types/react-dom

# Linting
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i -D eslint-plugin-react eslint-plugin-react-hooks
npm i -D eslint-plugin-jsx-a11y eslint-plugin-import
npm i -D prettier eslint-config-prettier

# Testing
npm i -D vitest @testing-library/react @testing-library/jest-dom

# Git Hooks
npm i -D husky lint-staged
```

---

## 🎓 Philosophy

These guidelines are based on:

1. **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
2. **Clean Code** - Robert C. Martin's principles for readable, maintainable code
3. **Clean Architecture** - Separation of concerns, dependency inversion, testability
4. **DDD (Domain-Driven Design)** - Business logic as first-class citizen
5. **Modern React** - Hooks, functional components, performance best practices
6. **TypeScript Best Practices** - Full type safety, leveraging the type system

---

## 🔄 Keeping Updated

These guidelines should evolve with:
- New TypeScript/React features
- Team learnings and retrospectives
- Industry best practices updates
- Project-specific needs

**Last Updated:** February 2026

---

## 💡 Contributing to These Guidelines

When adding or modifying guidelines:
1. Provide code examples (both good and bad)
2. Explain the "why" not just the "what"
3. Include practical, real-world scenarios
4. Update the relevant checklist
5. Keep examples concise and focused

---

## 📞 Questions or Feedback?

Use GitHub Copilot Chat with:
```
@workspace Can you explain why [specific pattern] is recommended?
```

Or reference specific sections in code reviews for discussion.

---

**Remember:** These are guidelines, not rigid rules. Use judgment and consider context. The goal is maintainable, scalable, high-quality code that serves the business and the team.
