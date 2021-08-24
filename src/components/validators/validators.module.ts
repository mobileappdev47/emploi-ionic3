import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { CurrencyValidator } from './currency.validator';
import { SubmitValidator } from './submit.validator';

const Components = [
    CurrencyValidator,
    SubmitValidator,
];

@NgModule({
    declarations: Components,
    exports: Components,
    imports: [
        CommonModule,
    ],
    providers: [],
})

export class ValidatorsModule {}
