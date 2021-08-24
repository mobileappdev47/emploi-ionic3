import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions, NotificationEventResponse } from '@ionic-native/push';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';

import { NotifyController } from '../notify';
import { NewApiService, ApiUserService, IApiUser } from '../../components/api';
import { appConfig } from '../../app/app.config';

export interface IPushHandlers {
    [key: string]: (payload: any) => void;
}
/**
 * @name PushService
 * @description
 * A PushService is a for enabling push notifications
 *
 * @usage
 * ```ts
 * import { PushService } from '../components/push';
 *
 * constructor(private push: PushService) {
 * }
 *
 *
 */
@Injectable()
export class PushService {
    profile: IApiUser;
    options: PushOptions;
    messages: PushObject;

    private handlers: IPushHandlers;

    constructor(private device: Device, private api: NewApiService, private storage: Storage, private notify: NotifyController, private push: Push,
                private user: ApiUserService, private translate: TranslateService) {
        // default options
        this.options = {
            android: {},
            ios: { alert: true, badge: true, sound: true },
        };
    }

    /**
     * Inits service
     *
     * @param handlers Handlers for notification action (button tapped)
     */
    init(handlers: IPushHandlers) {
        // set
        this.handlers = handlers;
        // then flow by user
        this.user.current().then((data) => {
            this.profile = data;
            // init to take permissions first time
            this.options = { android: {}, ios: {} };
            this.messages = this.push.init(this.options);
            // then register
            this.storage.get('notifications').then((settings) => {
                // if settings not stored yet - take and store default (waiting for storing as used later)
                if (!settings) {
                    settings = appConfig.notifications.defaultEnabled;
                    return this.storage.set('notifications', settings);
                } else {
                    return Promise.resolve(settings);
                }
            }).then(() => {
                // register in any case - to be ready if user allow permission
                this.registerHandlers();
                // then check to notify (if any settings exists)
                this.push.hasPermission().then((permission: { isEnabled: boolean }) => {
                    if (!permission.isEnabled) {
                        this.notify.present(this.translate.instant('push.no-permission'));
                    }
                });
            });
        });
    }

    /**
     * Registers on FCM side, then API
     */
    registerHandlers() {
        this.messages.on('registration').subscribe((res: any) => {
            return this.storage.set('notificationsRegistrationId', res.registrationId).then(() => this.registerAPI());
        });

        this.messages.on('notification').subscribe((notification: NotificationEventResponse) => {
            const type = notification.additionalData.type;
            this.notify.action(notification.message, 'push.button.open', () => {
                if (this.handlers[type]) {
                    this.handlers[type](Object.assign(notification, { type }));
                }
            });
        });
    }

    /**
     * Registers on API (unregister if nothing set)
     */
    registerAPI() {
        return this.storage.get('notifications').then((settings: string[]) => {
            return this.storage.get('notificationsRegistrationId').then((token) => {
                if (this.profile) {
                    settings = settings || [];
                    if (settings.length) {
                        const params = { id: this.profile.id(), device_id: this.device.uuid, device_token: token, notifications: settings };
                        return this.api.promised(this.api.registerDevice(params));
                    } else {
                        const params = { id: this.profile.id(), device_id: this.device.uuid };
                        return this.api.promised(this.api.unregisterDevice(params));
                    }
                }
            });
        });
    }

    /**
     * Unregister on FCM and API
     */
    unregister() {
        return this.messages.unregister().then(() => {
            return this.storage.remove('notifications').then(() => {
                if (!(this.device && this.device.uuid)) {
                    return Promise.resolve(true);
                }
                const params = { id: this.profile.id(), device_id: this.device.uuid };
                return this.api.promised(this.api.unregisterDevice(params));
            });
        });
    }

    /**
     * Updates API
     */
    update() {
        return this.storage.get('notifications').then((settings: string[]) => {
            return this.storage.get('notificationsRegistrationId').then((token) => {
                if (!token) {
                    return Promise.resolve(true);
                }
                const params = { id: this.profile.id(), device_id: this.device.uuid, device_token: token, notifications: settings };
                settings = settings || [];
                return this.api.promised(this.api.updateDevice(params));
            });
        });
    }

    /**
     * Checks if notification type is subscribed
     */
    isSubscribed(type: any): Promise<boolean> {
        return this.storage.get('notifications').then((settings: string[]) => {
            return settings && settings.includes(type);
        });
    }

    /**
     * Set notification type on/off
     *
     * @param type Notification type
     * @param status Set status
     */
    set(type: string, status: boolean) {
        this.storage.get('notifications').then((settings: string[]) => {
            const set = settings || [];
            if (status) {
                if (!set.includes(type)) {
                    set.push(type);
                }
            } else {
                set.splice(set.indexOf(type), 1);
            }
            this.storage.set('notifications', set).then(() => {
                // if any set - depending on previous - register or update
                if (set.length) {
                    if (!settings) {
                        this.registerHandlers();
                    } else {
                        this.update();
                    }
                } else {
                    // unregister otherwise
                    this.unregister();
                }
            });
        });
    }
}
