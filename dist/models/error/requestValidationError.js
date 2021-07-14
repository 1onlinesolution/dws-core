"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const http_1 = require("../../http");
const customError_1 = require("./customError");
class RequestValidationError extends customError_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = http_1.HttpStatusCode.BadRequest;
        this.name = 'RequestValidationError';
    }
    response() {
        return {
            errors: this.serializeErrors(),
            statusCode: this.statusCode,
        };
    }
    serializeErrors() {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=requestValidationError.js.map