import { ChangeDetectionStrategy, Component, forwardRef, inject, DestroyRef, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../atoms/icon/icon.component';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputPasswordComponent } from '../../molecules/input-password/input-password.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconComponent,
    InputComponent,
    ButtonComponent,
    InputPasswordComponent,
    FormFieldComponent,
    TranslateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="loginForm" class="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      <!-- Email Field -->
      <ds-form-field
        label="organisms.login.email"
        [error]="getEmailError()"
      >
        <ds-input 
          type="email" 
          formControlName="email"
          placeholder="organisms.login.emailPlaceholder"
          (onEnterPressed)="onSignIn.emit()"
        >
          <ds-icon prefix name="alternate_email" size="small"></ds-icon>
        </ds-input>
      </ds-form-field>

      <!-- Password Field -->
      <ds-form-field
        label="organisms.login.password"
        [error]="getPasswordError()"
      >
        <div class="flex justify-between items-center absolute right-1 top-0 -translate-y-full mb-1">
          <a href="#" class="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline decoration-2 transition-all">
            {{ 'organisms.login.forgotPassword' | translate }}
          </a>
        </div>
        
        <ds-input-password
          formControlName="password"
          placeholder="organisms.login.passwordPlaceholder"
          (onEnterPressed)="onSignIn.emit()"
        >
          <ds-icon prefix name="lock" size="small"></ds-icon>
        </ds-input-password>
      </ds-form-field>

      <div class="mt-8">
        <ds-button 
          (click)="onSignIn.emit()"
          [disabled]="loginForm.invalid || isSubmitting()"
          intent="primary"
          [fullWidth]="true"
          class="!rounded-xl !h-16 text-lg font-bold shadow-xl shadow-gray-dark/20 transition-all active:scale-[0.98]"
        >
          @if (isSubmitting()) {
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{{ 'organisms.login.loadingBtn' | translate }}</span>
            </div>
          } @else {
            {{ 'organisms.login.loginBtn' | translate }}
          }
        </ds-button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  isSubmitting = input(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSignIn = output<void>();

  onChange: (value: unknown) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    this.loginForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        this.onChange(val);
      });
  }

  getEmailError(): string {
    const control = this.loginForm.get('email');
    if (control?.touched && control?.invalid) {
      return 'organisms.login.errors.emailInvalid';
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.loginForm.get('password');
    if (control?.touched && control?.invalid) {
      return 'organisms.login.errors.passwordRequired';
    }
    return '';
  }

  writeValue(value: unknown): void {
    if (value) {
      this.loginForm.patchValue(value as object, { emitEvent: false });
    } else {
      this.loginForm.reset({}, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.loginForm.disable() : this.loginForm.enable();
  }
}
