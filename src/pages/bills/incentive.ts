/**
 * @name
 * Incentive
 *
 * @description
 * Helper class with incentive related functionality
 *
 */

export class Incentive {

    /**
     * Returns all allowed incentive identifiers
     */
    static types() {
        return Object.keys(Incentive.allowed);
    }

    /**
     * Transforms property based value into object with name and value
     */
    static transform(value: any, name: string) {
        return { name, value };
    }

    // Allowed/handled incentive types with check fulfill definition (method getting assignment, tbc)
    private static allowed: { [key: string]: (assignment: any) => boolean } = {
        checkin: () => true,
        picture_documentation: () => true,
        sales_report: () => true,
    };
}
