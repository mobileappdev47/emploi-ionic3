import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationModule } from '../../components/navigation';
import { LoginPage } from './login.page';
import { ResetPasswordPage } from './reset.password.page';

const Components = [
    LoginPage,
    ResetPasswordPage,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(LoginPage),
        TranslateModule,
        NavigationModule,
        TranslateModule.forChild()
    ],
})

export class LoginModule { }
