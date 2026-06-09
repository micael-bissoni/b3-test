import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent, TranslateModule.forRoot(), FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value changes', () => {
    const emitSpy = vi.spyOn(component.valueChange, 'emit');
    const textarea = fixture.nativeElement.querySelector('textarea');
    
    textarea.value = 'Hello World';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(emitSpy).toHaveBeenCalledWith('Hello World');
  });

  it('should handle ControlValueAccessor writeValue', () => {
    component.writeValue('Initial value');
    fixture.detectChanges();
    
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe('Initial value');
  });
});
