# Database and Data Modeling Rules

1. When the prompt contains "GENERATE_META_MODEL" or "CREATE_META_ENTITY", implement a metadata-driven data model following these principles:
   - Use UUID for all primary keys
   - Create a metadata-based model with types and entities tables
   - Implement proper JSON Schema validation using pg_jsonschema
   - Ensure automatic updates of the "updated_at" column
   - Add proper RLS policies for security

2. Follow this structure for all metadata-driven models:
   - [entity]_type table with:
     - id: UUID primary key
     - name: text, unique, human-readable type name
     - key: text, kebab-cased unique key for queries
     - schema: jsonb containing JSON Schema for variance-specific data
     - icon_url: text, nullable, URL to icon
     - created_at: timestamptz

   - [entity] table with:
     - id: UUID primary key
     - [entity]_type_id: UUID foreign key to [entity]_type
     - entity-specific common properties
     - data: jsonb, nullable, data conforming to the schema
     - created_at: timestamptz
     - updated_at: timestamptz with automatic updates

3. For database operations:
   - Always validate JSON data against schemas using pg_jsonschema
   - Implement triggers for automatic updates of timestamp fields
   - Use RLS to secure data access at the row level
   - Leverage PostgreSQL's JSONB capabilities for flexible schema evolution
