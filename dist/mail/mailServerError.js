"use strict";
// https://javascript.info/custom-errors
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailServerError = void 0;
class MailServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MailServerError';
    }
}
exports.MailServerError = MailServerError;
//# sourceMappingURL=mailServerError.js.map