import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
import * as moment from 'moment';

import { ApiUserService, IApiUser } from '../../components/api';
import { DetailsController } from '../../components/details';
import { ConfirmController } from '../../components/confirm';
import { LoadingController, Loading } from '../../components/loading';
import { TabsService } from '../../components/navigation';

import { IAssignmentDetails } from '../bills/bills.module';
import { PreparationService } from '../bills/preparation/preparation.service';
import { PreparationDetails } from '../bills/preparation/preparation.details';
import { IApiInvoice, InvoicesService } from '../bills/invoices/invoices.service';
import { InvoiceDetails } from '../bills/invoices/invoice.details';

import { AssignmentDetailsModal } from './assignment.details';
import { AssignmentsService } from './assignments.service';

export enum AssignmentState {
    Coming,     // future assignment
    Available,  // checkin available for assignment
    Late,       // late checkin available for assignment
    CheckedIn,  // checkin done
    CheckedOut, // checkout done
    Prepared,   // prepared for invoicing
    Invoiced,   // already invoiced
    Done,       // no more action needed, because assignment is not invoiceable
}

export interface IAssignmentStatus {
    header?: string;
    button?: string;
    state?: AssignmentState;
    class?: {
        today?: boolean;
        available?: boolean;
        delayed?: boolean;
        late?: boolean;
        checkedin?: boolean;
        checkedout?: boolean;
        prepared?: boolean;
        invoiced?: boolean;
        done?: boolean;
    };
}

/**
 *
 */
@Injectable()
export class AssignmentOperations {

    private available: {whatsapp: boolean} = {
        whatsapp: false
    };

    constructor(public details: DetailsController, private actions: ActionSheetController, private social: SocialSharing, private translate: TranslateService,
                private confirm: ConfirmController, private assignments: AssignmentsService, private preparations: PreparationService,
                private invoices: InvoicesService, private user: ApiUserService, private loading: LoadingController, private tabs: TabsService,
                public caller: CallNumber) {
        // check availability
        this.social.canShareVia('whatsapp').then(() => this.available.whatsapp = true);
    }

    showDetails(tender: any) {
        return this.details.open(AssignmentDetailsModal, { tender });
    }

    makeCall(num: string): Promise<any> {
        return this.caller.callNumber(num, false);
    }

    getStatus(tender: any): IAssignmentStatus {
        const status = {
            header: 'today',
            button: 'check-in',
            state: AssignmentState.Coming,
            class: {
                today: moment().isSame(tender.start_at, 'day'),
                available: moment().isBetween(tender.checkin.available, tender.checkin.late),
                delayed: !tender.checkin.done && moment().isBetween(tender.start_at, tender.checkin.late),
                late: !tender.checkin.done && moment().isAfter(tender.checkin.late),
                checkedin: tender.checkin.done,
                checkedout: tender.checkout.done,
                prepared: tender.has_invoice_requirements, // invoice can be prepared
                invoiced: tender.state === 'invoiced', // already invoiced
                done: tender.checkout.done && !tender.is_prepareable && tender.state !== 'invoiced',
            },
        };

        if (status.class.done) {
            status.header = 'done';
            status.button = 'done'; // hidden
            status.state = AssignmentState.Done;
        } else if (status.class.prepared) {
            status.header = 'prepared';
            status.button = 'create-invoice';
            status.state = AssignmentState.Prepared;
        } else if (status.class.checkedout) {
            status.header = 'checkedout';
            status.button = 'upload-report';
            status.state = AssignmentState.CheckedOut;
        } else if (status.class.checkedin) {
            status.header = 'checkedin';
            status.button = 'check-out';
            status.state = AssignmentState.CheckedIn;
        } else if (status.class.available) {
            status.header = 'now';
            status.button = 'check-in';
            status.state = AssignmentState.Available;
        } else if (status.class.late) {
            status.header = 'late';
            status.button = 'late-check-in';
            status.state = AssignmentState.Late;
        }
        return status;
    }

    action(tender: any, status: IAssignmentStatus): Promise<any> {
        switch (status.state) {
            case AssignmentState.Done: {
                // nothing to do here
                return Promise.resolve(true);
            }
            case AssignmentState.Available: {
                return this.checkIn(tender);
            }
            case AssignmentState.Late: {
                return this.lateCheckIn(tender);
            }
            case AssignmentState.CheckedIn: {
                return this.checkOut(tender);
            }
            case AssignmentState.CheckedOut: {
                return this.reportAssignment(tender);
            }
            case AssignmentState.Prepared: {
                return this.createInvoice();
            }
            case AssignmentState.Invoiced: {
                return this.invoiceDetails(tender);
            }
            default: {
                return Promise.reject(false);
            }
        }
    }

    checkIn(tender: any): Promise<any> {
        return new Promise((resolve, reject) =>
            this.confirm.create({
                context: 'assignments',
                title: 'check-in.title',
                message: 'check-in.message',
                item: tender,
                confirm: true,
                cancel: true,
                onConfirm: () => this.onCheckinConfirm(tender).then(resolve, reject),
                onCancel: () => reject()
            }).present()
        );
    }

    lateCheckIn(tender: any): Promise<any> {
        return new Promise((resolve, reject) =>
            this.actions.create({
                title: this.trans('late-check-in.title'),
                subTitle: this.trans('late-check-in.message', tender),
                buttons: [{
                    text: this.trans('late-check-in.via-sms.button'),
                    icon: 'text',
                    handler: () => this.onShareSmsConfirm(tender, resolve, reject),
                }, {
                    text: this.trans('late-check-in.via-whatsapp.button'),
                    icon: 'whatsapp',
                    cssClass: !this.available.whatsapp && 'disabled',
                    handler: () => this.onShareWhatsappConfirm(tender, resolve, reject),
                }, {
                    text: this.translate.instant('buttons.cancel'),
                    role: 'cancel',
                    handler: () => reject(),
                }],
            }).present()
        );
    }

    checkOut(tender: any): Promise<any> {
        return new Promise((resolve, reject) =>
            this.confirm.create({
                context: 'assignments',
                title: 'check-out.title',
                message: 'check-out.message',
                item: tender,
                confirm: true,
                cancel: true,
                onConfirm: () => this.onCheckoutConfirm(tender).then(resolve, reject),
                onCancel: () => reject()
            }).present()
        );
    }

    reportAssignment(tender: any): Promise<any> {
        return new Promise((resolve) => {
            const fetching: Loading = this.loading.create('common.fetching-data', false);
            fetching.present();
            return this.user.current().then((profile: IApiUser) => {
                return this.preparations.assignment(profile.roleId(), tender.assignment.id).then((assignment: IAssignmentDetails) => {
                    this.loading.hide(fetching, 100);
                    // mark as already fetched and pass to preparation
                    assignment.fetched = true;
                    const modal = this.details.open(PreparationDetails, { profile, assignment });
                    modal.onDidDismiss((data) => resolve(data));
                });
            });
        });
    }

    createInvoice(): Promise<any> {
        return Promise.resolve(this.tabs.select('bills:invoice'));
    }

    invoiceDetails(tender: any): Promise<any>  {
        return new Promise((resolve) => {
            const fetching: Loading = this.loading.create('common.fetching-data', false);
            fetching.present();
            return this.user.current().then((profile: IApiUser) => {
                return this.invoices.getByAssignment(profile.roleId(), tender.assignment.id).then((invoice: IApiInvoice) => {
                    this.loading.hide(fetching, 100);
                    // mark as already fetched and pass to preparation
                    invoice.fetched = true;
                    const modal = this.details.open(InvoiceDetails, { profile, invoice });
                    modal.onDidDismiss((data) => resolve(data));
                });
            });
        });
    }

    private trans(identifier: string, values?: any): string {
        return this.translate.instant('assignments.' + identifier, values);
    }

    private message(tender: any, type: string) {
        const values = Object.assign(tender, {
            time: moment().format('HH:mm'),
            jobName: tender.job.title,
            agentName: tender.agent && tender.agent.fullname || '',
            freelancerName: `${tender.freelancer.firstname} ${tender.freelancer.lastname}`,
        });
        return this.trans(`late-check-in.via-${type}.message`, values);
    }

    private onCheckinConfirm(tender: any): Promise<any> {
        return this.assignments.checkin(tender).then(() => 'checkedin');
    }

    private onCheckoutConfirm(tender: any): Promise<any> {
        return this.assignments.checkout(tender).then(() => 'checkedout');
    }

    private onShareSmsConfirm(tender: any, resolve, reject): void {
        const msg = this.message(tender, 'sms');
        const tel = tender.agent && tender.agent.mobile || '';
        this.social.shareViaSMS(msg, tel).then(() => resolve(false), reject);
    }

    private onShareWhatsappConfirm(tender: any, resolve, reject): void {
        const msg = this.message(tender, 'whatsapp');
        // const tel = tender.agent && tender.agent.mobile || '';
        // this.social.shareViaWhatsAppToReceiver(tel, msg).then(() => resolve(false), reject);
        this.social.shareViaWhatsApp(msg).then(() => resolve(false), reject);
    }
}
