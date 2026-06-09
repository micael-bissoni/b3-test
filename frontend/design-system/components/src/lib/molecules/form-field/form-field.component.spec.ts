import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'User Name');
    fixture.detectChanges();
    
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('User Name');
  });

  it('should show required indicator when required is true', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    
    const indicator = fixture.nativeElement.querySelector('.text-danger');
    expect(indicator.textContent).toContain('*');
  });

  it('should show error message when provided', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();
    
    const error = fixture.nativeElement.querySelector('[data-testid="ds-form-field-error"]');
    expect(error.textContent).toContain('This field is required');
  });

  it('should show hint message when provided and no error exists', () => {
    fixture.componentRef.setInput('hint', 'Enter your full name');
    fixture.detectChanges();
    
    const hint = fixture.nativeElement.querySelector('[data-testid="ds-form-field-hint"]');
    expect(hint.textContent).toContain('Enter your full name');
  });
});
