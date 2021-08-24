import { NgModule } from '@angular/core';
import { DetailsController } from './details.controller';
import { ItemDetails } from './item.details';

@NgModule({
    declarations: [
        ItemDetails,
    ],
    exports: [
        ItemDetails,
    ],
    providers: [
        DetailsController,
    ],
})
export class DetailsModule { }
