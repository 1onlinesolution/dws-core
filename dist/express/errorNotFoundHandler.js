"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNotFoundHandler = void 0;
const models_1 = require("../models");
const ErrorNotFoundHandler = (req, res, next) => {
    const error = new models_1.NotFoundError();
    next(error);
};
exports.ErrorNotFoundHandler = ErrorNotFoundHandler;
//# sourceMappingURL=errorNotFoundHandler.js.map