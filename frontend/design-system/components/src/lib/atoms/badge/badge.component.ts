import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { badgeVariants, type BadgeVariants } from './badge.variants';

@Component({
  selector: 'ds-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="calculatedClass" data-testid="ds-badge">
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  intent = input<BadgeVariants['intent']>('neutral');
  class = input<string>('');

  get calculatedClass(): string {
    return cn(badgeVariants({ intent: this.intent() }), this.class());
  }
}
