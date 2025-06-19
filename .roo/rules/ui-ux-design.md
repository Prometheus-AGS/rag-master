# UI/UX Design Guidelines

## Design Principles

- Always refer to documents in the `docs/*` directory for feature specifications
- Research best UI design patterns using tavily web search for each new view
- Follow modern, clean design aesthetics

## Interface Style

- Create simple, elegant, flat interfaces
- Avoid borders in favor of subtle visual differentiation
- Use shading and background color changes for selections and state changes
- Implement consistent spacing and alignment throughout the application

## Responsive Design

- Every view MUST have both mobile and desktop versions
- Design mobile-first, then adapt for larger screens
- Ensure touch targets are appropriately sized on mobile
- Use responsive layout techniques (Flexbox, Grid) for adaptable interfaces

## Animation Guidelines

- Include meaningful animations that:
  - Show direction of movement
  - Ensure proper focus
  - Illustrate relationships between UI elements
  - Guide users through workflows
- Keep animations subtle and purposeful
- Ensure animations are performant and don't cause layout shifts

## Accessibility

- Maintain sufficient color contrast
- Provide text alternatives for non-text content
- Ensure keyboard navigability
- Support screen readers with appropriate ARIA attributes
- Design with colorblind-friendly palettes

## Component Usage

- Use Shadcn-UI components consistently
- Follow established design patterns for common UI elements
- Maintain visual hierarchy in layouts
- Provide clear feedback for user interactions
