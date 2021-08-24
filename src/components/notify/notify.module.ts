import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationModule } from '../navigation';

import { NothingFoundComponent } from './nothing-found';
import { NotifyController } from './notify.controller';

@NgModule({
    imports: [
        IonicPageModule,
        NavigationModule,
        TranslateModule
    ],
    declarations: [
        NothingFoundComponent,
    ],
    providers: [
        NotifyController,
    ],
    exports: [
        NothingFoundComponent,
    ],
})
export class NotifyModule {}
