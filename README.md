# Prometheus Bolt Template

A professional, production-ready React + Tauri template designed for AI-powered development workflows. This template provides a modern foundation for building cross-platform applications with React 19, Vite 6, and Tauri 2, optimized for use with AI development tools like the Prometheus AI platform and Bolt.diy.

## 🚀 Bolt.diy Compatible

This template is **fully compatible** with [Bolt.diy](https://bolt.diy) webcontainer environments! Deploy and develop instantly in your browser with zero setup required.

[![Deploy to Bolt.diy](https://img.shields.io/badge/Deploy%20to-Bolt.diy-blue?style=for-the-badge&logo=stackblitz)](https://bolt.diy)

### One-Click Deployment
1. Open [Bolt.diy](https://bolt.diy) in your browser
2. Import this template or paste the repository URL
3. Start coding immediately with full hot-reload support
4. All dependencies work seamlessly in the webcontainer environment

### Webcontainer Optimizations
- **Pure JavaScript dependencies** - No native modules that break in webcontainers
- **Tailwind CSS v3** - Optimized for browser-based build environments
- **Standard PostCSS processing** - Compatible with webcontainer limitations
- **Optimized bundle sizes** - Fast loading in browser environments

> 📖 **Detailed Technical Information**: See [`docs/bolt-diy-compatibility.md`](docs/bolt-diy-compatibility.md) for comprehensive technical details about webcontainer compatibility.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) (v4.9.2 or higher)
- [Rust](https://rustup.rs/) (latest stable)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd prometheus-bolt-template

# Install dependencies
yarn install

# Start development server (web only)
yarn dev

# Start Tauri development (desktop app)
yarn dev:tauri
```

### Build for Production

```bash
# Build web application
yarn build

# Build desktop application
yarn build:tauri
```

## 📋 Technology Stack

This template uses a carefully curated modern stack:

### Frontend
- **React 19** - Latest React with concurrent features and server components support
- **Vite 6** - Ultra-fast development server and build tool
- **TypeScript 5.8.3** - Full type safety with strict configuration
- **Tailwind CSS 3.4.0** - Utility-first CSS framework optimized for webcontainer compatibility

### UI & Components
- **Shadcn-UI** - Professional, accessible UI components built on Radix UI
- **Lucide React** - Beautiful, customizable icons
- **Tailwind CSS Animate** - Smooth animations and transitions

### State Management & Validation
- **Zustand** - Lightweight, flexible state management
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Performant forms with easy validation

### Desktop & Mobile
- **Tauri 2** - Build native desktop applications with Rust backend
- **Cross-platform support** - Windows, macOS, and Linux

### AI Integration
- **CoPilotKit** - Ready for AI-powered features and chatbots
- **Optimized for AI development** - Structured for natural language programming

## 🏗️ Project Structure

```
prometheus-bolt-template/
├── src/                          # React application source
│   ├── components/
│   │   └── ui/                   # Shadcn-UI components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   ├── App.tsx                   # Main application component
│   └── main.tsx                  # Application entry point
├── src-tauri/                    # Tauri (Rust) backend
│   ├── src/
│   │   ├── main.rs              # Tauri application entry
│   │   └── lib.rs               # Rust backend logic
│   ├── Cargo.toml               # Rust dependencies
│   └── tauri.conf.json          # Tauri configuration
├── .kilocode/                    # Development rules and guidelines
│   └── rules/                    # Coding standards and best practices
├── public/                       # Static assets
├── package.json                  # Node.js dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── components.json              # Shadcn-UI configuration
```

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
yarn dev              # Start web development server (localhost:1420)
yarn dev:tauri        # Start Tauri development with hot reload
yarn preview          # Preview production build

# Building
yarn build            # Build web application for production
yarn build:tauri      # Build desktop application

# Tauri specific
yarn tauri            # Access Tauri CLI commands
```

### Development Server

The development server runs on `http://localhost:1420` with:
- Hot Module Replacement (HMR)
- TypeScript compilation
- Tailwind CSS processing
- Automatic browser refresh

### Tauri Development

When running `yarn dev:tauri`:
- Rust backend compiles automatically
- Frontend hot-reloads in desktop window
- Native OS integration available
- Debug tools accessible

## 🎯 Architecture Overview

### Monorepo Structure

This template follows a monorepo pattern where:
- **Web and Desktop apps share the same React codebase**
- **Rust backend serves as the proxy to external services**
- **All UI components are reusable across platforms**
- **State management is centralized and platform-agnostic**

### Clean Architecture Principles

The codebase follows CLEAN architecture patterns:
- **Separation of concerns** between UI, business logic, and data
- **Dependency inversion** with interfaces and abstractions
- **Modular design** with clear boundaries between layers
- **Testable components** with minimal external dependencies

### TypeScript Configuration

Strict TypeScript setup with:
- **No `any` types** - Explicit typing required
- **Path aliases** for clean imports (`@/components`, `@/hooks`, etc.)
- **Strict mode enabled** with comprehensive linting
- **Component isolation** - No direct store access from components

## 📐 Development Rules & Guidelines

This template includes a comprehensive rule system in `.kilocode/rules/` that enforces:

### TypeScript Rules
- No use of `any` type explicitly or implicitly
- Strongly typed properties and function parameters only
- Components must not talk directly to stores—only to hooks

### Rust Rules
- Keep functions short and concise (10-30 lines max)
- Thoughtful error handling with `match`, `if let`, or `?` operator
- Avoid `unwrap()` and `expect()` in production code
- Validate APIs with external sources before implementation

### UI/UX Guidelines
- Simple, elegant, flat interfaces
- Mobile and desktop responsive design
- Meaningful animations for user guidance
- Consistent design system with Shadcn-UI

### Code Organization
- Files under 500 lines maximum
- Modular, maintainable structure
- Descriptive naming conventions
- Clean architecture patterns

### Database & Data Modeling
- UUID primary keys for all entities
- Metadata-driven models with JSON Schema validation
- PostgreSQL JSONB for flexible schema evolution
- Row-level security (RLS) policies

## 🤖 AI-Powered Development

This template is specifically designed for AI-assisted development:

### Optimized for Natural Language Programming
- Clear, semantic code structure
- Comprehensive type definitions
- Well-documented components and functions
- Consistent patterns recognizable by AI

### Integration with AI Tools
- **Prometheus AI Platform** - Advanced AI development environment
- **Bolt.diy** - Natural language to code generation with full webcontainer compatibility
- **CoPilotKit** - In-app AI features and chatbots
- **Context-aware development** - MCP server integration

> 🔧 **Webcontainer Compatibility**: This template is fully optimized for bolt.diy's webcontainer environment. See [`docs/bolt-diy-compatibility.md`](docs/bolt-diy-compatibility.md) for technical details.

### AI-Friendly Rust Code
- Prioritize simplicity and clarity over cleverness
- Comprehensive error handling patterns
- Explicit type annotations
- Standard layouts and conventions

## 🚀 Deployment

### Web Deployment
The built web application (`dist/` folder) can be deployed to:
- Vercel, Netlify, or similar static hosting
- AWS S3 + CloudFront
- Any web server supporting SPA routing

### Desktop Distribution
Tauri applications can be distributed as:
- **Windows**: `.msi` installer or `.exe` executable
- **macOS**: `.dmg` disk image or `.app` bundle
- **Linux**: `.deb`, `.rpm`, or `.AppImage` packages

### Build Configuration
- Production builds are optimized and minified
- Desktop apps include auto-updater capability
- Code signing available for distribution

## 🔧 Configuration

### Environment Variables
Create `.env` files for environment-specific configuration:

```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My Application
```

### Tauri Configuration
Modify `src-tauri/tauri.conf.json` for:
- Application metadata (name, version, identifier)
- Window properties (size, title, permissions)
- Build targets and bundle settings
- Security policies and CSP rules

### Tailwind Customization
Extend `tailwind.config.ts` for:
- Custom color schemes and themes
- Typography and spacing scales
- Component-specific styles
- Animation and transition effects

## 🧪 Testing

### Recommended Testing Stack
```bash
# Add testing dependencies
yarn add -D vitest @testing-library/react @testing-library/jest-dom
```

### Test Structure
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── hooks/
│   ├── useCounter.ts
│   └── __tests__/
│       └── useCounter.test.ts
```

## 🤝 Contributing

### Development Guidelines
1. Follow the established rule system in `.kilocode/rules/`
2. Maintain TypeScript strict mode compliance
3. Keep components under 500 lines
4. Use semantic commit messages
5. Test changes across web and desktop platforms

### Code Quality
- ESLint and Prettier configuration included
- Pre-commit hooks for code formatting
- TypeScript strict mode enforced
- Component and hook testing recommended

## 📚 Learning Resources

### Documentation
- [React 19 Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tauri Documentation](https://tauri.app/)
- [Shadcn-UI Components](https://ui.shadcn.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

### AI Development
- [Prometheus AI Platform](https://prometheus.ai/)
- [Bolt.diy Documentation](https://bolt.diy/)
- [CoPilotKit Guide](https://copilotkit.ai/)
- [Webcontainer Compatibility Guide](docs/bolt-diy-compatibility.md) - Technical details for bolt.diy development

## 🆘 Troubleshooting

### Common Issues

**Tauri build fails:**
```bash
# Ensure Rust is installed and up to date
rustup update
```

**TypeScript errors:**
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
yarn install
```

**Vite dev server issues:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
yarn dev
```

**Webcontainer/Bolt.diy issues:**
```bash
# Dependency installation fails
# Check if dependency has native modules - see docs/bolt-diy-compatibility.md

# Build fails in webcontainer
# Ensure all dependencies are pure JavaScript
# Check PostCSS configuration is correct

# Hot reload not working
# Refresh the browser tab in bolt.diy
# Check browser console for errors
```

### Getting Help
- Check the [Tauri Discord](https://discord.com/invite/tauri)
- Review [React GitHub Discussions](https://github.com/facebook/react/discussions)
- Consult [Vite GitHub Issues](https://github.com/vitejs/vite/issues)

## 📄 License

This template is created by **Prometheus Agentic Growth Solutions** for the Prometheus AI platform and Bolt.diy ecosystem.

---

**Ready to build the future with AI-powered development?** 🚀

Start with this template in the Prometheus AI platform, Bolt.diy, or clone it locally to begin building production-ready applications with natural language programming.
