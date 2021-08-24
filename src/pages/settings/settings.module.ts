import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationModule } from '../../components/navigation';
import { PushModule } from '../../components/push/push.module';

import { SettingsPage } from './settings.page';
import { ImprintPage } from './imprint.page';
import { DataprivacyPage } from './dataprivacy.page';

const Components = [
    SettingsPage,
    ImprintPage,
    DataprivacyPage,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(SettingsPage),
        TranslateModule,
        NavigationModule,
        PushModule,
    ]
})
export class SettingsModule { }
