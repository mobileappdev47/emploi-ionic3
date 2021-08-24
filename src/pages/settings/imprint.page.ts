import { Component } from '@angular/core';

import { DataprivacyPage } from './dataprivacy.page';

@Component({
    templateUrl: 'imprint.page.html'
})

export class ImprintPage {
    pages: any = {
        privacy: DataprivacyPage,
    };

}
