"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const http_1 = require("../../http");
class RequestValidationError extends Error {
    constructor(errors) {
        super('Validation error(s) occurred');
        this.errors = errors;
        this.name = 'RequestValidationError';
        this.statusCode = http_1.HttpStatusCode.BadRequest;
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=requestValidationError.js.map