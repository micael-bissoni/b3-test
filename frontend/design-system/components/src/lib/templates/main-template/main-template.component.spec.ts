import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainTemplateComponent } from './main-template.component';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [MainTemplateComponent],
  template: `
    <ds-main-template>
      <div header id="test-header">Header Title</div>
      <div navigation id="test-navigation">Aside Navigation</div>
      <div id="test-content">Main Content Body</div>
    </ds-main-template>
  `
})
class HostComponent {}

describe('MainTemplateComponent', () => {
  let component: MainTemplateComponent;
  let fixture: ComponentFixture<MainTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTemplateComponent, TranslateModule.forRoot(), HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render projected content', () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    
    const header = hostFixture.nativeElement.querySelector('#test-header');
    const nav = hostFixture.nativeElement.querySelector('#test-navigation');
    const content = hostFixture.nativeElement.querySelector('#test-content');

    expect(header).toBeTruthy();
    expect(header.textContent).toBe('Header Title');
    expect(nav).toBeTruthy();
    expect(content).toBeTruthy();
  });

  it('should render title and appName in default mode', () => {
    fixture.componentRef.setInput('title', 'Test Dashboard');
    fixture.componentRef.setInput('appName', 'TEST-STORE');
    fixture.componentRef.setInput('headerSlot', false);
    fixture.componentRef.setInput('asideSlot', false);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('#header-slot');
    expect(header.textContent).toContain('Test Dashboard');

    const aside = fixture.nativeElement.querySelector('#side-nav-slot');
    expect(aside.textContent).toContain('TEST-STORE');
  });

  it('should hide defaults when slot boolean is true', () => {
    fixture.componentRef.setInput('title', 'Test Dashboard');
    fixture.componentRef.setInput('headerSlot', true);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('#header-slot');
    expect(header.textContent).not.toContain('Test Dashboard');
  });
});
