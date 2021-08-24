import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FilterBase } from './filter.base';

/**
 * Internal sub-component of filter-bar
 *
 */
@Component({
    selector: 'filter-range',
    templateUrl: 'filter.range.html',
})

export class FilterRange extends FilterBase {

    min: any;
    max: any;

    constructor(protected translate: TranslateService) {
        super(translate);
    }

    ngOnInit() { // tslint:disable-line use-life-cycle-interface
        this.min = this.initial && this.initial.min;
        this.max = this.initial && this.initial.max;
        super.ngOnInit();
    }

    value() {
        return {
            min: this.min,
            max: this.max,
        };
    }

    filtered(): string {
        return (this.min || this.max) && super.filtered([this.min || '...', this.max || '...'].join(' - '));
    }

    clear() {
        this.min = '';
        this.max = '';
        this.set();
    }
}
