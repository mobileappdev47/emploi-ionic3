import { Component, ViewChild } from '@angular/core';
import { Events, Tabs } from 'ionic-angular';

import { AllCertificatesPage } from './all.certificates.page';

@Component({
    templateUrl: 'certificates.page.html',
})
export class CertificatesPage {
    @ViewChild('subtabs') subtabs: Tabs;
    tabs: { [key: string]: { title: string, component: any, icon: string, params?: any } } = {};

    constructor(private events: Events) {
        // then define all types
        this.tabs.all = { title: 'certificates.tabs.all', component: AllCertificatesPage, icon: 'bookmark', params: { type: 'all' } };
        this.tabs.mine = { title: 'certificates.tabs.mine', component: AllCertificatesPage, icon: 'heart', params: { type: 'mine' } };
        this.tabs.exclusive = { title: 'certificates.tabs.exclusive', component: AllCertificatesPage, icon: 'flame', params: { type: 'exclusive' } };
        // event handlers
        this.listenTabSelect();
    }

    private listenTabSelect() {
        this.events.subscribe('tabs:select', (tab: string, subtab: string) => {
            if (tab === 'certificates') {
                this.subtabs.select(this.tabIndex(subtab));
            }
        });
    }

    private tabIndex(name: string) {
        return Object.keys(this.tabs).indexOf(name);
    }
}
