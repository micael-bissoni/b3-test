// @vitest-environment jsdom
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TranslateModule } from '@ngx-translate/core';
import { describe, beforeEach, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { EntityFormComponent } from './entity-form.component';
import { type EntityData } from './entity-form.types';
import { type SelectOption } from '../../atoms/select/select.component';

describe('EntityFormComponent', () => {
  let component: EntityFormComponent;
  let fixture: ComponentFixture<EntityFormComponent>;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EntityFormComponent,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('entityTypeOptions', [
      { label: 'Lab', value: 'Laboratório' },
      { label: 'Pharmacy', value: 'Farmácia' }
    ]);
    fixture.componentRef.setInput('parentOptions', [
      { label: 'Parent 1', value: 'parent-1' }
    ]);

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.entityForm.get('isActive')?.value).toBe(false);
    expect(component.entityForm.get('isActive')?.disabled).toBe(true);
    expect(component.entityForm.get('parentId')?.value).toBe('');
  });

  it('should validate EIK as mandatory and correct pattern', () => {
    const eikControl = component.entityForm.get('eik');
    eikControl?.setValue('');
    expect(eikControl?.valid).toBe(false);

    eikControl?.setValue('invalid eik');
    expect(eikControl?.valid).toBe(false);

    eikControl?.setValue('EIK-123');
    expect(eikControl?.valid).toBe(true);
  });

  it('should validate VAT with custom algorithm', () => {
    const vatControl = component.entityForm.get('vat');

    // Invalid length
    vatControl?.setValue('123');
    expect(vatControl?.valid).toBe(false);

    // Invalid check digit
    vatControl?.setValue('123456780'); 
    expect(vatControl?.errors?.['vatInvalid']).toBeTruthy();

    // Valid Portuguese VAT
    vatControl?.setValue('123456789');
    expect(vatControl?.valid).toBe(true);
  });

  it('should make VAT mandatory if parentId is not set', () => {
    const vatControl = component.entityForm.get('vat');
    const parentControl = component.entityForm.get('parentId');

    parentControl?.setValue('');
    fixture.detectChanges();
    
    expect(component.isVatRequired()).toBe(true);
    vatControl?.setValue('');
    expect(vatControl?.errors?.['required']).toBeTruthy();
  });

  it('should make VAT optional if parentId is set', () => {
    const vatControl = component.entityForm.get('vat');
    const parentControl = component.entityForm.get('parentId');

    parentControl?.setValue('parent-123');
    fixture.detectChanges();
    
    expect(component.isVatRequired()).toBe(false);
    vatControl?.setValue('');
    expect(vatControl?.errors?.['required']).toBeFalsy();
  });

  it('should emit onSave when form is valid', () => {
    const spy = vi.spyOn(component.onSave, 'emit');

    const validData: EntityData = {
      eik: 'EIK123',
      type: 'Farmácia',
      name: 'Farmácia Central',
      vat: '123456789',
      isActive: true,
      logo: 'logo.png',
      abbreviation: 'pha-cen'
    };

    component.entityForm.patchValue(validData);
    component.submit();

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      eik: 'EIK123'
    }));
  });

  it('should mark all fields as touched on invalid submit', () => {
    component.entityForm.patchValue({ eik: '' });
    component.submit();

    expect(component.entityForm.get('eik')?.touched).toBe(true);
  });
});
