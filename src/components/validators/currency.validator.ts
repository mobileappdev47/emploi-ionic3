import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

const pattern = /^[+-]?([0]|[1-9][0-9]{0,9}([\\.,]{1}[0-9]{1,2})?|[0][\\.,]{1}[0-9]{1,2})$/;
const error = { currency: true };

export function validateCurrency(input: FormControl) {
    return (input.value === null || input.value === '') || String(input.value).length && pattern.test(input.value) ? null : error;
}

@Directive({
    selector: '[validateCurrency][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateCurrency, multi: true },
    ]
})
export class CurrencyValidator {}
