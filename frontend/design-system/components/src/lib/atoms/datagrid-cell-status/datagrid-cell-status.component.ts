import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from '../badge/badge.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-datagrid-cell-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BadgeComponent, TranslatePipe],
  template: `
    <div class="flex flex-col">
      @if (editMode() && control()) {
        <select [formControl]="control()!" class="form-select text-xs px-2 py-1 rounded-md border border-gray-light bg-white focus:outline-none focus:ring-4 focus:ring-primary/20">
          <option value="Ativo">{{ 'atoms.datagridCellStatus.active' | translate }}</option>
          <option value="Inativo">{{ 'atoms.datagridCellStatus.inactive' | translate }}</option>
          <option value="Pendente">{{ 'atoms.datagridCellStatus.pending' | translate }}</option>
          <option value="Rejeitado">{{ 'atoms.datagridCellStatus.rejected' | translate }}</option>
          <option value="Cancelado">{{ 'atoms.datagridCellStatus.canceled' | translate }}</option>
          <option value="Erro">{{ 'atoms.datagridCellStatus.error' | translate }}</option>
        </select>
      } @else {
        <ds-badge [intent]="intent()">{{ (control()?.value || status()) | translate }}</ds-badge>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCellStatusComponent {
  status = input<string>('');
  editMode = input<boolean>(false);
  control = input<FormControl<string | null>>();
  
  intent = () => {
    const s = (this.control()?.value || this.status()).toLowerCase();
    if (s.includes('sucedido') || s.includes('ativo') || s.includes('sucesso') || s.includes('active')) return 'success';
    if (s.includes('pendente') || s.includes('waiting')) return 'warning';
    if (s.includes('cancelado') || s.includes('erro') || s.includes('error') || s.includes('inactive') || s.includes('rejeitado')) return 'danger';
    return 'neutral';
  }
}
