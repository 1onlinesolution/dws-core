"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const ms_1 = __importDefault(require("./ms"));
class Converter {
    static toBoolean(value, ifUndefinedSetToFalse = true) {
        // Javascript way
        // if (typeof value === 'undefined') return !ifUndefinedSetToFalse;
        // return Boolean(value); // (or !!value)
        if (typeof value === 'boolean') {
            return value;
        }
        else if (typeof value === 'undefined') {
            return !ifUndefinedSetToFalse;
        }
        else if (typeof value === 'string') {
            const trueValues = ['true', '1', 'on',];
            return trueValues.includes(value.toLowerCase());
        }
        else if (typeof value === 'number') {
            return !isNaN(value) && value !== 0;
        }
        return false;
    }
}
exports.Converter = Converter;
Converter.ms = (value, options = { long: false }) => ms_1.default(value, options);
Converter.toSeconds = (value, options = { long: false }) => {
    if (typeof value === 'string')
        return ms_1.default(value, options) / 1000;
    return ms_1.default(value, options);
};
Converter.checkBoxToBoolean = (value, valueExpected) => {
    if (typeof value === 'undefined') {
        return false;
    }
    const textLowerCase = valueExpected.toLowerCase();
    return value.toLowerCase() === textLowerCase;
};
//# sourceMappingURL=converter.js.map