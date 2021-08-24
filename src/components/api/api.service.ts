import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiBase } from './api.base';
import { IApiRequestOptions } from './api.module';
import { apiConfig } from './api.config';

export declare interface IApiErrorResponse {
    status: number;
    message?: string;
}

/**
 * ApiService - defines method accessible API calls
 *
 * @advanced Each method like:
 * public someMethod(data: any, options?: ApiRequestOptions): Observable<Response> {
 *   return this.request('get', '/path/to/endpoint', data, options);
 * }
 */
export class NewApiService extends ApiBase {

    getDocumentUrl(data?: any): string {
        return apiConfig.baseUrl + this.path((data && '/documents/{id}') || '/documents', data, false);
    }

    getPictureUrl(data?: any, base: boolean = true): string {
        return this.path('/pictures/{id}', data, false);
    }

    login(data: any): Observable<Response> {
        return this.request('post', '/auth/login', data);
    }

    resetPassword(data: any): Observable<Response> {
        return this.request('post', '/auth/reset-password', data);
    }

    refreshToken(data: any): Observable<Response> {
        return this.request('get', apiConfig.refreshTokenUrl, data);
    }

    getCurrentUser(): Observable<Response> {
        return this.request('get', '/users/current');
    }

    getFreelancer(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}', data, options);
    }

    getFreelancerAssignment(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/assignments/{assignmentId}', data, options);
    }

    getFreelancerAssignments(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{id}/assignments', data, options);
    }

    getFreelancerJobs(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/jobs', data, options);
    }

    getFreelancerJob(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/jobs/{jobId}', data, options);
    }

    getFreelancerJobsAssignments(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/jobs/assignments', data, options);
    }

    getFreelancerJobAssignments(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/jobs/{jobId}/assignments', data, options);
    }

    getFreelancerTenders(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{id}/tenders', data, options);
    }

    getOffers(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/offers', data, options);
    }

    createCheckin(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/checkins', data, options);
    }

    updateCheckin(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/checkins/{checkinId}', data, options);
    }

    getPicture(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/pictures/{id}', data, options);
    }

    submitOffer(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/offers', data, options);
    }

    submitOffers(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('put', '/offers', data, options);
    }

    rejectTender(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/tenders/{id}/denials', data, options);
    }

    getFreelancerCertificates(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{id}/certificates', data, options);
    }

    getAllCertificates(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/certificates', data, options);
    }

    getCertificate(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/certificates/{id}', data, options);
    }

    getExam(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/exams/{id}/instances', data, options);
    }

    submitTest(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/exams/result', data, options);
    }

    registerDevice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/users/{id}/device/register', data, options);
    }

    unregisterDevice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/users/{id}/device/unregister', data, options);
    }

    updateDevice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/users/{id}/device/update', data, options);
    }

    createAssignmentDocument(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/assignments/{assignment_id}/documents', data, options);
    }

    updateAssignmentDocument(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/assignments/{assignment_id}/documents/{document_id}', data, options);
    }

    removeAssignmentDocument(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('delete', '/assignments/{assignment_id}/documents/{document_id}', data, options);
    }

    createFreelancerRevenue(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/revenues', data, options);
    }

    updateFreelancerRevenue(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/revenues/{id}', data, options);
    }

    removeFreelancerRevenue(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('delete', '/freelancers/{freelancerId}/revenues/{id}', data, options);
    }

    getMessages(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/messages', data, options);
    }

    removeMessage(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('delete', '/messages/{id}', data, options);
    }

    createJobMessage(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/jobs/{job_id}/messages', data, options);
    }

    getFreelancerInvoices(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/invoices', data, options);
    }

    getInvoice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/freelancers/{freelancerId}/invoices/{invoiceId}', data, options);
    }

    createFreelancerInvoice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/invoices', data, options);
    }

    createDocumentApproval(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/documents/{documentId}/approvals', data, options);
    }

    createInvoiceApproval(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/invoices/{invoiceId}/approvals', data, options);
    }

    updateInvoiceApproval(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/invoices/{invoiceId}/approvals/{id}', data, options);
    }

    updateFreelancerInvoice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/invoices/{id}', data, options);
    }

    createFreelancerAssignmentSurveyInstance(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/survey_instances', data, options);
    }

    updateFreelancerAssignmentSurveyInstance(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/assignments/{assignmentId}/survey_instances/{id}', data, options);
    }

    generateFreelancerInvoice(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/freelancers/{freelancerId}/invoices/generate', data, options);
    }

    updateSurveyApproval(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('post', '/survey-instances/{survey_instance_id}/approvals/{id}', data, options);
    }

    getAllContractTypes(data: any, options?: IApiRequestOptions): Observable<Response> {
        return this.request('get', '/contract-types', data, options);
    }
}
