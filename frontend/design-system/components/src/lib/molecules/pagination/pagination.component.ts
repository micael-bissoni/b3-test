import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms';

@Component({
  selector: 'ds-pagination',
  standalone: true,
  imports: [CommonModule, InputComponent],
  template: `
    <div class="h-12 bg-white/95 backdrop-blur border-t border-gray-light flex items-center justify-start gap-4 px-6 z-20">
      <span class="text-[10px] font-mono font-black text-gray-medium uppercase tracking-tighter">
        {{ rangeLabel() }}
      </span>
      <div class="h-4 w-px bg-gray-light"></div>
      <div class="flex items-center gap-2">
        <ds-input 
          type="number"
          variant="default"
          class="!w-12 !h-7 !p-0 !text-center !text-[10px] !bg-transparent !border-gray-light font-mono font-bold"
          [value]="(currentPage() || 1).toString()"
          (valueChange)="onPageChange($event)"
          data-testid="pagination-input"
        />
        <div class="h-4 w-px bg-gray-light"></div>
        <div class="flex items-center gap-1">
          <button 
            (click)="prev.emit()" 
            [disabled]="prevDisabled()" 
            class="p-0 md:p-1.5 text-gray-medium hover:text-primary disabled:opacity-10 transition-all"
            data-testid="pagination-prev"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-width="3" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button 
            (click)="next.emit()" 
            [disabled]="nextDisabled()" 
            class="p-0 md:p-1.5 text-gray-medium hover:text-primary disabled:opacity-10 transition-all"
            data-testid="pagination-next"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-width="3" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  rangeLabel = input.required<string>();
  currentPage = input<number>(1);
  totalPages = input<number>(1);
  prevDisabled = input<boolean>(false);
  nextDisabled = input<boolean>(false);

  prev = output<void>();
  next = output<void>();
  goToPage = output<number>();

  onPageChange(value: string) {
    let page = parseInt(value, 10);
    if (isNaN(page)) return;

    if (page < 1) {
      page = 1;
    } else if (page > this.totalPages()) {
      page = this.totalPages();
    }

    this.goToPage.emit(page);
  }
}
