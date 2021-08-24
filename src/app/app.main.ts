import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AppVersion } from '@ionic-native/app-version';
import * as moment from 'moment-timezone';
import 'moment/locale/de';

import { IAppPage, AppPages, LoginPage } from '../pages';
import { ConfirmController } from '../components/confirm';
import { ApiUserService, ApiAuthService, NewApiService } from '../components/api';
import { Loading } from '../components/loading';
import { NotifyController } from '../components/notify';
import { Version as version } from '../utils/version';
import { PushService, IPushHandlers, IPushNotification } from '../components/push';
import { TabsService } from '../components/navigation';

import { AppTabs } from './app.tabs';
import { appConfig } from './app.config';
import { AppMaintenance } from './app.maintenance';
import { Firebase } from '@ionic-native/firebase';
// import { FCM } from '@ionic-native/fcm';
import jsonDe from '../assets/i18n/de.json';

@Component({
    templateUrl: 'app.main.html',
})
export class AppMain implements OnInit {
    @ViewChild(Nav) nav: Nav;

    authenticating: Loading;
    pages: IAppPage[] = AppPages;
    rootPage: any;

    private handlers: IPushHandlers;
    private maintenance: boolean;

    constructor(public push: PushService, private tabs: TabsService, public translate: TranslateService, private platform: Platform, private status: StatusBar,
        private splash: SplashScreen, private events: Events, private confirm: ConfirmController, private user: ApiUserService,
        private notify: NotifyController, private api: NewApiService, private auth: ApiAuthService, private app: AppVersion,
        private firebase: Firebase,
        // private fcm: FCM
    ) {
        // set default lang
        translate.setDefaultLang(appConfig.defaultLang);
        // set fixed local time zone to Berlin
        moment.tz.setDefault('Europe/Berlin');
        // set handlers
        this.handlers = {
            'tenders-matching': (payload) => this.onNotification(payload),
            'coming-checkout': (payload) => this.onNotification(payload)
        };
    }

    ngOnInit() {
        this.onPlatformReady();
        this.navigateRoot();
        this.listenUnauthorized();
        this.listenDeactivated();
        this.listenLoggedIn();
        this.listenApiMaintenance();
        this.listenApiNoConnection();
    }

    onPlatformReady() {
        this.platform.ready().then(() => {
            this.status.overlaysWebView(false);
            this.status.styleDefault();
            this.splash.hide();

            // this.fcm.getToken().then(token => {
            //     localStorage.setItem('token', token);
            //     console.log('token', token);
            // });

           // this.translate.setDefaultLang(appConfig.defaultLang);
            //this.translate.use(appConfig.defaultLang);
            
            let jsonSeData = (jsonDe as any);
            this.translate.setTranslation('de', jsonSeData, true);

            this.firebase.getToken()
                .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
                .catch(error => console.error('Error getting token', error));

            this.firebase.onNotificationOpen()
                .subscribe(data => console.log(`User opened a notification ${data}`));

        });
    }

    onNotification(payload: IPushNotification) {
        this.events.publish('push:notification', payload.type);
        this.selectTabBy(payload.type);
    }

    selectTabBy(notification: string) {
        this.pages.forEach((tab) => {
            if (tab.notification && tab.notification.includes(notification)) {
                this.tabs.select(tab.name);
            }
        });
    }

    listenLoggedIn() {
        this.events.subscribe('user:loggedin', () => {
            this.push.init(this.handlers);
        });
    }

    listenUnauthorized() {
        this.events.subscribe('user:unauthorized', (reason: string) => {
            this.auth.logout();
            this.nav.setRoot(LoginPage, { reason });
        });
    }

    listenDeactivated() {
        this.events.subscribe('user:deactivated', (reason: string) => {
            this.accountMessage('deactivated', reason);
        });
    }

    listenApiMaintenance() {
        this.events.subscribe('api:maintenance', (info: any) => {
            // in maintenance if info set
            if (info) {
                if (!this.maintenance) {
                    this.nav.setRoot(AppMaintenance, { info });
                    this.maintenance = true;
                }
            } else {
                // reload all to reset full flow
                window.location.reload();
            }
        });
    }

    listenApiNoConnection() {
        this.events.subscribe('api:network-issue', () => {
            this.notify.present('app.network-issue.message', 3000);
        });
    }

    navigateRoot(): void {
        this.checkVersion().then((valid: any) => {
            if (valid === true) {
                this.regularStartup();
            } else if (valid) {
                this.appMessage(valid === 'network-issue' ? 'network-issue' : 'maintenance', valid);
            } else {
                this.appMessage('update');
            }
        });
    }

    regularStartup() {
        this.auth.isAuthenticated().then(() => {
            this.checkUser().then(() => {
                this.push.init(this.handlers);
                this.rootPage = AppTabs;
            });
        }, () => {
            this.rootPage = LoginPage;
        });
    }

    checkUser() {
        return this.user.current().then((user) => {
            if (user.isDeactivated()) {
                this.accountMessage('deactivated', user.data().deactivated_reason);
            }
            return user;
        });
    }

    checkVersion(): Promise<any> {
        return this.api.getVersion().then((api: { required: { flapp: string }, maintenance?: any }) => {
            return this.app.getVersionNumber().then((local) => {
                const valid = version.calculate(local) >= version.calculate(api.required.flapp);
                // check maintenance info
                if (valid && api.maintenance) {
                    return api.maintenance;
                }
                return valid;
            }, () => api.maintenance || true); // non-cordova env fallback
        }, (err) => {
            return err.status === 0 ? 'network-issue' : true;
        });
    }

    accountMessage(type: string, message: string) {
        this.confirm.create({
            title: 'profile.' + type + '.title',
            message: message + ' ', // single word messages to be not translated
            confirm: true,
        }).present();
    }

    appMessage(reason: string, params?: any) {
        this.confirm.create({
            context: `app.${reason}`,
            item: params,
            title: 'title',
            message: 'message',
            persistant: true,
            cssClass: reason,
            onConfirm: this.confirmHandler(reason),
        }).present();
    }

    confirmHandler(reason: string): () => void {
        switch (reason) {
            case 'update': {
                return () => {
                    const link = this.platform.is('android') && appConfig.store.android.url || appConfig.store.ios.url;
                    window.open(link, '_system', 'location=yes');
                    // to block dismiss
                    return false;
                };
            }
            case 'network-issue': {
                return () => {
                    window.location.reload(true);
                    // to block dismiss
                    return false;
                };
            }
            default: {
                return () => {
                    this.regularStartup();
                };
            }
        }
    }
}
