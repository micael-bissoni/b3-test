import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'Test Message');
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Message');
  });

  it('should emit closed event when close button is clicked', () => {
    const spy = vi.spyOn(component.closed, 'emit');
    const closeButton = fixture.nativeElement.querySelector('[data-testid="ds-toast-close"]');
    closeButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit closed event after duration', fakeAsync(() => {
    const spy = vi.spyOn(component.closed, 'emit');
    fixture.componentRef.setInput('duration', 1000);
    
    // Trigger ngOnInit again by recreating or manually calling logic if needed
    // But since it's already created, we might need to set duration before ngOnInit
    
    // Let's recreate for this test
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'Test Message');
    fixture.componentRef.setInput('duration', 1000);
    fixture.detectChanges(); // ngOnInit runs here

    tick(1000);
    expect(spy).toHaveBeenCalled();
  }));
});
