import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NavParams, ViewController } from 'ionic-angular';

import { Is } from '../../../utils/is';
import { Collection as collection } from '../../../utils/collection';

import { IAssignmentDetails, IRevenue } from '../bills.module';

@Component({
    templateUrl: 'revenue.report.details.html',
    selector: 'revenue-report-details',
})
export class RevenueReportDetails implements OnInit {

    saleslots: Array<{ name: string }>;
    assignment: IAssignmentDetails;
    disabled: boolean;
    revenue: IRevenue;

    constructor(public params: NavParams, public view: ViewController, private currency: CurrencyPipe) {
        this.assignment = this.params.get('assignment');
        this.saleslots = this.assignment.saleslots;
        this.disabled = this.params.get('disabled');
        this.revenue = collection.copy(this.assignment.revenue);
    }

    ngOnInit() {
        const mapped: { [key: string]: number } = {};

        if (!this.revenue || Is.empty(this.revenue)) {
            this.revenue = {
                sales_volume: this.saleslots.map((slot) => ({saleslot: slot.name, value: 0}))
            };
        } else {
            // map existing slots
            this.revenue.sales_volume.forEach((slot, idx) => mapped[slot.saleslot] = idx);
            // check if something other in revenue
            this.saleslots.forEach((slot) => {
                if (mapped[slot.name] === undefined) {
                    const idx = this.revenue.sales_volume.push({saleslot: slot.name, value: 0});
                    mapped[slot.name] = idx - 1;
                }
            });
        }
    }

    onSet() {
        this.view.dismiss(Object.assign(this.revenue, { changed: true, sum: this.sum(this.revenue) }));
    }

    private sum(revenue: IRevenue): string {
        const values = collection.pluck(revenue && revenue.sales_volume, 'value');
        const sum = values.reduce((acc, item) => acc + Number(item), 0);
        return revenue && this.currency.transform(sum, 'EUR', true) || '';
    }
}
