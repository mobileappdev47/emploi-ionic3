import * as moment from 'moment';
import { apiFormats } from './api.config';

/**
 *
 */
export class ApiTransform {

    /**
     * Transforms given utc hours to local hours (string HH:MI)
     */
    static time(time: string): string {
        return moment.utc(time, apiFormats.prepare.time).local().format(apiFormats.transform.time);
    }

    /**
     * Transform given day (utc) to local date
     */
    static date(day: string): Date {
        return moment.utc(day).toDate();
    }

    /**
     * Transform given datetime (utc) to local date
     * Sets given hours (HH:mm) if set (to transform utc day start + string hours - see appointed_at datamodel)
     */
    static datetime(datetime: string | Date, hours?: string): Date {
        const add: { hours?: number, minutes?: number } = {};
        // fix issue with summer/wintertime (PFY-4293)
        const local = moment.utc(datetime, apiFormats.prepare.datetime).toDate();
        if (hours) {
            const parts = hours.split(':');
            add.hours = +parts[0];
            add.minutes = +parts[1];
            return moment(local).hours(add.hours).minutes(add.minutes).toDate();
        }
        return local;
    }
}
