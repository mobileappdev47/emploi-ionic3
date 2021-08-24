import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Collection as collection } from '../../utils/collection';
import { Format as format } from '../../utils/format';

import { apiConfig } from './api.config';

// Not translatable api errors - app side in in api.errors
const errors = ['Token has expired'];

/**
 *
 */
export class ApiInterceptor {

    protected http: AuthHttp;
    protected events: Events;
    protected storage: Storage;
    protected translate: TranslateService;

    private refreshingToken: Promise<any>;
    private errors: any = {};

    constructor(storage: Storage, http: AuthHttp, events: Events, translate: TranslateService) {
        this.events = events;
        this.http = http;
        this.storage = storage;
        this.translate = translate;

        // init (defered) not translateable api messages
        setTimeout(() =>
            errors.forEach((msg) => this.errors[msg] = this.translate.instant('api.errors.' + msg))
        );
    }

    protected intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err: Response) => {
            if (err.status === 401) {
                // requests refreshing token if not in progress yet
                if (!this.refreshingToken) {
                    this.refreshingToken = new Promise((resolve, reject) => {
                        // checking if the current token exist.
                        return this.storage.get('token').then((token) => {
                            if (token) {
                                return this.http.get(apiConfig.baseUrl + apiConfig.refreshTokenUrl).toPromise().then((resp) => {
                                    return this.storage.set('token', resp.json().token).then(() => {
                                        // rejecting as handled in base to repeat
                                        reject('token:refreshed');
                                        this.refreshingToken = undefined;
                                    });
                                }, () => {
                                    // emit event to logout if token refresh failed
                                    const data: { message?: any } = err.json();
                                    const msg = data && data.message;
                                    this.events.publish('user:unauthorized', msg && this.errors[msg] || msg || data);
                                    reject('token:rejected');
                                    this.refreshingToken = undefined;
                                });
                            } else {
                                // response with the original error otherwise.
                                reject(err);
                            }
                        });
                    });
                }
                return Observable.fromPromise(this.refreshingToken);
            } else {
                // checking maintenance / user disabled
                const data: { maintenance?: any, message?: any } = err.json();
                if (err.status === 503) {
                    this.events.publish('api:maintenance', this.transformMaintenance(data.maintenance));
                } else if (err.status === 406) {
                    const msg = data && data.message;
                    this.events.publish('user:unauthorized', msg && this.errors[msg] || msg || data);
                } else if (err.status === 0) {
                    this.events.publish('api:network-issue');
                }
                return Observable.throw(err);
            }
        });
    }

    protected transformMaintenance(data: { start: string, end: string } | any) {
        return data && Object.assign(data, collection.datify(data, ['start', 'end']), {
            startAt: (data.start && format.datetime(data.start)) || this.translate.instant('app.maintenance.ad-hoc'),
            endAt: (data.end && format.datetime(data.end)) || this.translate.instant('app.maintenance.ad-hoc')
        });
    }
}
