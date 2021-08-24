import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ApiUserService, IApiUser } from '../components/api';
import { TabsService } from '../components/navigation';
import { IAppPage, AppPages } from '../pages';

@Component({
    templateUrl: 'app.tabs.html',
})
export class AppTabs {
    @ViewChild('tabs') container: Tabs;

    pages: IAppPage[] = AppPages;
    profile: IApiUser;
    private indicies: any = {};

    constructor(private translate: TranslateService, private tabs: TabsService, private user: ApiUserService) {
        this.user.current().then((data) => {
            this.profile = data;
            // add translated titles and store indicies for names
            let i = 0;
            this.pages.forEach((tab) => {
                Object.assign(tab, {
                    title: this.translate.instant(`${tab.name}.tab-name`),
                    disabled: !this.profile.hasAccess(tab.name),
                });
                if (tab.tab) {
                    this.indicies[tab.name] = i;
                    i++;
                }
            });
            // subscribe tabs change requests (per tabSwitch directive or tabs service select)
            this.tabs.change.subscribe((name) => {
                this.container.select(this.indicies[name]);
            });
        });
    }
}
