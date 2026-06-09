import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-form-field',
  standalone: true,
  imports: [CommonModule, TranslatePipe, IconComponent],
  template: `
    <div class="flex flex-col gap-1.5 w-full" data-testid="ds-form-field">
      @if (label()) {
        <label [for]="id()" class="text-[10px] font-extrabold text-gray-medium uppercase tracking-[0.2em] px-1 select-none group-focus-within:text-primary transition-all duration-300">
          {{ label() | translate }}
          @if (required()) {
            <span class="text-danger ml-0.5" aria-hidden="true">*</span>
          }
        </label>
      }
      
      <div class="relative flex flex-col group">
        @if (prefixIcon()) {
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-medium transition-colors group-focus-within:text-primary opacity-80 z-10 pointer-events-none">
            <ds-icon [name]="prefixIcon()" size="small" class="w-5 h-5"></ds-icon>
          </div>
        }
        <ng-content></ng-content>
      </div>

      @if (error()) {
        <span 
          class="text-xs font-medium text-danger mt-1.5 flex items-center gap-1 transition-all duration-200 animate-in fade-in slide-in-from-top-1"
          role="alert"
          data-testid="ds-form-field-error"
        >
          <span class="w-1 h-1 rounded-full bg-danger"></span>
          {{ error() | translate }}
        </span>
      } @else if (hint()) {
        <span class="text-xs text-gray-medium mt-1.5 italic" data-testid="ds-form-field-hint">
          {{ hint() | translate }}
        </span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  id = input<string>('');
  label = input<string>('');
  error = input<string>('');
  hint = input<string>('');
  prefixIcon = input<string>('');
  required = input<boolean>(false);
}
