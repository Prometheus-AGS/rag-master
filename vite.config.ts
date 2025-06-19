import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import path from "path"

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
    
    // TEMPLATE CORS CONFIGURATION
    // This template is configured with completely unrestricted CORS to ensure
    // maximum compatibility when used from any domain or environment.
    //
    // ⚠️  SECURITY NOTE: This configuration is intended for template/development use.
    // For production deployments, configure appropriate CORS restrictions based on
    // your specific security requirements.
    //
    // The unrestricted CORS allows:
    // - Cross-domain API requests without proxy
    // - Embedded iframe usage from any domain
    // - CDN and external hosting compatibility
    // - Development from any local or remote environment
    cors: {
      origin: true,  // Allow ANY origin - no restrictions
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
      allowedHeaders: ['*'],  // Allow ANY headers
      credentials: true,  // Allow credentials (cookies, auth headers)
      preflightContinue: false,  // Handle preflight automatically
      optionsSuccessStatus: 204  // Proper OPTIONS response status
    }
  },

  // Preview server configuration with same unrestricted CORS
  preview: {
    cors: {
      origin: true,  // Allow ANY origin - no restrictions
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
      allowedHeaders: ['*'],  // Allow ANY headers
      credentials: true,  // Allow credentials (cookies, auth headers)
      preflightContinue: false,  // Handle preflight automatically
      optionsSuccessStatus: 204  // Proper OPTIONS response status
    }
  },
}));
