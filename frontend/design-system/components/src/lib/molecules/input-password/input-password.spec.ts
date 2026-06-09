import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPasswordComponent } from './input-password.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

describe('InputPasswordComponent', () => {
  let component: InputPasswordComponent;
  let fixture: ComponentFixture<InputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputPasswordComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideStore({})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to type password', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.type).toBe('password');
  });

  it('should toggle type when clicking visibility button', () => {
    const button = fixture.nativeElement.querySelector('button');
    const inputElement = fixture.nativeElement.querySelector('input');

    button.click();
    fixture.detectChanges();
    expect(inputElement.type).toBe('text');
    expect(component.showPassword()).toBe(true);

    button.click();
    fixture.detectChanges();
    expect(inputElement.type).toBe('password');
    expect(component.showPassword()).toBe(false);
  });

  it('should hide toggle button if showVisibilityToggle is false', () => {
    fixture.componentRef.setInput('showVisibilityToggle', false);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeFalsy();
  });

  it('should show prefix icon if prefixIcon is provided', () => {
    fixture.componentRef.setInput('prefixIcon', 'lock');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('ds-icon[name="lock"]');
    expect(icon).toBeTruthy();
  });

  it('should hide prefix icon if prefixIcon is undefined', () => {
    fixture.componentRef.setInput('prefixIcon', undefined);
    fixture.detectChanges();
    const iconWrapper = fixture.nativeElement.querySelector('.absolute.left-5');
    expect(iconWrapper).toBeFalsy();
  });

  it('should implement ControlValueAccessor', () => {
    const val = 'new-password';
    component.writeValue(val);
    expect(component.internalValue()).toBe(val);

    let capturedValue = '';
    component.registerOnChange((v: string) => capturedValue = v);
    component.onValueChange('changed');
    expect(capturedValue).toBe('changed');

    let touched = false;
    component.registerOnTouched(() => touched = true);
    component.onBlur();
    expect(touched).toBe(true);
  });
});
