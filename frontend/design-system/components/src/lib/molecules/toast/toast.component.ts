import { Component, input, output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toastVariants, type ToastVariants } from './toast.variants';
import { cn } from '../../utils/cn';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-toast',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <div [class]="calculatedClass" data-testid="ds-toast">
      <div class="flex-shrink-0">
        <ds-icon [name]="iconName" [intent]="iconIntent" size="medium"></ds-icon>
      </div>
      
      <div class="flex-grow min-w-0">
        @if (title()) {
          <h4 class="text-sm font-semibold leading-relaxed">{{ title() }}</h4>
        }
        <p class="text-sm leading-relaxed opacity-90">{{ message() }}</p>
      </div>

      <div class="flex-shrink-0">
        <ds-button 
          data-testid="ds-toast-close"
          intent="ghost" 
          size="small" 
          shape="circle" 
          class="!p-1"
          (click)="handleClose()"
        >
          <ds-icon name="close" size="small"></ds-icon>
        </ds-button>
      </div>
    </div>
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  message = input.required<string>();
  title = input<string>('');
  type = input<ToastVariants['type']>('info');
  duration = input<number>(5000);

  closed = output<void>();

  private timeoutId?: any;

  ngOnInit(): void {
    if (this.duration() > 0) {
      this.timeoutId = setTimeout(() => {
        this.handleClose();
      }, this.duration());
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  get calculatedClass(): string {
    return cn(toastVariants({ type: this.type() }));
  }

  get iconName(): string {
    switch (this.type()) {
      case 'success': return 'check-circle';
      case 'error': return 'alert-circle';
      case 'warning': return 'alert-triangle';
      default: return 'info';
    }
  }

  get iconIntent(): any {
    switch (this.type()) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'primary';
    }
  }

  handleClose(): void {
    this.closed.emit();
  }
}
