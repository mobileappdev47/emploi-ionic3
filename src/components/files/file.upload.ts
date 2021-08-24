import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { ActionSheetController, Platform, normalizeURL } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FilesService } from './files.service';
import { FileKind, IFileProgress } from './index';
import { NotifyController } from "../notify";
import { noop } from 'rxjs/util/noop';

/**
 * Directive renders button with given label to upload file (of given type).
 * Emits uploaded event with uploaded document meta info.
 * Can by styled outline within button 'optional' property.
 *
 * @example
 * <file-upload [type]="document" [label]="some.trans.ident" (uploaded)="onUpload(file)" [disabled]="true" [button]="optional">
 */
@Component({
    selector: 'file-upload',
    templateUrl: 'file.upload.html',
})
export class FileUpload implements OnInit {
    @Input('type') fileKind: string;
    @Input() disabled: boolean;
    @Input() label: string = 'files.upload.select.button';
    @Input() button: string = 'primary';
    @Output() uploaded: EventEmitter<any> = new EventEmitter();

    type: FileKind;
    permissions: boolean = true;
    uploading: boolean;
    progress: string = '';
    private win: any = window;

    constructor(private zone: NgZone, private files: FilesService, private platform: Platform, private actions: ActionSheetController,
                private picker: ImagePicker, private camera: Camera, private translate: TranslateService,
                private notify: NotifyController) {
        this.picker.hasReadPermission().then((permitted) => {
            if (permitted) {
                this.permissions = false;
            }
        });
    }

    ngOnInit() {
        this.type = 'picture' === this.fileKind && FileKind.Picture || FileKind.Document;
    }

    select() {
        this.choose().then((file) => {
            if (file) {
                this.progress = '0';
                this.uploading = true;
                this.files.upload(file, this.type, (t) => this.onProgress(t)).then((meta) => {
                    if (meta) {
                        this.uploaded.emit(meta);
                    } else {
                        this.notify.present('errors.upload-failed');
                    }
                    this.uploading = false;
                });
            }
        }, noop);
    }

    choose(): Promise<any> {
        return new Promise((resolve, reject) =>
            this.actions.create({
                title: this.trans('select.title'),
                subTitle: !this.permissions && this.trans('select.warning'),
                buttons: [{
                    text: this.trans('select.localstorage'),
                    icon: 'image',
                    handler: () => this.onSelectPicture(resolve, reject),
                }, {
                    text: this.trans('select.camera'),
                    icon: 'camera',
                    handler: () => this.onSelectCamera(resolve, reject),
                }, {
                    text: this.translate.instant('buttons.cancel'),
                    role: 'cancel',
                    handler: () => reject(),
                }],
            }).present()
        );
    }

    /**
     * Select picture handler
     */
    onSelectPicture(resolve, reject) {
        const options: ImagePickerOptions = {
            maximumImagesCount: 1,
        };

        return this.picker.getPictures(options).then((files) => {
            if (files && files !== 'OK' && files[0]) {
                // update flag on success select - to not show warning next time
                this.permissions = true;
                resolve(this.localFilePath(files[0]));
            } else {
                // omit permission dialog
                resolve(files && files === 'OK');
            }
        }, () => reject);
    }

    /**
     * Select camera handler
     */
    onSelectCamera(resolve, reject) {
        const options: CameraOptions = {
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            quality: 95
        };

        this.camera.getPicture(options).then((uri) => {
            resolve(this.localFilePath(uri));
        }, () => reject);
    }

    /**
     * On download progress handler
     */
    onProgress(transfered: IFileProgress) {
        if (transfered) {
            this.zone.run(() => this.progress = transfered.percent.toFixed(0));
        }
    }

    /**
     * Translates string with prefix
     */
    private trans(identifier: string, values?: any): string {
        return this.translate.instant('files.upload.' + identifier, values);
    }

    /**
     * converts filepath for wkwebview usage on ios
     *
     * @param path
     */
    private localFilePath (path: string): string {
        if (this.platform.is('ios')) {
            path = this.win.Ionic.WebView.convertFileSrc(path);
            path = path.replace('_app_file_/','');
        } else {
            path = normalizeURL(path);
        }
        return path;
    }
}
