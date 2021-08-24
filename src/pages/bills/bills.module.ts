import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';
import { NgObjectPipesModule } from 'ngx-pipes';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { PipesModule } from '../../pipes/pipes.module';

import { FilesModule } from '../../components/files';
import { JobsModule } from '../jobs/jobs.module';
import { NavigationModule } from '../../components/navigation';
import { DetailsModule } from '../../components/details';
import { NotifyModule } from '../../components/notify';
import { FilterModule } from '../../components/filter';
import { SurveyModule, ISurvey } from '../../components/survey';
import { ValidatorsModule } from '../../components/validators';

import { BillsPage } from './bills.page';
import { AssignmentSelect } from './assignment.select';
import { PreparationPage } from './preparation/preparation.page';
import { PreparationDetails } from './preparation/preparation.details';
import { RevenueReportDetails } from './preparation/revenue.report.details';
import { PreparationService } from './preparation/preparation.service';
import { InvoicesPage } from './invoices/invoices.page';
import { InvoicesService } from './invoices/invoices.service';
import { InvoiceItem } from './invoices/invoice.item';
import { InvoiceDetails } from './invoices/invoice.details';
import { CreateInvoicePage } from './invoices/create.invoice';
import { CreateInvoiceDetailsPage } from './invoices/create.invoice.details';
import { GenerateInvoiceDetailsPage } from './invoices/generate.invoice.details';

export interface IDocument {
    id: number;
    type: string;
    assignments: { data: any[] };
    assignmentsIds?: number[];
    approval?: any;
    invoiced?: boolean;
}

export interface IReportSet {
    [key: string]: IDocument;
}

export interface IRevenue {
    id?: number;
    assignment_ids?: number[];
    sales_volume: any[];
    changed?: boolean;
    remove?: boolean;
    sum?: string | number;
    total?: number;
}

export interface IAssignmentsCount {
    all: number;
    done: number;
}

export interface IAssignmentsRange {
    dates: { start: Date, end: Date };
    rates: { min: number, max: number, sum: { min: number, max: number } };
}

export interface IAssignment {
    id: number;
    appointed_at: string | Date;
    start_time: string;
    finish_time: string;
    is_done: boolean;
    disabled: boolean;
    state: string;
    date?: any;
    documents?: { data: IDocument[] };
    revenues?: { data: IRevenue[] };
    invoices?: { data: Array<{ state: string }> };
    revenue?: IRevenue;
    invoice?: { state: string };
    incentive_model?: { data: any };
    additional_costs?: any[];
    min_estimated_costs?: string;
    max_estimated_costs?: string;
    wage?: string;
    questionnaire_id?: number;
    freelancer_assignment_questionnaire_instance_id?: number;
    has_invoice_requirements: boolean;
    is_prepareable?: boolean;
    contract_type?: {
        identifier: string;
    };
    vat?: string;
}

export interface IAssignmentDetails extends IAssignment {
    job?: IJob;
    reports?: IReportSet;
    saleslots?: any[];
    incentives?: Array<{ name: string, value: string, selected: boolean }>;
    freelancer?: { id: number };
    questionnaire?: ISurvey;
    feedback?: ISurvey;
    fetched?: boolean;
    start_at?: Date;
    end_at?: Date;
}

export interface IJob {
    id: number;
    title: string;
    site: { data: any[] };
    project: { data: { client: { data: any[] } } };
    dates: { data: Array<{ assignments: { data: IAssignment[] } }> };
    documents?: { data: IDocument[] };
    revenues?: { data: IRevenue[] };
    saleslots?: { data: any[] };
}

export interface IJobInfo {
    range: IAssignmentsRange;
    count: IAssignmentsCount;
    assignments: IAssignment[];
}

const Components = [
    BillsPage,
    InvoiceItem,
    PreparationPage,
    InvoiceDetails,
    CreateInvoicePage,
    PreparationDetails,
    RevenueReportDetails,
    InvoicesPage,
    AssignmentSelect,
    CreateInvoiceDetailsPage,
    GenerateInvoiceDetailsPage,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(BillsPage),
        TranslateModule,
        MomentModule,
        Nl2BrPipeModule,
        NavigationModule,
        FilesModule,
        JobsModule,
        DetailsModule,
        NotifyModule,
        FilterModule,
        NgObjectPipesModule,
        SurveyModule,
        ValidatorsModule,
        PipesModule,
    ],
    providers: [
        CurrencyPipe,
        InvoicesService,
        PreparationService,
    ],
})
export class BillsModule { }
