import { Injectable } from '@angular/core';

import { NewApiService} from '../../components/api';
import { Collection as collection } from '../../utils/collection';
/**
 *
 */
@Injectable()
export class ProfileService {

    constructor(private api: NewApiService) {
    }

    /**
     * Gets freelancer profile data
     *
     * @param freelancerId
     */
    get(freelancerId: number): Promise<any> {
        return this.api.promised(this.api.getFreelancer({ freelancerId }, { includes: ['contract_types'] })).then((profile) => this.transform(profile));
    }

    private transform(profile: any) {
        const fields = ['address', 'addressaddition', 'zip', 'city', 'country', 'near_to_city'];
        const addresses = [{}, {}];

        addresses.forEach((addr, idx) => {
            fields.forEach((field) => {
                const key = field + ((idx && '2') || ''); // to reflect datamodel
                if (profile[key]) {
                    addr[field] = profile[key];
                }
            });
        });

        return Object.assign(profile, {
            addresses: addresses.filter((i) => Object.getOwnPropertyNames(i).length),
            contract_types: collection.pluck(profile.contract_types.data, 'identifier')
        });
    }
}
