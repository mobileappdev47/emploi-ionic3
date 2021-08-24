import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RatingModule } from 'ngx-rating';

import { NavigationModule } from '../../components/navigation';
import { FilesModule } from '../../components/files';
import { ProfileService } from './profile.service';
import { ProfilePage } from './profile.page';

@NgModule({
    declarations: [
        ProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        TranslateModule,
        RatingModule,
        NavigationModule,
        FilesModule,
    ],
    exports: [
        ProfilePage,
    ],
    providers: [
        ProfileService,
    ],
})
export class ProfileModule { }
