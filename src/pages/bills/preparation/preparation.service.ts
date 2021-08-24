import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { NewApiService, ApiResources, ApiTransform as transform, IApiRequestOptions } from '../../../components/api';
import { Collection as collection } from '../../../utils/collection';
import { SurveyType, ISurvey, SurveyService } from '../../../components/survey';

import { IAssignment, IAssignmentDetails, IRevenue, IDocument, IReportSet } from '../bills.module';

interface IAssignmentOperation {
    document_id: number;
    assignment_id: number;
    operation: string;
    type: string;
}

export interface IApproval {
    state: string;
    creator?: { name: string };
    createdAt?: string;
    updator?: { name: string };
    updatedAt?: string;
    comment: string;
}

export interface IPreparationDetails {
    id: number;
    selected: { [key: number]: number[] };
    document: { id: number, approval?: IApproval, invoiced: boolean };
    assignments: IAssignment[];
    saleslots: any[];
    selectedQuestionnaire: { [key: number]: number[] };
}

export interface IPreparationSet {
    selected: { [key: number]: number[] };
    document: { id: number, info?: string };
    selectedQuestionnaire: { [key: number]: number[] };
}

/**
 *
 */
@Injectable()
export class PreparationService {

    constructor(private api: NewApiService, private resources: ApiResources, private surveys: SurveyService, private currency: CurrencyPipe) {
    }

    /**
     * Fetches all freelancer's assignments
     *
     * @param freelancerId
     */
    assignments(freelancerId: number, offset: number, limit: number) {
        const options: IApiRequestOptions = {
            includes: ['date.job.site', 'date.job.project.client'],
            params: { order_by: 'appointed_at', order_dir: 'asc', only_prepareable: true },
            paging: { offset, limit }
        };

        return this.api.promised(this.api.getFreelancerAssignments({ id: freelancerId }, options), undefined, true).then((resp: any) => {
            return {
                data: resp.data.map(this.transform, this),
                meta: resp.meta
            };
        });
    }

    /**
     * Fetches single freelancer's assignment
     *
     * @param freelancerId
     * @param assignmentId
     */
    assignment(freelancerId: number, assignmentId: number) {
        const options: IApiRequestOptions = {
            includes: ['date.job.site', 'date.job.project.client', 'documents.approval', 'revenues', 'questionnaire',
                'questionnaire_instance', 'feedback_instance.approval'],
        };

        return this.api.promised(this.api.getFreelancerAssignment({ freelancerId, assignmentId }, options)).then(
            (resp: any) => this.transform(resp)
        );
    }

    /**
     * Submits assignment related documents
     *
     * @param id
     * @param report Report document
     * @param previous Previous report document
     * @param revenue
     */
    submitDocuments(id: number, type: string, reports: IReportSet, previous?: IReportSet): Promise<any> {
        const operations: IAssignmentOperation[] = [];
        const prevId = previous[type] && previous[type].id;
        const currId = reports[type] && reports[type].id;
        // if document changed remove from previous doc
        if (prevId && currId !== prevId) {
            this.addOperation(operations, prevId, id, 'remove', type);
        }
        // and/or add if new
        if (currId && currId !== prevId) {
            this.addOperation(operations, reports[type].id, id, 'create', type);
        }

        // updates resources - assignment documents
        return this.resources.update(operations, 'AssignmentDocument');
    }

    /**
     * Submits assignment related data
     *
     * @param id
     * @param report Report document
     * @param previous Previous report document
     * @param revenue
     */
    submit(id: number, reports: IReportSet, previous?: IReportSet, revenue?: IRevenue): Promise<any> {
        const operations: IAssignmentOperation[] = [];
        Object.keys(reports).forEach((type) => {
            const prevId = previous[type] && previous[type].id;
            const currId = reports[type].id;
            // if document changed remove from previous doc
            if (prevId && currId !== prevId) {
                this.addOperation(operations, prevId, id, 'remove', type);
            }
            // and/or add if new
            if (currId && currId !== prevId) {
                this.addOperation(operations, reports[type].id, id, 'create', type);
            }
        });
        // updates resources - assignment documents
        return this.resources.update(operations, 'AssignmentDocument').then(() => {
            // then revenues (only changed)
            if (revenue && revenue.changed) {
                return this.resources.update([revenue], 'FreelancerRevenue');
            } else {
                return Promise.resolve();
            }
        });
    }

    submitSurvey(data: ISurvey, assignment: IAssignmentDetails): Promise<any> {
        const params = Object.assign(this.surveys.prepare(data), {
            freelancerId: assignment.freelancer.id,
            assignmentId: assignment.id
        });

        return this.resources.update([params], 'FreelancerAssignmentSurveyInstance', `bills.preparation.details.${data.type}.submit`).then(
            (response) => {
                if (data.type === 'feedback' && data.approval) {
                    const approval = Object.assign(data.approval, {state: 'pending'});
                    return this.resources.update([approval], 'SurveyApproval').then(
                        () => Object.assign(data, {instance: response[0].id})
                    );
                } else {
                    return Object.assign(data, {instance: response[0].id});
                }
            });
    }

    submitRevenue(revenue: IRevenue): Promise<any> {
        // then revenues (only changed)
        if (revenue && revenue.changed) {
            return this.resources.update([revenue], 'FreelancerRevenue');
        } else {
            return Promise.resolve();
        }
    }

    private addOperation(operations: IAssignmentOperation[], docId: number, assignmentId: number, operation: string, opType: string) {
        operations.push({
            document_id: docId,
            assignment_id: assignmentId,
            type: opType,
            operation,
        });
    }

    /**
     * Transforms assignment data - unifies to tender-card data
     *
     * @param assignment
     */
    private transform(assignment: IAssignment): any {
        const reports: IReportSet = {};
        // extract data from includes
        const flat = collection.flatify(assignment, ['date', 'freelancer', 'date.job', 'date.job.project', 'date.job.project.client',
            'date.job.site', 'date.job.saleslots', 'questionnaire', 'questionnaire_instance', 'feedback', 'feedback_instance',
            'offer.tender.daily_rate_min', 'offer.tender.daily_rate_max']);
        const templates: { report?: any } = {};
        const revenue = assignment.revenues && assignment.revenues.data[0];
        const documents = assignment.documents && assignment.documents.data.map((document) => setDocuments(document));
        const title = flat.job.title.split(' | ')[0];
        const warning = assignment.state === 'invoiced' ? !assignment.has_invoice_requirements : undefined;
        const incentives = assignment.incentive_model && this.numbers(assignment.incentive_model);
        const costs = assignment.additional_costs && this.numbers(assignment.additional_costs);
        // sum if exists
        if (revenue) {
            revenue.sum = assignment.revenues.data[0].total;
        }
        // adapt questionnaire/feedback to survey model
        this.surveys.transform(flat, SurveyType.Questionnaire);
        this.surveys.transform(flat, SurveyType.Feedback);
        // unify structure (including job.title for tender-item)
        return Object.assign(assignment, flat, { job: { title, id: flat.job.id } }, {
            title, documents, templates, reports, revenue, warning, incentives, costs
        }, {
            start_at: transform.datetime(flat.date.appointed_at, assignment.start_time),
            contract_type_identifier: assignment.contract_type && assignment.contract_type.identifier
        });

        // Sets document connected data
        function setDocuments(document: IDocument) {
            if (document.type === 'template-report') {
                templates.report = document;
            }
            if (document.type === 'report' || document.type === 'picture-documentation') {
                reports[document.type] = Object.assign(document, { approval: document.approval && document.approval.data });
            }
            return document;
        }
    }

    private numbers(set: any | any[]): any {
        const res: any = {};
        if (Array.isArray(set)) {
            set.forEach((item: { name: string, value: string }) => res[item.name] = item.value);
        } else {
            Object.keys(set).forEach((key) => res[key] = set[key]);
        }
        return res;
    }
}
