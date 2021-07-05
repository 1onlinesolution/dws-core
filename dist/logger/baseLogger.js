"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLogger = void 0;
const winston = __importStar(require("winston"));
const printf_1 = require("./printf");
require("winston-mongodb");
const { format, createLogger } = winston;
class BaseLogger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    constructor(label = 'my label', level = 'info', options) {
        if (!options ||
            (options.level !== 'info' && options.level !== 'warn' && options.level !== 'error'))
            BaseLogger.throwConfigError();
        this.label = label;
        this.level = level;
        this.options = options;
        this.usedTransports = [];
        return this;
    }
    get stream() {
        return this._stream;
    }
    static throwConfigError() {
        throw new Error('invalid configuration');
    }
    initialize() {
        if (this.logger)
            return this.logger;
        const logger = createLogger({
            transports: this.usedTransports,
            exitOnError: false,
            format: format.combine(format.label({ label: this.label }), format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), format.printf(printf_1.printf)),
        });
        // create a stream object with a 'write' function that will be used by `morgan`
        const streamOpts = {
            // use the 'info' log level so the output will be picked up by all transports (mongodb, file, and console)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            write: (message) => {
                logger.info(message);
            },
        };
        this._stream = logger.stream(streamOpts);
        return logger;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message, meta) {
        this.logger.warn(message, meta);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(message, meta) {
        this.logger.info(message, meta);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message, meta) {
        this.logger.error(message, meta);
        return this;
    }
}
exports.BaseLogger = BaseLogger;
//# sourceMappingURL=baseLogger.js.map