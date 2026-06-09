import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Molecule: FileUploadComponent
 * 
 * A premium file upload component with drag & drop support,
 * preview capabilities, and seamless integration with Angular Forms.
 */
@Component({
  selector: 'ds-file-upload',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  template: `
    <div 
      class="relative group"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <div 
        [class]="containerClasses"
        (click)="fileInput.click()"
      >
        <input
          #fileInput
          type="file"
          class="hidden"
          [accept]="accept"
          (change)="onFileSelected($event)"
        />
        
        <!-- Preview / State -->
        <ng-container *ngIf="previewUrl; else noPreview">
          <img *ngIf="previewUrl.startsWith('data:image')" [src]="previewUrl" class="w-full h-full object-cover rounded-2xl" />
          
          <!-- Non-image Preview -->
          <div *ngIf="!previewUrl.startsWith('data:image')" class="flex flex-col items-center justify-center p-4 text-center">
             <div class="w-12 h-12 mb-2 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span class="text-2xl">📄</span>
             </div>
             <p class="file-name text-[10px] font-bold truncate max-w-full px-2">{{ fileName }}</p>
             <p class="text-[8px] text-gray-400">{{ fileSize }}</p>
          </div>

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-2xl backdrop-blur-[2px]">
            <div class="flex gap-2">
              <button 
                type="button"
                (click)="$event.stopPropagation(); fileInput.click()"
                class="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                title="{{ 'molecules.fileUpload.change' | translate }}"
              >
                <span class="text-xs">🔄</span>
              </button>
              <button 
                type="button"
                (click)="clear($event)"
                class="bg-red-500/20 hover:bg-red-500/40 text-white p-2 rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                title="{{ 'molecules.fileUpload.remove' | translate }}"
              >
                <span class="text-xs">🗑️</span>
              </button>
            </div>
          </div>
        </ng-container>

        <ng-template #noPreview>
          <div class="flex flex-col items-center justify-center text-center p-4">
            <div class="w-12 h-12 mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-110 group-hover:rotate-12">
              <span class="text-2xl">⊕</span>
            </div>
            <p class="text-[10px] font-black uppercase tracking-tighter text-gray-900 mb-1">
              {{ label | translate }}
            </p>
            <p *ngIf="hint" class="text-[10px] text-gray-400 font-medium uppercase">
              {{ hint | translate }}
            </p>
          </div>
        </ng-template>
      </div>

      <!-- Dragging Overlay -->
      <div 
        *ngIf="isDragging" 
        class="absolute inset-0 bg-primary/20 backdrop-blur-sm border-2 border-primary border-dashed rounded-2xl z-20 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-300"
      >
        <span class="text-primary font-bold uppercase tracking-widest text-xs">{{ 'molecules.fileUpload.drop' | translate }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() label = 'molecules.fileUpload.label';
  @Input() hint = '';
  @Input() accept = 'image/*';
  @Output() fileCleared = new EventEmitter<void>();
  
  previewUrl: string | null = null;
  fileName: string | null = null;
  fileSize: string | null = null;
  isDragging = false;
  disabled = false;

  private cdr = inject(ChangeDetectorRef);

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  get containerClasses(): string {
    const sizeMap = {
      sm: 'w-20 h-20',
      md: 'w-32 h-32',
      lg: 'w-48 h-48',
      xl: 'w-64 h-64',
      full: 'w-full h-48'
    };

    return `
      ${sizeMap[this.size]} rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 
      flex items-center justify-center overflow-hidden transition-all duration-300
      hover:border-primary hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/10
      cursor-pointer group relative
    `;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
    this.cdr.markForCheck();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    this.cdr.markForCheck();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    if (this.disabled) return;

    this.fileName = file.name;
    this.fileSize = this.formatBytes(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.previewUrl = result;
      this.onChange(result);
      this.onTouched();
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  clear(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.previewUrl = null;
    this.fileName = null;
    this.fileSize = null;
    this.onChange(null);
    this.onTouched();
    this.fileCleared.emit();
    this.cdr.markForCheck();
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    this.previewUrl = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
