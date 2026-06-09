import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I18nState } from './i18n.reducer';

export const selectI18nState = createFeatureSelector<I18nState>('i18n');

export const selectLocale = createSelector(
    selectI18nState,
    (state: I18nState): string => state.locale
);

export const selectCurrency = createSelector(
    selectI18nState,
    (state: I18nState): string => state.currency
);
