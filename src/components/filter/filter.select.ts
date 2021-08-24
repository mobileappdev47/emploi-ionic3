import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Collection as collection } from '../../utils/collection';
import { Options as options } from '../../utils/options';

import { FilterBase } from './filter.base';

/**
 * Internal sub-component of filter-bar
 */
@Component({
    selector: 'filter-select',
    templateUrl: 'filter.select.html',
})

export class FilterSelect extends FilterBase {
    @Input('options') items: any;
    @Input('none') none: boolean;

    id: any;

    constructor(protected translate: TranslateService) {
        super(translate);
    }

    ngOnInit() { // tslint:disable-line use-life-cycle-interface
        this.id = this.initial;
        if (typeof this.items === 'string') {
            this.items = options.list(this.items, this.translate);
        }
        if (this.none && !this.initial) {
            this.id = 0; // to set selected none option
        }
        super.ngOnInit();
    }

    value() {
        return this.id;
    }

    filtered(): string {
        return this.id && (collection.find(this.items, { id: this.id }) || {}).name;
    }

    clear() {
        this.id = undefined;
        this.set();
    }
}
