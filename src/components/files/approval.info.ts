import { Component, Input, OnInit } from '@angular/core';

import { IApproval } from './index';

/**
 * Renders approval info with icon.
 *
 * @param approval Approval data - within comment property
 */
@Component({
    selector: 'approval-info',
    templateUrl: 'approval.info.html',
})
export class ApprovalInfo implements OnInit {
    @Input() approval: IApproval;

    hasComment: number;

    ngOnInit() {
        this.hasComment = this.approval && this.approval.comment && this.approval.comment.length && 1;
    }
}
