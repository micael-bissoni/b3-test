import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
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

    // Select (Radio always becomes true when clicked)
    let changedValue = false;
    component.registerOnChange((v: boolean) => changedValue = v);
    
    component.select();
    expect(changedValue).toBe(true);
    expect(component.internalChecked()).toBe(true);
  });
});
