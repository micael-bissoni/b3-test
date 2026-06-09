/**
 * @vitest-environment jsdom
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddressFormComponent } from './address-form.component';
import { describe, it, expect, beforeEach, vi, beforeAll, afterEach } from 'vitest';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Component, Input } from '@angular/core';

// Import nested components to ensure TestBed recognizes them
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent } from '../../atoms/select/select.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-icon',
  standalone: true,
  template: ''
})
class MockIconComponent {
  @Input() name: string = '';
  @Input() size: string = '';
  @Input() intent: string = '';
}

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let fb: FormBuilder;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddressFormComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormFieldComponent,
        InputComponent,
        SelectComponent,
        MockIconComponent
      ],
    })
    .overrideComponent(AddressFormComponent, {
      remove: { imports: [IconComponent] },
      add: { imports: [MockIconComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    
    component.group = fb.group({
      type: ['MAIN', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: [''],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['Portugal', Validators.required],
    });

    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when control is touched and invalid', () => {
    const streetControl = component.group.get('street');
    streetControl?.markAsTouched();
    streetControl?.setValue('');
    
    fixture.detectChanges();
    
    expect(component.getControlError('street')).toBe('organisms.addressForm.errors.required');
  });

  it('should emit onRemove when remove button is clicked', async () => {
    const spy = vi.spyOn(component.onRemove, 'emit');
    
    fixture.componentRef.setInput('showRemove', true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector('button');
    expect(removeButton).toBeTruthy();
    removeButton.click();

    expect(spy).toHaveBeenCalled();
  });
});
