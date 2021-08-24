import * as moment from 'moment';

import { appFormats } from '../app/app.config';

/*
 * Utils class Format
 */

export class Format {

    /**
     * Returns datetime formatted (configured in the app)
     */
    static datetime(value: Date | string): string {
        return moment(value).local().format(appFormats.transform.datetime);
    }

    /**
     * Returns date formatted (configured in the app)
     */
    static date(value: Date | string): string {
        return moment(value).local().format(appFormats.transform.date);
    }

    /**
     * Returns formatted number (fixed 2 decimals and comma separator)
     */
    static numbers(value: any): string {
        const val: number = typeof value === 'string' ? Number(value.replace(/,/g, '.').replace(/ /g, '')) : value;
        return val.toFixed(2).replace('.', ',');
    }
}
