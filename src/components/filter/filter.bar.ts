import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { IFilterBarItems } from './filter.module';

interface IFilterInterface {
    clear: () => void;
    filtered: () => string;
}

/**
 * @name
 * FilterBar
 * @description
 * Component for display filters - search + additional
 *
 * @param context Translation context - will use context.filters.name.xxx identifiers (xxx - label, placeholder, etc)
 * @param filters Filters set - key named filters within type (select, range, daterange, buttons), set, options and none (optional for select)
 * @param on-apply Event consumer - getting {[name]: set/selected values}
 *
 * @note Options for select can be given as string - then Options.list util will be used
 * @note Clear button calls apply with cleared values
 *
 * @usage
 * ```ts
 * filters IFilterBarItems;
 * this.filters = {
 *   search: { set: '', type: 'search' },
 *   some: { set: undefined, type: 'buttons' },
 *   // ...
 * };
 *
 * filter(filtered: IFilter) {
 *   // do some staff with
 * }
 * ```
 *
 * ```html
 * <filter-bar [filters]="filters" (on-apply)="filter($evant)"></filter-bar>
 * ```
 */
@Component({
    selector: 'filter-bar',
    templateUrl: 'filter.bar.html',
})

export class FilterBar implements OnInit {
    @Input('context') context: string;
    @Input('filters') filters: IFilterBarItems;
    @Output('on-apply') applying: EventEmitter<any> = new EventEmitter(); // tslint:disable-line no-output-rename
    @Output('filter-opened') filterOpened: EventEmitter<any> = new EventEmitter(); // tslint:disable-line no-output-rename

    opened: boolean;
    selected: any = {};
    filtered: string;
    items: { [key: string]: IFilterInterface } = {};

    ngOnInit() {
        // init pre-selected values
        Object.keys(this.filters).map((key) => {
            this.selected[key] = this.filters[key].set;
        });
        // then apply deferred
        setTimeout(() => this.apply());
    }

    init(key: string, exposed: IFilterInterface) {
        this.items[key] = exposed;
    }

    set(key: string, value: any) {
        this.selected[key] = value;
    }

    apply() {
        this.checkFiltered();
        this.applying.emit(this.selected);
        this.close();
    }

    checkFiltered() {
        this.filtered = Object.keys(this.items).map((key) => this.items[key].filtered()).filter(Boolean).join(', ');
    }

    clear() {
        Object.keys(this.items).map((key) => {
            this.items[key].clear();
        });
        this.apply();
    }

    open() {
        this.opened = true;
        this.filterOpened.emit(this.opened);
    }

    close() {
        this.opened = false;
        this.filterOpened.emit(this.opened);
    }
}
