import { ChangeDetectionStrategy, Component, forwardRef, input, output, signal, computed, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ds-textarea',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule],
  template: `
    <textarea
      [placeholder]="placeholder() | translate"
      [value]="internalValue()"
      [disabled]="internalDisabled()"
      [rows]="rows()"
      (input)="onInput($event)"
      (blur)="onBlur()"
      [class]="calculatedClass()"
      data-testid="ds-textarea"
    ></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements ControlValueAccessor {
  placeholder = input<string>('');
  rows = input<number>(4);
  class = input<string>('');
  disabled = input<boolean>(false);
  
  valueChange = output<string>();
  onBlurEvent = output<void>();

  internalValue = signal<string>('');
  internalDisabled = signal<boolean>(false);

  constructor() {
    effect(() => {
      const d = this.disabled();
      untracked(() => this.internalDisabled.set(d));
    });
  }

  calculatedClass = computed(() => 
    cn(
      'w-full bg-primary/10 border-none rounded-xl px-4 py-4 text-sm outline-none focus:ring-4 focus:ring-primary/20 transition-all disabled:bg-gray-light/10 disabled:cursor-not-allowed text-gray-dark font-base shadow-sm hover:bg-primary/[0.15] min-h-[120px] resize-y',
      this.class()
    )
  );

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
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
    this.internalDisabled.set(isDisabled);
  }
}
