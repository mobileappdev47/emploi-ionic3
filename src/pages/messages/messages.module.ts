import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';

import { NavigationModule } from '../../components/navigation';
import { DetailsModule } from '../../components/details';

import { MessageCounter } from './message.counter';
import { MessageCard } from './message.card';
import { MessagesList } from './messages.list';
import { MessageCreate } from './message.create';
import { MessagesService } from './messages.service';

const Components = [
    MessageCounter,
    MessageCard,
    MessagesList,
    MessageCreate,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(MessageCounter),
        TranslateModule,
        MomentModule,
        DetailsModule,
        NavigationModule,
    ],
    providers: [
        MessagesService,
    ],
})
export class MessagesModule { }
