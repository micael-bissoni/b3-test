import { ChangeDetectionStrategy, Component, forwardRef, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'ds-search-bar',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  template: `
    <div 
      class="flex bg-white rounded-2xl border border-gray-light p-0 md:p-1.5 shadow-sm focus-within:ring-4 focus-within:ring-primary/20 transition-all w-full"
      data-testid="ds-search-bar"
    >
      <div class="p-2.5 text-gray-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <ds-input 
        [placeholder]="placeholder()"
        [value]="internalValue()"
        [disabled]="disabled()"
        (valueChange)="onValueChange($event)"
        (onBlurEvent)="onBlur()"
        class="flex-1"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements ControlValueAccessor {
  placeholder = input<string>('');
  value = input<string>('');

  valueChange = output<string>();

  internalValue = signal<string>('');
  disabled = signal<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { };

  onValueChange(val: string) {
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onBlur() {
    this.onTouched();
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
    this.disabled.set(isDisabled);
  }
}
