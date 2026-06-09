---
name: design-system-architect
description: Sets up and maintains a world-class Design System infrastructure using Storybook, focusing on documentation, token integration, and accessibility standards.
---

# Design System Architect Skill

Use this skill to establish the foundational "One Source of Truth" for UI development. This agent ensures the Storybook environment is not just a gallery, but a functional documentation manual.

## Architectural Pillars

1.  **Token Architecture (3-Tier System)**:
    - **Core Tokens (Primitives)**: The absolute basic scales and raw values (e.g., `color.grey.500`, `radius.lg`, `space.md`)
    - **Semantic Tokens (Alias Layer)**: Multi-brand abstractions that define the visual language
    - **Generation**: Use **Style Dictionary 4.0** to transform JSON into CSS variables scoped by `[data-theme="brand"]`

2.  **Structural Integrity**:
    - **Consolidated UI Library**: All visual assets and logic are centralized in `@frontend/ui` (`libs/ui`).
    - **Atomic Design Structure**: Strict folder hierarchy within `libs/ui/src/lib/`:
      - `atoms/`: Base components like `button`, `input`, `badge`.
      - `molecules/`: Composite components like `form-field`, `card`.
      - `organisms/`: Complex structures like `navigation`, `header`.
    - **Shared Assets**: `design-system/` folder contains tokens, generated styles, and documentation (MDX).

3.  **Tailwind & Styling Standards**:
    - **Variable-Driven**: `tailwind.config.js` must map to CSS variables using the semantic hierarchy.
    - **Class-Based Dark Mode**: Supports `dark:` variant using the `.dark` class on the `html` element.

4.  **Multi-Theme & Localization Hub (Storybook)**:
    - **Dynamic Theme Discovery**: The `storybook` script automatically generates brand list and language list during the token build.
    - **Global Toolbars**:
      - `Mode`: Light/Dark toggle.
      - `Brand`: Real-time brand selection (Default, Brand1, Brand2).
      - `Language`: Locales (en-GB, pt-BR, es-ES).
      - `Currency`: Regional pricing (GBP, EUR, BRL).

## Implementation Steps

### 1. Token Maintenance

When adding a color or spacing value:

1. use style-dictionary/examples/advanced/multi-brand-multi-platform as example
2. Map it in `default.json` and other brand themes (Default, Brand1, Brand2) using semantic aliases.

### 2. Component Creation

- Use `standalone: true`.
- Use the `default-` prefix for selectors (ensure it follows the project's `selectorPrefix`).
- **Strict Rule**: Consume ONLY semantic Tailwind classes. Never use hex codes or core primitives directly in components.
- Example: `import { cva, type VariantProps } from 'class-variance-authority';
  import { tokens } from '@design-system/tokens';

      export const buttonVariants = cva(
          `inline-flex items-center justify-center font-(${tokens.font.family.base}) font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
          {
              variants: {
                  intent: {
                      primary: `bg-(${tokens.color.primary}) text-(${tokens.color.onPrimary}) hover:opacity-90 shadow-md`,
                      secondary: `bg-(${tokens.color.secondary}) text-(${tokens.color.onSecondary}) border-[1px] border-(${tokens.color.primary}) hover:bg-opacity-10`,
                      outline: `bg-transparent border-[1.5px] border-(${tokens.color.primary}) text-(${tokens.color.primary}) hover:bg-opacity-5`,
                      ghost: `bg-transparent text-(${tokens.color.primary}) hover:bg-opacity-5`,
                      link: `bg-transparent text-(${tokens.color.primary}) underline-offset-4 hover:underline p-0 h-auto`,
                  },
                  size: {
                      small: `h-(${tokens.spacing.sm}) pl-(${tokens.spacing.sm}) pr-(${tokens.spacing.sm}) text-(${tokens.font.size.sm}) rounded-(${tokens.radius.sm})`,
                      medium: `h-(${tokens.spacing.md}) pl-(${tokens.spacing.md}) pr-(${tokens.spacing.md}) text-(${tokens.font.size.md}) rounded-(${tokens.radius.md})`,
                      large: `h-(${tokens.spacing.lg}) pl-(${tokens.spacing.lg}) pr-(${tokens.spacing.lg}) text-(${tokens.font.size.lg}) rounded-(${tokens.radius.lg})`,
                  },
                  fullWidth: {
                      true: 'w-full',
                      false: ''
                  }
              },
              defaultVariants: {
                  intent: 'primary',
                  size: 'medium',
                  fullWidth: false
              }
          }
      );

      export type ButtonVariants = VariantProps<typeof buttonVariants>;

  `.

### 3. Storybook Decoration

- Every component must have a `.stories.ts` file.
- Use the `render` function to showcase components in a themed context.

## Review Checklist

- [ ] **Token Usage**: 0 hardcoded hex codes or raw primitive values in `.ts` or `.css`.
- [ ] **Semantic Mappings**: Does the component use `surface` vs `action` tokens correctly?
- [ ] **Atomic Category**: Is it correctly placed in `atoms`, `molecules`, or `organisms`?
- [ ] **Mobile First & Responsiveness**: Is the component designed Mobile First? Does it use `space-*` tokens and responsive prefixes (`sm:`, `md:`) for layout?
- [ ] **i18n**: Is the component using labels as inputs for translated content?

## Automated Documentation Generation

1. **Documentation Hierarchy**: `Design System/Introduction` and `Design System/Foundations` must be first in Storybook.
2. **Dynamic Tokens**: The `FoundationsComponent` must visualize the active theme's tokens.
3. **Visual Parity**: Match high-fidelity design standards (interactive color cards, shadow depth previews).
