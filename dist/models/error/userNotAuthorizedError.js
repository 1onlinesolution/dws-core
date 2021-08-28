"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotAuthorizedError = void 0;
const customError_1 = require("./customError");
const http_1 = require("../../http");
class UserNotAuthorizedError extends customError_1.CustomError {
    constructor() {
        super('User is not authorized');
        this.statusCode = http_1.HttpStatusCode.Unauthorized;
        this.name = 'UserNotAuthorizedError';
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
exports.UserNotAuthorizedError = UserNotAuthorizedError;
//# sourceMappingURL=userNotAuthorizedError.js.map