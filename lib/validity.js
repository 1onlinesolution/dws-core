"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validity {
    static isArray(obj) {
        return Validity.isDefined(obj) && Array.isArray(obj);
    }
    static isInteger(obj) {
        return Number.isInteger(obj);
    }
    static isDefined(obj) {
        return typeof obj !== 'undefined';
    }
    static isBoolean(obj) {
        return typeof obj === 'boolean';
    }
    static isObject(obj) {
        return typeof obj === 'object';
    }
    static isValidEmail(email) {
        if (typeof email !== 'string')
            return false;
        // https://stackoverflow.com/a/46181
        const regex = 
        // eslint-disable-next-line security/detect-unsafe-regex
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    }
    static isValidPassword(password) {
        if (typeof password !== 'string')
            return false;
        // https://stackoverflow.com/a/46181
        // eslint-disable-next-line no-useless-escape
        const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g;
        return regex.test(password);
    }
    static isValidCurrency(text, prefix = '') {
        if (typeof text !== 'string')
            return false;
        // eslint-disable-next-line security/detect-unsafe-regex
        const re = /^[$£€] ?(?=\(.*\)|[^()]*$)\(?\d{1,3}(,?\d{3})?(\.\d\d?)?\)?$/;
        if (prefix && prefix !== '')
            return re.test(text.replace(prefix, ''));
        return re.test(text);
    }
    static isValidDate(date) {
        return typeof date === 'object' && date instanceof Date;
    }
    static isValidNumber(value, min = Number.MIN_VALUE, max = Number.MAX_VALUE, exclude = []) {
        if (typeof value === 'undefined')
            return false;
        return !((min && +value < min) || (max && +value > max) || (exclude && exclude.length > 0 && exclude.includes(+value)));
    }
    static isValidInteger(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, exclude = []) {
        return Validity.isInteger(value) && Validity.isValidNumber(value, min, max, exclude);
    }
    static isValidString(text, min = 1, max = Number.MAX_SAFE_INTEGER) {
        if (typeof text !== 'string')
            return false;
        // min = 0 -> empty string is allowed
        // min = 1 -> empty string is not allowed
        return !(typeof text === 'undefined' || (min && text.length < min) || (max && text.length > max));
    }
    static isUndefinedOrEmptyString(text) {
        if (typeof text !== 'string')
            return false;
        return typeof text === 'undefined' || text === '';
    }
}
exports.default = Validity;
//# sourceMappingURL=validity.js.map