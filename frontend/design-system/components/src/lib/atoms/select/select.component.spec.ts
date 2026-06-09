import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, TranslateModule.forRoot(), FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options', () => {
    const select = fixture.nativeElement.querySelector('select');
    expect(select.options.length).toBe(2);
    expect(select.options[0].text).toBe('Option 1');
    expect(select.options[1].text).toBe('Option 2');
  });

  it('should render placeholder when provided', () => {
    fixture.componentRef.setInput('placeholder', 'Select an option');
    fixture.detectChanges();
    
    const select = fixture.nativeElement.querySelector('select');
    expect(select.options.length).toBe(3);
    expect(select.options[0].text).toBe('Select an option');
    expect(select.options[0].disabled).toBeTruthy();
  });

  it('should emit value changes', () => {
    const emitSpy = vi.spyOn(component.valueChange, 'emit');
    const select = fixture.nativeElement.querySelector('select');
    
    select.value = '2';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    
    expect(emitSpy).toHaveBeenCalledWith(2); // Numeric conversion
  });

  it('should handle ControlValueAccessor writeValue', () => {
    component.writeValue('2');
    fixture.detectChanges();
    
    const select = fixture.nativeElement.querySelector('select');
    expect(select.value).toBe('2');
  });
});
