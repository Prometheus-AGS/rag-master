# RAG Master - Technical Specification

## Executive Summary

RAG Master is an enterprise-grade knowledge base management platform that enables organizations to create, manage, and query intelligent document repositories. The platform provides multi-tenant support, advanced document processing capabilities, and flexible retrieval strategies for optimal information extraction.

## System Architecture

### High-Level Architecture

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

### Technology Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS + shadcn/ui
- Zustand for state management
- React Query for data fetching
- React Hook Form + Zod validation

**Backend:**
- Node.js with Express/Fastify
- TypeScript
- Supabase client
- Bull Queue for background jobs
- Winston for logging

**Database:**
- Supabase (PostgreSQL 15+)
- pgvector extension
- Row Level Security (RLS)
- Real-time subscriptions

**Infrastructure:**
- Tauri for desktop deployment
- Docker containers
- Vercel/Netlify for web deployment
- Supabase hosting

## Database Schema Design

### Core Tables

#### 1. Organizations (Multi-tenancy)
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

#### 2. Users & Authentication
```sql
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  organization_id uuid REFERENCES organizations(id),
  role user_role DEFAULT 'member',
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TYPE user_role AS ENUM ('owner', 'admin', 'editor', 'viewer');
```

#### 3. Knowledge Bases
```sql
CREATE TABLE knowledge_bases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  name text NOT NULL,
  description text,
  settings jsonb DEFAULT '{}',
  chunking_strategy jsonb DEFAULT '{"type": "recursive", "chunk_size": 1000, "overlap": 200}',
  retrieval_config jsonb DEFAULT '{"strategy": "vector", "top_k": 5}',
  embedding_provider text DEFAULT 'openai',
  embedding_model text DEFAULT 'text-embedding-3-small',
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### 4. Documents
```sql
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_base_id uuid REFERENCES knowledge_bases(id) NOT NULL,
  filename text NOT NULL,
  original_filename text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  storage_path text NOT NULL,
  content_hash text NOT NULL,
  metadata jsonb DEFAULT '{}',
  processing_status document_status DEFAULT 'pending',
  processing_error text,
  uploaded_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TYPE document_status AS ENUM ('pending', 'processing', 'completed', 'failed');
```

#### 5. Document Chunks
```sql
CREATE TABLE document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  knowledge_base_id uuid REFERENCES knowledge_bases(id) NOT NULL,
  chunk_index integer NOT NULL,
  content text NOT NULL,
  content_length integer NOT NULL,
  metadata jsonb DEFAULT '{}',
  embedding vector(1536), -- OpenAI embedding dimension
  created_at timestamptz DEFAULT now()
);

-- Vector similarity index
CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);
```

#### 6. API Keys & Access
```sql
CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  permissions jsonb DEFAULT '["read"]',
  last_used_at timestamptz,
  expires_at timestamptz,
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now()
);
```

### Row Level Security Policies

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

-- Documents: Knowledge base scoped access
CREATE POLICY "KB members can access documents" ON documents
  FOR ALL TO authenticated
  USING (knowledge_base_id IN (
    SELECT kb.id FROM knowledge_bases kb
    JOIN user_profiles up ON kb.organization_id = up.organization_id
    WHERE up.id = auth.uid()
  ));
```

## API Specification

### Authentication Endpoints

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

// POST /auth/register
interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  organizationName?: string;
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

// PUT /api/v1/knowledge-bases/:id/config
interface UpdateConfigRequest {
  chunkingStrategy?: ChunkingConfig;
  retrievalConfig?: RetrievalConfig;
  embeddingProvider?: string;
}
```

### Document Management

```typescript
// POST /api/v1/knowledge-bases/:id/documents
interface UploadDocumentRequest {
  files: File[];
  metadata?: Record<string, any>;
}

interface UploadDocumentResponse {
  documents: Document[];
  processingJobs: ProcessingJob[];
}

// GET /api/v1/knowledge-bases/:id/documents
interface GetDocumentsResponse {
  data: Document[];
  pagination: PaginationMeta;
  filters: DocumentFilters;
}

// DELETE /api/v1/documents/:id
interface DeleteDocumentResponse {
  success: boolean;
  chunksDeleted: number;
}
```

### Search & Retrieval

```typescript
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

interface SearchResult {
  chunk: DocumentChunk;
  document: Document;
  score: number;
  highlights?: string[];
}
```

### Analytics & Monitoring

```typescript
// GET /api/v1/knowledge-bases/:id/analytics
interface AnalyticsResponse {
  overview: {
    totalDocuments: number;
    totalChunks: number;
    storageUsed: number;
    searchQueries: number;
  };
  performance: PerformanceMetrics;
  usage: UsageMetrics;
  trends: TrendData[];
}
```

## Implementation Plan

### Phase 1: Foundation (Weeks 1-2)
- [ ] Project setup and configuration
- [ ] Database schema implementation
- [ ] Authentication system
- [ ] Basic UI components and layouts
- [ ] Multi-tenant organization setup

### Phase 2: Core Features (Weeks 3-5)
- [ ] Knowledge base CRUD operations
- [ ] Document upload pipeline
- [ ] File processing and chunking
- [ ] Basic vector storage and retrieval
- [ ] Search functionality

### Phase 3: Advanced Features (Weeks 6-8)
- [ ] Configurable chunking strategies
- [ ] Multiple retrieval strategies
- [ ] Real-time processing status
- [ ] Performance monitoring
- [ ] API key management

### Phase 4: Enterprise Features (Weeks 9-10)
- [ ] Advanced analytics dashboard
- [ ] Bulk operations
- [ ] Export/import functionality
- [ ] Advanced security features
- [ ] Performance optimization

### Phase 5: Deployment & Testing (Weeks 11-12)
- [ ] Production deployment setup
- [ ] Load testing and optimization
- [ ] Security audit
- [ ] Documentation completion
- [ ] User acceptance testing

## Security Considerations

### Data Protection
- End-to-end encryption for sensitive documents
- Secure file storage with access controls
- API rate limiting and DDoS protection
- Regular security audits and penetration testing

### Access Control
- Role-based permissions (Owner, Admin, Editor, Viewer)
- API key management with scoped permissions
- Session management and timeout policies
- Multi-factor authentication support

### Compliance
- GDPR compliance for EU users
- SOC 2 Type II certification path
- Data retention and deletion policies
- Audit logging for all operations

## Scalability Architecture

### Horizontal Scaling
- Microservices architecture for independent scaling
- Load balancing across multiple API instances
- Database read replicas for query performance
- CDN integration for static assets

### Performance Optimization
- Vector index optimization for large datasets
- Caching strategies (Redis/Memcached)
- Background job processing with queues
- Lazy loading and pagination

### Monitoring & Observability
- Application performance monitoring (APM)
- Real-time error tracking and alerting
- Custom metrics and dashboards
- Log aggregation and analysis

## Deployment Strategy

### Development Environment
- Docker Compose for local development
- Hot reloading for rapid iteration
- Automated testing pipeline
- Code quality checks (ESLint, Prettier, TypeScript)

### Staging Environment
- Production-like environment for testing
- Automated deployment from main branch
- Integration testing and performance benchmarks
- Security scanning and vulnerability assessment

### Production Environment
- Blue-green deployment strategy
- Automated rollback capabilities
- Health checks and monitoring
- Backup and disaster recovery procedures

## Success Metrics

### Technical Metrics
- API response time < 200ms (95th percentile)
- Document processing time < 30 seconds per MB
- Search accuracy > 85% relevance score
- System uptime > 99.9%

### Business Metrics
- User adoption and retention rates
- Knowledge base creation and usage
- API integration adoption
- Customer satisfaction scores

## Risk Assessment

### Technical Risks
- Vector database performance at scale
- Embedding provider API limitations
- File processing memory constraints
- Real-time synchronization challenges

### Mitigation Strategies
- Performance testing and optimization
- Multiple embedding provider support
- Chunked file processing
- Event-driven architecture with queues

## Conclusion

RAG Master provides a comprehensive solution for enterprise knowledge management with advanced RAG capabilities. The modular architecture ensures scalability, while the multi-tenant design supports diverse organizational needs. The implementation plan balances feature delivery with technical excellence, ensuring a production-ready platform that can scale with growing demands.
