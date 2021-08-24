import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { ConfirmController } from '../../components/confirm';
import { ApiAuthService } from '../../components/api';
import { ProfilePage, LoginPage } from '../index';
import { DetailsController } from '../../components/details';
import { ImprintPage } from './imprint.page';
import { DataprivacyPage } from './dataprivacy.page';

/**
 *
 */
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.page.html',
})
export class SettingsPage {
    pages: any = {
        profile: ProfilePage,
        imprint: ImprintPage,
        privacy: DataprivacyPage,
    };

    constructor(public details: DetailsController, private app: App, private confirm: ConfirmController, private auth: ApiAuthService) {
    }

    logout() {
        this.confirm.create({
            context: 'auth.logout',
            title: 'confirm',
            cancel: true,
            confirm: true,
            onConfirm: () => {
                this.auth.logout().then(() => {
                    this.app.getRootNav().setRoot(LoginPage);
                });
            },
        }).present();
    }
}
