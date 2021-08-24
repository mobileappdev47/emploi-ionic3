/* tslint:disable:no-access-missing-member due to inheritance */

import { Component, Renderer2 } from '@angular/core';
import { Refresher, NavController, Modal } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BasePage } from '../../base.page';
import { DetailsController } from '../../../components/details';
import { LoadingController } from '../../../components/loading';
import { ApiUserService } from '../../../components/api';

import { InvoicesService } from './invoices.service';
import { InvoiceDetails } from './invoice.details';

@Component({
    selector: 'page-invoices',
    templateUrl: 'invoices.page.html',
})

export class InvoicesPage extends BasePage {

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected user: ApiUserService,
                protected renderer: Renderer2, public details: DetailsController, private invoices: InvoicesService, private nav: NavController) {
        super(translate, loading, renderer, user);
        this.initFilters();
    }

    initFilters() {
        this.filters = {
            search: { type: 'search', set: '' },
            state: { type: 'select', set: undefined, none: true, options: 'bills.invoices.states' },
            dates: { type: 'daterange', set: { start: null, end: null } },
        };
    }

    fetch(loaded?: any[], load: number = 10): Promise<any> {
        const offset = loaded && loaded.length;
        return this.invoices.list(this.profile.roleId(), offset, load, this.filtered).then(
            (invoices) => this.setItems(loaded, invoices)
        );
    }

    doRefresh(refresher?: Refresher) { // just due to lint failure
        super.doRefresh(refresher);
    }

    /**
     * Shows details
     */
    showDetails(invoice: any) {
        let modal: Modal;
        modal = this.details.open(InvoiceDetails, { invoice, profile: this.profile });
        modal.onDidDismiss((data) => this.doRefresh(data));
        return modal;
    }

    /**
     * Switch to create invoice tab
     */
    createInvoice() {
        this.nav.parent.select(2);
    }
}
