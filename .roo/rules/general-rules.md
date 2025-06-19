# Project Guidelines for Windsurf Code Generation

## Project Configuration

- Yarn is the package manager for this project

## Technology Stack

- React 19
- Vite 6
- Zustand
- Zod
- Shadcn-UI for User Interface
- CoPilotKit for AI
- Monorepo structure:
  - Mobile and Desktop using Tauri
  - Web using React/Vite
  - Backend code in Rust as proxy to the outside world

## TypeScript Rules

- No use of `any` type explicitly or implicitly
- Strongly typed properties and function parameters only
- Components must not talk directly to stores—only to hooks that set up and talk to the stores on their behalf

## Global Rules

- Never generate a file with more than 500 lines of code
- Use CLEAN architecture for recognizable patterns
- Validate code with context7 mcp server or tavily web search
- Track problem-solving passes with MCP memory
- Use sequential thinking for complex problems
- Document successful code generation and bug fixes
