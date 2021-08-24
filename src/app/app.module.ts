import { ErrorHandler, NgModule, Provider, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NgObjectPipesModule, NgArrayPipesModule } from 'ngx-pipes';
// import { FCM } from '@ionic-native/fcm';
//import { Firebase } from '@ionic-native/firebase';

import { appConfig } from './app.config';
import { AppMain } from './app.main';
import { ApiModule } from '../components/api';
import { PopoverModule } from '../components/popover/popover.module';
import { ConfirmController } from '../components/confirm';
import { PushModule } from '../components/push/push.module';
import { LoginModule } from '../pages/login/login.module';
import { CertificatesModule } from '../pages/certificates/certificates.module';
import { ExamModule } from '../pages/exam/exam.module';
import { AppPagesDeclarations } from '../pages';
import { BasePage } from '../pages/base.page';
import { AppTabs } from './app.tabs';
import { AppMaintenance } from './app.maintenance';
import { LoadingController } from '../components/loading';
import { NotifyModule, NotifyController } from '../components/notify';
import { JobsModule } from '../pages/jobs/jobs.module';
import { BillsModule } from '../pages/bills/bills.module';
import { AssignmentsModule } from '../pages/assignments/assignments.module';
import { MessagesModule } from '../pages/messages/messages.module';
import { SettingsModule } from '../pages/settings/settings.module';
import { ProfileModule } from '../pages/profile/profile.module';
import { FilesModule } from '../components/files/files.module';
import { PipesModule } from '../pipes/pipes.module';
import { FilterModule } from '../components/filter/filter.module';

// for ngx-translate to use the files from assets folder
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const TranslateModuleOptions = {
    loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
    },
    compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
    },
};

export const IonicModuleOptions = {
    scrollAssist: false,
    autoFocusAssist: false,
    tabsHideOnSubPages: true,
};

const providers: Provider[] = [
    StatusBar,
    SplashScreen,
    SocialSharing,
    CallNumber,
    ConfirmController,
    LoadingController,
    NotifyController,
    ImagePicker,
    Camera,
    AppVersion,
    InAppBrowser,
    //Firebase
    // FCM
];

if (appConfig.env !== 'prod') {
    providers.push({ provide: ErrorHandler, useClass: IonicErrorHandler });
} else {
    enableProdMode();
}

@NgModule({
    bootstrap: [IonicApp],
    providers,
    declarations: [
        AppMain,
        AppPagesDeclarations,
        AppTabs,
        AppMaintenance,
    ],
    entryComponents: [
        AppMain,
        AppPagesDeclarations,
        AppTabs,
        AppMaintenance,
    ],
    imports: [
        IonicModule.forRoot(AppMain, IonicModuleOptions),
        TranslateModule.forRoot(TranslateModuleOptions),
        IonicStorageModule.forRoot({ name: 'p4u', storeName: 'local', driverOrder: ['localstorage'] }),
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        NgObjectPipesModule, NgArrayPipesModule, // only these at the moment needed, check ngx-pipes for more
        MomentModule,
        ApiModule,
        PushModule,
        LoginModule,
        NotifyModule,
        CertificatesModule,
        ExamModule,
        JobsModule,
        BillsModule,
        AssignmentsModule,
        MessagesModule,
        SettingsModule,
        ProfileModule,
        FilesModule,
        PipesModule,
        PopoverModule,
        FilterModule
    ],
})
export class AppModule { }
