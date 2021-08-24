import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NavParams, ViewController } from 'ionic-angular';

import { IApiUser } from '../../../components/api';
import { ConfirmController } from '../../../components/confirm';
import { Collection as collection } from '../../../utils/collection';
import { DetailsController } from '../../../components/details';

import { IAssignment } from '../bills.module';

import { IAssignmentSelectButton } from '../assignment.select';
import { InvoicesService, IApiInvoice } from './invoices.service';
import { GenerateInvoiceDetailsPage } from './generate.invoice.details';

@Component({
    selector: 'create-invoice-details',
    templateUrl: 'create.invoice.details.html',
})

export class CreateInvoiceDetailsPage {
    profile: IApiUser;
    job: { assignments: IAssignment[] };
    document: any = undefined;
    processing: boolean = false;
    invoice: IApiInvoice = { assignment_ids: [] };
    selected: number[] = [];
    summary: IAssignmentSelectButton;
    upload: string;

    constructor(private params: NavParams, private view: ViewController, private invoices: InvoicesService, private confirm: ConfirmController,
                private details: DetailsController, private currency: CurrencyPipe) {
        this.profile = this.params.get('profile');
        this.job = this.params.get('job');

        // if job is not present, then assume edit mode
        if (!this.job) {
            this.invoice = this.params.get('invoice');
            this.job = this.invoice.job;
            // initially set to own as document generated
            this.upload = 'own';
            // fetch assignment ids
            this.selected = collection.ids(this.invoice.assignments);
            // assign already invoiced assignments to job
            this.job.assignments = this.invoice.assignments;
            // fetch job with new invoiceable assignments
            this.invoices.job(this.profile.roleId(), this.invoice.job.id, 'invoiceable').then((job) => {
                // merge both invoiced + invoiceable assignments
                this.job.assignments = this.job.assignments.concat(job.assignments);
            });
            // update document
            this.document = this.invoice.document.data;
        }
        this.invoice.issued_at = (this.invoice.issued_at && new Date(this.invoice.issued_at) || new Date()).toISOString();
        // actions for assignment select
        this.summary = {
            info: (assignment: IAssignment) => this.summaryInfo(assignment),
        };
    }

    onUpload(document: { id: number }) {
        this.document = document;
        this.invoice.document = document;
        this.invoice.document_id = document.id;
    }

    onSubmit() {
        this.invoice.assignment_ids = this.selected;
        this.processing = true;

        this.invoices.submit(this.invoice, this.profile.roleId()).then(() => {
            // job for create; invoice for edit
            this.view.dismiss(this.invoice.id ? this.invoice : this.job);
        }).catch(() => this.processing = false);
    }

    onGenerate() {
        const params = { assignments: this.job.assignments, selected: this.selected, profile: this.profile, invoice: this.invoice };
        const modal = this.details.open(GenerateInvoiceDetailsPage, params);
        modal.onDidDismiss((updated: { document: any, assignments: any[], total: any }) => {
            if (updated) {
                // merge data with original
                collection.merge(this.job.assignments, updated.assignments);
                this.invoice.total = updated.total.gross;
                this.invoice.net_total = updated.total.net;
                this.invoice.generated = true;
                this.onUpload(updated.document);
            }
        });
    }

    checkSelectedAssignments() {
        if (this.selected.length > 0) {
            const validSelected = this.job.assignments.filter((assignment: IAssignment) => {
                return this.selected.includes(assignment.id) && assignment.has_invoice_requirements;
            });
            return validSelected.length === this.selected.length;
        }
        return undefined;
    }

    info(ref: string) {
        this.confirm.create({
            context: 'bills.invoice',
            message: ref + '.hint',
            cancel: true
        }).present();
    }

    private summaryInfo(assignment: any): string {
        return assignment.costs_summary && this.currency.transform(assignment.costs_summary, 'EUR', true) || '';
    }
}
