import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ds-data-grid-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ButtonComponent],
  template: `
    <header class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl lg:text-3xl font-black text-gray-dark tracking-tight">{{ title() | translate }}</h1>
        <p class="text-gray-medium font-medium italic text-xs">{{ subtitle() | translate }}</p>
      </div>
      @if (actionLabel()) {
        <ds-button [intent]="'primary'" [size]="'small'" [fullWidth]="false" (click)="actionClicked.emit()">{{ actionLabel() | translate }}</ds-button>
      }
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  actionLabel = input<string>('');

  actionClicked = output<void>();
}
