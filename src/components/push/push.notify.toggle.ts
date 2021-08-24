import { Component, Input, OnInit } from '@angular/core';
import { Toggle } from 'ionic-angular';

import { PushService } from './push.service';
/**
 * @name
 * PushNotifyToggle
 * @description
 * Toggle component for push notifications
 *
 * @param type for subscription
 *
 * @usage
 * ```html
 * <push-notify-toggle label="push.settings.label" type="tenders-matching"></push-notify-toggle>
 * ```
 */
@Component({
    selector: 'push-notify-toggle',
    templateUrl: 'push.notify.toggle.html',
})

export class PushNotifyToggle implements OnInit {
    @Input() type: string;
    @Input() label: string;

    isSubscribed: boolean;

    constructor(private push: PushService) {
    }

    ngOnInit() {
        this.push.isSubscribed(this.type).then((res) => {
            this.isSubscribed = res;
        });
    }

    handlePush() {
        this.push.set(this.type, this.isSubscribed);
    }
}
