import { Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Base class for filters
 */
export class FilterBase implements OnInit {
    @Input('name') name: string;
    @Input('context') context: string;
    @Input('set') initial: any;
    @Output('init') init: EventEmitter<any> = new EventEmitter();
    @Output('action') action: EventEmitter<any> = new EventEmitter();

    selected: any;

    constructor(protected translate: TranslateService) {
    }

    /**
     * Initializes internal interface with parent
     */
    ngOnInit() {
        this.init.emit({
            clear: this.clear.bind(this),
            filtered: this.filtered.bind(this),
        });
        this.set();
    }

    /**
     * Common set method
     */
    set() {
        this.selected = this.value();
        this.action.emit(this.selected);
    }

    /**
     * "Super" filtered method - called from inherited classes within those value - returns "short name: value" for filter bar
     */
    filtered(value: string) {
        return value && [this.translate.instant(this.context + '.filters.' + this.name + '.short'), value].join(': ');
    }

    /**
     * "Abstract" clear method
     */
    clear() { // tslint:disable-line no-empty
    }

    /**
     * "Abstract" value method
     */
    value() {
        return {};
    }
}
