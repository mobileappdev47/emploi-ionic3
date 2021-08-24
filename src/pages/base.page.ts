import { ViewChild, Renderer2 } from '@angular/core';
import { Refresher } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Collection as collection } from '../utils/collection';
import { IFilterBarItems, IFilter } from '../components/filter';
import { LoadingController, Loading } from '../components/loading';
import { ApiUserService, IApiUser } from '../components/api';

export interface IFetchable {
    fetch(): Promise<any>;
    doRefresh(refresher?: Refresher): void;
}

/**
 * "Abstract" base page component to share init entry for page - showing loader, fetching data, etc.
 * Page template has to have #refresher ref
 *
 * Derived class contstructor must inject
 * `protected translate: TranslateService, protected loading: LoadingController, protected renderer: Renderer2, protected user: ApiUserService`
 * and call
 * `super(translate, loading, renderer, user);`
 *
 */
export class BasePage implements IFetchable {
    @ViewChild('refresher') refresher: any;

    items: any[];
    filters: IFilterBarItems;
    filtered: IFilter = {};
    profile: IApiUser;
    moreItems: boolean = false;
    filterOpened: boolean;

    protected fetching: Loading;

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected renderer: Renderer2, protected user: ApiUserService) {
    }

    ionViewDidLoad() {
        this.user.current().then((user) => {
            this.profile = user;
            // omit initial load if filtered - will be triggered from there
            if (!this.filters) {
                this.load();
            }
        });
    }

    load() {
        this.fetching = this.loading.create('common.fetching-data', false);
        this.fetching.present();

        return this.fetch().then(() => {
            this.loading.hide(this.fetching, 100);
        });
    }

    filter(filtered: IFilter) {
        this.filtered = filtered;
        this.load();
    }

    onFilterOpened(isOpen) {
        this.filterOpened = isOpen;
    }

    fetch(loaded?: any, load?: number): Promise<any> {
        return new Promise(() => true);
    }

    doRefresh(refresher?: Refresher) {
        if (!refresher) {
            refresher = this.loading.showRefresher(this.renderer, this.refresher);
        }
        this.fetch()
            .then(() => refresher && refresher.complete())
            .catch(() => refresher && refresher.complete());
    }

    ionViewWillLeave() {
        this.loading.hide(this.fetching);
    }

    protected setItems(current: any[], items: any, property: string = 'id') {
        this.items = collection.unique((current ? this.items : []).concat(items.data || items), property);
        this.moreItems = !items.meta || this.items.length < items.meta.pagination.total;
    }
}
