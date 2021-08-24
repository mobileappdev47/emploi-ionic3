import { NgModule } from '@angular/core';
import { FilesizePipe } from './filesize/filesize';
import { ToCurrencyPipe } from './to-currency/to-currency';

@NgModule({
    declarations: [
        FilesizePipe,
        ToCurrencyPipe,
    ],
    exports: [
        FilesizePipe,
        ToCurrencyPipe,
    ],
})
export class PipesModule { }
