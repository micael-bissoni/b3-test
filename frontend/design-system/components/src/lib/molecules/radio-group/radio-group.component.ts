import { ChangeDetectionStrategy, Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../atoms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RadioComponent, TranslatePipe],
  template: `
    <div 
      class="mb-8"
      [class.opacity-50]="internalDisabled()"
      [class.pointer-events-none]="internalDisabled()"
    >
      @if (label()) {
        <label class="label-industrial text-primary mb-4 block font-bold text-xs uppercase tracking-widest">{{label() | translate}}</label>
      }
      <div class="grid grid-cols-2 gap-1" role="radio-group">
        @for (option of options(); track option) {
          <ds-radio 
            [label]="option | translate"
            [checked]="internalValue() === option"
            (checkedChange)="selectOption(option)"
            [disabled]="internalDisabled()"
            role="radio"
          />
        }
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements ControlValueAccessor {
  options = input.required<string[]>();
  label = input<string>('');
  value = input<string>('');
  disabled = input<boolean>(false);

  valueChange = output<string>();

  internalValue = signal<string>('');
  internalDisabled = signal<boolean>(false);

  constructor() {
    effect(() => {
      const val = this.value();
      untracked(() => this.internalValue.set(val || ''));
    });
    effect(() => {
      const d = this.disabled();
      untracked(() => this.internalDisabled.set(d));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { };

  selectOption(option: string) {
    if (this.internalDisabled()) return;

    this.internalValue.set(option);
    this.onChange(option);
    this.onTouched();
    this.valueChange.emit(option);
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.internalValue.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
