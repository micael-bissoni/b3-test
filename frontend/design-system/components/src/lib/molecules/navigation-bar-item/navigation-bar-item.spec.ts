import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarItemComponent } from './navigation-bar-item.component';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('NavigationBarItemComponent', () => {
  let component: NavigationBarItemComponent;
  let fixture: ComponentFixture<NavigationBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply active classes and show dot when active is true', () => {
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const dot = fixture.nativeElement.querySelector('.bg-primary.rounded-full');

    expect(button.className).toContain('text-primary');
    expect(dot).toBeTruthy();
  });

  it('should apply inactive classes and hide dot when active is false', () => {
    fixture.componentRef.setInput('active', false);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const dot = fixture.nativeElement.querySelector('.bg-primary.rounded-full');

    expect(button.className).toContain('text-gray-medium');
    expect(dot).toBeFalsy();
  });

  it('should emit select event when clicked', () => {
    const spy = vi.spyOn(component.select, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
