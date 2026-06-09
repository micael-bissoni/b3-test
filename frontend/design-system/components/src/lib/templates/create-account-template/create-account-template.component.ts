import { ChangeDetectionStrategy, Component, inject, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { IconComponent } from '../../atoms/icon/icon.component';
import { CreateAccountFormComponent } from '../../organisms/create-account-form/create-account-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-create-account-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, CreateAccountFormComponent, TranslateModule],
  template: `
    <div class="flex flex-col md:flex-row min-h-screen bg-white font-base">
      <!-- Brand Section (Left) - Using similar aesthetics to Login for brand story continuity -->
      <section class="hidden md:flex md:w-[45%] bg-primary p-16 lg:p-24 flex-col justify-between items-start text-on-primary relative overflow-hidden">
        
        <!-- Brand Slogan and Info -->
        <div class="relative z-10 w-full animate-in fade-in slide-in-from-left duration-1000">
          <div class="mb-16">
             <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 mb-10 backdrop-blur-sm">
                <ds-icon name="management" class="text-white w-8 h-8"></ds-icon>
             </div>
            <h1 class="text-4xl lg:text-6xl font-headers font-bold leading-[1.1] max-w-lg mb-8 tracking-tight">
              {{ 'templates.createAccount.brandTitle' | translate }}
            </h1>
            <p class="text-lg lg:text-xl font-light opacity-60 max-w-sm font-base leading-relaxed">
              {{ 'templates.createAccount.brandSubtitle' | translate }}
            </p>
          </div>

          <!-- Quick Benefits/Instructions -->
          <div class="space-y-10">
            <div class="flex items-center gap-6 group cursor-default">
              <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <ds-icon name="check-circle" class="text-white w-6 h-6"></ds-icon>
              </div>
              <div class="group-hover:translate-x-1 transition-transform duration-300">
                <p class="text-sm opacity-60 font-base leading-relaxed">Instantly access your <br>pharma dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Brand Info -->
        <div class="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-auto">
          Trevvo Global Network
        </div>

        <!-- Decorative Subtle Glow -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>

      <!-- Account Creation Section (Right) -->
      <section class="w-full md:w-[55%] flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative overflow-y-auto">
        <div class="w-full max-w-md py-12">
          <!-- Header for Mobile -->
          <div class="md:hidden mb-12 flex items-center gap-3">
             <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                 <ds-icon name="management" class="text-white w-5 h-5"></ds-icon>
             </div>
             <h2 class="text-xl font-headers font-bold tracking-tight text-gray-dark italic">Trevvo</h2>
          </div>

          <div class="mb-10 text-left">
            <h2 class="text-4xl lg:text-5xl font-headers font-bold text-gray-dark mb-4 tracking-tight">
              {{ 'templates.createAccount.welcome' | translate }}
            </h2>
            <p class="text-gray-medium font-base text-lg opacity-80 italic">
              {{ 'templates.createAccount.subtitle' | translate }}
            </p>
          </div>

          <!-- Create Account Form (The Organism) -->
          <form [formGroup]="accountForm">
            <ds-create-account-form 
              formControlName="userData" 
              [isSubmitting]="isExternalSubmitting() || isSubmitting()"
              (onCreateAccount)="onCreate()"
            ></ds-create-account-form>
          </form>

          <div class="mt-12 text-center font-base text-sm text-gray-medium">
            <span class="opacity-60">{{ 'templates.createAccount.alreadyHaveAccount' | translate }}</span> 
            <a href="javascript:void(0)" (click)="goToLogin.emit()" class="ml-2 text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">
              {{ 'templates.createAccount.loginNow' | translate }}
            </a>
          </div>

          <!-- Bottom Footer Info -->
          <div class="md:absolute bottom-10 left-16 right-16 flex justify-between items-center mt-20 md:mt-0 font-base text-[10px] font-bold text-gray-medium uppercase tracking-[0.25em] opacity-30">
             <span class="md:hidden">Trevvo V2.4.0</span>
             <div class="flex gap-8 ml-auto">
               <a href="#" class="hover:text-primary transition-colors">Compliance</a>
               <a href="#" class="hover:text-primary transition-colors">Privacy</a>
             </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    /* Smooth Scroll for long forms on mobile */
    section {
      scrollbar-width: thin;
      scrollbar-color: rgba(var(--primary-rgb), 0.1) transparent;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountTemplateComponent {
  private readonly fb = inject(FormBuilder);

  isExternalSubmitting = input(false);
  isSubmitting = signal(false);

  accountForm: FormGroup = this.fb.group({
    userData: []
  });

  createAccount = output<any>();
  goToLogin = output<void>();

  onCreate(): void {
    if (this.accountForm.valid) {
      this.createAccount.emit(this.accountForm.value.userData);
    }
  }
}
