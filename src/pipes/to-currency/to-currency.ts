import { Pipe, PipeTransform } from '@angular/core';
import { Format as format } from '../../utils/format';

/**
 * Generated class for the ToCurrencyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'toCurrency',
})
export class ToCurrencyPipe implements PipeTransform {
    /**
     * Takes a value and transforms it to german currency formatted string.
     */
    transform(value: string | number, ...args) {
        const retNumber = Number(value);
        return isNaN(retNumber) ? value : format.numbers(value) + '€' || '';
    }
}
