import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';
import { NgObjectPipesModule } from 'ngx-pipes';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { PipesModule } from '../../pipes/pipes.module';

import { NavigationModule } from '../../components/navigation';
import { DetailsModule } from '../../components/details';
import { LoadingModule } from '../../components/loading';
import { NotifyModule } from '../../components/notify';
import { FilterModule } from '../../components/filter';

import { JobsPage } from './jobs.page';
import { JobsMainPage } from './jobs.main.page';
import { JobCard } from './job.card';
import { TenderItem } from './tender.item';
import { JobsOperations } from './jobs.operations';
import { JobsService } from './jobs.service';
import { JobDetailsModal } from './job.details';

const Components = [
    JobsPage,
    JobCard,
    TenderItem,
    JobDetailsModal,
    JobsMainPage
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(JobsMainPage),
        MomentModule,
        TranslateModule,
        NgObjectPipesModule,
        Nl2BrPipeModule,
        NavigationModule,
        DetailsModule,
        LoadingModule,
        NotifyModule,
        FilterModule,
        PipesModule,
    ],
    providers: [
        JobsOperations,
        JobsService,
    ],
})
export class JobsModule { }
