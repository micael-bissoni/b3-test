import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'ds-stat-card',
  standalone: true,
  imports: [CommonModule, CardComponent, IconComponent],
  template: `
    <ds-card padding="md" [variant]="variant()">
      <div class="flex items-start justify-between">
        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-medium">{{ label() }}</span>
          <span class="text-2xl font-extrabold text-gray-dark tracking-tight">{{ value() }}</span>
        </div>
        @if (icon()) {
          <div [class]="iconBgClass()" class="p-3 rounded-xl transition-all duration-300 hover:scale-105">
            <ds-icon [name]="icon()!" size="medium" [class]="iconColorClass()"></ds-icon>
          </div>
        }
      </div>
      @if (trendValue()) {
        <div class="mt-4 flex items-center gap-2">
          <span [class]="trendColorClass()" class="text-sm font-bold flex items-center gap-0.5">
            @if (trendDirection() === 'up') { 
              <span class="text-xs">▲</span> 
            }
            @if (trendDirection() === 'down') { 
              <span class="text-xs">▼</span> 
            }
            {{ trendValue() }}
          </span>
          <span class="text-xs text-gray-medium/80">{{ trendLabel() }}</span>
        </div>
      }
    </ds-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input<string>();
  variant = input<'default' | 'elevated' | 'flat' | 'outline'>('default');
  
  trendValue = input<string>();
  trendDirection = input<'up' | 'down' | 'neutral'>('neutral');
  trendLabel = input<string>('desde el mes pasado');

  iconColorClass = input<string>('text-primary');
  iconBgClass = input<string>('bg-primary/10');

  trendColorClass = computed(() => {
    switch (this.trendDirection()) {
      case 'up': return 'text-success bg-success/5 px-2 py-0.5 rounded-full';
      case 'down': return 'text-danger bg-danger/5 px-2 py-0.5 rounded-full';
      default: return 'text-gray-medium bg-gray-light/10 px-2 py-0.5 rounded-full';
    }
  });
}
