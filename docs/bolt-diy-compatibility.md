# Bolt.diy Webcontainer Compatibility Guide

This document provides comprehensive technical information about the compatibility fixes implemented to make the Prometheus Bolt Template work seamlessly with bolt.diy's webcontainer environment.

## Overview

Bolt.diy uses webcontainers, a browser-based Node.js runtime that has specific limitations and requirements. This template has been optimized to work within these constraints while maintaining full functionality and performance.

## Webcontainer Limitations

Webcontainers have several key limitations that affect dependency choices:

### 1. Native Module Restrictions
- Cannot run native Node.js modules that require compilation
- No access to system-level APIs or file system operations outside the container
- Limited support for modules that use native bindings

### 2. Pure JavaScript Requirement
- All dependencies must be pure JavaScript or have pure JavaScript alternatives
- Binary dependencies and native addons are not supported
- Build tools must work entirely in the browser environment

### 3. Memory and Performance Constraints
- Limited memory allocation compared to local development
- Network-based module resolution can be slower
- Build processes must be optimized for browser execution

## Compatibility Changes Made

### 1. Tailwind CSS Migration (v4 → v3)

**Problem**: Tailwind CSS v4 uses the `@tailwindcss/oxide` engine, which includes native Rust binaries that cannot run in webcontainers.

**Solution**: Migrated to Tailwind CSS v3 with standard PostCSS processing.

#### Changes Made:

**Package.json Dependencies:**
```json
// Before (v4)
"@tailwindcss/vite": "^4.1.8",
"tailwindcss": "^4.1.8"

// After (v3)
"tailwindcss": "^3.4.0",
"autoprefixer": "^10.4.16",
"postcss": "^8.4.32"
```

**PostCSS Configuration:**
```javascript
// postcss.config.js (new file)
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Vite Configuration:**
```typescript
// vite.config.ts - Removed @tailwindcss/vite plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Standard CSS processing through PostCSS
})
```

**CSS Syntax Migration:**
```css
/* Before (v4 syntax) */
@import "tailwindcss";

/* After (v3 syntax) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Build Tool Optimization

**Vite Configuration Updates:**
- Removed native plugin dependencies
- Ensured all build processes use pure JavaScript
- Optimized for webcontainer memory constraints

**TypeScript Configuration:**
- Maintained strict typing without native dependencies
- Ensured all type checking works in browser environment

## Dependency Compatibility Guidelines

When adding new dependencies to this template, follow these guidelines to maintain webcontainer compatibility:

### ✅ Safe Dependencies
- Pure JavaScript packages
- Packages with no native dependencies
- Browser-compatible build tools
- CSS-in-JS solutions
- Standard React ecosystem packages

### ❌ Avoid These Dependencies
- Packages with native bindings (`.node` files)
- Tools requiring system-level access
- Dependencies with Rust, C++, or other compiled components
- File system manipulation libraries
- OS-specific utilities

### 🔍 How to Check Compatibility

1. **Check package.json dependencies:**
   ```bash
   # Look for native dependencies
   npm ls --depth=0 | grep -E "(native|binding|addon)"
   ```

2. **Review package contents:**
   - Check for `.node` files in node_modules
   - Look for `binding.gyp` or similar build files
   - Review package.json for `gypfile` or native scripts

3. **Test in webcontainer:**
   - Always test new dependencies in bolt.diy
   - Monitor for installation or runtime errors
   - Check browser console for compatibility issues

## Migration Notes: Tailwind v4 to v3

### Syntax Differences

**Import Statements:**
```css
/* v4 */
@import "tailwindcss";

/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Configuration:**
```typescript
// v4 - tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // v4 specific options
} satisfies Config

// v3 - tailwind.config.ts (compatible)
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

### Feature Compatibility

Most Tailwind CSS features work identically between v3 and v4:
- ✅ All utility classes
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Custom themes
- ✅ Plugin system

**Notable Differences:**
- v4's performance optimizations are not available
- Some advanced v4 features may need alternative implementations
- Build times may be slightly longer with v3

## Best Practices for Webcontainer Development

### 1. Dependency Management
```bash
# Always check dependency compatibility before adding
yarn add <package-name>
# Test immediately in bolt.diy environment
```

### 2. Build Optimization
```typescript
// vite.config.ts - Optimize for webcontainer
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk sizes for webcontainer
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
```

### 3. Development Workflow
1. Develop locally with full toolchain
2. Test regularly in bolt.diy webcontainer
3. Monitor for compatibility issues
4. Document any workarounds needed

## Troubleshooting Common Issues

### Installation Failures
```bash
# Error: Package requires native compilation
# Solution: Find pure JavaScript alternative

# Error: Module not found in webcontainer
# Solution: Check package.json exports and browser field
```

### Runtime Errors
```javascript
// Error: Cannot resolve native module
// Check for dynamic imports of native modules

// Error: File system access denied
// Use browser-compatible alternatives for file operations
```

### Build Failures
```bash
# Error: Plugin requires Node.js APIs
# Solution: Use browser-compatible build plugins

# Error: Out of memory during build
# Solution: Optimize build configuration for smaller chunks
```

## Performance Considerations

### Bundle Size Optimization
- Use tree shaking to eliminate unused code
- Implement code splitting for large applications
- Monitor bundle size with tools like `webpack-bundle-analyzer`

### Memory Management
- Avoid large dependencies in webcontainer environment
- Use lazy loading for non-critical components
- Implement proper cleanup in React components

### Build Performance
- Minimize the number of build steps
- Use efficient PostCSS plugins
- Cache build artifacts when possible

## Future Compatibility

### Monitoring Updates
- Watch for webcontainer capability improvements
- Monitor Tailwind CSS v4 webcontainer support
- Stay updated on bolt.diy platform changes

### Migration Path
When webcontainer support improves:
1. Test new capabilities in development environment
2. Gradually migrate to newer versions
3. Maintain backward compatibility
4. Update documentation accordingly

## Testing Checklist

Before deploying changes to bolt.diy:

- [ ] All dependencies are pure JavaScript
- [ ] No native modules in dependency tree
- [ ] Build completes successfully in webcontainer
- [ ] Application runs without console errors
- [ ] All features work as expected
- [ ] Performance is acceptable
- [ ] Hot reload functions properly

## Support and Resources

### Documentation
- [Bolt.diy Documentation](https://bolt.diy/docs)
- [Webcontainer API Reference](https://webcontainers.io/api)
- [Tailwind CSS v3 Documentation](https://tailwindcss.com/docs)

### Community
- [Bolt.diy Discord](https://discord.gg/bolt)
- [StackBlitz Community](https://stackblitz.com/community)
- [Webcontainer GitHub Discussions](https://github.com/stackblitz/webcontainer-core/discussions)

---

This compatibility guide ensures the Prometheus Bolt Template works seamlessly in bolt.diy while maintaining all functionality and development experience quality.
