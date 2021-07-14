"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const http_1 = require("../../http");
const customError_1 = require("./customError");
class DatabaseConnectionError extends customError_1.CustomError {
    constructor() {
        super('Error connecting to database');
        this.statusCode = http_1.HttpStatusCode.ServerError;
        this.name = 'DatabaseConnectionError';
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
exports.DatabaseConnectionError = DatabaseConnectionError;
//# sourceMappingURL=databaseConnectionError.js.map