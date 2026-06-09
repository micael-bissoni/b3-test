import { ChangeDetectionStrategy, Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { cn } from '../../utils/cn';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  template: `
    <div 
      (click)="toggle()" 
      class="flex items-center gap-3 cursor-pointer group"
      [class.opacity-50]="internalDisabled()"
      [class.pointer-events-none]="internalDisabled()"
    >
      <div 
        [class]="cn(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
          internalChecked() ? 'bg-primary border-primary' : 'bg-white border-slate-300'
        )"
      >
        @if (internalChecked()) { 
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-width="4" d="M5 13l4 4L19 7"></path>
          </svg> 
        }
      </div>
      @if (label()) {
        <span class="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{{label() | translate}}</span>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input<string>('');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);

  internalChecked = signal<boolean>(false);
  internalDisabled = signal<boolean>(false);

  checkedChange = output<boolean>();

  onChange: (value: boolean) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    effect(() => {
      const c = this.checked();
      untracked(() => this.internalChecked.set(c));
    });
    effect(() => {
      const d = this.disabled();
      untracked(() => this.internalDisabled.set(d));
    });
  }

  toggle() {
    if (this.internalDisabled()) return;
    const newVal = !this.internalChecked();
    this.internalChecked.set(newVal);
    this.onChange(newVal);
    this.onTouched();
    this.checkedChange.emit(newVal);
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.internalChecked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }

  protected cn = cn;
}
