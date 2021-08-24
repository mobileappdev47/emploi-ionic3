import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController, Loading } from '../../components/loading';
import { ApiAuthService } from '../../components/api';
import { LoginPage } from './login.page';
import { ConfirmController } from '../../components/confirm';

@Component({
    templateUrl: 'reset.password.page.html',
    selector: 'page-resetpassword'
})
export class ResetPasswordPage {

    resetting: Loading;
    email: string;

    constructor(public navigation: NavController, public loading: LoadingController, private confirm: ConfirmController, private auth: ApiAuthService) {
    }

    resetPassword() {
        this.resetting = this.loading.create('common.fetching-data', false);
        this.resetting.present();
        return this.auth.resetPassword(this.email).then(() => {
            this.notify();
        }).catch((status) => {
            this.notify(status.errors);
        });
    }

    private notify(error?: any) {
        this.loading.hide(this.resetting, 100);
        this.confirm.create({
            context: 'auth.reset',
            title: error ? 'failed' : 'done',
            message: error ? error.email[0] : 'sent',
            confirm: true,
            onConfirm: () => {
                if (!error) {
                    this.navigation.setRoot(LoginPage);
                }
            },
        }).present();
    }
}
