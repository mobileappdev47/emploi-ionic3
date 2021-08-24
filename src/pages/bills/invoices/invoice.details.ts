import { Component } from '@angular/core';
import { NavParams, ViewController, Modal } from 'ionic-angular';

import { IApiUser } from '../../../components/api';
import { Collection as collection } from '../../utils/collection';
import { DetailsController } from '../../../components/details';

import { CreateInvoiceDetailsPage } from './create.invoice.details';
import { InvoicesService } from './invoices.service';
import {IAssignment} from '../bills.module';

@Component({
    templateUrl: 'invoice.details.html',
    selector: 'invoice-details',
})
export class InvoiceDetails {
    details: any;
    profile: IApiUser;
    assignmentsPrepared: boolean;

    constructor(public params: NavParams, public view: ViewController, private invoices: InvoicesService, public modal: DetailsController) {
        this.details = this.params.get('invoice');
        this.profile = this.params.get('profile');

        this.invoices.get(this.profile.roleId(), this.details.id).then((invoice) => {
            this.details = invoice;
            this.assignmentsPrepared = !invoice.assignments.some((assignment: IAssignment) => {
                return !assignment.has_invoice_requirements;
            });
        });
    }

    editInvoice() {
        // workaround for non-blocking submit-validator
        if (!this.assignmentsPrepared) {
            return;
        }

        let modal: Modal;
        modal = this.modal.open(CreateInvoiceDetailsPage, { invoice: this.details, profile: this.profile });
        modal.onDidDismiss((data) => this.onCreateDismissed(data));
        return modal;
    }

    private onCreateDismissed(data: any) {
        if (data) {
            this.invoices.get(this.profile.roleId(), data.id).then((updated) => {
                this.details = updated;
            });
        }
    }
}
