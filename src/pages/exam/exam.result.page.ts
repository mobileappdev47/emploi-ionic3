import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ExamMainPage } from './exam.main.page';

@Component({
    selector: 'page-exam-result',
    templateUrl: 'exam.result.page.html',
})

export class ExamResultPage {
    result: any;
    examId: any;

    constructor(private navigation: NavController, private params: NavParams) {
        this.result = this.params.get('result');
        this.examId = this.params.get('id');
    }

    percentage() {
        return ((this.result.questions_ok / this.result.questions) * 100).toFixed(0);
    }

    restartTest() {
        this.navigation.push(ExamMainPage, { id: this.examId });
    }

    backToTrainings() {
        this.navigation.popTo(this.navigation.getByIndex(0));
    }
}
