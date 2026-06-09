# Web Development Patterns & Best Practices

As an AI Agent or Developer working on this project, you MUST strictly adhere to the following architectural patterns and web development best practices. These rules are non-negotiable and form the foundation of our robust, scalable, and maintainable codebase.

## 1. Domain-Driven Design (DDD)
The project structure and logic must reflect the business domain.

*   **Bounded Contexts:** Each major feature or domain concept should be isolated into its own bounded context (e.g., in a monorepo setup, this means distinct libraries or microfrontends).
*   **Ubiquitous Language:** Use the exact terminology from the business domain in your code (variables, classes, filenames). Do not invent technical synonyms.
*   **Domain Models over Primitives:** Prefer creating small value objects or interfaces over passing around loose primitives (e.g., using a `ZipCode` type rather than a raw `number` or `string`).
*   **Separation of Concerns:** Deeply separate Domain logic (business rules), Application logic (use cases), and Infrastructure logic (API calls, browser storage).
*   **New Backend Domain Infrastructure:** When creating a new backend domain/microservice, you MUST:
    *   Add the service to the Maven parent `pom.xml`.
    *   Add the service to the CI/CD pipeline in `.github/workflows/main.yml` (build matrix and security scan).
    *   Add the service to `docker-compose.prod.yml`.
    *   Update the Nginx Gateway (`infra/nginx/nginx.conf` and `infra/nginx/conf.d/services.conf`) with proper upstreams and location routes.
    *   Update `.vscode/launch.json` and `.vscode/settings.json` with service-specific configurations.

## 2. Microfrontend Architecture (MFE)
We build modular, resilient frontends.

*   **Independence:** Each microfrontend must be able to be developed, tested, and deployed independently.
*   **Loose Coupling:** Microfrontends should communicate via well-defined, versioned contracts (e.g., Custom Events, shared state libraries with strict access limits, or URL routing). NEVER couple MFEs through direct DOM manipulation or sharing global mutable state.
*   **Shared UI/Core:** Use a shared library for Atomic Design components and core utilities to maintain consistency without creating a monolith. 

## 3. Atomic Design Methodology
All UI components must be categorized according to Atomic Design principles.

*   **Atoms:** Basic building blocks (Buttons, Inputs, Typography). They have no domain context.
*   **Molecules:** Simple groups of UI elements functioning together (e.g., a form label, input, and error message).
*   **Organisms:** Relatively complex UI components that form distinct sections of an interface (e.g., a Header, a Product Grid, a Login Form). They can maintain their own state.
*   **Templates:** Page-level objects that place components into a layout and articulate the design's underlying content structure.
*   **Pages:** Specific instances of templates populated with real, representative content or connected to data.

## 4. Test-Driven Development (TDD)
Tests are not an afterthought; they drive the design.

*   **Red-Green-Refactor:** Write a failing test FIRST. Write the minimum code to pass the test. Refactor to ensure Clean Code.
*   **Behavior Over Implementation:** Test what the code *does* from the user's or API consumer's perspective, not *how* it does it.
*   **Coverage:** Every new feature, component, and utility must be accompanied by relevant unit tests (e.g., Jest) and, where applicable, integration/E2E tests.

## 5. Clean Code & SOLID Principles
Code must be readable by humans and easily modifiable.

*   **Single Responsibility Principle (SRP):** A class or component should have one, and only one, reason to change.
*   **Open/Closed Principle (OCP):** Software entities should be open for extension, but closed for modification.
*   **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types.
*   **Interface Segregation Principle (ISP):** Clients should not be forced to depend on methods they do not use (create small, specific interfaces instead of large, general ones).
*   **Dependency Inversion Principle (DIP):** Depend on abstractions, not concretions (e.g., use Dependency Injection heavily, especially via Angular's `inject()`).

## 6. Strict Typing (No `any`)
Type safety is a core requirement.

*   **Zero `any`:** The use of the `any` keyword is strictly forbidden. 
*   **Forced Casting:** The use of `as unknown as Type` (double casting) is strictly forbidden. This often masks underlying type mismatches or architectural issues. Use proper mapping, type guards, or fix the source type definitions instead.
*   **Explicit Returns:** Always declare return types for functions and methods.
*   **Generics & Utility Types:** Leverage advanced TypeScript features (`Pick`, `Omit`, `Partial`, custom generic mapping types) to maintain single sources of truth for data models rather than duplicating types or falling back to `unknown` or `any`.

## 7. Version Control & Git Flow
All changes must follow a structured delivery process.

*   **Atomic Commits:** Commits should be small, logical, and represent a single working change. 
*   **Error-Free Commits:** Never commit broken code or code that fails the test suite.
*   **Branching:** Follow the standard Git Flow (feature branches, develop, main/master). Do not push directly to protected branches. Never create a git branch without a specific task ID provided in the prompt.

## 8. Base Services Contract
All data-driven or entity services across both frontend and backend layers MUST implement a consistent API contract exposing at least the following base methods:
*   `create`
*   `update`
*   `remove`
*   `find`

**The `find` Method Convention:**
Queries and retrieval of data via `find` MUST use the **POST** HTTP method (rather than GET) to accommodate complex payloads without URL limitations.
All filtering, sorting, and pagination parameters MUST be passed explicitly via **the request body**.

## 9. Internationalization (i18n)
All UI code must support multiple languages.

*   **Zero Hardcoding:** Never use literal strings for UI text.
*   **Structured Keys:** Follow the defined JSON hierarchy in `design-system/i18n/`.
*   **Tooling:** Use `TranslatePipe` in templates and pass translation keys to component inputs.
*   **Specific Rules:** Refer to the [`i18n.md`](./i18n.md) rule for detailed standards.

## AI Agent Directives
When prompted to build, create, alter, refactor, or analyze code:
1.  **Strict TDD Enforcement:** Whenever asked to create or alter something, YOU MUST use TDD. You MUST update or create the tests FIRST before creating or modifying any component or logic.
2.  **Storybook Enforcement:** If the component being created or altered belongs to the UI library (`/frontend/libs/ui`), YOU MUST also create or update its corresponding Storybook (`.stories.ts`) file.
3.  **Strict i18n Enforcement:** All UI components MUST BE internationalized. Ensure no hardcoded strings are introduced and all new keys are correctly added to all locale files.
4.  **Analyze Context:** Determine which layer of DDD or which Atomic Design level the request targets.
5.  **Verify Types:** Ensure 100% strict typing without `any`.
6.  **Implement Cleanly:** Apply SOLID principles to the generated code.
7.  **No Branches Without Task IDs:** Never create a git branch without a specific task ID provided in the prompt.
8.  **Service Conventions:** When writing or modifying services, enforce the 4 base methods (`create`, `update`, `remove`, `find`) and use POST with body payload for the `find` method.
