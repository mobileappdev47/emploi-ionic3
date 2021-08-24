import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { MessagesService } from './messages.service';

@Component({
    templateUrl: 'message.create.html',
    selector: 'messages-create',
})
export class MessageCreate {

    editable: { subject: boolean, content: boolean } = { subject: true, content: true };
    message: { subject: string, content: string };
    header: any;
    data: any;
    type: string;
    processing: boolean;

    private messages: MessagesService;

    constructor(private view: ViewController, private params: NavParams) {
        this.messages = this.params.get('service');
        this.message = this.params.get('message') || {};
        this.header = this.params.get('header') || {};
        this.data = this.params.get('data');
        this.type = this.params.get('type');
        // update flags
        Object.assign(this.editable, this.params.get('editable') || {});
    }

    send() {
        this.processing = true;
        this.messages.submit(this.type, this.message.subject, this.message.content, this.data).then(() => {
            this.view.dismiss('sent');
        }).finally(() => this.processing = false);
    }
}
