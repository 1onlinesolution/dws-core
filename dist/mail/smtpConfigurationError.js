"use strict";
// https://javascript.info/custom-errors
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpConfigurationError = void 0;
const MESSAGE = 'SMTP configuration cannot be undefined or null';
class SmtpConfigurationError extends Error {
    constructor(message = MESSAGE) {
        super(message);
        this.name = 'SmtpConfigurationError';
    }
}
exports.SmtpConfigurationError = SmtpConfigurationError;
//# sourceMappingURL=smtpConfigurationError.js.map