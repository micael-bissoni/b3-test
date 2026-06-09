import { createReducer, on } from '@ngrx/store';
import * as I18nActions from './i18n.actions';

export interface I18nState {
    locale: string;
    currency: string;
}

export const initialState: I18nState = {
    locale: 'en-GB',
    currency: 'GBP',
};

export const i18nReducer = createReducer(
    initialState,
    on(I18nActions.setLocale, (state: I18nState, { locale }: { locale: string }): I18nState => ({ ...state, locale })),
    on(I18nActions.setCurrency, (state: I18nState, { currency }: { currency: string }): I18nState => ({ ...state, currency }))
);
