import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Collection as collection } from '../../utils/collection';

import { ISurvey, SurveyType, ISurveyQuestion } from './survey.module';

/**
 * @name SurveyPage
 * @description
 * A SurveyPage is a ionic modal page to display survey data.
 *
 * @note Service has transform/prepare adapted to feedback/questionnaire datamodel.
 *
 * @usage
 * ```ts
 * import { DetailsController } from '../components/details';
 * import { SurveyPage, SurveyService, SurveyType } from '../components/survey';
 *
 * constructor(private modal: DetailsController, private surveys: SurveyService) {
 * }
 *
 * someAction() {
 *     const data = {
 *         questionnaire: { id: 1, questionnaire: [{question: ...}] },
 *         questionnaire_instance: { id: 1, instance: [{question: ...}] },
 *         feedback: [{question: ...}],
 *         feedback_instance: { id: 1, instance: [{question: ...}] },
 *     };
 *     // to transform api data to internal survey model - expecting as above
 *     const questionnaire = this.surveys.transform(quest, SurveyType.Questionnaire);
 *     const modal: Modal = this.modal.open(SurveyPage, {
 *           // definition with survey id, questions, instance (if already exists)
 *           instance: questionnaire,
 *           // save handler getting filled in data - returning promise - once resolved will dismiss the survey page
 *           save: (data: ISurvey) => this.someHandler(data),
 *       });
 *   // then on dismiss (called with save handler response) some operation available
 *   modal.onDidDismiss((instance) => doSomething());
 * }
 *
 * someHandler(data: ISurvey): Promise<any> {
 *     // to prepare internal survey model to api one
 *     const params = this.surveys.prepare(data);
 *     // ... call api method
 * }
 *
 */

@Component({
    selector: 'page-survey',
    templateUrl: 'survey.page.html',
})

export class SurveyPage {

    processing: boolean;
    instance: ISurvey;
    save: (data: ISurvey) => Promise<any>;

    constructor(public navigation: NavController, public view: ViewController, private translate: TranslateService, private params: NavParams) {
        // get params
        this.instance = collection.copy(this.params.get('instance'));
        this.save = this.params.get('save');
    }

    onSubmit() {
        this.processing = true;
        this.save(this.instance)
            .then(() => this.view.dismiss(this.instance))
            .finally(() => this.processing = false);
    }

    disagreeCommentRequired(question: ISurveyQuestion) {
        return this.instance.type === SurveyType.Questionnaire && (question.answer === 'false' || question.answer === false);
    }

    answersDone() {
        return this.instance.questions.filter((q) => q.answer !== undefined && q.answer !== '').length === this.instance.questions.length;
    }

    disagreeCommentsDone() {
        return this.instance.type === SurveyType.Questionnaire ?
            this.instance.questions.filter((q) => (q.answer === false || q.answer === 'false') && !q.comment).length === 0 :
            undefined;
    }
}
