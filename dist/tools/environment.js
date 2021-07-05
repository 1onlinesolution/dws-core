"use strict";
// import colors from 'colors/safe';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
class Environment {
    static getVariable(key, exitIfUndefined = true) {
        const value = process.env[key.toString()];
        if (typeof value !== 'undefined' || !exitIfUndefined) {
            return value;
        }
        // // callback error asynchronously
        // process.nextTick(function () {
        //   // eslint-disable-next-line no-console
        //   console.error(`${colors.red('[APP ERROR] Missing env variable:')} ${colors.green(key)}`);
        //   throw new Error(`[APP ERROR] Missing env variable: ${key}`);
        // });
        // console.error(`${colors.red('[APP ERROR] Missing env variable:')} ${colors.green(key)}`);
        throw new Error(`[APP ERROR] Missing env variable: ${key}`);
        // return process.exit(1);
    }
}
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map