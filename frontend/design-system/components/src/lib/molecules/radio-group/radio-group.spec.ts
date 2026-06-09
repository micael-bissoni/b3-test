import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupComponent } from './radio-group.component';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupComponent, ReactiveFormsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
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
    const control = new FormControl('A');

    // Write value
    component.writeValue('B');
    fixture.detectChanges();
    expect(component.internalValue()).toBe('B');

    // Change value via select
    let changedValue = '';
    component.registerOnChange((v: string) => changedValue = v);

    component.selectOption('C');
    expect(changedValue).toBe('C');
  });
});
