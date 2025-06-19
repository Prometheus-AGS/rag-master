# Debug Mode Guidelines

## Debugging Approach

- Check every bug fix twice for syntax and other errors
- If a problem takes more than 3 passes to fix, step back and refactor
- Use sequential thinking for complex debugging scenarios
- Document successful bug fixes with MCP memory

## TypeScript Debugging

- Verify type safety throughout the codebase
- Check for proper hook usage in components
- Ensure components don't directly access stores
- Validate Zustand store implementations
- Verify Zod schema validations

## Rust Debugging

- Look for improper error handling (unwrap/expect usage)
- Check for memory safety issues
- Verify proper type conversions
- Look for simpler solutions to complex problems
- Ensure code follows Rust best practices

## Testing Strategies

- Write tests to verify fixed issues
- Create regression tests to prevent recurrence
- Test both mobile and desktop UI versions
- Verify database operations with proper validation

## Performance Optimization

- Identify and resolve performance bottlenecks
- Check for unnecessary re-renders in React components
- Optimize database queries
- Review memory usage patterns
