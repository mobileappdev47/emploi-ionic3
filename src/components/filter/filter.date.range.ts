import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FilterBase } from './filter.base';

/**
 * Internal sub-component of filter-bar
 *
 */
@Component({
    selector: 'filter-date-range',
    templateUrl: 'filter.date.range.html',
})
export class FilterDateRange extends FilterBase {

    start: Date;
    end: Date;

    constructor(protected translate: TranslateService) {
        super(translate);
    }

    ngOnInit() { // tslint:disable-line use-life-cycle-interface
        this.start = this.initial && this.initial.start;
        this.end = this.initial && this.initial.end;
        super.ngOnInit();
    }

    value() {
        return {
            start: this.start,
            end: this.end,
        };
    }

    filtered(): string {
        return (this.start || this.end) && super.filtered([this.start || '...', this.end || '...'].join(' - '));
    }

    clear() {
        this.start = null;
        this.end = null;
        this.set();
    }
}
