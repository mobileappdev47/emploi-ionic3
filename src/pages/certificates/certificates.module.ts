import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgObjectPipesModule } from 'ngx-pipes';

import { NavigationModule } from '../../components/navigation';
import { CertificatesPage } from './certificates.page';
import { AllCertificatesPage } from './all.certificates.page';
import { TrainingDetailsPage } from './training.details.page';
import { CertificateCard } from './certificate.card';
import { CertificatesService } from './certificates.service';
import { FilesModule } from '../../components/files/files.module';
import { NotifyModule } from '../../components/notify';
import { FilterModule } from '../../components/filter';

const Components = [
    CertificatesPage,
    AllCertificatesPage,
    TrainingDetailsPage,
    CertificateCard,
];

@NgModule({
    declarations: Components,
    entryComponents: Components,
    exports: Components,
    imports: [
        IonicPageModule.forChild(CertificatesPage),
        TranslateModule,
        NgObjectPipesModule,
        NavigationModule,
        FilesModule,
        NotifyModule,
        FilterModule
    ],
    providers: [
        CertificatesService,
    ],
})
export class CertificatesModule { }
