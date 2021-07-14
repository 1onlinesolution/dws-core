"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const http_1 = require("../http");
const models_1 = require("../models");
const ErrorHandler = (err, req, res, next) => {
    console.log('Something went wrong', err);
    const result = {
        errors: [{ message: err.message }],
        statusCode: http_1.HttpStatusCode.BadRequest,
    };
    if (err instanceof models_1.CustomError) {
        result.errors = err.serializeErrors();
        result.statusCode = err.statusCode;
    }
    return res.status(result.statusCode).send(result);
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map