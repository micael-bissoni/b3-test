import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationItem } from '../../templates/main-template/main-template.types';
import { IconComponent } from '../../atoms/icon/icon.component';
import { RouterModule } from '@angular/router';
import { NavigationBarItemComponent } from '../../molecules/navigation-bar-item/navigation-bar-item.component';

@Component({
  selector: 'ds-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, IconComponent, NavigationBarItemComponent],
  template: `
    <div 
      class="z-[100] transition-all duration-300
             fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-lg
             md:static md:translate-x-0 md:w-full md:max-w-none md:h-full"
    >
      <div 
        class="flex flex-row items-center relative h-20 p-2
               bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-white
               md:flex-col md:items-stretch md:h-full md:p-6 md:bg-primary md:rounded-none md:shadow-none md:border-none"
      >
        <!-- Mobile Logo -->
        <div 
          class="hidden min-[367px]:flex items-center ml-1 xl:mb-4"
          data-testid="navbar-mobile-logo"
        >
          <div class="w-14 h-14 bg-primary rounded-full shadow-lg border border-gray-light flex items-center justify-center active:scale-90 transition-all overflow-hidden">
            <div 
              class="w-8 h-8 bg-contain bg-no-repeat bg-center"
              [style.backgroundImage]="'var(--icon-logo)'"
            ></div>
            </div>
            <span class="hidden md:flex text-on-primary ml-2 font-headers font-bold text-xl tracking-tight uppercase">
              {{ appName() }}
            </span>
        </div>

        <div class="flex-1 flex flex-row justify-around items-center px-4 md:flex-col md:justify-start md:items-stretch md:px-0 md:gap-1">
          <!-- Navigation Items -->
          <nav class="flex flex-row gap-4 md:flex-col md:gap-1">
            @for (item of navigationItems(); track item.id) {
              <ds-navigation-bar-item 
                #rla="routerLinkActive"
                [active]="rla.isActive"
                [label]="item.label"
                [icon]="item.icon || ''"
                [routerLink]="item.route"
                routerLinkActive="bg-primary text-primary md:bg-white md:text-white"
                [routerLinkActiveOptions]="{ exact: true }"
                (select)="onItemClick(item)"
                data-testid="navigation-bar-item"
                class="text-gray-dark md:text-on-primary"
              />
            }
          </nav>
          
          <ng-content select="[navigation]"></ng-content>
        </div>

        <!-- Action Section (Floating look on mobile, Bottom on desktop) -->
        <div class="flex items-center gap-2 pr-2 h-full md:h-auto md:mt-auto md:pr-0 md:pt-6 md:border-t md:border-white/20">
          @if (selectedCount() === 0) {
            <button 
              type="button"
              data-testid="navbar-add-button"
              (click)="addSelected.emit()"
              class="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-all hover:opacity-90
                     md:w-full md:h-auto md:py-3 md:rounded-md md:shadow-none md:bg-white md:text-primary md:font-bold"
            >
              <svg class="w-8 h-8 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="3" d="M12 4v16m8-8H4"></path>
              </svg>
              <span class="hidden md:inline ml-2">{{ 'common.add' | translate }}</span>
            </button>
          } @else {
            <div 
              data-testid="navbar-action-group"
              class="flex items-center gap-2 relative bg-gray-light p-0 md:p-1.5 rounded-full border border-gray-light/50 animate-slide-in
                     md:flex-col md:w-full md:bg-transparent md:border-none"
            >
              <div 
                data-testid="navbar-counter"
                class="absolute -top-4 -right-1 bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xl border-2 border-white z-10 animate-bounce
                       md:static md:mb-2 md:text-xs md:py-1 md:w-full md:text-center md:bg-white md:text-primary"
              >
                {{ selectedCount() }}<span class="hidden md:inline">&nbsp;{{ (selectedCount() === 1 ? 'common.itemSelected' : 'common.itemsSelected') | translate }}</span>
              </div>
              <div class="flex gap-2 w-full">
                <button 
                  type="button"
                  data-testid="navbar-edit-button"
                  (click)="editSelected.emit()"
                  class="w-11 h-11 bg-white text-gray-dark rounded-full shadow-sm flex items-center justify-center active:scale-90 transition-all border border-gray-light hover:bg-gray-light
                         md:flex-1 md:h-10 md:rounded-md"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button 
                  type="button"
                  (click)="deleteSelected.emit()"
                  data-testid="navbar-delete-button"
                  class="w-11 h-11 bg-danger text-on-danger rounded-full shadow-md flex items-center justify-center active:scale-90 transition-all hover:opacity-90
                         md:flex-1 md:h-10 md:rounded-md"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  navigationItems = input<NavigationItem[]>([]);
  appName = input<string>('TREVVO');
  selectedCount = input<number>(0);

  deleteSelected = output<void>();
  addSelected = output<void>();
  editSelected = output<void>();
  itemSelected = output<NavigationItem>();

  onItemClick(item: NavigationItem) {
    this.itemSelected.emit(item);
  }
}
