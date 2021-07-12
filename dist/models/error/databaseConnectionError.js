"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const http_1 = require("../../http");
class DatabaseConnectionError extends Error {
    constructor() {
        super('Error connecting to database');
        this.name = 'DatabaseConnectionError';
        this.statusCode = http_1.HttpStatusCode.ServerError;
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
//# sourceMappingURL=databaseConnectionError.js.map