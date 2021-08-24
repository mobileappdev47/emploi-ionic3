import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { TabSwitchDirective } from './tab.switch.directive';
import { ButtonBack } from './button.back';
import { TabsService } from './tabs.service';

@NgModule({
    declarations: [
        ButtonBack,
        TabSwitchDirective,
    ],
    imports: [
        IonicPageModule,
        TranslateModule,
    ],
    exports: [
        ButtonBack,
        TabSwitchDirective,
    ],
    providers: [
        TabsService,
    ],
})
export class NavigationModule { }
