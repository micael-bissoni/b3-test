import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { describe, beforeEach, it, expect, vi } from 'vitest';

@Component({
  template: `
    <ds-navigation-bar [selectedCount]="count" [navigationItems]="items">
      <div navigation>Test Navigation</div>
    </ds-navigation-bar>
  `,
  standalone: true,
  imports: [NavigationBarComponent],
})
class TestHostComponent {
  count = 0;
  items = [
    { id: '1', label: 'Home', active: true },
    { id: '2', label: 'Settings', active: false },
  ];
}

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation items', () => {
    fixture.componentRef.setInput('navigationItems', [
      { id: '1', label: 'Home', active: true },
    ]);
    fixture.detectChanges();
    const navItems = fixture.nativeElement.querySelectorAll('ds-navigation-bar-item');
    expect(navItems.length).toBe(1);
    expect(navItems[0].textContent).toContain('Home');
  });

  it('should show the add button when selectedCount is 0', () => {
    fixture.componentRef.setInput('selectedCount', 0);
    fixture.detectChanges();

    const addButton = fixture.nativeElement.querySelector('[data-testid="navbar-add-button"]');
    const actionContainer = fixture.nativeElement.querySelector('[data-testid="navbar-action-group"]');

    expect(addButton).toBeTruthy();
    expect(actionContainer).toBeFalsy();
  });

  it('should show the action group (Edit/Delete) and counter when selectedCount > 0', () => {
    fixture.componentRef.setInput('selectedCount', 5);
    fixture.detectChanges();

    const addButton = fixture.nativeElement.querySelector('[data-testid="navbar-add-button"]');
    const actionContainer = fixture.nativeElement.querySelector('[data-testid="navbar-action-group"]');
    const counter = fixture.nativeElement.querySelector('[data-testid="navbar-counter"]');

    expect(addButton).toBeFalsy();
    expect(actionContainer).toBeTruthy();
    expect(counter?.textContent).toContain('5');
  });

  it('should emit deleteSelected when the delete button is clicked', () => {
    const spy = vi.spyOn(component.deleteSelected, 'emit');
    fixture.componentRef.setInput('selectedCount', 1);
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('[data-testid="navbar-delete-button"]');
    deleteButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit itemSelected when a navigation item is clicked', () => {
    const spy = vi.spyOn(component.itemSelected, 'emit');
    const items = [{ id: '1', label: 'Home', active: false }];
    fixture.componentRef.setInput('navigationItems', items);
    fixture.detectChanges();

    const navItem = fixture.nativeElement.querySelector('[data-testid="navigation-bar-item"]');
    navItem.click();

    expect(spy).toHaveBeenCalledWith(items[0]);
  });

  it('should render navigation item icons if provided', () => {
    fixture.componentRef.setInput('navigationItems', [
      { id: '1', label: 'Home', active: true, icon: 'home' },
    ]);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('ds-icon');
    expect(icon).toBeTruthy();
  });

  it('should render projected navigation', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    
    expect(hostFixture.nativeElement.textContent).toContain('Test Navigation');
  });

  it('should render the mobile logo', () => {
    const mobileLogo = fixture.nativeElement.querySelector('[data-testid="navbar-mobile-logo"]');
    expect(mobileLogo).toBeTruthy();
  });
});
