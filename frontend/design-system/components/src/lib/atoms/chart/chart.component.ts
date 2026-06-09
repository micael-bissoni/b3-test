import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  input,
  effect,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartData, ChartOptions, ChartType, Plugin } from 'chart.js/auto';

@Component({
  selector: 'default-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full min-h-[inherit]">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  type = input.required<ChartType>();
  data = input.required<ChartData>();
  options = input<ChartOptions>({});
  plugins = input<Plugin[]>([]);

  private chartInstance: Chart | null = null;
  private currentType: ChartType | null = null;
  private currentPlugins: Plugin[] = [];

  constructor() {
    effect(() => {
      const type = this.type();
      const data = this.data();
      const options = this.options();
      const plugins = this.plugins();

      if (this.chartInstance && type === this.currentType && this.currentPlugins === plugins) {
        this.chartInstance.data = data;
        this.chartInstance.options = options;
        this.chartInstance.update();
      } else if (this.canvas()?.nativeElement) {
        this.initChart();
      }
    });
  }

  ngAfterViewInit() {
    // Initial chart creation is handled by the effect when the canvas signal settles
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private initChart() {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;

    this.destroyChart();

    const type = this.type();
    const data = this.data();
    const options = this.options();
    const plugins = this.plugins();

    this.chartInstance = new Chart(canvasEl, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
      },
      plugins,
    });

    this.currentType = type;
    this.currentPlugins = plugins;
  }

  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
