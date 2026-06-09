import { ChangeDetectionStrategy, Component, forwardRef, input, output, signal, computed, effect, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from '../../utils/cn';
import { type SelectOption } from '../../atoms/select/select.component';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'ds-autocomplete',
  standalone: true,
  imports: [CommonModule, TranslateModule, TranslatePipe, ReactiveFormsModule, InputComponent],
  template: `
    <div class="relative w-full group">
      <ds-input 
        [placeholder]="placeholder() | translate"
        [value]="searchText()"
        [disabled]="disabled()"
        (valueChange)="onSearch($event)"
        (focus)="isOpen.set(true)"
        [class]="calculatedClass()"
      >
        <button 
          suffix
          type="button"
          (click)="toggleOptions($event)"
          class="text-gray-dark hover:text-primary transition-colors p-1"
          [disabled]="disabled()"
        >
          <svg 
            class="w-5 h-5 transition-transform duration-200" 
            [class.rotate-180]="isOpen()"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </ds-input>
      
      @if (isOpen() && (filteredOptions().length > 0 || isLoading())) {
        <ul class="absolute z-50 w-full mt-2 bg-white border border-gray-light rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          @if (isLoading()) {
            <li class="px-4 py-8 flex flex-col items-center justify-center gap-3 text-primary">
              <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-xs font-medium animate-pulse">{{ 'common.loading' | translate }}</span>
            </li>
          } @else {
            @for (option of filteredOptions(); track option.value) {
              <li 
                (click)="onSelect(option)"
                class="px-4 py-3 hover:bg-primary/10 cursor-pointer text-sm text-gray-dark transition-colors flex items-center justify-between group/item"
              >
                <span>{{ option.label | translate }}</span>
                @if (option.value === internalValue()) {
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
              </li>
            }
          }
        </ul>
      }

      @if (isOpen()) {
        <div class="fixed inset-0 z-40" (click)="isOpen.set(false)"></div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements ControlValueAccessor {
  options = input<SelectOption[]>([]);
  placeholder = input<string>('common.searchPlaceholder');
  class = input<string>('');
  debounceTime = input<number>(300);
  isLoading = input<boolean>(false);

  valueChange = output<string | number>();
  queryChange = output<string>();

  internalValue = signal<string | number>('');
  searchText = signal<string>('');
  disabled = signal<boolean>(false);
  isOpen = signal<boolean>(false);

  private readonly destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();

  filteredOptions = computed(() => {
    const search = this.searchText().toLowerCase();
    return this.options().filter(opt =>
      String(opt.label).toLowerCase().includes(search) ||
      String(opt.value).toLowerCase().includes(search)
    );
  });

  calculatedClass = computed(() =>
    cn(
      'w-full bg-primary/5 border-none rounded-xl h-14 text-sm outline-none focus:ring-4 focus:ring-primary/20 transition-all text-gray-dark font-base shadow-sm hover:bg-primary/10',
      this.class()
    )
  );

  private onChange: (value: string | number) => void = () => { };
  private onTouched: () => void = () => { };

  constructor() {
    // Sync search text with selected value label
    effect(() => {
      const val = this.internalValue();
      const options = this.options();
      if (val) {
        const selected = options.find(opt => opt.value === val);
        if (selected) {
          this.searchText.set(selected.label);
        }
      } else {
        this.searchText.set('');
      }
    }, { allowSignalWrites: true });

    // Handle debounced search
    this.searchSubject.pipe(
      debounceTime(this.debounceTime()),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {
      this.queryChange.emit(query);
    });
  }

  onSearch(val: string) {
    this.searchText.set(val);
    this.isOpen.set(true);
    this.searchSubject.next(val);
    
    if (!val) {
      this.internalValue.set('');
      this.onChange('');
      this.valueChange.emit('');
    }
  }

  onSelect(option: SelectOption) {
    this.internalValue.set(option.value);
    this.searchText.set(option.label);
    this.isOpen.set(false);
    this.onChange(option.value);
    this.valueChange.emit(option.value);
  }

  toggleOptions(event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled()) return;
    this.isOpen.update(prev => !prev);
  }

  // ControlValueAccessor methods
  writeValue(value: string | number): void {
    this.internalValue.set(value || '');
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
