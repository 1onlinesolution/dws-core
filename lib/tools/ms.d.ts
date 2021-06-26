/**
 * Helpers.
 */
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */
declare function format(val: string | number, options: {
    long: boolean;
}): string | number;
export default format;
//# sourceMappingURL=ms.d.ts.map