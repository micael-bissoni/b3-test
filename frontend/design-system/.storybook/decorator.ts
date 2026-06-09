import { applicationConfig, componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import { SettingsManagerComponent } from "@trevvo/design-system";
import { provideTranslateService, TranslatePipe, TranslateService } from "@ngx-translate/core";
import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideAnimations } from "@angular/platform-browser/animations";
import { LocaleService } from "@trevvo/design-system";
import { provideStore } from "@ngrx/store";
import { i18nReducer } from "@trevvo/design-system"

export const decorators = [
    applicationConfig({
        providers: [
            provideStore({ i18n: i18nReducer }),
            provideZonelessChangeDetection(),
            provideHttpClient(),
            provideAnimations(),
            provideTranslateService({
                loader: provideTranslateHttpLoader({
                    prefix: '/assets/i18n/',
                    suffix: '.json'
                }),
                fallbackLang: 'en-GB',
                lang: 'en-GB'
            }),
            LocaleService,
            {
                provide: LOCALE_ID,
                useFactory: (localeService: LocaleService) => localeService.getLocale(),
                deps: [LocaleService],
            },
            {
                provide: DEFAULT_CURRENCY_CODE,
                useFactory: (localeService: LocaleService) => localeService.getCurrency(),
                deps: [LocaleService],
            },
        ],
    }),
    moduleMetadata({
        imports: [
            SettingsManagerComponent,
            TranslatePipe
        ],
    }),
    (story: any, context: any) => {
        const { locale, brand, currency } = context.globals;

        return componentWrapperDecorator(SettingsManagerComponent, { locale, brand, currency })(story, context)
    },
]