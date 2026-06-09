import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { describe, beforeEach, it, expect, afterEach, vi, beforeAll } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('rangeLabel', '1 - 10 de 100');
    fixture.componentRef.setInput('totalPages', 10);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit prev event when clicking previous button', () => {
    const emitSpy = vi.spyOn(component.prev, 'emit');
    const prevBtn = fixture.nativeElement.querySelector('[data-testid="pagination-prev"]');
    prevBtn.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit next event when clicking next button', () => {
    const emitSpy = vi.spyOn(component.next, 'emit');
    const nextBtn = fixture.nativeElement.querySelector('[data-testid="pagination-next"]');
    nextBtn.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit goToPage event when entering a number in the input', () => {
    const emitSpy = vi.spyOn(component.goToPage, 'emit');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('[data-testid="pagination-input"]');
    
    // Simular input de valor e pressionar enter ou perder o foco?
    // User hasn't specified the interaction, but usually for pagination input it's either on change or on Enter.
    // I'll emit goToPage when the value changes.
    input.value = '5';
    input.dispatchEvent(new Event('input'));
    
    expect(emitSpy).toHaveBeenCalledWith(5);
  });

  it('should emit 1 when user enters a value less than 1', () => {
    const emitSpy = vi.spyOn(component.goToPage, 'emit');
    const input = fixture.nativeElement.querySelector('[data-testid="pagination-input"]');
    
    input.value = '0';
    input.dispatchEvent(new Event('input'));
    
    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should emit max pages when user enters a value greater than total pages', () => {
    const emitSpy = vi.spyOn(component.goToPage, 'emit');
    const input = fixture.nativeElement.querySelector('[data-testid="pagination-input"]');
    
    input.value = '20';
    input.dispatchEvent(new Event('input'));
    
    expect(emitSpy).toHaveBeenCalledWith(10);
  });
});
