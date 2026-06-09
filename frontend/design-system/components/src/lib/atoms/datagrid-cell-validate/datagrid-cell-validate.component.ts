import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'ds-datagrid-cell-validate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  template: `
    <div class="flex gap-2 items-center">
      @if (editMode() && controlInicio() && controlFim()) {
        <ds-input [formControl]="controlInicio()!" type="date" class="w-28" />
        <span class="text-gray-medium font-bold text-[10px]">—</span>
        <ds-input [formControl]="controlFim()!" type="date" class="w-28" />
      } @else {
        <div class="text-center text-[10px] font-mono font-bold text-gray-medium whitespace-nowrap">
          {{ controlInicio()?.value || dataInicio() }} • {{ controlFim()?.value || dataFim() }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCellValidateComponent {
  dataInicio = input<string>('');
  dataFim = input<string>('');
  editMode = input<boolean>(false);
  controlInicio = input<FormControl<string | null>>();
  controlFim = input<FormControl<string | null>>();
}
