import { ChangeDetectionStrategy, Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-checkbox-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxComponent, TranslatePipe],
  template: `
    <div 
      class="mb-8"
      [class.opacity-50]="internalDisabled()"
      [class.pointer-events-none]="internalDisabled()"
    >
      @if (label()) {
        <label class="label-industrial text-primary mb-4 block font-bold text-xs uppercase tracking-widest">{{label() | translate}}</label>
      }
      <div class="grid grid-cols-2 gap-1">
        @for (option of options(); track option) {
          <ds-checkbox 
            [label]="option | translate"
            [checked]="internalValue().has(option)"
            (checkedChange)="toggleOption(option)"
            [disabled]="internalDisabled()"
          />
        }
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  options = input.required<string[]>();
  label = input<string>('');
  value = input<Set<string>>(new Set());
  disabled = input<boolean>(false);

  valueChange = output<Set<string>>();

  internalValue = signal<Set<string>>(new Set());
  internalDisabled = signal<boolean>(false);

  constructor() {
    effect(() => {
      const val = this.value();
      untracked(() => this.internalValue.set(new Set(val)));
    });
    effect(() => {
      const d = this.disabled();
      untracked(() => this.internalDisabled.set(d));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: Set<string>) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { };

  toggleOption(option: string) {
    if (this.internalDisabled()) return;

    const next = new Set(this.internalValue());
    if (next.has(option)) {
      next.delete(option);
    } else {
      next.add(option);
    }

    this.internalValue.set(next);
    this.onChange(next);
    this.onTouched();
    this.valueChange.emit(next);
  }

  // ControlValueAccessor methods
  writeValue(value: Set<string>): void {
    this.internalValue.set(value instanceof Set ? new Set(value) : new Set());
  }

  registerOnChange(fn: (value: Set<string>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
