import { Injectable } from '@angular/core';
import { NewApiService, IApiRequestOptions } from '../../components/api';
import { IFilter } from '../../components/filter';
/**
 *
 */
@Injectable()
export class CertificatesService {

    constructor(private api: NewApiService) {
    }

    /**
     * Gets all the certificates
     *
     * @param type Parameter to include all or exclusive certificates
     *
     */
    list(type: string = 'all', freelancerId: number, offset: number, limit: number, filtered: IFilter): Promise<any> {
        let options: IApiRequestOptions = {
            order: { is_recommended: 'desc' },
            params: {
                without_passed: true,
                without_exclusive: true,
                only_recommended: filtered && (filtered.recommendation || []).includes('recommended') || undefined,
                with_jobs: filtered && (filtered.recommendation || []).includes('with_jobs') || undefined,
                category: filtered && filtered.category || undefined,
            },
            paging: { offset, limit },
            search: filtered.search
        };

        if (type === 'exclusive') {
            options.params.only_exclusive = true;
            options.params.without_exclusive = undefined;
        }

        if (type === 'mine') {
            options.params = undefined;
        }

        return this.api.promised(this.api.getFreelancerCertificates({ id: freelancerId }, options), undefined, true);
    }

    /**
     * Gets single certificate
     *
     * @param trainingId
     */
    get(trainingId: number): Promise<any> {
        const options: IApiRequestOptions = { includes: ['training', 'exam'] };
        return this.api.promised(this.api.getCertificate({ id: trainingId }, options));
    }
}
