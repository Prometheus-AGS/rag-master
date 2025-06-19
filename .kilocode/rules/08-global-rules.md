# Global Rules

1. Never generate a file with more than 500 lines of code. Break the logic and abstraction up into consumable chunks if longer than that
2. Use CLEAN architecture wherever possible, so there are common patterns recognizable by developers and AI engines
3. When generating code, ALWAYS check with context7 mcp server to validate before finalizing. As a backup if context7 has no content or the problem is hard, validate methodology using web search via tavily mcp server
4. Keep track of the number of passes at solving a new problem or handling a bug using MCP memory. If the problem takes more than 3 passes to fix, step back and refactor the code, because that means there is a problem with structure
5. Use the sequential thinking mcp server for every pass at generation or solving a problem after the first one
6. After every successful code generation or bug fix where there are no errors or warnings, generate a memory to describe what was done and why it worked
