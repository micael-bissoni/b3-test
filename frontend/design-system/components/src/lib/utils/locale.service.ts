import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as I18nActions from './state/i18n.actions';
import * as I18nSelectors from './state/i18n.selectors';
import { Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
    private store = inject(Store);

    // Observables from Store
    readonly locale$: Observable<string> = this.store.select(I18nSelectors.selectLocale);
    readonly currency$: Observable<string> = this.store.select(I18nSelectors.selectCurrency);

    // Getters for current values (using snapshot from store if possible, or just observable)
    get currentLocale(): string {
        let val = 'en-GB';
        this.locale$.pipe(take(1)).subscribe((v: string) => val = v);
        return val;
    }

    get currentCurrency(): string {
        let val = 'GBP';
        this.currency$.pipe(take(1)).subscribe((v: string) => val = v);
        return val;
    }

    setLocale(locale: string): void {
        this.store.dispatch(I18nActions.setLocale({ locale }));
    }

    setCurrency(currency: string): void {
        this.store.dispatch(I18nActions.setCurrency({ currency }));
    }

    // Legacy method for compatibility if needed
    getLocale(): string {
        return this.currentLocale;
    }

    getCurrency(): string {
        return this.currentCurrency;
    }
}
