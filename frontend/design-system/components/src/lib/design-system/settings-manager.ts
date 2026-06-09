// settings-manager.component.ts

import { Component, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocaleService } from "../utils/locale.service";
import { ThemeService, type Brand } from "@trevvo/design-system/tokens";


@Component({
    standalone: true,
    selector: "sb-settings-manager",
    template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
export class SettingsManagerComponent implements OnChanges {
    @Input() brand: Brand = "base";
    @Input() locale: string = "en-GB";
    @Input() currency: string = "GBP";

    private themeService = inject(ThemeService);
    private translate = inject(TranslateService);
    public localeService = inject(LocaleService);

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        // If the locale prop has change, update the active locale
        if (changes["locale"]) {
            const changedProp = changes["locale"];
            this.localeService.setLocale(changedProp.currentValue);
            this.translate.use(changedProp.currentValue);
        }
        if (changes["currency"]) {
            this.localeService.setCurrency(changes["currency"].currentValue);
            console.log("Currency changed to", changes["currency"].currentValue);
        }
        if (changes["brand"]) {
            const changedProp = changes["brand"];
            this.themeService.initializeTokens(changedProp.currentValue);
        }
    }
}