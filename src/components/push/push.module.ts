import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { PushService } from './push.service';
import { Push } from '@ionic-native/push';
import { PushNotifyToggle } from './push.notify.toggle';
import { TranslateModule } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';

@NgModule({
    imports: [
        IonicModule,
        IonicPageModule,
        TranslateModule,
    ],
    declarations: [
        PushNotifyToggle,
    ],
    providers: [
        Push,
        Device,
        PushService,
    ],
    exports: [
        PushNotifyToggle,
    ]
})
export class PushModule { }
