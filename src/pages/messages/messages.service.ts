import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NewApiService, IApiRequestOptions, ApiTransform as transform } from '../../components/api';
import { Collection as collection } from '../../utils/collection';
import { DetailsController } from '../../components/details';

import { MessageCreate } from './message.create';

interface IApiMessage {
    created_at: string;
    reference_model: string;
    sender?: { data: { agent?: { data: any } } };
    recipient?: { data: any };
    question?: { data: any };
}

interface IApiMeta {
    pagination: { total: number };
}

export interface IMsgEditable {
    subject?: boolean;
    content?: boolean;
}

export interface IMsgHeader {
    title?: string;
    info?: string;
    placeholder?: string;
}

/**
 *
 */
@Injectable()
export class MessagesService {

    constructor(private api: NewApiService, private details: DetailsController, private translate: TranslateService) {
    }

    /**
     * Creates message modal
     *
     * @param type Message type (Job currently)
     * @param subject
     * @param content
     * @param additional Additional params to send
     * @param editable Explicitely false to block part of message
     */
    create(type: string, subject: string, content: string, additional?: any, header?: IMsgHeader, editable?: IMsgEditable): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const message = { subject, content };
            const details = this.details.open(MessageCreate, { type, message, header, editable, data: additional, service: this });
            details.onDidDismiss((action) => action ? resolve(action) : reject());
        });
    }

    /**
     * Get amount of unread messages
     */
    amount(): Promise<number> {
        const limit = {page: 1, limit: 1};
        return this.api.meta(this.api.getMessages(limit)).then((meta: IApiMeta) => meta.pagination.total);
    }

    /**
     * Gets list of messages for current user
     */
    list(): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['sender', 'question'],
            order: { created_at: 'desc' },
        };

        return this.api.promised(this.api.getMessages({}, options)).then((data: any[]) => {
            return data.map(this.transform, this);
        });
    }

    /**
     * Submits message
     *
     * @param type Message type (Job currently)
     * @param subject
     * @param content
     * @param additional Additional params to send
     */
    submit(type: string, subject: string, content: string, additional?: any) {
        const data = Object.assign({ subject, content }, additional);
        const method = `create${type}Message`;

        return this.api.promised(this.api[method](data));
    }

    /**
     *
     */
    remove(id: number): Promise<any> {
        return this.api.promised(this.api.removeMessage({ id }));
    }

    /**
     * Transforms message
     *
     * @param message
     */
    private transform(message: IApiMessage): any {
        const sender = message.sender && message.sender.data;
        const type = (message.reference_model || '').split(/\\/).pop();

        return Object.assign(message, {
            type,
            created_at: transform.datetime(message.created_at),
            sender: sender && Object.assign(sender, sender.agent && sender.agent.data || {}) || { fullname: this.translate.instant('common.system') },
            recipient: message.recipient && message.recipient.data,
            question: message.question && message.question.data,
        });
    }
}
