/* tslint:disable:no-access-missing-member due to inheritance */

import { Component, Injectable, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Events, NavController, NavParams } from 'ionic-angular';

import { IFilter } from '../../components/filter';

import { LoadingController, Loading } from '../../components/loading';
import { ApiUserService, IApiUser } from '../../components/api';

import { BasePage } from '../base.page';
import { CertificatesService } from './certificates.service';

@Component({
    selector: 'page-certificates',
    templateUrl: 'all.certificates.page.html',
})

export class AllCertificatesPage extends BasePage {
    type: string;
    profile: IApiUser;
    loader: Loading;
    search: string = '';

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected renderer: Renderer2, protected user: ApiUserService,
                protected nav: NavController, private events: Events, protected certificates: CertificatesService, private params: NavParams) {
        super(translate, loading, renderer, user);
        this.type = this.params && this.params.data.type;
        this.initFilters();
        // subscribe change in certificates (after pass exam)
        this.events.subscribe('certificates:changed', () => this.doRefresh());
    }

    initFilters() {
        this.filters = {
            search: { type: 'search', set: '' },
            recommendation: { type: 'buttons', options: 'certificates.recommendation', set: undefined },
            category: { type: 'select', options: 'certificates.categories', set: undefined, none: true }
        };
    }

    fetch(loaded?: any[], load: number = 10): Promise<any> {
        return this.certificates.list(this.type, this.profile.roleId(), loaded && loaded.length, load, this.filtered).then(
            (items) => this.setItems(loaded, items)
        );
    }

    /*
    filter(filter: IFilter) {
        this.search = filter.search;
        this.fetch();
    }
    */
}
