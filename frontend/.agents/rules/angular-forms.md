# Angular Strongly Typed Reactive Forms

When implementing reactive forms in Angular (v14+), you MUST use this standard approach to ensure strong typing mapped directly from your existing domain interfaces. This avoids maintaining parallel model definitions and ensures deep type safety, even for nested objects, dates, and form arrays.

## Core Utility Type

Copy and use the following generic utility type `ToFormType<T>` to transform any existing interface into a strongly typed Angular `FormGroup`. This utility recursively resolves nested interfaces and arrays.

```typescript
import { FormControl, FormGroup, FormArray } from '@angular/core';

export type ToFormType<T> = FormGroup<{
    [K in keyof T]: T[K] extends object
        ? T[K] extends Date
            ? FormControl<T[K] | null>
            : T[K] extends unknown[]
                ? FormArray<ToFormType<T[K] extends (infer V)[] ? V : T[K]>>
                : ToFormType<T[K]>
        : FormControl<T[K] | null>;
}>;
```

## Domain Interfaces Example

Given the following domain interfaces:

```typescript
export interface User {
    id: number;
    name: string;
    address: Address;
    hobbies: Hobby[];
}

export interface Address {
    zipCode: number;
    city: string;
}

export interface Hobby {
    name: string;
    description: string;
}
```

## How to Use It (Implementation Guidelines)

When creating forms using the above interfaces, you MUST follow these steps to build the reactive form logic appropriately:

### 1. Define the Form Shape
Use `ToFormType<T>` to firmly type your FormGroup property. You can utilize utility types like `Pick`, `Omit`, or intersections to adapt the base interface on the fly without declaring a duplicate interface.

Examples:
```typescript
// Example 1: Typing a form for specific properties only
public partialForm: ToFormType<Pick<User, 'id' | 'name'>>;

// Example 2: Typing a form with an appended property not found in the base interface
public extendedForm: ToFormType<User & { birthDate: Date }>;

// Example 3: Typing the complete base form
public userForm: ToFormType<User>;
```

### 2. Implementation with FormBuilder
When instantiating the form, map the nested structure meticulously layout the corresponding controls, converting objects into `FormGroup` items, and arrays into `FormArray`.

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/core';

@Component({
  selector: 'app-user-form',
  // ...
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  public userForm: ToFormType<User> = this.fb.group({
    id: this.fb.control<number | null>(null, [Validators.required]),
    name: this.fb.control<string | null>(null, [Validators.required]),
    address: this.fb.group({
      zipCode: this.fb.control<number | null>(null, [Validators.required]),
      city: this.fb.control<string | null>(null, [Validators.required])
    }),
    hobbies: this.fb.array<ToFormType<Hobby>>([]) // Strongly typed FormArray using our utility
  });

  public addHobby(): void {
    // Strongly pushing a correctly structured child FormGroup
    this.userForm.controls.hobbies.push(this.createHobbyGroup());
  }

  private createHobbyGroup(): ToFormType<Hobby> {
    return this.fb.group({
      name: this.fb.control<string | null>(null, [Validators.required]),
      description: this.fb.control<string | null>(null)
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      // payload correctly inferred as Partial<User> based on structure
      const payload = this.userForm.getRawValue();
      console.log('Submitted', payload);
    }
  }
}
```

### Golden Rules for Agents / Developers
- **NEVER** redefine manual `FormControl` interface structures when an existing domain structure already exists. Always leverage `ToFormType`.
- **ALWAYS** treat `Date` fields directly as `FormControl` rather than recursive instances (handled by the utility type conditionally).
- **ALWAYS** explicitly map inner sub-objects to nested `this.fb.group({ ... })` values.
- **ALWAYS** utilize `FormArray<ToFormType<T>>` to govern array fields explicitly.
