import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FilterBase } from './filter.base';

/**
 * Internal sub-component of filter-bar
 *
 */
@Component({
    selector: 'filter-search',
    templateUrl: 'filter.search.html',
})
export class FilterSearch extends FilterBase {

    text: string;

    constructor(protected translate: TranslateService) {
        super(translate);
    }

    ngOnInit() { // tslint:disable-line use-life-cycle-interface
        this.text = this.initial || '';
        super.ngOnInit();
    }

    value() {
        return this.text;
    }

    filtered(): string {
        return super.filtered(this.text);
    }

    clear() {
        this.text = '';
        this.set();
    }
}
