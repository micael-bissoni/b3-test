import { describe, it, expect, beforeEach, vi, beforeAll, afterEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

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
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        LoginFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('invalid-email');
    expect(email.errors?.['email']).toBeTruthy();
    
    email.setValue('test@example.com');
    expect(email.errors).toBeNull();
  });

  it('should validate password is required', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('');
    expect(password.errors?.['required']).toBeTruthy();
    
    password.setValue('password123');
    expect(password.errors).toBeNull();
  });

  it('should emit onSignIn when triggered', () => {
    const spy = vi.spyOn(component.onSignIn, 'emit');
    component.onSignIn.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should render the submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('ds-button');
    expect(button).toBeTruthy();
  });
});
