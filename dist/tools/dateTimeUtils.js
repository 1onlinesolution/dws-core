"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtils = void 0;
const moment_1 = __importDefault(require("moment"));
const validity_1 = require("./validity");
// https://stackoverflow.com/a/6777470
// https://stackoverflow.com/a/14523953
class DateTimeUtils {
    static parse(dateAsString) {
        if (!validity_1.Validity.isValidString(dateAsString))
            throw new Error('invalid date');
        return new Date(Date.parse(dateAsString));
    }
    static dateToUTC(date) {
        if (!validity_1.Validity.isValidDate(date))
            throw new Error('invalid date');
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    }
    static currentUtcDate() {
        const date = new Date();
        return DateTimeUtils.dateToUTC(date);
    }
    static displayTimeFromNow(date) {
        if (!validity_1.Validity.isValidDate(date))
            throw new Error('invalid date');
        return moment_1.default(date).fromNow();
    }
}
exports.DateTimeUtils = DateTimeUtils;
//# sourceMappingURL=dateTimeUtils.js.map