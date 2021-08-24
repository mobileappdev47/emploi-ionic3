import { Injectable } from '@angular/core';
import { ModalController, Modal, ModalOptions } from 'ionic-angular';

/**
 * @name
 * DetailsController
 * @description
 * A DetailsController is a wrapper for ModalController implementing open action - presenting modal
 * with default options (full screen size, no backdrop, slide-in-right on leave).
 *
 * @usage
 * ```ts
 * import { DetailsController } from '../components/details';
 *
 * constructor(private details: DetailsController) {
 *
 * }
 *
 * openDetails() {
 *    this.details.open(DetailsPage, {some: 'optional-data}, {options: ['to-extend', or override]});
 * }
 * ```
 *
 */
@Injectable()
export class DetailsController extends ModalController {

    /**
     * Opens details page as modal
     *
     * @param component Page class
     * @param data Navigation data
     * @param options Modal options to extend/override
     */
    open(component: any, data?: any, options?: ModalOptions): Modal {
        const modal = this.create(component, data, Object.assign({
            showBackdrop: false,
            leaveAnimation: 'slide-in-right',
            cssClass: 'full',
        }, options || {}));
        modal.present();
        return modal;
    }
}
