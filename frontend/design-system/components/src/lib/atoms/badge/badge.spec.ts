import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct class for success intent', () => {
    fixture.componentRef.setInput('intent', 'success');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('span');
    expect(element.className).toContain('text-success');
    expect(element.className).toContain('bg-success');
  });

  it('should render content projected', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostFixture.detectChanges();
    const badgeElement = testHostFixture.nativeElement.querySelector('ds-badge');
    expect(badgeElement.textContent).toContain('Active');
  });
});

import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [BadgeComponent],
  template: `<ds-badge>Active</ds-badge>`,
})
class TestHostComponent {}
