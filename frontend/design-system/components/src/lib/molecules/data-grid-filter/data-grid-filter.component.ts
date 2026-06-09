import { ChangeDetectionStrategy, Component, computed, input, output, signal, ViewChild, ViewContainerRef, Type, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { cn } from '../../utils/cn';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { type FilterConfig, type FilterState } from './data-grid-filter.types';
import { TranslatePipe } from '@ngx-translate/core';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ds-data-grid-filter',
  standalone: true,
  imports: [CommonModule, OverlayModule, A11yModule, TranslatePipe],
  template: `
    <button 
      cdkOverlayOrigin 
      #filterOrigin="cdkOverlayOrigin" 
      (click)="isFilterMenuOpen.set(!isFilterMenuOpen())" 
      [class]="triggerClass()"
      data-testid="ds-data-grid-filter-trigger"
    >
      <svg class="w-5 h-5 transition-transform" [class.rotate-180]="isFilterMenuOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
      </svg>
    </button>

    <ng-template 
      cdkConnectedOverlay 
      [cdkConnectedOverlayOrigin]="filterOrigin" 
      [cdkConnectedOverlayOpen]="isFilterMenuOpen()" 
      (overlayOutsideClick)="isFilterMenuOpen.set(false)"
      (attach)="onOverlayOpen()"
    >
      <div 
        class="bg-white border border-slate-200 rounded-[32px] shadow-2xl w-[320px] md:w-[380px] mt-2 overflow-hidden animate-in flex flex-col max-h-[500px]" 
        cdkTrapFocus
        data-testid="ds-data-grid-filter-menu"
      >
        <div class="flex-1 overflow-auto p-8 custom-scrollbar">
          <h3 class="text-lg font-black text-slate-800 mb-6 tracking-tight">{{ 'molecules.dataGridFilter.title' | translate }}</h3>
          
          <div #filterContainer class="grid grid-cols-2 gap-1"></div>
        </div>

        <!-- ACTIONS -->
        <div class="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button 
            (click)="resetFilters()" 
            class="flex-1 py-3 text-[10px] font-black uppercase text-slate-400 hover:text-red-500 tracking-widest transition-colors"
          >
            {{ 'molecules.dataGridFilter.clear' | translate }}
          </button>
          <button 
            (click)="applyFilters()" 
            class="flex-[2] py-3 bg-[#008a7c] text-white text-[10px] font-black uppercase rounded-2xl shadow-lg active:scale-95 tracking-widest transition-all hover:bg-[#007065]"
          >
            {{ 'molecules.dataGridFilter.confirm' | translate }}
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
    
    @keyframes in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-in {
      animation: in 0.2s ease-out;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridFilterComponent {
  private readonly destroyRef = inject(DestroyRef);
  cn = cn;

  configs = input<FilterConfig[]>([
    { id: 'regions', label: 'molecules.dataGridFilter.regionsLabel', component: CheckboxGroupComponent, options: ['Lisboa', 'Porto', 'Madrid'] },
    { id: 'status', label: 'molecules.dataGridFilter.statusLabel', component: RadioGroupComponent, options: ['molecules.dataGridFilter.statusOptions.all', 'molecules.dataGridFilter.statusOptions.active', 'molecules.dataGridFilter.statusOptions.pending'] }
  ]);

  filtersApplied = output<FilterState>();
  filtersReset = output<void>();

  isFilterMenuOpen = signal(false);

  @ViewChild('filterOrigin', { static: true }) filterOrigin!: HTMLElement;
  @ViewChild('filterContainer', { read: ViewContainerRef }) filterContainer?: ViewContainerRef;

  // Persisted state
  appliedState = signal<FilterState>({
    regions: new Set(),
    status: 'molecules.dataGridFilter.statusOptions.all'
  });

  // Temporary state for the interactive menu
  tempState = signal<FilterState>({
    regions: new Set(),
    status: 'molecules.dataGridFilter.statusOptions.all'
  });

  hasActiveFilters = computed(() => {
    const s = this.appliedState();
    return (s['regions'] as Set<string>).size > 0 || s['status'] !== 'molecules.dataGridFilter.statusOptions.all';
  });

  triggerClass = computed(() => cn(
    'flex items-center justify-center w-12 h-12 rounded-xl transition-all border outline-none focus:ring-4 focus:ring-primary/20',
    this.hasActiveFilters()
      ? 'border-[#008a7c] bg-[#008a7c]/5 text-[#008a7c]'
      : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-[#008a7c]/10'
  ));

  onOverlayOpen() {
    this.isFilterMenuOpen.set(true);
    // Use RxJS timer to ensure ViewContainerRef is available after overlay renders
    timer(0)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.renderFilters());
  }

  renderFilters() {
    if (!this.filterContainer) return;
    this.filterContainer.clear();

    const currentTemp = this.tempState();

    this.configs().forEach(config => {
      const controlRef = this.filterContainer!.createComponent(config.component as Type<unknown>);

      const val = currentTemp[config.id] ?? (config.id === 'regions' ? new Set() : 'molecules.dataGridFilter.statusOptions.all');

      // Passing inputs to dynamically rendered component
      controlRef.setInput('label', config.label);
      controlRef.setInput('options', config.options);
      controlRef.setInput('value', val);

      // Handle value changes
      const instance = controlRef.instance as { valueChange?: { subscribe: (fn: (v: unknown) => void) => void } };
      if (instance.valueChange) {
        instance.valueChange.subscribe((newValue: unknown) => {
          this.tempState.update(s => ({ 
            ...s, 
            [config.id]: newValue as string | Set<string> 
          }));
        });
      }
    });
  }


  applyFilters() {
    this.appliedState.set({ ...this.tempState() });
    this.filtersApplied.emit(this.appliedState());
    this.isFilterMenuOpen.set(false);
  }

  resetFilters() {
    const reset: FilterState = {
      regions: new Set(),
      status: 'molecules.dataGridFilter.statusOptions.all'
    };
    this.tempState.set(reset);
    this.appliedState.set(reset);
    this.filtersReset.emit();
    this.isFilterMenuOpen.set(false);
  }
}
