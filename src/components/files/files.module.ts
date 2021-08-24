import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { TranslateModule } from '@ngx-translate/core';

import { DocumentItem } from './document.item';
import { FilesService } from './files.service';
import { PictureLoadDirective } from './picture.load.directive';
import { FileUpload } from './file.upload';
import { ApprovalIcon } from './approval.icon';
import { ApprovalInfo } from './approval.info';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [
        IonicPageModule,
        PipesModule,
        TranslateModule,
    ],
    declarations: [
        DocumentItem,
        PictureLoadDirective,
        FileUpload,
        ApprovalIcon,
        ApprovalInfo,
    ],
    exports: [
        DocumentItem,
        PictureLoadDirective,
        FileUpload,
        ApprovalIcon,
        ApprovalInfo,
    ],
    providers: [
        FilesService,
        FileTransfer,
        File,
        FileOpener,
    ],
})
export class FilesModule { }
