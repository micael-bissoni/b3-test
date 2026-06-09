---
name: component-factory
description: Guides the creation of UI components using Atomic Design principles, ensuring modularity, scalability, and strict adherence to semantic design tokens and providers.
---

# Component Factory Skill

Use this skill to create "Design System Ready" components. This workflow ensures that every component is born with the correct architecture, token usage, and provider integration.

## Component Templates

### 1. The Component (`.component.ts`)
```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@design-system/tokens'; // Adjust path if needed
import { LocaleService } from '../utils/locale.service';

@Component({
  selector: 'default-component-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentNameComponent {
  private readonly themeService = inject(ThemeService);
  private readonly localeService = inject(LocaleService);

  // Use signals for inputs
  // @Input() label = '';
}
```

### 2. The Story (`.stories.ts`)
```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideStore } from '@ngrx/store';
import { ComponentNameComponent } from './component-name.component';

const meta: Meta<ComponentNameComponent> = {
  title: 'Atoms/ComponentName',
  component: ComponentNameComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideStore({}), // Add necessary reducers
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ComponentNameComponent>;

export const Default: Story = {
  args: {
    // initial args
  },
};
```

## Workflow: Component Creation

1.  **Categorize**: Is it an Atom, Molecule, or Organism?
2.  **Scaffold**: Run `npx nx g @nx/angular:component <name> --project=design-system --directory=libs/design-system/components/lib/<category>/<name> --standalone --changeDetection=OnPush --style=scss`.
3.  **Apply Tokens**: Update the HTML/SCSS using ONLY semantic tokens from the `atomic-ui-architect` skill.
4.  **Inject Providers**: Add `ThemeService` and `LocaleService` if the component requires dynamic branding or localization.
5.  **Storybook setup**: Create the story and ensure it has the correct decorators to mock the environment.
6.  **TDD**: Write tests in `<name>.component.spec.ts` ensuring all inputs and outputs are verified.

## Quality Standards
- **Zero hardcoded strings**: Use i18n keys or inputs.
- **Zero hardcoded styles**: Use semantic Tailwind classes.
- **Provider Ready**: Component must work inside the `App` and `Storybook` without manual configuration outside of the standard providers.
