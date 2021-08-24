import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 */
@Pipe({
    name: 'filesize',
})
export class FilesizePipe implements PipeTransform {
    /**
     *
     */
    transform(value: string | number, precision: number = 2) {
        const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let res = Number(value);
        let i = 0;

        while (res >= 1000) {
            res /= 1000;
            i++;
        }
        return res.toFixed(precision).toLocaleString() + units[i];
    }
}
