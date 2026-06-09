import { ChangeDetectionStrategy, Component, forwardRef, inject, DestroyRef, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../atoms/icon/icon.component';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputPasswordComponent } from '../../molecules/input-password/input-password.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-create-account-form',
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
      useExisting: forwardRef(() => CreateAccountFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="accountForm" class="space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
      <!-- Name Field -->
      <ds-form-field
        label="organisms.createAccount.name"
        [error]="getNameError()"
      >
        <ds-input 
          type="text" 
          formControlName="name"
          placeholder="organisms.createAccount.namePlaceholder"
        >
          <ds-icon prefix name="person" size="small"></ds-icon>
        </ds-input>
      </ds-form-field>

      <!-- Email Field -->
      <ds-form-field
        label="organisms.createAccount.email"
        [error]="getEmailError()"
      >
        <ds-input 
          type="email" 
          formControlName="email"
          placeholder="organisms.createAccount.emailPlaceholder"
        >
          <ds-icon prefix name="alternate_email" size="small"></ds-icon>
        </ds-input>
      </ds-form-field>

      <!-- Password Field -->
      <ds-form-field
        label="organisms.createAccount.password"
        [error]="getPasswordError()"
      >
        <ds-input-password
          formControlName="password"
          placeholder="organisms.createAccount.passwordPlaceholder"
        >
          <ds-icon prefix name="lock" size="small"></ds-icon>
        </ds-input-password>
      </ds-form-field>

      <!-- Confirm Password Field -->
      <ds-form-field
        label="organisms.createAccount.confirmPassword"
        [error]="getConfirmPasswordError()"
      >
        <ds-input-password
          formControlName="confirmPassword"
          placeholder="organisms.createAccount.confirmPasswordPlaceholder"
          (onEnterPressed)="onSubmit()"
        >
          <ds-icon prefix name="lock" size="small"></ds-icon>
        </ds-input-password>
      </ds-form-field>

      <div class="pt-4">
        <ds-button 
          (click)="onSubmit()"
          [disabled]="accountForm.invalid || isSubmitting()"
          intent="primary"
          [fullWidth]="true"
          class="!rounded-xl !h-16 text-lg font-bold shadow-xl shadow-gray-dark/20 transition-all active:scale-[0.98]"
        >
          @if (isSubmitting()) {
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{{ 'organisms.createAccount.loadingBtn' | translate }}</span>
            </div>
          } @else {
            {{ 'organisms.createAccount.createBtn' | translate }}
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
export class CreateAccountFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  isSubmitting = input(false);

  accountForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  onCreateAccount = output<void>();

  onChange: (value: unknown) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    this.accountForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        this.onChange(val);
      });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  getNameError(): string {
    const control = this.accountForm.get('name');
    if (control?.touched && control?.invalid) {
      return 'organisms.createAccount.errors.nameRequired';
    }
    return '';
  }

  getEmailError(): string {
    const control = this.accountForm.get('email');
    if (control?.touched && control?.invalid) {
      return 'organisms.createAccount.errors.emailInvalid';
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.accountForm.get('password');
    if (control?.touched && control?.invalid) {
      return 'organisms.createAccount.errors.passwordRequired';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.accountForm.get('confirmPassword');
    if (control?.touched && control?.errors?.['passwordMismatch']) {
      return 'organisms.createAccount.errors.passwordsDontMatch';
    }
    return '';
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.onCreateAccount.emit();
    }
  }

  writeValue(value: unknown): void {
    if (value) {
      this.accountForm.patchValue(value as object, { emitEvent: false });
    } else {
      this.accountForm.reset({}, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.accountForm.disable() : this.accountForm.enable();
  }
}
