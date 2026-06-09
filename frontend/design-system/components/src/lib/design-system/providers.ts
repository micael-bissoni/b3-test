import { Provider, InjectionToken, makeEnvironmentProviders, importProvidersFrom, inject, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideState } from '@ngrx/store';
import { i18nReducer } from '../utils/state/i18n.reducer';
import { ThemeService, type Brand } from '@trevvo/design-system/tokens';
import { LocaleService } from '../utils';

export interface DesignSystemConfig {
    /**
     * Base URL for the design system assets (e.g. translation files).
     * This allows sharing assets from another app or a CDN.
     * Default is usually './assets/design-system/' or './assets/'
     */
    assetsUrl?: string;
    /** Default locale to use on initialization. */
    defaultLocale?: string;
    /** Default currency code to use. */
    defaultCurrency?: string;
    /** Default brand to initialize tokens. */
    defaultBrand?: Brand;
}

export const DESIGN_SYSTEM_CONFIG = new InjectionToken<DesignSystemConfig>('DESIGN_SYSTEM_CONFIG');

// Removed createTranslateLoader factory as it's no longer needed for v17+ standalone providers.


/**
 * Provides the core configuration and services for the Trevvo Design System.
 */
export function provideDesignSystem(config: DesignSystemConfig = {}) {
    return makeEnvironmentProviders([
        { provide: DESIGN_SYSTEM_CONFIG, useValue: config },

        // Register the i18n feature state
        provideState('i18n', i18nReducer),

        // Configure ngx-translate with modern providers
        importProvidersFrom(
            TranslateModule.forRoot({
                fallbackLang: config.defaultLocale || 'en-GB'
            })
        ),

        // Use standalone provider for HTTP loader (v17+)
        ...provideTranslateHttpLoader({
            prefix: (config.assetsUrl || './assets/').endsWith('/')
                ? (config.assetsUrl || './assets/')
                : `${config.assetsUrl || './assets/'}/`,
            suffix: '.json'
        }),

        // Initialize Theme and Locale during APP_INITIALIZER if requested
        {
            provide: APP_INITIALIZER,
            useFactory: (themeService: ThemeService, translate: TranslateService, localeService: LocaleService) => {
                return () => {
                    const brand = config.defaultBrand || 'base';
                    const locale = config.defaultLocale || 'en-GB';
                    const currency = config.defaultCurrency || 'GBP';

                    // Initialize tokens
                    themeService.initializeTokens(brand);

                    // Initialize translations
                    localeService.setCurrency(currency);
                    localeService.setLocale(locale);

                    return translate.use(locale);
                };
            },
            deps: [ThemeService, TranslateService, LocaleService],
            multi: true
        }
    ]);
}
