import { Component, Input } from '@angular/core';

import { ConfirmController } from '../../components/confirm/';
import { IApproval } from './index';

/**
 * Renders approval icon - including "cover" element with confirm displayed on click.
 *
 * @param approval
 */
@Component({
    selector: 'approval-icon',
    templateUrl: 'approval.icon.html',
})
export class ApprovalIcon {
    @Input() approval: IApproval;

    constructor(private confirm: ConfirmController) {
    }

    /**
     * Opens info
     */
    open(event: MouseEvent) {
        // to block report edit
        event.stopPropagation();
        // extend for translation
        const item = Object.assign(this.approval, {
            approver: this.approval.creator.name,
            time: this.approval.createdAt,
            comment: this.approval.comment || '',
        });

        this.confirm.create({
            context: 'common.approval.' + this.approval.state,
            title: 'title',
            message: 'message',
            item,
            confirm: true
        }).present();
    }
}
