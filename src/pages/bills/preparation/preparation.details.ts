import { Component } from '@angular/core';
import { NavParams, ViewController, Modal } from 'ionic-angular';

import { IApiUser } from '../../../components/api';
import { Collection as collection } from '../../../utils/collection';
import { DetailsController } from '../../../components/details';
import { NotifyController } from '../../../components/notify';
import { ISurvey, SurveyPage } from '../../../components/survey';
import { ConfirmController } from '../../../components/confirm';

import { IDocument, IAssignmentDetails, IReportSet } from '../bills.module';
import { PreparationService } from './preparation.service';
import { RevenueReportDetails } from './revenue.report.details';

interface ISurveyStatus {
    available?: boolean;
    answered?: boolean;
}

@Component({
    templateUrl: 'preparation.details.html',
    selector: 'preparation-details',
})
export class PreparationDetails {

    processing: boolean;
    details: IAssignmentDetails;
    previous: { reports: IReportSet };
    questionnaire: ISurveyStatus = {};
    feedback: ISurveyStatus = {};
    profile: IApiUser;

    constructor(public params: NavParams, public view: ViewController, public modal: DetailsController,
                private preparations: PreparationService, private notify: NotifyController, private confirm: ConfirmController) {
        // initial data on open
        this.details = this.params.get('assignment');
        this.profile = this.params.get('profile');

        // then request detailed for assignment (if not fetched yet)
        const req = this.details.fetched && this.details || this.preparations.assignment(this.profile.roleId(), this.details.id);
        Promise.resolve(req).then((assignment) => {
            this.details = assignment;
            this.details.fetched = true;
            // copy prev data once loaded
            this.previous = collection.copy({ reports: this.details.reports });
            // set questionnaire/feedback flags
            this.questionnaire.available = Boolean(this.details.questionnaire && this.details.questionnaire.questions &&
                this.details.questionnaire.questions.length);
            this.questionnaire.answered = this.questionnaire.available && Boolean(this.details.questionnaire.instance);
            this.feedback.available = Boolean(this.details.feedback && this.details.feedback.questions && this.details.feedback.questions.length);
            this.feedback.answered = this.feedback.available && Boolean(this.details.feedback.instance);
        });
    }

    reportFillable(): boolean {
        return this.details.fetched && (!this.questionnaire.available || this.questionnaire.answered) && (!this.feedback.available || this.feedback.answered);
    }

    onReportUpload(document: IDocument, type: string) {
        // submit after upload
        this.confirm.create({
            context: 'bills.preparation.details.' + type,
            title: 'confirm.title',
            message: 'confirm.message',
            item: document,
            confirm: true,
            cancel: true,
            onConfirm: () => {
                // update details
                this.details.reports[type] = document;
                // and submit document
                return this.onDocumentsSubmit(type);
            }
        }).present();
    }

    onDocumentsSubmit(type) {
        // then submit (and dismiss with updated data)
        this.processing = true;
        return this.preparations.submitDocuments(this.details.id, type, this.details.reports, this.previous.reports).then(
            () => {
                // copy prev data once loaded
                this.previous = collection.copy({ reports: this.details.reports });
                return this.notify.present('bills.preparation.details.' + type + (this.details.reports[type] ? '.submit' : '.remove') + '.success');
            }
        ).finally(() => this.processing = false);
    }

    editRevenue() {
        const modal: Modal = this.modal.open(RevenueReportDetails, { assignment: this.details });
        modal.onDidDismiss((data) => {

            if (data) {
                this.details.revenue = data;
                // update revenue by its mandatory information
                const revenue = this.details.revenue && Object.assign(this.details.revenue, {
                    freelancerId: this.profile.roleId(),
                    job_id: this.details.job.id,
                    assignment_ids: [this.details.id],
                });
                // then submit (and dismiss with updated data)
                this.processing = true;

                this.preparations.submitRevenue(revenue).then(
                    () => this.notify.present('bills.preparation.submit.revenue.success')
                ).finally(() => this.processing = false);
            }
        });
    }

    editSurvey(type: string) {
        // modal with questionnaire data and save handler
        const modal: Modal = this.modal.open(SurveyPage, {
            instance: this.details[type],
            save: (data: ISurvey) => this.preparations.submitSurvey(data, this.details),
        });
        // then set answered on saved
        modal.onDidDismiss((instance) => {
            if (instance) {
                this.details[type] = instance;
                this[type].answered = true;
            }
        });
    }

    // @deprecated
    onSubmit() {
        // update revenue by its mandatory information
        const revenue = this.details.revenue && Object.assign(this.details.revenue, {
            freelancerId: this.profile.roleId(),
            job_id: this.details.job.id,
            assignment_ids: [this.details.id],
        });
        // then submit (and dismiss with updated data)
        this.processing = true;
        this.preparations.submit(this.details.id, this.details.reports, this.previous.reports, revenue).then(
            () => this.notify.present('bills.preparation.submit.success') && this.view.dismiss(true),
            () => this.processing = false
        );
    }

    onRemove(document: IDocument, type: string) {
        this.confirm.create({
            context: 'bills.preparation.details.' + type + '.remove',
            title: 'confirm.title',
            message: 'confirm.message',
            item: document,
            confirm: true,
            cancel: true,
            onConfirm: () => {
                // remove document of type
                this.details.reports[type] = null;
                // and submit empty document for removal
                return this.onDocumentsSubmit(type);
            }
        }).present();
    }
}
