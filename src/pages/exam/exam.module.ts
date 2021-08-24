import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NavigationModule } from '../../components/navigation';
import { ExamInstructionsPage } from './exam.instructions.page';
import { ExamResultPage } from './exam.result.page';
import { ExamMainPage } from './exam.main.page';
import { ExamService } from './exam.service';

const Components = [
    ExamInstructionsPage,
    ExamResultPage,
    ExamMainPage,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(ExamInstructionsPage),
        TranslateModule,
        NavigationModule,
    ],
    providers: [
        ExamService,
    ],
})

export class ExamModule { }
