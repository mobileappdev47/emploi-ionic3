import { Component, ViewChild } from '@angular/core';
import { Events, Tabs } from 'ionic-angular';

import { PreparationPage } from './preparation/preparation.page';
import { InvoicesPage } from './invoices/invoices.page';
import { CreateInvoicePage } from './invoices/create.invoice';

@Component({
    selector: 'page-bills',
    templateUrl: 'bills.page.html',
})
export class BillsPage {
    @ViewChild('subtabs') subtabs: Tabs;
    tabs: { [key: string]: { title: string, component: any, icon: string } } = {};

    constructor(private events: Events) {
        this.tabs.preparation = { title: 'bills.preparation.tab-name', component: PreparationPage, icon: 'clipboard' };
        this.tabs.invoice = { title: 'bills.invoice.tab-name', component: CreateInvoicePage, icon: 'create' };
        this.tabs.invoices = { title: 'bills.invoices.tab-name', component: InvoicesPage, icon: 'filing' };
        this.listenTabSelect();
    }

    private listenTabSelect() {
        this.events.subscribe('tabs:select', (tab: string, subtab: string) => {
            if (tab === 'bills') {
                this.subtabs.select(this.tabIndex(subtab));
            }
        });
    }

    private tabIndex(name: string) {
        return Object.keys(this.tabs).indexOf(name);
    }
}
