import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ds-data-grid-column',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="calculatedClass" data-testid="data-grid-column-header">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridColumnComponent {
  label = input<string>('');
  align = input<'left' | 'center' | 'right'>('left');
  width = input<string>('');
  class = input<string>('');

  get calculatedClass(): string {
    return cn(
      'p-4 text-[10px] font-black text-gray-medium uppercase tracking-widest',
      {
        'text-left': this.align() === 'left',
        'text-center': this.align() === 'center',
        'text-right': this.align() === 'right',
      },
      this.class()
    );
  }
}
