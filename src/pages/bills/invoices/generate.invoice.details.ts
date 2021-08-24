import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NavParams, ViewController } from 'ionic-angular';

import { Collection as collection } from '../../../utils/collection';
import { Is } from '../../../utils/is';

import { IApiUser } from '../../../components/api';
import { ProfileService } from '../../profile/profile.service';
import { ConfirmController } from '../../../components/confirm';
import { appConfig } from '../../../app/app.config';

import { IAssignment } from '../bills.module';
import { Incentive } from '../incentive';
import { InvoicesService } from './invoices.service';

@Component({
    selector: 'generate-invoice-details',
    templateUrl: 'generate.invoice.details.html',
})

export class GenerateInvoiceDetailsPage {
    invoice: any;
    profile: IApiUser;
    assignments: IAssignment[] = [];
    addresses: { list?: any[], selected: number } = { selected: 0 };
    processing: boolean;
    invoiceTax: number;

    constructor(private params: NavParams, private view: ViewController, private freelancer: ProfileService, private confirm: ConfirmController,
                private invoices: InvoicesService, private currency: CurrencyPipe) {
        this.profile = this.params.get('profile');
        this.invoice = this.params.get('invoice');
        const chosen: number[] = this.params.get('selected');
        // only selected
        this.assignments = collection.copy(this.params.get('assignments').filter((item: IAssignment) => chosen.includes(item.id)));
        // preparing charging parts
        this.assignments.forEach((item: any) => {
            const incentives = item.incentives ||
                item.incentive_model && Object.values(collection.only(item.incentive_model, Incentive.types(), Incentive.transform));
            const costs_on_time = item.costs_on_time
                || { value: parseFloat(item.min_estimated_costs).toFixed(2), disabled: !item.wage || parseFloat(item.wage) === 0 };

            Object.assign(item, { incentives, costs_on_time });
        });
        // get full profile for addresses
        this.freelancer.get(this.profile.roleId()).then((profile) => {
            this.addresses.list = profile.addresses;
        });
    }

    total(): { net: number, gross: number, vat: number } {
        this.assignments.forEach((item: any): any => {
            const ratio = Is.true(this.invoice.includes_taxes) ? (item.vat) / 100 : 0;
            item.costs_summary =
                parseFloat(item.costs_on_time.value) +
                (item.incentives || []).reduce(this.onlySelectedValue, 0) +
                (item.additional_costs || []).reduce(this.onlySelectedValue, 0);
            item.taxes = Math.round( item.costs_summary * 100 * ratio) / 100;
        });

        const net = collection.sum(this.assignments, 'costs_summary');
        const vat = collection.sum(this.assignments, 'taxes');
        const gross = Math.round(100 * (vat + net)) / 100;

        return { net, gross, vat };
    }

    onGenerate() {
        this.confirm.create({
            context: 'bills.generate',
            title: 'confirm',
            message: 'message',
            item: {
                number: this.invoice.number,
                total: this.currency.transform(this.total().gross, 'EUR', true),
            },
            confirm: true,
            cancel: true,
            onConfirm: () => this.onGenerateConfirmed(),
        }).present();
    }

    onGenerateConfirmed(): Promise<any> {
        const total = this.total();
        return this.invoices.generate(this.profile.roleId(), this.invoice, this.assignments, total, this.addresses.selected).then((document: any) => {
            this.view.dismiss({ assignments: this.assignments, document, total });
        });
    }

    private onlySelectedValue(prev: any, item: any) {
        return prev + (item && item.selected && parseFloat(item.value) || 0);
    }
}
