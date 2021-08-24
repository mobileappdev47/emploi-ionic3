import { Injectable } from '@angular/core';

import { Collection as collection } from '../../utils/collection';

import { NewApiService } from './api.service';

/**
 *
 */
@Injectable()
export class ApiUserService {

    private fetching: any;
    private data: any;
    private instance: any;
    private authenticated: () => Promise<boolean>;

    constructor(private api: NewApiService) {
    }

    current(): Promise<IApiUser | null> {
        if (this.fetching) {
            return this.fetching;
        } else if (this.data) {
            return Promise.resolve(this.instance);
        } else {
            return this.authenticated().then(() => {
                this.fetching = this.api.promised(this.api.getCurrentUser()).then((data) => {
                    this.data = data;
                    this.instance = this.user();
                    this.fetching = null;
                    return this.instance;
                }, () => {
                    this.fetching = null;
                    return Promise.reject(false);
                });
                return this.fetching;
            }, () => this.fetching = null);
        }
    }

    get(): IApiUser {
        return this.instance;
    }

    reset(): void {
        this.data = null;
        this.instance = null;
    }

    setAuthenticatedCheck(callback: () => Promise<boolean>) {
        this.authenticated = callback;
    }

    /**
     * Checks user's access to resources - currently only assignments, jobs, bills are checked and blocked
     * return false if user is onboarding
     */
    private hasAccess(resource: string) {
        switch (resource) {
            case 'assignments':
            case 'jobs':
            case 'certificates':
            case 'bills': {
                return this.data && this.data.status !== 'onboarding';
            }
            default: {
                return true;
            }
        }
    }

    private isRestricted(identifier: string) {
        return (this.data.legal_blocked && this.data.legal_blocked[identifier] && 'legal-blocked')
            || (this.data.gtc_blocked && this.data.gtc_blocked[identifier] && 'gtc_blocked')
            || (this.data.contract_type_pending && this.data.contract_type_pending[identifier] && 'pending');
    }

    private user(): IApiUser {
        const data = collection.copy(this.data);
        return {
            id:             () => data.id,
            roleId:         () => data.role_id,
            name:           () => data.firstname,
            email:          () => data.email,
            isOnboarding:   () => data.status === 'onboarding',
            isDeactivated:  () => data.status === 'deactivated',
            isRestricted:   (identifier: string) => this.isRestricted(identifier),
            data:           () => data,
            hasAccess:      (resource: string) => this.hasAccess(resource),
        };
    }
}

export interface IApiUser {
    id(): number;
    roleId(): number;
    name(): string;
    email(): string;
    isOnboarding(): boolean;
    isDeactivated(): boolean;
    isRestricted(identifier: string): string;
    data(): any;
    hasAccess(resource: string): boolean;
}
