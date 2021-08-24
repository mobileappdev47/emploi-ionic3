import { Injectable } from '@angular/core';

import { NewApiService, IApiRequestOptions } from '../../components/api';

/**
 *
 */
@Injectable()
export class ExamService {

    constructor(private api: NewApiService) {
    }

    /**
     * Gets exam object
     *
     * @param examId
     */
    get(examId: number): Promise<any> {
        const options: IApiRequestOptions = {
            includes: ['exam', 'exam.questions', 'exam.questions.answers', 'exam.certificate.training']
        };
        return this.api.promised(this.api.getExam({ id: examId }, options)).then((data) => {
            return this.transform(data);
        });
    }

    /**
     * Submits the exam instance
     *
     * @param instanceId Exam instance id
     * @param answers
     *
     */
    submitTest(instanceId: number, answers: number[]): Promise<any> {
        return this.api.promised(this.api.submitTest({ exam_instance_id: instanceId, answers }));
    }

    /**
     * Transforms exam data
     */
    private transform(data: any) {
        const exam = data.exam.data;
        return Object.assign(data, {
            exam,
            questions: exam.questions.data.map((item: any) => {
                return {
                    text: item.question,
                    answers: item.answers.data,
                };
            })
        });
    }
}
