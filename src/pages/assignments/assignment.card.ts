import { Component, Input, Output, OnDestroy, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AssignmentOperations, IAssignmentStatus } from './assignment.operations';
import { AssignmentsService } from './assignments.service';

@Component({
    templateUrl: 'assignment.card.html',
    selector: 'assignment-card',
})
export class AssignmentCard implements AfterViewInit, OnDestroy {
    @Input() assignment: any;
    @Output() refresh: EventEmitter<any> = new EventEmitter();

    status: IAssignmentStatus = {};

    private expanded: boolean;
    private timeout: number;
    private processing: boolean;

    constructor(public alertCtrl: AlertController, public socialSharing: SocialSharing, private element: ElementRef,
                private operations: AssignmentOperations, private assignments: AssignmentsService) {
    }

    ngAfterViewInit() {
        this.expanded = this.element.nativeElement.getAttribute('expanded') === 'true';
        this.assignment.siteName = this.assignment.site.name;
        this.recheckStatus();
    }

    /**
     * Shows details
     */
    showDetails() {
        return this.operations.showDetails(this.assignment);
    }

    /**
     * Calls main action
     */
    action(): Promise<any> {
        if (!this.processing) {
            this.processing = true;
            return this.operations.action(this.assignment, this.status).then(() => {
                return this.update().then(() => {
                    this.processing = false;
                    if (this.assignment.reported) {
                        this.refresh.emit();
                    }
                });
            }).catch(() => {
                this.processing = false;
            });
        }
    }

    /**
     * Destroy handler
     */
    ngOnDestroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    /**
     * Updates assignemnt after operation
     */
    private update(): Promise<any> {
        return this.assignments.get(this.assignment.freelancer.id, this.assignment.id, false).then((assignment) => {
            this.assignment = assignment;
            this.setStatus(false);
            return assignment;
        });
    }

    /**
     * Sets card status
     */
    private setStatus(recheck: boolean = true) {
        this.status = this.operations.getStatus(this.assignment);
        if (this.expanded && recheck) {
            this.recheckStatus(10);
        }
    }

    /**
     * Sets recheck card status timeout
     */
    private recheckStatus(secs?: number) {
        this.timeout = setTimeout(() => {
            this.setStatus();
        }, secs * 1000);
    }
}
