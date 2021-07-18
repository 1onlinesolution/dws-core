"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailOrNameExistsError = void 0;
const customError_1 = require("./customError");
const http_1 = require("../../http");
class UserEmailOrNameExistsError extends customError_1.CustomError {
    constructor() {
        super('User email or name already exists in database');
        this.statusCode = http_1.HttpStatusCode.Conflict;
        this.name = 'UserEmailOrNameExistsError';
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
exports.UserEmailOrNameExistsError = UserEmailOrNameExistsError;
//# sourceMappingURL=userEmailOrNameExistsError.js.map