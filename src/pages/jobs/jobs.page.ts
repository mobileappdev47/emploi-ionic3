import { Component, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Refresher, Events, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LoadingController } from '../../components/loading';
import { ApiUserService } from '../../components/api';
import { BasePage } from '../base.page';
import { animations } from '../../app/app.animations';
import { Collection as collection } from '../../utils/collection';

import { JobsService } from './jobs.service';
import { JobMatch } from './jobs.operations';

@Component({
    selector: 'page-jobs',
    templateUrl: 'jobs.page.html',
    animations,
})
export class JobsPage extends BasePage {

    context: string;

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected user: ApiUserService, protected renderer: Renderer2,
                private params: NavParams, private ref: ChangeDetectorRef, private events: Events, private jobs: JobsService) {
        super(translate, loading, renderer, user);

        this.initFilters();
    }

    initFilters() {
        if (this.params.data.type === 'offers') {
            this.filters = {
                state: { set: ['pending'], type: 'buttons', options: 'jobs.offer.states' },
                contractType: { type: 'select', options: [], set: undefined, none: true },
                search: { type: 'search', set: '' },
            };
            this.context = 'offers';
        } else {
            this.filters = {
                search: { type: 'search', set: '' },
                dates: { type: 'daterange', set: { start: null, end: null } },
                postcodes: { type: 'range', set: { min: null, max: null } },
                contractType: { type: 'select', options: [], set: undefined, none: true },
                certificate: { type: 'select', options: [], set: undefined, none: true },
            };

            this.context = 'jobs';

            this.jobs.certificates().then((data: any[]) => {
                this.filters.certificate.options = data.map((cert) => collection.only(cert, ['id', 'name']));
            });
        }
        this.jobs.contractTypes().then((data: any[]) => {
            this.filters.contractType.options = data.map((contract) => collection.only(contract, ['id', 'name']));
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        // subscribe push notification events
        this.listenNotification();
    }

    fetch(loaded?: any[], load: number = 10): Promise<any> {
        if (this.params.data.type === 'offers') {
            return this.jobs.offers(this.profile.roleId(), loaded && loaded.length, load, this.filtered).then((jobs) => this.setItems(loaded, jobs));
        } else {
            const matching = this.params.data.type === 'matched' ? JobMatch.Yes : JobMatch.No;
            return this.jobs.list(this.profile.roleId(), matching, loaded && loaded.length, load, this.filtered).then((jobs) => this.setItems(loaded, jobs));
        }
    }

    onChange(job: any) {
        // updates entry
        return this.jobs.get(this.profile.roleId(), job.id).then((data) => {
            this.items[this.items.indexOf(job)] = data;
            this.ref.detectChanges();
        });
    }

    onRemove(job: any) {
        this.items.splice(this.items.indexOf(job), 1);
        this.ref.detectChanges();
    }

    doRefresh(refresher?: Refresher) { // just due to lint failure
        super.doRefresh(refresher);
    }

    private listenNotification() {
        if (this.params.data.type === 'matched') {
            this.events.subscribe('push:notification', (type: string) => {
                if (['tenders-matching'].includes(type)) {
                    this.doRefresh();
                }
            });
        }
    }
}
