import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Events, TextInput } from 'ionic-angular';

import { ConfirmController } from '../../components/confirm';
import { LoadingController, Loading } from '../../components/loading';
import { AppTabs } from '../../app/app.tabs';
import { ResetPasswordPage } from './reset.password.page';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService, ApiAuthService, IApiErrorResponse, IApiUser } from '../../components/api';

@Component({
    selector: 'page-login',
    templateUrl: 'login.page.html',
})
export class LoginPage {

    @ViewChild('password') input: TextInput;

    logging: Loading;
    // credentials = { email: '', password: '' };
    credentials = { email: 'heike70@vodafone.de', password: 'NYhQUHFPQDkC' };

    constructor(public translate: TranslateService, public loading: LoadingController, public navigation: NavController, public params: NavParams,
        private events: Events, private confirm: ConfirmController, private auth: ApiAuthService, private user: ApiUserService,
    ) {
        //
    }

    ionViewWillEnter() {
        // can come from 401 interceptor
        if (this.params.data.reason) {
            setTimeout(() => {
                this.confirm.create({ title: 'auth.error', message: this.params.data.reason, confirm: true }).present();
                this.params.data.reason = '';
            });
        }
    }

    login() {
        this.logging = this.loading.create('authenticating');
        this.logging.present();
        this.auth.login(this.credentials).then((user: IApiUser) => {
            this.process(user);
        }, (error: IApiErrorResponse) => {
            switch (error.status) {
                case 401:
                case 403:
                case 422: {
                    this.showError('errors.login-failed', /^[a-z_]+$/.test(error.message) && 'errors.' + error.message || error.message);
                    break;
                }
                default: {
                    this.showError('errors.login-failed', this.translate.instant('errors.general'));
                }
            }
        });
    }

    forgotPasswordAction() {
        this.navigation.push(ResetPasswordPage);
    }

    showPassword(): void {
        this.input.type = this.input.type === 'password' ? 'text' : 'password';
        this.input.setFocus();
    }

    private process(user: IApiUser) {
        if (user.isOnboarding()) {
            this.showError('warnings.login-restricted', 'warnings.onboarding-login').then(() => {
                this.navigation.setRoot(AppTabs);
            });
        } else {
            if (user.isDeactivated()) {
                this.events.publish('user:deactivated', user.data().deactivated_reason);
            }
            this.navigation.setRoot(AppTabs);
        }
    }

    private showError(title: string, message: string): Promise<any> {
        return new Promise((resolve) => {
            const modal = this.confirm.create({ title, message, confirm: true });
            this.logging.dismiss();
            modal.present();
            modal.onDidDismiss(() => resolve());
        });
    }
}
