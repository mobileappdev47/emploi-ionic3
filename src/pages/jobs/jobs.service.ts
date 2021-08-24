import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NewApiService, ApiTransform as transform, ApiPrepare as prepare, IApiRequestOptions } from '../../components/api';
import { IFilter } from '../../components/filter';
import { Collection as collection } from '../../utils/collection';

import { JobMatch } from './jobs.operations';

interface ITendersRange {
    dates: { start: Date, end: Date };
    rates: { min: number, max: number, sum: { min: number, max: number } };
}

interface IMismatched {
    certificates?: string[];
    location?: string[];
    contractType?: string[];
}

interface IJobDetails {
    matching: boolean;
    range: any;
    site: any;
    project: any;
    client: any;
    assignment: any;
    tenders: any[];
    mismatched: IMismatched;
}

/**
 *
 */
@Injectable()
export class JobsService {

    constructor(private api: NewApiService, private translate: TranslateService) {
    }

    /**
     * Gets list of jobs for given freelancer
     *
     * @param freelancerId
     * @param matching Matching flag
     */
    list(freelancerId: number, matching: JobMatch = JobMatch.Yes, offset: number, limit: number, filtered: IFilter): Promise<any> {
        const options: IApiRequestOptions = {
            params: {
                is_matching: matching === JobMatch.Yes || undefined,
                is_not_matching: matching === JobMatch.No || undefined,
                date_from: prepare.datetime(filtered && filtered.dates && filtered.dates.start),
                date_to: prepare.datetime(filtered && filtered.dates && filtered.dates.end),
                zip_from: filtered && filtered.postcodes && filtered.postcodes.min || undefined,
                zip_to: filtered && filtered.postcodes && filtered.postcodes.max || undefined,
                certificate_id: filtered && filtered.certificate || undefined,
                contract_type_id: filtered && filtered.contractType || undefined,
            },
            paging: { offset, limit },
            search: filtered.search
        };

        return this.api.promised(this.api.getFreelancerJobs({ freelancerId }, options), undefined, true).then((resp: any) => {
            return {
                data: resp.data.map(this.transform, this).sort(this.byRangeDates),
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
    get(freelancerId: number, jobId: number): Promise<any> {
        const options: IApiRequestOptions = {
            params: { is_matching: true },
        };

        return this.api.promised(this.api.getFreelancerJob({ freelancerId, jobId }, options)).then((data: any) => {
            return this.transform(data);
        });
    }

    /**
     * Gets list of offers for given freelancer
     *
     * @param freelancerId
     * @param filtered
     */
    offers(freelancerId: number, offset: number, limit: number, filtered: IFilter): Promise<any> {
        const options: IApiRequestOptions = {
            params: {
                with_declined: filtered.state && (filtered.state.length === 0 || filtered.state.length === 2) || undefined,
                only_declined: filtered.state && filtered.state.length === 1 && filtered.state[0] === 'declined' || undefined,
                contract_type_id: filtered && filtered.contractType || undefined,
            },
            includes: ['tender', 'freelancer'],
            paging: { offset, limit },
            search: filtered.search
        };

        return this.api.promised(this.api.getOffers({ freelancerId }, options), undefined, true).then((resp: any) => {
            return {
                data: resp.data.map((item: any) => this.transform(this.unify(item, 'offered'))).sort(this.byRangeDates),
                meta: resp.meta
            };
        });
    }

    /*
    * Gets all certificates for the filter options
    */
    certificates() {
        return this.api.promised(this.api.getAllCertificates(null, null));
    }

    /*
    * Gets all certificates for the filter options
    */
    contractTypes() {
        return this.api.promised(this.api.getAllContractTypes(null, null)).then((resp: any) =>
            resp.map((item) => this.transformContractTypes(item))
        );
    }

    /**
     * Unifies to job response structure
     */
    private unify(data: any, indicator: string): any {
        // set coming from offers indicator
        data[indicator] = true;
        data.tender.data[indicator] = true;

        return Object.assign(data, {
            title: data.tender.data.snapshots.job.title,
            tenders: { data: [data.tender.data] },
            state: indicator === 'offered' && (data.deleted_at ? 'declined' : 'pending'),
            category: data.tender.data.snapshots.job.category,
            contract_type_identifier: data.tender.data.contract_type_identifier,
        });
    }

    /**
     * Transforms job data
     *
     * @param job
     */
    private transform(job: { title: string, contract_type_identifier: string, tenders: { data: any } }): any {
        const { matching, range, site, assignment, tenders, project, client, mismatched } = this.extract(job.tenders.data);
        const shortTitle = job.title.split(' | ')[0];
        const contractType = job.contract_type_identifier && this.translate.instant('common.contract_types.' + job.contract_type_identifier);
        return tenders && Object.assign(job, { shortTitle, contractType, range, site, project, assignment, client, tenders, matching, mismatched });
    }

        /**
         * Transforms contract type
         *
         * @param contract type
         */
    private transformContractTypes(contractType: { id: number, name: string, identifier: string }): any {
        contractType.name = contractType.identifier && this.translate.instant('common.contract_types.' + contractType.identifier);
        return contractType;
    }

    /**
     * Extracts data from tenders serie
     *
     * @param tenders
     */
    private extract(tenders: any[]): IJobDetails {
        const mismatched: IMismatched = {};
        const range: ITendersRange = {
            dates: { start: null, end: null },
            rates: { min: 0, max: 0, sum: { min: 0, max: 0 } }
        };
        const matching: boolean = tenders && (tenders[0].is_matching || tenders[0].offered);

        return {
            range,
            matching,
            mismatched,
            site: tenders && tenders[0].snapshots.site,
            project: tenders && tenders[0].snapshots.project,
            client: tenders && tenders[0].snapshots.client,
            assignment: tenders && tenders[0].snapshots.assignment,
            tenders: (tenders || [])
                .map((tender) => {
                    tender.hasMoreFinancialInfo = (tender.snapshots.incentive_model && tender.snapshots.incentive_model.id) ||
                        (tender.snapshots.assignment.additional_costs && tender.snapshots.assignment.additional_costs.length);
                    const start = transform.datetime(tender.snapshots.date.appointed_at, tender.snapshots.assignment.start_time);
                    const end = transform.datetime(tender.snapshots.date.appointed_at, tender.snapshots.assignment.finish_time);
                    // evaluate mismatching
                    if (!matching) {
                        // mismatched certificates
                        if (tender.matching.certificates === false) {
                            const certificates = collection.pluck(collection.extract(tender, 'matching_details.certificates') || [], 'name');
                            mismatched.certificates = collection.unique((mismatched.certificates || []).concat(certificates));
                        }
                        // mismatched cities and zip
                        if (tender.matching.cities === false || tender.matching.zip === false) {
                            mismatched.location = [this.translate.instant('jobs.mismatched.unmatched-location')];
                        }
                        // mismatched legal certificates
                        if (tender.matching.legal === false) {
                            const legalCertificate = collection.extract(tender, 'matching_details.legal');
                            mismatched.certificates = collection.unique((mismatched.certificates || []).concat(legalCertificate.name));
                        }

                        // mismachted contract type
                        if (tender.matching.contract_type === false) {
                            const contractTypeIdentifier = collection.extract(tender, 'contract_type_identifier');
                            mismatched.contractType =  this.translate.instant('common.contract_types.' + contractTypeIdentifier);
                        }
                    }
                    // set ranges
                    if (!range.dates.start || range.dates.start > start) {
                        range.dates.start = start;
                    }
                    if (!range.dates.end || range.dates.end < end) {
                        range.dates.end = end;
                    }
                    if (!range.rates.min || range.rates.min > tender.daily_rate_min) {
                        range.rates.min = tender.daily_rate_min;
                    }
                    if (!range.rates.max || range.rates.max < tender.daily_rate_max) {
                        range.rates.max = tender.daily_rate_max;
                    }
                    range.rates.sum.min += tender.daily_rate_min;
                    range.rates.sum.max += tender.daily_rate_max;
                    // and extend object
                    return Object.assign(tender, { start, end });
                })
                .sort((a: any, b: any) => a.start - b.start),
        };
    }

    private byRangeDates(a: any, b: any) {
        return a.range.dates.start - b.range.dates.start;
    }
}
