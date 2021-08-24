import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Events, Content } from 'ionic-angular';

import { ConfirmController } from '../../components/confirm';
import { LoadingController, Loading } from '../../components/loading';
import { Checklist as checklist } from '../../utils/checklist';

import { ExamResultPage } from './exam.result.page';
import { ExamService } from './exam.service';

interface IExam {
    exam_instance_id: number;
    questions: [{
        answers: any[];
        text?: string;
    }];
    exam?: any;
}

@Component({
    selector: 'page-exam-main',
    templateUrl: 'exam.main.page.html',
})

export class ExamMainPage {

    @ViewChild('slides') slides: Slides;
    @ViewChild(Content) content: Content;

    loader: Loading;
    answers: any = {};
    instance: IExam;
    examId: number;

    constructor(public navigation: NavController, private exams: ExamService, private confirm: ConfirmController, private params: NavParams,
                private loading: LoadingController, private events: Events) {
        this.fetching(true);
        this.examId = this.params.get('id');
        this.exams.get(this.examId).then((data: any) => {
            this.instance = data;
            this.initAnswers();
            this.fetching(false);
        });
    }

    // inits checklist model
    initAnswers() {
        this.instance.questions.forEach((question) => {
            Object.assign(this.answers, checklist.prepare(question.answers));
        });
    }

    onSlideChanging() {
        this.content.scrollToTop();
    }

    submitAnswers() {
        this.confirm.create({
            context: 'exam',
            title: 'submit',
            confirm: true,
            cancel: true,
            cssClass: 'exam-info',
            onConfirm: () => {
                this.fetching(true);
                this.exams.submitTest(this.instance.exam_instance_id, checklist.selected(this.answers)).then((result: { passed: boolean }) => {
                    if (result.passed) {
                        this.events.publish('certificates:changed');
                    }
                    this.navigation.push(ExamResultPage, { id: this.examId, result });
                    this.fetching(false);
                });
            },
        }).present();
    }

    fetching(show: boolean) {
        if (show) {
            this.loader = this.loading.create('common.fetching-data', false);
            this.loader.present();
        } else if (this.loader) {
            this.loading.hide(this.loader);
        }
    }
}
