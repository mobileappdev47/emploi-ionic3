import { Component, Renderer2 } from '@angular/core';
import { Refresher, Modal } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BasePage } from '../../base.page';
import { DetailsController } from '../../../components/details';
import { LoadingController } from '../../../components/loading';
import { ApiUserService } from '../../../components/api';
import { animations } from '../../../app/app.animations';

import { PreparationService } from './preparation.service';
import { PreparationDetails } from './preparation.details';

@Component({
    selector: 'page-preparation',
    templateUrl: 'preparation.page.html',
    animations,
})
export class PreparationPage extends BasePage {

    constructor(protected translate: TranslateService, protected loading: LoadingController, protected user: ApiUserService, protected renderer: Renderer2,
                public details: DetailsController, private preparations: PreparationService) {
        super(translate, loading, renderer, user);
    }

    fetch(loaded: any[], load: number = 10): Promise<any> {
        return this.preparations.assignments(this.profile.roleId(), loaded && loaded.length, load).then(
            (assignments) => this.setItems(loaded, assignments)
        );
    }

    /**
     * Shows details
     */
    showDetails(assignment: any) {
        const modal: Modal = this.details.open(PreparationDetails, { assignment, profile: this.profile });
        modal.onDidDismiss((data) => data && this.doRefresh());
    }

    doRefresh(refresher?: Refresher) { // just due to lint failure
        super.doRefresh(refresher);
    }

    onChange(job: any) {
        // updates entries
        this.doRefresh();
    }
}
