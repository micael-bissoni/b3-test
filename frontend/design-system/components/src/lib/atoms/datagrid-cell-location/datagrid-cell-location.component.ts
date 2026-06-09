import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-datagrid-cell-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, TranslatePipe],
  template: `
    <div class="flex flex-col w-full min-w-[100px]">
      @if (editMode() && control()) {
        <ds-input [formControl]="control()!" [placeholder]="'atoms.datagridCellLocation.placeholder' | translate" />
      } @else {
        <div class="text-xs font-black text-gray-medium uppercase truncate">
          {{ (control()?.value || pais()) | translate }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCellLocationComponent {
  pais = input<string>('');
  editMode = input<boolean>(false);
  control = input<FormControl<string | null>>();
}
