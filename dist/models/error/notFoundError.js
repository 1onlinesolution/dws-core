"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_1 = require("../../http");
const customError_1 = require("./customError");
class NotFoundError extends customError_1.CustomError {
    constructor() {
        super('Route not found');
        this.statusCode = http_1.HttpStatusCode.NotFound;
        this.name = 'NotFoundError';
    }
    response() {
        return {
            errors: [{ message: this.message }],
            statusCode: this.statusCode,
        };
    }
    serializeErrors() {
        return [{ message: http_1.HttpStatusName.NotFound }];
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=notFoundError.js.map