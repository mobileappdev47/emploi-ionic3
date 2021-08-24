import { TranslateService } from '@ngx-translate/core';

import { appOptions } from '../app/app.config';

/*
 * Utils class Format
 */

export class Options {

    static options: any;

    /**
     * Returns config options by dotted path - from properties defined in appOptions
     *
     * @returns Array of id/name (translated by key + option)
     */
    static list(key: any, translate: TranslateService): string {
        if (!Options.options) {
            Options.options = Options.generate(appOptions);
        }
        return (Options.options[key] || []).map((opt: string) => ({
            id: opt,
            name: translate.instant(key + '.' + opt),
        }));
    }

    /**
     * Generates dot array flat list
     */
    private static generate(element: any, path?: string) {
        const o = {};
        path = (path && path + '.') || '';

        if (typeof element === 'object') {
            for (const key in element) {
                if (element.hasOwnProperty(key)) {
                    if (typeof element[key] === 'object' && !Array.isArray(element[key])) {
                        const temp = Options.generate(element[key], key);
                        for (const l in temp) {
                            if (temp.hasOwnProperty(l)) {
                                o[path + l] = temp[l];
                            }
                        }
                    } else {
                        o[path + key] = element[key];
                    }
                }
            }
        }
        return o;
    }
}
