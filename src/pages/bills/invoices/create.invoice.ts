import { Component, Renderer2 } from '@angular/core';
import { Refresher } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BasePage } from '../../base.page';
import { DetailsController } from '../../../components/details';
import { LoadingController } from '../../../components/loading';
import { ApiUserService } from '../../../components/api';
import { animations } from '../../../app/app.animations';

import { InvoicesService } from './invoices.service';
import { CreateInvoiceDetailsPage } from './create.invoice.details';

@Component({
    selector: 'create-invoice',
    templateUrl: 'create.invoice.html',
    animations
})
export class CreateInvoicePage extends BasePage {
    jobs: any[] = undefined;

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected user: ApiUserService, protected renderer: Renderer2,
                public details: DetailsController, private invoices: InvoicesService) {
        super(translate, loading, renderer, user);
    }

    fetch(loaded: any[], load: number = 10): Promise<any> {
        return this.invoices.jobs(this.profile.roleId(), 'invoiceable', loaded && loaded.length, load).then(
            (jobs) => this.setItems(loaded, jobs)
        );
    }

    showDetails(selected: any) {
        const modal = this.details.open(CreateInvoiceDetailsPage, { job: selected, profile: this.profile });
        modal.onDidDismiss((job) => {
            // means submitted
            if (job) {
                this.doRefresh();
            }
        });
    }

    doRefresh(refresher?: Refresher) {
        super.doRefresh(refresher);
    }

    onChange(job: any) {
        this.doRefresh();
    }
}
