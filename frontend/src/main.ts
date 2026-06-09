import { bootstrapApplication } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideDesignSystem, CdbInvestmentTemplateComponent } from '@trevvo/design-system/components';
import { provideStore } from '@ngrx/store';


import '@angular/common/locales/global/en';
import '@angular/common/locales/global/pt';
import '@angular/common/locales/global/es';
import { InvestmentRequest, InvestmentResponse, InvestmentService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CdbInvestmentTemplateComponent],
  template: `
    <div class="p-8 bg-gray-50 min-h-screen space-y-8">
        <ds-cdb-investment-template  (calculate)="onCalculate($event)" [results]="results" [isExternalSubmitting]="isSubmitting"></ds-cdb-investment-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public cdbService = inject(InvestmentService);
  private readonly cdr = inject(ChangeDetectorRef);
  results?: InvestmentResponse;
  isSubmitting = false;

  onCalculate(event: InvestmentRequest) {
    this.isSubmitting = true;
    const investedIncome = event.investedIncome / 100;
    this.cdbService.processInvestment({ ...event, investedIncome }).subscribe({
      next: (response) => {
        this.results = response;
      },
      error: () => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideHttpClient(withFetch()),
    provideDesignSystem({
      defaultLocale: 'pt-BR',
      defaultCurrency: 'BRL',
      defaultBrand: 'base',
      assetsUrl: './assets/i18n/'
    })
  ],
}).catch((err) => console.error(err));
