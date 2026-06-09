import { describe, it, expect, beforeEach, vi, beforeAll, afterEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { LoginTemplateComponent } from './login-template.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../atoms/icon/icon.component';

describe('LoginTemplateComponent', () => {
  let component: LoginTemplateComponent;
  let fixture: ComponentFixture<LoginTemplateComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTemplateComponent, IconComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo and brand name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Trevvo Pharma');
  });

  it('should have an ng-content slot for the form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // We check if the layout elements that wrap the content are present
    expect(compiled.querySelector('.relative.z-10')).toBeTruthy();
  });
});
