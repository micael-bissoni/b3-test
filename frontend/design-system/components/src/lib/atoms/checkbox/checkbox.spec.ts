import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work with formControl', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const control = new FormControl(false);
    
    // Write value
    component.writeValue(true);
    fixture.detectChanges();
    expect(component.internalChecked()).toBe(true);

    // Toggle
    let changedValue = false;
    component.registerOnChange((v: boolean) => changedValue = v);
    
    component.toggle();
    expect(changedValue).toBe(false);
    expect(component.internalChecked()).toBe(false);
  });
});
