import { DocumentItem } from './document.item';
import { PictureLoadDirective } from './picture.load.directive';
import { FilesModule } from './files.module';
import { FilesService, IPictureObject } from './files.service';

export type FileProgressCallback = (arg: IFileProgress) => void;

export interface IFileMeta {
    id: number;
    mime: string;
    original_filename: string;
}

export interface IFileProgress {
    loaded?: number;
    total?: number;
    percent?: number;
}

export interface IApproval {
    updatedAt?: string;
    createdAt?: string;
    state: string;
    comment: string;
    creator?: { name: string };
    updator?: { name: string };
}

export enum FileKind {
    Document,
    Picture,
}

export { FilesModule, FilesService, IPictureObject, DocumentItem, PictureLoadDirective };
