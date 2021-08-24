import { PushService, IPushHandlers } from './push.service';
import { PushModule } from './push.module';

export { PushModule, PushService, IPushHandlers };

/**
 * Based on NotificationEventResponse
 */
export interface IPushNotification {
    message: string;
    title?: string;
    count: string;
    sound: string;
    image: string;
    type: string;
    additionalData?: any;
}
