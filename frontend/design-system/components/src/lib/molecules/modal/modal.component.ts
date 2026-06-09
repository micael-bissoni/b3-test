import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modalVariants, type ModalVariants } from './modal.variants';
import { cn } from '../../utils/cn';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center sm:p-4 p-2">
        <!-- Backdrop -->
        <div 
          data-testid="ds-modal-backdrop"
          class="fixed inset-0 bg-gray-dark/50 backdrop-blur-sm transition-opacity"
          (click)="handleBackdropClick()"
        ></div>

        <!-- Modal Container -->
        <div 
          data-testid="ds-modal"
          [class]="calculatedClass()"
        >
          <!-- Header -->
          <header class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-light bg-white shrink-0">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-dark truncate mr-4">{{ title() }}</h3>
            <ds-button 
              data-testid="ds-modal-close"
              intent="ghost" 
              size="small" 
              shape="circle"
              (click)="close.emit()"
            >
              <ds-icon name="close" size="small"></ds-icon>
            </ds-button>
          </header>

          <!-- Body -->
          <div class="p-4 sm:p-6 overflow-y-auto flex-1">
            <ng-content />
          </div>

          <!-- Footer -->
          <footer class="flex items-center justify-end gap-3 p-4 sm:p-6 bg-gray-50 border-t border-gray-light shrink-0">
            <ng-content select="[footer]" />
          </footer>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  size = input<NonNullable<ModalVariants['size']>>('md');
  closeOnBackdrop = input<boolean>(true);

  close = output<void>();

  calculatedClass = computed(() => cn(modalVariants({ size: this.size() })));

  handleBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close.emit();
    }
  }
}
