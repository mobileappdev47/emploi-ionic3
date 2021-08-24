import { Directive, Input } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

import { TabsService } from './tabs.service';

/**
 * @name
 * TabSwitchDirective
 *
 * @description
 * Directive for tab switching. Tab name must be known for AppTabs.
 *
 * @note
 * Tab name can contain subtab as ('main-tab:sub-tab') - @see TabsService
 *
 * @usage
 * ```html
 * <button ion-button tabSwitch="some-tab" dismissModal="true">Switch to some tab</button>
 * ```
 */
@Directive({
    selector: '[tabSwitch]',
    host: {
        '(click)': 'onClick()',
    },
})
export class TabSwitchDirective {
    @Input('tabSwitch') target: string;
    @Input('dismissModal') dismiss: boolean;

    constructor(private tabs: TabsService, private navigation: NavController) {
    }

    onClick() {
        this.tabs.select(this.target);
        if (this.dismiss && this.navigation.length()) {
            const main: ViewController = this.navigation.first();
            this.navigation.remove(main.index, this.navigation.length()).then(() => {
                main.dismiss();
            });
        }
    }
}
