import { Component, Input } from '@angular/core';

import { TrainingDetailsPage } from './training.details.page';
import { DetailsController } from '../../components/details';

@Component({
    templateUrl: 'certificate.card.html',
    selector: 'certificate-card',
})
export class CertificateCard {
    @Input() certificate: any;
    @Input() passed: boolean;

    constructor(public details: DetailsController) {
    }

    /**
     * Shows details
     */
    showDetails(trainingId: any) {
        return this.details.open(TrainingDetailsPage, { id: trainingId, passed: this.passed });
    }
}
