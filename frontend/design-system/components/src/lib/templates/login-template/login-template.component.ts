import { ChangeDetectionStrategy, Component, inject, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { IconComponent } from '../../atoms/icon/icon.component';
import { LoginFormComponent } from '../../organisms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-login-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, LoginFormComponent, TranslateModule],
  template: `
    <div class="flex flex-col md:flex-row min-h-screen bg-white font-base">
      <!-- Brand Section (Left) -->
      <section class="hidden md:flex md:w-[45%] bg-primary p-16 lg:p-24 flex-col justify-between items-start text-on-primary relative overflow-hidden">
        <!-- Brand Slogan and Info -->
        <div class="relative z-10 w-full animate-in fade-in slide-in-from-left duration-1000">
          <div class="mb-16">
            <h1 class="text-4xl lg:text-6xl font-headers font-bold leading-[1.1] max-w-lg mb-8 tracking-tight">
              {{ 'templates.login.brandTitle' | translate }}
            </h1>
            <p class="text-lg lg:text-xl font-light opacity-60 max-w-sm font-base leading-relaxed">
              {{ 'templates.login.brandSubtitle' | translate }}
            </p>
          </div>

          <!-- Feature Item List -->
          <div class="space-y-10">
            <div class="flex items-center gap-6 group cursor-default">
              <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <ds-icon name="management" class="text-white w-6 h-6"></ds-icon>
              </div>
              <div class="group-hover:translate-x-1 transition-transform duration-300">
                <h3 class="font-bold text-lg font-headers">{{ 'templates.login.feature1Title' | translate }}</h3>
                <p class="text-sm opacity-40 font-base">{{ 'templates.login.feature1Desc' | translate }}</p>
              </div>
            </div>

            <div class="flex items-center gap-6 group cursor-default">
              <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <ds-icon name="check-circle" class="text-white w-6 h-6"></ds-icon>
              </div>
              <div class="group-hover:translate-x-1 transition-transform duration-300">
                <h3 class="font-bold text-lg font-headers">{{ 'templates.login.feature2Title' | translate }}</h3>
                <p class="text-sm opacity-40 font-base">{{ 'templates.login.feature2Desc' | translate }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Brand Info -->
        <div class="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mt-auto">
          Trevvo V2.4.0
        </div>

        <!-- Decorative Subtle Glow -->
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </section>

      <!-- Auth Section (Right) -->
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
            <h2 class="text-4xl lg:text-5xl font-headers font-bold text-gray-dark mb-4 tracking-tight">{{ 'templates.login.welcome' | translate }}</h2>
            <p class="text-gray-medium font-base text-lg opacity-80">{{ 'templates.login.subtitle' | translate }}</p>
          </div>

          <!-- Auth Form (The Organism) -->
          <form [formGroup]="authForm">
            <ds-login-form 
              formControlName="credentials" 
              [isSubmitting]="isExternalSubmitting() || isSubmitting()"
              (onSignIn)="onSignIn()"
            ></ds-login-form>
          </form>

          <div class="mt-10 text-center font-base text-sm text-gray-medium opacity-80">
            {{ 'templates.login.helpText' | translate }} <a href="#" class="text-primary font-bold hover:underline">{{ 'templates.login.contactSupport' | translate }}</a>
          </div>

          <!-- Bottom Links -->
          <div class="md:absolute bottom-10 left-16 right-16 flex justify-between items-center mt-20 md:mt-0 font-base text-[10px] font-bold text-gray-medium uppercase tracking-[0.25em] opacity-40">
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginTemplateComponent {
  private readonly fb = inject(FormBuilder);

  isExternalSubmitting = input(false);
  isSubmitting = signal(false);

  authForm: FormGroup = this.fb.group({
    credentials: []
  });

  signIn = output<any>();

  onSignIn(): void {
    if (this.authForm.valid) {
      this.signIn.emit(this.authForm.value.credentials);
    }
  }
}
