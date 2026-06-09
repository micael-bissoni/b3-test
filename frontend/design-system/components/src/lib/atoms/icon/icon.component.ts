import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iconVariants, type IconVariants } from './icon.variants';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ds-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      data-testid="ds-icon"
      [class]="calculatedClass"
      [style.maskImage]="'var(--icon-' + name() + ')'"
      [style.-webkit-mask-image]="'var(--icon-' + name() + ')'"
    ></span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class IconComponent {
  name = input.required<string>();
  intent = input<IconVariants['intent']>('primary');
  size = input<IconVariants['size']>('medium');

  class = input<string>('');

  get calculatedClass(): string {
    return cn(iconVariants({ intent: this.intent(), size: this.size() }), this.class());
  }
}
