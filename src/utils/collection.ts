import * as moment from 'moment';

import { Is } from './is';

/*
 * Utils class collection - offers also some array of objects helpers, like pluck
 */

interface IData {
    [key: string]: { data?: any[] } | any;
}

export function isObject(x: any): boolean {
    return x !== null && typeof x === 'object';
}

export function isDefined(x: any): boolean {
    return x !== undefined;
}

export class Collection {

    /**
     * "Plucks" property values of given property
     * Can concat all its inner data by passing concat property (typically to get .data of includes)
     */
    static pluck(src: any[], property: string, concat?: string): any[] {
        const result = src && src.map((item: any) => item[property]) || [];
        return (concat && result.reduce((res: any[], item: { data: any }) => res.concat(item.data), [])) || result;
    }

    /**
     * Returns all ids from objects in src array
     */
    static ids(src: any[]) {
        return Collection.pluck(src, 'id');
    }

    /**
     * Extracts data from given include path (nested data property)
     *
     * @param {object} src Source object
     * @param {string} path Includes path (dot notation)
     * @returns {any}
     *
     * @example
     * var resp = {project: {data: {job: {data: {assignment: {data: 'some'}}}}}};
     * var test = collection.extract(resp, 'project.job.assignment'); // returns 'some'
     */
    static extract(src: IData[], path: string): any[] | any {
        return path.split(/\./).reduce((prev: any, prop: string) => {
            return prev && ((prev[prop] && prev[prop].data) || prev[prop]);
        }, src);
    }

    /**
     * Transforms array of items into key:value object
     *
     * @param set
     * @param key Property name used as a key
     * @param prefix key prefix, could be used to ensure object key ordering of numbered keys
     * @param value Property name to get value (whole object if not defined)
     * @param transform Property name to get value (whole object if not defined)
     *
     */
    static objectize(set: any[], key: string, prefix?: string, value?: string, transform?: (val: any, prop?: string) => any): any {
        const result: any = {};
        const trans = (val: any) => val && (transform ? transform(val) : val);

        (set || []).forEach((item) => {
            if (undefined === result[item[key]]) {
                result[(prefix || '') + item[key]] = trans(value ? item[value] : item);
            }
        });
        return set && result;
    }

    /**
     * "Flatify" data from given include paths
     *
     * @param {object} src Source object
     * @param {string} props Includes path(s) (dot notation), or mapping config
     * @returns {any}
     *
     * @example
     * var resp = {project: {data: {job: {data: {assignment: {data: 'some'}}}}}};
     * collection.flatify(resp, 'project.job.assignment'); // returns {assignment: 'some'}
     * collection.extract(resp, ['project.job', 'project.job.assignment']); // returns {project: ..., job: ..., assignment: 'some'}
     * collection.extract(resp, {other: 'project.job.assignment'}); // returns {project: ..., other: 'some'}
     */
    static flatify(src: IData, props: string | string[] | any): any {
        let extracted = {};
        const paths = (Is.array(props) || !props.length) && props || [props];

        // extract property => path map; use direct mapping if given
        if (paths.length) {
            paths.forEach((path: string) => extracted[path.split('.').pop()] = path);
        } else {
            extracted = props;
        }
        // then extract for each key
        Object.keys(extracted).forEach((key) => {
            extracted[key] = Collection.extract(src as any, extracted[key]);
        });

        return extracted;
    }

    /**
     * Returns copied src
     */
    static copy(src: any): any {
        return src && JSON.parse(JSON.stringify(src));
    }

    /**
     * Returns intersection of 2 arrays
     */
    static intersect(a: any[], b: any[]): any[] {
        return a.filter((n) => b.indexOf(n) !== -1);
    }

    /**
     * Returns diff of 2 arrays
     */
    static diff(a: any[], b: any[]): any[] {
        return a.filter((n) => b.indexOf(n) < 0).concat(b.filter((n) => a.indexOf(n) < 0));
    }

    /**
     * Returns unique values
     *
     * @param prop Optional property name to determine identity (like id)
     */
    static unique(src: any[], prop?: string): any[] {
        return prop ? Object.values(Collection.objectize(src, prop, '_')) : Array.from(new Set(src));
    }

    /**
     * Finds object in array matching given properties.
     * Within no multi flag it will return single object (default)
     *
     * Note: Matches explicitly values
     */
    static find(src: any[], props: any, multi?: boolean): any {
        const res: any[] = [];
        const check = Object.keys(props);
        src.forEach((item) => {
            let matched = 0;
            check.forEach((prop) => item[prop] === props[prop] && matched++);
            if (matched === check.length) {
                res.push(item);
            }
        });

        return multi ? res : res[0];
    }

    /**
     * Returns only properties for src (or its data part)
     *
     * @param src
     * @param properties
     * @param transform Optional transform method (applied if property found)
     * @returns {object}
     */
    static only(src: any, properties: string[], transform?: (val: any, prop?: string) => any) {
        const dst: any = {};
        const trans = (val: any, prop: string) => val && (transform ? transform(val, prop) : val);

        properties.forEach((key) => {
            dst[key] = src && trans(src[key] || src.data && src.data[key], key);
        });

        return dst;
    }

    /**
     * Sums all values of given property (parsed float; result rounded to 2 digits)
     *
     * @param  src Collection or object with .data collection
     * @param property
     */
    static sum(src: any, property: string): number {
        return (src.data || src || []).reduce((acc: number, val: any) => {
            return acc + (parseFloat(val[property] || 0) * 100);
        }, 0) / 100;
    }

    /**
     * Transforms given object properties values to date object.
     * Assumes given string is UTC
     *
     * @param set Object or value
     * @param properties Property names to transform (optional, will do for all if not provided)
     * @returns Transformed object
     */
    static datify(set: any, properties: string[]): Date {
        return Collection.transform(set, properties, Collection.toDate);
    }

    /**
     * Transforms given object properties values to string.
     *
     *
     * @param set Object or value
     * @param properties Property names to transform (optional, will do for all if not provided)
     * @param all If to process undefined also
     * @returns Transformed object
     */
    static stringify(set: any, properties: string[], all: boolean = true): any  {
        return Collection.transform(set, properties, Collection.toString, all);
    }

    /**
     * Transforms given object properties values to boolean.
     *
     *
     * @param set Object or value
     * @param properties Property names to transform (optional, will do for all if not provided)
     * @param all If to process undefined also
     * @returns Transformed object
     */
    static boolify(set: any, properties: string[], all: boolean = true): any  {
        return Collection.transform(set, properties, Collection.toBool, all);
    }

    /**
     * Merges items from src collection into dest (by property field)
     *
     * @param dest
     * @param src
     * @param property
     */
    static merge(dest: any[], src: any[], property: string = 'id') {
        const find: any = {};
        src.forEach((item) => {
            find[property] = item[property];
            Object.assign(Collection.find(dest, find), item);
        });
    }

    /**
     * Internal. Transforms given object properties values by callback
     *
     * @param set
     * @param properties
     * @param callback
     * @param all
     * @returns Transformed object
     */
    private static transform(set: any, properties: string[], callback: (a: any) => any, all: boolean = false): any {
        if (!properties && !isObject(set)) {
            set = callback(set);
        } else {
            (properties || Object.keys(set)).map((prop) => {
                if (set && (all || !all && isDefined(set[prop]))) {
                    set[prop] = callback(set[prop]);
                }
                return prop;
            });
        }
        return set;
    }

    /**
     * Parses to date from UTC to local time
     *
     * @param val Date string (or object {date:...})
     * @returns Date
     */
    private static toDate(val: string | any): Date {
        return val && moment.utc(val.date || val).toDate();
    }

    /**
     * Parses to bool value
     *
     * @param val
     */
    private static toBool(val: string | any): boolean {
        return Boolean(val && val !== 'false');
    }

    /**
     * Converts to string value
     *
     * @param val
     */
    private static toString(val: any): string {
        return String(val);
    }
}
