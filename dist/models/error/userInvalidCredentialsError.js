"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvalidCredentialsError = void 0;
const customError_1 = require("./customError");
const http_1 = require("../../http");
class UserInvalidCredentialsError extends customError_1.CustomError {
    constructor() {
        super('Invalid user credentials detected');
        this.statusCode = http_1.HttpStatusCode.BadRequest;
        this.name = 'UserInvalidCredentialsError';
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
exports.UserInvalidCredentialsError = UserInvalidCredentialsError;
//# sourceMappingURL=userInvalidCredentialsError.js.map