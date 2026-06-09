import { ChangeDetectionStrategy, Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { cn } from '../../utils/cn';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  template: `
    <div 
      (click)="select()" 
      class="flex items-center gap-3 cursor-pointer group"
      [class.opacity-50]="internalDisabled()"
      [class.pointer-events-none]="internalDisabled()"
    >
      <div 
        [class]="cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
          internalChecked() ? 'border-primary' : 'border-slate-300'
        )"
      >
        @if (internalChecked()) { 
          <div class="w-2.5 h-2.5 bg-primary rounded-full animate-in zoom-in-0 scale-95 duration-100"></div> 
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
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements ControlValueAccessor {
  label = input<string>('');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  
  internalChecked = signal<boolean>(false);
  internalDisabled = signal<boolean>(false);

  checkedChange = output<boolean>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

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

  select() {
    if (this.internalDisabled()) return;
    this.internalChecked.set(true);
    this.onChange(true);
    this.onTouched();
    this.checkedChange.emit(true);
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
