import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NewApiService } from './api.service';
import { IApiNotify } from './api.base';
import { IApiRequestOptions } from './api.module';

type TApiServiceMethod = (data: any, options?: IApiRequestOptions) => Observable<Response>;

export declare interface IApiErrorResponse {
    status: number;
    message?: string;
}

export interface IApiResourcesOperation {
    id?: any;
    operation?: string;
    remove?: boolean;
    [key: string]: any;
}

/**
 * ApiResources - offers update resources as operation bulk
 *
 */
export class ApiResources extends NewApiService {

    /**
     * Updates set of items
     *
     * @param {array} set Set of items; It will use item properties to determine action:
     *                      - remove - to remove item (only if id set or operation = 'remove' set)
     *                      - id - to update item (except having strict operation = 'create' property)
     *                      - will create item otherwise
     * @param {object|string} methods Methods of api service to call on; if string given it will use 'create' + methods, etc
     * @param {object|boolean} notify
     *
     * @note Items set to remove will be executed first
     * @note For empty operations set it resolve immediately
     *
     * @returns {array} Initial array - created items filled with id
     */
    update(operations: IApiResourcesOperation[], endpoint: string, notify?: string | IApiNotify): Promise<any> {
        const requests: Array<Promise<any>> = [];
        const removed: Array<Promise<any>> = [];

        const methods: { [key: string]: TApiServiceMethod } = {
            create: this['create' + endpoint],
            update: this['update' + endpoint],
            remove: this['remove'  + endpoint],
        };

        if (!operations.length) {
            return Promise.resolve();
        }

        operations.forEach((item) => {
            if (item.remove || item.operation === 'remove') {
                if (item.id || item.operation === 'remove') {
                    removed.push(this.promised(methods.remove.apply(this, [item]), notify));
                }
            } else if (item.id && item.operation !== 'create') {
                requests.push(this.promised(methods.update.apply(this, [item]), notify));
            } else {
                requests.push(this.promised(methods.create.apply(this, [item]), notify).then((resp: any) => {
                    item.id = resp && resp.id;
                    return item;
                }));
            }
        });

        return Promise.all(removed).then(() => Promise.all(requests));
    }
}
