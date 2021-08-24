import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * @name TabsService
 * @description
 * "Proxy" service for providing programatic tab switching. Exposes observable subscribed by AppTabs.
 *
 * Tab name can contain subtab as ('main-tab:sub-tab') - 'sub-tab' will be send (deferred) as an event 'tabs:select' within 'main-tab', 'sub-tab' data
 * To be handled and calling appriopriate action in main tab view controller.
 *
 * @usage
 * ```ts
 * import { TabsService } from '../components/navigation';
 *
 * constructor(private tabs: TabsService) {
 * }
 *
 * changeTab(name: string) {
 *     this.tabs.select(name);
 * }
 * ```
 *
 * @see TabSwitchDirective also
 */
@Injectable()
export class TabsService {

    change: Observable<string>;
    private observer: any;

    constructor(private events: Events) {
        this.change = Observable.create((observer) => {
            this.observer = observer;
        });
    }

    select(name: string) {
        const target = name.split(':');
        if (this.observer) {
            this.observer.next(target[0]);
            if (target[1]) {
                setTimeout(() => this.events.publish('tabs:select', target[0], target[1]));
            }
        }
    }
}
