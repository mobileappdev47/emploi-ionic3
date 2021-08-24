import { Component } from '@angular/core';

import { LoadingController, Loading } from '../../components/loading';
import { ApiUserService } from '../../components/api';
import { ProfileService } from './profile.service';

/**
 *
 */
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.page.html',
})
export class ProfilePage {

    profile: any;
    fetching: Loading;

    constructor(private loading: LoadingController, private user: ApiUserService, private freelancer: ProfileService) {
        this.fetching = this.loading.create('common.fetching-data', false);
        this.fetching.present();
    }

    ionViewDidLoad() {
        this.user.current().then((user) => {
            return this.freelancer.get(user.roleId()).then((profile) => {
                this.profile = profile;
                this.profile.email = user.email();
                this.loading.hide(this.fetching);
            });
        }).catch(() => {
            this.fetching.dismiss();
        });
    }
}
