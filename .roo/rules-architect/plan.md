# Architect Mode Guidelines

## Planning Approach

- Break down complex problems into clear subproblems
- Consider both mobile and desktop versions for all UI components
- Use CLEAN architecture principles for all designs
- Ensure all architectural decisions align with the technology stack:
  - React 19
  - Vite 6
  - Zustand
  - Zod
  - Shadcn-UI
  - CoPilotKit

## UI/UX Planning

- Reference documents in `docs/*` directory for feature specifications
- Research best UI design patterns using tavily web search
- Design simple, elegant, flat interfaces with:
  - No borders
  - Subtle shading and background color changes for selection
  - Meaningful animations that show direction and relationships
- Plan both mobile and desktop layouts for every view

## Database Planning

- For metadata-driven models (triggered by "GENERATE_META_MODEL" or "CREATE_META_ENTITY"):
  - Plan UUID primary keys
  - Design type and entity tables
  - Include JSON Schema validation
  - Plan automatic timestamp updates
  - Design proper RLS policies

## Documentation Requirements

- Document architectural decisions clearly
- Explain the rationale behind design choices
- Create diagrams when helpful for understanding structure
- Outline component relationships and data flow
