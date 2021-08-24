/*
 * Utils class checklist - f.e. working as checklist model for checkboxes
 */

interface ISet {
    [key: string]: boolean;
}

export class Checklist {

    /**
     * Prepares collection of property values from array as an object keys within boolean valye (false initially); property 'id' by default
     *
     * @param src Source array
     * @param property Property to be key value
     *
     * @example
     * const src = [{id: 100}, {id: 222}];
     * const coll = collection.prepare(src);
     * // coll === {100: false, 222: false};
     */
    static prepare(src: any[], property: string = 'id'): ISet {
        const items = {};
        src.map((item: any) => items[item[property]] = false);
        return items;
    }

    /**
     * Returns all set (to true) keys as array
     */
    static selected(set: ISet): any[] {
        return Object.keys(set).filter((item) => set[item]);
    }

    /**
     * Sets all "selections" in collection
     */
    static set(set: ISet) {
        Object.keys(set).forEach((item) => set[item] = true);
    }

    /**
     * Resets all "selections" in collection
     */
    static reset(set: ISet) {
        Object.keys(set).forEach((item) => set[item] = false);
    }
}
