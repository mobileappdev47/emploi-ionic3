import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';

import { DetailsController } from '../../components/details';
import { NewApiService, ApiUserService } from '../../components/api';
import { ConfirmController } from '../../components/confirm';

import { JobDetailsModal } from './job.details';

export enum JobState {
    Matching,    // job matching
    NotMatching, // job not matching
    Applied,     // applied for tenders in job
}

export enum JobMatch {
    All,
    Yes,
    No,
}

export interface IJobStatus {
    state?: JobState;
    class?: {
        processing?: boolean;
        matching?: boolean;
        // any 'mismatched-*'
        [key: string]: boolean;
    };
}

export interface IJobDetails {
    matching?: boolean;
    mismatched?: any;
    tenders?: any[];
    offered?: boolean;
    shortTitle?: string;
    client?: any;
    category?: string;
    range?: any;
    state?: JobState;
    site?: any;
    id?: number;
    assignment?: any;
    contract_type_identifier?: string;
    contractType?: string;
}

/**
 *
 */
@Injectable()
export class JobsOperations {

    constructor(public details: DetailsController, private confirm: ConfirmController, private api: NewApiService, private user: ApiUserService,
                public caller: CallNumber) {
    }

    showDetails(job: any) {
        return this.details.open(JobDetailsModal, { job, operations: this });
    }

    makeCall(num: string): Promise<any> {
        return this.caller.callNumber(num, false);
    }

    getStatus(job: any): IJobStatus {
        const state: JobState = job.matching ? JobState.Matching : JobState.NotMatching;
        const status = {
            state,
            class: {
                matching: state === JobState.Matching,
                mismatched: state === JobState.NotMatching,
            },
        };

        Object.entries(job.mismatched).forEach((entry) => {
            const [key] = entry;
            status.class[`mismatched-${key}`] = true;
        });

        if (job.offered) {
            status.state = JobState.Applied;
        }

        return status;
    }

    /**
     * Shows alert and sends offers on confirm
     *
     * @param job
     * @param ids Assignment ids
     */
    acceptOffers(job: any, ids: number[]): Promise<any> {
        return this.confirmation('accept', job, ids);
    }

    /**
     * Reject all offers
     *
     * @param job
     * @param ids Assignment ids
     */
    rejectOffers(job: any, ids: number[], confirm: boolean = true): Promise<any> {
        if (confirm) {
            return this.confirmation('reject', job, ids);
        } else {
            return this.tenders('reject', ids);
        }
    }

    /**
     * Displays confirmation and performs action
     *
     * @param type Operation - accept or reject
     * @param job
     * @param ids Assignment ids
     */
    private confirmation(type: string, job: any, ids: number[]) {
        return new Promise((resolve, reject) =>
            this.confirm.create({
                context: 'jobs.offer',
                title: `${type}.title`,
                message: `${type}.message.` + (ids.length === 1 ? 'single' : 'multi'),
                item: Object.assign(job, {selected: ids.length}),
                onConfirm: () => this.tenders(type, ids).then(resolve, reject),
                onCancel: () => reject()
            }).present()
        );
    }

    /**
     * Internal method creating bulk of requests
     *
     * @param type Operation - accept or reject
     * @param params Common params
     * @param ids Assignment ids
     */
    private tenders(type: string, ids: number[]): Promise<any> {
        let requests = [];
        const params = {freelancer_id: this.user.get().roleId()};
        if (type === 'accept') {
            // for accept prepere serie of data and send one request
            const data = ids.map((id) => Object.assign({tender_id: id}, params));
            requests = [this.api.promised(this.api.submitOffers(data), 'jobs.offer.accept')];
        } else {
            // serie of requests otherwise
            requests = ids.map((id) => {
                const data = Object.assign({id, tender_id: id, reason: 'FLAPP'}, params);
                return this.api.promised(this.api.rejectTender(data));
            });
        }

        return Promise.all(requests);
    }
}
