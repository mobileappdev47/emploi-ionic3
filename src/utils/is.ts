/*
 * Utils class Is - checking if variable is something
 */

export class Is {

    /**
     * Returns true if src is array
     */
    static array(set: any) {
        return typeof set === 'object' && set.length !== undefined;
    }

    /**
     * Returns true if object is empty
     */
    static empty(set: {}): boolean {
        return !set || Object.keys(set).length === 0;
    }

    /**
     * Returns true if object is set (not empty)
     */
    static set(set: {}): boolean {
        return set && Object.keys(set).length > 0;
    }

    /**
     * Check if value is set to true (or string 'true')
     *
     * @param set
     */
    static true(set: string | boolean) {
        return set === 'true' || set === true;
    }

    /**
     * Check if value is set to false (or string 'false')
     *
     * @param set
     */
    static false(set: string | boolean) {
        return set === 'false' || set === false;
    }
}
