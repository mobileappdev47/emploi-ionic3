import { Injectable } from '@angular/core';
import { AlertController, Alert, App, Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { IConfirmOptions } from './confirm.options';

/**
 * @name ConfirmController
 * @description
 * A ConfirmController is a wrapper for AlertController having confirm/cancel options and
 * uses translated values for texts
 *
 * @usage
 * ```ts
 * import { ConfirmController } from '../components/confirm/confirm.controller';
 *
 * constructor(private confirm: ConfirmController) {
 *
 * }
 *
 * presentMessage() {
 *   let message = this.confirm.create({
 *     context: 'some.translatable',
 *     title: 'title',
 *     message: 'message',
 *     confirm: true
 *   });
 *   message.present();
 * }
 * ```
 *
 * @see IConfirmOptions
 *
 */
@Injectable()
export class ConfirmController extends AlertController {

    constructor(app: App, config: Config, private translate: TranslateService) {
        super(app, config);
    }

    create(opts?: IConfirmOptions): Alert {
        console.log('opts', opts);
        const buttons = []
            .concat(!opts.persistant &&
                this.button('cancel', opts.cancel || Boolean(opts.onCancel), opts.context, opts.onCancel, opts.buttonCssClass || 'default'))
            .concat(!opts.persistant &&
                this.button('confirm', opts.confirm || Boolean(opts.onConfirm), opts.context, opts.onConfirm, opts.buttonCssClass || 'primary'))
            .concat(opts.persistant &&
                this.button('confirm', 'link', opts.context, opts.onConfirm, opts.buttonCssClass || 'primary'))
            .filter(Boolean);

        return super.create(Object.assign({}, opts, {
            title: opts.title && this.text(opts.title, opts.context),
            message: opts.message && this.text(opts.message, opts.context, opts.item),
            enableBackdropDismiss: !opts.persistant,
            buttons,
        }));
    }

    private text(text: string, context: string, item?: any) {
        const isTranslated = /\s/.test(text);
        return (isTranslated && text) || this.translate.instant((context && context + '.' || '') + text, item);
    }

    private label(set: boolean | string, def: string): string {
        return (set === true && def) || String(set);
    }

    private button(role: string, name: string | boolean, context: string, handler: () => void, cssClass: string): any[] {
        return (name && [{
            text: this.translate.instant((context && context + '.' || '') + 'buttons.' + this.label(name, role)),
            role,
            handler,
            cssClass,
        }]) || [];
    }
}
