import { ChangeDetectionStrategy, Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { IconComponent } from '../../atoms/icon/icon.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'ds-navigation-bar-item',
  standalone: true,
  imports: [CommonModule, TranslatePipe, IconComponent],
  template: `
    <button 
      type="button"
      [class.opacity-100]="active()"
      [class.opacity-70]="!active()"
      [ngClass]="active() ? 'bg-primary/20 text-primary md:bg-white/20 md:text-white' : 'bg-transparent text-gray-dark md:text-on-primary'"
      (click)="select.emit()"
      class="px-4 py-2.5 rounded-md text-sm cursor-pointer transition-all
             flex items-center justify-center gap-2
             md:justify-start md:mt-1 font-bold tracking-tight lowercase
             hover:bg-gray-light md:hover:bg-white/10 hover:opacity-100 outline-none w-full"
    >
      @if (icon()) {
        <ds-icon [name]="icon()" [intent]="'inherit'" [size]="'small'"></ds-icon>
      }
      <span class="text-[10px] md:text-sm capitalize">{{ label() | translate }}</span>
      @if (active() && !isDesktop()) {
        <div class="absolute -bottom-2 w-1.5 h-1.5 bg-primary rounded-full md:hidden"></div>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarItemComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isDesktop = toSignal(this.breakpointObserver.observe('(min-width: 768px)').pipe(map(result => result.matches)), { initialValue: false });

  active = input<boolean>(false);
  label = input<string>('');
  icon = input<string>('');
  select = output<void>();
}
