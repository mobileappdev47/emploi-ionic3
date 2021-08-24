import { Injectable } from '@angular/core';

import { NewApiService, ApiTransform as transform, ApiResources, ApiPrepare as prepare, IApiRequestOptions } from '../../../components/api';
import { IFilter } from '../../../components/filter';
import { Collection as collection } from '../../../utils/collection';
import { Format as format } from '../../../utils/format';

import { IJob, IJobInfo, IAssignment, IAssignmentsRange, IAssignmentsCount, IAssignmentDetails } from '../bills.module';

export interface IApiInvoice {
    id?: number;
    issued_at?: string;
    comment?: string;
    total?: string;
    number?: string;
    job?: any;
    assignments?: any[];
    document?: any;
    includes_taxes?: boolean | string;
    document_id?: number;
    with_discount?: boolean;
    assignment_ids?: number[];
    approval?: { id?: number, state?: string };
    [key: string]: any;
}

/**
 *
 */
@Injectable()
export class InvoicesService {

    constructor(private api: NewApiService, private resources: ApiResources) {
    }

    /**
     * Gets list of invoices for given freelancer
     *
     * @param freelancerId
     */
    list(freelancerId: number, offset: number, limit: number, filtered: IFilter): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['document', 'assignments.date.job.site', 'creator', 'assignments.documents', 'approval'],
            order: { issued_at: 'desc' },
            paging: { offset, limit },
            params: {
                date_from: prepare.datetime(filtered && filtered.dates && filtered.dates.start),
                date_to: prepare.datetime(filtered && filtered.dates && filtered.dates.end),
                state: filtered && filtered.state || undefined,
            },
            search: filtered.search
        };
        return this.api.promised(this.api.getFreelancerInvoices({ freelancerId }, options), undefined, true).then((resp: any) => {
            return {
                data: resp.data.map((item: any) => this.transform(item)),
                meta: resp.meta
            };
        });
    }

    /**
     * Gets single invoice
     *
     * @param freelancerId
     * @param invoiceId
     */
    get(freelancerId: number, invoiceId: number): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['document', 'assignments.incentive_model', 'assignments.date.job.site', 'creator', 'approval'],
        };
        return this.api.promised(this.api.getInvoice({ freelancerId, invoiceId }, options)).then((data: any) => {
            return this.transform(data);
        });
    }

    /**
     * Gets single invoice by assignment_id
     *
     * @param freelancerId
     * @param assignmentId
     */
    getByAssignment(freelancerId: number, assignmentId: number): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['invoices.document', 'invoices.assignments.incentive_model', 'invoices.assignments.date.job.site',
                'invoices.creator', 'invoices.approval'],
        };
        return this.api.promised(this.api.getFreelancerAssignment({ freelancerId, assignmentId }, options)).then((data: any) => {
            const invoices = collection.extract(data, 'invoices') || [];
            return invoices.length && this.transform(invoices[0]) || {};
        });
    }

    /**
     * Gets list of jobs for given freelancer
     *
     * @param freelancerId
     * @param type Assignments type (done|invoiceable)
     */
    jobs(freelancerId: number, type: string, offset: number, limit: number): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['site', 'dates.assignments.incentive_model', 'project.client'],
            params: {},
            paging: { offset, limit }
        };
        // only
        options.params[`only_${type}`] = true;

        return this.api.promised(this.api.getFreelancerJobsAssignments({ freelancerId }, options), undefined, true).then((resp: any) => {
            return {
                data: resp.data.map((job: IJob) => this.transformJob(job)).sort(this.byStart),
                meta: resp.meta
            };
        });
    }

    /**
     * Gets given job for given freelancer
     *
     * @param freelancerId
     * @param jobId
     */
    job(freelancerId: number, jobId: number, type?: string): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['site', 'dates.assignments.documents.approval.creator', 'dates.assignments.revenues.creator', 'dates.assignments.invoices',
                'project.client', 'documents'],
            params: {},
        };

        options.params[`only_${type}`] = true;

        return this.api.promised(this.api.getFreelancerJobAssignments({ freelancerId, jobId }, options)).then((data: any) => {
            return this.transformJob(data);
        });
    }

    /**
     * Submits invoice
     *
     * @param invoice
     * @param freelancerId
     */
    submit(invoice: any, freelancerId: number): Promise<any> {
        let prepared: IApiInvoice = {};
        const fields = ['id', 'number', 'comment', 'total', 'includes_taxes', 'assignment_ids', 'document_id', 'approval', 'with_discount'];
        prepared = collection.only(invoice, fields);

        // merge invoice data with clear issued as ignored by api
        const data: IApiInvoice = Object.assign({ freelancerId }, prepared, { issued_at: undefined });
        collection.boolify(data, ['includes_taxes', 'with_discount']);
        data.total = invoice.total; // always use gross value
        return this.resources.update([data], 'FreelancerInvoice', 'bills.invoice.submit').then((submitted: IApiInvoice[]) => {
            // create update approval then
            const approval = Object.assign(invoice.approval || {}, { invoiceId: data.id || submitted[0], state: 'pending' });
            return this.resources.update([approval], 'InvoiceApproval');
        });
    }

    /**
     * Sends generate invoice request
     *
     * @param freelancerId
     * @param invoice
     * @param assignments
     * @param total
     * @param address
     */
    generate(freelancerId: number, invoice: any, assignments: IAssignmentDetails[], total: { net: number, gross: number }, address: number): Promise<any> {
        const { with_discount, includes_taxes } = collection.boolify(invoice, ['with_discount', 'includes_taxes']);
        const data = {
            freelancerId, with_discount, includes_taxes,
            total: total.gross, // always use gross total
            number: invoice.number,
            freelancer_address_index: address,
            assignment_details: assignments.map((assignment: any) => {
                // pluck names
                const incentives = collection.pluck((assignment.incentives || []).filter(this.onlySelected), 'name');
                const additional = collection.pluck((assignment.additional_costs || []).filter(this.onlySelected), 'name');
                // then prepare only set
                return {
                    id: assignment.id,
                    costs_on_time: !assignment.costs_on_time.disabled && parseFloat(assignment.costs_on_time.value) || undefined,
                    incentives: incentives.length && incentives || undefined,
                    additional_costs: additional.length && additional || undefined,
                };
            }),
        };

        return this.api.promised(this.api.generateFreelancerInvoice(data), 'bills.generate');
    }

    /**
     * Helper to filter selected property set
     *
     * @param item
     */
    private onlySelected(item: { selected: boolean }): boolean {
        return item.selected;
    }

    /**
     * Transforms invoice data
     *
     * @param invoice
     */
    private transform(invoice: any): any {
        const assignments = collection.extract(invoice, 'assignments') || [];
        const job: { title: string } = assignments.length && collection.extract(assignments[0], 'date.job') || { title: '' }; // job from first assignemnt

        const site = collection.extract(job as any, 'site');
        const approval = collection.extract(invoice, 'approval');
        // shortened title
        job.title = job.title.split(' | ')[0];
        // assignments start sort
        assignments.forEach((item: any) => {
            item.start_at = transform.datetime(item.appointed_at, item.start_time);
            delete item.date.data.job; // to avoid circular structure
        });
        assignments.sort(this.byStart);
        // summary date converts
        if (invoice.summary) {
            collection.datify(invoice.summary, ['from', 'to']);
            invoice.summary.from = format.date(invoice.summary.from);
            invoice.summary.to = format.date(invoice.summary.to);
        }
        invoice.issued_at = transform.datetime(invoice.issued_at);
        // stringify booleans
        collection.stringify(invoice, ['with_discount', 'includes_taxes']);

        return Object.assign(invoice, { assignments, job, site, approval });
    }

    /**
     * Transforms job data - unifies to job-card data
     *
     * @param job
     */
    private transformJob(job: IJob): any {
        const { count, range, assignments } = this.extract(job);
        const title = job.title.split(' | ')[0];

        return Object.assign(job, { job, title, count, range, assignments }, {
            site: job.site && job.site.data,
            client: job.project && job.project.data.client && job.project.data.client.data || {},
            project: job.project && job.project.data || {},
            start_at: range.dates.start,
            start_time: assignments[0] && assignments[0].start_time,
            finish_time: assignments[0] && assignments[0].finish_time,
        });
    }

    /**
     * Extracts data from job
     *
     * @param job
     */
    private extract(job: IJob): IJobInfo {
        const assignments: IAssignment[] = [];
        const count: IAssignmentsCount = { all: 0, done: 0 };
        const range: IAssignmentsRange = {
            dates: { start: null, end: null },
            rates: { min: 0, max: 0, sum: { min: 0, max: 0 } },
        };

        // assignments stats
        collection.pluck(job.dates.data, 'assignments', 'data').forEach((item: IAssignment) => {
            const assignment: IAssignmentDetails = Object.assign(item, {
                start_at: transform.datetime(item.appointed_at, item.start_time),
                end_at: transform.datetime(item.appointed_at, item.finish_time),
                disabled: !item.is_done,
            });
            count.all++;
            count.done += item.is_done ? 1 : 0;
            // set ranges
            if (!range.dates.start || range.dates.start > assignment.start_at) {
                range.dates.start = assignment.start_at;
            }
            if (!range.dates.end || range.dates.end < assignment.end_at) {
                range.dates.end = assignment.end_at;
            }
            const minEstimated = parseFloat(assignment.min_estimated_costs);
            const maxEstimated = parseFloat(assignment.max_estimated_costs);
            if (!range.rates.min || range.rates.min > minEstimated) {
                range.rates.min = minEstimated;
            }
            if (!range.rates.max || range.rates.max < maxEstimated) {
                range.rates.max = maxEstimated;
            }
            range.rates.sum.min += minEstimated;
            range.rates.sum.max += maxEstimated;
            assignments.push(assignment);
        });

        return {
            assignments: assignments.sort(this.byStart),
            count, range
        };
    }

    private byStart(a: any, b: any) {
        if (a.range) {
            return a.range.dates.start - b.range.dates.start;
        } else {
            return a.start - b.start;
        }
    }
}
