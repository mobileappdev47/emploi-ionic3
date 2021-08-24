import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ApiUserService } from '../../components/api';
import { Format as format } from '../../utils/format';
import { ConfirmController } from '../../components/confirm';
import { Collection as collection } from '../../utils/collection';
import { Checklist as checklist } from '../../utils/checklist';
import { NotifyController } from '../../components/notify';
import { MessagesService } from '../messages/messages.service';

import { IJobDetails, JobsOperations } from './jobs.operations';

@Component({
    templateUrl: 'job.details.html',
    selector: 'page-job-details',
})
export class JobDetailsModal {

    details: IJobDetails;
    tenders: any = {};
    offered: boolean;
    restricted: string;
    selectedAll = false;
    processing: boolean;

    private operations: JobsOperations;

    constructor(private params: NavParams, private view: ViewController, private confirm: ConfirmController, private translate: TranslateService,
                private messages: MessagesService, private notify: NotifyController, private user: ApiUserService) {
        this.operations = this.params.get('operations');
        // initial data on open
        this.details = this.params.get('job');
        // prepare collection set
        this.tenders = checklist.prepare(this.details.tenders);
        // set user "state"
        this.restricted = this.user.get().isRestricted(this.details.contract_type_identifier);
    }

    selected(): number[] {
        return checklist.selected(this.tenders);
    }

    toggleOne() {
        this.selectedAll = this.selected().length === this.details.tenders.length;
    }

    toggleAll() {
        if (this.selected().length === this.details.tenders.length) {
            checklist.reset(this.tenders);
        } else {
            checklist.set(this.tenders);
        }
    }

    info(tender: any) {
        const incentives = tender.snapshots.incentive_model;
        const costs: Array<{ name: string, value: string }> = tender.snapshots.assignment.additional_costs;
        // construct info parts
        const msg = [
            incentives && ['label', 'checkin', 'sales_report', 'picture_documentation']
                .map((key) => this.infoLine(this.translate.instant(`assignments.details.incentives.${key}`), incentives[key])).join(''),
            costs && costs.length && [this.infoLine(this.translate.instant('assignments.details.costs.label'))]
                .concat(costs.map((cost) => this.infoLine(cost.name, cost.value))).join(''),
        ];
        // then show by confirm
        return this.confirm.create({
            context: 'assignments',
            title: 'details.additional',
            message: msg.filter(Boolean).join('<div class="divider"></div>'),
            item: tender,
            confirm: true,
            cssClass: 'assignment-info',
        }).present();
    }

    /**
     * Sends accept offer to api (within confirmation implemented in operations)
     */
    acceptOffers() {
        if (!this.processing && this.operations) {
            const type = 'accepted' + (this.selectedAll ? '-all' : '-partially');
            this.processing = true;
            this.operations.acceptOffers(this.details, this.selected()).then(() => {
                this.dismiss(type);
            }).catch(() => {
                this.processing = false;
            });
        }
    }

    /**
     * Sends reject offer to api
     */
    rejectOffers() {
        if (!this.processing && this.operations) {
            const ids = collection.ids(this.details.tenders); // all
            this.processing = true;
            this.operations.rejectOffers(this.details, ids).then(() => {
                this.dismiss('rejected');
            }).catch(() => {
                this.processing = false;
            });
        }
    }

    dismiss(operation?: string) {
        this.view.dismiss(operation);
    }

    makeCall(num: string) {
        this.operations.makeCall(num);
    }

    createMessage() {
        const subject = this.translate.instant('jobs.offer.question.create', this.details);
        const info = {
            title: this.translate.instant('jobs.offer.question.title'),
            info: this.translate.instant('jobs.offer.question.info'),
            placeholder: this.translate.instant('jobs.offer.question.placeholder'),
        };
        const additional = {
            job_id: this.details.id,
            tender_ids: this.selected(),
        };

        this.messages.create('Job', subject, '', additional, info, { subject: false }).then(() => {
            this.notify.present('jobs.offer.question.sent');
        });
    }

    private infoLine(key: string, value?: string): string {
        const val = (value && format.numbers(value) + '€') || '';
        return `<div><span>${key}</span><span>${val}</span></div>`;
    }
}
