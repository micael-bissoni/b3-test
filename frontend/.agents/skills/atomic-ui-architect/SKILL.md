---
name: atomic-ui-architect
description: Guides the creation of UI components using Atomic Design principles, ensuring modularity, scalability, and strict adherence to semantic design tokens.
---

# Atomic UI Architect Skill

Use this skill to build individual UI components that are reusable across the monorepo. This agent specializes in transforming design tokens into functional, high-fidelity Angular components.

## Core Principles

1.  **Atomic Hierarchy**:
    *   **Atoms**: The smallest functional units. Must be generic and highly reusable.
        *   Examples: `Button`, `Input`, `Badge`, `Icon`, `Text`.
        *   Location: `libs/ui/src/lib/atoms/`
    *   **Molecules**: Simple groups of atoms functioning together.
        *   Examples: `FormField` (Label + Input + Error), `SearchBox` (Input + Button), `CardHeader`.
        *   Location: `libs/ui/src/lib/molecules/`
    *   **Organisms**: Complex components that form distinct sections of an interface.
        *   Examples: `NavigationHeader`, `ProductGrid`, `UserForm`.
        *   Location: `libs/ui/src/lib/organisms/`

2.  **Semantic Styling (The "Token First" Rule)**:
    *   **Never** use hardcoded colors (`#fff`), spacing (`12px`), or Tailwind palette colors (`bg-blue-500`).
    *   **Always** use semantic Tailwind classes. Refer to the table below for official usage patterns:

    | Category | Token | Usage / "Where to Apply" |
    | :--- | :--- | :--- |
    | **Surface** | `bg-surface-primary` | Main application background. |
    | | `bg-surface-secondary` | Secondary background for cards, sidebars, or sections. |
    | | `bg-surface-tertiary` | Tertiary background for inputs or nested containers. |
    | | `bg-surface-inverse` | High contrast background for tooltips or notifications. |
    | **Content** | `text-on-surface-primary` | High emphasis text and icons. |
    | | `text-on-surface-secondary` | Medium emphasis text and meta information. |
    | | `text-on-surface-tertiary` | Low emphasis text and disabled states. |
    | | `text-on-surface-inverse` | Text and icons on inverse surfaces. |
    | **Action** | `bg-primary` | Primary action and active states. |
    | | `bg-primary-hover` | Hover state for primary actions. |
    | | `bg-primary-active` | Active/Pressed state for primary actions. |
    | | `text-primary-on` | Text/Icons on primary action buttons. |
    | | `bg-secondary` | Disabled state for actions (maps to action-disabled). |
    | **Signals** | `bg-signal-success` | Success messages and completed states. |
    | | `bg-signal-warning` | Warning messages and status requiring attention. |
    | | `bg-signal-error` | Error messages and critical failures. |
    | | `bg-signal-info` | Neutral information and helpful tips. |
    | **Radius** | `rounded-sm` | Small elements like checkboxes or small badges. |
    | | `rounded-md` | Standard components like buttons and input fields (Default). |
    | | `rounded-lg` | Larger components like cards and modals. |
    | | `rounded-xl` | Large containers or hero sections. |
    | | `rounded-full` | Circular elements like avatars or pill badges. |
    | **Spacing** | `p-xs` / `m-xs` | Tight spacing between related icons or small text. |
    | | `p-sm` / `m-sm` | Standard padding for small components. |
    | | `p-md` / `m-md` | General spacing between sections or large padding. |
    | | `p-lg` / `m-lg` | Wide breathing room for main layouts. |
    | | `p-xl` / `m-xl` | Generous outer margins. |
    | **Shadows** | `shadow-sm` | Subtle elevation for small cards or hover states. |
    | | `shadow-md` | Standard elevation for interface components. |
    | | `shadow-lg` | High elevation for menus and dropdowns. |
    | | `shadow-xl` | Depth for modals and overlays. |
    | | `shadow-2xl` | Maximum prominence for overlay elements. |

3.  **Encapsulation & DDD**:
    *   Components in `libs/ui` are "dumb" (presentational). They should not know about domain logic or external services.
    *   Data flows in via `@Input()` (Signals preferred).
    *   Events flow out via `@Output()`.

## Component Checklist

### 1. Structural Requirements
- [ ] **Standalone**: Must use `standalone: true`.
- [ ] **OnPush**: Use `changeDetection: ChangeDetectionStrategy.OnPush`.
- [ ] **Selector**: Use the `default-` prefix (e.g., `selector: 'default-button'`).
- [ ] **Encapsulation**: Use `ViewEncapsulation.None` sparingly; prefer scoped styles if tokens aren't enough.

### 2. Styling Requirements
- [ ] Uses semantic Tailwind classes exclusively.
- [ ] **Mobile First**: Implement designs starting from the smallest screen, using responsive utility classes (`md:`, `lg:`) to progressively enhance for larger screens.
- [ ] Dark mode compatibility (uses tokens that work in both modes).

### 3. Documentation (Storybook)
- [ ] One story file per component (`.stories.ts`).
- [ ] Include a `Default` story and variants (e.g., `Primary`, `Outline`, `Disabled`).
- [ ] Use `argTypes` to provide interactive controls for all `@Input()` properties.

## Workflow: Creating a New Atom

1.  **Analyze**: Identify the semantics (is it a button? a label?).
2.  **Scaffold**: Create the files in `libs/ui/src/lib/atoms/<name>/`.
3.  **Token Check**: Identify which `surface`, `on-surface`, or `action` tokens apply.
4.  **Implement**:
    ```typescript
    @Component({
      selector: 'default-atom-name',
      standalone: true,
      imports: [CommonModule],
      template: `
        <div class="bg-surface-primary text-on-surface-primary p-md rounded-md">
          <ng-content></ng-content>
        </div>
      `,
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    export class AtomNameComponent {}
    ```
5.  **Story**: Create a story to verify the look across different brands/themes.

## Quality Standards
- **Clean Code**: Keep templates small and logic-free.
- **TDD**: Write component tests (`.spec.ts`) alongside implementation.
- **Accessibility**: Ensure correct ARIA roles and keyboard interactions.
