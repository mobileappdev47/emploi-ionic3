import { Injectable } from '@angular/core';
import { FileTransfer, /* FileUploadOptions, */ FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { ResponseContentType } from '@angular/http';

import { NewApiService, ApiAuthService } from '../../components/api';
import { IFileMeta, FileKind, FileProgressCallback } from './index';

export interface IPictureObject {
    url: () => string;
    revoke: () => void;
}

interface IUrlSimple {
    createObjectURL: (object: any) => string;
    revokeObjectURL: (url: any) => void;
}

/**
 * Files operation service
 */
@Injectable()
export class FilesService {

    private worker: IUrlSimple = window.URL || URL;

    constructor(private api: NewApiService, private auth: ApiAuthService, private transfer: FileTransfer, private file: File, private opener: FileOpener) {
    }

    /**
     * Downloads file in user auth context
     *
     * @param source File info
     * @param kind File kind (determines endpoint); default: document
     * @param onProgress Optional callback method getting IFileProgress while downloading
     *
     * @returns Downloaded file location
     */
    download(source: IFileMeta, kind: FileKind = FileKind.Document, onProgress?: FileProgressCallback): Promise<any> {
        const url: string = this.url(kind, source);
        const file: FileTransferObject = this.transfer.create();

        // get auth header
        return this.auth.getHeader().then((header) => {
            const options = {
                headers: Object.assign(header, {
                    'Content-Type': source.mime,
                }),
            };
            // register progress handler
            if (onProgress) {
                file.onProgress((progress) => onProgress(this.transferred(progress)));
            }
            // then download
            return file.download(url, this.file.dataDirectory + source.original_filename, false, options).then((entry) => entry.toURL());
        });
    }

    /**
     * Uploads file in user auth context
     *
     * @param source File storage uri
     * @param kind File kind (determines endpoint); default: document
     * @param onProgress Optional callback method getting IFileProgress while downloading
     *
     * @returns Uploaded file meta data
     */
    upload(source: string, kind: FileKind = FileKind.Document, onProgress?: FileProgressCallback): Promise<any> {
        const url: string = this.url(kind);
        const file: FileTransferObject = this.transfer.create();

        // get auth header
        return this.auth.getHeader().then((header) => {
            const options = {
                fileKey: 'file',
                fileName: source.split('/').pop(),
                headers: header,
            };
            // register progress handler
            if (onProgress) {
                file.onProgress((progress) => onProgress(this.transferred(progress)));
            }
            // then upload
            return file.upload(source, url, options).then(
                (data) => data && data.response && JSON.parse(data.response).data,
                () => {
                    file.abort();
                    return false;
                });
        });
    }

    /**
     * Opens file
     *
     * @param path
     * @param mime
     */
    open(path: string, mime: string): Promise<any> {
        return this.opener.open(path, mime);
    }

    /**
     * Fetches picture in user auth context and return object within
     * - url() - gets blob url
     * - revoke() - revokes picture data
     */
    fetchPicture(id: string | number, size: string = 'medium', variant: string = 'square'): Promise<IPictureObject> {
        return this.api.getPicture({ id }, {
            params: { size, variant },
            responseType: ResponseContentType.Blob,
        })
        .map((res) =>
            new Blob([res.blob()], { type: 'image/png' }))
        .toPromise().then((res) => {
            const url = this.worker.createObjectURL(res);
            return {
                url: (): string => url,
                revoke: (): void => this.worker.revokeObjectURL(url),
            };
        });
    }

    /**
     * Returns api url per file kind
     */
    private url(kind: FileKind, data?: any): string {
        switch (kind) {
            case FileKind.Picture: return this.api.getPictureUrl(data);
            default: return this.api.getDocumentUrl(data);
        }
    }

    /**
     * Calculates transfer progress
     */
    private transferred(progress: ProgressEvent) {
        return progress.lengthComputable && {
            loaded: progress.loaded,
            total: progress.total,
            percent: progress.loaded * 100 / progress.total,
        };
    }
}
