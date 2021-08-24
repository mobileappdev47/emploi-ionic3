import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ExamMainPage } from './exam.main.page';

@Component({
    templateUrl: 'exam.instructions.page.html',
})
export class ExamInstructionsPage {
    private examId: any;

    constructor(private params: NavParams, private navigation: NavController) {
        this.examId = this.params.get('id');
    }

    startExam() {
        this.navigation.push(ExamMainPage, { id: this.examId });
    }
}
