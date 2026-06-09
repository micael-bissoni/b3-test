import { ChangeDetectionStrategy, Component, forwardRef, inject, DestroyRef, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyInputComponent } from '@trevvo/design-system';

@Component({
  selector: 'ds-cdb-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    CurrencyInputComponent,
    ButtonComponent,
    FormFieldComponent,
    TranslateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CdbFormComponent),
      multi: true,
    }
  ],
  template: `
    <div [formGroup]="cdbForm" class="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      <ds-form-field
        label="organisms.cdbForm.investedIncomeLabel"
        [error]="getInvestedIncomeError()"
      >
        <ds-currency-input
          type="currency"
          formControlName="investedIncome"
          placeholder="organisms.cdbForm.investedIncomePlaceholder"
          (onEnterPressed)="onCalculate.emit()">
        </ds-currency-input>
      </ds-form-field>
      <ds-form-field
        label="organisms.cdbForm.termInMonthsLabel"
        [error]="getTermInMonthsError()"
      >
        <ds-input
          type="number"
          formControlName="termInMonths"
          placeholder="organisms.cdbForm.termInMonthsPlaceholder"
          (onEnterPressed)="onCalculate.emit()">
          <span prefix class="text-gray-dark font-medium">x</span>
        </ds-input>
      </ds-form-field>

      <div class="mt-8">
        <ds-button 
          (click)="onCalculate.emit()"
          [disabled]="cdbForm.invalid || isSubmitting()"
          intent="primary"
          [fullWidth]="true"
          class="!rounded-xl !h-16 text-lg font-bold shadow-xl shadow-gray-dark/20 transition-all active:scale-[0.98]"
        >
          @if (isSubmitting()) {
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{{ 'organisms.cdbForm.loadingBtn' | translate }}</span>
            </div>
          } @else {
            {{ 'organisms.cdbForm.calculateBtn' | translate }}
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
export class CdbFormComponent implements ControlValueAccessor {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  isSubmitting = input(false);

  cdbForm: FormGroup = this.fb.group({
    investedIncome: ['', [Validators.required, Validators.min(0)]],
    termInMonths: ['', [Validators.required, Validators.min(1)]]
  });

  onCalculate = output<void>();

  onChange: (value: unknown) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    this.cdbForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        this.onChange(val);
      });
  }

  getInvestedIncomeError(): string {
    const control = this.cdbForm.get('investedIncome');
    if (control?.touched && control?.invalid) {
      return 'organisms.cdbForm.errors.investedIncomeInvalid';
    }
    return '';
  }

  getTermInMonthsError(): string {
    const control = this.cdbForm.get('termInMonths');
    if (control?.touched && control?.invalid) {
      return 'organisms.cdbForm.errors.termInMonthsInvalid';
    }
    return '';
  }

  writeValue(value: unknown): void {
    if (value) {
      this.cdbForm.patchValue(value as object, { emitEvent: false });
    } else {
      this.cdbForm.reset({}, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.cdbForm.disable() : this.cdbForm.enable();
  }
}
