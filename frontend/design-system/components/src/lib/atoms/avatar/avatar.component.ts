import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { avatarVariants, type AvatarVariants } from './avatar.variants';
import { cn } from '../../utils/cn';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-avatar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div [class]="rootClasses()">
      @if (src()) {
        <img
          [src]="src()"
          [alt]="alt() | translate"
          class="h-full w-full object-cover"
        />
      } @else {
        <span class="font-bold uppercase tracking-tighter">
          {{ initials() }}
        </span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  src = input<string | null>(null);
  firstName = input<string | null>(null);
  lastName = input<string | null>(null);
  alt = input<string>('atoms.avatar.alt');
  size = input<AvatarVariants['size']>('md');
  variant = input<AvatarVariants['variant']>('primary');
  customClass = input<string>('', { alias: 'class' });

  initials = computed(() => {
    const f = this.firstName() || '';
    const l = this.lastName() || '';
    if (!f && !l) return '?';
    return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase();
  });

  rootClasses = computed(() => {
    return cn(
      avatarVariants({ 
        size: this.size(), 
        variant: this.variant() 
      }), 
      this.customClass()
    );
  });
}
