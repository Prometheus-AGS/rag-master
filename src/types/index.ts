// Core domain types for RAG Master

export interface Organization {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  organizationId: string;
  role: UserRole;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface KnowledgeBase {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  settings: Record<string, any>;
  chunkingStrategy: ChunkingConfig;
  retrievalConfig: RetrievalConfig;
  embeddingProvider: EmbeddingProvider;
  embeddingModel: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  // Computed fields
  documentCount?: number;
  chunkCount?: number;
  storageUsed?: number;
}

export interface ChunkingConfig {
  type: 'fixed' | 'recursive' | 'semantic' | 'sentence';
  chunkSize: number;
  overlap: number;
  separators?: string[];
  preserveFormatting?: boolean;
}

export interface RetrievalConfig {
  strategy: 'vector' | 'hybrid' | 'keyword';
  topK: number;
  similarityThreshold?: number;
  rerankEnabled?: boolean;
  rerankTopK?: number;
  hybridWeights?: {
    vector: number;
    keyword: number;
  };
}

export type EmbeddingProvider = 'openai' | 'cohere' | 'local';

export interface Document {
  id: string;
  knowledgeBaseId: string;
  filename: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  storagePath: string;
  contentHash: string;
  metadata: Record<string, any>;
  processingStatus: DocumentStatus;
  processingError?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  // Computed fields
  chunkCount?: number;
  processingProgress?: number;
}

export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface DocumentChunk {
  id: string;
  documentId: string;
  knowledgeBaseId: string;
  chunkIndex: number;
  content: string;
  contentLength: number;
  metadata: Record<string, any>;
  embedding?: number[];
  createdAt: string;
}

export interface SearchRequest {
  query: string;
  strategy?: 'vector' | 'hybrid' | 'keyword';
  topK?: number;
  filters?: SearchFilters;
  rerank?: boolean;
}

export interface SearchFilters {
  documentIds?: string[];
  fileTypes?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  metadata?: Record<string, any>;
}

export interface SearchResult {
  chunk: DocumentChunk;
  document: Document;
  score: number;
  highlights?: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  metadata: SearchMetadata;
  performance: PerformanceMetrics;
}

export interface SearchMetadata {
  query: string;
  strategy: string;
  totalResults: number;
  processingTime: number;
  filters: SearchFilters;
}

export interface PerformanceMetrics {
  queryTime: number;
  embeddingTime?: number;
  retrievalTime: number;
  rerankTime?: number;
  totalTime: number;
}

export interface ProcessingJob {
  id: string;
  documentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface ApiKey {
  id: string;
  organizationId: string;
  name: string;
  keyHash: string;
  permissions: string[];
  lastUsedAt?: string;
  expiresAt?: string;
  createdBy: string;
  createdAt: string;
}

export interface AnalyticsOverview {
  totalDocuments: number;
  totalChunks: number;
  storageUsed: number;
  searchQueries: number;
  activeUsers: number;
}

export interface UsageMetrics {
  documentsUploaded: number;
  searchesPerformed: number;
  apiCalls: number;
  storageUsed: number;
  period: 'day' | 'week' | 'month';
}

export interface TrendData {
  date: string;
  value: number;
  metric: string;
}

// API Response types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationMeta;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

// Form types
export interface CreateKnowledgeBaseForm {
  name: string;
  description: string;
  chunkingStrategy: ChunkingConfig;
  retrievalConfig: RetrievalConfig;
  embeddingProvider: EmbeddingProvider;
  embeddingModel: string;
}

export interface UploadDocumentForm {
  files: File[];
  metadata: Record<string, any>;
}

export interface SearchForm {
  query: string;
  strategy: 'vector' | 'hybrid' | 'keyword';
  topK: number;
  filters: SearchFilters;
}

// UI State types
export interface AppState {
  user: UserProfile | null;
  organization: Organization | null;
  currentKnowledgeBase: KnowledgeBase | null;
  isLoading: boolean;
  error: string | null;
}

export interface KnowledgeBaseState {
  knowledgeBases: KnowledgeBase[];
  currentKB: KnowledgeBase | null;
  documents: Document[];
  searchResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

export interface DocumentState {
  documents: Document[];
  selectedDocuments: string[];
  uploadProgress: Record<string, number>;
  processingJobs: ProcessingJob[];
  isUploading: boolean;
  error: string | null;
}
