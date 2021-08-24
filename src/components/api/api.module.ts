import { NgModule } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, ResponseContentType } from '@angular/http';
import { Storage } from '@ionic/storage';

import { ApiUserService } from './api.user';
import { NewApiService } from './api.service';
import { ApiResources } from './api.resources';
import { ApiAuthService } from './api.auth';
import { ApiTransform } from './api.transform';
import { ApiNotifyController } from './api.notify';

export function getAuthHttp(http: Http, storage: Storage) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        noJwtError: true,
        noClientCheck: true,
        tokenGetter: (() => storage.get('token')),
    }), http);
}

export const ApiProvider = {
    provide: AuthHttp,
    useFactory: getAuthHttp,
    deps: [Http, Storage],
};

export interface IApiRequestOptions {
    search?: string;
    params?: any;
    includes?: string[];
    order?: { [key: string]: string };
    headers?: any;
    responseType?: ResponseContentType;
    paging?: { offset: number, limit: number };
}

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [ ApiProvider, NewApiService, ApiResources, ApiAuthService, ApiUserService, ApiTransform, ApiNotifyController ],
})
export class ApiModule { }
