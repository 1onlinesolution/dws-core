"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsBannedError = void 0;
const customError_1 = require("./customError");
const http_1 = require("../../http");
class UserIsBannedError extends customError_1.CustomError {
    constructor() {
        super('User access is forbidden');
        this.statusCode = http_1.HttpStatusCode.BadRequest;
        this.name = 'UserIsBannedError';
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
exports.UserIsBannedError = UserIsBannedError;
//# sourceMappingURL=userIsBannedError.js.map