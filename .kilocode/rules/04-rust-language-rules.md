# Rust Language Rules

1. Follow all Rust best practices
2. Keep code short and concise--between 10 and 30 lines max
3. A good policy regarding the use of `into()` and `unwrap()` in Rust is to use them thoughtfully, considering clarity, safety, and production-readiness.

   For `unwrap()`:
   - Avoid using `unwrap()` (and `expect()`) in production code, as it can cause your program to panic at runtime if called on an `Err` or `None` value
   - Instead, prefer explicit error handling using `match`, `if let`, combinators like `unwrap_or`, `unwrap_or_else`, or propagating errors with the `?` operator
   - Reserve `unwrap()` and `expect()` for scenarios where you are absolutely certain a value cannot fail, but always document your reasoning

   For `into()`:
   - Using `.into()` is generally safe as it's used for type conversions and helps make your code concise and generic
   - Ensure conversions with `.into()` are explicit and clear to readers, especially when the target type is not obvious from context

4. ALWAYS check with the context mcp server and check the web using the tavily mcp server to get the latest APIs and information before finalizing code generation
5. Check every bug fix twice for syntax and other errors
6. Always check for existing types that might do the job you need before creating new types
7. Always favor the simpler code solution, because Rust can be overly verbose
