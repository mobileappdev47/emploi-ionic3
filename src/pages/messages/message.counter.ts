import { Component, Input, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

import { DetailsController } from '../../components/details';

import { MessagesService } from './messages.service';
import { MessagesList } from './messages.list';

/**
 * Directive for displaying number of unread messages within possibility to open list
 *
 * @param visible If visible 'always' or 'new' (for new only; default)
 * @param update-strategy When to update - {listen: 'messages:check'} available (default)
 *
 * @example
 * <message-counter visible="always" update-strategy="{listen: 'event-name'}"></message-counter>
 */
@Component({
    selector: 'message-counter',
    templateUrl: 'message.counter.html',
})
export class MessageCounter implements OnInit {

    @Input() visible: string = 'new';
    @Input() strategy: { listen?: string } = { listen: 'messages:check' };

    total: number = 0;

    constructor(private details: DetailsController, private messages: MessagesService, private events: Events) {
    }

    ngOnInit() {
        // check first
        this.check();
        // then init checking by strategy
        if (this.strategy.listen) {
            this.events.subscribe(this.strategy.listen, () => this.check());
        }
    }

    check() {
        this.messages.amount().then((total) => this.total = total);
    }

    open() {
        const details = this.details.open(MessagesList);
        details.onDidDismiss(() => this.check());
    }
}
