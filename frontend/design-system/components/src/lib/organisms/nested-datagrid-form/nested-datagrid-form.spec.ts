import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedDatagridFormComponent } from './nested-datagrid-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';
import { type DataGridColumn, type DataGridNestedConfig, type DataGridRecord } from '../data-grid/data-grid.types';

describe('NestedDatagridFormComponent', () => {
  let component: NestedDatagridFormComponent;
  let fixture: ComponentFixture<NestedDatagridFormComponent>;

  const mockColumns: DataGridColumn[] = [
    { id: '1', label: 'Nome', key: 'name' },
    { id: '2', label: 'Cargo', key: 'role' }
  ];

  const mockNestedConfig: DataGridNestedConfig = {
    dataKey: 'subItems',
    columns: [
      { id: '3', label: 'Tarefa', key: 'task' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NestedDatagridFormComponent,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NestedDatagridFormComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('nestedConfig', mockNestedConfig);
    
    await fixture.whenStable();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty formValue', () => {
    expect(component.formValue()).toEqual([]);
  });

  it('should show editor when onAddRow is called', async () => {
    component.onAddRow(null);
    fixture.detectChanges();
    
    const editorTitle = fixture.nativeElement.querySelector('h3');
    expect(editorTitle).toBeTruthy();
    expect(editorTitle.textContent).toContain('organisms.nestedForm.editTitle');
  });

  it('should update value and call onChange when a new row is saved', async () => {
    const onChangeSpy = vi.fn();
    component.registerOnChange(onChangeSpy);

    // Simulate opening editor
    component.onAddRow(null);
    fixture.detectChanges();

    // Fill temp data
    component.tempRowData = { name: 'Test User', role: 'Developer' };
    
    // Save
    component.confirmSave();
    fixture.detectChanges();
    
    const newValue = component.formValue();
    expect(newValue.length).toBe(1);
    expect(newValue[0]['name']).toBe('Test User');
    expect(onChangeSpy).toHaveBeenCalledWith(newValue);
  });

  it('should remove a row and update value', async () => {
    const onChangeSpy = vi.fn();
    const initialData: DataGridRecord[] = [
      { id: '123', name: 'User 1', role: 'Dev' },
      { id: '456', name: 'User 2', role: 'Designer' }
    ];
    
    component.writeValue(initialData);
    component.registerOnChange(onChangeSpy);
    fixture.detectChanges();

    // Remove first row
    component.onRemoveRow(initialData[0]);
    fixture.detectChanges();
    
    expect(component.formValue().length).toBe(1);
    expect(component.formValue()[0]['id']).toBe('456');
    expect(onChangeSpy).toHaveBeenCalledWith([initialData[1]]);
  });
});
