import { createAction, props } from '@ngrx/store';

export const setLocale = createAction(
    '[I18n] Set Locale',
    props<{ locale: string }>()
);

export const setCurrency = createAction(
    '[I18n] Set Currency',
    props<{ currency: string }>()
);
