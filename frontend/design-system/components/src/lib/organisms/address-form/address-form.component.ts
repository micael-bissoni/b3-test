import { ChangeDetectionStrategy, Component, Input, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent } from '../../atoms/select/select.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';

/**
 * Organism: AddressFormComponent
 * 
 * A reusable form component for managing address data.
 * Designed to be used within a FormArray or as a standalone form group.
 */
@Component({
  selector: 'ds-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InputComponent,
    SelectComponent,
    IconComponent,
    FormFieldComponent
  ],
  template: `
    <div [formGroup]="group" class="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 relative group">
      <!-- Address Type Selector -->
      <div class="md:col-span-12 flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary"></div>
          <span class="text-sm font-semibold text-gray-700 uppercase tracking-wider">{{ 'organisms.addressForm.address' | translate }}</span>
        </div>
      </div>

      <div class="md:col-span-4">
        <ds-form-field label="organisms.addressForm.fields.type" [required]="true" [error]="getControlError('type')">
          <ds-select 
            [options]="addressTypeOptions" 
            formControlName="type" 
            placeholder="organisms.addressForm.placeholders.type"
          ></ds-select>
        </ds-form-field>
      </div>

      <div class="md:col-span-8">
        <ds-form-field label="organisms.addressForm.fields.street" [required]="true" [error]="getControlError('street')">
          <ds-input formControlName="street" placeholder="organisms.addressForm.placeholders.street"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-3">
        <ds-form-field label="organisms.addressForm.fields.number" [required]="true" [error]="getControlError('number')">
          <ds-input formControlName="number" placeholder="organisms.addressForm.placeholders.number"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-4">
        <ds-form-field label="organisms.addressForm.fields.neighborhood" [error]="getControlError('neighborhood')">
          <ds-input formControlName="neighborhood" placeholder="organisms.addressForm.placeholders.neighborhood"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-5">
        <ds-form-field label="organisms.addressForm.fields.complement" [error]="getControlError('complement')">
          <ds-input formControlName="complement" placeholder="organisms.addressForm.placeholders.complement"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-4">
        <ds-form-field label="organisms.addressForm.fields.city" [required]="true" [error]="getControlError('city')">
          <ds-input formControlName="city" placeholder="organisms.addressForm.placeholders.city"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-4">
        <ds-form-field label="organisms.addressForm.fields.state" [required]="true" [error]="getControlError('state')">
          <ds-input formControlName="state" placeholder="organisms.addressForm.placeholders.state"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-4">
        <ds-form-field label="organisms.addressForm.fields.postalCode" [required]="true" [error]="getControlError('postalCode')">
          <ds-input formControlName="postalCode" placeholder="organisms.addressForm.placeholders.postalCode"></ds-input>
        </ds-form-field>
      </div>

      <div class="md:col-span-12">
        <ds-form-field label="organisms.addressForm.fields.country" [required]="true" [error]="getControlError('country')">
          <ds-input formControlName="country" placeholder="organisms.addressForm.placeholders.country"></ds-input>
        </ds-form-field>
      </div>
      
      <!-- Remove Button (Absolute Positioned) -->
      <button 
        *ngIf="showRemove"
        type="button"
        (click)="onRemoveClick()"
        class="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 text-red-500 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center"
      >
        <ds-icon name="close" size="small"></ds-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent {
  @Input({ required: true }) group!: FormGroup;
  @Input() showRemove = false;

  onRemove = output<void>();

  addressTypeOptions = [
    { label: 'organisms.addressForm.types.main', value: 'MAIN' },
    { label: 'organisms.addressForm.types.shipping', value: 'SHIPPING' },
    { label: 'organisms.addressForm.types.billing', value: 'BILLING' },
    { label: 'organisms.addressForm.types.other', value: 'OTHER' }
  ];

  getControlError(path: string): string {
    const control = this.group.get(path);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'organisms.addressForm.errors.required';
      return 'organisms.addressForm.errors.invalid';
    }
    return '';
  }

  onRemoveClick() {
    this.onRemove.emit();
  }
}
