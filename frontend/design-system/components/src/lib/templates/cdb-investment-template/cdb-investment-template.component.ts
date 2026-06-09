import { ChangeDetectionStrategy, Component, inject, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IconComponent } from '../../atoms/icon/icon.component';
import { CdbFormComponent } from '../../organisms';
import { TranslateModule } from '@ngx-translate/core';
import { DSCurrencyPipe } from '../../utils/pipes/dynamic-currency.pipe';
import { Store } from '@ngrx/store';
import { selectI18nState } from '@trevvo/design-system';
import { map } from 'rxjs';

interface InvestmentRequest {
  investedIncome: number;
  termInMonths: number;
}

interface InvestmentResponse {
  message: string | null;
  success: boolean;
  grossIncome: number;
  netIncome: number;
}

@Component({
  selector: 'ds-cdb-investment-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, CdbFormComponent, TranslateModule, DSCurrencyPipe],
  template: `
    <div class="flex flex-col md:flex-row min-h-screen bg-white font-base">
      <!-- Form Section (Left) -->
      <section class="w-full md:w-[55%] flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative">
        <div class="w-full max-w-md">
          <!-- Header for Mobile -->
          <div class="md:hidden mb-12 flex items-center gap-3">
             <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                 <ds-icon name="management" class="text-white w-5 h-5"></ds-icon>
             </div>
             <h2 class="text-xl font-headers font-bold tracking-tight text-gray-dark italic">Trevvo</h2>
          </div>

          <div class="mb-14 text-left">
            <h2 class="text-4xl lg:text-5xl font-headers font-bold text-gray-dark mb-4 tracking-tight">{{ 'templates.cdbInvestment.welcome' | translate }}</h2>
            <p class="text-gray-medium font-base text-lg opacity-80">{{ 'templates.cdbInvestment.subtitle' | translate }}</p>
          </div>

          <!-- Cdb Form (The Organism) -->
          <form [formGroup]="cdbForm">
            <ds-cdb-form 
              formControlName="cdb" 
              [isSubmitting]="isExternalSubmitting() || isSubmitting()"
              (onCalculate)="onCalculate()"
            ></ds-cdb-form>
          </form>

          <!-- Bottom Links -->
          <div class="md:absolute bottom-10 left-16 right-16 flex justify-between items-center mt-20 md:mt-0 font-base text-[10px] font-bold text-gray-medium uppercase tracking-[0.25em] opacity-40">
             <span class="md:hidden">B3</span>

          </div>
        </div>
      </section>
      <!-- Results Section (Right) -->
      <section class="hidden md:flex md:w-[45%] bg-primary p-16 lg:p-24 flex-col justify-between items-start text-on-primary relative overflow-hidden">
        <!-- Results Content -->
        <div class="relative z-10 w-full animate-in fade-in slide-in-from-left duration-1000">
          <div class="mb-16">
            <h1 class="text-4xl lg:text-6xl font-headers font-bold leading-[1.1] max-w-lg mb-8 tracking-tight">
              {{ 'templates.cdbInvestment.brandTitle' | translate }}
            </h1>
            <p class="text-lg lg:text-xl font-light opacity-60 max-w-sm font-base leading-relaxed">
              {{ 'templates.cdbInvestment.brandSubtitle' | translate }}
            </p>
          </div>

          <!-- Feature Item List -->
            <div class="space-y-10">
              <div class="flex items-center gap-6 group cursor-default">
                <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                  <ds-icon name="management" class="text-white w-6 h-6"></ds-icon>
                </div>
                <div class="group-hover:translate-x-1 transition-transform duration-300">
                  <h3 class="font-bold text-lg font-headers">{{ 'templates.cdbInvestment.feature1Title' | translate }}</h3>
                  <p class="text-sm opacity-40 font-base">{{ (results()?.netIncome || 0) | DScurrency }}</p>
                </div>
              </div>

              <div class="flex items-center gap-6 group cursor-default">
                <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                  <ds-icon name="check-circle" class="text-white w-6 h-6"></ds-icon>
                </div>
                <div class="group-hover:translate-x-1 transition-transform duration-300">
                  <h3 class="font-bold text-lg font-headers">{{ 'templates.cdbInvestment.feature2Title' | translate }}</h3>
                  <p class="text-sm opacity-40 font-base">{{ (results()?.grossIncome || 0) | DScurrency }}</p>
                </div>
              </div>
            </div>
         </div>

        <!-- Footer Brand Info -->
        <div class="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-auto">
          B3
        </div>

        <!-- Decorative Subtle Glow -->
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdbInvestmentTemplateComponent {
  private store = inject(Store);
  private localeState = this.store.select(selectI18nState);
  currency = this.localeState.pipe(map(state => state.currency));

  private readonly fb = inject(FormBuilder);

  isExternalSubmitting = input(false);
  results = input<InvestmentResponse | undefined>(undefined);

  isSubmitting = signal(false);

  cdbForm: FormGroup = this.fb.group({
    cdb: []
  });

  calculate = output<InvestmentRequest>();

  onCalculate(): void {
    if (this.cdbForm.valid) {
      this.calculate.emit(this.cdbForm.value.cdb);
    }
  }
}
