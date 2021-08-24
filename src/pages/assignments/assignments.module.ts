import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';
import { NgObjectPipesModule } from 'ngx-pipes';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { PipesModule } from '../../pipes/pipes.module';

import { NotifyModule } from '../../components/notify';
import { FilesModule } from '../../components/files';
import { DetailsModule } from '../../components/details';
import { NavigationModule } from '../../components/navigation';

import { JobsModule } from '../jobs/jobs.module';
import { MessagesModule } from '../messages/messages.module';
import { BillsModule } from '../bills/bills.module';

import { AssignmentsService } from './assignments.service';
import { AssignmentsPage } from './assignments.page';
import { AssignmentDetailsModal } from './assignment.details';
import { AssignmentCard } from './assignment.card';
import { AssignmentOperations } from './assignment.operations';

const Components = [
    AssignmentsPage,
    AssignmentCard,
    AssignmentDetailsModal,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(AssignmentsPage),
        MomentModule,
        TranslateModule,
        JobsModule,
        MessagesModule,
        NavigationModule,
        DetailsModule,
        FilesModule,
        BillsModule,
        NgObjectPipesModule,
        Nl2BrPipeModule,
        NotifyModule,
        PipesModule,
    ],
    providers: [
        AssignmentsService,
        AssignmentOperations,
    ],
})
export class AssignmentsModule { }
