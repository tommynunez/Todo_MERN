# Codebase Pattern Analyzer & Prompt Generator

You are an expert software architect analyzing a codebase to extract and document its architectural patterns, conventions, and best practices. Your goal is to generate a comprehensive prompt that engineers on this team can use when working with AI coding assistants to ensure consistency, scalability, and adherence to established patterns.

## Your Task

Analyze the provided codebase and generate a detailed "Engineering Guidelines Prompt" that covers:

### 1. Component Architecture Patterns

- Identify the component structure (atomic design, feature-based, etc.)
- Document component composition patterns (how components are built and nested)
- Extract naming conventions for components, props, and files
- Identify patterns for component reusability and abstraction
- Note how shared/common components are structured vs page-specific components

### 2. Data Fetching Patterns

- Identify the data fetching strategy (React Query, SWR, Redux Toolkit, native fetch, etc.)
- Document where data fetching happens (hooks, components, services, API layer)
- Extract patterns for error handling and loading states
- Note caching strategies if present
- Document how API endpoints are organized and called

### 3. State Management

- Identify state management approach (Context, Redux, Zustand, local state, etc.)
- Document when to use global vs local state
- Extract patterns for state updates and side effects
- Note any state normalization patterns

### 4. Code Quality & Standards

- Extract ESLint rules and coding standards
- Identify TypeScript patterns and type organization
- Document file/folder naming conventions
- Note import organization patterns
- Identify formatting standards (Prettier config, etc.)

### 5. Styling Patterns

- Identify styling approach (CSS Modules, Styled Components, Tailwind, etc.)
- Document theme/design token usage
- Extract responsive design patterns
- Note component styling conventions

### 6. Testing Patterns

- Identify testing frameworks and approaches
- Document what gets tested and how
- Extract patterns for mocks and fixtures
- Note coverage expectations

### 7. File Organization

- Document folder structure philosophy
- Identify co-location patterns
- Note where different types of files live (utils, hooks, types, etc.)

### 8. Common Anti-Patterns to Avoid

- Based on existing code, identify what NOT to do
- Document technical debt patterns that shouldn't be replicated
- Note deprecated patterns being phased out

## Output Format

Generate a prompt in this structure:

---

# [Project Name] Engineering Guidelines for AI-Assisted Development

## Context

[Brief description of the application, its tech stack, and architectural philosophy]

## Component Development Guidelines

When creating or modifying React components:

**Structure:**
[Specific patterns found in codebase]

**Naming:**
[Conventions extracted from codebase]

**Reusability:**
[Patterns for shared components vs one-offs]

**Example Pattern:**

```[language]
[Actual example from codebase]
```

## Data Fetching Guidelines

When implementing data fetching:

**Approach:**
[Specific library/pattern used]

**Location:**
[Where data fetching should happen]

**Error Handling:**
[Standard pattern]

**Example Pattern:**

```[language]
[Actual example from codebase]
```

## State Management Guidelines

[Similar detailed breakdown]

## Code Quality Standards

**ESLint Rules:**
[Key rules from eslintrc]

**TypeScript:**
[Type patterns and conventions]

**Import Organization:**
[Specific order and grouping]

**Example:**

```[language]
[Show proper import organization]
```

## Styling Guidelines

[Detailed styling approach]

## Testing Requirements

[Testing patterns and expectations]

## File Organization

```
[Show actual folder structure with explanations]
```

## Anti-Patterns - DO NOT

❌ [Specific things found in code that shouldn't be replicated]
❌ [Common mistakes to avoid]
❌ [Deprecated patterns]

## When Using AI Coding Assistants

Before generating code, provide this context:
"This project follows [key architectural principles]. Please ensure generated code:

- [Key requirement 1]
- [Key requirement 2]
- [etc.]"

Always review AI-generated code for:

- [ ] Follows component patterns
- [ ] Uses correct data fetching approach
- [ ] Adheres to naming conventions
- [ ] Maintains reusability
- [ ] Passes linting
- [ ] Includes proper TypeScript types

---

## Analysis Instructions

To use this meta-prompt:

1. **Provide key files from your codebase:**
   - 3-5 representative components (mix of simple and complex)
   - Main data fetching examples (API hooks, services, etc.)
   - ESLint and TypeScript configs
   - Package.json
   - Folder structure overview
   - Any existing style guide or documentation

2. **Run the analysis:**
   Paste this prompt with your files and ask: "Analyze these files and generate our Engineering Guidelines Prompt following the structure above."

3. **Refine the output:**
   Review the generated prompt and adjust based on your team's specific needs and any patterns the AI might have missed.

4. **Distribute to team:**
   Save the generated prompt in your repository (e.g., `.github/AI_CODING_GUIDELINES.md`) and have engineers prepend it (or reference it) when using AI coding assistants.

## Example Usage for Engineers

When an engineer needs to build a new feature, they would:

1. Read the generated guidelines prompt
2. When using an AI assistant (Claude, Copilot, etc.), include context like:
   "I'm working on [Project Name]. Please follow our engineering guidelines: [paste relevant sections]. I need to build [specific feature]."

3. Review the AI output against the checklist in the guidelines

---

## Optional: Automatic Enforcement

Consider creating a custom GPT or Claude Project with your generated guidelines as the system prompt, so engineers always have the context automatically applied.
