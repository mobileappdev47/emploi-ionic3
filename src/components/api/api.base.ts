import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Events } from 'ionic-angular';

import { apiConfig } from './api.config';
import { ApiInterceptor } from './api.interceptor';
import { IApiRequestOptions } from './api.module';
import { ApiNotifyController } from './api.notify';

/**
 * Api notification setting
 *
 * @param operation Translation identifier - will use this within .success suffix for success
 * @param success Flag if only success must be notified
 * @param error  Flag if only error must be notified
 *
 * @note Notifies both if none of error/success set
 */
export interface IApiNotify {
    operation: string;
    success?: boolean;
    error?: boolean;
}

/**
 *
 */
@Injectable()
export class ApiBase extends ApiInterceptor {

    constructor(protected storage: Storage, protected http: AuthHttp, protected events: Events, protected translate: TranslateService,
                private notify: ApiNotifyController) {
        super(storage, http, events, translate);
    }

    request(method: string, url: string, data?: any, options?: IApiRequestOptions): Observable<Response> {
        const body = Object.assign({}, data);
        const path = apiConfig.baseUrl + this.path(url, body);
        const opts = this.options(method, body, options);

        return this.intercept(this.http.request(path, opts)).catch((err) => {
            if (err === 'token:refreshed') {
                return this.http.request(path, opts);
            } else {
                return Observable.throw(err);
            }
        });
    }

    /**
     * Encapsulates response within promise returning meta info
     *
     * @param response
     */
    meta(response: Observable<Response>): Promise<any> {
        return response.map((resp) => this.extract(resp, 'meta')).toPromise();
    }

    /**
     * Encapsulates response within promise handling notification on success/failure
     *
     * @param response
     * @param notify @see IApiNotify
     * @param full optional param to return the full resp including meta
     */
    promised(response: Observable<Response>, notify?: string | IApiNotify, full?: boolean): Promise<any> {
        // unify notification settings
        const notification: IApiNotify = typeof notify === 'string' && { operation: notify } || notify as IApiNotify;
        // then process response (if jsonized - return enveloped date or all)
        return response.map((resp) => this.extract(resp, full ? '' : 'data')).toPromise().then((data) => {
            // notify success if set flag or set only message
            if (notification && (notification.success || (notification.error === undefined && notification.success === undefined))) {
                this.notify.present(notification.operation + '.success');
            }
            // resolve data
            return Promise.resolve(data);
        }).catch((err) => {
            // unify err message
            const body = err && err.json && err.json() || {};
            const msg = err && (err.message || body.message);
            const errors = err && (err.errors || body.errors);
            // notify error if flag set or set only message
            if (notify && (notification.error || (notification.error === undefined && notification.success === undefined))) {
                this.notify.present(msg);
            }
            // reject response
            return Promise.reject({ status: err.status, message: msg, errors });
        });
    }

    getVersion(): Promise<any> {
        const req = this.request('get', '/version').map((resp) => {
            const data: { data: any, maintenance: { start: string | Date, end: string | Date } } = resp.json();
            const maintenance: any = this.transformMaintenance(data.maintenance);
            return Object.assign(data.data, { maintenance });
        });
        return req.toPromise();
    }

    protected path(url: string, data?: any, remove: boolean = true): string {
        const params = url.match(/{\w+}/g);

        if (params && !data) {
            console.error('Data required for path ' + url); // tslint:disable-line no-console
            return;
        }

        (params || []).forEach((param) => {
            const property = param.substring(1, param.length - 1);
            let value = data[property];

            if (value === undefined) {
                console.error('Property ' + property + ' missing for path ' + url); // tslint:disable-line no-console
                value = '';
            }
            url = url.replace(param, value);
            if (remove) {
                delete data[property];
            }
        });
        return url;
    }

    private options(method: string, body?: any, options?: IApiRequestOptions): RequestOptionsArgs {
        const params: { include: string, order_by: string, order_dir: string, page?: number, limit?: number, search?: string } =
            (options && options.params) || {};
        // adds includes
        if (options && options.includes) {
            params.include = options.includes.join(',');
        }
        // adds order
        if (options && options.order) {
            params.order_by = Object.keys(options.order).pop();
            params.order_dir = options.order[params.order_by] || 'asc';
        }
        // adds paging
        if (options && options.paging && options.paging.limit) {
            params.page = Math.floor((options.paging.offset || 0) / options.paging.limit) + 1;
            params.limit = options.paging.limit;
        }

        // adds search-term
        if (options && options.search && options.search.length >= (apiConfig.minSearchString || 0)) {
            params.search = options.search;
        }

        return {
            method,
            body,
            params,
            headers: new Headers((options && options.headers) || null),
            responseType: (options && options.responseType) || ResponseContentType.Json,
        };
    }

    private extract(data: { json: () => { [key: string]: any } }, type: string): any {
        return data && data.json && (data.json() && data.json()[type] || data.json());
    }
}
