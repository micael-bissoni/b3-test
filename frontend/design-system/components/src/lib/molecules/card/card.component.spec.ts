import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default variants', () => {
    const card = fixture.nativeElement.querySelector('[data-testid="ds-card"]');
    expect(card.className).toContain('border-gray-light');
    expect(card.className).toContain('p-6');
  });

  it('should apply custom variant and padding', () => {
    fixture.componentRef.setInput('variant', 'flat');
    fixture.componentRef.setInput('padding', 'sm');
    fixture.detectChanges();
    
    const card = fixture.nativeElement.querySelector('[data-testid="ds-card"]');
    expect(card.className).toContain('bg-gray-light');
    expect(card.className).toContain('p-4');
  });
});
