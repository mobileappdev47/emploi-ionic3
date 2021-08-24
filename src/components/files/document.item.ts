import { ElementRef, EventEmitter, OnInit, isDevMode, NgZone, AfterViewInit } from '@angular/core';
import { Component, Input, HostListener, Output } from '@angular/core';
import { noop } from 'rxjs/util/noop';
import { NotifyController } from '../notify';
import { FilesService } from './files.service';
import { FileKind, IFileMeta, IFileProgress } from './index';

/**
 *
 */
@Component({
    selector: 'document-item',
    templateUrl: 'document.item.html',
})
export class DocumentItem implements OnInit, AfterViewInit {
    @Input() document: IFileMeta;
    @Input() info?: string;
    @Input() click?: any;
    @Output() remove: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();

    type: string;
    downloading: boolean;
    downloaded: string;
    action: string;

    icons: any = { edit: 'create', remove: 'trash' };

    constructor(private zone: NgZone, private files: FilesService, private notify: NotifyController, private ref: ElementRef) {
    }

    ngOnInit() {
        this.type = this.document && this.document.mime.split(/\//)[1];
    }

    ngAfterViewInit() {
        this.action = this.ref.nativeElement.getAttribute('action');
    }

    @HostListener('click') onClick() {
        switch (this.action) {
            case 'remove':
                this.remove.emit(this.document);
                break;
            case 'edit':
                this.edit.emit(this.document);
                break;
            default:
                noop();
        }
    }

    /**
     * Opens document (downloading first)
     */
    open(event: MouseEvent) {
        // to allow action if defined
        event.stopPropagation();
        // only if not downloading already
        if (!this.downloading) {
            this.downloaded = '0';
            this.downloading = true;
            this.files.download(this.document, FileKind.Document, (t) => this.onProgress(t)).then((path) => {
                // removes download indicator after a while
                setTimeout(() => {
                    this.downloaded = undefined;
                    this.downloading = false;
                }, 2000);
                // open file
                return this.files.open(path, this.document.mime);
            }).catch((error) => {
                if (isDevMode()) {
                    console.log('error', error); // tslint:disable-line no-console
                }
                this.downloaded = undefined;
                this.downloading = false;
                this.notify.present('errors.download-failed');
            });
        }
    }

    /**
     * On download progress handler
     */
    onProgress(transfered: IFileProgress) {
        if (transfered) {
            this.zone.run(() => this.downloaded = transfered.percent.toFixed(0));
        }
    }
}
