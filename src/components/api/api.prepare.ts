import * as moment from 'moment';
import { apiFormats } from './api.config';

/**
 *
 */
export class ApiPrepare {

    /**
     * Transform given datetime (local) to utc formatted
     */
    static datetime(datetime?: Date): string {
        return datetime && moment(datetime || new Date()).utc().format(apiFormats.prepare.datetime) || undefined;
    }
}
