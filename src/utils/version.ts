/*
 * Utils class Version
 */

export class Version {

    /**
     * Returns number representation of string version (maj * 10000 + min * 100 + patch)
     */
    static calculate(version: string): number {
        const multipliers: number[] = [10000, 100, 1];
        return String(version).split('.').reduce((sum, part, idx) => {
            return sum + multipliers[idx] * parseInt(part, 10);
        }, 0);
    }
}
