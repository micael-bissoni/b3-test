// @vitest-environment jsdom
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { describe, beforeEach, it, expect, beforeAll, afterEach } from 'vitest';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ModalComponent Size', () => {
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

  it('should apply default size md', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal.className).toContain('sm:max-w-md');
  });

  it('should apply size sm', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal.className).toContain('sm:max-w-sm');
  });

  it('should apply size lg', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal.className).toContain('sm:max-w-lg');
  });

  it('should apply size xl', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('size', 'xl');
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal.className).toContain('sm:max-w-2xl');
  });

  it('should apply size full', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('size', 'full');
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[data-testid="ds-modal"]');
    expect(modal.className).toContain('sm:max-w-[calc(100%-2rem)]');
  });
});
