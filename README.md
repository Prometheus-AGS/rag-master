# RAG Master

**Enterprise-Grade Knowledge Base Management Platform**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-org/rag-master)
[![Version](https://img.shields.io/badge/version-0.0.0-blue)](https://github.com/your-org/rag-master/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)

RAG Master is a comprehensive knowledge base management platform that enables organizations to create, manage, and query intelligent document repositories. Built with modern web technologies and designed for enterprise-scale deployments, it provides multi-tenant support, advanced document processing capabilities, and flexible retrieval strategies for optimal information extraction.

## 🏗️ Architecture Overview

RAG Master follows a modern, scalable architecture designed for enterprise deployment across multiple platforms:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React/TS)    │◄──►│   (Node.js)     │◄──►│   (Supabase)    │
│                 │    │                 │    │   PostgreSQL    │
│   - Dashboard   │    │   - Auth        │    │   + pgvector    │
│   - KB Mgmt     │    │   - Document    │    │                 │
│   - Config UI   │    │   - Processing  │    │                 │
│   - Analytics   │    │   - Retrieval   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   File Storage  │              │
         └──────────────►│   (Supabase)    │◄─────────────┘
                        │   Storage       │
                        └─────────────────┘
                                 │
                        ┌─────────────────┐
                        │   Vector Store  │
                        │   (pgvector)    │
                        │                 │
                        │   Embedding     │
                        │   Providers:    │
                        │   - OpenAI      │
                        │   - Cohere      │
                        │   - Local       │
                        └─────────────────┘
```

### Multi-Platform Support

- **Web Application**: React 19 + Vite 6 for modern web deployment
- **Desktop Application**: Tauri 2 for native Windows, macOS, and Linux apps
- **Mobile Ready**: Responsive design optimized for mobile devices
- **API-First**: RESTful endpoints for seamless integration with external applications

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) (v4.9.2 or higher)
- [Rust](https://rustup.rs/) (latest stable, for desktop builds)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites) (for desktop development)
- [Supabase Account](https://supabase.com/) (for database and storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/rag-master.git
cd rag-master

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials and API keys

# Start development server (web only)
yarn dev

# Start Tauri development (desktop app)
yarn dev:tauri
```

### Environment Configuration

Create a `.env` file with the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Embedding Providers
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_COHERE_API_KEY=your_cohere_api_key

# Application Settings
VITE_APP_NAME=RAG Master
VITE_API_URL=http://localhost:3000
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features and server components support
- **Vite 6** - Ultra-fast development server and build tool
- **TypeScript 5.2.2** - Full type safety with strict configuration
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Shadcn-UI** - Professional, accessible UI components built on Radix UI
- **Zustand** - Lightweight, flexible state management
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Performant forms with easy validation

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL 15+
- **pgvector** - Vector similarity search extension
- **Row Level Security (RLS)** - Database-level security policies
- **Real-time subscriptions** - Live data synchronization

### Desktop & Cross-Platform
- **Tauri 2** - Build native desktop applications with Rust backend
- **Cross-platform support** - Windows, macOS, and Linux
- **Native OS integration** - File system access, notifications, system tray

### AI & Processing
- **Multiple embedding providers** - OpenAI, Cohere, local models
- **Configurable chunking strategies** - Semantic, fixed-size, recursive, sentence-based
- **Flexible retrieval methods** - Vector similarity, hybrid search, keyword matching
- **Real-time processing** - Background job queues for document processing

## 📋 Core Features

### Knowledge Base Management
- **Multi-tenant architecture** with organization-level isolation
- **CRUD operations** for knowledge bases with role-based access control
- **Configurable processing pipelines** for different document types
- **Real-time collaboration** with live updates and notifications

### Document Processing
- **Multi-format support**: PDF, DOCX, TXT, MD, HTML
- **Intelligent chunking strategies**:
  - Semantic chunking based on content structure
  - Fixed-size chunking with configurable overlap
  - Recursive character splitting for optimal context
  - Sentence-based chunking for natural language processing
- **Metadata extraction** and custom schema generation
- **Version control** and document history tracking

### Retrieval & Search
- **Vector similarity search** using pgvector for semantic matching
- **Hybrid search** combining vector and keyword approaches
- **Re-ranking algorithms** for improved result relevance
- **Configurable retrieval strategies** per knowledge base
- **Real-time search** with sub-200ms response times

### API Integration
- **RESTful API endpoints** for all operations
- **API key management** with scoped permissions
- **Webhook support** for real-time integrations
- **Rate limiting** and usage analytics
- **OpenAPI specification** with interactive documentation

## 🏗️ Project Structure

```
rag-master/
├── src/                          # React application source
│   ├── components/
│   │   ├── ui/                   # Shadcn-UI components
│   │   ├── auth/                 # Authentication components
│   │   ├── dashboard/            # Dashboard and analytics
│   │   ├── knowledge-base/       # KB management components
│   │   ├── documents/            # Document upload and management
│   │   └── layout/               # Layout and navigation
│   ├── hooks/                    # Custom React hooks
│   ├── stores/                   # Zustand state management
│   ├── lib/                      # Utility functions and configurations
│   ├── types/                    # TypeScript type definitions
│   └── App.tsx                   # Main application component
├── src-tauri/                    # Tauri (Rust) backend
│   ├── src/
│   │   ├── main.rs              # Tauri application entry
│   │   └── lib.rs               # Rust backend logic
│   ├── Cargo.toml               # Rust dependencies
│   └── tauri.conf.json          # Tauri configuration
├── supabase/                     # Database schema and migrations
│   ├── migrations/              # SQL migration files
│   ├── seed.sql                 # Initial data seeding
│   └── config.toml              # Supabase configuration
├── docs/                         # Documentation
│   ├── technical-specification.md
│   ├── api-documentation.md
│   └── deployment-guide.md
├── public/                       # Static assets
├── package.json                  # Node.js dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── components.json              # Shadcn-UI configuration
```

## 🔧 Development Workflow

### Available Scripts

```bash
# Development
yarn dev              # Start web development server (localhost:1420)
yarn dev:tauri        # Start Tauri development with hot reload
yarn preview          # Preview production build

# Building
yarn build            # Build web application for production
yarn build:tauri      # Build desktop application

# Database
yarn db:generate      # Generate database types
yarn db:migrate       # Run database migrations
yarn db:seed          # Seed database with initial data

# Code Quality
yarn lint             # Run ESLint
yarn type-check       # Run TypeScript compiler check
yarn format           # Format code with Prettier

# Tauri specific
yarn tauri            # Access Tauri CLI commands
```

### Development Server

The development server runs on `http://localhost:1420` with:
- **Hot Module Replacement (HMR)** for instant updates
- **TypeScript compilation** with strict type checking
- **Tailwind CSS processing** with JIT compilation
- **Automatic browser refresh** on file changes

### Database Development

```bash
# Set up Supabase locally
npx supabase start

# Create new migration
npx supabase migration new migration_name

# Apply migrations
npx supabase db push

# Generate TypeScript types
npx supabase gen types typescript --local > src/types/database.ts
```

## 🗄️ Database Schema

### Core Tables

#### Organizations (Multi-tenancy)
```sql
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Knowledge Bases
```sql
CREATE TABLE knowledge_bases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  name text NOT NULL,
  description text,
  chunking_strategy jsonb DEFAULT '{"type": "recursive", "chunk_size": 1000, "overlap": 200}',
  retrieval_config jsonb DEFAULT '{"strategy": "vector", "top_k": 5}',
  embedding_provider text DEFAULT 'openai',
  embedding_model text DEFAULT 'text-embedding-3-small',
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Documents & Chunks
```sql
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_base_id uuid REFERENCES knowledge_bases(id) NOT NULL,
  filename text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  storage_path text NOT NULL,
  content_hash text NOT NULL,
  metadata jsonb DEFAULT '{}',
  processing_status document_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  knowledge_base_id uuid REFERENCES knowledge_bases(id) NOT NULL,
  chunk_index integer NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  embedding vector(1536), -- OpenAI embedding dimension
  created_at timestamptz DEFAULT now()
);

-- Vector similarity index
CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);
```

### Row Level Security (RLS)

```sql
-- Organizations: Users can only access their organization
CREATE POLICY "Users can access own organization" ON organizations
  FOR ALL TO authenticated
  USING (id IN (
    SELECT organization_id FROM user_profiles 
    WHERE id = auth.uid()
  ));

-- Knowledge Bases: Organization-scoped access
CREATE POLICY "Organization members can manage knowledge bases" ON knowledge_bases
  FOR ALL TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM user_profiles 
    WHERE id = auth.uid()
  ));
```

## 🔌 API Integration

### Authentication

```typescript
// POST /auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  session: Session;
  organization: Organization;
}
```

### Knowledge Base Management

```typescript
// GET /api/v1/knowledge-bases
interface GetKnowledgeBasesResponse {
  data: KnowledgeBase[];
  pagination: PaginationMeta;
}

// POST /api/v1/knowledge-bases
interface CreateKnowledgeBaseRequest {
  name: string;
  description?: string;
  chunkingStrategy: ChunkingConfig;
  retrievalConfig: RetrievalConfig;
  embeddingProvider: 'openai' | 'cohere' | 'local';
}
```

### Document Operations

```typescript
// POST /api/v1/knowledge-bases/:id/documents
interface UploadDocumentRequest {
  files: File[];
  metadata?: Record<string, any>;
}

// POST /api/v1/knowledge-bases/:id/search
interface SearchRequest {
  query: string;
  strategy?: 'vector' | 'hybrid' | 'keyword';
  topK?: number;
  filters?: SearchFilters;
  rerank?: boolean;
}

interface SearchResponse {
  results: SearchResult[];
  metadata: SearchMetadata;
  performance: PerformanceMetrics;
}
```

### API Key Management

```bash
# Generate API key
curl -X POST https://your-domain.com/api/v1/api-keys \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Integration",
    "permissions": ["read", "write"],
    "expires_at": "2024-12-31T23:59:59Z"
  }'

# Use API key
curl -X GET https://your-domain.com/api/v1/knowledge-bases \
  -H "X-API-Key: YOUR_API_KEY"
```

## 🚀 Building & Deployment

### Web Application

```bash
# Development build
yarn build

# Production optimization
yarn build --mode production

# Preview production build
yarn preview
```

The built web application (`dist/` folder) can be deployed to:
- **Vercel, Netlify** - Static hosting with serverless functions
- **AWS S3 + CloudFront** - Global CDN distribution
- **Docker containers** - Containerized deployment
- **Any web server** supporting SPA routing

### Desktop Application

```bash
# Build for current platform
yarn build:tauri

# Build for specific platforms
yarn tauri build --target x86_64-pc-windows-msvc  # Windows
yarn tauri build --target x86_64-apple-darwin     # macOS Intel
yarn tauri build --target aarch64-apple-darwin    # macOS Apple Silicon
yarn tauri build --target x86_64-unknown-linux-gnu # Linux
```

Desktop applications are distributed as:
- **Windows**: `.msi` installer or `.exe` executable
- **macOS**: `.dmg` disk image or `.app` bundle
- **Linux**: `.deb`, `.rpm`, or `.AppImage` packages

### Configuration

#### Tauri Configuration

Modify [`src-tauri/tauri.conf.json`](src-tauri/tauri.conf.json) for:

```json
{
  "productName": "RAG Master",
  "version": "1.0.0",
  "identifier": "com.ragmaster.app",
  "app": {
    "windows": [
      {
        "title": "RAG Master",
        "width": 1200,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600
      }
    ]
  }
}
```

#### Environment Variables

```bash
# Production environment
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_API_URL=https://api.ragmaster.com
VITE_APP_ENV=production
```

## 🧪 Testing

### Testing Stack

```bash
# Add testing dependencies
yarn add -D vitest @testing-library/react @testing-library/jest-dom
yarn add -D @testing-library/user-event jsdom
```

### Test Structure

```
src/
├── components/
│   ├── KnowledgeBaseCard.tsx
│   └── __tests__/
│       └── KnowledgeBaseCard.test.tsx
├── hooks/
│   ├── useKnowledgeBases.ts
│   └── __tests__/
│       └── useKnowledgeBases.test.ts
└── lib/
    ├── api.ts
    └── __tests__/
        └── api.test.ts
```

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test KnowledgeBaseCard.test.tsx
```

## 🔒 Security & Compliance

### Security Features

- **Row Level Security (RLS)** - Database-level access control
- **API rate limiting** - Prevent abuse and ensure fair usage
- **Input validation** - Zod schemas for all user inputs
- **CORS configuration** - Secure cross-origin resource sharing
- **Content Security Policy (CSP)** - XSS protection
- **Secure file uploads** - Virus scanning and type validation

### Compliance

- **GDPR compliance** - Data protection and user rights
- **SOC 2 Type II** - Security and availability controls
- **Data retention policies** - Automated cleanup and archival
- **Audit logging** - Comprehensive activity tracking

## 📊 Performance & Monitoring

### Performance Targets

- **API response time**: < 200ms (95th percentile)
- **Document processing**: < 30 seconds per MB
- **Search accuracy**: > 85% relevance score
- **System uptime**: > 99.9%

### Monitoring

```bash
# Application performance monitoring
yarn add @sentry/react @sentry/tracing

# Custom metrics and dashboards
yarn add @supabase/realtime-js
```

## 🤝 Contributing

### Development Guidelines

1. **Follow TypeScript strict mode** - No `any` types allowed
2. **Component isolation** - No direct store access from components
3. **File size limits** - Keep files under 500 lines
4. **Testing requirements** - Unit tests for all new features
5. **Code quality** - ESLint and Prettier compliance

### Code Quality

```bash
# Pre-commit hooks
yarn add -D husky lint-staged

# Code formatting
yarn format

# Type checking
yarn type-check

# Linting
yarn lint --fix
```

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Run full test suite and linting
4. Update documentation if needed
5. Submit PR with clear description
6. Address review feedback
7. Merge after approval

## 📚 Documentation

### Additional Resources

- [Technical Specification](docs/technical-specification.md) - Comprehensive system design
- [API Documentation](docs/api-documentation.md) - Complete API reference
- [Deployment Guide](docs/deployment-guide.md) - Production deployment instructions
- [Contributing Guide](CONTRIBUTING.md) - Development workflow and standards

### External Documentation

- [React 19 Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tauri Documentation](https://tauri.app/)
- [Supabase Documentation](https://supabase.com/docs)
- [Shadcn-UI Components](https://ui.shadcn.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🆘 Troubleshooting

### Common Issues

**Tauri build fails:**
```bash
# Ensure Rust is installed and up to date
rustup update
rustup target add x86_64-pc-windows-msvc  # For Windows builds
```

**TypeScript errors:**
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
yarn install
yarn type-check
```

**Database connection issues:**
```bash
# Check Supabase configuration
npx supabase status
npx supabase db reset  # Reset local database
```

**Vector search performance:**
```bash
# Optimize pgvector indexes
-- In your Supabase SQL editor
REINDEX INDEX document_chunks_embedding_idx;
ANALYZE document_chunks;
```

### Getting Help

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Community support and questions
- **Documentation** - Comprehensive guides and API reference
- **Discord Community** - Real-time chat and support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Ready to transform your knowledge management?** 🚀

RAG Master provides enterprise-grade document processing and intelligent retrieval capabilities with a modern, developer-friendly architecture. Start building intelligent knowledge bases today with our comprehensive API and multi-platform support.
