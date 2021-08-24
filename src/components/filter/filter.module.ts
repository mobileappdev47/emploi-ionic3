import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgObjectPipesModule } from 'ngx-pipes';

import { DetailsModule } from '../details';

import { FilterBar } from './filter.bar';
import { FilterSearch } from './filter.search';
import { FilterDateRange } from './filter.date.range';
import { FilterRange } from './filter.range';
import { FilterSelect } from './filter.select';
import { FilterButtons } from './filter.buttons';

export interface IFilterBarItems {
    [key: string]: {
        type: string;
        set: any;
        options?: any[] | string;
        none?: boolean;
    };
}

@NgModule({
    declarations: [
        FilterBar,
        FilterSearch,
        FilterRange,
        FilterSelect,
        FilterButtons,
        FilterDateRange
    ],
    imports: [
        NgObjectPipesModule,
        IonicPageModule,
        TranslateModule,
        DetailsModule
    ],
    exports: [
        FilterBar
    ],
    providers: [],
})
export class FilterModule { }
