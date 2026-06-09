import { Component, inject, input, output, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { ButtonComponent } from '../button/button.component';
import { Subscription, timer } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { clipboardVariants, clipboardContainerVariants } from './clipboard.variant';

@Component({
  selector: 'ds-clipboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './clipboard.component.html',
})
export class ClipboardComponent implements OnDestroy {
  content = input<string>('');
  contentCopied = output<string>();

  clipboard = inject(Clipboard)

  status = signal<'copied' | 'initial'>('initial');

  sub?: Subscription;

  clipboardVariants = clipboardVariants;
  clipboardContainerVariants = clipboardContainerVariants;

  onCopy() {
    if (this.content().trim()) {
      const success = this.clipboard.copy(this.content());

      if (success) {
        this.status.set('copied');

        // Cancel any previous timer
        this.sub?.unsubscribe();

        // Hide notification after 2 seconds using RxJS timer
        this.sub = timer(400).subscribe(() => this.status.set('initial'));
      }
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
