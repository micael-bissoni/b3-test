import { ChangeDetectionStrategy, Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { cn } from '../../utils/cn';
import { inputVariants, type InputVariants } from './input.variants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule],
  template: `
    <div class="relative w-full group">
      <div 
        class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 z-10 opacity-0 pointer-events-none group-has-[[prefix]]:opacity-100 group-has-[[prefix]]:pointer-events-auto"
      >
        <ng-content select="[prefix]"></ng-content>
      </div>
      <input
        [type]="type()"
        [placeholder]="placeholder() | translate"
        [value]="internalValue()"
        [disabled]="disabled()"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (keydown.enter)="onEnterPressed.emit()"
        [class]="calculatedClass"
        data-testid="ds-input"
      />
      <div 
        class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 z-10 text-gray-medium opacity-0 pointer-events-none group-has-[[suffix]]:opacity-100 group-has-[[suffix]]:pointer-events-auto"
      >
        <ng-content select="[suffix]"></ng-content>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {

  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  disabledInput = input<boolean>(false, { alias: 'disabled' });
  variant = input<InputVariants['variant']>('default');
  class = input<string>('');

  valueChange = output<string>();
  onBlurEvent = output<void>();
  onEnterPressed = output<void>();

  internalValue = signal<string>('');
  disabled = signal<boolean>(false);


  constructor() {
    effect(() => {
      const val = this.value();
      untracked(() => this.internalValue.set(val || ''));
    });
    effect(() => {
      const d = this.disabledInput();
      untracked(() => this.disabled.set(d));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { };

  get calculatedClass(): string {
    const defaultClasses = inputVariants({ variant: this.variant() });
    return cn(
      defaultClasses,
      'pl-5 pr-5 group-has-[[prefix]]:pl-14 group-has-[[suffix]]:pr-14',
      this.class()
    );
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onBlur() {
    this.onTouched();
    this.onBlurEvent.emit();
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
