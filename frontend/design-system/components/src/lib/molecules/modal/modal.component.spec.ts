// @vitest-environment jsdom
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible by default', () => {
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal).toBeFalsy();
  });

  it('should be visible when isOpen is true', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal).toBeTruthy();
  });

  it('should emit close event when close button is clicked', () => {
    const spy = vi.spyOn(component.close, 'emit');
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('[data-testid="ds-modal-close"]');
    closeButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit close event when backdrop is clicked and closeOnBackdrop is true', () => {
    const spy = vi.spyOn(component.close, 'emit');
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('closeOnBackdrop', true);
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('[data-testid="ds-modal-backdrop"]');
    backdrop.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should not emit close event when backdrop is clicked and closeOnBackdrop is false', () => {
    const spy = vi.spyOn(component.close, 'emit');
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('closeOnBackdrop', false);
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('[data-testid="ds-modal-backdrop"]');
    backdrop.click();

    expect(spy).not.toHaveBeenCalled();
  });
});
