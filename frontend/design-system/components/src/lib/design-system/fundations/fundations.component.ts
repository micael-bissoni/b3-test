import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { IconComponent } from '../../atoms';
import { LocaleService } from '../../utils/locale.service';
import { DSDatePipe } from '../../utils/pipes/dynamic-date.pipe';
import { DSCurrencyPipe } from '../../utils/pipes/dynamic-currency.pipe';
import { Store } from '@ngrx/store';
import { selectI18nState } from '../../utils/state/i18n.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'ds-fundations',
  standalone: true,
  imports: [CommonModule, TranslatePipe, IconComponent, DSDatePipe, DSCurrencyPipe],
  templateUrl: './fundations.component.html',
})
export class FundationsComponent {
  today = new Date();

  private store = inject(Store);
  private localeState = this.store.select(selectI18nState);

  locale = this.localeState.pipe(map(state => state.locale));
  currency = this.localeState.pipe(map(state => state.currency));

  colorsSections = [
    {
      name: 'styleguide.colors.brand',
      colors: [
        {
          name: 'styleguide.colors.primary',
          value: 'bg-primary',
          onValue: 'text-on-primary',
        },
        {
          name: 'styleguide.colors.secondary',
          value: 'bg-secondary',
          onValue: 'text-on-secondary',
        },
        {
          name: 'styleguide.colors.tertiary',
          value: 'bg-tertiary',
          onValue: 'text-on-tertiary',
        },
      ]
    },
    {
      name: 'styleguide.colors.status',
      colors: [
        {
          name: 'styleguide.colors.success',
          value: 'bg-success',
          onValue: 'text-on-success',
        },
        {
          name: 'styleguide.colors.warning',
          value: 'bg-warning',
          onValue: 'text-on-warning',
        },
        {
          name: 'styleguide.colors.danger',
          value: 'bg-danger',
          onValue: 'text-on-danger',
        },
        {
          name: 'styleguide.colors.info',
          value: 'bg-info',
          onValue: 'text-on-info',
        },
      ]
    },
    {
      name: 'styleguide.colors.neutrals',
      colors: [
        {
          name: 'styleguide.colors.white',
          value: 'bg-white',
          onValue: 'text-on-white',
        },
        {
          name: 'styleguide.colors.black',
          value: 'bg-black',
          onValue: 'text-on-black',
        },
        {
          name: 'styleguide.colors.grayLight',
          value: 'bg-gray-light',
          onValue: 'text-on-gray-light',
        },
        {
          name: 'styleguide.colors.grayMedium',
          value: 'bg-gray-medium',
          onValue: 'text-on-gray-medium',
        },
        {
          name: 'styleguide.colors.grayDark',
          value: 'bg-gray-dark',
          onValue: 'text-on-gray-dark',
        },
      ]
    }
  ];
}
