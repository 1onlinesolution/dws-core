"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
class Environment {
    static getVariable(key, exitIfUndefined = true) {
        const value = process.env[key.toString()];
        if (typeof value === 'undefined' && exitIfUndefined) {
            // eslint-disable-next-line no-console
            console.error(`${safe_1.default.red('[APP ERROR] Missing env variable:')} ${safe_1.default.green(key)}`);
            return process.exit(1);
        }
        return value;
    }
}
exports.default = Environment;
//# sourceMappingURL=environment.js.map