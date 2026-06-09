import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';
import { describe, beforeEach, it, expect, afterEach, beforeAll } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../../atoms/icon/icon.component';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    } catch (e) {
      // already initialized
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent, CardComponent, IconComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('value', '1234');
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and value', () => {
    const label = fixture.nativeElement.querySelector('.text-gray-medium');
    const value = fixture.nativeElement.querySelector('.text-2xl');
    expect(label.textContent).toContain('Test Label');
    expect(value.textContent).toContain('1234');
  });

  it('should apply correct trend color for up direction', () => {
    fixture.componentRef.setInput('trendValue', '+10%');
    fixture.componentRef.setInput('trendDirection', 'up');
    fixture.detectChanges();
    
    const trend = fixture.nativeElement.querySelector('.text-success');
    expect(trend).toBeTruthy();
  });

  it('should apply correct trend color for down direction', () => {
    fixture.componentRef.setInput('trendValue', '-5%');
    fixture.componentRef.setInput('trendDirection', 'down');
    fixture.detectChanges();
    
    const trend = fixture.nativeElement.querySelector('.text-danger');
    expect(trend).toBeTruthy();
  });
});
