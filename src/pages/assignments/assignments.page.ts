import { Component, ViewChild, Renderer2 } from '@angular/core';
import { Refresher, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LoadingController } from '../../components/loading';
import { ApiUserService, IApiUser } from '../../components/api';
import { animations } from '../../app/app.animations';

import { BasePage } from '../base.page';
import { AssignmentsService } from './assignments.service';

@Component({
    selector: 'page-assignments',
    templateUrl: 'assignments.page.html',
    animations,
})
export class AssignmentsPage extends BasePage {

    @ViewChild('refresher') refresher: any;

    profile: IApiUser;
    upcoming: boolean = true;

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected user: ApiUserService, protected renderer: Renderer2,
                private events: Events, private assignments: AssignmentsService) {
        super(translate, loading, renderer, user);
        this.listenNotification();
    }

    fetch(loaded: any[], load: number = 5): Promise<any> {
        return this.assignments.list(this.profile.roleId(), this.upcoming, loaded && loaded.length, load).then(
            (assignments) => this.setItems(loaded, assignments)
        );
    }

    doRefresh(refresher?: Refresher) {
        super.doRefresh(refresher);
        this.events.publish('messages:check');
    }

    private listenNotification() {
        this.events.subscribe('push:notification', (type: string) => {
            if (['coming-checkout'].includes(type)) {
                this.doRefresh();
            }
        });
    }
}
