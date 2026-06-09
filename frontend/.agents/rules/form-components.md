# Form Component Standards

This document defines the mandatory architectural and implementation standards for all form-related components (inputs, checkboxes, radios, etc.) in the Trevvo design system.

## 🏗️ Architectural Split (Atomic Design)

*   **Atoms**: Individual control elements that represent a single state (e.g., `CheckboxComponent`, `RadioComponent`, `InputComponent`).
*   **Molecules**: Composites of atoms that manage collections or complex states (e.g., `CheckboxGroupComponent`, `RadioGroupComponent`).
*   **Templates**: Higher-level forms or filter menus that consume these atoms and molecules (e.g., `DataGridFilterComponent`).

## ⚙️ Reactive Forms & ControlValueAccessor (CVA)

ALL form components MUST implement `ControlValueAccessor` to ensure they are compatible with Angular Reactive Forms (`formControl`, `formControlName`).

### Mandatory Boilerplate
```typescript
@Component({
  // ...
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyFormComponent),
      multi: true,
    },
  ],
})
export class MyFormComponent implements ControlValueAccessor {
  // MUST implement writeValue, registerOnChange, registerOnTouched, setDisabledState
}
```

## 🔋 Signal-Based State Management

To ensure compatibility with Storybook (which requires public properties for "Controls") and to avoid naming collisions with read-only Angular `input()` signals:

1.  **Public Inputs**: Use standard, clear names for the public API (`value`, `checked`, `disabled`, `label`).
2.  **Internal Signals**: Use writable `signal()` primitives prefixed with `internal` for local state tracking (e.g., `internalValue`, `internalChecked`, `internalDisabled`).
3.  **Synchronization**: Use `effect()` to sync public `input()` changes into the `internal` signals. Use `untracked()` inside these effects to avoid circular dependencies.

### Example Pattern:
```typescript
export class CheckboxComponent implements ControlValueAccessor {
  // Public API (Read-only inputs for Storybook/Parents)
  checked = input<boolean>(false);
  disabled = input<boolean>(false);

  // Internal Writable State
  internalChecked = signal<boolean>(false);
  internalDisabled = signal<boolean>(false);

  constructor() {
    // Sync external inputs to internal state
    effect(() => {
      const isChecked = this.checked();
      untracked(() => this.internalChecked.set(isChecked));
    });
  }
  
  // writeValue updates internalChecked
  writeValue(value: boolean): void {
    this.internalChecked.set(value);
  }
}
```

## 🏷️ Labels and Layout (Molecular Groups)

- **Optional Label**: Molecular groups (`CheckboxGroup`, `RadioGroup`) must accept an optional `label` input.
- **Industrial Styling**: Labels must follow the standard design system styling:
  - `label-industrial` class
  - `text-xs uppercase tracking-widest font-bold`
- **Spacing**: Use `mb-8 last:mb-0` on the molecule's host container to ensure consistent vertical rhythm within form layouts and filter menus.

## 🌐 Internationalization (i18n)
ALL form components MUST be i18n-ready to support the project's multi-language requirements.

1.  **Inputs**: Parameters like `label`, `placeholder`, and `hint` MUST receive translation keys as `input()` signals.
2.  **Rendering**: Use the `TranslatePipe` (`| translate`) or `TranslateService` to render these keys in the template.
3.  **Errors**: Validation error methods (e.g., `getControlError()`) MUST return i18n keys (e.g., `organisms.form.errors.required`).
4.  **Loading Patterns**: Action buttons should follow the `saveBtn`/`loadingBtn` pattern defined in [i18n rules](./i18n.md).

## 🧪 Testing (TDD)

- **CVA Verification**: Every form component spec must verify that `writeValue` correctly updates the `internal` signal.
- **Signal Tracking**: Tests should assert against `internal*()` signals to verify state transitions during user interactions (like `toggle()` or `select()`).
- **Translation Keys**: Verify that labels and placeholders correctly resolve and render.

## 📖 Storybook Integration

- **ArgTypes**: Always define `argTypes` in `.stories.ts` for `value`, `disabled`, and `label`.
- **States**: Provide stories for `Default`, `Checked/Preselected`, and `Disabled` states.
- **Complex Types**: If using `Set` for values (e.g., in `CheckboxGroup`), ensure the story `args` provide a new `Set` instance.
- **Localized Previews**: Ensure Storybook is configured with `TranslateModule` to correctly display labels and placeholders.
