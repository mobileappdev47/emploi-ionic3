/* tslint:disable */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { Popover } from './popover';

@NgModule({
    declarations: [
        Popover,
    ],
    imports: [
        IonicPageModule.forChild(Popover),
        TranslateModule,
    ],
    exports: [
        Popover
    ]
})
export class PopoverModule { }
