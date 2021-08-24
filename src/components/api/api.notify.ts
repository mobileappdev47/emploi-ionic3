import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 *
 */
@Injectable()
export class ApiNotifyController {

    constructor(private translate: TranslateService, private base: ToastController) {
    }

    present(text: string, duration: number = 2000): Promise<any> {
        return this.base.create({
            message: this.translate.instant(text),
            position: 'middle',
            duration,
        }).present();
    }
}
