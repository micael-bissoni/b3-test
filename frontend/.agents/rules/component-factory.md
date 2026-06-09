# UI Component Factory Rules

Any AI Agent or Developer creating UI components in this repository MUST follow these structural and architectural rules.

## 1. Directory Structure
Components must be placed in the appropriate Atomic Design directory within `design-system/components/lib/`:
- **Atoms**: `atoms/<component-name>/`
- **Molecules**: `molecules/<component-name>/`
- **Organisms**: `organisms/<component-name>/`

Each component directory MUST contain:
- `<name>.component.ts`: The component logic (Standalone).
- `<name>.component.html`: The template.
- `<name>.component.scss`: (Optional) Scoped styles if semantic tokens aren't sufficient.
- `<name>.component.spec.ts`: Unit tests (TDD).
- `<name>.stories.ts`: Storybook documentation.

## 2. Component Configuration
- **Standalone**: All components MUST be `standalone: true`.
- **Change Detection**: MUST use `ChangeDetectionStrategy.OnPush`.
- **Selector Prefix**: MUST use the `default-` prefix.
- **Strict Typing**: No `any` allowed. Use specific types or interfaces.
- **Signals**: Prefer Angular Signals for `input()` and `output()` (or standard decorators if version-limited, but design for Signals).
- **Forms**: Components that function as inputs MUST follow [Form Component Standards](file:///Users/micaelbissoni/Projects/trevvo/design-system/.agents/rules/form-components.md).

## 3. Design Token Integration
- **Semantic Tokens Only**: Never use hex codes or standard Tailwind palette colors (e.g., `bg-blue-500`).
- **Surface/Content/Action**: Use tokens like `bg-surface-primary`, `text-on-surface-primary`, `bg-primary`, etc.
- **Reference**: Refer to `atomic-ui-architect` skill for the full token table.

## 4. Provider Integration
- **Theme Awareness**: Components that need to be aware of the current brand should inject `ThemeService`.
- **i18n & Localization**: Use `LocaleService` for formatting dates, currencies, and numbers.
- **Storybook Decorators**: Ensure Storybook stories are wrapped with necessary providers (Store, ThemeService initialization) to prevent runtime errors in the gallery.

## 5. TDD Execution
- Write the `.spec.ts` first.
- Ensure 100% logic coverage.
- Use `mock` services for `ThemeService` and `Store` in tests.
