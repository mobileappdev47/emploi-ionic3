import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ApiUserService } from '../../components/api';
import { AssignmentsService } from './assignments.service';
import { AssignmentOperations } from './assignment.operations';

@Component({
    templateUrl: 'assignment.details.html',
    selector: 'page-assignment-details'
})
export class AssignmentDetailsModal {

    details: { id: number };

    constructor(public params: NavParams, public view: ViewController, private user: ApiUserService, private assignments: AssignmentsService,
                private operations: AssignmentOperations) {
        // initial data on open
        this.details = this.params.get('tender');
        // then request detailed for assignment
        this.user.current().then((profile) => {
            this.assignments.get(profile.roleId(), this.details.id).then((assignment) => {
                assignment.documents = (assignment.documents || []).filter((doc: any) => ['template-report', 'briefing'].indexOf(doc.type) >= 0);
                this.details = assignment;
            });
        });
    }

    dismiss(operation?: string) {
        this.view.dismiss(operation);
    }

    makeCall(num: string) {
        this.operations.makeCall(num);
    }
}
