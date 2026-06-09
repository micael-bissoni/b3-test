import { Pipe, PipeTransform, OnDestroy, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as I18nSelectors from '../state/i18n.selectors';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'DSdate',
    standalone: true,
    pure: false
})
export class DSDatePipe implements PipeTransform, OnDestroy {
    private locale = 'en-GB';
    private sub: Subscription;
    private store = inject(Store);

    constructor() {
        this.sub = this.store.select(I18nSelectors.selectLocale).subscribe((loc: string) => {
            this.locale = loc;
        });
    }

    transform(value: Date | string | number | null | undefined, format = 'mediumDate', timezone?: string): string | null {
        if (!value) return null;
        const datePipe = new DatePipe(this.locale);
        return datePipe.transform(value, format, timezone);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
