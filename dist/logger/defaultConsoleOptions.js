"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConsoleOptions = void 0;
const DefaultConsoleOptions = {
    // Label stored with entry object if defined.
    label: 'console',
    // Level of messages that this transport should log (default: level set on parent logger).
    level: 'error',
    // Boolean flag indicating whether to suppress output, defaults to false.
    silent: false,
    // Format that will be used by morgan middleware
    morganFormat: ':method :url :status :res[content-length] - :response-time ms',
};
exports.DefaultConsoleOptions = DefaultConsoleOptions;
//# sourceMappingURL=defaultConsoleOptions.js.map