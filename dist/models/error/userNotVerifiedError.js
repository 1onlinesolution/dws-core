"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotVerifiedError = void 0;
const customError_1 = require("./customError");
const http_1 = require("../../http");
class UserNotVerifiedError extends customError_1.CustomError {
    constructor() {
        super('User is not verified');
        this.statusCode = http_1.HttpStatusCode.BadRequest;
        this.name = 'UserNotVerifiedError';
    }
    response() {
        return {
            errors: [{ message: this.message }],
            statusCode: this.statusCode,
        };
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.UserNotVerifiedError = UserNotVerifiedError;
//# sourceMappingURL=userNotVerifiedError.js.map