import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-datagrid-cell-designation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, TranslatePipe],
  template: `
    <div class="flex flex-col gap-1">
      <span class="text-[9px] font-mono text-gray-medium">{{ id() }}</span>
      @if (editMode() && control()) {
        <ds-input [formControl]="control()!" [placeholder]="'atoms.datagridCellDesignation.placeholder' | translate" />
      } @else {
        <span class="font-bold text-gray-dark truncate max-w-[300px]">{{ (control()?.value || name()) | translate }}</span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCellDesignationComponent {
  id = input<string>('');
  name = input<string>('');
  editMode = input<boolean>(false);
  control = input<FormControl<string | null>>();
}
