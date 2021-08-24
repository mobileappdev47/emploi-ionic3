import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Config, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NotifyController } from '../../components/notify';
import { FilesService, IPictureObject } from '../../components/files';
import { LoadingController, Loading } from '../../components/loading';
import { ExamInstructionsPage } from '../exam/exam.instructions.page';
import { DetailsController } from '../../components/details';

import { CertificatesService } from './certificates.service';

@Component({
    selector: 'page-training-details',
    templateUrl: 'training.details.page.html',
})

export class TrainingDetailsPage implements OnDestroy {

    @ViewChild('content') content: ElementRef;

    certificate: any;
    training: any;
    passed: boolean = false;
    private examId: any;
    private fetching: Loading;
    private pictures: IPictureObject[] = [];

    constructor(private config: Config, private certificates: CertificatesService, private details: DetailsController, private sanitizer: DomSanitizer,
                private params: NavParams, private files: FilesService, private loading: LoadingController, private notify: NotifyController,
                private iab: InAppBrowser) {

        this.passed = this.params.get('passed');
        this.fetching = this.loading.create('common.fetching-data');
        this.fetching.present();
        this.certificates.get(this.params.get('id')).then((result) => {
            this.certificate = result;
            this.training = Object.assign(result.training.data, {
                content: this.sanitizer.bypassSecurityTrustHtml(this.wrapContent(result.training.data.content)),
            });
            this.examId = result.exam.data.id;
            this.loading.hide(this.fetching);
        });
    }

    /**
     * Opens exam
     */
    startExam() {
        return this.details.open(ExamInstructionsPage, { id: this.examId });
    }

    ngOnDestroy() {
        this.pictures.map((picture) => picture.revoke());
        this.pictures.length = 0;
    }

    /**
     * Wraps content html within replaced platform specific
     */
    private wrapContent(content: string) {
        return content
            .replace(/(<a.+>.+?<\/a>)/gm, this.wrapButton.bind(this))
            .replace(/href="\/documents\/([0-9]+)" download="(.+?)\.([a-z]+?)"/gm, this.wrapDocument.bind(this))
            .replace(/href=["\'](?!\/documents\/)([^"\'\s>]+)["\']/gm, this.wrapExternalLink.bind(this))
            .replace(/<img (.*?)src="\/pictures\/([0-9]+)\/.+?"(.*?)>/g, this.wrapImage.bind(this));
    }

    /**
     * Wraps button with platform styling
     */
    private wrapButton(matched: string, ...matches: string[]) {
        const style = this.config.get('mode');

        return `
            <button class="disable-hover button button-${style} button-clear button-clear-${style} button-full button-full-${style}">
              <span class="button-inner">${matches[0]}</span>
              <div class="button-effect"></div>
            </button>
        `;
    }

    private wrapDocument(matched: string, ...matches: string[]) {
        const docId = `doc-${matches[0]}`;
        setTimeout(() => {
            const doc = document.getElementById(docId) as HTMLAnchorElement;
            if (doc) {
                doc.addEventListener('click', () => {
                    const mime = `application/${matches[2]}`;
                    const filename = `${matches[1]}.${matches[2]}`.replace(/%[0-9]{1,2}|\s/g, '_');
                    const params = { id: +matches[0], original_filename: filename, mime };
                    this.fetching = this.loading.create('common.fetching-data', false);
                    this.fetching.present();
                    this.files.download(params)
                        .then((path) => this.files.open(path, mime))
                        .catch(() => this.notify.present('errors.download-failed'))
                        .finally(() => this.loading.hide(this.fetching));
                });
            }
        });
        return `id="${docId}"`;
    }

    private wrapExternalLink(matched: string, ...matches: string[]) {
        const anchorId = `anc-${matches[1]}`;
        setTimeout(() => {
            const anchor = document.getElementById(anchorId) as HTMLAnchorElement;
            if (anchor) {
                anchor.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.iab.create(encodeURI(matches[0]));
                });
            }
        });
        return `href="#" id="${anchorId}"`;
    }

    /**
     * Wraps images within fetching in authorized context
     */
    private wrapImage(matched: string, ...matches: string[]) {
        const picId = `pic-${matches[1]}`;
        // fetches image and sets blob url as src
        this.files.fetchPicture(matches[1]).then((picture: IPictureObject) => {
            const url = picture.url();
            const img = document.getElementById(picId) as HTMLImageElement;
            if (img) {
                img.src = url;
            }
            this.pictures.push(picture);
        });

        return `
            <img id="${picId}"${matches[2]}>
        `;
    }
}
