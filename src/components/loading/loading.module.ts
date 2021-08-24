import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingController } from './loading.controller';
import { CountownTimer } from './countown.timer';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [
        CountownTimer,
    ],
    exports: [
        CountownTimer,
    ],
    providers: [
        LoadingController,
    ],
})
export class LoadingModule {}
