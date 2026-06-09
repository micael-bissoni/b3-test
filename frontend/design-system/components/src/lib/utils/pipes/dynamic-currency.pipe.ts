import { Pipe, PipeTransform, OnDestroy, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as I18nSelectors from '../state/i18n.selectors';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'DScurrency',
    standalone: true,
    pure: false
})
export class DSCurrencyPipe implements PipeTransform, OnDestroy {
    private locale = 'en-GB';
    private currencyCode = 'GBP';
    private subLocale: Subscription;
    private subCurrency: Subscription;
    private store = inject(Store);

    constructor() {
        this.subLocale = this.store.select(I18nSelectors.selectLocale).subscribe((loc: string) => {
            this.locale = loc;
        });
        this.subCurrency = this.store.select(I18nSelectors.selectCurrency).subscribe((curr: string) => {
            this.currencyCode = curr;
        });
    }

    transform(
        value: number | string | null | undefined,
        currencyCode?: string,
        display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
        digitsInfo?: string,
        locale?: string
    ): string | null {
        if (value == null) return null;

        const dynamicPipe = new CurrencyPipe(locale || this.locale);
        return dynamicPipe.transform(
            value,
            currencyCode || this.currencyCode,
            display,
            digitsInfo,
        );
    }

    ngOnDestroy(): void {
        this.subLocale.unsubscribe();
        this.subCurrency.unsubscribe();
    }
}
