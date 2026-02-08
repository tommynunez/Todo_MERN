🔍 Quote Usage Review Guidelines

1. JavaScript (non-JSX)

- Ensure single quotes are used for:
- Variable assignments
- Object keys (when quoted)
- Array values
- Function parameters
- General string literals
- Confirm consistency with common React ecosystem conventions and Prettier defaults.
  Example (correct):
  const name = 'Thomas';
  const items = ['a', 'b', 'c'];

2. JSX Attributes

- Ensure double quotes are used for JSX attribute values.
- JSX should visually resemble HTML, and double quotes are the standard.
Example (correct):
<div className="container">
  <input type="text" placeholder="Enter name" />
</div>

3. JSX Expressions

- Ensure curly braces are used instead of quotes when embedding JavaScript expressions.
Example (correct):
<div className={isActive ? 'active' : 'inactive'} />

4. Mixed Quote Scenarios

- When strings contain quotes, ensure the outer quote minimizes escaping.
- Encourage readability and clarity.
  Example:
  const msg = "Thomas said 'hello'";
  const html = '<div class="box"></div>';

5. Tooling Alignment

- Verify that Prettier and ESLint rules are configured to enforce:
- singleQuote: true for JS
- jsxSingleQuote: false for JSX
- Confirm no conflicting rules exist in .eslintrc, .prettierrc, or Vite config.

🎯 What Copilot Should Output During Review
When reviewing code, Copilot should:

- Identify inconsistent quote usage
- Suggest corrections aligned with the above conventions
- Flag files where Prettier formatting is not applied
- Recommend enabling or fixing Prettier + ESLint integration
- Provide examples of corrected code when needed
