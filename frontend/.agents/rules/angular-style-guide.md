# Angular Coding Style Guide

This guide covers a range of style conventions for Angular application code, extracted from the official [Angular Style Guide](https://angular.dev/style-guide).

## Naming
- **File Names:** Separate words in file names with hyphens (e.g., `user-profile.ts`).
- **Tests:** Use the same name for a file's tests with `.spec` at the end (e.g., `user-profile.spec.ts`).
- **Identifiers:** Match file names to the TypeScript identifier within (e.g., class `UserProfile` goes in `user-profile.ts`).
- **Components:** Use the same file name for a component's TypeScript, template, and styles (e.g., `user-profile.ts`, `user-profile.html`, `user-profile.css`).

## Project Structure
- **Code Location:** All the application's code goes in a directory named `src`. Code that's not related to UI lives outside `src`.
- **Entry Point:** Bootstrap your application in a file named `main.ts` directly inside `src`.
- **Grouping:** Group closely related files together in the same directory. Unit tests should live in the same directory as the code-under-test.
- **Feature Areas:** Organize your project into subdirectories based on the features of your application or common themes, rather than by type (e.g., avoid `components/`, `services/` folders).
- **Single Concept:** Prefer focusing source files on a single concept. Generally, this means one component, directive, or service per file.

## Dependency Injection
- **`inject()` Function:** Prefer using the `inject` function over constructor parameter injection for better readability, type inference, and ease of subclassing.

## Components and Directives
- **Selectors:** Use standard Angular practices for choosing component selectors. For directives, use an application-specific prefix and camelCase attribute names (e.g., `[appTooltip]`).
- **Member Order:** Group Angular-specific properties (injected dependencies, inputs, outputs, and queries) before methods, typically near the top of the class declaration.
- **Focus:** Keep components and directives focused on presentation. Decoupled logic (e.g., data transformations) should be refactored to separate functions/classes.
- **Template Logic:** Avoid overly complex logic in templates. Take advantage of JavaScript-like expressions for simple logic, but refactor complex logic into TypeScript (typically using a `computed` signal).
- **Protected Access:** Use `protected` on class members that are only meant to be accessed from a component's template, keeping them out of the public API.
- **Readonly Properties:** Use `readonly` for properties that shouldn't change, including those initialized by `input`, `model`, `output`, and queries (`ViewChild`, `ContentChild`, etc.).
- **Class & Style Bindings:** Prefer built-in `[class]` and `[style]` bindings over the `NgClass` and `NgStyle` directives for better syntax and performance.
- **Event Handlers:** Name event handlers for what they do, not for the triggering event (e.g., `(click)="saveUserData()"` instead of `(click)="handleClick()"`).
- **Lifecycle Methods:** Keep lifecycle methods simple. Delegate complex setup to well-named methods rather than writing all the code inside hooks like `ngOnInit`.
- **Lifecycle Interfaces:** Always explicitly implement lifecycle hook interfaces (e.g., `implements OnInit`) to ensure correct method names.

## Strongly Typed Reactive Forms

When working with Forms in Angular 14+, utilize strictly typed reactive forms to enhance type safety and maintain single source of truth models. Avoid duplicating your domain interfaces to create separate form interfaces. 

Instead, use utility types to map existing domain interfaces directly to a strongly typed `FormGroup`.

**Example: Mapping Utility Type**
```typescript
import { FormControl, FormGroup, FormArray } from '@angular/core';

// Generic utility to safely map any flat interface T to a typed FormGroup model
export type ToFormType<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
```

**Example: Strongly Typing a Form with `ToFormType`**
```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/core';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

@Component({
  // ...
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  // Strongly typed using the existing domain interface
  protected form: FormGroup<ToFormType<UserProfile>> = this.fb.group({
    id: this.fb.control<number | null>(null, [Validators.required]),
    name: this.fb.control<string | null>('', [Validators.required]),
    email: this.fb.control<string | null>('', [Validators.email]),
  });

  protected onSubmit() {
    if (this.form.valid) {
      // The payload matches the Partial<UserProfile> precisely
      const payload = this.form.getRawValue();
    }
  }
}
```
This pattern ensures robust maintainability and reliable type inference across your business applications without maintaining parallel copies of form definitions.
