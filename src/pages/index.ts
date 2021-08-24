import { LoginPage } from '../pages/login/login.page';
import { AssignmentsPage } from '../pages/assignments/assignments.page';
import { JobsPage } from '../pages/jobs/jobs.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { AllCertificatesPage } from '../pages/certificates/all.certificates.page';
import { CertificatesPage } from '../pages/certificates/certificates.page';
import { ExamInstructionsPage } from '../pages/exam/exam.instructions.page';
import { ExamMainPage } from '../pages/exam/exam.main.page';
import { ExamResultPage } from '../pages/exam/exam.result.page';
import { BillsPage } from '../pages/bills/bills.page';
import { PreparationPage } from './bills/preparation/preparation.page';
import { InvoicesPage } from '../pages/bills/invoices/invoices.page';
import { JobsMainPage } from '../pages/jobs/jobs.main.page';

export interface IAppPage {
    name?: string;
    title?: string;
    component: any;
    icon?: string;
    tab?: boolean;
    disabled?: boolean;
    notification?: string[];
}

export const AppPages: IAppPage[] = [
    { name: 'assignments', component: AssignmentsPage, icon: 'calendar', tab: true },
    { name: 'jobs', component: JobsMainPage, icon: 'briefcase', tab: true, notification: ['tenders-matching'] },
    { name: 'bills', component: BillsPage, icon: 'calculator', tab: true },
    { name: 'certificates', component: CertificatesPage, icon: 'bookmark', tab: true },
    { name: 'settings', component: SettingsPage, icon: 'settings', tab: true },
];

export const AppPagesDeclarations: any[] = [];

export {
    LoginPage,
    AssignmentsPage,
    ProfilePage,
    CertificatesPage,
    AllCertificatesPage,
    SettingsPage,
    JobsPage,
    JobsMainPage,
    BillsPage,
    PreparationPage,
    InvoicesPage,
    ExamInstructionsPage
};
