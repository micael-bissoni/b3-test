import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ds-divider',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="calculatedClass()" role="separator" data-testid="ds-divider"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  margin = input<'none' | 'sm' | 'md' | 'lg'>('md');
  class = input<string>('');

  calculatedClass = computed(() => 
    cn(
      'bg-gray-light shrink-0',
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
      this.margin() === 'sm' && (this.orientation() === 'horizontal' ? 'my-2' : 'mx-2'),
      this.margin() === 'md' && (this.orientation() === 'horizontal' ? 'my-4' : 'mx-4'),
      this.margin() === 'lg' && (this.orientation() === 'horizontal' ? 'my-8' : 'mx-8'),
      this.class()
    )
  );
}
