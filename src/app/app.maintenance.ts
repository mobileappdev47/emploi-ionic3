import { Component } from '@angular/core';
import { Events, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { NewApiService } from '../components/api';
import { LoadingController } from '../components/loading';

import { appConfig } from './app.config';

@Component({
    selector: 'page-app-maintenance',
    templateUrl: 'app.maintenance.html',
})
export class AppMaintenance {

    current: any;

    constructor(private api: NewApiService, private events: Events, private params: NavParams, private loading: LoadingController) {
        this.recheck(this.params.data.info);
        this.loading.clear();
    }

    check() {
        this.api.getVersion().then(() => this.finished(), (data) => this.recheck(data.json().maintenance));
    }

    private finished() {
        this.events.publish('api:maintenance', false);
    }

    private recheck(current: any) {
        const maintenanceReload = parseInt(appConfig.maintenanceReload, 10);
        this.current = current;
        const planned = moment(this.current.end).diff(moment.now(), 'seconds');
        if (planned > 0 && planned < maintenanceReload) {
            // if planned finish is earlier than next reload, do it on planned time (but not in the past)
            setTimeout(() => this.check(), planned * 1000);
        } else {
            // after defined period otherwise
            setTimeout(() => this.check(), maintenanceReload * 1000);
        }
    }
}
