import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { ButtonComponent } from '../button/button.component';

import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render projected icon inside a button', async () => {
    @Component({
      standalone: true,
      imports: [InputComponent, ButtonComponent],
      template: `
        <ds-input>
          <ds-button id="test-button" prefix (click)="handleIconClick()">
            <svg id="test-icon"></svg>
          </ds-button>
        </ds-input>
      `
    })
    class TestWrapper {
      handleIconClick = vi.fn();
    }

    const wrapperFixture = TestBed.createComponent(TestWrapper);
    const wrapperComponent = wrapperFixture.componentInstance;
    wrapperFixture.detectChanges();
    
    const iconElement = wrapperFixture.nativeElement.querySelector('#test-icon');
    const buttonElement = wrapperFixture.nativeElement.querySelector('#test-button');
    
    expect(iconElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    
    buttonElement.click();
    expect(wrapperComponent.handleIconClick).toHaveBeenCalled();
  });

  it('should render with correct placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Search...');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('input');
    expect(element.placeholder).toBe('Search...');
  });

  it('should emit value when typing', () => {
    const spy = vi.spyOn(component.valueChange, 'emit');
    const element = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    element.value = 'hello';
    element.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('hello');
  });

  it('should work with formControl', () => {
    const control = new FormControl('initial');
    // We'll wrap it in a parent component to test Reactive Forms integration properly if needed,
    // but for now let's just test that it implements the interface correctly.

    // Write value
    component.writeValue('new value');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(element.value).toBe('new value');

    // Change value from UI
    let changedValue = '';
    component.registerOnChange((v: string) => changedValue = v);
    element.value = 'ui value';
    element.dispatchEvent(new Event('input'));
    expect(changedValue).toBe('ui value');

    // Register touched
    let isTouched = false;
    component.registerOnTouched(() => isTouched = true);
    element.dispatchEvent(new Event('blur'));
    expect(isTouched).toBe(true);

    // Disable state
    component.setDisabledState?.(true);
    fixture.detectChanges();
    expect(element.disabled).toBe(true);
  });

  it('should render projected prefix', async () => {
    @Component({
      standalone: true,
      imports: [InputComponent],
      template: `
        <ds-input>
          <span id="test-prefix" prefix>$</span>
        </ds-input>
      `
    })
    class TestWrapper {}

    const wrapperFixture = TestBed.createComponent(TestWrapper);
    wrapperFixture.detectChanges();
    
    const prefixElement = wrapperFixture.nativeElement.querySelector('#test-prefix');
    expect(prefixElement).toBeTruthy();
    expect(prefixElement.textContent).toBe('$');
  });

  it('should render projected suffix', async () => {
    @Component({
      standalone: true,
      imports: [InputComponent],
      template: `
        <ds-input>
          <span id="test-suffix" suffix>.00</span>
        </ds-input>
      `
    })
    class TestWrapper {}

    const wrapperFixture = TestBed.createComponent(TestWrapper);
    wrapperFixture.detectChanges();
    
    const suffixElement = wrapperFixture.nativeElement.querySelector('#test-suffix');
    expect(suffixElement).toBeTruthy();
    expect(suffixElement.textContent).toBe('.00');
  });
});
