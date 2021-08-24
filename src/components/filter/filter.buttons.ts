import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Collection as collection } from '../../utils/collection';
import { Options as options } from '../../utils/options';
import { Checklist as checklist } from '../../utils/checklist';
import { FilterBase } from './filter.base';

/**
 * Internal sub-component of filter-bar
 */
@Component({
    selector: 'filter-buttons',
    templateUrl: 'filter.buttons.html',
})

export class FilterButtons extends FilterBase {
    @Input('options') items: any;

    id: any;
    list: any;

    constructor(protected translate: TranslateService) {
        super(translate);
    }

    ngOnInit() { // tslint:disable-line use-life-cycle-interface
        if (typeof this.items === 'string') {
            this.list = options.list(this.items, this.translate);
            this.items = checklist.prepare(this.list);
            // pre-select if set
            (this.initial || []).forEach((selected: string) => this.items[selected] = true);
        }
        super.ngOnInit();
    }

    value() {
        return checklist.selected(this.items);
    }

    filtered(): string {
        const selected = checklist.selected(this.items);
        return selected.length && selected.map((id) => collection.find(this.list, { id }).name).join(', ');
    }

    clear() {
        checklist.reset(this.items);
        this.set();
    }
}
