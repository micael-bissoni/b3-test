import { Component, forwardRef, inject, input, Input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { cn, DSCurrencyPipe } from '../../utils';
import { inputVariants, InputVariants } from './input.variants';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'ds-currency-input',
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
        [value]="displayValue"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
        [placeholder]="placeholder() | translate"
        type="text"
        [disabled]="disabled()"
        (keydown.enter)="onEnterPressed.emit()"
        [class]="calculatedClass"
        data-testid="ds-currency-input"
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
            useExisting: forwardRef(() => CurrencyInputComponent),
            multi: true
        },
        DSCurrencyPipe
    ]
})
export class CurrencyInputComponent implements ControlValueAccessor {

    currencyPipe = inject(DSCurrencyPipe);
    disabledInput = input<boolean>(false, { alias: 'disabled' });
    variant = input<InputVariants['variant']>('default');
    class = input<string>('');
    placeholder = input<string>('');

    valueChange = output<string>();
    onBlurEvent = output<void>();
    onEnterPressed = output<void>();

    disabled = signal<boolean>(false);

    private rawValue: number | null = null;
    displayValue: string = '';

    private onChange: (value: number | null) => void = () => { };
    private onTouched: () => void = () => { };

    get calculatedClass(): string {
        const defaultClasses = inputVariants({ variant: this.variant() });
        return cn(
            defaultClasses,
            'pl-5 pr-5 group-has-[[prefix]]:pl-14 group-has-[[suffix]]:pr-14',
            this.class()
        );
    }

    writeValue(value: number | null): void {
        this.rawValue = value;
        this.displayValue = value != null ? this.format(value) : '';
    }

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    private format(value: number): string {
        const valueNormalized = value / 100;
        return this.currencyPipe.transform(valueNormalized) ?? '';
    }

    private parse(text: string): number | null {
        if (!text) return null;

        const isNegative = text.includes('-');
        const cleaned = text.replace(/\D/g, '');
        if (!cleaned) return null;

        let result = parseInt(cleaned, 10);
        return isNegative ? -result : result;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        
        const selectionStart = input.selectionStart || 0;
        const previousValue = input.value;
        
        const parsed = this.parse(input.value);

        this.rawValue = parsed;
        this.onChange(parsed);

        if (parsed !== null) {
            this.displayValue = this.format(parsed);
        } else {
            this.displayValue = '';
        }
        
        const offset = this.displayValue.length - previousValue.length;
        input.value = this.displayValue;
        
        let newSelectionStart = selectionStart + offset;
        if (newSelectionStart < 0) newSelectionStart = 0;
        
        input.setSelectionRange(newSelectionStart, newSelectionStart);
    }

    onBlur(): void {
        this.onTouched();
    }

    onFocus(): void {
        // Keep formatted value on focus
    }
}
