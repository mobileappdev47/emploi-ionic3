import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { JwtHelper } from 'angular2-jwt';

import { NewApiService } from './api.service';
import { ApiUserService } from './api.user';

@Injectable()
export class ApiAuthService {

    private jwt: JwtHelper = new JwtHelper();

    constructor(public storage: Storage, private api: NewApiService, private user: ApiUserService, private events: Events) {
        this.user.setAuthenticatedCheck((): Promise<boolean> => this.isAuthenticated());
    }

    /**
     * Checks app is authenticated by token
     *
     * @returns {Promise} Resolved for true, rejected otherwise
     */
    isAuthenticated(): Promise<boolean> {
        // check only existing token until refresh time is encoded in payload
        return this.getToken().then((token) => Boolean(token) ? Promise.resolve(true) : Promise.reject(false));
    }

    login(credentials: any): Promise<boolean | any> {
        this.user.reset();
        return this.api.promised(this.api.login(credentials)).then((data) => {
            return this.setToken(data.token).then(() => {
                this.events.publish('user:loggedin');
                return this.user.current();
            });
        },
        (err) => {
            const msg = err.errors && Object.values(err.errors).join() || err.message;
            const body = err && err.json && err.json() || {};
            return Promise.reject({
                status: body.status_code || err.status,
                message: msg,
            });
        });
    }

    resetPassword(email: string): Promise<boolean | any> {
        return this.api.promised(this.api.resetPassword({email}));
    }

    logout() {
        this.user.reset();
        return this.resetToken();
    }

    getHeader(): Promise<{Authorization: string}> {
        return this.storage.get('token').then((token) => {
            // for going-to-expire (5 min) token refresh it first, then store and return
            if (this.jwt.isTokenExpired(token, 300)) {
                return this.api.promised(this.api.refreshToken({})).then((data: { token: string }) => {
                    return this.setToken(data.token).then(() => ({ Authorization: 'Bearer ' + data.token }));
                });
            } else {
                return {Authorization: 'Bearer ' + token};
            }
        });
    }

    private setToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }

    private getToken(): Promise<any> {
        return this.storage.get('token');
    }

    private resetToken(): Promise<any> {
        return this.storage.remove('token');
    }
}
