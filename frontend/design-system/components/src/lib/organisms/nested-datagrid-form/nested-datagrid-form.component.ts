import { ChangeDetectionStrategy, Component, forwardRef, inject, DestroyRef, input, signal, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NestedDatagridComponent } from '../../molecules/nested-datagrid/nested-datagrid.component';
import { type DataGridColumn, type DataGridNestedConfig, type DataGridRecord } from '../data-grid/data-grid.types';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { InputComponent } from '../../atoms/input/input.component';
import { TranslateModule } from '@ngx-translate/core';

interface EditingRow {
  parentRow: DataGridRecord | null;
  level: number;
}

@Component({
  selector: 'ds-nested-datagrid-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NestedDatagridComponent,
    ButtonComponent,
    FormFieldComponent,
    InputComponent,
    TranslateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedDatagridFormComponent),
      multi: true,
    }
  ],
  template: `
    <div class="space-y-6">
      <ds-nested-datagrid 
        [columns]="columns()"
        [data]="formValue()"
        [nestedConfig]="nestedConfig()"
        (nestedAddRow)="onAddRow($event)"
        (nestedRemoveRow)="onRemoveRow($event)"
      />

      @if (editingRow(); as edit) {
        <div class="p-6 bg-white rounded-2xl border border-gray-light shadow-xl animate-in fade-in zoom-in duration-300">
          <div class="flex items-center justify-between mb-6 border-b border-gray-light pb-4">
            <div>
              <h3 class="text-sm font-black uppercase tracking-widest text-gray-dark">
                {{ 'organisms.nestedForm.editTitle' | translate }}
              </h3>
              @if (edit.parentRow) {
                <p class="text-[10px] text-gray-medium uppercase tracking-wider mt-1">
                  Adicionando a: {{ edit.parentRow['name'] || edit.parentRow['id'] }}
                </p>
              }
            </div>
            <ds-button intent="ghost" size="icon" shape="circle" (click)="editingRow.set(null)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </ds-button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (col of currentEditingColumns(); track col.id) {
              <ds-form-field [label]="col.label">
                <ds-input 
                  [placeholder]="col.label"
                  [(ngModel)]="tempRowData[col.key || '']"
                  [ngModelOptions]="{standalone: true}"
                />
              </ds-form-field>
            }
          </div>

          <div class="mt-8 flex justify-end gap-3">
            <ds-button intent="ghost" (click)="editingRow.set(null)">
              {{ 'common.cancel' | translate }}
            </ds-button>
            <ds-button intent="primary" (click)="confirmSave()">
              {{ 'common.save' | translate }}
            </ds-button>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDatagridFormComponent implements ControlValueAccessor {
  columns = input.required<DataGridColumn[]>();
  nestedConfig = input<DataGridNestedConfig>();

  formValue = signal<DataGridRecord[]>([]);
  editingRow = signal<EditingRow | null>(null);
  tempRowData: Record<string, unknown> = {};

  private onChange: (value: DataGridRecord[]) => void = () => {};
  private onTouched: () => void = () => {};

  currentEditingColumns(): DataGridColumn[] {
    const edit = this.editingRow();
    if (!edit) return [];
    if (edit.level === 1) return this.columns();
    
    let config = this.nestedConfig();
    for (let i = 1; i < edit.level; i++) {
      if (!config) break;
      config = config.nestedConfig;
    }
    return config?.columns || [];
  }

  onAddRow(event: { parentRow: DataGridRecord } | null) {
    this.tempRowData = {};
    this.editingRow.set({ 
      parentRow: event?.parentRow || null, 
      level: event?.parentRow ? 2 : 1
    });
  }

  confirmSave() {
    const edit = this.editingRow();
    if (!edit) return;

    const currentData = JSON.parse(JSON.stringify(this.formValue())) as DataGridRecord[];
    const newId = crypto.randomUUID();
    const newEntry: DataGridRecord = { ...this.tempRowData, id: newId };
    
    if (!edit.parentRow) {
      currentData.push(newEntry);
    } else {
      this.addToNested(currentData, String(edit.parentRow['id']), newEntry);
    }

    this.formValue.set(currentData);
    this.onChange(currentData);
    this.editingRow.set(null);
  }

  private addToNested(data: DataGridRecord[], parentId: string, newRow: DataGridRecord): boolean {
    const config = this.nestedConfig();
    const key = config?.dataKey || 'children';
    
    for (const item of data) {
      if (String(item['id']) === parentId) {
        if (!Array.isArray(item[key])) {
          item[key] = [];
        }
        (item[key] as DataGridRecord[]).push(newRow);
        return true;
      }
      
      const children = item[key];
      if (Array.isArray(children) && this.addToNested(children as DataGridRecord[], parentId, newRow)) {
        return true;
      }
    }
    return false;
  }

  onRemoveRow(row: DataGridRecord) {
    const currentData = JSON.parse(JSON.stringify(this.formValue())) as DataGridRecord[];
    const updatedData = this.removeFromNested(currentData, String(row['id']));
    this.formValue.set(updatedData);
    this.onChange(updatedData);
  }

  private removeFromNested(data: DataGridRecord[], id: string): DataGridRecord[] {
    const config = this.nestedConfig();
    const key = config?.dataKey || 'children';
    
    return data.filter(item => {
      if (String(item['id']) === id) return false;
      
      const children = item[key];
      if (Array.isArray(children)) {
        item[key] = this.removeFromNested(children as DataGridRecord[], id);
      }
      return true;
    });
  }

  // ControlValueAccessor
  writeValue(value: DataGridRecord[]): void {
    this.formValue.set(value || []);
  }

  registerOnChange(fn: (value: DataGridRecord[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }
}
