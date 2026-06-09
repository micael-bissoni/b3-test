import { ChangeDetectionStrategy, Component, forwardRef, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-input-password',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent, IconComponent, ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="relative group">
      <ds-input 
        [type]="showPassword() ? 'text' : 'password'" 
        [placeholder]="placeholder()"
        [value]="internalValue()"
        [disabled]="disabled()"
        variant="premium"
        (valueChange)="onValueChange($event)"
        (onBlurEvent)="onBlur()"
        (keydown.enter)="onEnterPressed.emit()"
        [class]="class()"
        data-testid="ds-input-password"
      >
        <ng-content select="[prefix]" prefix></ng-content>

        @if (showVisibilityToggle()) {
          <ds-button 
            suffix
            type="button" 
            intent="ghost"
            (click)="toggleVisibility()" 
            class="!bg-transparent !p-2 transition-colors focus:outline-none"
            [title]="(showPassword() ? 'molecules.inputPassword.hidePassword' : 'molecules.inputPassword.showPassword') | translate"
          >
            <ds-icon [name]="showPassword() ? 'visibility_off' : 'visibility'" size="small" class="opacity-40 hover:opacity-100 transition-opacity"></ds-icon>
          </ds-button>
        }
      </ds-input>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent implements ControlValueAccessor {
  placeholder = input<string>('••••');
  showVisibilityToggle = input<boolean>(true);
  class = input<string>('');
  
  onEnterPressed = output<void>();

  showPassword = signal<boolean>(false);
  internalValue = signal<string>('');
  disabled = signal<boolean>(false);


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => { };

  onValueChange(val: string) {
    this.internalValue.set(val);
    this.onChange(val);
  }

  onBlur() {
    this.onTouched();
  }

  toggleVisibility() {
    this.showPassword.set(!this.showPassword());
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
