import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { cardVariants, type CardVariants } from './card.variants';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="calculatedClass()" data-testid="ds-card">
      @if (hasHeader()) {
        <div class="px-6 py-4 border-b border-gray-light">
          <ng-content select="[card-header]"></ng-content>
        </div>
      }
      <div class="flex-1">
        <ng-content></ng-content>
      </div>
      @if (hasFooter()) {
        <div class="px-6 py-4 border-t border-gray-light bg-gray-light/10">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  variant = input<CardVariants['variant']>('default');
  padding = input<CardVariants['padding']>('md');
  class = input<string>('');

  hasHeader = input<boolean>(false);
  hasFooter = input<boolean>(false);

  calculatedClass = computed(() => 
    cn(cardVariants({ variant: this.variant(), padding: this.padding() }), this.class())
  );
}
