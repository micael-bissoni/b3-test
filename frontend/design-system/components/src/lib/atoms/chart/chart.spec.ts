import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    fixture.componentRef.setInput('type', 'bar');
    fixture.componentRef.setInput('data', { labels: [], datasets: [] });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a canvas element', () => {
    fixture.componentRef.setInput('type', 'line');
    fixture.componentRef.setInput('data', { labels: [], datasets: [] });
    fixture.detectChanges();
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });
});
