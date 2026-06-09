import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;
  let fixture: ComponentFixture<CheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupComponent, ReactiveFormsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['A', 'B', 'C']);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work with formControl', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const control = new FormControl(new Set(['A']));
    
    // Write value
    component.writeValue(new Set(['B']));
    fixture.detectChanges();
    expect(component.internalValue().has('B')).toBe(true);
    expect(component.internalValue().has('A')).toBe(false);

    // Change value via toggle
    let changedValue = new Set<string>();
    component.registerOnChange((v: Set<string>) => changedValue = v);
    
    component.toggleOption('C');
    expect(changedValue.has('C')).toBe(true);
    expect(changedValue.has('B')).toBe(true);
  });
});
