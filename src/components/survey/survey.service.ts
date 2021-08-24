import { Injectable } from '@angular/core';

import { Collection as collection } from '../../utils/collection';

import { ISurvey } from './survey.module';

/**
 *
 */
@Injectable()
export class SurveyService {

    /**
     * Transforms questionnaire data to internal survey model
     *
     * @param data
     * @param type
     */
    transform(data: any, type: string) {
        if (data[type]) {
            const instance = `${type}_instance`;
            data[type] = {
                id: data[type].id,
                questions: data[instance] && data[instance].instance || data[type].questionnaire || data[type] || [],
                instance: data[instance] && data[instance].id,
                approval: data[instance] && data[instance].approval && data[instance].approval.data,
                type,
            };
        }
    }

    /**
     * Prepares internal survey model to api survey instance data/request model
     *
     * @param data
     */
    prepare(data: ISurvey) {
        return {
            id: data.instance,
            type: data.type,
            instance: (data.questions || []).map((item: any) => collection.only(item, ['question', 'answer', 'type', 'comment']))
        };
    }
}
