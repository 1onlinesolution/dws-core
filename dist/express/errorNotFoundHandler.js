"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNotFoundHandler = void 0;
const ErrorNotFoundHandler = (req, res, next) => {
    const error = new Error('Not Found');
    next(error);
};
exports.ErrorNotFoundHandler = ErrorNotFoundHandler;
//# sourceMappingURL=errorNotFoundHandler.js.map