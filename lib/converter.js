"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("./tools/ms"));
class Converter {
}
exports.default = Converter;
Converter.toBoolean = (value, ifUndefinedSetToFalse = true) => {
    // Javascript way
    // if (typeof value === 'undefined') return !ifUndefinedSetToFalse;
    // return Boolean(value); // (or !!value)
    const result = value !== null && value !== void 0 ? value : !ifUndefinedSetToFalse;
    return Boolean(result);
};
Converter.ms = (value, options) => ms_1.default(value, options);
Converter.toSeconds = (value, options) => ms_1.default(value, options);
Converter.checkBoxToBoolean = (value, valueExpected) => {
    if (typeof value === 'undefined') {
        return false;
    }
    const textLowerCase = valueExpected.toLowerCase();
    return value.toLowerCase() === textLowerCase;
};
//# sourceMappingURL=converter.js.map