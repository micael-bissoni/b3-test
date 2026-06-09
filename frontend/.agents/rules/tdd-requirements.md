# Strict TDD and Storybook Enforcement

As an AI Agent or Developer working on this project, you MUST strictly adhere to the following rules regarding Test-Driven Development (TDD) and Storybook.

## 1. Strict TDD Enforcement
Whenever you are asked to create, alter, or refactor something, **you MUST use TDD**.
*   **Tests First:** You MUST update or create the tests BEFORE creating or altering any component, service, or logic.
*   **Red-Green-Refactor:** Follow the failing test first approach before implementing the business logic.

## 2. UI Library Components (Storybook Enforcement)
If the component being created or altered belongs to the UI library (`/Users/micaelbissoni/Projects/trevvo/pharma-mvp/frontend/libs/ui`):
*   **Storybook File:** You MUST also create or update its corresponding Storybook file (`.stories.ts`).
*   **Variants:** Make sure to document all relevant states and variants (Loading, Error, Default) inside the newly generated Storybook file.
