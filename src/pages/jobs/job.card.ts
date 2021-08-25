import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

import { Collection as collection } from '../../utils/collection';
import { JobsOperations, IJobStatus, IJobDetails } from './jobs.operations';

import { TranslateService } from '@ngx-translate/core';
import { ConfirmController } from '../../components/confirm/confirm.controller';

const actionDelay: number = 3000;

@Component({
    templateUrl: 'job.card.html',
    selector: 'job-card'
})
export class JobCard implements OnInit {
    @Input() job: IJobDetails;
    @Output() removed: EventEmitter<any> = new EventEmitter();
    @Output() changed: EventEmitter<any> = new EventEmitter();

    process: boolean = false;
    pending: any = undefined;
    status: IJobStatus = {};
    delay: number = actionDelay / 1000;

    constructor(private operations: JobsOperations, private confirm: ConfirmController, private translate: TranslateService) {
    }

    ngOnInit() {
        this.setStatus();
    }

    /**
     * Shows details
     */
    showDetails() {
        if (this.job.matching) {
            this.operations.showDetails(this.job).onDidDismiss((operation) => {
                // on dismiss after rejected or accepted
                if (operation === 'accepted-partially') {
                    this.changed.emit(this.job);
                } else if (operation) {
                    this.removed.emit(this.job);
                }
            });
        } else {
            this.confirm.create({
                title: 'jobs.mismatched.title',
                message: this.mismatchedMsg(),
                cancel: true,
                cssClass: 'mismatched-info',
            }).present();
        }
    }

    /**
     * Handles cancel action
     */
    cancel(event?: MouseEvent, item?: ItemSliding): boolean {
        if (event) {
            event.stopPropagation();
        }
        if (item) {
            item.close();
        }
        if (this.pending) {
            clearTimeout(this.pending);
            this.pending = undefined;
        }
        this.processing(false);
        return true;
    }

    /**
     * Sends accept offer to api (within confirmation implemented in operations)
     *
     * @param item
     * @param event
     */
    accept(event?: MouseEvent, item?: ItemSliding) {
        if (event) {
            this.cancel(event, item);
        }

        if (!this.processing()) {
            const ids = collection.ids(this.job.tenders);
            this.processing(true);
            this.operations.acceptOffers(this.job, ids).then(() => {
                this.cancel();
                this.removed.emit(this.job);
            }).catch(() => {
                this.cancel();
            });
        }
    }

    /**
     * Sends reject offer to api
     *
     * @param event
     */
    reject(event: MouseEvent) {
        event.stopPropagation();
        if (!this.processing() && !this.pending) {
            this.pending = setTimeout(() => {
                const ids = collection.ids(this.job.tenders);
                this.processing(true);
                this.operations.rejectOffers(this.job, ids, false).then(() => {
                    this.cancel();
                    this.removed.emit(this.job);
                }).catch(() => {
                    this.processing(false);
                });
            }, actionDelay);
        }
    }

    /**
     * Sets card status
     */
    private setStatus() {
        this.status = this.operations.getStatus(this.job);
    }

    /**
     * Setter/getter of processing item (API operations)
     *
     * @param set Processing flag
     */
    private processing(set?: boolean) {
        if (set === undefined) {
            return this.process;
        } else {
            this.process = set;
            if (this.status.class) {
                this.status.class.processing = set;
            }
        }
    }

    private mismatchedMsg(): string {
        return Object.entries(this.job.mismatched).map((entry: any[]) => {
            const [key, value] = entry;
            const criteria = this.translate.instant('jobs.mismatched.' + key);
            const values = (!Array.isArray(value) ? [value] : value).join(', ');
            return `<div>${criteria}</div><div>${values}</div>`;
        }).join('');
    }
}
