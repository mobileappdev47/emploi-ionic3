import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Format as format } from '../../utils/format';
import { NewApiService, ApiTransform as transform, ApiPrepare as prepare } from '../../components/api';
import { appConfig } from '../../app/app.config';

/**
 *
 */
@Injectable()
export class AssignmentsService {

    constructor(private api: NewApiService) {
    }

    /**
     * Gets all freelancer assignments
     *
     * @param freelancerId
     * @param upcoming Getting only upcoming items
     */
    list(freelancerId: number, upcoming: boolean = false, offset: number, limit: number): Promise<any> {
        const options = {
            params: upcoming ? { only_upcoming: true } : { only_passed: true },
            includes: ['checkins', 'documents'],
            order: { appointed_at: 'asc' },
            paging: { offset, limit }
        };

        return this.api.promised(this.api.getFreelancerAssignments({ id: freelancerId }, options), undefined, true).then((resp: any) => {
            return {
                data: resp.data.map((item: any) => this.transform(item)),
                meta: resp.meta
            };
        });
    }

    /**
     * Gets single freelancer assignment
     *
     * @param freelancerId
     * @param assignmentId
     * @param full True (default) includes full info; base only (checkins) otherwise
     */
    get(freelancerId: number, assignmentId: number, full: boolean = true): Promise<any> {
        const options = {
            includes: full ? ['certificate', 'documents', 'checkins'] : ['checkins', 'documents'],
        };

        return this.api.promised(this.api.getFreelancerAssignment({ freelancerId, assignmentId }, options)).then((data) => {
            return this.transform(data);
        });
    }

    checkin(assignment: any) {
        const params = {
            freelancerId: assignment.freelancer.id,
            assignmentId: assignment.id,
        };

        return this.api.promised(this.api.createCheckin(params));
    }

    checkout(assignment: any) {
        const checkin = this.lastCheckin(assignment);
        const data = Object.assign(checkin, {
            freelancerId: assignment.freelancer.id,
            assignmentId: assignment.id,
            checkinId: checkin.id,
            finished_at: prepare.datetime(new Date()),
        });
        return this.api.promised(this.api.updateCheckin(data));
    }

    private transform(assignment: any) {
        const start = transform.datetime(assignment.date.data.appointed_at, assignment.start_time);
        const job = assignment.date.data.job.data;
        const incentives = assignment.incentive_model && this.numbers(assignment.incentive_model);
        const costs = assignment.additional_costs && this.numbers(assignment.additional_costs);

        job.title = job.title.split(' | ')[0];
        return Object.assign(assignment, {
            assignment,
            job,
            incentives,
            costs,
            start_time: assignment.start_time,
            finish_time: assignment.finish_time,
            freelancer: assignment.freelancer && assignment.freelancer.data,
            documents: assignment.documents && assignment.documents.data,
            daily_rate_min: assignment.offer.data.tender.data.daily_rate_min,
            daily_rate_max: assignment.offer.data.tender.data.daily_rate_max,
            offer: assignment.offer.data,
            project: assignment.date.data.job.data.project.data,
            client: assignment.date.data.job.data.project.data.client.data,
            site: assignment.date.data.job.data.site.data,
            start_at: start,
            checkin: {
                available: moment(start).add(appConfig.checkinTolerance.allowed).toDate(),
                late: moment(start).add(appConfig.checkinTolerance.delayed).toDate(),
                done: this.isCheckedIn(assignment),
            },
            checkout: {
                done: this.isCheckedOut(assignment),
            },
            reported: this.isReported(assignment),
            contract_type_identifier: assignment.contract_type && assignment.contract_type.identifier,
            is_prepareable: assignment.is_prepareable,
        });
    }

    private numbers(set: any | any[]): any {
        const res: any = {};
        if (Array.isArray(set)) {
            set.forEach((item: { name: string, value: string }) => res[item.name] = format.numbers(item.value));
        } else {
            Object.keys(set).forEach((key) => res[key] = format.numbers(set[key]));
        }
        return res;
    }

    private lastCheckin(assignment: any) {
        const max = assignment.checkins && assignment.checkins.data.length;
        return max && assignment.checkins.data[max - 1];
    }

    private isCheckedIn(assignment: any) {
        return assignment.checkins && assignment.checkins.data.length;
    }

    private isCheckedOut(assignment: any) {
        const last = this.lastCheckin(assignment);
        return last && last.finished_at;
    }

    private isReported(assignment: { documents: { data: any[] } }) {
        return assignment.documents && assignment.documents.data.some((doc: { type: string }) => doc.type === 'report');
    }
}
