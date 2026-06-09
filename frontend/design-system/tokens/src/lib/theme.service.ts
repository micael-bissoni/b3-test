import { Injectable, inject, APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders, InjectionToken, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { brands, Brand } from './tokens';

/**
 * Base path where the tokens are located.
 * Default is /tokens/web
 */
export const THEME_TOKENS_PATH = new InjectionToken<string>('THEME_TOKENS_PATH', {
  providedIn: 'root',
  factory: () => '/tokens/web',
});

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly tokensPath = inject(THEME_TOKENS_PATH, { optional: true }) ?? '/tokens/web';
  private currentBrand?: Brand;

  /**
   * Translates TS tokens into native CSS variables at the :root level
   * defaults to the 'default' brand.
   */
  public initializeTokens(brand: Brand): void {
    this.switchTheme(brand);
  }

  /**
   * Switches the active brand theme dynamically.
   */
  public switchTheme(brand: Brand = 'base'): void {
    if (this.currentBrand === brand) return;

    const brandTokens = brands[brand];
    if (!brandTokens) {
      console.warn(`Brand theme "${brand}" not found in available brands.`);
      return;
    }

    this.currentBrand = brand;
    const root = this.document.documentElement;
    root.setAttribute('data-theme', brand);

    const linkId = 'brand-theme-link';
    let link = this.document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = this.document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      this.document.head.appendChild(link);
    }
    link.href = `${this.tokensPath}/${brandTokens}/tokens.css`;
  }
}

