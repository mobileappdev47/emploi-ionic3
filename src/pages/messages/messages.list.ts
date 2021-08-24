import { Component, Renderer2 } from '@angular/core';
import { Refresher } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LoadingController } from '../../components/loading';
import { ApiUserService } from '../../components/api';
import { animations } from '../../app/app.animations';

import { BasePage } from '../base.page';
import { MessagesService } from './messages.service';

@Component({
    templateUrl: 'messages.list.html',
    selector: 'messages-list',
    animations,
})
export class MessagesList extends BasePage {

    entries: any[];

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected user: ApiUserService, protected renderer: Renderer2,
                private messages: MessagesService) {
        super(translate, loading, renderer, user);
    }

    fetch(): Promise<any> {
        return this.messages.list().then((messages) => this.entries = messages);
    }

    doRefresh(refresher?: Refresher) { // just due to lint failure
        super.doRefresh(refresher);
    }

    onRemove(message: { id: number }) {
        this.entries.splice(this.entries.indexOf(message), 1);
        this.messages.remove(message.id).then(() => {
            this.fetch();
        });
    }
}
