import { ChangeDetectionStrategy, Component, forwardRef, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { cn } from '../../utils/cn';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule],
  template: `
    <div class="relative w-full group">
      <select
        [disabled]="disabled()"
        [value]="internalValue()"
        (change)="onSelect($event)"
        (blur)="onBlur()"
        [class]="calculatedClass()"
        data-testid="ds-select"
      >
        @if (placeholder()) {
          <option value="" disabled selected>{{ placeholder() | translate }}</option>
        }
        @for (option of options(); track option.value) {
          <option [value]="option.value">{{ option.label | translate }}</option>
        }
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-medium group-focus-within:text-primary transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  options = input<SelectOption[]>([]);
  placeholder = input<string>('');
  class = input<string>('');
  
  valueChange = output<string | number>();
  onBlurEvent = output<void>();

  internalValue = signal<string | number>('');
  disabled = signal<boolean>(false);

  calculatedClass = computed(() => 
    cn(
      'w-full bg-primary/10 border-none rounded-xl px-4 h-14 text-sm appearance-none outline-none focus:ring-4 focus:ring-primary/20 transition-all cursor-pointer disabled:bg-gray-light/10 disabled:cursor-not-allowed text-gray-dark font-base shadow-sm hover:bg-primary/[0.15]',
      this.class()
    )
  );

  private onChange: (value: string | number) => void = () => { };
  private onTouched: () => void = () => { };

  onSelect(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    const numericVal = isNaN(Number(val)) ? val : Number(val);
    this.internalValue.set(numericVal);
    this.onChange(numericVal);
    this.valueChange.emit(numericVal);
  }

  onBlur() {
    this.onTouched();
    this.onBlurEvent.emit();
  }

  // ControlValueAccessor methods
  writeValue(value: string | number): void {
    this.internalValue.set(value || '');
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
