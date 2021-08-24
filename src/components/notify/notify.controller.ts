import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * @name NotifyController
 * @description
 * A NotifyController is a wrapper for ionic ToastController getting text identifier to translate and duration (default 2000ms)
 * Has also action method to show notification with button
 *
 * @usage
 * ```ts
 * import { NotifyController } from '../components/notify';
 *
 * constructor(private notify: NotifyController) {
 * }
 *
 * someAction() {
 *     this.notify.present('some.translation.identifier');
 *     // or
 *     this.notify.present('some.translation.identifier', 3000, {some: interpolation.params});
 * }
 *
 * otherAction() {
 *     // ...
 *     this.notify.action('some.text', 'button.identifier', () => {
 *         doSomething(); // called on tap button
 *     });
 * }
 *
 */
@Injectable()
export class NotifyController {

    constructor(private translate: TranslateService, private base: ToastController) {
    }

    present(text: string, duration: number = 2000, item: any = {}): Promise<any> {
        return this.base.create({
            message: this.translate.instant(text, item),
            position: 'middle',
            duration,
        }).present();
    }

    action(text: string, button: string, handler: () => void, duration: number = 4000): Promise<any> {
        const toast = this.base.create({
            message: this.translate.instant(text),
            position: 'top',
            showCloseButton: true,
            closeButtonText: this.translate.instant(button),
            duration,
        });

        toast.onDidDismiss((data, role) => {
            // on button pressed
            if (role === 'close') {
                handler();
            }
        });

        return toast.present();
    }
}
