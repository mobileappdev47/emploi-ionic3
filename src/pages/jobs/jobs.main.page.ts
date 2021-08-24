import { Component, ViewChild } from '@angular/core';
import { Events, Tabs } from 'ionic-angular';

import { JobsPage } from './jobs.page';

@Component({
    selector: 'jobs-main-page',
    templateUrl: 'jobs.main.page.html',
})
export class JobsMainPage {
    @ViewChild('subtabs') subtabs: Tabs;
    tabs: { [key: string]: { title: string, component: any, icon: string, params: any } } = {};

    constructor(private events: Events) {
        // types for tabs with icon config
        const types: any = { matched: 'heart', offers: 'open', unmatched: 'more' };
        // then define all types
        Object.keys(types).forEach((type: string) => {
            // tslint:disable-next-line object-literal-shorthand
            this.tabs[type] = { title: `jobs.${type}`, component: JobsPage, icon: types[type], params: { type: type } };
        });
        // event handlers
        this.listenNotification();
        this.listenTabSelect();
    }

    private listenNotification() {
        this.events.subscribe('push:notification', (type: string) => {
            if (['tenders-matching'].includes(type)) {
                this.subtabs.select(this.tabIndex('matched'));
            }
        });
    }

    private listenTabSelect() {
        this.events.subscribe('tabs:select', (tab: string, subtab: string) => {
            if (tab === 'jobs') {
                this.subtabs.select(this.tabIndex(subtab));
            }
        });
    }

    private tabIndex(name: string) {
        return Object.keys(this.tabs).indexOf(name);
    }
}
