# Code Mode Guidelines

## TypeScript Implementation

- No use of `any` type explicitly or implicitly
- Strongly typed properties and function parameters only
- Components must not talk directly to stores—only to hooks
- Follow React 19 best practices
- Use Zustand for state management
- Validate data with Zod schemas
- Implement Shadcn-UI components for consistent UI
- Integrate CoPilotKit for AI features

## Rust Implementation

- Follow all Rust best practices
- Keep functions short and concise (10-30 lines max)
- Handle errors thoughtfully:
  - Avoid `unwrap()` and `expect()` in production code
  - Use `match`, `if let`, or `?` operator for error handling
  - Document any use of `unwrap()` with clear reasoning
- Use `.into()` thoughtfully with clear type conversions
- Verify API usage with context7 or tavily before implementation
- Double-check bug fixes for syntax errors
- Reuse existing types when possible
- Favor simpler code solutions over verbose implementations

## AI-Friendly Rust Code

- Prioritize simplicity and clarity over cleverness
- Use comprehensive and standard error handling
- Add explicit type annotations where appropriate
- Follow standard code layouts and conventions
- Minimize `unsafe` and manual memory management
- Include clear comments and docstrings
- Ensure code passes linting and formatting checks
- Use stable, well-documented features and APIs
- Include tests and examples
- Break problems into clear subproblems

## Code Organization

- Keep files under 500 lines
- Split logic into consumable chunks
- Use descriptive file and function names
- Organize code in a modular, maintainable structure
