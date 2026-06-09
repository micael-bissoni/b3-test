import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationItem, UserProfile } from './main-template.types';
import { AvatarComponent } from '../../atoms/avatar/avatar.component';
import { NavigationBarComponent } from '../../organisms/navigation-bar/navigation-bar.component';

@Component({
  selector: 'ds-main-template',
  standalone: true,
  imports: [CommonModule, TranslatePipe, AvatarComponent, NavigationBarComponent],
  template: `
    <div
      class="grid h-screen w-full overflow-hidden
             grid-cols-1 grid-rows-[auto_1fr_auto]
             md:grid-cols-[var(--ds-sidebar-width,280px)_1fr] md:grid-rows-[80px_1fr]"
    >
      <aside
        id="side-nav-slot"
        class="row-start-3 col-start-1 h-24 md:h-auto
               md:col-start-1 md:row-start-1 md:row-span-2
               overflow-y-auto md:bg-primary md:border-r md:border-primary"
      >
        <ng-content select="[navigation]"></ng-content>
        
        @if (!asideSlot()) {
          <ds-navigation-bar 
            [navigationItems]="navigationItems()"
            [appName]="appName()"
            [selectedCount]="selectedCount()"
            (addSelected)="addSelected.emit()"
            (editSelected)="editSelected.emit()"
            (deleteSelected)="deleteSelected.emit()"
            (itemSelected)="itemSelected.emit($event)"
          />
        }
      </aside>

      <header
        id="header-slot"
        class="row-start-1 col-start-1
               md:col-start-2 md:row-start-1
               flex items-center px-6 z-10 bg-surface-primary border-b border-gray-light"
      >
        <ng-content select="[header]"></ng-content>
        
        @if (!headerSlot()) {
          <div class="flex justify-between items-center w-full">
            <h1 class="text-xl font-headers font-bold text-primary">
              {{ title() | translate }}
            </h1>

            @if (user(); as u) {
              <div class="flex gap-4 items-center p-2">
                <ds-avatar 
                  [src]="u.avatarSrc" 
                  [firstName]="u.firstName" 
                  [lastName]="u.lastName"
                  size="md"
                />
                <div class="hidden sm:flex flex-col">
                  <span class="text-sm font-bold text-primary leading-none">
                    {{ u.firstName }} {{ u.lastName }}
                  </span>
                </div>
              </div>
            }
          </div>
        }

      </header>

      <!-- Main Content (Center right for Desktop, Center for Mobile) -->
      <main
        id="content-slot"
        class="row-start-2 col-start-1
               md:col-start-2 md:row-start-2
               overflow-auto bg-surface-secondary"
      >
        <ng-content></ng-content>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTemplateComponent {
  // Specialized inputs
  appName = input<string>('TREVVO');
  title = input<string>('');
  navigationItems = input<NavigationItem[]>([]);
  user = input<UserProfile | null>(null);
  selectedCount = input<number>(0);
  headerSlot = input<boolean>(false);
  asideSlot = input<boolean>(false);

  // Outputs forwarded to NavigationBar
  addSelected = output<void>();
  editSelected = output<void>();
  deleteSelected = output<void>();
  itemSelected = output<NavigationItem>();
}
