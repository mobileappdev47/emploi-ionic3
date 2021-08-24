import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NavigationModule } from '../navigation';
import { ValidatorsModule } from '../validators';

import { SurveyService } from './survey.service';
import { SurveyPage } from './survey.page';

export interface ISurveyQuestion {
    question: string;
    type: string;
    answer?: string | boolean;
    comment?: string;
}

export interface ISurvey {
    id?: number;
    questions?: ISurveyQuestion[];
    instance?: number;
    type?: string;
    comment?: string;
    approval?: { comment: string, id: number };
}

export const SurveyType = {
    Questionnaire: 'questionnaire',
    Feedback: 'feedback',
};

const Components = [
    SurveyPage,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(SurveyPage),
        TranslateModule,
        NavigationModule,
        ValidatorsModule,
    ],
    providers: [
        SurveyService,
    ],
})

export class SurveyModule { }
