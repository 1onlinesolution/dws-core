"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const http_1 = require("../http");
const models_1 = require("../models");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler = (err, req, res, next) => {
    console.log('Something went wrong', err);
    const result = {
        message: err.message,
        errors: [],
        statusCode: http_1.HttpStatusCode.BadRequest,
    };
    if (err instanceof models_1.RequestValidationError) {
        result.errors = err.errors;
        result.statusCode = err.statusCode;
    }
    else if (err instanceof models_1.DatabaseConnectionError) {
        result.statusCode = err.statusCode;
    }
    res.status(http_1.HttpStatusCode.BadRequest).send(result);
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map